import React from 'react';
import { useGsapReveal } from '../hooks/useGsapReveal';
import { CountUp, Eyebrow, SplitWords, gradientText } from './ui/motion';

const stats = [
  { value: 7, suffix: '+', label: 'Products live', desc: 'Real applications used by real people every day.' },
  { value: 12, suffix: '+', label: 'Team members', desc: 'Full-stack, mobile, cloud, and AI specialists.' },
  { value: 4, suffix: '', label: 'Countries reached', desc: 'Deployed across the UK, US, UAE, and Pakistan.' },
  { value: 3, suffix: '+', label: 'Years building', desc: 'Consistent delivery since day one.' },
];

export const StatsSection: React.FC = () => {
  const textRef = useGsapReveal<HTMLDivElement>({ stagger: 0.12 });
  const statsRef = useGsapReveal<HTMLDivElement>({ stagger: 0.1, start: 'top 88%' });


  return (
    <section
      id="about"
      style={{ backgroundColor: 'var(--bg-light)', borderTop: '1px solid var(--border-light)' }}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      <div
        className="absolute top-0 right-0 w-[600px] h-[360px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top right, rgba(255,141,0,0.07) 0%, transparent 65%)' }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        {/* Statement */}
        <div ref={textRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end mb-14 lg:mb-20">
          <div className="lg:col-span-7 space-y-6">
            <Eyebrow>Who we are</Eyebrow>
            <h2
              style={{ fontFamily: 'var(--font)', color: 'var(--text-on-light)', textWrap: 'balance' }}
              className="text-4xl sm:text-5xl lg:text-[64px] font-normal leading-[1.04] tracking-tight"
            >
              <SplitWords>A studio that measures success in</SplitWords>{' '}
              <SplitWords gradient delay={0.25}>products delivered.</SplitWords>
            </h2>
          </div>
          <p
            data-reveal
            style={{ color: 'var(--text-muted-on-light)', fontFamily: 'var(--font)' }}
            className="lg:col-span-5 text-lg font-normal leading-relaxed"
          >
            We're a focused team of engineers, designers, and product thinkers who build
            digital products for founders and businesses who care about quality.
            No bloat, no hand-holding, just clean code and shipped products.
          </p>
        </div>

        {/* Glossy ribbons (Blender render, transparent) — full-bleed on the white page */}
        <div
          className="relative overflow-hidden -my-4 lg:-my-8"
          style={{ width: '100vw', marginLeft: 'calc(50% - 50vw)' }}
        >
          <img
            src="/assets/ribbons.png?v=4"
            alt=""
            aria-hidden="true"
            width={3200}
            height={740}
            loading="lazy"
            decoding="async"
            className="block w-full h-auto select-none pointer-events-none"
          />
        </div>

        {/* Stats */}
        <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 mt-16 lg:mt-20">
          {stats.map((s, i) => (
            <div key={s.label} data-reveal className="stat-item relative pt-6">
              <span className="stat-rule" aria-hidden="true" />
              <CountUp
                value={s.value}
                suffix={s.suffix}
                delay={0.35 + i * 0.12}
                className="block text-6xl lg:text-[88px] font-normal tracking-tight leading-none"
                style={{ ...gradientText, fontFamily: 'var(--font)' }}
              />
              <div style={{ fontFamily: 'var(--font)', color: 'var(--text-on-light)' }} className="mt-4 text-lg font-normal">
                {s.label}
              </div>
              <div style={{ color: 'var(--text-muted-on-light)', fontFamily: 'var(--font)' }} className="mt-1 text-sm sm:text-base font-normal leading-relaxed max-w-[16rem]">
                {s.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
