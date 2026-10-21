import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface RevealOptions {
  stagger?: number;
  /** Blur (px) elements start from; 0 disables. */
  blur?: number;
  y?: number;
  duration?: number;
  start?: string;
  delay?: number;
}

export function useGsapReveal<T extends HTMLElement>(options: RevealOptions = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const targets = el.querySelectorAll('[data-reveal]');

      if (targets.length > 0) {
        gsap.fromTo(
          targets,
          { y: options.y ?? 36, opacity: 0, filter: `blur(${options.blur ?? 6}px)` },
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            clearProps: 'filter',
            duration: options.duration ?? 0.9,
            stagger: options.stagger ?? 0.1,
            ease: 'power3.out',
            delay: options.delay ?? 0,
            scrollTrigger: {
              trigger: el,
              start: options.start ?? 'top 82%',
              once: true,
            },
          }
        );
      } else {
        gsap.fromTo(
          el,
          { y: options.y ?? 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: options.duration ?? 0.75,
            ease: 'power3.out',
            delay: options.delay ?? 0,
            scrollTrigger: {
              trigger: el,
              start: options.start ?? 'top 82%',
              once: true,
            },
          }
        );
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return ref;
}

export function useGsapCounter(end: number, suffix = '') {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: end,
        duration: 1.8,
        ease: 'power2.out',
        onUpdate: () => {
          el.textContent = Math.round(obj.val) + suffix;
        },
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [end, suffix]);

  return ref;
}
