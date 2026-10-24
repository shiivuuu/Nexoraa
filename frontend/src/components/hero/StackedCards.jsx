import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const StackedCards = ({ items = [], activeIndex = 0, onSelectIndex }) => {
  const activeItem = items[activeIndex] || items[0];

  return (
    <div className="w-full bg-[#FFFCF7] rounded-xl border border-[#244638]/15 shadow-card p-6 sm:p-8 select-none">
      {/* Card Header */}
      <div className="flex items-center justify-between pb-5 border-b border-[#244638]/10">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#A15E40]" />
          <span className="text-mono text-[11px] text-[#244638] font-semibold tracking-wider">
            OPERATIONAL PILLARS
          </span>
        </div>
        <span className="text-mono text-[11px] text-[#686B61]">
          ACTIVE / 0{items.length}
        </span>
      </div>

      {/* Selectable Pillars List */}
      <div className="divide-y divide-[#244638]/8 my-4">
        {items.map((item, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={item.num}
              onClick={() => onSelectIndex(idx)}
              className={`w-full text-left py-3.5 px-3 rounded-lg transition-all flex items-baseline justify-between group ${
                isActive
                  ? 'bg-[#E6DFD3]/60'
                  : 'hover:bg-[#F5F0E8]/70'
              }`}
            >
              <div className="flex items-baseline gap-3">
                <span className={`text-mono text-xs font-semibold ${
                  isActive ? 'text-[#A15E40]' : 'text-[#686B61]'
                }`}>
                  {item.num}
                </span>
                <span className={`font-serif text-lg sm:text-xl transition-colors ${
                  isActive ? 'text-[#244638] font-medium' : 'text-[#252922] group-hover:text-[#244638]'
                }`}>
                  {item.title}
                </span>
              </div>
              <span className="text-mono text-[10px] text-[#A15E40] tracking-wider hidden sm:inline">
                {item.discipline}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Pillar Editorial Highlight */}
      {activeItem && (
        <div className="mt-4 pt-5 border-t border-[#244638]/10 bg-[#F5F0E8]/60 p-4 sm:p-5 rounded-lg space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-mono text-[10px] text-[#A15E40] tracking-widest">
              DISCIPLINE // {activeItem.discipline}
            </span>
            <span className="text-mono text-[10px] text-[#244638] font-medium">
              VERIFIED ARCHITECTURE
            </span>
          </div>

          <p className="text-sm text-[#252922] leading-relaxed font-normal">
            {activeItem.summary}
          </p>

          <div className="pt-2 flex items-center justify-between">
            <Link
              to={activeItem.link}
              className="inline-flex items-center gap-1.5 text-xs text-[#244638] font-semibold hover:text-[#A15E40] transition-colors"
            >
              <span>Explore Documentation</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
            <span className="text-mono text-[10px] text-[#686B61]">
              PILLAR 0{activeIndex + 1} OF 0{items.length}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default StackedCards;
