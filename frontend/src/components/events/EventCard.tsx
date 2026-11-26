import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Calendar, MapPin, ArrowRight, Code2, Cpu, Users, Trophy, Sparkles, Shield } from 'lucide-react';
import { EventItem } from '../../types';

interface EventCardProps {
  event: EventItem;
  onViewDetails: (event: EventItem) => void;
  onRegister: (eventId: string) => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onViewDetails }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);

  // 3D Tilt Spring Physics
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(y, { stiffness: 220, damping: 22 });
  const rotateY = useSpring(x, { stiffness: 220, damping: 22 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    x.set(((mouseX - centerX) / centerX) * 5);
    y.set(-((mouseY - centerY) / centerY) * 5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const isInternal = event.eligibility_type === 'internal_only';
  const isShowcase = event.is_showcase;
  const isHackathon = event.is_hackathon;
  const isParents = event.eligibility_type === 'parents_only';
  const isResults = event.eligibility_type === 'results_only';

  // Map each event to a Hogwarts House Identity
  const getHouseTheme = () => {
    if (isHackathon) {
      return {
        house: 'GRYFFINDOR',
        motto: 'Valour & Code Sprint',
        primary: '#762E42',
        secondary: '#D6B36A',
        bg: 'linear-gradient(145deg, #2A0E18 0%, #150A10 100%)',
        border: '#9B3B56',
        badgeBg: '#762E42',
        badgeText: '#F3D58A',
        tag: 'TRIWIZARD HACK',
        icon: <Code2 className="w-4 h-4 text-[#F3D58A]" />,
        crestAnimal: 'LION',
      };
    }
    if (isShowcase) {
      return {
        house: 'SLYTHERIN',
        motto: 'Ambition & Innovation Expo',
        primary: '#1E4334',
        secondary: '#B8BAC8',
        bg: 'linear-gradient(145deg, #10261C 0%, #0A1711 100%)',
        border: '#2D6A53',
        badgeBg: '#1E4334',
        badgeText: '#C9D1D9',
        tag: 'INVENTION EXPO',
        icon: <Cpu className="w-4 h-4 text-[#74C69D]" />,
        crestAnimal: 'SERPENT',
      };
    }
    if (isParents) {
      return {
        house: 'HUFFLEPUFF',
        motto: 'Dedication & Family Harmony',
        primary: '#D69E2E',
        secondary: '#E9D9B5',
        bg: 'linear-gradient(145deg, #261B0E 0%, #140E07 100%)',
        border: '#B8860B',
        badgeBg: '#3B2914',
        badgeText: '#F5B041',
        tag: 'FAMILY TRACK',
        icon: <Users className="w-4 h-4 text-[#F5B041]" />,
        crestAnimal: 'BADGER',
      };
    }
    if (isResults) {
      return {
        house: 'HOGWARTS VALEDICTORY',
        motto: 'Triumph & Grand Awards',
        primary: '#D6B36A',
        secondary: '#F3D58A',
        bg: 'linear-gradient(145deg, #261E10 0%, #141009 100%)',
        border: '#D6B36A',
        badgeBg: '#4A3716',
        badgeText: '#FFE27A',
        tag: 'VALEDICTORY',
        icon: <Trophy className="w-4 h-4 text-[#FFE27A]" />,
        crestAnimal: 'CREST',
      };
    }
    // Default to Ravenclaw for Workshops
    return {
      house: 'RAVENCLAW',
      motto: 'Wisdom & Systems Architecture',
      primary: '#1A2942',
      secondary: '#D6B36A',
      bg: 'linear-gradient(145deg, #121D30 0%, #0A101C 100%)',
      border: '#29436A',
      badgeBg: '#1A2942',
      badgeText: '#93C5FD',
      tag: 'POTIONS LAB',
      icon: <Sparkles className="w-4 h-4 text-[#93C5FD]" />,
      crestAnimal: 'EAGLE',
    };
  };

  const theme = getHouseTheme();

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        background: theme.bg,
        borderColor: theme.border,
      }}
      className="relative w-full rounded-sm border-2 shadow-[0_12px_36px_rgba(0,0,0,0.7)] hover:shadow-[0_0_28px_rgba(214,179,106,0.3)] hover:-translate-y-1 transition-all duration-300 p-5 sm:p-5.5 flex flex-col justify-between overflow-hidden group cursor-pointer"
      onClick={() => onViewDetails(event)}
    >
      {/* Background Crest Watermark */}
      <div className="absolute -bottom-6 -right-6 w-32 h-32 opacity-10 pointer-events-none text-white select-none">
        <Shield className="w-full h-full" strokeWidth={1} />
      </div>

      {/* Top Gold Corner Ornament */}
      <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none">
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M32 0H16C24.8 0 32 7.2 32 16V0Z" fill={theme.secondary} opacity="0.8" />
          <path d="M32 0L0 32" stroke="#000000" strokeWidth="1.2" opacity="0.6" />
        </svg>
      </div>

      {/* Top Header: Date & House Badge */}
      <div className="relative z-10">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-[#F3D58A]">
            <Calendar className="w-3.5 h-3.5 text-[#D6B36A]" />
            <span>{event.date_display}</span>
          </div>

          <span
            className="font-mono text-[9px] px-2.5 py-0.5 rounded-sm border uppercase tracking-wider font-black shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
            style={{
              borderColor: theme.border,
              backgroundColor: theme.badgeBg,
              color: theme.badgeText,
            }}
          >
            {theme.house} · {theme.tag}
          </span>
        </div>

        {/* Title & Tagline */}
        <div className="flex items-start gap-3 mb-3">
          <div 
            className="p-2 rounded-sm border shadow-[0_0_10px_rgba(0,0,0,0.6)] mt-0.5 flex-shrink-0"
            style={{ 
              borderColor: theme.border, 
              backgroundColor: theme.badgeBg 
            }}
          >
            {theme.icon}
          </div>
          <div>
            <h3 className="font-cinzel font-bold text-lg sm:text-xl text-[#F4EBDD] leading-snug group-hover:text-[#F3D58A] transition-colors tracking-wide">
              {event.name}
            </h3>
            {event.tagline && (
              <p className="font-cinzel text-[11px] text-[#F3D58A] font-semibold tracking-wider mt-0.5">
                {event.tagline}
              </p>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="font-body text-xs sm:text-sm text-[#C2BDCA] line-clamp-3 leading-relaxed mb-4">
          {event.description}
        </p>
      </div>

      {/* Footer Info: Venue & Eligibility */}
      <div className="relative z-10 pt-3.5 border-t border-dashed border-[#D6B36A]/25 flex flex-col gap-3">
        <div className="flex items-center justify-between text-xs font-mono text-[#C2BDCA]">
          <span className="flex items-center gap-1.5 truncate max-w-[200px]">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-[#D6B36A]" />
            <span className="truncate font-medium text-[#F4EBDD]">{event.venue}</span>
          </span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-sm border border-[#D6B36A]/40 bg-[#0E0A18] text-[#F3D58A]">
            {event.timing}
          </span>
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="font-mono text-xs font-bold text-[#E7D7B5]">
            {isInternal
              ? '• LJCCA Exclusive'
              : isShowcase
              ? '• Open to All Colleges'
              : isParents
              ? '• Parents & Families'
              : '• All Welcome'}
          </span>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(event);
            }}
            className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-[#F3D58A] group-hover:text-[#FFFFFF] transition-colors"
          >
            <span>Challenge Rules</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 text-[#D6B36A]" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
