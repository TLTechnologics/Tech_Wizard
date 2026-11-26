import React, { createContext, useContext, useEffect, useRef, useCallback } from 'react';
import Lenis, { ScrollToOptions } from 'lenis';

interface SmoothScrollContextValue {
  getLenis: () => Lenis | null;
  scrollTo: (target: number | string | HTMLElement, options?: ScrollToOptions) => void;
  stopScroll: () => void;
  startScroll: () => void;
  refreshScroll: () => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextValue | null>(null);

const ANCHOR_EASING = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

export const SmoothScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.095,
      smoothWheel: true,
      wheelMultiplier: 0.95,
      syncTouch: false,
      touchMultiplier: 1,
      autoRaf: true,
      overscroll: true,
      respectReducedMotion: true,
    });

    lenisRef.current = lenis;

    // Intercept internal #anchor clicks for buttery Lenis transitions without native jump
    const handleAnchorClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target as HTMLElement | null;
      const anchor = target?.closest('a[href]') as HTMLAnchorElement | null;
      if (!anchor || anchor.target === '_blank' || anchor.hasAttribute('download')) {
        return;
      }

      let url: URL;
      try {
        url = new URL(anchor.href, window.location.href);
      } catch {
        return;
      }

      if (
        url.origin !== window.location.origin ||
        url.pathname !== window.location.pathname ||
        !url.hash
      ) {
        return;
      }

      const rawHash = decodeURIComponent(url.hash);
      if (rawHash === '#' || rawHash === '#top') {
        event.preventDefault();
        lenis.scrollTo(0, {
          duration: 1.05,
          easing: ANCHOR_EASING,
        });
        return;
      }

      const targetElement = document.getElementById(rawHash.slice(1));
      if (targetElement) {
        event.preventDefault();
        lenis.scrollTo(targetElement, {
          // html already defines scroll-padding-top: 68px; -16px clears the sticky floating navbar cleanly
          offset: -16,
          duration: 1.05,
          easing: ANCHOR_EASING,
        });
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const getLenis = useCallback(() => lenisRef.current, []);

  const scrollTo = useCallback(
    (target: number | string | HTMLElement, options: ScrollToOptions = {}) => {
      const lenis = lenisRef.current;
      const defaultOffset = typeof target === 'number' ? 0 : -16;

      if (lenis) {
        lenis.scrollTo(target, {
          offset: defaultOffset,
          duration: 1.05,
          easing: ANCHOR_EASING,
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
