import { useEffect, RefObject } from 'react';
import { gsap, MM_CONDITIONS, SCROLL_MOTION } from '../lib/gsap';

interface ChoreographyOptions {
  /** Optional dependency key (e.g. item count) when async content updates */
  refreshKey?: string | number;
}

export function useSectionChoreography(
  sectionRef: RefObject<HTMLElement | null>,
  options: ChoreographyOptions = {}
): void {
  const { refreshKey } = options;

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const mm = gsap.matchMedia();

    const getRevealElements = () =>
      Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]')).filter(
        (el) => el.dataset.tgRevealed !== '1'
      );

    const getStaggerGroups = () =>
      Array.from(root.querySelectorAll<HTMLElement>('[data-stagger-group]'));

    const getParallaxElements = () =>
      Array.from(root.querySelectorAll<HTMLElement>('[data-parallax-y]'));

    mm.add(MM_CONDITIONS.desktop, () => {
      // 1. Individual floating element reveals (headings, paragraphs, banners, forms, buttons)
      getRevealElements().forEach((el) => {
        const delay = parseFloat(el.dataset.revealDelay || '0') || 0;
        const yOffset = parseFloat(el.dataset.revealY || '') || SCROLL_MOTION.revealY;
        const scaleFrom = parseFloat(el.dataset.revealScale || '') || SCROLL_MOTION.revealScale;
        const startPos =
          el.dataset.revealStart ||
          (el.hasAttribute('data-reveal-bottom')
            ? SCROLL_MOTION.startBottom
            : SCROLL_MOTION.startDesktop);

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
            duration: SCROLL_MOTION.revealDuration,
            delay,
            ease: SCROLL_MOTION.revealEase,
            clearProps: 'transform,willChange',
            onStart: () => {
              el.dataset.tgRevealed = '1';
            },
            scrollTrigger: {
              trigger: el,
              start: startPos,
              once: true,
            },
          }
        );
      });

      // 2. Staggered card / list / grid reveals
      getStaggerGroups().forEach((group) => {
        const items = Array.from(
          group.querySelectorAll<HTMLElement>('[data-stagger-item]')
        ).filter((item) => item.dataset.tgRevealed !== '1');

        if (!items.length) return;

        const staggerStep =
          parseFloat(group.dataset.staggerStep || '') || SCROLL_MOTION.staggerCards;
        const yOffset = parseFloat(group.dataset.staggerY || '') || SCROLL_MOTION.revealY;
        const scaleFrom =
          parseFloat(group.dataset.staggerScale || '') || SCROLL_MOTION.revealScale;
        const startPos = group.dataset.staggerStart || SCROLL_MOTION.startDesktop;

        gsap.fromTo(
          items,
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
            duration: SCROLL_MOTION.revealDuration,
            stagger: staggerStep,
            ease: SCROLL_MOTION.revealEase,
            clearProps: 'transform,willChange',
            onStart: () => {
              items.forEach((item) => {
                item.dataset.tgRevealed = '1';
              });
            },
            scrollTrigger: {
              trigger: group,
              start: startPos,
              once: true,
            },
          }
        );
      });

      // 3. Selective subtle desktop parallax layers
      getParallaxElements().forEach((el) => {
        const distance = parseFloat(el.dataset.parallaxY || '28') || 28;
        const scrubVal = parseFloat(el.dataset.parallaxScrub || '1.15') || 1.15;
        const triggerEl = el.closest('[data-parallax-frame]') || root;

        gsap.fromTo(
          el,
          { y: -distance, willChange: 'transform' },
          {
            y: distance,
            ease: 'none',
            scrollTrigger: {
              trigger: triggerEl,
              start: 'top bottom',
              end: 'bottom top',
              scrub: scrubVal,
            },
          }
        );
      });
    });

    mm.add(MM_CONDITIONS.mobile, () => {
      // Lightweight mobile reveals without heavy scale or parallax
      getRevealElements().forEach((el) => {
        gsap.fromTo(
          el,
          {
            autoAlpha: 0,
            y: SCROLL_MOTION.revealYMobile,
            willChange: 'transform, opacity',
          },
          {
            autoAlpha: 1,
            y: 0,
            duration: SCROLL_MOTION.revealDurationMobile,
            ease: SCROLL_MOTION.revealEase,
            clearProps: 'transform,willChange',
            onStart: () => {
              el.dataset.tgRevealed = '1';
            },
            scrollTrigger: {
              trigger: el,
              start: 'top 93%',
              once: true,
            },
          }
        );
      });

      getStaggerGroups().forEach((group) => {
        const items = Array.from(
          group.querySelectorAll<HTMLElement>('[data-stagger-item]')
        ).filter((item) => item.dataset.tgRevealed !== '1');

        if (!items.length) return;

        gsap.fromTo(
          items,
          {
            autoAlpha: 0,
            y: SCROLL_MOTION.revealYMobile,
            willChange: 'transform, opacity',
          },
          {
            autoAlpha: 1,
            y: 0,
            duration: SCROLL_MOTION.revealDurationMobile,
            stagger: 0.06,
            ease: SCROLL_MOTION.revealEase,
            clearProps: 'transform,willChange',
            onStart: () => {
              items.forEach((item) => {
                item.dataset.tgRevealed = '1';
              });
            },
            scrollTrigger: {
              trigger: group,
              start: 'top 93%',
              once: true,
            },
          }
        );
      });
    });

    return () => {
      mm.revert();
    };
  }, [sectionRef, refreshKey]);
}
