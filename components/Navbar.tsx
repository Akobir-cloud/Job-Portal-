import Link from 'next/link';



export default function Navbar() {
  return (
    <nav className="w-full bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
     <Link href="/">
      <div className="flex items-center space-x-3">
        <div className="bg-[#254F96] text-white font-bold px-3 py-2 rounded-lg text-sm tracking-wide">
          JP
        </div>
        <span className="text-xl font-bold text-gray-900 tracking-tight">
          JobPortal
        </span>
      </div>
     </Link>

      <div className="flex items-center space-x-8">
        <a 
          href="/" 
          className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
        >
          Home
        </a>
        <Link href="/jobs" className="text-gray-600 hover:text-gray-900 font-medium">
          Jobs
        </Link>
        <Link href="/admin/login" >
        <button 
          className="bg-[#0F3981] hover:bg-[#0b2b63] text-white font-semibold px-5 py-2.5 rounded-md transition-colors shadow-sm text-sm"
        >
          Post a Job
        </button>
        </Link>
      </div>
    </nav>
  );
}