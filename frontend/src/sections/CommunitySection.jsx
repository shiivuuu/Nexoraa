import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, MessageSquare, Terminal, GitPullRequest, Code2, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const collaborationTracks = [
  {
    num: "01",
    name: "Systems & Distributed Runtimes",
    desc: "Collaborate on low-latency state synchronization, WebSocket communication protocols, and local-first offline architectures.",
    icon: Code2
  },
  {
    num: "02",
    name: "AI & Neuro-Symbolic Logic",
    desc: "Contribute to verifiable deduction graphs, constraint theorem provers, and dynamic RAG document parsing models.",
    icon: Terminal
  },
  {
    num: "03",
    name: "Computer Vision & Multimodal Systems",
    desc: "Collaborate on image representation backbones, visual feature extractors, and multimodal embedding pipelines.",
    icon: Users
  },
  {
    num: "04",
    name: "Open Source Tooling & Automation",
    desc: "Build developer CLI utilities, automated GitHub PR review systems, and zero-dependency developer tools.",
    icon: GitPullRequest
  }
];

const CommunitySection = () => {
  return (
    <section id="community" className="relative py-24 sm:py-32 bg-[#F5F0E8] text-[#252922] border-t border-[#244638]/12">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#244638]/12">
          <div>
            <div className="flex items-center gap-2 mb-3 text-mono text-xs text-[#A15E40] tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A15E40]" />
              05 / LAB FELLOWSHIP
            </div>
            <h2 className="font-serif text-title text-[#244638] font-normal leading-none tracking-tight">
              Community &amp; Open Research
            </h2>
          </div>
          <div className="text-sm text-[#686B61] max-w-sm leading-relaxed">
            Nexora functions as both a dedicated engineering lab and an open collaborative ecosystem for disciplined software engineers and researchers.
          </div>
        </div>

        {/* Tracks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-12">
          {collaborationTracks.map((track, idx) => {
            const Icon = track.icon;
            return (
              <div
                key={track.num}
                className="bg-[#FFFCF7] p-6 sm:p-7 rounded-xl border border-[#244638]/15 shadow-card space-y-4 hover:border-[#244638]/30 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-mono text-xs text-[#A15E40]">
                    <span>TRACK // {track.num}</span>
                    <Icon className="w-4 h-4 text-[#244638]" />
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#244638] font-normal leading-snug">
                    {track.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#686B61] leading-relaxed">
                    {track.desc}
                  </p>
                </div>

                <div className="pt-2 text-mono text-[10px] text-[#A15E40] tracking-wider">
                  ACTIVE FELLOWSHIP TRACK
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action Bar */}
        <div className="mt-14 p-8 sm:p-10 rounded-xl bg-[#244638] text-[#F5F0E8] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="font-serif text-2xl sm:text-3xl text-[#FFFCF7]">
              Join the Engineering Collective
            </h3>
            <p className="text-xs sm:text-sm text-[#E6DFD3]/80 max-w-md">
              Submit your engineering portfolio and background. We review applications for collaborative research fellows on a continuous rolling basis.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/join"
              className="px-5 py-2.5 bg-[#FFFCF7] hover:bg-[#F5F0E8] text-[#244638] rounded-md text-xs font-medium tracking-wide uppercase transition-colors"
            >
              Apply for Fellowship
            </Link>
            <a
              href="https://github.com/shiivuuu/Nexoraa"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 border border-white/20 hover:border-white text-[#F5F0E8] rounded-md text-xs font-medium transition-colors"
            >
              View GitHub
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default CommunitySection;
