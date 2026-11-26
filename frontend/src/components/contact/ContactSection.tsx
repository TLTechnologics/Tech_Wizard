import React, { useRef } from 'react';
import { MapPin, Mail, Phone, Share2, Instagram, Navigation } from 'lucide-react';
import { useSectionChoreography } from '../../hooks/useSectionChoreography';
import { ScrollTextReveal } from '../common/ScrollTextReveal';
import { SCROLL_MOTION } from '../../lib/gsap';

interface ContactSectionProps {
  collegeName?: string;
  officialEmail?: string;
  phone?: string;
  address?: string;
  instagramUrl?: string;
  mapUrl?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  collegeName = 'LJCCA',
  officialEmail = 'contact@techwizard2027.edu',
  phone = '+91 98765 43210',
  address = 'LJCCA, NEAR NEW, IIM Rd, Vastrapur, Ahmedabad, Gujarat 380015',
  instagramUrl = 'https://instagram.com/techwizard2027',
  mapUrl = 'https://share.google/wWJlNwjeWMOJeZC5y',
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  useSectionChoreography(sectionRef);
  const shareWhatsApp = () => {
    const text = encodeURIComponent(
      `Check out TECH WIZARD 2027 — Where Ideas Meet Innovation (18–24 January 2027)!\n${window.location.origin}`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const fullAddress = 'LJCCA, NEAR NEW, IIM Rd, Vastrapur, Ahmedabad, Gujarat 380015';
  const displayAddress = address && address.includes('Vastrapur') ? address : fullAddress;

  return (
    <section ref={sectionRef} className="relative py-14 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 bg-gradient-to-b from-[#1F160C] via-[#2E2010] to-[#181109] overflow-hidden text-white" id="contact">
      {/* Warm Hufflepuff Amber & Parchment Starlight Glow */}
      <div 
        data-parallax-y="22"
        className="absolute inset-0 pointer-events-none opacity-30 z-0 will-change-transform"
        style={{
          background: 'radial-gradient(ellipse at 80% 20%, rgba(245, 158, 11, 0.3) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(214, 179, 106, 0.25) 0%, transparent 65%)',
        }}
        aria-hidden="true"
      />

      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04] z-0"
        style={{
          backgroundImage:
            'radial-gradient(#D6B36A 1px, transparent 1px), linear-gradient(to right, #D6B36A 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-8 sm:mb-10">
          <div data-reveal data-reveal-bottom className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm border-2 border-[#D6B36A]/60 bg-[#2D1D0E] shadow-[2px_2px_0px_#0C0804] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] shadow-[0_0_8px_#FBBF24]" />
            <span className="font-mono text-[11px] sm:text-xs text-[#FDE68A] tracking-widest uppercase font-bold">
              ✦ HUFFLEPUFF OWL POST DISPATCH // COMMUNICATIONS ✦
            </span>
          </div>

          <ScrollTextReveal
            as="h2"
            start={SCROLL_MOTION.startBottom}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-[#F4EBDD] tracking-tight leading-tight"
            segments={[
              { text: 'Connect With The' },
              {
                text: 'Council.',
                className: 'text-[#FBBF24] underline decoration-[#D6B36A] decoration-wavy decoration-2',
              },
            ]}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Main Direct Email Action */}
          <div data-reveal data-reveal-bottom data-reveal-delay="0.04" className="lg:col-span-7 flex flex-col justify-between">
            <div className="mb-4 p-5 sm:p-6 rounded-sm bg-[#2B1D10] border-2 border-[#D6B36A] shadow-[4px_4px_0px_#0C0804] relative overflow-hidden">
              {/* Burgundy Wax Seal Ribbon */}
              <div
                className="absolute top-0 right-8 px-4 py-1 bg-gradient-to-r from-[#762E42] to-[#4A1525] border-x border-b border-[#D6B36A] shadow-[0_2px_8px_rgba(0,0,0,0.6)] z-10 flex items-center gap-1.5"
                style={{ transform: 'rotate(2deg)' }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#F3D58A]" />
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#F3D58A] font-bold">
                  SEALED
                </span>
              </div>

              <span className="font-mono text-[11px] sm:text-xs text-[#FDE68A] tracking-wider uppercase font-bold block mb-1.5">
                ✦ PRIMARY OWL DISPATCH CHANNEL
              </span>
              <a
                href={`mailto:${officialEmail}`}
                className="block font-cinzel font-bold text-xl sm:text-2xl md:text-3xl text-[#F4EBDD] hover:text-[#FDE68A] transition-colors pb-2 border-b-2 border-dashed border-[#D6B36A]/40 tracking-wide"
              >
                {officialEmail}
              </a>
            </div>

            <p className="font-body text-xs sm:text-sm text-[#E2D5C0] leading-relaxed max-w-xl mb-6 font-normal">
              Have questions regarding festival registration, jury evaluation, stall allocation, or college sponsorships? Our organizing committee responds promptly via owl post dispatch.
            </p>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={shareWhatsApp}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-sm font-cinzel text-xs font-bold tracking-wider text-[#F4EBDD] bg-[#245B43] border-2 border-[#74C69D] shadow-[2.5px_2.5px_0px_#0C0804] hover:shadow-[4px_4px_0px_#0C0804] hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <Share2 size={13} className="text-[#A7F3D0]" />
                <span>Share on WhatsApp</span>
              </button>

              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-sm font-cinzel text-xs font-bold tracking-wider text-[#F4EBDD] bg-[#3B1525] border-2 border-[#D6B36A] shadow-[2.5px_2.5px_0px_#0C0804] hover:shadow-[4px_4px_0px_#0C0804] hover:-translate-y-0.5 transition-all"
              >
                <Instagram size={13} className="text-[#F3D58A]" />
                <span>Official Instagram</span>
              </a>

              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-sm font-cinzel text-xs font-bold tracking-wider text-[#100D18] bg-gradient-to-r from-[#D6B36A] to-[#FBBF24] hover:bg-[#F3D58A] border-2 border-[#FFE27A] shadow-[2.5px_2.5px_0px_#0C0804] hover:shadow-[4px_4px_0px_#0C0804] hover:-translate-y-0.5 transition-all"
              >
                <Navigation size={13} className="text-[#100D18]" />
                <span>Google Maps Route</span>
              </a>
            </div>
          </div>

          {/* Right Column: Address and Phone Postal Placards */}
          <div data-stagger-group data-stagger-step="0.12" data-stagger-start="top 95%" className="lg:col-span-5 space-y-4">
            <div data-stagger-item className="p-4 sm:p-5 rounded-sm bg-[#281A0E] border-2 border-[#D6B36A]/70 shadow-[3.5px_3.5px_0px_#0C0804]">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-sm border border-[#D6B36A] bg-[#1A1108] text-[#FDE68A] flex-shrink-0 shadow-[1px_1px_0px_#0C0804]">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-mono text-[11px] sm:text-xs text-[#FDE68A] uppercase font-bold tracking-wider">
                    FESTIVAL VENUE // HOGWARTS CAMPUS
                  </span>
                  <h4 className="font-cinzel font-bold text-base sm:text-lg text-[#F4EBDD] mt-0.5 tracking-wide">
                    {collegeName} Main Campus
                  </h4>
                  <p className="font-body text-xs text-[#E2D5C0] font-normal leading-relaxed mt-1">
                    {displayAddress}
                  </p>
                </div>
              </div>
            </div>

            <div data-stagger-item className="p-4 sm:p-5 rounded-sm bg-[#281A0E] border-2 border-[#D6B36A]/70 shadow-[3.5px_3.5px_0px_#0C0804]">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-sm border border-[#D6B36A] bg-[#1A1108] text-[#FDE68A] flex-shrink-0 shadow-[1px_1px_0px_#0C0804]">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-mono text-[11px] sm:text-xs text-[#FDE68A] uppercase font-bold tracking-wider">
                    COMMUNICATIONS HELPLINE
                  </span>
                  <h4 className="font-cinzel font-bold text-base sm:text-lg text-[#F4EBDD] mt-0.5 tracking-wide">
                    {phone}
                  </h4>
                  <p className="font-body text-xs text-[#E2D5C0] font-normal leading-relaxed mt-1">
                    Available during campus operational hours for urgent festival inquiries.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
