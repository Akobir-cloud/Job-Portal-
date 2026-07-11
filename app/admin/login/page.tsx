'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/clientComponents'; 

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@jobportal.com');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user?.email === 'admin@jobportal.com') {
        router.push('/admin/jobs'); 
        router.refresh();
      } else {
        await supabase.auth.signOut();
        setErrorMsg("Sizda admin huquqlari yo'q!");
      }

    } catch (error: any) {
      setErrorMsg(error.message || 'Email yoki parol xato!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center p-4">
      <div className="flex items-center gap-2 mb-4">
        <div className="bg-[#0f3470] text-white font-bold p-2 rounded text-sm tracking-wider">JP</div>
        <span className="text-2xl font-bold text-[#1f2937]">JobPortal</span>
      </div>

      <h1 className="text-3xl font-bold text-[#111827] mb-1">Admin Dashboard</h1>
      <p className="text-gray-500 mb-8 text-center">Sign in to manage job postings</p>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 w-full max-w-md">
        {errorMsg && (
          <div className="mb-4 bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-100">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0f3470] text-gray-800 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0f3470] text-gray-800 text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0f3470] text-white py-2.5 rounded-md font-medium hover:bg-[#0b2856] transition-colors text-sm disabled:bg-gray-400"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 bg-[#f0e6e6] p-4 rounded-lg text-sm text-[#4a4a4a]">
          <p className="font-semibold mb-1">Demo Credentials:</p>
          <p>Email: admin@jobportal.com</p>
          <p>Password: admin123</p>
        </div>
      </div>
    </div>
  );
}