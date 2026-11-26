import React, { useEffect, useRef } from 'react';
import { gsap, MM_CONDITIONS, SCROLL_MOTION } from '../../lib/gsap';

export interface TextSegment {
  text: string;
  className?: string;
}

interface ScrollTextRevealProps {
  segments: TextSegment[];
  as?: 'h1' | 'h2' | 'h3' | 'h4';
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  start?: string;
}

export const ScrollTextReveal: React.FC<ScrollTextRevealProps> = ({
  segments,
  as: Tag = 'h2',
  className = '',
  delay = 0.05,
  stagger = SCROLL_MOTION.staggerWords,
  duration = 0.88,
  start = SCROLL_MOTION.startDesktop,
}) => {
  const headingRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;

    const words = el.querySelectorAll<HTMLElement>('[data-reveal-word]');
    if (!words.length) return;

    const mm = gsap.matchMedia();

    mm.add(MM_CONDITIONS.desktop, () => {
      gsap.fromTo(
        words,
        {
          autoAlpha: 0,
          y: 34,
          willChange: 'transform, opacity',
        },
        {
          autoAlpha: 1,
          y: 0,
          duration,
          delay,
          stagger,
          ease: SCROLL_MOTION.revealEase,
          clearProps: 'transform,willChange',
          scrollTrigger: {
            trigger: el,
            start,
            once: true,
          },
        }
      );
    });

    mm.add(MM_CONDITIONS.mobile, () => {
      gsap.fromTo(
        words,
        {
          autoAlpha: 0,
          y: 20,
          willChange: 'transform, opacity',
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.65,
          delay: 0,
          stagger: 0.035,
          ease: SCROLL_MOTION.revealEase,
          clearProps: 'transform,willChange',
          scrollTrigger: {
            trigger: el,
            start: 'top 92%',
            once: true,
          },
        }
      );
    });

    return () => mm.revert();
  }, [delay, stagger, duration, start]);

  const plainText = segments.map((s) => s.text).join(' ');

  return (
    <Tag ref={headingRef} className={className} aria-label={plainText}>
      <span className="sr-only">{plainText}</span>
      <span aria-hidden="true">
        {segments.map((segment, segIdx) => {
          const words = segment.text.trim().split(/\s+/);
          return (
            <React.Fragment key={segIdx}>
              {words.map((word, wordIdx) => {
                const isLastInAll =
                  segIdx === segments.length - 1 && wordIdx === words.length - 1;
                return (
                  <React.Fragment key={`${segIdx}-${wordIdx}`}>
                    <span
                      data-reveal-word
                      className={`inline-block ${segment.className || ''}`}
                    >
                      {word}
                    </span>
                    {!isLastInAll && ' '}
                  </React.Fragment>
                );
              })}
            </React.Fragment>
          );
        })}
      </span>
    </Tag>
  );
};
