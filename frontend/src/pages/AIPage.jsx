import React from 'react';
import AISection from '../sections/AISection';

const AIPage = () => {
  return (
    <div className="min-h-screen pt-32 sm:pt-36 pb-24 bg-[#F5F0E8] text-[#252922]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14">
        
        {/* Header */}
        <div className="pb-12 border-b border-[#244638]/12 space-y-4">
          <div className="flex items-center gap-2 text-mono text-xs text-[#A15E40] tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A15E40]" />
            KNOWLEDGE BASE &amp; TELEMETRY
          </div>
          <h1 className="font-serif text-display text-[#244638] font-normal tracking-tight">
            Neural Systems Assistant
          </h1>
          <p className="text-base sm:text-lg text-[#686B61] max-w-2xl font-normal leading-relaxed">
            Query the Nexora repository and research index directly. Receive answers on systems architecture, mathematical logic verifiers, and fellowship tracks.
          </p>
        </div>

        {/* Section Embed */}
        <div className="mt-8 rounded-2xl overflow-hidden border border-[#244638]/15 shadow-card">
          <AISection />
        </div>

      </div>
    </div>
  );
};

export default AIPage;
