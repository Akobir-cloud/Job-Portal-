"use client"

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

export default function Stats() {
  const activeJobs = useCounter(500);
  const companies = useCounter(200);
  const placements = useCounter(50); 

  return (
    <section className="w-full bg-[#F9FAFB] pb-20 px-4">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-12 sm:gap-24 text-center">
        
        <div className="flex flex-col items-center">
          <span className="text-2xl sm:text-3xl font-bold text-[#0F3981] text-primary mb-1">
            {activeJobs}+
          </span>
          <span className="text-gray-500 font-medium text-sm md:text-base mt-2">
            Active Jobs
          </span>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-2xl sm:text-3xl font-bold text-[#0F3981] text-primary mb-1">
            {companies}+
          </span>
          <span className="text-gray-500 font-medium text-sm md:text-base mt-2">
            Companies
          </span>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-2xl sm:text-3xl font-bold text-[#0F3981] text-primary mb-1">
            {placements}K+
          </span>
          <span className="text-gray-500 font-medium text-sm md:text-base mt-2">
            Placements
          </span>
        </div>

      </div>
    </section>
  );
}