import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, ArrowRight, Compass, Footprints } from 'lucide-react';

interface SessionItem {
  time: string;
  title: string;
  venue: string;
  tag: string;
}

interface DaySchedule {
  dayName: string;
  dayNumber: string;
  dateStr: string;
  sessions: SessionItem[];
}

const SCHEDULE_DATA: DaySchedule[] = [
  {
    dayName: 'Mon',
    dayNumber: '18',
    dateStr: '18 January 2027',
    sessions: [
      { time: '10:00', title: 'Opening ceremony & Festival Kickoff', venue: 'Main Atrium', tag: 'Ceremony' },
      { time: '11:30', title: 'Keynote: Hardware that ships', venue: 'Auditorium', tag: 'Talk' },
      { time: '14:00', title: 'Bhavesh Workshop (College Exclusive)', venue: 'Innovation Lab', tag: 'Workshop' },
    ],
  },
  {
    dayName: 'Tue',
    dayNumber: '19',
    dateStr: '19 January 2027',
    sessions: [
      { time: '10:00', title: 'Thakkar Workshop: Embedded Systems & Architecture', venue: 'Lab 2', tag: 'Workshop' },
      { time: '14:00', title: 'Intro to on-device Machine Learning', venue: 'Lab 4', tag: 'Workshop' },
      { time: '16:30', title: 'Open design critique and mentoring', venue: 'Studio', tag: 'Open hour' },
    ],
  },
  {
    dayName: 'Wed',
    dayNumber: '20',
    dateStr: '20 January 2027',
    sessions: [
      { time: '09:00', title: 'Bhavesh Hackathon (College Exclusive 24h sprint)', venue: 'Innovation Lab', tag: 'Hackathon' },
      { time: '13:00', title: 'Panel: open source in college and beyond', venue: 'Auditorium', tag: 'Talk' },
      { time: '15:00', title: 'PCB design basics and rapid prototyping', venue: 'Lab 2', tag: 'Workshop' },
    ],
  },
  {
    dayName: 'Thu',
    dayNumber: '21',
    dateStr: '21 January 2027',
    sessions: [
      { time: '09:00', title: 'Tech Showcase – Day 1 Setup & Opens (All Colleges)', venue: 'Main Atrium', tag: 'Showcase' },
      { time: '11:00', title: 'Prototyping in Figma & interactive micro-frontends', venue: 'Studio', tag: 'Workshop' },
      { time: '15:00', title: 'Talk: robots in the real world', venue: 'Auditorium', tag: 'Talk' },
    ],
  },
  {
    dayName: 'Fri',
    dayNumber: '22',
    dateStr: '22 January 2027',
    sessions: [
      { time: '09:00', title: 'Tech Showcase – Day 2 (All Colleges Open Exhibition)', venue: 'Main Atrium', tag: 'Showcase' },
      { time: '13:00', title: 'Showcase open to visitors & interactive voting', venue: 'Main Atrium', tag: 'Showcase' },
      { time: '17:00', title: 'Evening live hardware demos & lightning pitches', venue: 'Innovation Lab', tag: 'Demo' },
    ],
  },
  {
    dayName: 'Sat',
    dayNumber: '23',
    dateStr: '23 January 2027',
    sessions: [
      { time: '09:00', title: 'Thakkar Hackathon (College Exclusive Challenge)', venue: 'Central Lab', tag: 'Hackathon' },
      { time: '14:00', title: 'Jury walk-through and project assessments', venue: 'Main Atrium', tag: 'Judging' },
      { time: '16:00', title: 'Visitor open day and hands-on testing', venue: 'Main Atrium', tag: 'Showcase' },
    ],
  },
  {
    dayName: 'Sun',
    dayNumber: '24',
    dateStr: '24 January 2027',
    sessions: [
      { time: '10:00', title: 'AI Workshop for Parents (Special family track)', venue: 'Auditorium', tag: 'Workshop' },
      { time: '14:00', title: 'Both Hackathon Results Announced (Bhavesh & Thakkar)', venue: 'Auditorium', tag: 'Ceremony' },
      { time: '16:00', title: 'Grand awards ceremony and festival closing', venue: 'Auditorium', tag: 'Ceremony' },
    ],
  },
];

const getTagBadgeStyle = (tag: string) => {
  switch (tag.toLowerCase()) {
    case 'hackathon':
      return { background: '#762E42', color: '#F3D58A', border: '1.5px solid #D6B36A' };
    case 'workshop':
      return { background: '#1E4334', color: '#74C69D', border: '1.5px solid #74C69D' };
    case 'showcase':
      return { background: '#D6B36A', color: '#100D18', border: '1.5px solid #FFE27A' };
    case 'ceremony':
      return { background: '#4A3716', color: '#FFE27A', border: '1.5px solid #D6B36A' };
    case 'talk':
      return { background: '#1A2942', color: '#93C5FD', border: '1.5px solid #3B82F6' };
    default:
      return { background: '#251D38', color: '#F4EBDD', border: '1.5px solid #D6B36A' };
  }
};

export const ScheduleSection: React.FC = () => {
  const [activeDayIndex, setActiveDayIndex] = useState(0);

  const activeDay = SCHEDULE_DATA[activeDayIndex];

  return (
    <section className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 bg-gradient-to-b from-[#1C1610] via-[#261E16] to-[#18120C] overflow-hidden text-white" id="schedule">
      {/* Marauder's Map Aged Parchment Floorplan Lines & Ink Footprints */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.08] z-0"
        style={{
          backgroundImage:
            'radial-gradient(#D6B36A 1.5px, transparent 1.5px), linear-gradient(to right, #D6B36A 1px, transparent 1px), linear-gradient(to bottom, #D6B36A 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Marauder's Map Dedication Banner */}
        <div className="mb-8 p-4 sm:p-5 rounded-sm border-2 border-[#D6B36A] bg-gradient-to-r from-[#2C2117] via-[#382B1E] to-[#2C2117] shadow-[0_10px_30px_rgba(0,0,0,0.7)] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-sm border border-[#D6B36A] bg-[#1A120B] text-[#F3D58A] shadow-[0_0_12px_rgba(214,179,106,0.3)]">
              <Compass className="w-5 h-5 animate-spin" style={{ animationDuration: '24s' }} />
            </div>
            <div>
              <span className="font-mono text-[10px] tracking-widest uppercase text-[#D6B36A] font-bold block">
                MESSRS MOONY, WORMTAIL, PADFOOT &amp; PRONGS PRESENT
              </span>
              <h4 className="font-display font-black text-sm sm:text-base text-[#F4EBDD]">
                THE MARAUDER'S MAP // 7-DAY SCHEDULE
              </h4>
            </div>
          </div>
          <div className="font-mono text-xs italic text-[#F3D58A] bg-[#1A120B] px-4 py-1.5 rounded-sm border border-[#D6B36A]/60 shadow-[0_0_10px_rgba(214,179,106,0.25)]">
            "I solemnly swear that I am up to no good."
          </div>
        </div>

        {/* Section Main Title */}
        <div className="mb-8 sm:mb-10">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-[#F4EBDD] tracking-tight leading-tight">
            Seven Days, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D6B36A] via-[#F3D58A] to-[#D6B36A]">One Enchanted Campus.</span>
          </h2>
          <p className="font-mono text-xs sm:text-sm text-[#E2D5C0] mt-2">
            Select a date below to reveal scheduled sessions, venues, and moving footprints.
          </p>
        </div>

        {/* 7 Days Tab List Ribbon: Map Date Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 sm:gap-3.5 mb-8" role="tablist" aria-label="Festival days">
          {SCHEDULE_DATA.map((day, idx) => {
            const isSelected = activeDayIndex === idx;
            return (
              <button
                key={day.dayNumber}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActiveDayIndex(idx)}
                className={`p-3 sm:p-4 rounded-sm font-mono text-left transition-all duration-300 border-2 flex flex-col justify-between cursor-pointer relative overflow-hidden ${
                  isSelected
                    ? 'bg-gradient-to-br from-[#D6B36A] to-[#F3D58A] text-[#100D18] border-[#FFE27A] shadow-[0_0_24px_rgba(214,179,106,0.6),3.5px_3.5px_0px_#0A0812] -translate-y-1'
                    : 'bg-[#261E16] text-[#F4EBDD] border-[#D6B36A]/40 shadow-[0_6px_20px_rgba(0,0,0,0.5)] hover:bg-[#34281E] hover:border-[#D6B36A] hover:-translate-y-0.5'
                }`}
              >
                <div className={`flex items-center justify-between text-[11px] sm:text-xs font-bold mb-1.5 ${isSelected ? 'text-[#100D18]' : 'text-[#E2D5C0]'}`}>
                  <span>{day.dayName}</span>
                  {isSelected && <span className="w-2 h-2 rounded-full bg-[#100D18]" />}
                </div>
                <div className={`text-2xl sm:text-3xl font-black font-display leading-none mb-1 ${isSelected ? 'text-[#100D18]' : 'text-[#F4EBDD]'}`}>
                  {day.dayNumber}
                </div>
                <div className={`text-[10px] font-bold tracking-widest uppercase truncate ${isSelected ? 'text-[#100D18]/85' : 'text-[#D6B36A]'}`}>
                  JAN 2027
                </div>
              </button>
            );
          })}
        </div>

        {/* Sessions Panel for the Active Day: Marauder's Parchment Dossier */}
        <div className="rounded-sm border-2 border-[#D6B36A] bg-gradient-to-b from-[#2A2016] to-[#1C150E] p-6 sm:p-8 shadow-[0_16px_50px_rgba(0,0,0,0.7),0_0_24px_rgba(214,179,106,0.2)] relative overflow-hidden" role="tabpanel">
          {/* Wax Seal Ribbon in corner */}
          <div
            className="absolute top-0 right-10 px-4 py-1 bg-gradient-to-r from-[#762E42] to-[#4A1525] border-x border-b border-[#D6B36A] shadow-[0_2px_8px_rgba(0,0,0,0.6)] z-10 flex items-center gap-1.5"
            style={{ transform: 'rotate(2deg)' }}
          >
            <Footprints className="w-3.5 h-3.5 text-[#F3D58A]" />
            <span className="font-mono text-[9px] uppercase tracking-wider text-[#F3D58A] font-bold">
              MAP VERIFIED
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-dashed border-[#D6B36A]/30 pb-4 mb-6 gap-3">
            <div className="font-mono text-sm sm:text-base font-black text-[#F4EBDD] flex items-center gap-2.5">
              <Calendar className="w-4 h-4 text-[#D6B36A]" />
              <span>{activeDay.dateStr}</span>
            </div>
            <span className="font-mono text-xs font-bold text-[#100D18] bg-gradient-to-r from-[#D6B36A] to-[#F3D58A] px-3 py-1 rounded-sm border border-[#FFE27A] shadow-[0_0_10px_rgba(214,179,106,0.3)] self-start sm:self-auto">
              {activeDay.sessions.length} SESSIONS ACTIVE ON MAP
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeDay.dayNumber}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {activeDay.sessions.map((sess, idx) => (
                <motion.div
                  key={`${activeDay.dayNumber}-${idx}`}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, delay: idx * 0.06 }}
                  className="p-4 sm:p-5 rounded-sm border-2 border-[#D6B36A]/40 bg-[#221A11] shadow-[0_6px_20px_rgba(0,0,0,0.5)] hover:border-[#D6B36A] hover:shadow-[0_0_20px_rgba(214,179,106,0.25)] hover:-translate-y-0.5 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                >
                  <div className="flex items-start sm:items-center gap-4">
                    {/* Time Badge */}
                    <div className="flex items-center gap-2 font-mono text-xs sm:text-sm text-[#F3D58A] font-black min-w-[76px] bg-[#181109] px-3 py-1.5 rounded-sm border border-[#D6B36A]/50 shadow-[0_0_8px_rgba(214,179,106,0.2)]">
                      <Clock className="w-3.5 h-3.5 text-[#D6B36A]" />
                      <span>{sess.time}</span>
                    </div>

                    <div>
                      <h3 className="font-cinzel font-bold text-lg sm:text-xl text-[#F4EBDD] group-hover:text-[#F3D58A] transition-colors tracking-wide">
                        {sess.title}
                      </h3>
                      <div className="flex items-center gap-2 font-body text-xs text-[#E2D5C0] font-medium mt-1">
                        <MapPin className="w-3.5 h-3.5 text-[#D6B36A]" />
                        <span>{sess.venue}</span>
                      </div>
                    </div>
                  </div>

                  <span
                    className="font-mono text-xs px-3.5 py-1 rounded-sm font-bold uppercase tracking-wider self-start sm:self-auto shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
                    style={getTagBadgeStyle(sess.tag)}
                  >
                    {sess.tag}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Schedule Sub-note: Mischief Managed */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-body text-xs text-[#E2D5C0] border-t border-[#D6B36A]/25 pt-5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D6B36A] shadow-[0_0_8px_#D6B36A]" />
            <span className="font-bold text-[#F4EBDD] font-cinzel tracking-wide">All tracks hosted on LJCCA Main Campus · Mischief Managed.</span>
          </div>
          <a
            href="#register"
            className="text-[#F3D58A] hover:text-[#FFFFFF] transition-colors font-cinzel font-bold tracking-wider flex items-center gap-1.5"
          >
            <span>Claim Hogwarts Festival Passes</span>
            <ArrowRight className="w-4 h-4 text-[#D6B36A]" />
          </a>
        </div>
      </div>
    </section>
  );
};
