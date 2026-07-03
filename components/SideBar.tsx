'use client';
import Link from 'next/link'; // Sahifalararo o'tish uchun
import { useRouter } from 'next/navigation'; // Chiqqandan keyin redirect qilish uchun
import { supabase } from '@/lib/supabase/clientComponents'; // Supabase obyektimiz
import { LuUsers } from "react-icons/lu";
export default function Sidebar() {
  const router = useRouter();

  const handleLogout = async () => {
    if (!confirm("Tizimdan chiqmoqchimisiz?")) return;
    
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      router.push('/admin/login');
    } catch (error) {
      alert(`Chiqishda xatolik yuz berdi:`);
    }
  };

  return (
    <div className="w-64 bg-black text-white flex flex-col justify-between p-4 min-h-screen">
      <div>
        <div className="flex items-center gap-2 mb-10 mt-2 px-2">
          <div className="bg-white text-black font-bold px-2 py-1 rounded text-sm">
            JP
          </div>
          <span className="text-xl font-bold tracking-wide">JobPortal</span>
        </div>

        <p className="text-xs font-semibold text-gray-400 tracking-wider uppercase px-2 mb-4">
          Admin Menu
        </p>

        <nav className="space-y-1">
          <Link
            href="/admin/jobs"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-300 hover:bg-zinc-900 transition-colors"
          >
            <span className="text-lg"><LuUsers /></span>
            <span className="font-medium text-sm">Jobs</span>
          </Link>
          
          <Link
            href="/admin/create-job"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-300 hover:bg-zinc-900 transition-colors"
          >
            <span className="text-lg">➕</span>
            <span className="font-medium text-sm">Create Job</span>
          </Link>
          
          <Link
            href="/admin/applies"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-300 hover:bg-zinc-900 transition-colors"
          >
            <span className="text-lg">📧</span>
            <span className="font-medium text-sm">Applications</span>
          </Link>
        </nav>
      </div>

      <div className="mt-auto px-2">
        <button 
          onClick={handleLogout}
          className="w-full bg-[#ef4444] hover:bg-[#dc2626] text-white py-2.5 rounded-lg font-medium transition-colors text-sm"
        >
          Logout
        </button>
      </div>
    </div>
  );
}