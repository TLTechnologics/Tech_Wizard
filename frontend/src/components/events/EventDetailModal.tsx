import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MapPin, Clock, ShieldCheck, ArrowUpRight, AlertCircle } from 'lucide-react';
import { EventItem } from '../../types';

interface EventDetailModalProps {
  event: EventItem | null;
  onClose: () => void;
  onSelectRegister: (eventId: string) => void;
  onSelectShowcase: () => void;
}

export const EventDetailModal: React.FC<EventDetailModalProps> = ({
  event,
  onClose,
  onSelectRegister,
  onSelectShowcase,
}) => {
  if (!event) return null;

  const isInternal = event.eligibility_type === 'internal_only';
  const isShowcase = event.is_showcase;
  const isResults = event.eligibility_type === 'results_only';

  return (
    <AnimatePresence>
      <div data-lenis-prevent className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B0912]/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-2xl bg-[#1A1626] border-2 border-[#D6B36A] shadow-[0_16px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(214,179,106,0.2)] rounded-sm p-6 sm:p-8 my-8 text-[#F4EBDD]"
        >
          {/* Burgundy & Gold Wax Seal Ribbon at Modal Top */}
          <div
            className="absolute -top-3 left-12 px-4 py-1 bg-gradient-to-r from-[#762E42] to-[#4A1525] border-x border-b border-[#D6B36A] shadow-[0_2px_8px_rgba(0,0,0,0.6)] z-10 flex items-center gap-1.5"
            style={{ transform: 'rotate(-2deg)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#F3D58A]" />
            <span className="font-mono text-[9px] uppercase tracking-wider text-[#F3D58A] font-bold">
              OFFICIAL DISPATCH
            </span>
          </div>

          {/* Header Close */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-[#F4EBDD] hover:text-[#F3D58A] p-2 rounded-sm bg-[#221B32] border-1.5 border-[#D6B36A] shadow-[0_0_8px_rgba(214,179,106,0.2),2px_2px_0px_#100D18] transition-transform hover:-translate-y-0.5"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider bg-[#D6B36A] border border-[#F3D58A] text-[#100D18] rounded-sm shadow-[0_0_8px_rgba(214,179,106,0.3)]">
              {event.date_display}
            </span>
            <span
              className={`px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider rounded-sm border border-[#D6B36A] shadow-[1.5px_1.5px_0px_#100D18] ${
                isInternal
                  ? 'bg-[#1E192D] text-[#F3D58A]'
                  : isShowcase
                  ? 'bg-[#293B68] text-[#F4EBDD]'
                  : 'bg-[#762E42] text-[#F4EBDD]'
              }`}
            >
              {event.eligibility}
            </span>
            <span className="px-3 py-1 text-xs font-mono font-semibold uppercase tracking-wider bg-[#1E192D] border border-[#D6B36A]/40 rounded-sm text-[#C2BDCA]">
              STATUS: {event.registration_status}
            </span>
          </div>

          {/* Event Title */}
          <h3 className="font-display font-black text-2xl sm:text-3xl text-[#F4EBDD] tracking-tight">
            {event.name}
          </h3>
          {event.tagline && (
            <p className="font-mono text-xs uppercase tracking-widest text-[#D6B36A] font-bold mt-1 mb-4">
              {event.tagline}
            </p>
          )}

          {/* Logistics Box */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-5 p-4 bg-[#1E192D] border-1.5 border-[#D6B36A]/40 rounded-sm text-xs font-mono shadow-[2.5px_2.5px_0px_#100D18]">
            <div className="flex items-center gap-2 text-[#F4EBDD] font-bold">
              <Calendar className="w-4 h-4 text-[#D6B36A]" />
              <span>{event.date_display}</span>
            </div>
            <div className="flex items-center gap-2 text-[#F4EBDD] font-bold">
              <Clock className="w-4 h-4 text-[#F3D58A]" />
              <span>{event.timing || '09:30 AM - 04:30 PM'}</span>
            </div>
            <div className="flex items-center gap-2 text-[#F4EBDD] font-bold sm:col-span-2 border-t border-dashed border-[#D6B36A]/20 pt-2 mt-1">
              <MapPin className="w-4 h-4 text-[#D6B36A]" />
              <span>{event.venue || 'Campus Auditorium / Labs'}</span>
            </div>
          </div>

          {/* Overview Description */}
          <div className="mb-5">
            <h4 className="font-cinzel font-bold text-sm text-[#F3D58A] uppercase tracking-wider mb-2">
              Event Overview &amp; Scope
            </h4>
            <p className="font-body text-sm text-[#C2BDCA] leading-relaxed">
              {event.description}
            </p>
          </div>

          {/* Rules & Guidelines */}
          {event.rules && (
            <div className="mb-6 p-4 bg-[#14111E] border-1.5 border-[#D6B36A]/30 rounded-sm">
              <div className="flex items-center gap-2 font-cinzel text-xs font-bold text-[#F3D58A] mb-2 uppercase tracking-wide">
                <ShieldCheck className="w-4 h-4 text-[#D6B36A]" />
                Official Participation Rules
              </div>
              <div className="font-body text-xs text-[#C2BDCA] whitespace-pre-line leading-relaxed space-y-1">
                {event.rules}
              </div>
            </div>
          )}

          {/* Special Directive Alert */}
          {isInternal && (
            <div className="mb-6 p-3 bg-[#762E42]/20 border border-[#762E42] rounded-sm flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-[#F3D58A] mt-0.5 flex-shrink-0" />
              <p className="font-body text-xs text-[#F4EBDD] leading-relaxed">
                <strong className="font-cinzel tracking-wider">ELIGIBILITY NOTICE:</strong> This challenge is exclusively restricted to enrolled students of our college. External college registrations will not be accepted.
              </p>
            </div>
          )}

          {/* Modal Actions */}
          <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-[#D6B36A]/20">
            <button
              onClick={onClose}
              className="px-4 py-2 font-cinzel text-xs font-bold tracking-wider text-[#C2BDCA] hover:text-[#F4EBDD] transition-colors"
            >
              Close
            </button>

            {!isResults && (
              <button
                onClick={() => onSelectRegister(event.id)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm font-mono text-xs font-bold text-[#100D18] bg-[#D6B36A] border-2 border-[#F3D58A] shadow-[0_0_15px_rgba(214,179,106,0.35),2.5px_2.5px_0px_#100D18] hover:bg-[#F3D58A] hover:-translate-y-0.5 transition-all"
              >
                <span>Reserve Pass (Free)</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            )}

            {isShowcase && (
              <button
                onClick={() => onSelectShowcase()}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm font-mono text-xs font-bold text-[#F4EBDD] bg-[#762E42] border-2 border-[#D6B36A] shadow-[0_0_15px_rgba(118,46,66,0.35),2.5px_2.5px_0px_#100D18] hover:bg-[#8E3850] hover:-translate-y-0.5 transition-all"
              >
                <span>Submit Innovation</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
