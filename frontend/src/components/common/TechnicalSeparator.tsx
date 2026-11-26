import React from 'react';

interface TechnicalSeparatorProps {
  label?: string;
  code?: string;
  fromBg?: string;
  toBg?: string;
  isDark?: boolean;
}

export const TechnicalSeparator: React.FC<TechnicalSeparatorProps> = ({
  label = 'SYS // TELEMETRY',
  code = 'TG.2027 // NOMINAL',
  fromBg,
  toBg,
  isDark = true,
}) => {
  return (
    <div
      className="relative w-full select-none overflow-hidden"
      style={{
        background: fromBg && toBg ? `linear-gradient(to bottom, ${fromBg} 50%, ${toBg} 50%)` : undefined,
      }}
      aria-hidden="true"
    >
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-3 sm:py-3.5 flex items-center justify-between">
        {/* Enchanted Golden Runic Divider Line */}
        <div
          className="absolute left-4 right-4 top-1/2 -translate-y-1/2 border-t-2 border-dashed border-[#D6B36A]/30"
        />

        {/* Left Telemetry Coordinates */}
        <div
          className="hidden sm:flex items-center gap-1.5 font-mono text-[9px] sm:text-[10px] font-bold px-2.5 py-0.5 rounded-sm border-1.5 z-10 text-[#C2BDCA] bg-[#181424] border-[#D6B36A]/40 shadow-[1.5px_1.5px_0px_rgba(0,0,0,0.8)]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#D6B36A] shadow-[0_0_6px_#D6B36A]" />
          <span>GPS // HOGWARTS QUAD · 23.0338°N 72.5463°E</span>
        </div>

        {/* Center Stamped Enchanted Seal Tag */}
        <div
          className="mx-auto sm:mx-0 flex items-center gap-1.5 px-3 py-1 rounded-sm border-2 z-10 bg-[#1A1626] border-[#D6B36A] text-[#F4EBDD] shadow-[0_0_12px_rgba(214,179,106,0.2),2px_2px_0px_rgba(0,0,0,0.8)]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#F3D58A] shadow-[0_0_6px_#F3D58A]" />
          <span className="font-mono text-[11px] sm:text-xs font-black tracking-wider uppercase text-[#F3D58A]">
            {label}
          </span>
        </div>

        {/* Right Telemetry Code */}
        <div
          className="hidden md:flex items-center gap-1.5 font-mono text-[9px] sm:text-[10px] font-bold px-2.5 py-0.5 rounded-sm border-1.5 z-10 text-[#C2BDCA] bg-[#181424] border-[#D6B36A]/40 shadow-[1.5px_1.5px_0px_rgba(0,0,0,0.8)]"
        >
          <span>{code}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#762E42] shadow-[0_0_6px_#762E42]" />
        </div>
      </div>
    </div>
  );
};
