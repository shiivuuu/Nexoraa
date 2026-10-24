import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDown, Cpu, Layers, ShieldCheck, Terminal, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';
import StackedCards from './StackedCards';

const focusAreas = [
  {
    num: '01',
    title: 'Foundational AI & Reasoning',
    summary: 'Autonomous agent orchestration, hybrid neuro-symbolic reasoning verifiers, and high-precision RAG systems.',
    discipline: 'MACHINE INTELLIGENCE',
    link: '/research'
  },
  {
    num: '02',
    title: 'High-Velocity Distributed Systems',
    summary: 'Low-latency event pipelines, WebSocket real-time state synchronization, and fault-tolerant local-first runtimes.',
    discipline: 'SYSTEMS ARCHITECTURE',
    link: '/projects'
  },
  {
    num: '03',
    title: 'Edge Computer Vision & Perception',
    summary: 'Sub-120ms privacy-preserving edge inference, optical flow telemetry, and real-time spatial density monitoring.',
    discipline: 'SPATIAL TELEMETRY',
    link: '/research'
  },
  {
    num: '04',
    title: 'Defensive Security & Tooling',
    summary: 'Decentralized cryptographic proofs, developer automation runtimes, and verified open-source engineering tools.',
    discipline: 'SECURITY & DEVTOOLS',
    link: '/projects'
  }
];

const Hero = () => {
  const [activePillar, setActivePillar] = useState(0);

  const scrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[90vh] lg:min-h-screen pt-32 sm:pt-36 lg:pt-40 pb-20 sm:pb-24 flex flex-col justify-between bg-[#F5F0E8] text-[#252922] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14 w-full">
        {/* Asymmetric 12-Column Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT: 7 Columns — Expressive Editorial Statement */}
          <div className="lg:col-span-7 space-y-8">
            {/* Pill Eyebrow */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full bg-[#FFFCF7] border border-[#244638]/15 text-xs text-[#244638] font-medium shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A15E40]" />
              <span className="text-mono text-[11px] tracking-wider text-[#244638]">
                EST. 2026 // ENGINEERING COLLECTIVE &amp; LAB
              </span>
            </div>

            {/* Editorial Headline in Instrument Serif */}
            <h1 className="font-serif text-display text-[#244638] font-normal tracking-tight">
              Engineering foundational intelligence and resilient computational architectures.
            </h1>

            {/* Controlled Text Width in DM Sans */}
            <p className="text-base sm:text-lg text-[#686B61] max-w-xl font-normal leading-relaxed">
              Nexora is an independent technology collective focused on production systems, computer vision perception, and verifiable reasoning engines. Built from foundational principles without template bloat or artificial superficiality.
            </p>

            {/* CTAs & Quick Metrics */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={scrollToProjects}
                className="btn-primary"
              >
                <span>Explore Selected Work</span>
                <span className="text-xs">↓</span>
              </button>

              <Link
                to="/research"
                className="btn-secondary"
              >
                <span>Research Initiatives</span>
                <ArrowUpRight className="w-4 h-4 text-[#A15E40]" />
              </Link>
            </div>

            {/* Sub-footer metadata */}
            <div className="pt-8 border-t border-[#244638]/12 grid grid-cols-2 sm:grid-cols-3 gap-6 text-xs text-[#686B61]">
              <div>
                <span className="block text-mono text-[10px] text-[#A15E40] tracking-wider">FOUNDER &amp; ARCHITECT</span>
                <span className="font-medium text-[#252922] mt-0.5 block">Shivam Upendra Yadav</span>
              </div>
              <div>
                <span className="block text-mono text-[10px] text-[#A15E40] tracking-wider">PRIMARY DOMAINS</span>
                <span className="font-medium text-[#252922] mt-0.5 block">AI, Systems &amp; Vision</span>
              </div>
              <div className="hidden sm:block">
                <span className="block text-mono text-[10px] text-[#A15E40] tracking-wider">LOCATION</span>
                <span className="font-medium text-[#252922] mt-0.5 block">Mumbai // Distributed</span>
              </div>
            </div>
          </div>

          {/* RIGHT: 5 Columns — Art-Directed Editorial Case Panel */}
          <div className="lg:col-span-5">
            <StackedCards
              items={focusAreas}
              activeIndex={activePillar}
              onSelectIndex={setActivePillar}
            />
          </div>

        </div>
      </div>

      {/* Bottom Scroll Prompt */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14 w-full pt-12 flex items-center justify-between text-mono text-[11px] text-[#686B61]">
        <button
          onClick={scrollToProjects}
          className="inline-flex items-center gap-2 hover:text-[#244638] transition-colors group cursor-pointer"
        >
          <ArrowDown className="w-3.5 h-3.5 text-[#A15E40] group-hover:translate-y-0.5 transition-transform" />
          <span>SCROLL TO VIEW CASE STUDIES</span>
        </button>
        <span className="hidden sm:inline text-[#A15E40]">INDEX // VOL. 01</span>
      </div>
    </section>
  );
};

export default Hero;
