import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GalleryItem } from '../../types';
import { X, ZoomIn, Sparkles } from 'lucide-react';
import { useSmoothScroll } from '../../context/SmoothScrollContext';

interface GallerySectionProps {
  items: GalleryItem[];
}

export const GallerySection: React.FC<GallerySectionProps> = ({ items }) => {
  const [filter, setFilter] = useState<string>('all');
  const [activeImage, setActiveImage] = useState<GalleryItem | null>(null);
  const { stopScroll, startScroll } = useSmoothScroll();

  useEffect(() => {
    if (activeImage) {
      stopScroll();
    } else {
      startScroll();
    }
  }, [activeImage, stopScroll, startScroll]);

  const filterTabs = [
    { id: 'all', label: 'All Portraits & Artifacts' },
    { id: 'hardware', label: 'Hardware Prototypes' },
    { id: 'software', label: 'Neural & Software' },
    { id: 'event', label: 'Hackathons' },
    { id: 'workshop', label: 'Workshops' },
  ];

  const filteredItems = items.filter((item) => {
    if (filter === 'all') return true;
    return item.category.toLowerCase() === filter.toLowerCase();
  });

  return (
    <section className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 bg-gradient-to-b from-[#220B17] via-[#321122] to-[#1E0914] overflow-hidden text-white" id="gallery">
      {/* Royal Burgundy Magical Shimmer & Ambient Starlight */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30 z-0"
        style={{
          background: 'radial-gradient(ellipse at 80% 20%, rgba(214, 179, 106, 0.25) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(180, 40, 70, 0.35) 0%, transparent 65%)',
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
        <div className="mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm border border-[#D6B36A] bg-[#2E0E1F] shadow-[0_0_15px_rgba(214,179,106,0.2)] mb-3">
            <span className="w-2 h-2 rounded-full bg-[#FFE27A] shadow-[0_0_8px_#F3D58A]" />
            <span className="font-mono text-[11px] sm:text-xs text-[#F3D58A] tracking-[0.2em] uppercase font-bold">
              ✦ HOGWARTS GRAND STAIRCASE // ENCHANTED PORTRAITS ✦
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-[#F4EBDD] tracking-tight leading-tight">
            Enchanted Moving <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D6B36A] via-[#F3D58A] to-[#D6B36A]">Portraits.</span>
          </h2>
          <p className="font-body text-xs sm:text-sm text-[#E2CCD4] mt-2">
            Visual chronicles of innovation, engineering triumphs, and student prototypes from the archives.
          </p>
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap items-center gap-2.5 mb-8" role="group" aria-label="Filter gallery">
          {filterTabs.map((tab) => {
            const isSelected = filter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id)}
                className={`px-4 py-2 rounded-sm font-cinzel text-xs font-bold tracking-wider transition-all cursor-pointer border-2 ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#D6B36A] to-[#F3D58A] text-[#100D18] border-[#FFE27A] shadow-[0_0_15px_rgba(214,179,106,0.4)] -translate-y-0.5'
                    : 'bg-[#280D1B] text-[#E2CCD4] border-[#D6B36A]/40 shadow-[0_4px_12px_rgba(0,0,0,0.5)] hover:bg-[#381326] hover:text-[#F4EBDD] hover:border-[#D6B36A]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Archive Directive Note */}
        <div className="p-4 sm:p-5 rounded-sm border-2 border-[#D6B36A]/50 bg-[#2D0F20] shadow-[0_8px_25px_rgba(0,0,0,0.6)] mb-10 flex items-center gap-3 font-body text-xs text-[#F4EBDD]">
          <Sparkles className="w-4 h-4 text-[#F3D58A] flex-shrink-0" />
          <div>
            <strong className="text-[#F3D58A] font-cinzel tracking-wider uppercase font-bold">PORTRAIT ARCHIVE DIRECTIVE:</strong> High-definition concept blueprints and hardware renders are displayed as visual previews until live festival photography is archived on 18–24 January 2027.
          </div>
        </div>

        {/* Grand Hogwarts Ornate Baroque Portrait Frames Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredItems.map((item, idx) => {
            return (
              <div
                key={item.id}
                onClick={() => setActiveImage(item)}
                className="group cursor-pointer rounded-sm overflow-hidden border-4 border-[#D6B36A] bg-[#260C1B] transition-all duration-300 shadow-[0_12px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(214,179,106,0.25)] hover:shadow-[0_0_35px_rgba(243,213,138,0.5)] hover:-translate-y-1.5 flex flex-col justify-between relative"
              >
                {/* Gilded Carved Corner Filigree Accent */}
                <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none z-10">
                  <svg viewBox="0 0 32 32" fill="none" className="w-full h-full text-[#FFE27A]">
                    <path d="M32 0H16C24.8 0 32 7.2 32 16V0Z" fill="#D6B36A" />
                  </svg>
                </div>

                <div className="relative h-48 sm:h-52 bg-[#12040C] overflow-hidden border-b-2 border-[#D6B36A]/40">
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108 group-hover:brightness-105"
                    loading="lazy"
                  />

                  {/* Corner Zoom Pill */}
                  <div className="absolute top-3 right-3 p-2 rounded-sm bg-[#1C0712] border border-[#D6B36A] text-[#F3D58A] opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_10px_rgba(214,179,106,0.4)] z-20">
                    <ZoomIn size={14} />
                  </div>

                  <div className="absolute bottom-3 left-3 font-mono text-[9px] px-2.5 py-1 rounded-sm border border-[#D6B36A] bg-[#1C0712]/90 backdrop-blur-sm text-[#F3D58A] uppercase font-black tracking-wider shadow-[0_0_8px_rgba(214,179,106,0.3)]">
                    {item.category}
                  </div>
                </div>

                <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 bg-gradient-to-b from-[#2B0E1E] to-[#1C0813]">
                  <div>
                    <h3 className="font-display font-black text-base sm:text-lg text-[#F4EBDD] group-hover:text-[#F3D58A] transition-colors leading-snug mb-1">
                      {item.title}
                    </h3>
                    <p className="font-body text-xs text-[#E2CCD4] leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal with Gilded Frame */}
      <AnimatePresence>
        {activeImage && (
          <div
            data-lenis-prevent
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#12040B]/90 backdrop-blur-md"
            onClick={() => setActiveImage(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-[#260C1B] border-4 border-[#D6B36A] shadow-[0_20px_60px_rgba(0,0,0,0.95),0_0_40px_rgba(214,179,106,0.4)] rounded-sm overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setActiveImage(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-sm border border-[#D6B36A] bg-[#1A0612] text-[#F4EBDD] hover:text-[#F3D58A] shadow-[0_0_10px_rgba(214,179,106,0.3)] transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X size={18} />
              </button>

              <div className="max-h-[65vh] bg-[#0E0308] overflow-hidden flex items-center justify-center border-b-2 border-[#D6B36A]/40">
                <img
                  src={activeImage.image_url}
                  alt={activeImage.title}
                  className="w-full h-full max-h-[65vh] object-contain"
                />
              </div>

              <div className="p-6 bg-gradient-to-b from-[#2B0E1E] to-[#1C0813]">
                <div className="flex items-center gap-2 mb-2 font-mono text-xs text-[#D6B36A] uppercase font-bold tracking-wider">
                  <span>✦ ENCHANTED ARCHIVE</span>
                  <span>·</span>
                  <span>{activeImage.category}</span>
                </div>
                <h3 className="font-display font-black text-2xl text-[#F4EBDD] mb-2">
                  {activeImage.title}
                </h3>
                <p className="font-body text-sm text-[#E2CCD4] leading-relaxed">
                  {activeImage.description}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
