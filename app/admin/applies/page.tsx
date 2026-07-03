'use client';

import  { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/clientComponents';

interface Application {
  id: number;
  job_id: string;
  full_name: string;
  email: string;
  created_at: string;
  jobs?: {
    title: string;
    company: string;
  };
}

export default function JobApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('applications')
          .select('*, jobs(title, company)')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setApplications(data || []);
      } catch (error: any) {
        console.error('Xatolik:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Bu arizani o'chirishni xohlaysizmi?")) return;

    try {
      const { error } = await supabase
        .from('applications')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setApplications(applications.filter(app => app.id !== id));
    } catch (error: any) {
      alert(`O'chirishda xatolik: ${error.message}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafafa]">
        <div className="text-gray-500 font-medium animate-pulse">Yuklanmoqda...</div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#fafafa] py-12 px-6 md:px-12">
      <div className="max-w-6xl mx-auto space-y-6">
        
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Job Applications</h1>
          <p className="text-sm text-gray-500 mt-1">
            Review and manage all job applications ({applications.length} total)
          </p>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-150 bg-white">
                  <th className="py-4 px-6 text-sm font-bold text-gray-900">Name</th>
                  <th className="py-4 px-6 text-sm font-bold text-gray-900">Email</th>
                  <th className="py-4 px-6 text-sm font-bold text-gray-900">Job</th>
                  <th className="py-4 px-6 text-sm font-bold text-gray-900">Applied Date</th>
                  <th className="py-4 px-6 text-sm font-bold text-gray-900 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {applications.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-sm text-gray-400">
                      Hozircha arizalar mavjud emas.
                    </td>
                  </tr>
                ) : (
                  applications.map((app) => (
                    <tr key={app.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-6 text-sm font-medium text-gray-800">
                        {app.full_name}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-500">
                        {app.email}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-600 font-medium">
                        {app.jobs ? `${app.jobs.title} - ${app.jobs.company}` : `Job ID: ${app.job_id}`}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-400">
                        {new Date(app.created_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                      <td className="py-4 px-6 text-sm font-semibold space-x-4 text-right">
                        <button className="text-gray-900 hover:underline transition-all">
                          View
                        </button>
                        <button 
                          onClick={() => handleDelete(app.id)}
                          className="text-red-600 hover:underline transition-all"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}