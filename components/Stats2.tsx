"use client";

import React, { useEffect, useState } from 'react';

function useCounter(target: number, duration: number = 2000) {
  const [count, setCount] = useState(1);

  useEffect(() => {
    let start = 1;
    const end = target;
    const totalMiliseconds = duration;
    const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 10);
    
    const timer = setInterval(() => {
      start += Math.ceil(end / (totalMiliseconds / incrementTime));
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [target, duration]);

  return count;
}

export default function TrustedStats() {
  const activeJobs = useCounter(500);
  const topCompanies = useCounter(200);
  const placements = useCounter(50); 
  const satisfaction = useCounter(98);

  return (
    <section className="w-full bg-[#0F3981] text-white py-24 px-4 text-center">
      <div className="max-w-6xl mx-auto">
        
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Trusted by Job Seekers Worldwide
          </h2>
          <p className="text-blue-100 text-base md:text-lg max-w-3xl mx-auto font-light leading-relaxed">
            Our platform has helped thousands of professionals find their ideal career opportunities.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-6 max-w-5xl mx-auto">
          
          <div className="flex flex-col items-center">
            <span className="text-4xl md:text-6xl font-black tracking-tight mb-2">
              {activeJobs}+
            </span>
            <span className="text-blue-100/80 font-medium text-xs md:text-sm">
              Active Job Listings
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-4xl md:text-6xl font-black tracking-tight mb-2">
              {topCompanies}+
            </span>
            <span className="text-blue-100/80 font-medium text-xs md:text-sm">
              Top Companies
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-4xl md:text-6xl font-black tracking-tight mb-2">
              {placements}K+
            </span>
            <span className="text-blue-100/80 font-medium text-xs md:text-sm">
              Successful Placements
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-4xl md:text-6xl font-black tracking-tight mb-2">
              {satisfaction}%
            </span>
            <span className="text-blue-100/80 font-medium text-xs md:text-sm">
              User Satisfaction
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}