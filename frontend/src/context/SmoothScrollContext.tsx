import React, { createContext, useContext, useEffect, useRef, useCallback } from 'react';
import Lenis, { ScrollToOptions } from 'lenis';
import { gsap, ScrollTrigger, scheduleScrollTriggerRefresh } from '../lib/gsap';

interface SmoothScrollContextValue {
  getLenis: () => Lenis | null;
  scrollTo: (target: number | string | HTMLElement, options?: ScrollToOptions) => void;
  stopScroll: () => void;
  startScroll: () => void;
  refreshScroll: () => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextValue | null>(null);

const LENIS_EASING = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

export const SmoothScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const lenis = new Lenis({
      duration: prefersReducedMotion ? 0 : 1.18,
      easing: LENIS_EASING,
      smoothWheel: !prefersReducedMotion,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.35,
      syncTouch: false,
      autoRaf: false,
      anchors: {
        offset: -84,
        duration: 1.15,
      },
      respectReducedMotion: true,
    });

    lenisRef.current = lenis;

    // Synchronize Lenis scroll events with GSAP ScrollTrigger
    const handleLenisScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on('scroll', handleLenisScroll);

    // Single unified RAF loop driven by GSAP ticker
    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Keep Lenis & ScrollTrigger synced when page content height changes (accordions, filters, API data)
    let lastHeight = document.documentElement.scrollHeight;
    let resizeTimeout: number | null = null;
    const resizeObserver = new ResizeObserver(() => {
      const nextHeight = document.documentElement.scrollHeight;
      if (Math.abs(nextHeight - lastHeight) > 4) {
        lastHeight = nextHeight;
        if (resizeTimeout !== null) window.clearTimeout(resizeTimeout);
        resizeTimeout = window.setTimeout(() => {
          lenis.resize();
          ScrollTrigger.refresh();
        }, 180);
      }
    });
    resizeObserver.observe(document.body);

    const handleLoaderComplete = () => {
      lenis.resize();
      scheduleScrollTriggerRefresh(80);
    };
    window.addEventListener('tg:loader-complete', handleLoaderComplete);

    return () => {
      window.removeEventListener('tg:loader-complete', handleLoaderComplete);
      resizeObserver.disconnect();
      if (resizeTimeout !== null) window.clearTimeout(resizeTimeout);
      lenis.off('scroll', handleLenisScroll);
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const getLenis = useCallback(() => lenisRef.current, []);

  const scrollTo = useCallback(
    (target: number | string | HTMLElement, options: ScrollToOptions = {}) => {
      const lenis = lenisRef.current;
      const defaultOffset = typeof target === 'number' ? 0 : -84;

      if (lenis) {
        lenis.scrollTo(target, {
          offset: defaultOffset,
          duration: 1.15,
          easing: LENIS_EASING,
          ...options,
        });
        return;
      }

      if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: 'smooth' });
      } else {
        const el =
          typeof target === 'string'
            ? document.querySelector<HTMLElement>(target)
            : target;
        el?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    []
  );

  const stopScroll = useCallback(() => {
    lenisRef.current?.stop();
  }, []);

  const startScroll = useCallback(() => {
    lenisRef.current?.start();
  }, []);

  const refreshScroll = useCallback(() => {
    lenisRef.current?.resize();
    scheduleScrollTriggerRefresh(100);
  }, []);

  return (
    <SmoothScrollContext.Provider
      value={{ getLenis, scrollTo, stopScroll, startScroll, refreshScroll }}
    >
      {children}
    </SmoothScrollContext.Provider>
  );
};

export const useSmoothScroll = (): SmoothScrollContextValue => {
  const ctx = useContext(SmoothScrollContext);
  if (!ctx) {
    throw new Error('useSmoothScroll must be used within a SmoothScrollProvider');
  }
  return ctx;
};
