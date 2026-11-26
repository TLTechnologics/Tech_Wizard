import React from 'react';
import { Terminal, Code2, Cpu, HeartHandshake, Award, CheckCircle2, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const AboutSection: React.FC = () => {
  const metrics = [
    { value: '07', label: 'Days of Magic', tag: 'CHRONOLOGY', desc: 'Continuous innovation sprint across high-tech Hogwarts laboratories', color: '#60A5FA', bg: '#0F1A30', house: 'RAVENCLAW' },
    { value: '24', label: 'Workshops & Spells', tag: 'CURRICULUM', desc: 'Faculty, industry wizards & alumni led practical deep dives', color: '#F3D58A', bg: '#181E32', house: 'BRONZE' },
    { value: '60+', label: 'Magical Inventions', tag: 'INNOVATION', desc: 'Live hardware & autonomous AI prototypes on active display', color: '#93C5FD', bg: '#12203D', house: 'ASTRONOMY' },
    { value: '100%', label: 'Student Crafted', tag: 'FELLOWSHIP', desc: 'Organized and engineered by student innovators at LJCCA', color: '#D6B36A', bg: '#1A2338', house: 'ARCHIVE' },
  ];

  const pillars = [
    {
      id: 'workshops',
      num: '01',
      title: 'Workshops',
      badge: 'Potions & Labs',
      house: 'Ravenclaw Intellect',
      houseColor: 'linear-gradient(145deg, #101F38 0%, #0A1424 100%)',
      borderColor: '#3B82F6',
      tagColor: '#93C5FD',
      desc: 'Technical sessions led by faculty, seniors, and industry guests. Bring your laptop; we provide hardware kits, boards, and developer environments.',
      highlights: ['Embedded systems with ESP32', 'On-device Machine Learning', 'PCB design & rapid prototyping', 'Micro-frontends & Figma'],
      format: '2–3 hour immersive labs',
      icon: <Terminal className="w-5 h-5 text-[#93C5FD]" />,
    },
    {
      id: 'hackathons',
      num: '02',
      title: 'Hackathons',
      badge: 'Triwizard Sprint',
      house: 'Gryffindor Valour',
      houseColor: 'linear-gradient(145deg, #2B0E17 0%, #15070C 100%)',
      borderColor: '#9B3B56',
      tagColor: '#F3D58A',
      desc: 'Fast-paced engineering sprints. Form teams of 2 to 4, build working systems under pressure, and present live working prototypes to the jury.',
      highlights: ['Edge IoT & embedded automation', 'Autonomous navigation rovers', 'Accessible software tools', '24-hour non-stop code sprint'],
      format: '24h / day-long sprints',
      icon: <Code2 className="w-5 h-5 text-[#F3D58A]" />,
    },
    {
      id: 'showcase',
      num: '03',
      title: 'Tech Showcase',
      badge: 'Chamber of Inventions',
      house: 'Slytherin Ambition',
      houseColor: 'linear-gradient(145deg, #0E291D 0%, #071710 100%)',
      borderColor: '#2D6A53',
      tagColor: '#74C69D',
      desc: 'The festival centerpiece: demonstration stalls, interactive software booths, and live hardware prototypes running all day.',
      highlights: ['Hardware & Software categories', 'Industry jury critique & scoring', 'Community choice attendee voting', 'Open to all external colleges'],
      format: '2-Day flagship exhibition',
      icon: <Cpu className="w-5 h-5 text-[#74C69D]" />,
    },
    {
      id: 'parents-ai',
      num: '04',
      title: 'AI Family Literacy',
      badge: 'Family Track',
      house: 'Hufflepuff Dedication',
      houseColor: 'linear-gradient(145deg, #2A1F10 0%, #171108 100%)',
      borderColor: '#B8860B',
      tagColor: '#F5B041',
      desc: 'A welcoming digital orientation designed specifically for parents and guardians to demystify artificial intelligence and online safety.',
      highlights: ['Plain-English conversational demos', 'Digital child safety best practices', 'Emerging career pathways in AI', 'Family interactive Q&A session'],
      format: 'Interactive 3h symposium',
      icon: <HeartHandshake className="w-5 h-5 text-[#F5B041]" />,
    },
    {
      id: 'accreditation',
      num: '05',
      title: 'Accreditation',
      badge: 'Valedictory Results',
      house: 'Grand Hogwarts Archive',
      houseColor: 'linear-gradient(145deg, #1C152B 0%, #0F0B18 100%)',
      borderColor: '#D6B36A',
      tagColor: '#F3D58A',
      desc: 'Grand awards ceremony honoring winners of both hackathons, outstanding showcase exhibitors, and presenting verified credentials.',
      highlights: ['Verified participation passes', 'Hackathon victor felicitations', 'Showcase jury distinction awards', 'Faculty & industry networking'],
      format: 'Grand ceremony on 24 Jan',
      icon: <Award className="w-5 h-5 text-[#D6B36A]" />,
    },
  ];

  return (
    <section className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 bg-gradient-to-b from-[#080E1B] via-[#0E172B] to-[#0A1222] overflow-hidden text-white" id="about">
      {/* Ravenclaw Starlight Atmosphere & Stained Glass Blue Aura */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40 z-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 15%, rgba(59, 130, 246, 0.25) 0%, rgba(29, 45, 80, 0.4) 50%, transparent 80%)',
        }}
        aria-hidden="true"
      />

      {/* Gothic Arches Silhouettes in Deep Royal Blue */}
      <div className="absolute inset-0 pointer-events-none opacity-20 z-0 flex items-start justify-around" aria-hidden="true">
        <svg viewBox="0 0 1200 400" className="w-full h-full object-cover" fill="none">
          <path d="M 100 400 L 100 180 Q 200 60 300 180 L 300 400 M 450 400 L 450 180 Q 550 60 650 180 L 650 400 M 800 400 L 800 180 Q 900 60 1000 180 L 1000 400" stroke="#60A5FA" strokeWidth="1.5" strokeDasharray="4 6" />
        </svg>
      </div>

      {/* Floating Great Hall Candles with Blue-Tinted Starlight */}
      <div className="absolute top-4 left-0 right-0 h-24 pointer-events-none z-0 overflow-hidden flex justify-around opacity-80">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -12, 0], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 4.5 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
            className="flex flex-col items-center"
          >
            <div className="w-1.5 h-3 rounded-full bg-[#FFF0A0] shadow-[0_0_14px_#93C5FD,0_0_20px_#60A5FA] animate-candle-flicker" />
            <div className="w-2 h-8 bg-gradient-to-b from-[#E2E8F0] to-[#94A3B8] rounded-sm opacity-85" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header: Ravenclaw Blue & Antique Bronze Theme */}
        <div className="mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm border border-[#3B82F6]/60 bg-[#0F1B33]/90 backdrop-blur-sm shadow-[0_0_18px_rgba(59,130,246,0.3)] mb-3">
            <span className="w-2 h-2 rounded-full bg-[#60A5FA] shadow-[0_0_8px_#60A5FA]" />
            <span className="font-mono text-[11px] sm:text-xs text-[#93C5FD] tracking-[0.2em] uppercase font-bold">
              ✦ HOGWARTS GREAT HALL // RAVENCLAW ARCHIVES ✦
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-[#F4EBDD] tracking-tight leading-tight">
            Where Ideas Meet <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#93C5FD] via-[#60A5FA] to-[#D6B36A]">Wisdom &amp; Innovation.</span>
          </h2>
        </div>

        {/* Narrative Split: Ravenclaw Blue Grimoire Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start mb-12 sm:mb-14">
          <div className="lg:col-span-6 bg-gradient-to-br from-[#101F38] to-[#0A1324] border-2 border-[#3B82F6]/70 p-6 sm:p-7 rounded-sm shadow-[0_12px_36px_rgba(0,0,0,0.8),0_0_24px_rgba(59,130,246,0.2)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#3B82F6]/10 rounded-bl-full pointer-events-none" />
            <p className="font-display text-lg sm:text-xl md:text-2xl font-extrabold text-[#F4EBDD] leading-snug">
              A week where students build, showcase, and test groundbreaking technology in front of mentors and peers who inspire them.
            </p>
          </div>

          <div className="lg:col-span-6 flex flex-col gap-4 font-body text-sm sm:text-base text-[#CBD5E1] leading-relaxed bg-gradient-to-br from-[#0F1B33] to-[#08101E] border border-[#3B82F6]/40 p-6 sm:p-7 rounded-sm shadow-[0_12px_36px_rgba(0,0,0,0.8)]">
            <p>
              <strong className="text-[#93C5FD] font-bold">Tech Wizard 2027</strong> is our annual celebration of technical ingenuity. Styled after the storied halls of Hogwarts, each innovation receives a dedicated demonstration pedestal, high-speed power, and evaluators who examine deep into the code and architecture.
            </p>
            <p>
              Intensive laboratories cultivate new technical mastery, dual hackathons ignite rapid prototype engineering, and the national Tech Showcase brings student hardware and software into the grand spotlight.
            </p>
          </div>
        </div>

        {/* 4 Interactive Statistics Telemetry Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14 sm:mb-16">
          {metrics.map((m, idx) => (
            <div
              key={idx}
              className="p-5 rounded-sm border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(59,130,246,0.35)] relative overflow-hidden"
              style={{
                backgroundColor: m.bg,
                borderColor: `${m.color}66`,
                boxShadow: '0 8px 30px rgba(0,0,0,0.6)',
              }}
            >
              <div className="flex items-center justify-between mb-3 border-b border-dashed border-[#60A5FA]/25 pb-2">
                <span className="font-mono text-[10px] tracking-widest uppercase font-bold" style={{ color: m.color }}>
                  ✦ {m.house}
                </span>
                <span className="w-2 h-2 rounded-full shadow-[0_0_8px_currentColor]" style={{ backgroundColor: m.color, color: m.color }} />
              </div>

              <div
                className="font-cinzel text-4xl sm:text-5xl font-black text-[#F4EBDD] mb-1.5"
                style={{ textShadow: `0 0 20px ${m.color}66` }}
              >
                {m.value}
              </div>

              <h3 className="font-cinzel text-base sm:text-lg font-bold text-[#F4EBDD] mb-1">
                {m.label}
              </h3>
              <p className="font-body text-[11px] sm:text-xs text-[#94A3B8] leading-relaxed">
                {m.desc}
              </p>
            </div>
          ))}
        </div>

        {/* 5 Core Festival Pillars Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
          <div>
            <span className="font-mono text-xs text-[#93C5FD] tracking-widest uppercase font-bold flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#60A5FA]" />
              FESTIVAL ARCHITECTURE // 5 CORE PILLARS
            </span>
            <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-[#F4EBDD] mt-1 tracking-wide">
              Engineered with Wizarding Precision.
            </h3>
          </div>
          <span className="font-mono text-xs font-bold text-[#101A2E] px-3.5 py-1.5 bg-gradient-to-r from-[#93C5FD] to-[#60A5FA] border border-[#BFDBFE] shadow-[0_0_12px_rgba(59,130,246,0.3)] rounded-sm">
            LJCCA INNOVATION FRAMEWORK
          </span>
        </div>

        {/* 5 Core Pillars Grid: 4 House Banners + Archive */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 sm:mb-14">
          {pillars.map((p) => (
            <div
              key={p.id}
              className="p-6 rounded-sm border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(59,130,246,0.35)] flex flex-col justify-between relative overflow-hidden"
              style={{
                background: p.houseColor,
                borderColor: p.borderColor,
                boxShadow: '0 10px 30px rgba(0,0,0,0.6)',
              }}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-sm border border-[#60A5FA]/60 bg-[#0A1324] shadow-[0_0_12px_rgba(59,130,246,0.25)]">
                    {p.icon}
                  </div>
                  <span
                    className="font-mono text-[10px] sm:text-xs px-2.5 py-1 rounded-sm border border-[#60A5FA]/60 tracking-wider uppercase font-bold text-[#93C5FD] bg-[#0A1324]"
                  >
                    {p.badge}
                  </span>
                </div>

                <span className="font-mono text-[10px] sm:text-[11px] text-[#93C5FD] font-bold tracking-widest block uppercase mb-1">
                  {p.house} // PILLAR {p.num}
                </span>
                <h4 className="font-cinzel text-xl sm:text-2xl font-bold text-[#F4EBDD] mb-2 tracking-wide">
                  {p.title}
                </h4>
                <p className="font-body text-xs sm:text-sm text-[#CBD5E1] leading-relaxed mb-4">
                  {p.desc}
                </p>

                <div className="border-t border-dashed border-[#60A5FA]/30 pt-3 mb-4">
                  <span className="font-mono text-[10px] sm:text-[11px] text-[#60A5FA] font-bold uppercase tracking-wider block mb-2">
                    Key Focus Modules
                  </span>
                  <ul className="space-y-1.5">
                    {p.highlights.map((h, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-[#F4EBDD] font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 text-[#60A5FA]" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t border-[#60A5FA]/30 pt-3 flex items-center justify-between font-mono text-xs">
                <span className="text-[#94A3B8] font-semibold text-[11px]">FORMAT:</span>
                <span className="text-[#93C5FD] font-bold text-xs">{p.format}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Institutional Directive Banner: Wax Sealed Blue/Gold Plaque */}
        <div className="p-5 sm:p-6 rounded-sm border-2 border-[#3B82F6]/60 bg-gradient-to-r from-[#0C1A33] via-[#091529] to-[#0A1324] shadow-[0_12px_36px_rgba(0,0,0,0.8),0_0_20px_rgba(59,130,246,0.2)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#1D4ED8] border-2 border-[#93C5FD] shadow-[0_0_12px_#3B82F6] flex items-center justify-center flex-shrink-0">
              <span className="font-display font-black text-xs text-[#BFDBFE]">TW</span>
            </div>
            <div className="font-mono text-xs sm:text-sm text-[#F4EBDD]">
              <strong className="text-[#93C5FD] font-bold uppercase tracking-wide">HOGWARTS PARTICIPATION DIRECTIVE:</strong> Bhavesh &amp; Thakkar workshops/hackathons are exclusive to our college students. National Tech Showcase is open to all external colleges.
            </div>
          </div>
          <span className="font-mono text-xs px-4 py-2 rounded-sm border-2 border-[#93C5FD] bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] text-[#0A1222] font-bold whitespace-nowrap self-start md:self-auto shadow-[0_0_12px_rgba(59,130,246,0.4)]">
            18–24 JANUARY 2027
          </span>
        </div>
      </div>
    </section>
  );
};
