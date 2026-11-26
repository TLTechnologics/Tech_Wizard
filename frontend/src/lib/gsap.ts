import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.config({
  ignoreMobileResize: true,
});

export const SCROLL_MOTION = {
  // Floating reveal defaults (0.8s - 1.2s range, subtle translateY & scale)
  revealY: 48,
  revealYMobile: 26,
  revealScale: 0.96,
  revealDuration: 0.95,
  revealDurationMobile: 0.72,
  revealEase: 'power3.out',
  staggerCards: 0.1,
  staggerItems: 0.07,
  staggerWords: 0.055,
  startDesktop: 'top 86%',
  startBottom: 'top 95%',
} as const;

export const MM_CONDITIONS = {
  desktop: '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
  mobile: '(max-width: 767px) and (prefers-reduced-motion: no-preference)',
  motionOk: '(prefers-reduced-motion: no-preference)',
  reduced: '(prefers-reduced-motion: reduce)',
} as const;

let refreshTimer: number | null = null;

export function scheduleScrollTriggerRefresh(delayMs = 160): void {
  if (typeof window === 'undefined') return;
  if (refreshTimer !== null) {
    window.clearTimeout(refreshTimer);
  }
  refreshTimer = window.setTimeout(() => {
    refreshTimer = null;
    ScrollTrigger.refresh();
  }, delayMs);
}

export { gsap, ScrollTrigger };
