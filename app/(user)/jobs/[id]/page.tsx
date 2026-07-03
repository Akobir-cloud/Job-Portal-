'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/clientComponents';

import Rodal from 'rodal';
import 'rodal/lib/rodal.css';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  category: string;
  job_type: string;
  description: string;
  requirements: string;
}

export default function JobDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [submitLoading, setSubmitLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('jobs')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setJob(data);
      } catch (error: any) {
        console.error('Xatolik:', error.message);
      } {
        setLoading(false);
      }
    };

    if (id) fetchJobDetails();
  }, [id]);

const handleApplySubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setSubmitLoading(true);
  setMessage(null);

  try {
    const { data, error } = await supabase
      .from('applications')
      .insert([
        {
          job_id: id as string, 
          full_name: userName,
          email: email,
        },
      ])
      .select();

    if (error) {
      console.error("Supabase xatoligi:", error);
      setMessage({ 
        type: 'error', 
        text: `Xatolik: ${error.message} (Kod: ${error.code})` 
      });
      setSubmitLoading(false);
      return;
    }

    setMessage({ type: 'success', text: 'Arizangiz muvaffaqiyatli yuborildi!' });
    setUserName('');
    setEmail('');
    
    setTimeout(() => {
      setIsModalOpen(false);
      setMessage(null);
    }, 2000);

  } catch (err: any) {
    setMessage({ type: 'error', text: `Kutilmagan xato: ${err.message}` });
  } finally {
    setSubmitLoading(false);
  }
};

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafafa]">
        <div className="text-gray-500 font-medium animate-pulse">Yuklanmoqda...</div>
      </div>
    );
  }

  if (!job) {
    return <div className="min-h-screen flex items-center justify-center bg-[#fafafa]">Vakansiya topilmadi.</div>;
  }

  return (
    <div className="w-full min-h-screen bg-[#fafafa] py-10 px-4 md:px-8 relative">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors"
        >
          <span>←</span> Back to Jobs
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-gray-200 p-6 md:p-8 rounded-2xl shadow-sm">
              <div className="flex justify-between items-start gap-4">
                <div className="space-y-2">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">{job.title}</h1>
                  <p className="text-lg font-medium text-gray-500">{job.company}</p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="px-3 py-1 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-100 rounded-md">
                      {job.category}
                    </span>
                    <span className="px-3 py-1 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-md">
                      {job.job_type || 'Full-time'}
                    </span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-[#0f3470] text-white font-bold flex items-center justify-center rounded-xl text-xl shadow-sm shrink-0">
                  {job.company?.charAt(0).toUpperCase()}
                </div>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-6 font-medium pt-4 border-t border-gray-100">
                <span>📍 {job.location}</span>
                {job.salary && <span className="text-gray-700 font-semibold">💰 {job.salary}</span>}
              </div>

              <div className="mt-6">
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="w-full md:w-auto px-8 py-3 bg-[#0f3470] hover:bg-[#0b2856] text-white font-bold rounded-xl text-sm transition-colors shadow-sm"
                >
                  Apply Now
                </button>
              </div>
            </div>

            <div className="bg-white border border-gray-200 p-6 md:p-8 rounded-2xl shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Job Description</h2>
              <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{job.description}</p>
            </div>

            {job.requirements && (
              <div className="bg-white border border-gray-200 p-6 md:p-8 rounded-2xl shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Requirements</h2>
                <div className="flex flex-wrap gap-2">
                  {job.requirements.split(',').map((req, index) => (
                    <span key={index} className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 rounded-xl text-xs font-medium shadow-sm">
                      {req.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1 lg:sticky lg:top-6">
            <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm space-y-5">
              <h3 className="text-md font-bold text-gray-900 border-b border-gray-150 pb-3">Job Overview</h3>
              <div className="grid grid-cols-1 gap-4 text-sm">
                <div>
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">Location</span>
                  <span className="text-gray-900 font-bold mt-0.5 block">{job.location}</span>
                </div>
                <div>
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">Job Type</span>
                  <span className="text-gray-900 font-bold mt-0.5 block">{job.job_type || 'Full-time'}</span>
                </div>
                <div>
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">Salary Range</span>
                  <span className="text-gray-900 font-bold mt-0.5 block text-orange-700">{job.salary || 'Not specified'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Rodal 
        visible={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        animation="zoom" 
        customStyles={{
          borderRadius: '16px',
          padding: '0px',
          height: '350px',
          maxWidth: '450px',
          width: '100%',
          overflow: 'hidden'
        }}
      >
        <div className="px-6 py-4 bg-[#fafafa] border-b border-gray-150">
          <h3 className="text-lg font-bold text-gray-900">Apply for this position</h3>
          <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">Job: {job.title}</p>
        </div>

        <form onSubmit={handleApplySubmit} className="p-6 space-y-4">
          {message && (
            <div className={`p-3 rounded-xl text-xs font-medium border ${
              message.type === 'success' 
                ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                : 'bg-red-50 text-red-700 border-red-100'
            }`}>
              {message.text}
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              required
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0f3470] text-sm text-gray-800"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0f3470] text-sm text-gray-800"
            />
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-100 mt-6">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="flex-1 py-2.5 bg-white border border-gray-200 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitLoading}
              className="flex-1 py-2.5 bg-[#0f3470] hover:bg-[#0b2856] text-white text-sm font-semibold rounded-xl transition-colors shadow-sm disabled:bg-gray-400"
            >
              {submitLoading ? 'Sending...' : 'Submit Application'}
            </button>
          </div>
        </form>
      </Rodal>
    </div>
  );
}