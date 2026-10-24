import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import Logo from '../common/Logo';
import MobileMenu from './MobileMenu';

const navLinks = [
  { num: '01', title: 'Work', path: '/projects' },
  { num: '02', title: 'Research', path: '/research' },
  { num: '03', title: 'Team', path: '/team' },
  { num: '04', title: 'Community', path: '/community' },
  { num: '05', title: 'AI Assistant', path: '/ai' },
  { num: '06', title: 'Contact', path: '/contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 select-none ${
          scrolled
            ? 'bg-[#F5F0E8]/90 backdrop-blur-md border-b border-[#244638]/10 py-3 sm:py-3.5 shadow-sm'
            : 'bg-transparent border-b border-transparent py-5 sm:py-6'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14 flex items-center justify-between">
          {/* LEFT: Nexora Brand Logo */}
          <div className="flex items-center gap-4">
            <Logo size="md" />
            <span className="hidden xl:inline-block text-mono text-[10px] text-nex-secondary tracking-widest pl-4 border-l border-[#244638]/15">
              EST. 2026 // LAB
            </span>
          </div>

          {/* CENTER: Minimal Editorial Navigation */}
          <nav className="hidden lg:flex items-center gap-8 xl:gap-9">
            {navLinks.map((link) => {
              const isActive =
                location.pathname === link.path ||
                (link.path === '/projects' && location.pathname.startsWith('/projects/'));
              return (
                <NavLink
                  key={link.num}
                  to={link.path}
                  className={({ isActive: exactActive }) =>
                    `group relative flex items-center gap-1.5 text-sm font-medium tracking-normal transition-colors py-1 ${
                      isActive || exactActive
                        ? 'text-nex-forest font-semibold'
                        : 'text-nex-secondary hover:text-nex-primary'
                    }`
                  }
                >
                  <span>{link.title}</span>
                  <span
                    className={`absolute -bottom-1 left-0 right-0 h-[1.5px] bg-nex-copper transition-all duration-200 ${
                      isActive
                        ? 'opacity-100 scale-x-100'
                        : 'opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'
                    }`}
                  />
                </NavLink>
              );
            })}
          </nav>

          {/* RIGHT: Actions */}
          <div className="flex items-center gap-4">
            {/* Join Collective CTA */}
            <Link
              to="/join"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-nex-forest hover:bg-nex-forest-dark text-[#F5F0E8] rounded-md text-xs font-medium tracking-wider uppercase transition-all duration-200 shadow-sm"
            >
              <span>Join Collective</span>
              <span>→</span>
            </Link>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2.5 border border-[#244638]/15 bg-[#FFFCF7] hover:border-nex-forest rounded-md text-nex-forest transition-all flex items-center gap-2 text-xs font-medium"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-4 h-4 text-nex-forest" />
              <span className="text-mono text-[11px]">Menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Menu Overlay */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
};

export default Navbar;
