import React, { useState } from 'react';
import { ProjectRecord } from '../../types';
import { InfiniteCardsMarquee } from '../common/InfiniteCardsMarquee';
import { Cpu, Code2, ArrowUpRight } from 'lucide-react';

interface TechShowcaseSectionProps {
  projects: ProjectRecord[];
  onOpenSubmission?: () => void;
}

interface StaticPlacard {
  id: string;
  type: 'hw' | 'sw';
  code: string;
  category: string;
  title: string;
  description: string;
  by: string;
  svg: React.ReactNode;
}

const STATIC_PLATES: StaticPlacard[] = [
  {
    id: 'p1',
    type: 'hw',
    code: 'TG-H01',
    category: 'Hardware',
    title: 'Soil Sense',
    description: 'A low-cost sensor mesh that tells small farms when and where to water.',
    by: 'Electronics Society',
    svg: (
      <svg viewBox="0 0 300 170" aria-hidden="true">
        <path d="M30 130H110V70H190V40H270" stroke="#D6B36A" strokeWidth="2.5" fill="none" />
        <circle cx="110" cy="70" r="7" fill="#F3D58A" stroke="#100D18" strokeWidth="2" />
        <circle cx="270" cy="40" r="7" fill="#762E42" stroke="#D6B36A" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: 'p2',
    type: 'sw',
    code: 'TG-S01',
    category: 'Software',
    title: 'Notebook Lens',
    description: 'Turns photographed handwritten notes into searchable, linked study cards.',
    by: 'Computer Science, Year 3',
    svg: (
      <svg viewBox="0 0 300 170" aria-hidden="true">
        <path d="M110 55L70 85L110 115M190 55L230 85L190 115" stroke="#D6B36A" strokeWidth="2.5" fill="none" />
        <rect x="132" y="70" width="36" height="30" fill="#762E42" stroke="#F3D58A" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: 'p3',
    type: 'hw',
    code: 'TG-H02',
    category: 'Hardware',
    title: 'Arm 5',
    description: 'A five-axis desktop robotic arm, 3D printed and driven by open firmware.',
    by: 'Robotics Club',
    svg: (
      <svg viewBox="0 0 300 170" aria-hidden="true">
        <rect x="90" y="40" width="120" height="90" fill="#1E192D" stroke="#D6B36A" strokeWidth="2" />
        <path d="M90 70H210M120 40V130" stroke="#D6B36A" strokeWidth="2" />
        <circle cx="165" cy="100" r="10" fill="#F3D58A" stroke="#100D18" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: 'p4',
    type: 'sw',
    code: 'TG-S02',
    category: 'Software',
    title: 'Campus Graph',
    description: 'A map of lab equipment and free hours so students stop hunting for a bench.',
    by: 'Information Technology',
    svg: (
      <svg viewBox="0 0 300 170" aria-hidden="true">
        <circle cx="150" cy="85" r="9" fill="#F3D58A" stroke="#100D18" strokeWidth="2" />
        <circle cx="80" cy="50" r="6" fill="#D6B36A" stroke="#100D18" strokeWidth="1.5" />
        <circle cx="220" cy="55" r="6" fill="#762E42" stroke="#D6B36A" strokeWidth="1.5" />
        <circle cx="90" cy="125" r="6" fill="#E9D9B5" stroke="#100D18" strokeWidth="1.5" />
        <circle cx="215" cy="120" r="6" fill="#E9D9B5" stroke="#100D18" strokeWidth="1.5" />
        <path d="M150 85L80 50M150 85L220 55M150 85L90 125M150 85L215 120" stroke="#D6B36A" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: 'p5',
    type: 'hw',
    code: 'TG-H03',
    category: 'Hardware',
    title: 'Pulse Band',
    description: 'A wearable that tracks heart rate variability and flags fatigue during study.',
    by: 'Biomedical Engineering',
    svg: (
      <svg viewBox="0 0 300 170" aria-hidden="true">
        <path d="M60 120Q110 30 150 85T240 50" stroke="#D6B36A" strokeWidth="2.5" fill="none" />
        <rect x="138" y="73" width="24" height="24" fill="#762E42" stroke="#F3D58A" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: 'p6',
    type: 'sw',
    code: 'TG-S03',
    category: 'Software',
    title: 'Open Viva',
    description: 'A practice tool that asks follow-up questions the way a real examiner would.',
    by: 'AI & Data Science',
    svg: (
      <svg viewBox="0 0 300 170" aria-hidden="true">
        <rect x="70" y="45" width="160" height="80" fill="#1E192D" stroke="#D6B36A" strokeWidth="2" />
        <path d="M70 65H230M90 85H150M90 100H190" stroke="#D6B36A" strokeWidth="2" />
        <rect x="170" y="80" width="40" height="10" fill="#F3D58A" stroke="#100D18" strokeWidth="1.5" />
      </svg>
    ),
  },
];

const HOUSE_THEMES = [
  {
    name: 'Gryffindor',
    cardBg: 'linear-gradient(145deg, #250C17 0%, #15060D 100%)',
    artBg: '#1B0810',
    borderColor: 'rgba(214, 60, 90, 0.5)',
    borderHover: '#FF4D6D',
    glowColor: 'rgba(230, 57, 70, 0.4)',
    accentTag: '#FF8FA3',
    crestColor: '#FFE27A',
    crestLabel: '🦁 GRYFFINDOR',
    boxShadow: '0 8px 25px rgba(0,0,0,0.65), 3.5px 3.5px 0px rgba(180,40,70,0.5)',
  },
  {
    name: 'Slytherin',
    cardBg: 'linear-gradient(145deg, #0C2117 0%, #06130D 100%)',
    artBg: '#081710',
    borderColor: 'rgba(46, 196, 182, 0.5)',
    borderHover: '#74C69D',
    glowColor: 'rgba(46, 196, 182, 0.4)',
    accentTag: '#A7F3D0',
    crestColor: '#E2E8F0',
    crestLabel: '🐍 SLYTHERIN',
    boxShadow: '0 8px 25px rgba(0,0,0,0.65), 3.5px 3.5px 0px rgba(46,196,182,0.45)',
  },
  {
    name: 'Ravenclaw',
    cardBg: 'linear-gradient(145deg, #0E1B33 0%, #070E1C 100%)',
    artBg: '#091224',
    borderColor: 'rgba(96, 165, 250, 0.5)',
    borderHover: '#60A5FA',
    glowColor: 'rgba(59, 130, 246, 0.4)',
    accentTag: '#93C5FD',
    crestColor: '#D6B36A',
    crestLabel: '🦅 RAVENCLAW',
    boxShadow: '0 8px 25px rgba(0,0,0,0.65), 3.5px 3.5px 0px rgba(59,130,246,0.45)',
  },
  {
    name: 'Hufflepuff',
    cardBg: 'linear-gradient(145deg, #2A1D0D 0%, #170F06 100%)',
    artBg: '#1D1307',
    borderColor: 'rgba(245, 158, 11, 0.5)',
    borderHover: '#FBBF24',
    glowColor: 'rgba(245, 158, 11, 0.4)',
    accentTag: '#FDE68A',
    crestColor: '#E5E7EB',
    crestLabel: '🦡 HUFFLEPUFF',
    boxShadow: '0 8px 25px rgba(0,0,0,0.65), 3.5px 3.5px 0px rgba(245,158,11,0.45)',
  },
];

export const TechShowcaseSection: React.FC<TechShowcaseSectionProps> = ({
  projects,
}) => {
  const [filter, setFilter] = useState<'all' | 'hw' | 'sw'>('all');

  const filteredStatic = STATIC_PLATES.filter((p) => {
    if (filter === 'all') return true;
    return p.type === filter;
  });

  const filteredDynamic = projects.filter((p) => {
    if (filter === 'all') return true;
    const cat = p.category.toLowerCase();
    if (filter === 'hw') return cat.includes('hardware');
    if (filter === 'sw') return cat.includes('software');
    return true;
  });

  const renderPlateCard = (plate: StaticPlacard, cardIdx: number = 0, uniqueKey?: string) => {
    const house = HOUSE_THEMES[cardIdx % 4];
    return (
      <div
        key={uniqueKey || plate.id}
        className="plate group transition-all duration-300 hover:-translate-y-1.5"
        data-t={plate.type}
        style={{
          background: house.cardBg,
          borderColor: house.borderColor,
          boxShadow: house.boxShadow,
        }}
      >
        <div className="art relative" style={{ backgroundColor: house.artBg }}>
          <div className="tech-badge-overlay mono">
            <span className="font-bold text-[#F3D58A]">{plate.code}</span>
            <span className="inline-flex items-center gap-1.5 font-bold" style={{ color: house.accentTag }}>
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: house.borderHover }} />
              {house.crestLabel}
            </span>
          </div>
          {plate.svg}
        </div>
        <div className="pb">
          <div className="top mono">
            <span className="code-tag font-bold" style={{ color: house.accentTag }}>{plate.code}</span>
            <span className="cat-pill" style={{ borderColor: house.borderColor, background: 'rgba(0,0,0,0.4)' }}>
              {plate.category}
            </span>
          </div>
          <h3 className="font-cinzel font-bold text-xl text-[#F4EBDD] group-hover:text-[#F3D58A] transition-colors tracking-wide">{plate.title}</h3>
          <p className="font-body text-xs text-[#C2BDCA] leading-relaxed">{plate.description}</p>
          <div className="by text-xs font-cinzel font-bold tracking-wider" style={{ color: house.accentTag }}>{plate.by}</div>
        </div>
      </div>
    );
  };

  const renderDynamicCard = (project: ProjectRecord, idx: number, cardIdx: number = 0, uniqueKey?: string) => {
    const isHw = project.category.toLowerCase().includes('hardware');
    const code = `TG-${isHw ? 'H' : 'S'}${String(idx + 10).padStart(2, '0')}`;
    const house = HOUSE_THEMES[cardIdx % 4];
    return (
      <div
        key={uniqueKey || project.id}
        className="plate group transition-all duration-300 hover:-translate-y-1.5"
        data-t={isHw ? 'hw' : 'sw'}
        style={{
          background: house.cardBg,
          borderColor: house.borderColor,
          boxShadow: house.boxShadow,
        }}
      >
        <div className="art relative" style={{ backgroundColor: house.artBg }}>
          <div className="tech-badge-overlay mono">
            <span className="font-bold text-[#F3D58A]">{code}</span>
            <span className="inline-flex items-center gap-1.5 font-bold" style={{ color: house.accentTag }}>
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: house.borderHover }} />
              {house.crestLabel}
            </span>
          </div>
          <svg viewBox="0 0 300 170" aria-hidden="true">
            <rect x="50" y="50" width="200" height="70" fill={house.artBg} stroke={house.borderColor} strokeWidth="2" />
            <circle cx="150" cy="85" r="14" fill={house.borderHover} stroke="#100D18" strokeWidth="2" />
            <path d="M50 85H136M164 85H250" stroke={house.crestColor} strokeWidth="2" />
          </svg>
        </div>
        <div className="pb">
          <div className="top mono">
            <span className="code-tag font-bold" style={{ color: house.accentTag }}>{code}</span>
            <span className="cat-pill" style={{ borderColor: house.borderColor, background: 'rgba(0,0,0,0.4)' }}>
              {project.category}
            </span>
          </div>
          <h3 className="font-cinzel font-bold text-xl text-[#F4EBDD] group-hover:text-[#F3D58A] transition-colors tracking-wide">{project.project_name}</h3>
          <p className="font-body text-xs text-[#C2BDCA] leading-relaxed">{project.description}</p>
          <div className="by text-xs font-cinzel font-bold tracking-wider" style={{ color: house.accentTag }}>
            {project.student_name} · {project.college_name}
          </div>
        </div>
      </div>
    );
  };

  // Dedicated Rows for Two-Row Infinite Marquee with Alternating 4 Hogwarts House Palettes
  const hwCards = [
    ...STATIC_PLATES.filter((p) => p.type === 'hw').map((plate, i) => renderPlateCard(plate, i, `hw-${plate.id}`)),
    ...projects
      .filter((p) => p.category.toLowerCase().includes('hardware'))
      .map((proj, idx) => renderDynamicCard(proj, idx, idx + 2, `hw-dyn-${proj.id}`)),
  ];

  const swCards = [
    ...STATIC_PLATES.filter((p) => p.type === 'sw').map((plate, i) => renderPlateCard(plate, i + 1, `sw-${plate.id}`)),
    ...projects
      .filter((p) => !p.category.toLowerCase().includes('hardware'))
      .map((proj, idx) => renderDynamicCard(proj, idx, idx + 3, `sw-dyn-${proj.id}`)),
  ];

  return (
    <section className="relative py-14 sm:py-16 md:py-20 bg-gradient-to-b from-[#0A1326] via-[#111E3B] to-[#070D1B] overflow-hidden text-[#F4EBDD]" id="showcase">
      {/* Ravenclaw Chamber of Inventions Blue & Bronze Ambient Glow */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-35 z-0"
        style={{
          background: 'radial-gradient(ellipse at 70% 25%, rgba(59, 130, 246, 0.35) 0%, transparent 60%), radial-gradient(ellipse at 25% 75%, rgba(214, 179, 106, 0.25) 0%, transparent 65%)',
        }}
        aria-hidden="true"
      />
      {/* Background Architectural Constellation Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035] z-0"
        style={{
          backgroundImage:
            'linear-gradient(#D6B36A 1px, transparent 1px), linear-gradient(90deg, #D6B36A 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      <div className="wrap max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm border-1.5 border-[#D6B36A] bg-[#1A1626] shadow-[0_0_12px_rgba(214,179,106,0.15),2px_2px_0px_#100D18] mb-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D6B36A] shadow-[0_0_6px_#D6B36A]" />
            <span className="font-mono text-[11px] sm:text-xs text-[#F3D58A] tracking-widest uppercase font-bold">
              CHAMBER OF MAGICAL INVENTIONS // NATIONAL PAVILION
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-[#F4EBDD] tracking-tight leading-tight">
            Flagship Innovation <span className="text-[#D6B36A] underline decoration-[#762E42] decoration-wavy decoration-2">Showcase.</span>
          </h2>
        </div>

        {/* Action Header Strip */}
        <div className="flex justify-between items-center flex-wrap gap-4 mb-6">
          {/* Filter Chips */}
          <div className="filters" role="group" aria-label="Filter projects" style={{ marginBottom: 0 }}>
            <button
              className="chip"
              aria-pressed={filter === 'all'}
              onClick={() => setFilter('all')}
            >
              All Exhibits
            </button>
            <button
              className="chip"
              aria-pressed={filter === 'hw'}
              onClick={() => setFilter('hw')}
            >
              Hardware Prototypes
            </button>
            <button
              className="chip"
              aria-pressed={filter === 'sw'}
              onClick={() => setFilter('sw')}
            >
              Software Systems
            </button>
          </div>

          <a
            href="#register"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-sm font-mono font-bold text-xs text-[#100D18] bg-[#D6B36A] hover:bg-[#F3D58A] border-2 border-[#F3D58A] shadow-[0_0_15px_rgba(214,179,106,0.35),2.5px_2.5px_0px_#100D18] hover:-translate-y-0.5 transition-all"
          >
            Exhibit Your Project <ArrowUpRight size={14} />
          </a>
        </div>

        {/* Official Banner Note */}
        <div className="p-4 rounded-sm border-2 border-[#D6B36A]/60 bg-gradient-to-r from-[#0F1C38] via-[#142347] to-[#0F1C38] shadow-[0_8px_30px_rgba(0,0,0,0.6),3px_3px_0px_#060B17] mb-8 font-mono text-xs text-[#F4EBDD] font-medium">
          “Students from all external and host colleges are welcome to exhibit their hardware and software projects. Register below with a Project Showcasing pass to unlock your project submission upon admin review.”
        </div>

        {/* Card Collections: 2-Row Infinite Marquee on 'All' / Filtered Grid on Specific Selection */}
        {filter === 'all' ? (
          <InfiniteCardsMarquee
            row1Cards={hwCards}
            row2Cards={swCards}
            speedSeconds={40}
          />
        ) : (
          <div className="plates">
            {filteredStatic.map((plate, idx) => renderPlateCard(plate, idx))}
            {filteredDynamic.map((project, idx) => renderDynamicCard(project, idx, idx + filteredStatic.length))}
          </div>
        )}

        {/* Disciplines Specification Breakdown: Technical Spec Dossiers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10 pt-8 border-t-2 border-dashed border-[#D6B36A]/25">
          <div className="p-5 sm:p-6 rounded-sm border-2 border-[#D6B36A]/50 bg-gradient-to-b from-[#0F1C38] to-[#091224] shadow-[0_8px_30px_rgba(0,0,0,0.6),3.5px_3.5px_0px_#060B17]">
            <div className="flex items-center gap-3 mb-3.5">
              <div className="p-2 rounded-sm border-1.5 border-[#D6B36A] bg-[#162952] shadow-[0_0_8px_rgba(96,165,250,0.3)]">
                <Cpu className="w-4 h-4 text-[#93C5FD]" />
              </div>
              <h4 className="font-display text-lg sm:text-xl font-black text-[#F4EBDD]">
                Hardware Showcase Track
              </h4>
            </div>
            <ul className="space-y-2 font-mono text-xs text-[#C2BDCA]">
              <li className="flex items-center gap-2"><span className="text-[#D6B36A] font-bold">▹</span> Robotics &amp; Autonomous Vehicles</li>
              <li className="flex items-center gap-2"><span className="text-[#D6B36A] font-bold">▹</span> IoT (Internet of Things) Distributed Nodes</li>
              <li className="flex items-center gap-2"><span className="text-[#D6B36A] font-bold">▹</span> ESP32, STM32 &amp; Arduino Hardware Projects</li>
              <li className="flex items-center gap-2"><span className="text-[#D6B36A] font-bold">▹</span> Smart Home &amp; Industrial Automation</li>
              <li className="flex items-center gap-2"><span className="text-[#D6B36A] font-bold">▹</span> Embedded Systems &amp; Firmware Architectures</li>
              <li className="flex items-center gap-2"><span className="text-[#D6B36A] font-bold">▹</span> Custom Electronic Prototypes &amp; PCB Assemblies</li>
              <li className="flex items-center gap-2"><span className="text-[#D6B36A] font-bold">▹</span> Innovative Hardware Products &amp; Energy Systems</li>
            </ul>
          </div>

          <div className="p-5 sm:p-6 rounded-sm border-2 border-[#D6B36A]/50 bg-gradient-to-b from-[#0F1C38] to-[#091224] shadow-[0_8px_30px_rgba(0,0,0,0.6),3.5px_3.5px_0px_#060B17]">
            <div className="flex items-center gap-3 mb-3.5">
              <div className="p-2 rounded-sm border-1.5 border-[#D6B36A] bg-[#162952] shadow-[0_0_8px_rgba(96,165,250,0.3)]">
                <Code2 className="w-4 h-4 text-[#93C5FD]" />
              </div>
              <h4 className="font-display text-lg sm:text-xl font-black text-[#F4EBDD]">
                Software Showcase Track
              </h4>
            </div>
            <ul className="space-y-2 font-mono text-xs text-[#C2BDCA]">
              <li className="flex items-center gap-2"><span className="text-[#D6B36A] font-bold">▹</span> Artificial Intelligence &amp; LLM Orchestrations</li>
              <li className="flex items-center gap-2"><span className="text-[#D6B36A] font-bold">▹</span> Machine Learning Models &amp; Neural Pipelines</li>
              <li className="flex items-center gap-2"><span className="text-[#D6B36A] font-bold">▹</span> Next-Gen Web Applications &amp; Micro-Frontends</li>
              <li className="flex items-center gap-2"><span className="text-[#D6B36A] font-bold">▹</span> Android &amp; Cross-Platform Native Applications</li>
              <li className="flex items-center gap-2"><span className="text-[#D6B36A] font-bold">▹</span> Autonomous AI Assistants &amp; Agent Swarms</li>
              <li className="flex items-center gap-2"><span className="text-[#D6B36A] font-bold">▹</span> Enterprise SaaS Products &amp; Cloud APIs</li>
              <li className="flex items-center gap-2"><span className="text-[#D6B36A] font-bold">▹</span> Desktop Applications &amp; Security Automation Tools</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
