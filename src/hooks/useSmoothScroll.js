import { useEffect } from 'react';
import Lenis from 'lenis';

let lenis = null;

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const scrollToTop = () => {
  if (lenis) lenis.scrollTo(0, { immediate: true });
  else window.scrollTo(0, 0);
};

export const scrollToElement = (el) => {
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { offset: -96 });
  else el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
};

/** Pause/resume smooth scrolling, e.g. while a modal is open so the page behind stays put. */
export const stopScroll = () => lenis?.stop();
export const startScroll = () => lenis?.start();

/** Inertia scrolling on desktop; native scrolling for touch and reduced-motion users. */
const useSmoothScroll = () => {
  useEffect(() => {
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    if (prefersReducedMotion() || coarse) return undefined;

    lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    let frame;
    const raf = (time) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenis = null;
    };
  }, []);
};

export default useSmoothScroll;
