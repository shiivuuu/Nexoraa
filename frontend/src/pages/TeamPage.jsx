import React from 'react';
import TeamSection from '../sections/TeamSection';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const competencies = [
  {
    category: "LANGUAGES",
    items: ["Core Java", "C++", "Python", "JavaScript / ESNext", "SQL", "Bash Scripting"]
  },
  {
    category: "SYSTEMS & BACKEND",
    items: ["Node.js", "Express.js", "REST APIs", "WebSockets", "MongoDB & Mongoose", "Distributed Architectures"]
  },
  {
    category: "AI & PERCEPTION",
    items: ["Computer Vision", "YOLOv8 Edge Models", "Retrieval-Augmented Generation (RAG)", "Vector Embeddings", "FastAPI"]
  },
  {
    category: "CORE DISCIPLINES",
    items: ["Data Structures & Algorithms (DSA)", "Object-Oriented Programming (OOP)", "DBMS", "Operating Systems", "Low-Latency UX"]
  }
];

const TeamPage = () => {
  return (
    <div className="min-h-screen pt-32 sm:pt-36 pb-24 bg-[#F5F0E8] text-[#252922]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14">
        
        {/* Header */}
        <div className="pb-12 border-b border-[#244638]/12 space-y-4">
          <div className="flex items-center gap-2 text-mono text-xs text-[#A15E40] tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A15E40]" />
            FOUNDER &amp; ARCHITECTURAL LEADERSHIP
          </div>
          <h1 className="font-serif text-display text-[#244638] font-normal tracking-tight">
            The Collective Leadership
          </h1>
          <p className="text-base sm:text-lg text-[#686B61] max-w-2xl font-normal leading-relaxed">
            Leading the engineering architecture, foundational AI systems, and project execution at Nexora.
          </p>
        </div>

        {/* Lead Builder Component */}
        <div className="mt-8 rounded-2xl overflow-hidden border border-[#244638]/15 shadow-card">
          <TeamSection />
        </div>

        {/* Competencies Grid */}
        <div className="pt-20 space-y-8">
          <div className="flex items-center justify-between pb-4 border-b border-[#244638]/12">
            <h2 className="font-serif text-3xl text-[#244638]">
              Technical Competencies &amp; Matrix
            </h2>
            <span className="text-mono text-xs text-[#686B61]">VERIFIED STACK</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {competencies.map((c) => (
              <div
                key={c.category}
                className="bg-[#FFFCF7] p-6 rounded-xl border border-[#244638]/15 shadow-card space-y-3"
              >
                <div className="text-mono text-xs text-[#A15E40] font-semibold pb-2 border-b border-[#244638]/10">
                  {c.category}
                </div>
                <ul className="space-y-2 text-xs text-[#252922]">
                  {c.items.map((it) => (
                    <li key={it} className="flex items-center gap-2">
                      <span className="text-[#A15E40] text-[10px]">■</span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Join CTA */}
        <div className="mt-16 p-8 sm:p-10 rounded-xl bg-[#244638] text-[#F5F0E8] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-serif text-2xl text-[#FFFCF7]">
              Interested in collaborating or joining?
            </h3>
            <p className="text-xs sm:text-sm text-[#E6DFD3]/80 mt-1 max-w-md">
              Nexora is expanding its fellowship network for engineering sprints, hackathons, and research initiatives.
            </p>
          </div>
          <Link
            to="/join"
            className="px-5 py-2.5 bg-[#FFFCF7] hover:bg-[#F5F0E8] text-[#244638] rounded-md text-xs font-medium tracking-wide uppercase transition-colors shrink-0"
          >
            <span>Apply to Join Fellowship →</span>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default TeamPage;
