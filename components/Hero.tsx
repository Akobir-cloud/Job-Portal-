'use client'; 

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';


export default function Hero() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/jobs?title=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/jobs'); 
    }
  };

  return (
    <section className="w-full min-h-[80vh] flex flex-col items-center justify-center bg-[#F9FAFB] px-4 py-16 text-center">
      <span className="text-[#C25A19] font-bold text-xs md:text-sm uppercase tracking-widest mb-4">
        CAREER OPPORTUNITIES
      </span>

      <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6 leading-tight text-balance">
        Find Your Perfect <span className="text-primary">Career</span>
      </h1>

      <p className="text-gray-500 text-base md:text-lg max-w-2xl font-normal leading-relaxed mb-10">
        Discover career opportunities from top companies. Search, filter, and
        apply to roles that match your skills and aspirations.
      </p>

      <form 
        onSubmit={handleSearch}
        className="w-full max-w-3xl flex flex-col sm:flex-row items-center gap-3 bg-white p-3 rounded-xl shadow-sm border border-gray-100 mb-8"
      >
        <div className="relative w-full flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by job title, company, or keyword..."
            className="w-full px-4 py-3 text-gray-700 bg-transparent placeholder-gray-400 focus:outline-none text-sm md:text-base"
          />
        </div>
        <button 
          type="submit"
          className="w-full sm:w-auto bg-[#0F3981] hover:bg-[#0b2b63] text-white font-semibold px-8 py-3 rounded-lg transition-colors text-sm md:text-base shadow-sm"
        >
          Search
        </button>
      </form>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Link href='/jobs'>
        <button 
          onClick={() => router.push('/jobs')}
          className="w-full sm:w-auto bg-[#0F3981] hover:bg-[#0b2b63] text-white font-semibold px-8 py-3.5 rounded-lg transition-colors text-sm md:text-base shadow-md"
        >
          Browse All Jobs
        </button>
        </Link>
       <Link href='/admin/login' >
        <button className="w-full sm:w-auto bg-white hover:bg-gray-50 text-gray-800 font-semibold px-8 py-3.5 rounded-lg border border-gray-200 transition-colors text-sm md:text-base shadow-sm">
          Post a Job
        </button>
       </Link>
      </div>
    </section>
  );
}