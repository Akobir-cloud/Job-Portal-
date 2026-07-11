'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/clientComponents';
import Sidebar from '@/components/SideBar';
import AdminLogin from './login/page'; 

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminRole = async (currentSession: any) => {
      if (!currentSession) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      const role = currentSession.user?.user_metadata?.role;

      if (role === 'admin') {
        setIsAdmin(true);
      } else {
        await supabase.auth.signOut();
        setIsAdmin(false);
        alert("Sizda admin huquqlari yo'q!");
      }
      setLoading(false);
    };

    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      checkAdminRole(currentSession);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      setSession(currentSession);
      checkAdminRole(currentSession);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f3f4f6] flex items-center justify-center text-gray-500 font-medium">
        Sessiya tekshirilmoqda...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#f3f4f6]">
      <Sidebar /> 

      <div className="flex-1 p-8 overflow-y-auto flex items-center justify-center">
        
        {!session || !isAdmin ? (
          <div className="w-full flex justify-center items-center">
            <AdminLogin /> 
          </div>
        ) : (
          <div className="w-full h-full">
            {children}
          </div>
        )}

      </div>
    </div>
  );
}