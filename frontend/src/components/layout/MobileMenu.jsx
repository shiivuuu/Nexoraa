import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight } from 'lucide-react';
import Logo from '../common/Logo';

const navItems = [
  { num: '01', title: 'Selected Work', path: '/projects' },
  { num: '02', title: 'Research & Systems', path: '/research' },
  { num: '03', title: 'The Collective', path: '/team' },
  { num: '04', title: 'Community & Lab', path: '/community' },
  { num: '05', title: 'Neural Assistant', path: '/ai' },
  { num: '06', title: 'Contact & Inquiries', path: '/contact' },
  { num: '07', title: 'Join Nexora', path: '/join' },
];

const MobileMenu = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleLinkClick = (path) => {
    onClose();
    navigate(path);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] bg-[#F5F0E8] flex flex-col justify-between p-6 sm:p-10 select-none text-nex-primary"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-[#244638]/12 pb-5">
            <Logo size="sm" />
            <button
              onClick={onClose}
              className="p-2.5 rounded-full border border-[#244638]/15 bg-[#FFFCF7] text-nex-primary hover:border-nex-forest transition-colors"
              aria-label="Close Navigation"
            >
              <X className="w-5 h-5 text-nex-forest" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="my-auto py-8 space-y-4">
            {navItems.map((item) => (
              <div key={item.num} className="overflow-hidden">
                <button
                  onClick={() => handleLinkClick(item.path)}
                  className="w-full text-left py-2 flex items-baseline justify-between group border-b border-[#244638]/8"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="text-mono text-xs text-nex-copper">
                      {item.num}
                    </span>
                    <span className="font-serif text-3xl sm:text-4xl text-nex-primary group-hover:text-nex-forest transition-colors">
                      {item.title}
                    </span>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-nex-secondary group-hover:text-nex-forest group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            ))}
          </nav>

          {/* Footer Metadata */}
          <div className="border-t border-[#244638]/12 pt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-nex-secondary">
            <div className="text-mono text-[11px]">
              NEXORA COLLECTIVE // 2026
            </div>
            <div className="text-mono text-[11px] text-nex-copper">
              BUILDING WHAT COMES NEXT
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
