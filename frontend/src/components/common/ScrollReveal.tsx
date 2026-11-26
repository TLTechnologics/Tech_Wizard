import React, { useEffect, useRef } from 'react';
import { gsap, MM_CONDITIONS, SCROLL_MOTION } from '../../lib/gsap';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
  scaleFrom?: number;
  start?: string;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  duration = SCROLL_MOTION.revealDuration,
  yOffset = SCROLL_MOTION.revealY,
  scaleFrom = SCROLL_MOTION.revealScale,
  start = SCROLL_MOTION.startDesktop,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const mm = gsap.matchMedia();

    mm.add(MM_CONDITIONS.desktop, () => {
      gsap.fromTo(
        el,
        {
          autoAlpha: 0,
          y: yOffset,
          scale: scaleFrom,
          willChange: 'transform, opacity',
        },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration,
          delay,
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
        el,
        {
          autoAlpha: 0,
          y: Math.min(yOffset, SCROLL_MOTION.revealYMobile),
          willChange: 'transform, opacity',
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: Math.min(duration, SCROLL_MOTION.revealDurationMobile),
          delay: Math.min(delay, 0.15),
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
  }, [delay, duration, yOffset, scaleFrom, start]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};
