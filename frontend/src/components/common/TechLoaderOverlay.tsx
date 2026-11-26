import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const TechLoaderOverlay: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(12);
  const [stage, setStage] = useState('UNVEILING THE HOGWARTS MIDNIGHT SKY...');
  const [broomFlown, setBroomFlown] = useState(false);

  const stages = [
    'UNVEILING THE HOGWARTS MIDNIGHT SKY...',
    'SUMMONING THE FIREBOLT BROOMSTICK...',
    'ILLUMINATING THE GREAT HALL FLOATING CANDLES...',
    'DECIPHERING THE MARAUDER\'S MAP ARCHIVES...',
    'TECH WIZARD 2027: ALOHOMORA!'
  ];

  useEffect(() => {
    // If reduced motion is preferred, close quickly
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setLoading(false);
      return;
    }

    const startTime = Date.now();
    const minLoadTime = 1800; // Allow visitor to experience the magical flying broomstick
    const maxLoadTime = 3200;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const calculatedProgress = Math.min(Math.floor((elapsed / maxLoadTime) * 100), 99);

      setProgress((prev) => {
        const next = Math.max(prev, calculatedProgress);
        const stageIndex = Math.min(Math.floor((next / 100) * stages.length), stages.length - 1);
        setStage(stages[stageIndex]);
        return next;
      });

      if (elapsed >= maxLoadTime) {
        clearInterval(interval);
        setProgress(100);
        setStage('TECH WIZARD 2027: ALOHOMORA!');
        setTimeout(() => {
          setBroomFlown(true);
          setTimeout(() => setLoading(false), 500);
        }, 400);
      }
    }, 40);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            scale: 1.03,
            filter: 'blur(8px)',
            transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } 
          }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center overflow-hidden select-none bg-[#08060F]"
        >
          {/* Midnight Sky Background with Starlight & Moonlight */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#05030A] via-[#0B0816] to-[#120E22] pointer-events-none" />

          {/* Glowing Full/Crescent Moon */}
          <div className="absolute top-12 right-16 w-28 h-28 rounded-full pointer-events-none">
            <div className="absolute inset-0 rounded-full bg-[#FFF8DB] opacity-90 shadow-[0_0_60px_#FFE79A,0_0_120px_rgba(214,179,106,0.4)]" />
            <div className="absolute top-1 left-2 w-24 h-24 rounded-full bg-[#07050E] opacity-85" />
          </div>

          {/* Twinkling Starlight Field */}
          <div className="absolute inset-0 pointer-events-none opacity-60">
            {[...Array(35)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-[#FFF4D4] animate-pulse"
                style={{
                  top: `${(i * 19) % 100}%`,
                  left: `${(i * 31) % 100}%`,
                  width: `${(i % 3) + 1.5}px`,
                  height: `${(i % 3) + 1.5}px`,
                  boxShadow: '0 0 6px #F3D58A',
                  animationDuration: `${2 + (i % 3) * 1.5}s`,
                  animationDelay: `${(i % 5) * 0.4}s`,
                }}
              />
            ))}
          </div>

          {/* Distant Hogwarts Castle Silhouette with Glowing Gothic Windows */}
          <div className="absolute bottom-0 left-0 right-0 h-44 sm:h-56 pointer-events-none z-10 flex items-end justify-center opacity-85">
            <svg 
              viewBox="0 0 1440 280" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg" 
              className="w-full h-full object-cover"
              preserveAspectRatio="none"
            >
              {/* Castle Mountain Base */}
              <path 
                d="M0 280 L0 230 Q180 200 360 220 T720 190 T1080 225 T1440 210 L1440 280 Z" 
                fill="#05030A" 
              />
              {/* Castle Turrets & Spires */}
              <path 
                d="M120 230 L120 140 L135 140 L145 100 L155 140 L170 140 L170 230 M240 225 L240 170 L250 170 L260 120 L270 170 L280 170 L280 225 M480 220 L480 110 L495 110 L510 50 L525 110 L540 110 L540 220 M640 215 L640 150 L655 150 L665 95 L675 150 L690 150 L690 215 M780 210 L780 130 L795 130 L810 70 L825 130 L840 130 L840 210 M960 220 L960 160 L975 160 L990 105 L1005 160 L1020 160 L1020 220 M1140 225 L1140 145 L1155 145 L1170 85 L1185 145 L1200 145 L1200 225 M1320 220 L1320 165 L1330 165 L1340 125 L1350 165 L1360 165 L1360 220 Z" 
                fill="#07050E" 
              />
              {/* Grand Hogwarts Main Spire & Great Hall */}
              <path 
                d="M500 220 L500 90 L515 90 L525 25 L535 90 L550 90 L550 220 M800 210 L800 110 L815 110 L825 45 L835 110 L850 110 L850 210 Z" 
                fill="#0A0814" 
              />
              {/* Glowing Warm Golden Windows */}
              <circle cx="525" cy="115" r="3.5" fill="#FFE27A" opacity="0.95" />
              <circle cx="525" cy="140" r="3" fill="#FFE27A" opacity="0.85" />
              <circle cx="825" cy="135" r="3.5" fill="#FFE27A" opacity="0.95" />
              <circle cx="825" cy="160" r="3" fill="#FFE27A" opacity="0.8" />
              <circle cx="260" cy="180" r="2.5" fill="#FFE27A" opacity="0.8" />
              <circle cx="990" cy="170" r="2.5" fill="#FFE27A" opacity="0.85" />
              <circle cx="1170" cy="165" r="2.5" fill="#FFE27A" opacity="0.85" />
            </svg>
          </div>

          {/* Cinematic Flying Broomstick (Nimbus/Firebolt with Wizard and Golden Particles) */}
          <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
            <motion.div
              initial={{ 
                x: '-30vw', 
                y: '80vh', 
                rotate: -18, 
                scale: 0.85, 
                opacity: 0 
              }}
              animate={
                broomFlown
                  ? { 
                      x: '135vw', 
                      y: '-25vh', 
                      rotate: -28, 
                      scale: 1.25, 
                      opacity: 1 
                    }
                  : { 
                      x: ['-25vw', '35vw', '70vw', '115vw'], 
                      y: ['75vh', '48vh', '32vh', '10vh'], 
                      rotate: [-16, -18, -14, -20],
                      scale: [0.8, 1, 1.05, 1.1],
                      opacity: [0, 1, 1, 0.9],
                    }
              }
              transition={
                broomFlown
                  ? { duration: 0.9, ease: [0.4, 0, 0.2, 1] }
                  : { duration: 2.8, ease: [0.25, 0.1, 0.25, 1], repeat: 0 }
              }
              className="absolute w-64 h-36 flex items-center justify-center filter drop-shadow-[0_0_20px_rgba(243,213,138,0.7)]"
            >
              {/* Flying Broomstick Realistic SVG Graphic */}
              <svg 
                viewBox="0 0 280 120" 
                className="w-full h-full overflow-visible"
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="broomHandle" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4A2511" />
                    <stop offset="45%" stopColor="#87471D" />
                    <stop offset="85%" stopColor="#5C2D14" />
                    <stop offset="100%" stopColor="#301509" />
                  </linearGradient>
                  <linearGradient id="broomBristles" x1="0%" y1="50%" x2="100%" y2="50%">
                    <stop offset="0%" stopColor="#C49A45" />
                    <stop offset="50%" stopColor="#825C1C" />
                    <stop offset="100%" stopColor="#4A320A" />
                  </linearGradient>
                  <linearGradient id="goldBands" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFF2A3" />
                    <stop offset="50%" stopColor="#D6B36A" />
                    <stop offset="100%" stopColor="#8C6E2D" />
                  </linearGradient>
                  <filter id="broomGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Stardust Spark Particles behind bristles */}
                <circle cx="20" cy="72" r="3" fill="#FFE27A" opacity="0.9" />
                <circle cx="8" cy="80" r="2.5" fill="#F3D58A" opacity="0.8" />
                <circle cx="30" cy="85" r="2" fill="#FFFFFF" opacity="0.95" />
                <circle cx="-10" cy="78" r="4" fill="#D6B36A" opacity="0.7" />
                <circle cx="-25" cy="88" r="3" fill="#FFE27A" opacity="0.6" />
                <circle cx="-45" cy="95" r="2.5" fill="#F3D58A" opacity="0.5" />

                {/* Broomstick Bristles (Swept Back Sprigs) */}
                <path 
                  d="M10 75 C 25 55, 60 52, 95 62 C 90 75, 85 85, 95 90 C 65 98, 25 95, 10 75 Z" 
                  fill="url(#broomBristles)" 
                  filter="url(#broomGlow)"
                />
                {/* Individual Twig Strands Detail */}
                <path d="M5 72 Q 40 60 90 65" stroke="#E5B855" strokeWidth="1.2" opacity="0.8" />
                <path d="M8 78 Q 45 68 92 73" stroke="#D6B36A" strokeWidth="1.4" opacity="0.9" />
                <path d="M12 84 Q 50 78 90 82" stroke="#B88A35" strokeWidth="1.2" opacity="0.8" />
                <path d="M18 90 Q 55 86 92 88" stroke="#8C631B" strokeWidth="1.2" opacity="0.7" />

                {/* Gold Bands binding the bristles */}
                <rect x="92" y="62" width="7" height="28" rx="2" fill="url(#goldBands)" stroke="#FFE27A" strokeWidth="0.8" />
                <rect x="103" y="60" width="5" height="26" rx="1.5" fill="url(#goldBands)" stroke="#FFE27A" strokeWidth="0.6" />

                {/* Sleek Polished Wooden Handle (Firebolt Style) */}
                <path 
                  d="M95 76 C 140 70, 190 60, 245 42 C 255 39, 265 38, 270 40 C 272 41, 272 44, 268 46 C 215 67, 160 78, 105 80 Z" 
                  fill="url(#broomHandle)" 
                  stroke="#261005"
                  strokeWidth="0.8"
                />

                {/* Handle Specular Light Reflection */}
                <path 
                  d="M110 75 C 150 68, 200 58, 255 42" 
                  stroke="#E8A870" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  opacity="0.75" 
                />

                {/* Golden Footholds / Stirrups */}
                <path d="M150 72 L142 88 L148 90" stroke="url(#goldBands)" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M165 70 L158 86 L164 88" stroke="url(#goldBands)" strokeWidth="2.5" strokeLinecap="round" />

                {/* Wizard Silhouette Cloak Flutter */}
                <path 
                  d="M150 42 C 160 25, 175 24, 185 32 C 190 36, 188 44, 180 50 C 165 60, 148 62, 135 60 C 120 58, 105 50, 95 44 C 115 45, 135 48, 150 42 Z" 
                  fill="#0D091A" 
                  opacity="0.95"
                />
                {/* Wizard Hat Silhouette */}
                <path 
                  d="M172 26 L186 28 L196 6 L180 18 Z" 
                  fill="#090614" 
                />
              </svg>
            </motion.div>
          </div>

          {/* Central Magical Hogwarts Emblem & Reveal */}
          <div className="relative z-20 flex flex-col items-center max-w-lg w-[90%] text-center">
            {/* Hogwarts Crest / Golden Wax Seal Icon */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="relative w-20 h-20 mb-5 flex items-center justify-center"
            >
              {/* Outer Golden Runic Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border-2 border-dashed border-[#D6B36A] opacity-70"
              />
              {/* Inner Crimson Wax Crest */}
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#801B2E] via-[#5C1120] to-[#360811] border-2 border-[#F3D58A] shadow-[0_0_24px_rgba(214,179,106,0.6)] flex items-center justify-center">
                <span className="font-display font-black text-xl text-[#F3D58A] tracking-tighter filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  TW
                </span>
              </div>
            </motion.div>

            {/* Title Reveal */}
            <motion.div
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="space-y-1.5 mb-6"
            >
              <span className="font-mono text-[11px] sm:text-xs text-[#F3D58A] font-bold tracking-[0.25em] uppercase block">
                ✦ HOGWARTS WIZARDING WORLD ✦
              </span>
              <h1 className="font-display font-black text-3xl sm:text-4xl text-[#F4EBDD] tracking-tight">
                TECH WIZARD <span className="text-[#D6B36A] underline decoration-[#762E42] decoration-wavy decoration-2">2027</span>
              </h1>
              <p className="font-mono text-xs sm:text-sm text-[#C2BDCA] font-medium tracking-wide">
                Where Technology Meets Hogwarts Magic
              </p>
            </motion.div>

            {/* Elegant Magical Progress Indicator */}
            <div className="w-full max-w-sm space-y-2">
              <div className="flex items-center justify-between font-mono text-[11px] text-[#D6B36A] font-bold tracking-wider">
                <span className="truncate pr-2">{stage}</span>
                <span className="text-[#F3D58A] font-black">{progress}%</span>
              </div>

              {/* Golden Wand Light Bar */}
              <div className="w-full h-2 rounded-full bg-[#1A1429] border border-[#D6B36A]/50 overflow-hidden shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)] p-0.5">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[#D6B36A] via-[#F3D58A] to-[#FFE27A] shadow-[0_0_12px_#F3D58A]"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'easeOut', duration: 0.2 }}
                />
              </div>

              <div className="flex justify-between items-center text-[10px] font-mono text-[#C2BDCA]/60 pt-1">
                <span>LJCCA CAMPUS · 18–24 JAN 2027</span>
                <span className="text-[#D6B36A]">LUMOS MAXIMA</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
