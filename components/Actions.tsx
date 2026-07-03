import Link from "next/link";

export default function Actions() {
  return (
    <section className="w-full bg-gradient-to-br from-[#0F3981] via-[#1E4A99] to-[#254F96] text-white py-24 px-4 text-center">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        
        <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6 max-w-2xl leading-tight">
          Ready to Advance Your Career?
        </h2>

        <p className="text-blue-100/90 text-base md:text-lg max-w-2xl font-light leading-relaxed mb-10">
          Discover hundreds of job opportunities from leading companies. Start your journey to your next role today.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link href='/jobs'>
          <button className="w-full sm:w-auto bg-[#E9EFFD] hover:bg-white text-[#0F3981] font-semibold px-8 py-3.5 rounded-lg transition-all shadow-md text-sm md:text-base">
            Explore Jobs
          </button>
          </Link>
          
        <Link href='/admin/login'>
          <button className="w-full sm:w-auto bg-transparent hover:bg-white/10 text-white font-semibold px-8 py-3.5 rounded-lg border border-white/30 transition-all text-sm md:text-base">
            Post a Job
          </button>
        </Link>
        </div>

      </div>
    </section>
  );
}