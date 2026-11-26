import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Flame, Users, Clock, MapPin, ChevronDown, ChevronUp, ArrowUpRight, ShieldAlert, Sparkles } from 'lucide-react';
import { EventItem } from '../../types';

interface WorkshopsHackathonsSectionProps {
  events: EventItem[];
  onRegister: (eventId: string) => void;
}

export const WorkshopsHackathonsSection: React.FC<WorkshopsHackathonsSectionProps> = ({
  events,
  onRegister,
}) => {
  const [expandedId, setExpandedId] = useState<string | null>('bhavesh-workshop');

  const targetIds = [
    'bhavesh-workshop',
    'thakkar-workshop',
    'bhavesh-hackathon',
    'thakkar-hackathon',
    'ai-workshop-parents',
  ];

  const sessions = targetIds
    .map((id) => events.find((e) => e.id === id))
    .filter((e): e is EventItem => Boolean(e));

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const getAccentDetails = (event: EventItem) => {
    if (event.is_hackathon) {
      return {
        color: '#762E42',
        potionColor: '#E63946',
        badgeBg: '#2A0E18',
        typeLabel: 'TRIWIZARD CODE SPRINT',
        icon: <Flame className="w-5 h-5 text-[#F3D58A]" />,
      };
    }
    if (event.eligibility_type === 'parents_only') {
      return {
        color: '#D69E2E',
        potionColor: '#F5B041',
        badgeBg: '#291C0E',
        typeLabel: 'FAMILY LITERACY TRACK',
        icon: <Users className="w-5 h-5 text-[#F4EBDD]" />,
      };
    }
    return {
      color: '#1E4334',
      potionColor: '#2EC4B6',
      badgeBg: '#0F261D',
      typeLabel: 'POTIONS & SYSTEMS LAB',
      icon: <Terminal className="w-5 h-5 text-[#74C69D]" />,
    };
  };

  return (
    <section id="workshops" className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 bg-gradient-to-b from-[#0A1A12] via-[#102B1E] to-[#08150E] overflow-hidden text-white">
      {/* Slytherin Potions Laboratory Glowing Emerald Mist & Dungeon Shelves */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40 z-0"
        style={{
          background: 'radial-gradient(ellipse at 25% 25%, rgba(46, 196, 182, 0.25) 0%, transparent 60%), radial-gradient(ellipse at 80% 70%, rgba(30, 80, 55, 0.4) 0%, transparent 65%)',
        }}
        aria-hidden="true"
      />

      {/* Subtle Rising Emerald Potion Bubbles */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: ['100vh', '-10vh'],
              opacity: [0, 0.7, 0],
              x: [0, (i % 2 === 0 ? 18 : -18), 0],
            }}
            transition={{
              duration: 7 + (i % 5) * 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.7,
            }}
            className="absolute rounded-full border border-[#74C69D]/60 bg-gradient-to-t from-[#2EC4B6]/20 to-[#74C69D]/40 shadow-[0_0_10px_rgba(116,198,157,0.5)]"
            style={{
              left: `${(i * 15) % 95}%`,
              width: `${(i % 3) * 6 + 7}px`,
              height: `${(i % 3) * 6 + 7}px`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 pb-6 border-b border-dashed border-[#2D6A53]/50 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm border border-[#74C69D]/60 bg-[#0C2419] shadow-[0_0_15px_rgba(116,198,157,0.25)] mb-3">
              <span className="w-2 h-2 rounded-full bg-[#74C69D] shadow-[0_0_8px_#74C69D]" />
              <span className="font-mono text-[11px] sm:text-xs text-[#A7F3D0] tracking-[0.2em] uppercase font-bold">
                ✦ SLYTHERIN POTIONS CLASSROOM // DUNGEON LABS ✦
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-[#F4EBDD] tracking-tight leading-tight">
              Workshops &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#74C69D] via-[#A7F3D0] to-[#D6B36A]">Potions Sprints.</span>
            </h2>

            <p className="font-body text-xs sm:text-sm text-[#B8D8C9] mt-2 max-w-2xl leading-relaxed font-normal">
              Enter the emerald-lit dungeon chambers. Hands-on systems programming, embedded architectures, rapid Triwizard sprint prototypes, and our dedicated parent AI literacy track.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
            <span className="flex items-center gap-2 text-[#F4EBDD] font-bold bg-[#0D261B] px-3.5 py-1.5 rounded-sm border border-[#2D6A53] shadow-[0_0_12px_rgba(116,198,157,0.2)]">
              <span className="w-2 h-2 bg-[#74C69D] rounded-full shadow-[0_0_6px_#74C69D]" />
              College Exclusive (LJCCA)
            </span>
            <span className="flex items-center gap-2 text-[#0A1A12] font-bold bg-gradient-to-r from-[#D6B36A] to-[#F3D58A] px-3.5 py-1.5 rounded-sm border border-[#FFE27A] shadow-[0_0_12px_rgba(214,179,106,0.3)]">
              <span className="w-2 h-2 bg-[#762E42] rounded-full" />
              Parents Track
            </span>
          </div>
        </div>

        {/* Accordion Sessions List */}
        <div className="space-y-4">
          {sessions.map((event) => {
            const isExpanded = expandedId === event.id;
            const details = getAccentDetails(event);

            return (
              <div
                key={event.id}
                className={`rounded-sm border-2 transition-all duration-300 overflow-hidden ${
                  isExpanded
                    ? 'border-[#74C69D] bg-[#0E281D] shadow-[0_12px_36px_rgba(0,0,0,0.7),0_0_24px_rgba(116,198,157,0.25)]'
                    : 'border-[#2D6A53]/60 bg-[#0A1E15] shadow-[0_8px_20px_rgba(0,0,0,0.5)] hover:border-[#74C69D]/80'
                }`}
              >
                {/* Header Row (Always Visible) */}
                <div
                  onClick={() => toggleExpand(event.id)}
                  className="p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer select-none"
                >
                  <div className="flex items-start sm:items-center gap-4">
                    {/* Glowing Potion Flask Icon */}
                    <div 
                      className="p-3 rounded-sm border border-[#74C69D]/50 shadow-[0_0_12px_rgba(116,198,157,0.25)] flex-shrink-0"
                      style={{ backgroundColor: details.badgeBg }}
                    >
                      {details.icon}
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#A7F3D0] px-2.5 py-0.5 rounded-sm bg-[#06140D] border border-[#2D6A53]">
                          {event.date_display}
                        </span>
                        <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#D8E6DF] px-2.5 py-0.5 rounded-sm bg-[#081810] border border-[#2D6A53]/60">
                          {details.typeLabel}
                        </span>
                      </div>

                      <h3 className="font-cinzel font-bold text-xl sm:text-2xl text-[#F4EBDD] leading-snug tracking-wide">
                        {event.name}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-5 border-t md:border-t-0 border-dashed border-[#2D6A53]/40 pt-3 md:pt-0">
                    <div className="flex items-center gap-4 text-xs font-mono text-[#B8D8C9]">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-[#74C69D]" />
                        <span>{event.timing}</span>
                      </span>
                      <span className="hidden sm:flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-[#A7F3D0]" />
                        <span>{event.venue}</span>
                      </span>
                    </div>

                    <div className="p-1.5 rounded-sm border border-[#74C69D]/50 bg-[#091B12] text-[#74C69D]">
                      {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </div>
                  </div>
                </div>

                {/* Collapsible Content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="border-t border-dashed border-[#2D6A53]/40 bg-[#07160F]"
                    >
                      <div className="p-6 sm:p-7 grid grid-cols-1 lg:grid-cols-12 gap-6">
                        <div className="lg:col-span-8 flex flex-col justify-between">
                          <div>
                            <p className="font-cinzel text-xs uppercase tracking-widest text-[#A7F3D0] font-bold mb-2">
                              {event.tagline}
                            </p>
                            <p className="font-body text-sm text-[#C9DFD5] leading-relaxed mb-5">
                              {event.description}
                            </p>

                            {event.rules && (
                              <div className="p-4 sm:p-5 bg-[#0C2419] border border-[#2D6A53] rounded-sm mb-5 shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
                                <span className="font-cinzel text-xs font-bold text-[#A7F3D0] block mb-2 uppercase tracking-wider">
                                  ✦ Laboratory Protocols &amp; Directives
                                </span>
                                <div className="font-body text-xs sm:text-sm text-[#C9DFD5] whitespace-pre-line leading-relaxed space-y-1.5">
                                  {event.rules}
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="flex flex-wrap items-center gap-4 pt-2">
                            <button
                              onClick={() => onRegister(event.id)}
                              className="inline-flex items-center gap-2 px-6 py-3 rounded-sm font-cinzel text-xs font-bold tracking-wider text-[#0A1A12] bg-gradient-to-r from-[#74C69D] via-[#A7F3D0] to-[#74C69D] border-2 border-[#D1FAE5] shadow-[0_0_20px_rgba(116,198,157,0.4)] hover:shadow-[0_0_30px_rgba(167,243,208,0.7)] hover:-translate-y-0.5 transition-all cursor-pointer"
                            >
                              <span>Enroll Pass (Free)</span>
                              <ArrowUpRight className="w-4 h-4" />
                            </button>
                            <span className="font-serif text-xs text-[#B8D8C9] italic">
                              * Prior registration via this portal is mandatory for entrance pass.
                            </span>
                          </div>
                        </div>

                        <div className="lg:col-span-4 flex flex-col gap-3.5 font-mono text-xs bg-[#0C2419] border border-[#2D6A53] p-5 rounded-sm shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
                          <div>
                            <span className="text-[#B8D8C9] block text-[10px] font-semibold tracking-wider">VENUE COORDINATE</span>
                            <span className="text-[#F4EBDD] font-bold text-sm">{event.venue}</span>
                          </div>
                          <div className="border-t border-dashed border-[#2D6A53]/40 pt-2.5">
                            <span className="text-[#B8D8C9] block text-[10px] font-semibold tracking-wider">SCHEDULED TIME</span>
                            <span className="text-[#A7F3D0] font-bold text-sm">{event.timing}</span>
                          </div>
                          <div className="border-t border-dashed border-[#2D6A53]/40 pt-2.5">
                            <span className="text-[#B8D8C9] block text-[10px] font-semibold tracking-wider">ELIGIBILITY STATUS</span>
                            <span className="text-[#74C69D] font-bold text-sm">{event.eligibility}</span>
                          </div>
                          <div className="border-t border-dashed border-[#2D6A53]/40 pt-2.5 flex items-center gap-2">
                            <ShieldAlert className="w-4 h-4 flex-shrink-0 text-[#A7F3D0]" />
                            <span className="text-[11px] font-bold text-[#F4EBDD]">Identity verification mandatory at door</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
