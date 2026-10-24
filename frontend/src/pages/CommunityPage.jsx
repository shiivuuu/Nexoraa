import React from 'react';
import CommunitySection from '../sections/CommunitySection';
import { Calendar, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const sessions = [
  {
    title: "Open Systems & Architecture Technical Discussion",
    date: "NOVEMBER 2026",
    type: "TECHNICAL WORKING GROUP",
    desc: "Open engineering workshop focusing on autonomous developer workflows, local-first database replication, and edge inference pipelines."
  },
  {
    title: "Verifiable AI & Neuro-Symbolic Logic Seminar",
    date: "DECEMBER 2026",
    type: "RESEARCH WORKING GROUP",
    desc: "Deep dive into combining formal constraint solvers (Z3) with transformer attention weights for zero-hallucination domain extraction."
  }
];

const CommunityPage = () => {
  return (
    <div className="min-h-screen pt-32 sm:pt-36 pb-24 bg-[#F5F0E8] text-[#252922]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14">
        
        {/* Header */}
        <div className="pb-12 border-b border-[#244638]/12 space-y-4">
          <div className="flex items-center gap-2 text-mono text-xs text-[#A15E40] tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A15E40]" />
            DEVELOPER FELLOWSHIP
          </div>
          <h1 className="font-serif text-display text-[#244638] font-normal tracking-tight">
            Community &amp; Fellowship
          </h1>
          <p className="text-base sm:text-lg text-[#686B61] max-w-2xl font-normal leading-relaxed">
            Collaborating with disciplined software engineers, AI researchers, and systems architects on open-source repositories and verified prototypes.
          </p>
        </div>

        {/* Section Embed */}
        <div className="mt-8 rounded-2xl overflow-hidden border border-[#244638]/15 shadow-card">
          <CommunitySection />
        </div>

        {/* Upcoming Sessions */}
        <div className="pt-20 space-y-8">
          <div className="flex items-center justify-between pb-4 border-b border-[#244638]/12">
            <h2 className="font-serif text-3xl text-[#244638]">
              Technical Seminars &amp; Working Groups
            </h2>
            <span className="text-mono text-xs text-[#686B61]">SCHEDULE</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sessions.map((ev, i) => (
              <div
                key={i}
                className="bg-[#FFFCF7] p-8 rounded-xl border border-[#244638]/15 shadow-card space-y-4"
              >
                <div className="flex items-center justify-between text-mono text-xs text-[#686B61]">
                  <span className="text-[#A15E40] flex items-center gap-1.5 font-semibold">
                    <Calendar className="w-3.5 h-3.5" />
                    {ev.date}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#F5F0E8] border border-[#244638]/10 text-[#244638]">
                    {ev.type}
                  </span>
                </div>
                <h3 className="font-serif text-2xl text-[#244638]">
                  {ev.title}
                </h3>
                <p className="text-sm text-[#686B61] leading-relaxed">
                  {ev.desc}
                </p>
                <div className="pt-2">
                  <Link
                    to="/join"
                    className="inline-flex items-center gap-1.5 text-xs text-[#244638] font-medium hover:text-[#A15E40] transition-colors"
                  >
                    <span>Apply for Invitation</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default CommunityPage;
