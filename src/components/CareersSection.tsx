import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useGsapReveal } from '../hooks/useGsapReveal';

export const CareersSection: React.FC = () => {
  const contentRef = useGsapReveal<HTMLDivElement>({ stagger: 0.14, start: 'top 80%' });

  return (
    <section className="relative overflow-hidden" style={{ minHeight: '560px' }}>
      {/* Background image */}
      <img
        src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1920&q=80"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Dark overlay — heavier at bottom so it blends into the contact section */}
      <div className="absolute inset-0"
        style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.72) 60%, rgba(0,0,0,0.88) 100%)' }} />

      {/* Brand colour tint */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 60% 40%, rgba(255,141,0,0.12) 0%, transparent 65%)' }} />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-28 lg:py-36">
        <div ref={contentRef} className="max-w-3xl mx-auto space-y-7">

          <span data-reveal style={{ fontFamily: 'var(--font)', color: 'rgba(255,255,255,0.55)' }}
            className="text-xs font-light tracking-[0.22em] uppercase">
            How we work
          </span>

          <h2 data-reveal style={{ fontFamily: 'var(--font)', color: '#ffffff' }}
            className="text-4xl sm:text-5xl lg:text-[64px] font-normal leading-[1.06] tracking-tight">
            From idea to live product,<br />
            <span style={{
              background: 'linear-gradient(135deg, #FF8D00, #FF140A)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              in weeks, not months.
            </span>
          </h2>

          <p data-reveal style={{ fontFamily: 'var(--font)', color: 'rgba(255,255,255,0.6)' }}
            className="text-lg font-normal leading-relaxed max-w-xl mx-auto">
            No bloat, no unnecessary meetings. A tight team, clear goals, and code that ships.
            We move fast because we stay focused.
          </p>

          <div data-reveal className="pt-2">
            <Link
              to="/about"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-white text-sm font-semibold tracking-wide transition-opacity hover:opacity-90"
              style={{
                border: '1px solid rgba(255,255,255,0.25)',
                backgroundColor: 'rgba(255,255,255,0.08)',
                backdropFilter: 'blur(8px)',
                fontFamily: 'var(--font)',
              }}
            >
              See how we work <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};
