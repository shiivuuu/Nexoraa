import React from 'react';
import ResearchSection from '../sections/ResearchSection';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const papers = [
  {
    title: "Deterministic Constraint Verification in Large Language Reasoning Chains",
    domain: "NEURO-SYMBOLIC AI",
    date: "2026",
    abstract: "A methodology for compiling natural language multi-step queries into formal First-Order Logic constraints, resolved against continuous knowledge graphs.",
    author: "Nexora AI Research Group"
  },
  {
    title: "Privacy-Preserving Edge Optical Flow for Density Prediction in Dense Public Gatherings",
    domain: "COMPUTER VISION",
    date: "2026",
    abstract: "Extracting motion vectors and turbulence coefficients from low-bitrate CCTV feeds without biometric facial storage, maintaining verified accuracy on edge GPUs.",
    author: "Shivam Upendra Yadav, Nexora AI Lab"
  },
  {
    title: "Local-First Ephemeral Key Agreement across Partitioned Mesh Topologies",
    domain: "CYBERSECURITY",
    date: "2026",
    abstract: "A state-based CRDT replication framework with cryptographic authentication over Bluetooth and mDNS without cloud dependencies.",
    author: "Shivam Upendra Yadav, Nexora Security Labs"
  }
];

const ResearchPage = () => {
  return (
    <div className="min-h-screen pt-32 sm:pt-36 pb-24 bg-[#F5F0E8] text-[#252922]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14">
        
        {/* Header */}
        <div className="pb-12 border-b border-[#244638]/12 space-y-4">
          <div className="flex items-center gap-2 text-mono text-xs text-[#A15E40] tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A15E40]" />
            RESEARCH LABS &amp; PUBLICATIONS
          </div>
          <h1 className="font-serif text-display text-[#244638] font-normal tracking-tight">
            Research &amp; Capabilities
          </h1>
          <p className="text-base sm:text-lg text-[#686B61] max-w-2xl font-normal leading-relaxed">
            Theoretical experimentation, benchmark evaluations, and open publications advancing autonomous intelligence and secure distributed systems.
          </p>
        </div>

        {/* Embedded Interactive Capability Component */}
        <div className="mt-8 rounded-2xl overflow-hidden border border-[#244638]/15 shadow-card">
          <ResearchSection />
        </div>

        {/* Research Publications & Preprints */}
        <div className="pt-20 space-y-8">
          <div className="flex items-center justify-between pb-4 border-b border-[#244638]/12">
            <h2 className="font-serif text-3xl text-[#244638]">
              Selected Publications &amp; Preprints
            </h2>
            <span className="text-mono text-xs text-[#686B61]">NEXORA LAB ARCHIVE</span>
          </div>

          <div className="divide-y divide-[#244638]/10">
            {papers.map((p, idx) => (
              <div
                key={idx}
                className="py-8 group space-y-3 hover:bg-[#FFFCF7]/70 rounded-lg p-4 sm:p-6 transition-colors"
              >
                <div className="flex items-center justify-between text-mono text-xs text-[#686B61]">
                  <span className="text-[#A15E40] font-semibold">{p.domain}</span>
                  <span>{p.date}</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#244638] group-hover:text-[#A15E40] transition-colors">
                  {p.title}
                </h3>
                <p className="text-sm text-[#686B61] max-w-3xl leading-relaxed">
                  {p.abstract}
                </p>
                <div className="text-xs text-[#686B61] pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-[#244638]/8">
                  <span className="text-mono text-[11px]">AUTHORS: {p.author}</span>
                  <span className="text-xs font-medium text-[#244638] inline-flex items-center gap-1 group-hover:text-[#A15E40] transition-colors">
                    <span>Read Abstract</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ResearchPage;
