import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Calendar, MapPin, Sparkles, ChevronDown } from 'lucide-react';
import { MagneticButton } from '../common/MagneticButton';

interface HeroProps {
  onOpenSubmission?: () => void;
}

export const Hero: React.FC<HeroProps> = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date(2027, 0, 18, 9, 0, 0).getTime();
    const update = () => {
      const now = new Date().getTime();
      const diff = target - now;
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000),
        });
      }
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  // Floating candles array at different positions & depths
  const floatingCandles = [
    { top: '18%', left: '8%', delay: 0, duration: 4.8, size: 'md' },
    { top: '26%', left: '16%', delay: 1.2, duration: 5.6, size: 'sm' },
    { top: '15%', left: '28%', delay: 0.6, duration: 5.2, size: 'lg' },
    { top: '22%', right: '24%', delay: 1.8, duration: 4.6, size: 'md' },
    { top: '16%', right: '12%', delay: 0.4, duration: 5.4, size: 'lg' },
    { top: '30%', right: '7%', delay: 1.4, duration: 5.0, size: 'sm' },
    { top: '36%', left: '5%', delay: 2.0, duration: 6.0, size: 'sm' },
    { top: '38%', right: '18%', delay: 0.8, duration: 5.8, size: 'md' },
  ];

  return (
    <section
      className="relative min-h-[92vh] flex flex-col justify-between items-center pt-24 pb-10 sm:pt-28 sm:pb-12 px-4 sm:px-6 md:px-8 overflow-hidden bg-[#0A0714]"
      id="top"
    >
      {/* 1. Deep Midnight Hogwarts Sky Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#06040C] via-[#0E0A1A] to-[#140F24] pointer-events-none z-0" />

      {/* 2. Moonlit Atmospheric Glow & Drifting Fog */}
      <div 
        className="absolute -top-10 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] pointer-events-none rounded-full blur-[140px] opacity-35 z-0"
        style={{
          background: 'radial-gradient(circle, rgba(214, 179, 106, 0.25) 0%, rgba(21, 24, 42, 0.6) 55%, transparent 80%)',
        }}
        aria-hidden="true"
      />

      {/* Crescent Moon in the High Sky */}
      <div className="absolute top-16 right-[15%] w-24 h-24 pointer-events-none z-0 hidden md:block">
        <div className="absolute inset-0 rounded-full bg-[#FFF9E6] shadow-[0_0_50px_#FFE79A,0_0_100px_rgba(214,179,106,0.5)] opacity-85" />
        <div className="absolute top-1 left-2 w-20 h-20 rounded-full bg-[#080512] opacity-90" />
      </div>

      {/* 3. Layered Silhouette of Hogwarts Castle with Illuminated Windows */}
      <div className="absolute bottom-0 left-0 right-0 h-64 sm:h-80 md:h-96 pointer-events-none z-[1] flex items-end justify-center overflow-hidden opacity-90">
        <svg 
          viewBox="0 0 1600 360" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-full h-full object-cover"
          preserveAspectRatio="none"
        >
          {/* Distant Mountain Ridges */}
          <path 
            d="M0 360 L0 260 Q 200 210, 450 250 T 900 200 T 1350 240 L 1600 220 L 1600 360 Z" 
            fill="#06040B" 
          />
          {/* Midground Castle Cliffs & Viaduct Arches */}
          <path 
            d="M0 360 L0 300 L 180 300 Q 230 280, 280 300 L 320 300 Q 370 280, 420 300 L 1600 300 L 1600 360 Z" 
            fill="#08060F" 
          />
          {/* Detailed Hogwarts Spires, Astronomy Tower & Great Hall */}
          <path 
            d="M 180 300 L 180 200 L 195 200 L 210 140 L 225 200 L 240 200 L 240 300 M 340 300 L 340 230 L 355 230 L 370 170 L 385 230 L 400 230 L 400 300 M 520 300 L 520 180 L 540 180 L 560 90 L 580 180 L 600 180 L 600 300 M 620 300 L 620 220 L 720 220 L 720 300 M 740 300 L 740 150 L 760 150 L 780 70 L 800 150 L 820 150 L 820 300 M 840 300 L 840 210 L 860 210 L 875 160 L 890 210 L 910 210 L 910 300 M 1020 300 L 1020 170 L 1040 170 L 1060 100 L 1080 170 L 1100 170 L 1100 300 M 1220 300 L 1220 220 L 1240 220 L 1255 165 L 1270 220 L 1290 220 L 1290 300 M 1400 300 L 1400 240 L 1420 240 L 1435 190 L 1450 240 L 1470 240 L 1470 300 Z" 
            fill="#0B0816" 
          />
          {/* Main Tower Pinnacle and Battlements */}
          <path 
            d="M 750 150 L 750 110 L 765 110 L 780 35 L 795 110 L 810 110 L 810 150 Z" 
            fill="#0E0A1C" 
          />
          {/* Illuminated Castle Windows (Warm Glowing Lanterns) */}
          <circle cx="560" cy="195" r="4" fill="#FFE27A" opacity="0.95" />
          <circle cx="560" cy="225" r="3.5" fill="#FFE27A" opacity="0.85" />
          <circle cx="780" cy="120" r="4.5" fill="#FFE27A" opacity="0.95" />
          <circle cx="780" cy="155" r="4" fill="#FFE27A" opacity="0.9" />
          <circle cx="780" cy="190" r="3.5" fill="#FFE27A" opacity="0.85" />
          <circle cx="670" cy="240" r="3.5" fill="#FFE27A" opacity="0.9" />
          <circle cx="875" cy="225" r="3" fill="#FFE27A" opacity="0.85" />
          <circle cx="1060" cy="180" r="4" fill="#FFE27A" opacity="0.9" />
          <circle cx="1255" cy="235" r="3.5" fill="#FFE27A" opacity="0.85" />
          <circle cx="210" cy="215" r="3" fill="#FFE27A" opacity="0.8" />
        </svg>
      </div>

      {/* 4. Multiple Floating Candles Hovering in 3D Space */}
      <div className="absolute inset-0 pointer-events-none z-[4] overflow-hidden" aria-hidden="true">
        {floatingCandles.map((candle, idx) => (
          <motion.div
            key={idx}
            animate={{
              y: [0, -18, 0],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: candle.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: candle.delay,
            }}
            className="absolute hidden sm:flex flex-col items-center"
            style={{
              top: candle.top,
              left: candle.left,
              right: candle.right,
            }}
          >
            {/* Candle Flame with Flicker Animation */}
            <div 
              className={`rounded-full bg-[#FFF0A0] shadow-[0_0_12px_#F3D58A,0_0_24px_#D6B36A] animate-candle-flicker ${
                candle.size === 'lg' ? 'w-2 h-4' : candle.size === 'sm' ? 'w-1 h-2.5' : 'w-1.5 h-3'
              }`} 
            />
            {/* Wax Body */}
            <div 
              className={`bg-gradient-to-b from-[#F5E8C7] to-[#C9B588] rounded-sm opacity-90 shadow-[0_2px_4px_rgba(0,0,0,0.5)] ${
                candle.size === 'lg' ? 'w-2.5 h-12' : candle.size === 'sm' ? 'w-1.5 h-7' : 'w-2 h-10'
              }`} 
            />
          </motion.div>
        ))}
      </div>

      {/* 5. Floating Hovering Golden Snitch in the Foreground */}
      <motion.div
        animate={{
          x: [0, 22, -18, 0],
          y: [0, -25, -10, 0],
          rotate: [-4, 6, -8, -4],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-28 right-[20%] pointer-events-none z-[5] hidden lg:block filter drop-shadow-[0_0_16px_rgba(243,213,138,0.85)]"
      >
        <svg width="48" height="30" viewBox="0 0 64 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="18" r="8" fill="#F5D77F" stroke="#FFE899" strokeWidth="1" />
          <path d="M28 17 C 20 8, 8 6, 2 10 C 6 15, 16 19, 28 18 Z" fill="#FFFDF0" fillOpacity="0.8" stroke="#FFE899" strokeWidth="0.8" />
          <path d="M36 17 C 44 8, 56 6, 62 10 C 58 15, 48 19, 36 18 Z" fill="#FFFDF0" fillOpacity="0.8" stroke="#FFE899" strokeWidth="0.8" />
        </svg>
      </motion.div>

      {/* 6. TOP EDITORIAL STRIP */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3 text-[11px] sm:text-xs font-mono text-[#E7D7B5]">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm border border-[#D6B36A]/60 bg-[#161224]/85 backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.6)]"
        >
          <span className="w-2 h-2 rounded-full bg-[#762E42] border border-[#F3D58A] shadow-[0_0_8px_#762E42]" />
          <span className="text-[#F4EBDD] font-bold tracking-wider">HOGWARTS WIZARDING EDITION</span>
          <span className="text-[#D6B36A]/40">·</span>
          <span className="text-[#F3D58A] font-semibold">LJCCA CAMPUS</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm border border-[#D6B36A] bg-gradient-to-r from-[#762E42] via-[#5A1D2F] to-[#2B0E17] shadow-[0_0_18px_rgba(118,46,66,0.4)] text-[#F3D58A] font-black"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#F3D58A]" />
          <span className="tracking-wide">7 DAYS · 8 MAGICAL CHALLENGES · 100% FREE ADMISSION</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm border border-[#D6B36A]/60 bg-[#161224]/85 backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.6)] text-[#F4EBDD]"
        >
          <MapPin className="w-3.5 h-3.5 text-[#F3D58A]" />
          <span className="font-bold tracking-wide">AHMEDABAD, INDIA</span>
        </motion.div>
      </div>

      {/* 7. CENTERPIECE: MAJESTIC HOGWARTS TITLE COMPOSITION */}
      <div className="relative z-10 w-full max-w-4xl mx-auto my-auto flex flex-col items-center text-center px-4 py-6 sm:py-8">
        {/* Curated Hogwarts Seal Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-sm border border-[#D6B36A] bg-[#1A1428]/90 backdrop-blur-md shadow-[0_0_20px_rgba(214,179,106,0.3)]"
        >
          <span className="w-2 h-2 rounded-full bg-[#F3D58A] shadow-[0_0_8px_#F3D58A]" />
          <span className="text-[11px] sm:text-xs font-mono tracking-[0.2em] text-[#F3D58A] uppercase font-bold">
            ✦ ENTER THE WIZARDING WORLD OF INNOVATION ✦
          </span>
        </motion.div>

        {/* Grand Title */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="select-none relative"
        >
          <h1 className="font-display font-black tracking-[0.05em] leading-[0.95] text-center flex flex-col items-center">
            {/* TECH */}
            <span 
              className="text-6xl sm:text-7xl md:text-8xl lg:text-[6.5rem] text-[#F4EBDD] tracking-[0.08em]"
              style={{
                textShadow: '0 0 35px rgba(214, 179, 106, 0.35), 0 4px 12px rgba(0,0,0,0.9)',
              }}
            >
              TECH
            </span>

            {/* WIZARD */}
            <span 
              className="text-6xl sm:text-7xl md:text-8xl lg:text-[6.5rem] text-transparent bg-clip-text bg-gradient-to-r from-[#D6B36A] via-[#F3D58A] to-[#D6B36A] my-1 sm:my-2 tracking-[0.08em]"
              style={{
                filter: 'drop-shadow(0 0 30px rgba(243, 213, 138, 0.6))',
              }}
            >
              WIZARD
            </span>

            {/* YEAR BADGE AS ENCHANTED WAX CREST */}
            <div className="mt-2 sm:mt-3 flex items-center justify-center gap-2">
              <span className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-black tracking-widest text-[#100D18] px-6 py-1.5 rounded-sm border-2 border-[#F3D58A] bg-gradient-to-r from-[#D6B36A] to-[#F3D58A] shadow-[0_0_25px_rgba(214,179,106,0.6),3px_3px_0px_#0A0714] transform -rotate-1 hover:rotate-0 transition-transform">
                2027
              </span>
            </div>
          </h1>
        </motion.div>

        {/* Evocative Hogwarts Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-5 text-sm sm:text-base md:text-lg font-serif text-[#E7D7B5] max-w-xl mx-auto leading-relaxed font-normal"
        >
          Where Ideas Meet Hogwarts Magic. An extraordinary technology festival showcasing student engineering, generative AI, autonomous robotics, and wizarding spellcraft.
        </motion.p>

        {/* ENCHANTED ACTION CTA BUTTONS */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-7 flex flex-wrap items-center justify-center gap-3.5 sm:gap-5"
        >
          <MagneticButton
            href="#register"
            className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-sm font-cinzel font-bold text-xs sm:text-sm tracking-wider text-[#100D18] bg-gradient-to-r from-[#D6B36A] via-[#F3D58A] to-[#D6B36A] border-2 border-[#FFE27A] shadow-[0_0_25px_rgba(214,179,106,0.5),3.5px_3.5px_0px_#080510] hover:shadow-[0_0_35px_rgba(243,213,138,0.8),5px_5px_0px_#080510] hover:-translate-y-0.5 transition-all duration-200"
          >
            <span>CLAIM HOGWARTS PASS (FREE)</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </MagneticButton>

          <MagneticButton
            href="#schedule"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-sm font-cinzel text-xs sm:text-sm font-bold tracking-wider text-[#F4EBDD] bg-[#1A1428] border-2 border-[#D6B36A] shadow-[0_0_15px_rgba(214,179,106,0.25),3px_3px_0px_#080510] hover:bg-[#251D38] hover:border-[#F3D58A] hover:shadow-[0_0_25px_rgba(214,179,106,0.4),4.5px_4.5px_0px_#080510] hover:-translate-y-0.5 transition-all duration-200"
          >
            <Calendar className="w-4 h-4 text-[#F3D58A]" />
            <span>MARAUDER'S MAP SCHEDULE</span>
          </MagneticButton>
        </motion.div>
      </div>

      {/* 8. BOTTOM DOCK: ENCHANTED TIMEPIECE COUNTDOWN */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 pt-5 border-t border-[#D6B36A]/30">
        {/* Date & Campus Pill */}
        <div className="text-left font-mono text-xs">
          <div className="text-[#F3D58A] tracking-wider uppercase font-bold text-xs sm:text-sm flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D6B36A] shadow-[0_0_8px_#D6B36A]" />
            18–24 JANUARY 2027 · HOGWARTS CAMPUS
          </div>
          <div className="text-[#C2BDCA] font-medium text-[11px] sm:text-xs mt-0.5">
            LJCCA Main Campus · Near New IIM Rd, Vastrapur, Ahmedabad
          </div>
        </div>

        {/* Ancient Timepiece Countdown */}
        <div className="flex items-center gap-2 font-mono">
          <div className="flex flex-col items-center justify-center w-13 sm:w-15 h-13 sm:h-15 rounded-sm bg-[#181326] border-2 border-[#D6B36A] shadow-[0_0_12px_rgba(214,179,106,0.25),3px_3px_0px_#080510]">
            <span className="text-lg sm:text-xl font-black text-[#F4EBDD] leading-none">
              {String(timeLeft.days).padStart(2, '0')}
            </span>
            <span className="text-[8px] sm:text-[9px] text-[#C2BDCA] font-bold tracking-widest mt-1">DAYS</span>
          </div>
          <span className="text-[#D6B36A] font-black">:</span>
          <div className="flex flex-col items-center justify-center w-13 sm:w-15 h-13 sm:h-15 rounded-sm bg-[#181326] border-2 border-[#D6B36A] shadow-[0_0_12px_rgba(214,179,106,0.25),3px_3px_0px_#080510]">
            <span className="text-lg sm:text-xl font-black text-[#F3D58A] leading-none">
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            <span className="text-[8px] sm:text-[9px] text-[#C2BDCA] font-bold tracking-widest mt-1">HRS</span>
          </div>
          <span className="text-[#D6B36A] font-black">:</span>
          <div className="flex flex-col items-center justify-center w-13 sm:w-15 h-13 sm:h-15 rounded-sm bg-[#181326] border-2 border-[#762E42] shadow-[0_0_12px_rgba(118,46,66,0.35),3px_3px_0px_#080510]">
            <span className="text-lg sm:text-xl font-black text-[#F4EBDD] leading-none">
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <span className="text-[8px] sm:text-[9px] text-[#C2BDCA] font-bold tracking-widest mt-1">MIN</span>
          </div>
          <span className="text-[#D6B36A] font-black">:</span>
          <div className="flex flex-col items-center justify-center w-13 sm:w-15 h-13 sm:h-15 rounded-sm bg-gradient-to-br from-[#D6B36A] to-[#F3D58A] border-2 border-[#FFE27A] shadow-[0_0_20px_rgba(214,179,106,0.5),3px_3px_0px_#080510]">
            <span className="text-lg sm:text-xl font-black text-[#100D18] leading-none">
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
            <span className="text-[8px] sm:text-[9px] text-[#100D18] font-bold tracking-widest mt-1">SEC</span>
          </div>
        </div>

        {/* Scroll Indicator */}
        <a
          href="#about"
          className="hidden md:inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#F4EBDD] hover:text-[#F3D58A] transition-colors"
        >
          <span>DESCEND TO GREAT HALL</span>
          <ChevronDown className="w-3.5 h-3.5 animate-bounce text-[#D6B36A]" />
        </a>
      </div>
    </section>
  );
};
