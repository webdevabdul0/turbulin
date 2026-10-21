import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const BRAND_GRADIENT = 'linear-gradient(135deg, #FF8D00, #FF140A)';

export const gradientText: React.CSSProperties = {
  background: BRAND_GRADIENT,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

const COUNT_START_DELAY = 0.45;

/* ------------------------------------------------------------------ */
/* CountUp — counts from 0 to `value` the first time it scrolls in.   */
/* Renders the final value in markup, so it is never stuck at 0.      */
/* ------------------------------------------------------------------ */

type CountUpProps = {
  value: number;
  suffix?: string;
  prefix?: string;
  /** Minimum digits, e.g. 2 renders 1 as "01". */
  pad?: number;
  decimals?: number;
  duration?: number;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
};

export const CountUp: React.FC<CountUpProps> = ({
  value, suffix = '', prefix = '', pad = 0, decimals = 0, duration = 2, delay = 0, className, style,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const format = (n: number) => {
    const fixed = n.toFixed(decimals);
    const [int, frac] = fixed.split('.');
    return `${prefix}${int.padStart(pad, '0')}${frac ? `.${frac}` : ''}${suffix}`;
  };

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const state = { n: 0 };
    el.textContent = format(0);
    const ctx = gsap.context(() => {
      gsap.to(state, {
        n: value,
        duration,
        // Wait for surrounding reveals to finish so the count is actually seen
        delay: COUNT_START_DELAY + delay,
        // Gentle ease: front-loaded curves finish small numbers before anyone notices
        ease: 'power1.inOut',
        onUpdate: () => { el.textContent = format(state.n); },
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      });
    }, el);
    return () => { ctx.revert(); el.textContent = format(value); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, suffix, prefix, pad, decimals, duration, delay]);

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: 'tabular-nums', ...style }}>
      {format(value)}
    </span>
  );
};

/** Parses display strings like "7+", "12+", "4", "01", "24h" into CountUp props. */
export const CountUpText: React.FC<{ text: string; className?: string; style?: React.CSSProperties; delay?: number }> = ({
  text, className, style, delay,
}) => {
  const m = text.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/);
  if (!m) return <span className={className} style={style}>{text}</span>;
  const [, prefix, num, suffix] = m;
  const decimals = num.includes('.') ? num.split('.')[1].length : 0;
  const pad = num.startsWith('0') && num.length > 1 && !num.includes('.') ? num.length : 0;
  return (
    <CountUp value={parseFloat(num)} prefix={prefix} suffix={suffix} pad={pad} decimals={decimals}
      className={className} style={style} delay={delay} />
  );
};

/* ------------------------------------------------------------------ */
/* SplitWords — each word rises from behind a mask when scrolled in.  */
/* Use inside a heading; pass `gradient` for brand-gradient words.    */
/* ------------------------------------------------------------------ */

type SplitWordsProps = {
  children: string;
  gradient?: boolean;
  className?: string;
  delay?: number;
  stagger?: number;
};

export const SplitWords: React.FC<SplitWordsProps> = ({ children, gradient, className, delay = 0, stagger = 0.06 }) => {
  const ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll('.split-word-inner'),
        { yPercent: 110, rotate: 4 },
        {
          yPercent: 0, rotate: 0, duration: 0.95, ease: 'power4.out', stagger, delay,
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        },
      );
    }, el);
    return () => ctx.revert();
  }, [delay, stagger]);

  const words = children.split(' ');
  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => (
        <React.Fragment key={i}>
          <span className="split-word">
            {/* Gradient goes on each word: background-clip on a parent breaks once children transform */}
            <span className="split-word-inner" style={gradient ? gradientText : undefined}>{word}</span>
          </span>
          {i < words.length - 1 && ' '}
        </React.Fragment>
      ))}
    </span>
  );
};

/* ------------------------------------------------------------------ */
/* Eyebrow — small section label with a brand dot.                    */
/* ------------------------------------------------------------------ */

export const Eyebrow: React.FC<{ children: React.ReactNode; tone?: 'light' | 'dark'; className?: string }> = ({
  children, tone = 'light', className = '',
}) => (
  <span
    data-reveal
    className={`inline-flex items-center gap-2.5 text-xs font-light tracking-[0.2em] uppercase ${className}`}
    style={{ color: tone === 'light' ? 'var(--text-muted-on-light)' : 'var(--text-muted-on-dark)', fontFamily: 'var(--font)' }}
  >
    <span className="eyebrow-dot" aria-hidden="true" />
    {children}
  </span>
);

/* ------------------------------------------------------------------ */
/* useImageReveal — wipes a container open and settles its image.     */
/* ------------------------------------------------------------------ */

export function useImageReveal<T extends HTMLElement>(direction: 'up' | 'left' = 'up') {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const from = direction === 'up' ? 'inset(100% 0% 0% 0% round 24px)' : 'inset(0% 100% 0% 0% round 24px)';
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
      tl.fromTo(el, { clipPath: from }, { clipPath: 'inset(0% 0% 0% 0% round 24px)', duration: 1.3, ease: 'power4.inOut' });
      const img = el.querySelector('img');
      if (img) tl.fromTo(img, { scale: 1.25 }, { scale: 1, duration: 1.6, ease: 'power3.out' }, 0);
    }, el);
    return () => ctx.revert();
  }, [direction]);

  return ref;
}
