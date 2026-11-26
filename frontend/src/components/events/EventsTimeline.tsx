import React, { useState, useEffect } from 'react';
import { EventItem } from '../../types';
import { EventDetailModal } from './EventDetailModal';
import { EventCard } from './EventCard';
import { Terminal, Code2, Cpu } from 'lucide-react';
import { useSmoothScroll } from '../../context/SmoothScrollContext';

interface EventsTimelineProps {
  events: EventItem[];
  onSelectRegister: (eventId: string) => void;
  onSelectShowcase: () => void;
}

export const EventsTimeline: React.FC<EventsTimelineProps> = ({
  events,
  onSelectRegister,
  onSelectShowcase,
}) => {
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const { stopScroll, startScroll } = useSmoothScroll();

  useEffect(() => {
    if (selectedEvent) {
      stopScroll();
    } else {
      startScroll();
    }
  }, [selectedEvent, stopScroll, startScroll]);

  const tracks = [
    {
      title: 'Workshops',
      tag: 'TRACK // 01',
      icon: <Terminal className="w-6 h-6 text-[#F3D58A]" />,
      accent: '#D6B36A',
      bg: '#1A1626',
      desc: 'Hands-on technical sessions led by faculty, seniors, and industry guests. Bring a laptop; we provide the hardware kits.',
      topics: ['Embedded systems with ESP32', 'On-device machine learning', 'PCB design basics', 'Prototyping in Figma'],
      format: '2–3 hour sessions',
      seats: 'College Exclusive (LJCCA)',
    },
    {
      title: 'Hackathons',
      tag: 'TRACK // 02',
      icon: <Code2 className="w-6 h-6 text-[#F3D58A]" />,
      accent: '#762E42',
      bg: '#1E182A',
      desc: 'Form a team of up to four and engineer working prototypes from undisclosed problem statements released live.',
      topics: ['24-hour build sprint', 'Continuous mentor check-ins', 'Live prototype demos to jury', 'Hardware and software tracks'],
      format: 'Teams of 2–4 students',
      seats: '18–23 January window',
    },
    {
      title: 'Tech Showcase',
      tag: 'TRACK // 03',
      icon: <Cpu className="w-6 h-6 text-[#D6B36A]" />,
      accent: '#293B68',
      bg: '#1A1626',
      desc: 'National open exhibition where innovators present working hardware and software projects to visitors, faculty and judges.',
      topics: ['Robotics & IoT prototypes', 'AI, apps & SaaS platforms', 'Public community voting', 'Distinguished jury awards'],
      format: 'Stall-based live exhibition',
      seats: 'Open to All External Colleges',
    },
  ];

  return (
    <section className="relative py-14 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 bg-gradient-to-b from-[#200A12] via-[#2F0E1A] to-[#1E0810] overflow-hidden text-[#F4EBDD]" id="events">
      {/* Gryffindor Challenge Arena Fire Glow & Constellation */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30 z-0"
        style={{
          background: 'radial-gradient(ellipse at 20% 25%, rgba(180, 40, 70, 0.45) 0%, transparent 60%), radial-gradient(ellipse at 80% 75%, rgba(214, 179, 106, 0.25) 0%, transparent 65%)',
        }}
        aria-hidden="true"
      />

      {/* Floating Golden Sparks / Ember Particles */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        {[...Array(14)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-t from-[#E63946] to-[#FFE27A] shadow-[0_0_8px_#FFE27A] animate-pulse"
            style={{
              left: `${(i * 13) % 96}%`,
              top: `${(i * 17) % 92}%`,
              width: `${(i % 3) * 2 + 3}px`,
              height: `${(i % 3) * 2 + 3}px`,
              opacity: 0.35 + (i % 4) * 0.15,
            }}
          />
        ))}
      </div>

      {/* Subtle Architectural Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04] z-0"
        style={{
          backgroundImage:
            'linear-gradient(#D6B36A 1px, transparent 1px), linear-gradient(90deg, #D6B36A 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm border-1.5 border-[#D6B36A] bg-[#2E0F1B] shadow-[0_0_15px_rgba(230,57,70,0.3),2px_2px_0px_#14050B] mb-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E63946] shadow-[0_0_8px_#FF5470]" />
            <span className="font-mono text-[11px] sm:text-xs text-[#F3D58A] tracking-widest uppercase font-bold">
              ✦ GRYFFINDOR CHALLENGE ARENA // 3 CORE TRACKS ✦
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-[#F4EBDD] tracking-tight leading-tight">
            Learn. Build. <span className="text-[#F3D58A] underline decoration-[#E63946] decoration-wavy decoration-2">Showcase.</span>
          </h2>
          <p className="font-body text-xs sm:text-sm text-[#E2CCD4] mt-2 max-w-2xl leading-relaxed">
            Enter the trial grounds of bravery and innovation. Three interconnected paths engineered for hands-on mastery, rapid prototyping sprints, and national demonstration.
          </p>
        </div>

        {/* 3 Main Track Hero Cards: Grimoire Placards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12 sm:mb-14">
          {tracks.map((t, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-6 rounded-sm border-2 border-[#D6B36A]/60 bg-gradient-to-b from-[#2A0E18] to-[#1C0911] shadow-[0_8px_30px_rgba(0,0,0,0.65),3.5px_3.5px_0px_#12040A] hover:border-[#F3D58A] hover:shadow-[0_0_25px_rgba(214,179,106,0.35),5px_5px_0px_#12040A] hover:-translate-y-0.5 flex flex-col justify-between transition-all duration-200 relative"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-sm border-1.5 border-[#D6B36A] bg-[#3B1222] shadow-[0_0_10px_rgba(214,179,106,0.25)]">
                    {t.icon}
                  </div>
                  <span className="font-mono text-[11px] sm:text-xs font-bold tracking-wider text-[#F3D58A] px-2.5 py-0.5 rounded-sm border border-[#D6B36A]/60 bg-[#36111F]">
                    {t.tag}
                  </span>
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-black text-[#F4EBDD] mb-1.5">
                  {t.title}
                </h3>
                <p className="font-body text-xs sm:text-sm text-[#D8C4CC] leading-relaxed mb-4">
                  {t.desc}
                </p>

                <div className="border-t-2 border-dashed border-[#D6B36A]/25 pt-3 mb-4">
                  <span className="font-mono text-[9px] sm:text-[10px] text-[#F3D58A] uppercase font-bold tracking-wider block mb-2">
                    Curriculum Pillars
                  </span>
                  <ul className="space-y-1">
                    {t.topics.map((item, i) => (
                      <li key={i} className="flex items-center gap-1.5 text-xs text-[#F4EBDD] font-medium">
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-[#E63946] shadow-[0_0_4px_#FF5470]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t border-[#D6B36A]/25 pt-3 flex items-center justify-between font-mono text-xs">
                <div>
                  <span className="text-[#C2BDCA] block text-[10px] font-semibold">FORMAT</span>
                  <span className="text-[#F4EBDD] font-bold text-xs">{t.format}</span>
                </div>
                <div className="text-right">
                  <span className="text-[#C2BDCA] block text-[10px] font-semibold">ELIGIBILITY</span>
                  <span className="font-bold text-[#F3D58A] text-xs">{t.seats}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 8 Official Festival Events Section */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
            <div>
              <span className="font-mono text-xs text-[#F3D58A] tracking-wider uppercase font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E63946] shadow-[0_0_6px_#FF5470]" />
                CHRONOLOGICAL RUNTIME // 18–24 JANUARY 2027
              </span>
              <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-black text-[#F4EBDD] mt-0.5">
                The 8 Official Festival Events
              </h3>
            </div>
            <span className="font-mono text-xs font-bold text-[#F3D58A] px-3 py-1.5 bg-[#2B0E1B] border-2 border-[#D6B36A] shadow-[2px_2px_0px_#12040A] rounded-sm">
              CLICK ANY EVENT TO INSPECT RULES &amp; VENUE
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {events.map((ev) => (
              <EventCard
                key={ev.id}
                event={ev}
                onViewDetails={(item) => setSelectedEvent(item)}
                onRegister={(eventId) => onSelectRegister(eventId)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <EventDetailModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onSelectRegister={(evId) => {
            setSelectedEvent(null);
            onSelectRegister(evId);
          }}
          onSelectShowcase={() => {
            setSelectedEvent(null);
            onSelectShowcase();
          }}
        />
      )}
    </section>
  );
};
