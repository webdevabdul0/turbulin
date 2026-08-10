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
      style={{ backgroundColor: '#0a0a0a' }}
      className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden"
    >
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        disablePictureInPicture
        controlsList="nodownload nofullscreen noremoteplayback"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{ zIndex: 0 }}
      >
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Brand colour tint — blends orange/red hue onto the video */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1, background: 'linear-gradient(135deg, #FF8D00, #FF140A)', mixBlendMode: 'color', opacity: 0.45 }} />

      {/* Overlays */}
      <div className="absolute inset-0" style={{ zIndex: 1, background: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.7) 100%)' }} />
      <div className="absolute inset-0 grid-overlay pointer-events-none" style={{ zIndex: 2 }} />

      {/* Brand glows */}
      <div className="absolute top-[-10%] right-[-8%] w-[700px] h-[700px] rounded-full pointer-events-none" style={{ zIndex: 2, background: 'radial-gradient(circle, rgba(255,141,0,0.1) 0%, rgba(255,141,0,0.03) 45%, transparent 70%)' }} />
      <div className="absolute bottom-[-15%] left-[-8%] w-[550px] h-[550px] rounded-full pointer-events-none" style={{ zIndex: 2, background: 'radial-gradient(circle, rgba(255,20,10,0.09) 0%, rgba(255,20,10,0.02) 50%, transparent 70%)' }} />

      <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-10" style={{ zIndex: 3 }}>
        <div className="max-w-3xl space-y-8">

          <div className="hero-eyebrow inline-flex items-center gap-3" style={{ opacity: 0 }}>
            <span className="h-px w-8" style={{ background: 'linear-gradient(90deg, #FF8D00, #FF140A)' }} />
            <span style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font)' }} className="text-xs font-light tracking-[0.2em] uppercase">
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
            className="hero-sub text-lg sm:text-xl font-normal leading-relaxed max-w-xl"
            style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font)', opacity: 0 }}
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
              style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font)' }}
            >
              What we do →
            </a>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ color: 'rgba(255,255,255,0.3)' }}>
          <span style={{ fontFamily: 'var(--font)' }} className="text-[10px] tracking-[0.2em] uppercase font-light">Scroll</span>
          <div className="w-px h-8" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)' }} />
        </div>
      </div>
    </section>
  );
};
