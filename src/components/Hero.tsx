import React, { useCallback, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';

const IMAGE = '/hero-fluid.webp?v=3';
const IDLE_AFTER = 2200; // ms without pointer movement before the spotlight drifts on its own
const PRISM_SHIFT = 7;   // px each colour channel splits on CTA hover

// Gradient stops that fall off along a smoothstep curve, so the light has no visible ring
const easedStops = (from: number, to: number, rgb: string, steps = 12) =>
  Array.from({ length: steps + 1 }, (_, i) => {
    const t = i / steps;
    const e = t * t * (3 - 2 * t);
    return `rgba(${rgb},${(from + (to - from) * e).toFixed(3)}) ${(t * 100).toFixed(1)}%`;
  }).join(', ');

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const spotRef = useRef<HTMLImageElement>(null);
  const filterRef = useRef<SVGFilterElement>(null);
  const prismTarget = useRef(0);

  const prismOn = useCallback(() => { prismTarget.current = PRISM_SHIFT; }, []);
  const prismOff = useCallback(() => { prismTarget.current = 0; }, []);

  // Spotlight + parallax + prism, all driven from one GSAP ticker writing CSS vars
  useEffect(() => {
    const el = containerRef.current;
    const spot = spotRef.current;
    if (!el || !spot) return;
    const offsets: SVGFEOffsetElement[] = filterRef.current ? Array.from(filterRef.current.querySelectorAll('feOffset')) : [];
    const [red, , blue] = offsets;

    const s = { x: el.clientWidth / 2, y: el.clientHeight * 0.45, tx: 0, ty: 0, r: 0, last: -Infinity, prism: 0 };
    s.tx = s.x; s.ty = s.y;

    const apply = (w: number, h: number) => {
      el.style.setProperty('--sx', `${s.x.toFixed(1)}px`);
      el.style.setProperty('--sy', `${s.y.toFixed(1)}px`);
      el.style.setProperty('--sr', `${s.r.toFixed(1)}px`);
      el.style.setProperty('--px', ((s.x / w) * 2 - 1).toFixed(3));
      el.style.setProperty('--py', ((s.y / h) * 2 - 1).toFixed(3));
    };

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      s.r = Math.max(280, Math.min(el.clientWidth, el.clientHeight) * 0.45);
      apply(el.clientWidth, el.clientHeight);
      return;
    }

    const local = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      s.tx = e.clientX - r.left;
      s.ty = e.clientY - r.top;
      s.last = performance.now();
    };
    const onMove = (e: PointerEvent) => { if (e.pointerType !== 'touch') local(e); };
    const onLeave = () => { s.last = -Infinity; };

    const t0 = performance.now();
    const tick = () => {
      const now = performance.now();
      const t = (now - t0) / 1000;
      const w = el.clientWidth, h = el.clientHeight;

      const idle = now - s.last > IDLE_AFTER;
      if (idle) {
        s.tx = w * (0.5 + 0.34 * Math.sin(t * 0.32));
        s.ty = h * (0.46 + 0.24 * Math.sin(t * 0.51 + 1));
      }
      const k = idle ? 0.02 : 0.065;
      const ox = s.x, oy = s.y;
      s.x += (s.tx - s.x) * k;
      s.y += (s.ty - s.y) * k;

      // Spotlight opens up as the cursor moves faster
      const speed = Math.hypot(s.x - ox, s.y - oy);
      const baseR = Math.max(300, Math.min(w, h) * 0.55);
      s.r += (baseR + Math.min(speed * 3, 110) - s.r) * 0.035;
      apply(w, h);

      // Prism: split R and B channels in opposite directions
      const prev = s.prism;
      s.prism += (prismTarget.current - s.prism) * 0.07;
      if (red && blue && Math.abs(s.prism - prev) > 0.005) {
        red.setAttribute('dx', (-s.prism).toFixed(2));
        red.setAttribute('dy', (-s.prism).toFixed(2));
        blue.setAttribute('dx', s.prism.toFixed(2));
        blue.setAttribute('dy', s.prism.toFixed(2));
      }
      spot.style.filter = s.prism > 0.05 ? 'url(#hero-prism)' : 'none';
    };

    let running = false;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !running) { gsap.ticker.add(tick); running = true; }
      else if (!entry.isIntersecting && running) { gsap.ticker.remove(tick); running = false; }
    });
    io.observe(el);
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerdown', local);
    el.addEventListener('pointerleave', onLeave);

    return () => {
      io.disconnect();
      gsap.ticker.remove(tick);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerdown', local);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo('.hero-art', { opacity: 0, scale: 1.04 }, { opacity: 1, scale: 1, duration: 2.2, ease: 'power2.out' }, 0)
        .fromTo('.hero-eyebrow', { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0.2)
        .fromTo('.hero-line-1', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, '-=0.3')
        .fromTo('.hero-line-2', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, '-=0.65')
        .fromTo('.hero-sub', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, '-=0.5')
        .fromTo('.hero-cta', { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.4');
    }, containerRef.current!);
    return () => ctx.revert();
  }, []);

  // Spotlight reveal: full contrast inside, the form stays faintly visible outside
  const spotlightMask = `radial-gradient(var(--sr) circle at var(--sx) var(--sy), ${easedStops(1, 0.16, '0,0,0')})`;
  // Specular sheen: overlay blend lifts lit surfaces, leaves the black void black
  const sheen = `radial-gradient(calc(var(--sr) * 0.75) circle at var(--sx) var(--sy), ${easedStops(0.5, 0, '255,214,180')})`;

  return (
    <section
      ref={containerRef}
      className="hero relative min-h-screen flex flex-col items-center overflow-hidden pb-32 sm:pb-40"
      style={{
        ['--sx' as string]: '50%',
        ['--sy' as string]: '45%',
        ['--sr' as string]: '0px',
        ['--px' as string]: '0',
        ['--py' as string]: '0',
        backgroundColor: '#000',
      }}
    >
      {/* Prism filter: splits RGB channels, offsets animated from the ticker */}
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <filter ref={filterRef} id="hero-prism" colorInterpolationFilters="sRGB">
          <feColorMatrix in="SourceGraphic" result="r" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" />
          <feOffset in="r" dx="0" dy="0" result="rs" />
          <feColorMatrix in="SourceGraphic" result="g" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" />
          <feOffset in="g" dx="0" dy="0" result="gs" />
          <feColorMatrix in="SourceGraphic" result="b" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" />
          <feOffset in="b" dx="0" dy="0" result="bs" />
          <feBlend in="rs" in2="gs" mode="screen" result="rg" />
          <feBlend in="rg" in2="bs" mode="screen" />
        </filter>
      </svg>

      <div className="hero-art absolute inset-0 pointer-events-none" style={{ opacity: 0 }}>
        <div className="absolute inset-0" style={{ maskImage: spotlightMask, WebkitMaskImage: spotlightMask }}>
          <img
            ref={spotRef}
            src={IMAGE}
            alt=""
            aria-hidden="true"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ transform: 'scale(1.05) translate3d(calc(var(--px) * -14px), calc(var(--py) * -10px), 0)' }}
          />
          <div className="absolute inset-0" style={{ background: sheen, mixBlendMode: 'overlay' }} />
        </div>
      </div>

      {/* Edge vignette + scrim behind the copy */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 40% 28% at 50% 44%, rgba(0,0,0,0.42) 0%, transparent 100%), radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.55) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 lg:px-10 pt-40 sm:pt-48 lg:pt-56 text-center">
        <div className="hero-eyebrow inline-flex items-center gap-3 mb-8" style={{ opacity: 0 }}>
          <span className="h-px w-8" style={{ background: 'linear-gradient(90deg, #FF8D00, #FF140A)' }} />
          <span style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font)' }} className="text-xs font-light tracking-[0.2em] uppercase">
            Engineering Tomorrow
          </span>
          <span className="h-px w-8" style={{ background: 'linear-gradient(90deg, #FF140A, #FF8D00)' }} />
        </div>

        <h1 style={{ fontFamily: 'var(--font)', textWrap: 'balance' }}>
          <div className="hero-line-1 text-5xl sm:text-6xl lg:text-[76px] xl:text-[88px] font-normal leading-[1.04] tracking-tight text-white" style={{ opacity: 0 }}>
            We build software
          </div>
          <div className="hero-line-2 text-5xl sm:text-6xl lg:text-[76px] xl:text-[88px] font-normal leading-[1.04] tracking-tight" style={{ opacity: 0 }}>
            <span style={{ background: 'linear-gradient(135deg, #FFB067 0%, #FF8D00 45%, #FF140A 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              that ships.
            </span>
          </div>
        </h1>

        <p
          className="hero-sub mt-8 text-lg sm:text-xl font-normal leading-relaxed max-w-2xl mx-auto"
          style={{ color: 'rgba(255,255,255,0.62)', fontFamily: 'var(--font)', opacity: 0 }}
        >
          Turbulin is a software engineering studio. We take products from whiteboard
          to production, building for healthcare, fintech, and digital commerce with
          precision and speed.
        </p>

        <div className="hero-cta mt-10 flex flex-wrap items-center justify-center gap-4" style={{ opacity: 0 }}>
          <a
            href="#projects"
            onPointerEnter={prismOn}
            onPointerLeave={prismOff}
            onFocus={prismOn}
            onBlur={prismOff}
            className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full text-white text-sm font-semibold tracking-wide transition-opacity hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #FF8D00, #FF140A)' }}
          >
            <span>See our work</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
          <a
            href="#services"
            onPointerEnter={prismOn}
            onPointerLeave={prismOff}
            onFocus={prismOn}
            onBlur={prismOff}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold tracking-wide text-white transition-colors hover:bg-white/15"
            style={{ border: '1px solid rgba(255,255,255,0.2)', backgroundColor: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(8px)', fontFamily: 'var(--font)' }}
          >
            What we do <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
