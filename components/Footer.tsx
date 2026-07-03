import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-[#050B14] text-[#94A3B8] pt-16 pb-8 px-6 md:px-12 border-t border-gray-900">
      <div className="max-w-6xl mx-auto">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 pb-12 border-b border-gray-800/60">
          
          <div className="flex flex-col space-y-4">
            <h3 className="text-white font-bold text-lg tracking-wide">
              About JobPortal
            </h3>
            <p className="text-sm leading-relaxed max-w-xs font-normal text-gray-400">
              Your trusted platform for connecting with career opportunities.
            </p>
          </div>

          <div className="flex flex-col space-y-4">
            <h3 className="text-white font-bold text-lg tracking-wide">
              Quick Links
            </h3>
            <div className="flex flex-col space-y-2.5 text-sm">
              <Link 
                href="/jobs" 
                className="hover:text-white transition-colors duration-200"
              >
                Browse Jobs
              </Link>
              <Link 
                href="/admin/login" 
                className="hover:text-white transition-colors duration-200"
              >
                Post a Job
              </Link>
            </div>
          </div>

          <div className="flex flex-col space-y-4">
            <h3 className="text-white font-bold text-lg tracking-wide">
              Contact
            </h3>
            <p className="text-sm font-normal text-gray-400">
              support@jobportal.com
            </p>
          </div>

        </div>

        <div className="pt-8 text-center text-xs md:text-sm text-gray-500 font-normal">
          © 2026 JobPortal. All rights reserved.
        </div>

      </div>
    </footer>
  );
}