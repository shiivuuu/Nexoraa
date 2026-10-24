import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../common/Logo';

const Footer = () => {
  const [times, setTimes] = useState({
    mumbai: '--:--:--',
    utc: '--:--:--',
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimes({
        mumbai: now.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour12: false }),
        utc: now.toLocaleTimeString('en-US', { timeZone: 'UTC', hour12: false })
      });
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="relative bg-[#244638] text-[#F5F0E8] overflow-hidden pt-16 sm:pt-20 pb-12 select-none border-t border-[#1B362B]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14 relative z-10">
        {/* Top Grid: Brand, Active Clocks, Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-14 border-b border-white/10">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <span className="font-serif text-3xl sm:text-4xl tracking-tight text-[#FFFCF7]">
                NEXORA
              </span>
              <span className="text-mono text-[10px] text-[#A15E40] tracking-widest pl-3 border-l border-white/15">
                COLLECTIVE
              </span>
            </div>
            <p className="text-sm text-[#E6DFD3]/80 max-w-sm font-normal leading-relaxed">
              An independent engineering lab focused on foundational artificial intelligence, high-performance distributed systems, and verified software architecture.
            </p>
            <div className="pt-2 text-mono text-xs text-[#E6DFD3]/60">
              MUMBAI // BENGALURU // REMOTE
            </div>
          </div>

          {/* Active Nodes Clocks */}
          <div className="md:col-span-3 text-mono text-xs space-y-3">
            <div className="text-[#A15E40] tracking-widest text-[11px]">
              OBSERVATORY // TELEMETRY
            </div>
            <div className="space-y-2 text-[#E6DFD3]/80">
              <div className="flex justify-between border-b border-white/10 pb-1.5">
                <span>MUMBAI (IST)</span>
                <span className="text-[#FFFCF7] font-medium">{times.mumbai}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-1.5">
                <span>UTC COORDINATED</span>
                <span className="text-[#FFFCF7] font-medium">{times.utc}</span>
              </div>
              <div className="flex justify-between pt-0.5 text-[11px] text-[#E6DFD3]/60">
                <span>SYSTEM STATUS</span>
                <span className="text-[#A15E40] font-medium">ONLINE // OPERATIONAL</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-2 text-xs space-y-3">
            <div className="text-mono text-[#A15E40] tracking-widest text-[11px]">
              INDEX
            </div>
            <ul className="space-y-2 text-[#E6DFD3]/80">
              <li><Link to="/projects" className="hover:text-white transition-colors">Work</Link></li>
              <li><Link to="/research" className="hover:text-white transition-colors">Research</Link></li>
              <li><Link to="/team" className="hover:text-white transition-colors">The Team</Link></li>
              <li><Link to="/community" className="hover:text-white transition-colors">Community</Link></li>
              <li><Link to="/ai" className="hover:text-white transition-colors">AI Intelligence</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Manifesto</Link></li>
            </ul>
          </div>

          {/* Connect & Admin */}
          <div className="md:col-span-2 text-xs space-y-3">
            <div className="text-mono text-[#A15E40] tracking-widest text-[11px]">
              NETWORK
            </div>
            <ul className="space-y-2 text-[#E6DFD3]/80">
              <li>
                <a
                  href="https://github.com/shiivuuu/Nexoraa"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1.5"
                >
                  <span>GitHub</span>
                  <span className="text-[10px] text-[#A15E40]">↗</span>
                </a>
              </li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Inquiries</Link></li>
              <li><Link to="/join" className="hover:text-white transition-colors">Join Fellowship</Link></li>
              <li className="pt-3 border-t border-white/10">
                <Link
                  to="/admin"
                  className="text-mono text-[11px] text-[#E6DFD3]/60 hover:text-[#FFFCF7] transition-colors"
                >
                  Admin Portal →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Editorial Giant Wordmark in Instrument Serif */}
        <div className="pt-12 sm:pt-16 pb-6 text-center select-none overflow-hidden">
          <div className="font-serif text-[clamp(3.5rem,12vw,9.5rem)] font-normal text-[#FFFCF7]/15 leading-none tracking-tight">
            NEXORA
          </div>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#E6DFD3]/60 text-mono">
            <div>
              &copy; {new Date().getFullYear()} NEXORA COLLECTIVE. ALL RIGHTS RESERVED.
            </div>
            <div className="text-[#A15E40]">
              BUILT FOR WHAT COMES NEXT
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
