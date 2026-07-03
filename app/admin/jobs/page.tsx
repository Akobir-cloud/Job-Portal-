'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/clientComponents';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  category: string;
  job_type: string;
}

export default function JobsManagement() {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('jobs')
        .select('id, title, company, location, category, job_type')
        .order('created_at', { ascending: false }); 

      if (error) throw error;
      if (data) setJobs(data);
    } catch (error: any) {
      alert(`Ma'lumotlarni yuklashda xatolik: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Haqiqatdan ham ushbu vakansiyani o'chirmoqchimisiz?")) return;

    try {
      const { error } = await supabase
        .from('jobs')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setJobs(jobs.filter((job) => job.id !== id));
      alert("Vakansiya o'chirildi!");
    } catch (error: any) {
      alert(`O'chirishda xatolik yuz berdi: ${error.message}`);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Jobs Management</h1>
        <p className="text-gray-500 mt-1">Manage all your job postings</p>
      </div>

      <button
        onClick={() => router.push('/admin/create-job')}
        className="bg-[#0f3470] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#0b2856] transition-colors mb-8 shadow-sm"
      >
        Create New Job
      </button>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">All Jobs ({jobs.length})</h2>

        {loading ? (
          <div className="text-center py-10 text-gray-500">Yuklanmoqda...</div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-10 text-gray-500">Hozircha hech qanday vakansiya yo'q.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f5eded] border-b border-gray-200 text-gray-700 uppercase text-xs font-semibold tracking-wider">
                  <th className="py-3 px-4">Title</th>
                  <th className="py-3 px-4">Company</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {jobs.map((job) => (
                  <tr key={job.id} className="hover:bg-gray-50 transition-colors text-gray-800">
                    <td className="py-4 px-4">
                      <div className="font-semibold text-gray-900">{job.title}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{job.location}</div>
                    </td>
                    <td className="py-4 px-4 text-gray-600 font-medium">
                      {job.company}
                    </td>
                    <td className="py-4 px-4">
                      <span className="inline-block px-2.5 py-1 text-xs font-medium bg-gray-50 text-gray-600 rounded-md border border-gray-200 shadow-sm">
                        {job.category}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="inline-block px-2.5 py-1 text-xs font-medium bg-gray-50 text-gray-600 rounded-md border border-gray-200 shadow-sm">
                        {job.job_type}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <button
                        onClick={() => handleDelete(job.id)}
                        className="text-sm font-medium border border-gray-200 bg-white hover:bg-red-50 hover:text-red-600 text-gray-700 px-3 py-1.5 rounded-md shadow-sm transition-all"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}