import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const principles = [
  {
    num: "01",
    label: "FOUNDATIONAL ENGINEERING",
    desc: "We prioritize algorithmic precision, type safety, and low-latency system design over superficial wrappers."
  },
  {
    num: "02",
    label: "VERIFIABLE INTELLIGENCE",
    desc: "Combining machine learning representations with formal deterministic constraints to eliminate hallucinations."
  },
  {
    num: "03",
    label: "ARCHITECTURAL INTEGRITY",
    desc: "Designing resilient distributed systems that remain functional and reliable under disconnected conditions."
  },
  {
    num: "04",
    label: "OPEN INQUIRY",
    desc: "Continuous experimentation, public peer-review, and knowledge dissemination across top research tracks."
  }
];

const AboutSection = () => {
  return (
    <section id="about" className="relative py-24 sm:py-32 bg-[#F5F0E8] text-[#252922] border-t border-[#244638]/12">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14">
        
        {/* Asymmetric Editorial Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2 mb-3 text-mono text-xs text-[#A15E40] tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A15E40]" />
              00 / MANIFESTO
            </div>
            <div className="font-serif text-2xl text-[#244638]">
              Philosophy &amp; Standards
            </div>
          </div>

          <div className="lg:col-span-8 space-y-6">
            <h2 className="font-serif text-title text-[#244638] font-normal leading-[1.08] tracking-tight">
              We build systems that solve tangible engineering problems.
            </h2>

            <p className="text-base sm:text-lg text-[#686B61] leading-relaxed font-normal max-w-2xl">
              Nexora is an independent technology collective focused on artificial intelligence, distributed systems software, and verified engineering tools.
            </p>

            <p className="text-sm sm:text-base text-[#686B61] leading-relaxed max-w-2xl">
              We reject bloated software, generic templates, and superficial AI wrappers. Every project we engineer is built from foundational principles—blending low-latency distributed systems, rigorous cryptographic guarantees, and verified models into tools that empower developers, hackathons, and high-velocity teams.
            </p>

            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-1.5 text-xs text-[#244638] font-semibold hover:text-[#A15E40] text-mono tracking-wider transition-colors"
              >
                <span>EXPLORE COLLECTIVE ARCHITECTURE</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* 4 Core Principles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 pt-12 border-t border-[#244638]/12">
          {principles.map((item) => (
            <div
              key={item.num}
              className="bg-[#FFFCF7] p-6 rounded-xl border border-[#244638]/12 shadow-card space-y-3"
            >
              <span className="font-serif text-2xl text-[#A15E40]">{item.num}</span>
              <div className="text-mono text-xs text-[#244638] font-semibold tracking-wider">
                {item.label}
              </div>
              <p className="text-xs text-[#686B61] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default AboutSection;
