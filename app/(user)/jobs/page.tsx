'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation'; 
import { supabase } from '@/lib/supabase/clientComponents';

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

export default function AvailableJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  const searchParams = useSearchParams(); 

  useEffect(() => {
    const titleQuery = searchParams.get('title');
    if (titleQuery) {
      setSearchKeyword(titleQuery);
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('jobs')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        if (data) {
          setJobs(data);
          setFilteredJobs(data); 
        }
      } catch (error: any) {
        console.error('Xatolik:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    let result = jobs;

    if (searchKeyword.trim() !== '') {
      const keyword = searchKeyword.toLowerCase();
      result = result.filter(
        (job) =>
          job.title.toLowerCase().includes(keyword) ||
          job.company.toLowerCase().includes(keyword) ||
          job.description?.toLowerCase().includes(keyword)
      );
    }

    if (selectedCategory !== 'All Categories') {
      result = result.filter((job) => job.category === selectedCategory);
    }

    setFilteredJobs(result);
  }, [searchKeyword, selectedCategory, jobs]);

  const handleResetFilters = () => {
    setSearchKeyword('');
    setSelectedCategory('All Categories');
  };

  const categories = ['All Categories', ...Array.from(new Set(jobs.map((j) => j.category).filter(Boolean)))];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12 bg-[#fafafa] min-h-screen">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Find Your Next Opportunity</h1>
        <p className="text-gray-500 mt-2 text-lg">
          Explore our curated list of job openings and find the perfect match for your career.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl border border-gray-150 shadow-sm h-fit">
          <h2 className="text-lg font-bold text-gray-900 mb-5">Filter Jobs</h2>

          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Search by keyword</label>
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="Job title, company, or skills..."
              className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0f3470] text-sm text-gray-800"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0f3470] text-sm text-gray-800"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleResetFilters}
            className="w-full py-2.5 bg-white border border-gray-200 rounded-xl font-semibold text-gray-700 text-sm hover:bg-gray-50 transition-colors shadow-sm"
          >
            Reset Filters
          </button>
        </div>

        <div className="lg:col-span-3">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-2xl font-bold text-gray-900">Available Jobs</h2>
            <span className="text-sm text-gray-500 font-medium">{filteredJobs.length} positions</span>
          </div>

          {loading ? (
            <div className="text-center py-20 text-gray-500">Vakansiyalar yuklanmoqda...</div>
          ) : filteredJobs.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center text-gray-500 shadow-sm">
              Mos keladigan vakansiyalar topilmadi.
            </div>
          ) : (
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white border border-gray-150 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative flex flex-col justify-between"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 hover:text-[#0f3470] transition-colors">
                        {job.title}
                      </h3>
                      <p className="text-gray-500 font-medium text-sm mt-0.5">{job.company}</p>
                    </div>
                    <div className="w-10 h-10 bg-[#0f3470] text-white font-bold flex items-center justify-center rounded-lg text-lg">
                      {job.company.charAt(0).toUpperCase()}
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mt-3 line-clamp-2 leading-relaxed">
                    {job.description}
                  </p>

                  <div className="flex items-center gap-2 mt-4">
                    <span className="px-3 py-1 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-100 rounded-md">
                      {job.category}
                    </span>
                    <span className="px-3 py-1 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-md">
                      {job.job_type}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-500 mt-4 font-medium">
                    <span className="flex items-center gap-1">📍 {job.location}</span>
                    {job.salary && (
                      <span className="flex items-center gap-1 text-gray-600">💰 {job.salary}</span>
                    )}
                  </div>

                  {job.requirements && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Requirements:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {job.requirements.split(',').map((req, index) => (
                          <span key={index} className="px-2.5 py-1 bg-white border border-gray-200 text-gray-700 rounded-lg text-xs font-medium shadow-sm">
                            {req.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-5">
                    <Link
                      href={`/jobs/${job.id}`}
                      className="w-full block text-center bg-[#0f3470] hover:bg-[#0b2856] text-white py-2.5 rounded-xl font-semibold text-sm transition-colors shadow-sm"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}