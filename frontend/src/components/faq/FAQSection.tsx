import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { FAQItem } from '../../types';

interface FAQSectionProps {
  faqs: FAQItem[];
}

const DEFAULT_FAQS = [
  {
    id: 'f1',
    question: 'Who can attend Tech Wizard?',
    answer:
      'Tech Wizard 2027 welcomes students, educators, tech enthusiasts, and parents. While certain internal workshops and hackathons are exclusive to our college students, the Tech Showcase and exhibition floor are open to all colleges and the public.',
  },
  {
    id: 'f2',
    question: 'Can external college students participate?',
    answer:
      'Yes! External college students can participate exclusively in the Tech Showcase by submitting and exhibiting their hardware or software projects. External students are not eligible for internal workshops or hackathons.',
  },
  {
    id: 'f3',
    question: 'Who can participate in hackathons?',
    answer:
      'Both the Bhavesh Hackathon (20 January) and Thakkar Hackathon (23 January) are strictly exclusive to students of our college. External students are not eligible for either hackathon.',
  },
  {
    id: 'f4',
    question: 'Can students submit hardware projects?',
    answer:
      'Yes! The Hardware Showcase welcomes robotics, IoT, ESP32 and Arduino creations, smart home automation, embedded systems, electronic prototypes, and innovative hardware products.',
  },
  {
    id: 'f5',
    question: 'Can students submit software projects?',
    answer:
      'Yes! The Software Showcase welcomes artificial intelligence, machine learning, web applications, Android apps, AI assistants, SaaS products, desktop tools, and automation software.',
  },
  {
    id: 'f6',
    question: 'How do I register?',
    answer:
      'Use the registration section on this site to select your pass, enter your details, and reserve your place. A unique Registration ID will be issued immediately upon confirmation.',
  },
  {
    id: 'f7',
    question: 'Is there a registration fee?',
    answer:
      'Festival access and student pass tiers are configured directly by the college organising committee. Visitor passes to open exhibition tracks are completely free.',
  },
  {
    id: 'f8',
    question: 'Will participation certificates be provided?',
    answer:
      'Yes. Official certificates of participation and exhibition recognition will be awarded to all verified attendees, workshop attendees, hackathon teams, and showcase exhibitors.',
  },
  {
    id: 'f9',
    question: 'What should I bring to a workshop?',
    answer:
      'A charged laptop and your valid student identity card. Development boards, kits, and components are provided in the designated labs.',
  },
];

export const FAQSection: React.FC<FAQSectionProps> = ({ faqs }) => {
  const displayFaqs = faqs && faqs.length > 0 ? faqs : DEFAULT_FAQS;
  const [openId, setOpenId] = useState<string | null>(displayFaqs[0]?.id || 'f1');

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="relative py-14 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 bg-gradient-to-b from-[#091712] via-[#10261E] to-[#07130F] overflow-hidden text-[#F4EBDD]" id="faq">
      {/* Restricted Library Emerald Glow & Ancient Shadows */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30 z-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 15%, rgba(46, 196, 182, 0.25) 0%, transparent 65%), radial-gradient(ellipse at 80% 85%, rgba(186, 165, 116, 0.18) 0%, transparent 65%)',
        }}
        aria-hidden="true"
      />

      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035] z-0"
        style={{
          backgroundImage:
            'linear-gradient(#BFA574 1px, transparent 1px), linear-gradient(90deg, #BFA574 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="mb-8 sm:mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm border-1.5 border-[#74C69D]/60 bg-[#0C2419] shadow-[0_0_15px_rgba(116,198,157,0.2),2px_2px_0px_#040B07] mb-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#74C69D] shadow-[0_0_6px_#74C69D]" />
            <span className="font-mono text-[11px] sm:text-xs text-[#A7F3D0] tracking-widest uppercase font-bold">
              ✦ RESTRICTED LIBRARY // WIZARDING FAQ ARCHIVE ✦
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-[#F4EBDD] tracking-tight leading-tight">
            Frequently Asked <span className="text-[#A7F3D0] underline decoration-[#2D6A53] decoration-wavy decoration-2">Questions.</span>
          </h2>
          <p className="font-body text-xs sm:text-sm text-[#B8D8C9] mt-2 max-w-2xl">
            Whispered answers from the ancient tomes. Everything you need to know about attendance eligibility, hardware and software exhibits, rules, and entry passes.
          </p>
        </div>

        {/* Grimoire Accordions */}
        <div className="space-y-3">
          {displayFaqs.map((faq, idx) => {
            const currentId = faq.id || `faq-${idx}`;
            const isOpen = openId === currentId;

            return (
              <div
                key={currentId}
                className={`rounded-sm border-2 transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-[#0E281D] border-[#74C69D] shadow-[0_0_20px_rgba(116,198,157,0.25),3.5px_3.5px_0px_#040B07]'
                    : 'bg-[#0A1E15] border-[#2D6A53]/60 hover:bg-[#0D241A] hover:border-[#74C69D]/70 shadow-[2.5px_2.5px_0px_#040B07]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(currentId)}
                  className="w-full p-4 sm:p-4.5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[11px] sm:text-xs font-black px-2 py-0.5 rounded-sm border border-[#A7F3D0] bg-[#1E523A] text-[#F4EBDD] shadow-[1px_1px_0px_#040B07]">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <h3 className="font-cinzel font-bold text-sm sm:text-base text-[#F4EBDD] tracking-wide">
                      {faq.question}
                    </h3>
                  </div>

                  <div className="p-1.5 rounded-sm bg-[#06140D] border border-[#2D6A53] text-[#A7F3D0] shadow-[1px_1px_0px_#040B07] flex-shrink-0">
                    {isOpen ? <Minus size={14} className="text-[#A7F3D0]" /> : <Plus size={14} className="text-[#74C69D]" />}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="px-4 pb-4 pt-2 font-body text-xs sm:text-sm text-[#C9DFD5] font-normal leading-relaxed border-t-2 border-dashed border-[#2D6A53]/40 bg-[#07160F]"
                    >
                      {faq.answer}
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
