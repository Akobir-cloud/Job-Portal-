import { BsStars } from "react-icons/bs";
import { Search, Star } from 'lucide-react';
import { AiFillThunderbolt } from "react-icons/ai";
export default function Features() {
  return (
    <section className="w-full bg-[#F9FAFB] py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            Why Choose JobPortal?
          </h2>
          <p className="text-gray-500 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            We've designed the most intuitive job search platform to help you find opportunities 
            that align with your career goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          <div className="bg-white p-8 md:p-10 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col items-start">
            <div className="p-3 bg-blue-50 rounded-xl text-[#0F3981] mb-6">
              <Search className="w-8 h-8" strokeWidth={2.5} />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-950 mb-3">
              Powerful Search
            </h3>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed">
              Advanced filtering by job title, category, and more. Find exactly what you're looking for in seconds.
            </p>
          </div>

          <div className="bg-white p-8 md:p-10 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col items-start">
            <div className="p-3 bg-amber-50 rounded-xl text-amber-500 mb-6">
              <Star className="w-8 h-8 fill-amber-500" strokeWidth={2} />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-950 mb-3">
              Curated Opportunities
            </h3>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed">
              Carefully selected job postings from verified companies across industries and experience levels.
            </p>
          </div>

          <div className="bg-white p-8 md:p-10 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col items-start">
            <div className="p-3 bg-amber-50 rounded-xl text-amber-500 mb-6">
              <BsStars className="w-8 h-8 fill-amber-500" strokeWidth={2} />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-950 mb-3">
              User-Friendly Interface 
            </h3>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed">
Intuitive design makes job hunting simple and enjoyable. Browse, filter, and explore with ease.            </p>
          </div>


            <div className="bg-white p-8 md:p-10 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col items-start">
            <div className="p-3 bg-amber-50 rounded-xl text-amber-500 mb-6">
              <AiFillThunderbolt className="w-8 h-8 fill-amber-500" strokeWidth={2} />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-950 mb-3">
              Real-Time Updates  
            </h3>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed">
Instant notifications for new job postings. Never miss an opportunity that matches your profile.   </p>      
 </div>

        </div>

      </div>
    </section>
  );
}