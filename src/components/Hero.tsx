import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo('.hero-eyebrow',
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 }
        )
        .fromTo('.hero-line-1',
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9 }, '-=0.3'
        )
        .fromTo('.hero-line-2',
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9 }, '-=0.65'
        )
        .fromTo('.hero-sub',
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 }, '-=0.5'
        )
        .fromTo('.hero-cta',
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 }, '-=0.4'
        )
        .fromTo('.hero-mark',
          { scale: 0.88, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.1, ease: 'power2.out' }, '-=1.1'
        );
    }, containerRef.current!);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      style={{ backgroundColor: 'var(--bg-dark)' }}
      className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden"
    >
      {/* Subtle grid */}
      <div className="absolute inset-0 grid-overlay pointer-events-none" />

      {/* Orange glow — top right */}
      <div
        className="absolute top-[-10%] right-[-8%] w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,141,0,0.13) 0%, rgba(255,141,0,0.04) 45%, transparent 70%)' }}
      />
      {/* Red glow — bottom left */}
      <div
        className="absolute bottom-[-15%] left-[-8%] w-[550px] h-[550px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,20,10,0.11) 0%, rgba(255,20,10,0.03) 50%, transparent 70%)' }}
      />
      {/* Center accent glow */}
      <div
        className="absolute top-[35%] left-[30%] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,80,0,0.06) 0%, transparent 65%)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          {/* Left — text */}
          <div className="lg:col-span-5 space-y-8">
            <div className="hero-eyebrow inline-flex items-center gap-3" style={{ opacity: 0 }}>
              <span className="h-px w-8" style={{ background: 'linear-gradient(90deg, #FF8D00, #FF140A)' }} />
              <span style={{ color: 'var(--text-muted-on-dark)', fontFamily: 'var(--font)' }} className="text-xs font-light tracking-[0.2em] uppercase">
                Engineering Tomorrow
              </span>
            </div>

            <h1 style={{ fontFamily: 'var(--font)' }} className="space-y-1">
              <div className="hero-line-1 text-5xl sm:text-6xl lg:text-[76px] xl:text-[90px] font-normal leading-[1.04] tracking-tight text-white" style={{ opacity: 0 }}>
                We build software
              </div>
              <div className="hero-line-2 text-5xl sm:text-6xl lg:text-[76px] xl:text-[90px] font-normal leading-[1.04] tracking-tight" style={{ opacity: 0 }}>
                <span style={{ background: 'linear-gradient(135deg, #FF8D00 0%, #FF140A 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  that ships.
                </span>
              </div>
            </h1>

            <p
              className="hero-sub text-lg sm:text-xl font-normal leading-relaxed max-w-lg"
              style={{ color: 'var(--text-muted-on-dark)', fontFamily: 'var(--font)', opacity: 0 }}
            >
              Turbulin is a software engineering studio. We take products from whiteboard
              to production — building for healthcare, fintech, and digital commerce with
              precision and speed.
            </p>

            <div className="hero-cta flex items-center gap-5" style={{ opacity: 0 }}>
              <a
                href="#projects"
                className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full text-white text-sm font-semibold tracking-wide transition-opacity hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, #FF8D00, #FF140A)' }}
              >
                <span>See our work</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <a
                href="#services"
                className="text-sm font-medium tracking-wide transition-colors hover:text-white"
                style={{ color: 'var(--text-muted-on-dark)', fontFamily: 'var(--font)' }}
              >
                What we do →
              </a>
            </div>
          </div>

          {/* Right — hero image */}
          <div className="lg:col-span-7 flex items-center justify-center lg:justify-end">
            <div className="hero-mark relative w-full" style={{ opacity: 0 }}>
              {/* Glow behind image */}
              <div
                className="absolute -inset-6 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse 80% 70% at 50% 50%, rgba(255,141,0,0.25) 0%, rgba(255,20,10,0.15) 45%, transparent 75%)',
                  filter: 'blur(32px)',
                  zIndex: 0,
                }}
              />
              <img
                src="/assets/hero.png"
                alt="Turbulin — engineering tomorrow"
                className="relative w-full h-auto object-cover rounded-3xl"
                style={{ zIndex: 1 }}
              />
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ color: 'var(--text-subtle-on-dark)' }}>
          <span style={{ fontFamily: 'var(--font)' }} className="text-[10px] tracking-[0.2em] uppercase font-light">Scroll</span>
          <div className="w-px h-8" style={{ background: 'linear-gradient(to bottom, var(--text-subtle-on-dark), transparent)' }} />
        </div>
      </div>
    </section>
  );
};
