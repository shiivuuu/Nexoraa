import React from 'react';
import { ArrowUpRight, Cpu, ShieldCheck, Code, Layers, Zap, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';

const pillars = [
  {
    num: "01",
    title: "Foundational Engineering",
    desc: "We prioritize clean algorithms, strong type safety, and low-latency system design over superficial frameworks. Every line of code is intentional."
  },
  {
    num: "02",
    title: "AI with Deterministic Integrity",
    desc: "We combine generative probabilistic models with symbolic logic graphs and formal theorem verifiers to eradicate hallucinations."
  },
  {
    num: "03",
    title: "Tactile & Editorial Design",
    desc: "Inspired by minimalist physical editorial design, generous negative space, and disciplined typography. Software should feel like an engineered instrument."
  },
  {
    num: "04",
    title: "Open Community & Fellowship",
    desc: "We validate our architectures through open-source collaboration, peer review, and competitive engineering sprints."
  }
];

const AboutPage = () => {
  return (
    <div className="min-h-screen pt-32 sm:pt-36 pb-24 bg-[#F5F0E8] text-[#252922]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14">
        
        {/* Header */}
        <div className="pb-12 border-b border-[#244638]/12 space-y-4">
          <div className="flex items-center gap-2 text-mono text-xs text-[#A15E40] tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A15E40]" />
            ORGANIZATIONAL MANIFESTO
          </div>
          <h1 className="font-serif text-display text-[#244638] font-normal tracking-tight">
            The Nexora Collective
          </h1>
          <p className="text-base sm:text-lg text-[#686B61] max-w-2xl font-normal leading-relaxed">
            An independent research lab and engineering collective founded by Shivam Upendra Yadav, dedicated to building verified software, distributed systems, and real-world intelligence.
          </p>
        </div>

        {/* Narrative Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 py-16 border-b border-[#244638]/12 items-start">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-mono text-xs text-[#A15E40] tracking-widest block">
              MISSION // VISION
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#244638]">
              Rejecting generic software templates and synthetic wrappers.
            </h2>
          </div>

          <div className="lg:col-span-7 space-y-6 text-sm sm:text-base text-[#686B61] leading-relaxed">
            <p>
              In an era dominated by superficial software wrappers and low-effort generative clones, Nexora stands for disciplined systems engineering. We believe that true technological leverage comes from understanding memory layouts, networking sockets, deterministic constraint satisfaction, and high-performance concurrency.
            </p>
            <p>
              From autonomous engineering command centers and local-first mesh runtimes to verifiable reasoning engines, our systems operate at the bleeding edge of performance, security, and human-computer ergonomics.
            </p>
          </div>
        </div>

        {/* 4 Architectural Pillars */}
        <div className="py-16 border-b border-[#244638]/12 space-y-10">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-mono text-xs text-[#A15E40] tracking-widest block mb-2">
                CORE TENETS
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#244638]">
                Architectural Foundations
              </h2>
            </div>
            <span className="text-mono text-xs text-[#686B61]">
              04 PILLARS
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar) => (
              <div
                key={pillar.num}
                className="bg-[#FFFCF7] p-6 rounded-xl border border-[#244638]/15 shadow-card space-y-3"
              >
                <span className="font-serif text-3xl text-[#A15E40]">{pillar.num}</span>
                <h3 className="font-serif text-xl text-[#244638]">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#686B61] leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Link */}
        <div className="pt-14 flex flex-wrap items-center gap-6">
          <Link
            to="/projects"
            className="btn-primary"
          >
            <span>Explore Our Systems</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>

          <Link
            to="/contact"
            className="btn-secondary"
          >
            <span>Initiate Contact</span>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default AboutPage;
