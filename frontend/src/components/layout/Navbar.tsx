import React, { useState, useEffect, useRef } from 'react';
import { Shield, ArrowUpRight, Menu, X, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useSmoothScroll } from '../../context/SmoothScrollContext';
import { MagicalAudioPlayer } from '../common/MagicalAudioPlayer';
import { gsap, ScrollTrigger, MM_CONDITIONS } from '../../lib/gsap';

interface NavbarProps {
  onOpenAdmin: () => void;
  onOpenSubmission?: () => void;
}

const SECTION_IDS = [
  'top',
  'about',
  'events',
  'workshops',
  'showcase',
  'schedule',
  'register',
  'gallery',
  'faq',
  'contact',
];

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('top');
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const { isAdmin } = useAuth();
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    const bar = progressBarRef.current;

    const ctx = gsap.context(() => {
      if (bar) {
        gsap.fromTo(
          bar,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: document.documentElement,
              start: 'top top',
              end: 'bottom bottom',
              scrub: true,
            },
          }
        );
      }

      SECTION_IDS.forEach((sectionId) => {
        const el = document.getElementById(sectionId);
        if (!el) return;
        ScrollTrigger.create({
          trigger: el,
          start: 'top 170px',
          end: 'bottom 170px',
          onEnter: () => setActiveSection(sectionId),
          onEnterBack: () => setActiveSection(sectionId),
        });
      });
    });

    const mm = gsap.matchMedia();
    mm.add(MM_CONDITIONS.reduced, () => {
      // Static bar handled cleanly if needed
    });

    return () => {
      ctx.revert();
      mm.revert();
    };
  }, []);

  const navLinks = [
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Challenges', href: '#events', id: 'events' },
    { name: 'Potions Lab', href: '#workshops', id: 'workshops' },
    { name: 'Inventions', href: '#showcase', id: 'showcase' },
    { name: 'Map Schedule', href: '#schedule', id: 'schedule' },
    { name: 'Portraits', href: '#gallery', id: 'gallery' },
    { name: 'Library FAQ', href: '#faq', id: 'faq' },
    { name: 'Owl Post', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    if (href === '#top') {
      scrollTo(0);
    } else {
      scrollTo(href);
    }
  };

  return (
    <header className="sticky top-2.5 mx-auto max-w-6xl w-[calc(100%-20px)] z-50 bg-[#120E1E]/92 backdrop-blur-md border-2 border-[#D6B36A] rounded-sm shadow-[0_10px_35px_rgba(0,0,0,0.8),0_0_20px_rgba(214,179,106,0.2)] transition-all">
      {/* Scroll-triggered magical golden progress indicator */}
      <div
        ref={progressBarRef}
        className="scroll-progress-bar h-1"
        style={{
          transform: 'scaleX(0)',
          background: 'linear-gradient(90deg, #D6B36A, #762E42, #F3D58A)',
        }}
        aria-hidden="true"
      />

      <div className="wrap max-w-full px-4 sm:px-5">
        <nav className="h-14 sm:h-15 flex items-center justify-between">
          <a
            className="logo flex items-center gap-2.5 text-decoration-none group"
            href="#top"
            onClick={(e) => handleNavClick(e, '#top')}
          >
            {/* Hogwarts Wax Crest Icon */}
            <span className="w-7 h-7 rounded-full bg-gradient-to-br from-[#801B2E] via-[#5C1120] to-[#360811] border border-[#F3D58A] shadow-[0_0_10px_rgba(214,179,106,0.4)] flex items-center justify-center transition-transform group-hover:-translate-y-0.5">
              <span className="font-display font-black text-[10px] text-[#F3D58A]">TW</span>
            </span>
            <span className="font-display font-black text-base sm:text-lg tracking-wider text-[#F4EBDD] flex items-center gap-2">
              Tech Wizard
              <span className="px-2 py-0.5 rounded-sm bg-gradient-to-r from-[#D6B36A] to-[#F3D58A] border border-[#FFE27A] text-[10px] sm:text-xs font-cinzel font-black text-[#100D18] shadow-[0_0_8px_rgba(214,179,106,0.3)]">
                2027
              </span>
            </span>
          </a>

          {/* Mobile controls */}
          <div className="flex items-center gap-2 lg:hidden">
            <MagicalAudioPlayer />
            <button
              className="flex items-center justify-center p-2 rounded-sm border border-[#D6B36A] bg-[#1A1428] shadow-[0_0_8px_rgba(214,179,106,0.2)] text-[#F4EBDD]"
              aria-expanded={menuOpen}
              aria-label="Toggle navigation menu"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-3.5 xl:gap-4">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`font-cinzel text-xs xl:text-sm font-semibold tracking-wider transition-all relative py-1 px-1 flex items-center gap-1 ${
                    isActive ? 'text-[#F3D58A]' : 'text-[#C2BDCA] hover:text-[#F4EBDD]'
                  }`}
                >
                  {isActive && <Sparkles className="w-3 h-3 text-[#D6B36A] animate-pulse" />}
                  <span>{link.name}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#D6B36A] to-[#F3D58A] shadow-[0_0_8px_#F3D58A] rounded-full" />
                  )}
                </a>
              );
            })}

            {/* Magical Ambient Audio Controller */}
            <MagicalAudioPlayer />

            <a
              href="#register"
              onClick={(e) => handleNavClick(e, '#register')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm font-cinzel font-bold text-xs tracking-wider text-[#100D18] bg-gradient-to-r from-[#D6B36A] to-[#F3D58A] border border-[#FFE27A] shadow-[0_0_15px_rgba(214,179,106,0.4)] hover:shadow-[0_0_25px_rgba(243,213,138,0.7)] hover:-translate-y-0.5 transition-all cursor-pointer whitespace-nowrap"
            >
              <span>Hogwarts Pass</span>
              <ArrowUpRight size={13} />
            </a>

            <button
              onClick={() => onOpenAdmin()}
              aria-label="Admin Portal"
              title="Admin Portal"
              className={`p-2 rounded-sm border border-[#D6B36A] flex items-center justify-center transition-all cursor-pointer ${
                isAdmin
                  ? 'bg-gradient-to-r from-[#D6B36A] to-[#F3D58A] text-[#100D18] shadow-[0_0_12px_rgba(214,179,106,0.4)]'
                  : 'bg-[#181326] text-[#D6B36A] shadow-[0_0_8px_rgba(214,179,106,0.2)] hover:text-[#F3D58A] hover:border-[#F3D58A]'
              }`}
            >
              <Shield size={16} />
            </button>
          </div>
        </nav>

        {/* Mobile dropdown drawer */}
        {menuOpen && (
          <div className="lg:hidden pt-3 pb-5 border-t border-dashed border-[#D6B36A]/30 flex flex-col gap-2.5">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="font-sans text-sm font-bold text-[#E7D7B5] hover:text-[#F3D58A] py-1.5 px-2 rounded-sm hover:bg-[#1A1428]"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2 flex items-center justify-between border-t border-dashed border-[#D6B36A]/20">
              <a
                href="#register"
                onClick={(e) => handleNavClick(e, '#register')}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-sm font-mono font-bold text-xs text-[#100D18] bg-gradient-to-r from-[#D6B36A] to-[#F3D58A] border border-[#FFE27A]"
              >
                Claim Hogwarts Pass
                <ArrowUpRight size={13} />
              </a>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onOpenAdmin();
                }}
                className="text-xs font-mono font-bold text-[#D6B36A] flex items-center gap-1 py-2 px-3 border border-[#D6B36A] rounded-sm"
              >
                <Shield size={13} />
                <span>Admin</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
