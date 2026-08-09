import React, { useRef } from 'react';
import { useGsapReveal, useGsapCounter } from '../hooks/useGsapReveal';

const StatItem: React.FC<{ end: number; suffix: string; label: string; desc: string }> = ({
  end, suffix, label, desc,
}) => {
  const counterRef = useGsapCounter(end, suffix);
  return (
    <div data-reveal className="space-y-2">
      <div className="h-px w-8" style={{ background: 'linear-gradient(90deg, #FF8D00, #FF140A)' }} />
      <div
        style={{ fontFamily: 'var(--font)', background: 'linear-gradient(135deg, #FF8D00, #FF140A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
        className="text-6xl lg:text-[88px] font-normal tracking-tight leading-none"
      >
        <span ref={counterRef}>0{suffix}</span>
      </div>
      <div style={{ fontFamily: 'var(--font)', color: 'var(--text-on-light)' }} className="text-lg font-normal">{label}</div>
      <div style={{ color: 'var(--text-muted-on-light)', fontFamily: 'var(--font)' }} className="text-base font-normal leading-relaxed">{desc}</div>
    </div>
  );
};

export const StatsSection: React.FC = () => {
  const textRef = useGsapReveal<HTMLDivElement>({ stagger: 0.12 });
  const statsRef = useGsapReveal<HTMLDivElement>({ stagger: 0.08, start: 'top 85%' });

  return (
    <section
      id="about"
      style={{ backgroundColor: 'var(--bg-light)', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)' }}
      className="relative py-24 overflow-hidden"
    >
      {/* Subtle brand glow — top right */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[300px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top right, rgba(255,141,0,0.06) 0%, transparent 65%)' }}
      />
      {/* Subtle brand glow — bottom left */}
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[250px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at bottom left, rgba(255,20,10,0.05) 0%, transparent 65%)' }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">

        {/* Top row — text left, image right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20">

          {/* Left — text */}
          <div ref={textRef} className="lg:col-span-5 space-y-6">
            <div data-reveal>
              <span style={{ color: 'var(--text-muted-on-light)', fontFamily: 'var(--font)' }} className="text-xs font-light tracking-[0.2em] uppercase">
                Who we are
              </span>
            </div>
            <h2 data-reveal style={{ fontFamily: 'var(--font)', color: 'var(--text-on-light)' }} className="text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight tracking-tight">
              A studio that measures success in products delivered.
            </h2>
            <p data-reveal style={{ color: 'var(--text-muted-on-light)', fontFamily: 'var(--font)' }} className="text-lg font-normal leading-relaxed">
              We're a focused team of engineers, designers, and product thinkers who build
              digital products for founders and businesses who care about quality.
              No bloat, no hand-holding — just clean code and shipped products.
            </p>
          </div>

          {/* Right — image */}
          <div className="lg:col-span-7">
            <div
              className="relative w-full overflow-hidden rounded-3xl"
              style={{
                aspectRatio: '16/10',
                backgroundColor: 'var(--bg-light-3)',
                border: '1px solid var(--border-light)',
              }}
            >
              {/* Image — absolute so it covers the placeholder below */}
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=80"
                alt="Turbulin — product preview"
                className="absolute inset-0 z-10 w-full h-full object-cover"
              />

            </div>
          </div>
        </div>

        {/* Bottom row — stats full width */}
        <div ref={statsRef} className="grid grid-cols-1 sm:grid-cols-3 gap-x-12 gap-y-10"
          style={{ borderTop: '1px solid var(--border-light)', paddingTop: '3rem' }}
        >
          <StatItem end={7} suffix="+" label="Products live" desc="Real applications used by real people every day." />
          <StatItem end={12} suffix="+" label="Team members" desc="Full-stack, mobile, cloud, and AI." />
          <StatItem end={4} suffix="" label="Countries reached" desc="Products deployed across UK, US, UAE, and Pakistan." />
        </div>

      </div>
    </section>
  );
};
