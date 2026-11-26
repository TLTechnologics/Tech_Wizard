import React, { useEffect, useRef } from 'react';
import { ArrowUp, Shield, Mail, Phone, MapPin } from 'lucide-react';
import { useSmoothScroll } from '../../context/SmoothScrollContext';
import { gsap, MM_CONDITIONS, SCROLL_MOTION } from '../../lib/gsap';

interface FooterProps {
  onOpenAdmin: () => void;
  collegeName?: string;
  email?: string;
  phone?: string;
  address?: string;
  instagramUrl?: string;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenAdmin,
  collegeName = 'LJCCA',
  email = 'contact@techgallery2027.edu',
  phone = '+91 98765 43210',
  address = 'LJCCA, NEAR NEW, IIM Rd, Vastrapur, Ahmedabad, Gujarat 380015',
}) => {
  const footerRef = useRef<HTMLElement | null>(null);
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;

    const mm = gsap.matchMedia();

    mm.add(MM_CONDITIONS.desktop, () => {
      const cols = el.querySelectorAll('[data-footer-col]');
      const castle = el.querySelector('[data-footer-castle]');
      const watermark = el.querySelector('[data-footer-watermark]');
      const bottomBar = el.querySelector('[data-footer-bottom]');

      if (cols.length) {
        gsap.fromTo(
          cols,
          { autoAlpha: 0, y: 38, scale: 0.97, willChange: 'transform, opacity' },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            stagger: 0.1,
            ease: SCROLL_MOTION.revealEase,
            clearProps: 'transform,willChange',
            scrollTrigger: {
              trigger: el,
              start: SCROLL_MOTION.startBottom,
              once: true,
            },
          }
        );
      }

      if (bottomBar) {
        gsap.fromTo(
          bottomBar,
          { autoAlpha: 0, y: 20 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.75,
            delay: 0.15,
            ease: SCROLL_MOTION.revealEase,
            clearProps: 'transform,willChange',
            scrollTrigger: {
              trigger: el,
              start: SCROLL_MOTION.startBottom,
              once: true,
            },
          }
        );
      }

      if (castle) {
        gsap.fromTo(
          castle,
          { yPercent: 10 },
          {
            yPercent: -6,
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom bottom', scrub: 1.2 },
          }
        );
      }

      if (watermark) {
        gsap.fromTo(
          watermark,
          { y: 18 },
          {
            y: -12,
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom bottom', scrub: 1.2 },
          }
        );
      }
    });

    mm.add(MM_CONDITIONS.mobile, () => {
      const cols = el.querySelectorAll('[data-footer-col], [data-footer-bottom]');
      if (cols.length) {
        gsap.fromTo(
          cols,
          { autoAlpha: 0, y: 22 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.08,
            ease: SCROLL_MOTION.revealEase,
            clearProps: 'transform,willChange',
            scrollTrigger: {
              trigger: el,
              start: 'top 96%',
              once: true,
            },
          }
        );
      }
    });

    return () => mm.revert();
  }, []);

  const scrollToTop = () => {
    scrollTo(0);
  };

  return (
    <footer ref={footerRef} className="relative bg-[#0B0912] border-t-2 border-[#D6B36A]/30 pt-12 pb-8 sm:pt-14 sm:pb-10 px-4 sm:px-6 md:px-8 overflow-hidden text-white">
      {/* Background Hogwarts Castle Turrets Silhouette */}
      <div data-footer-castle className="absolute bottom-0 left-0 right-0 h-36 pointer-events-none opacity-[0.06] flex items-end justify-center will-change-transform" aria-hidden="true">
        <svg viewBox="0 0 1200 160" preserveAspectRatio="none" className="w-full h-full fill-[#D6B36A]">
          <path d="M0,160 L0,120 L40,120 L40,80 L50,80 L50,40 L60,20 L70,40 L70,80 L80,80 L80,120 L150,120 L150,70 L170,70 L170,25 L180,10 L190,25 L190,70 L210,70 L210,120 L300,120 L300,90 L330,90 L330,50 L345,15 L360,50 L360,90 L400,90 L400,120 L520,120 L520,60 L540,60 L540,10 L555,0 L570,10 L570,60 L600,60 L600,120 L720,120 L720,85 L750,85 L750,45 L765,15 L780,45 L780,85 L820,85 L820,120 L930,120 L930,75 L950,75 L950,30 L960,10 L970,30 L970,75 L1000,75 L1000,120 L1080,120 L1080,90 L1100,90 L1100,50 L1110,25 L1120,50 L1120,90 L1150,90 L1150,120 L1200,120 L1200,160 Z" />
        </svg>
      </div>

      {/* Background Giant Watermark Headline */}
      <div
        data-footer-watermark
        className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 font-display text-[clamp(2.5rem,10vw,8rem)] font-black text-[#D6B36A]/[0.03] whitespace-nowrap pointer-events-none select-none tracking-tight will-change-transform"
        aria-hidden="true"
      >
        TECH WIZARD 2027
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-10">
          {/* Column 1: Identity */}
          <div data-footer-col className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-sm bg-gradient-to-br from-[#D6B36A] to-[#762E42] border border-[#F3D58A] shadow-[0_0_12px_rgba(214,179,106,0.3)] flex items-center justify-center text-[#100D18]">
                <span className="text-xs font-black">⚡</span>
              </span>
              <span className="font-display font-black text-xl text-[#F4EBDD] tracking-wide">
                TECH WIZARD <span className="px-1.5 py-0.5 rounded-xs bg-[#D6B36A] border border-[#100D18] text-xs font-cinzel font-bold text-[#100D18] shadow-[1px_1px_0px_#0B0912]">2027</span>
              </span>
            </div>

            <p className="font-body text-sm text-[#C2BDCA] leading-relaxed max-w-sm mb-6 font-normal">
              Where Ideas Meet Innovation. The annual flagship technology festival and Hogwarts magical exhibition at {collegeName}.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm border border-[#D6B36A]/50 bg-[#16131D] shadow-[2px_2px_0px_#0B0912] font-cinzel text-xs font-bold tracking-wider text-[#F3D58A]">
              <span className="w-2 h-2 rounded-full bg-[#F3D58A] shadow-[0_0_6px_#F3D58A]" />
              <span>18–24 JANUARY 2027 · HOGWARTS CAMPUS</span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div data-footer-col className="lg:col-span-3 font-cinzel text-xs">
            <span className="text-[#F3D58A] font-bold tracking-wider uppercase block mb-4">
              FESTIVAL NAVIGATION
            </span>
            <ul className="space-y-2.5 font-bold">
              <li>
                <a href="#about" className="text-[#E7D7B5] hover:text-[#F3D58A] transition-colors flex items-center gap-1.5">
                  <span className="text-[#D6B36A]/60">01.</span> About the Festival
                </a>
              </li>
              <li>
                <a href="#events" className="text-[#E7D7B5] hover:text-[#F3D58A] transition-colors flex items-center gap-1.5">
                  <span className="text-[#D6B36A]/60">02.</span> 8 Wizarding Challenges
                </a>
              </li>
              <li>
                <a href="#workshops" className="text-[#E7D7B5] hover:text-[#F3D58A] transition-colors flex items-center gap-1.5">
                  <span className="text-[#D6B36A]/60">03.</span> Potions &amp; Laboratories
                </a>
              </li>
              <li>
                <a href="#showcase" className="text-[#E7D7B5] hover:text-[#F3D58A] transition-colors flex items-center gap-1.5">
                  <span className="text-[#D6B36A]/60">04.</span> Chamber of Inventions
                </a>
              </li>
              <li>
                <a href="#schedule" className="text-[#E7D7B5] hover:text-[#F3D58A] transition-colors flex items-center gap-1.5">
                  <span className="text-[#D6B36A]/60">05.</span> 7-Day Astronomy Schedule
                </a>
              </li>
              <li>
                <a href="#register" className="text-[#E7D7B5] hover:text-[#F3D58A] transition-colors flex items-center gap-1.5">
                  <span className="text-[#D6B36A]/60">06.</span> Reserve Hogwarts Passes (Free)
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Campus Coordinates */}
          <div data-footer-col className="lg:col-span-4 font-mono text-xs text-[#C2BDCA]">
            <span className="text-[#F3D58A] font-black tracking-wider uppercase block mb-4">
              CAMPUS HEADQUARTERS
            </span>
            <div className="flex items-start gap-2.5 mb-3 leading-relaxed">
              <MapPin className="w-4 h-4 text-[#D6B36A] flex-shrink-0 mt-0.5" />
              <span className="font-normal text-[#E7D7B5]">{address}</span>
            </div>
            <div className="flex items-center gap-2.5 mb-2 text-[#E7D7B5]">
              <Mail className="w-4 h-4 text-[#D6B36A] flex-shrink-0" />
              <a href={`mailto:${email}`} className="font-bold hover:text-[#F3D58A] transition-colors truncate">
                {email}
              </a>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-[#D6B36A] flex-shrink-0" />
              <span className="font-bold text-[#E7D7B5]">{phone}</span>
            </div>
          </div>
        </div>

        {/* Bottom Sub-strip */}
        <div data-footer-bottom className="pt-8 border-t-2 border-dashed border-[#D6B36A]/20 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#C2BDCA]">
          <div className="font-normal">
            © 2027 Tech Wizard. All rights reserved. Organized by {collegeName} students.
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1.5 text-[#C2BDCA] hover:text-[#F3D58A] font-bold transition-colors cursor-pointer"
            >
              <Shield size={13} className="text-[#D6B36A]" />
              <span>Admin Access</span>
            </button>

            <span className="text-[#D6B36A]/30">|</span>

            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-[#D6B36A] hover:text-[#F3D58A] font-bold transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp size={13} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
