import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Cpu, ShieldAlert, Database, Activity, Orbit } from 'lucide-react';
import { Link } from 'react-router-dom';

const capabilities = [
  {
    num: "01",
    domain: "AI & INTELLIGENCE",
    icon: Cpu,
    title: "Autonomous Agents & Neuro-Symbolic Verification",
    overview: "Engineering cognitive agent loops that execute multi-step deterministic workflows without hallucination. Combining transformer embeddings with formal logical deduction graphs.",
    deliverables: [
      "First-order logic solver integration with LangChain orchestration",
      "Deterministic graph constraint validation across Neo4j pipelines",
      "Dynamic prompt grounding with zero-shot semantic verification",
      "Sub-200ms edge SLM inference benchmarks on browser WebGPU"
    ],
    status: "ACTIVE EXPERIMENTATION // 2026"
  },
  {
    num: "02",
    domain: "CYBERSECURITY",
    icon: ShieldAlert,
    title: "Zero-Knowledge Cryptography & Defense",
    overview: "Building privacy-preserving communication protocols, ephemeral key exchanges, and automated exploit detection systems for national hackathons and distributed environments.",
    deliverables: [
      "zk-SNARK state verifications for multi-tenant collaborative hubs",
      "Automated fuzzing and AST static analysis security bots",
      "Hardware-isolated cryptographic enclave key management",
      "Sub-millisecond packet entropy analysis for perimeter defense"
    ],
    status: "DEFENSE AUDITED // PRODUCTION"
  },
  {
    num: "03",
    domain: "DISTRIBUTED SYSTEMS",
    icon: Database,
    title: "Distributed Low-Latency Platforms & State Sync",
    overview: "Crafting scalable cloud architectures, reactive WebSocket event streams, and optimistic client interfaces that maintain consistency across global nodes.",
    deliverables: [
      "Sub-20ms WebSocket cluster state propagation engine",
      "Conflict-free replicated data types (CRDT) synchronization",
      "MongoDB Atlas schemas with hybrid offline caching fallback",
      "Production-ready Docker containers and CI/CD pipelines"
    ],
    status: "CORE ARCHITECTURE // DEPLOYED"
  },
  {
    num: "04",
    domain: "COMPUTER VISION",
    icon: Activity,
    title: "Edge Computer Vision & Crowd Safety Telemetry",
    overview: "Deploying high-speed edge vision inference on low-power hardware, detecting motion anomalies, density gradients, and tracking objects without cloud latency.",
    deliverables: [
      "Real-time YOLOv8 density estimation regression head",
      "Sub-120ms optical flow velocity vector field processing",
      "Privacy-preserving edge silhouette filtering without facial storage",
      "Automated siren dispatch and push notification hooks"
    ],
    status: "AWARD WINNING // COMPETITION VALIDATED"
  },
  {
    num: "05",
    domain: "DEVELOPER TECHNOLOGY",
    icon: Orbit,
    title: "High-Throughput Developer Tooling & Automation",
    overview: "Creating open-source CLI utilities, autonomous GitHub PR review bots, and vector-backed documentation intelligence engines that accelerate developer velocity.",
    deliverables: [
      "Context-aware codebase indexing and syntax tree comprehension",
      "Autonomous changelog generation and semantic versioning",
      "Multi-modal document parsing (PDF, DOCX, Code, Schematics)",
      "Zero-dependency local-first developer runtime tools"
    ],
    status: "OPEN SOURCE // COMMUNITY HUB"
  }
];

const ResearchSection = () => {
  const [selected, setSelected] = useState(0);
  const activeCap = capabilities[selected];
  const IconComponent = activeCap.icon;

  return (
    <section id="research" className="relative py-24 sm:py-32 bg-[#244638] text-[#F5F0E8] select-none border-t border-[#1B362B]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/12">
          <div>
            <div className="flex items-center gap-2 mb-3 text-mono text-xs text-[#A15E40] tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A15E40]" />
              02 / RESEARCH INITIATIVES
            </div>
            <h2 className="font-serif text-title text-[#FFFCF7] font-normal leading-none tracking-tight">
              Frontier Systems &amp; Disciplines
            </h2>
          </div>
          <div className="text-sm text-[#E6DFD3]/80 max-w-sm leading-relaxed">
            Rigorous applied research across five specialized computational domains, combining verified mathematical logic with real-world low-latency systems.
          </div>
        </div>

        {/* Interactive Capability Selector Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 pt-12 items-start">
          
          {/* LEFT: Selector List (5 cols) */}
          <div className="lg:col-span-5 space-y-2">
            <div className="text-mono text-[10px] text-[#E6DFD3]/60 tracking-widest mb-4">
              RESEARCH DOMAINS
            </div>

            {capabilities.map((item, idx) => {
              const isCurrent = selected === idx;
              return (
                <button
                  key={item.num}
                  onClick={() => setSelected(idx)}
                  className={`w-full flex items-center justify-between p-4 rounded-lg text-left transition-all duration-200 border ${
                    isCurrent
                      ? 'bg-[#1B362B] border-[#A15E40] text-[#FFFCF7] shadow-sm'
                      : 'bg-transparent border-white/8 text-[#E6DFD3]/75 hover:border-white/20 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <span className={`text-mono text-xs font-semibold ${
                      isCurrent ? 'text-[#A15E40]' : 'text-[#E6DFD3]/50'
                    }`}>
                      {item.num}
                    </span>
                    <span className="text-xs sm:text-sm font-medium tracking-wide">
                      {item.domain}
                    </span>
                  </div>
                  <span className={`w-2 h-2 rounded-full transition-colors ${
                    isCurrent ? 'bg-[#A15E40]' : 'bg-white/15'
                  }`} />
                </button>
              );
            })}

            <div className="pt-6">
              <Link
                to="/research"
                className="inline-flex items-center gap-2 text-xs text-[#E6DFD3] hover:text-[#FFFCF7] transition-colors font-medium border-b border-white/20 pb-1"
              >
                <span>Explore Full Research Papers &amp; Benchmarks</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#A15E40]" />
              </Link>
            </div>
          </div>

          {/* RIGHT: Selected Capability Card (7 cols) */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCap.num}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="bg-[#1B362B] p-7 sm:p-10 rounded-xl border border-white/12 shadow-elevated space-y-6"
              >
                {/* Card Top Metadata */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4 text-mono text-xs">
                  <div className="flex items-center gap-2 text-[#A15E40]">
                    <IconComponent className="w-4 h-4" />
                    <span>DOMAIN SPECIFICATION // {activeCap.num}</span>
                  </div>
                  <div className="text-[10px] text-[#E6DFD3] bg-[#244638] border border-white/15 px-2.5 py-0.5 rounded">
                    {activeCap.status}
                  </div>
                </div>

                {/* Capability Title */}
                <h3 className="font-serif text-2xl sm:text-3xl text-[#FFFCF7] tracking-tight leading-snug">
                  {activeCap.title}
                </h3>

                {/* Capability Overview */}
                <p className="text-sm sm:text-base text-[#E6DFD3]/85 leading-relaxed font-normal">
                  {activeCap.overview}
                </p>

                {/* Key Research Deliverables */}
                <div className="pt-5 border-t border-white/10 space-y-3">
                  <div className="text-mono text-[10px] text-[#A15E40] tracking-widest">
                    SYSTEM DELIVERABLES &amp; CAPABILITIES:
                  </div>
                  <ul className="space-y-2.5">
                    {activeCap.deliverables.map((d, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-[#E6DFD3]/90">
                        <span className="text-[#A15E40] text-xs mt-0.5">■</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ResearchSection;
