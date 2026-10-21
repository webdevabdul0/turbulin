import React, { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { useGsapReveal } from '../hooks/useGsapReveal';
import { CountUp, Eyebrow, SplitWords } from './ui/motion';

const steps = [
  { title: 'Discover', body: 'We map the problem, the users and the constraints before writing a line of code.' },
  { title: 'Design', body: 'Flows and interfaces shaped with real users, not just stakeholders.' },
  { title: 'Build', body: 'Working releases you can click through, from the very first sprint.' },
  { title: 'Launch & scale', body: 'We ship, monitor and keep improving long after go-live.' },
];

export const CareersSection: React.FC = () => {
  const contentRef = useGsapReveal<HTMLDivElement>({ stagger: 0.14, start: 'top 80%' });
  const stepsRef = useGsapReveal<HTMLDivElement>({ stagger: 0.12, start: 'top 85%' });
  const lineRef = useRef<HTMLDivElement>(null);

  // Progress line draws across the steps as the section scrolls through
  useLayoutEffect(() => {
    const line = lineRef.current;
    if (!line || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(line, { scaleX: 0 }, {
        scaleX: 1, ease: 'none',
        scrollTrigger: { trigger: line, start: 'top 90%', end: 'top 45%', scrub: 0.6 },
      });
    }, line);
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1920&q=80"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      <div className="absolute inset-0"
        style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.78) 45%, rgba(0,0,0,0.94) 100%)' }} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 60% 30%, rgba(255,141,0,0.14) 0%, transparent 60%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-28 lg:pt-36 pb-20 lg:pb-28">
        <div ref={contentRef} className="max-w-3xl mx-auto text-center space-y-7">
          <Eyebrow tone="dark" className="justify-center">How we work</Eyebrow>

          <h2 style={{ fontFamily: 'var(--font)', color: '#ffffff' }}
            className="text-4xl sm:text-5xl lg:text-[64px] font-normal leading-[1.06] tracking-tight">
            <SplitWords>From idea to live product,</SplitWords>{' '}
            <SplitWords gradient delay={0.3}>in weeks, not months.</SplitWords>
          </h2>

          <p data-reveal style={{ fontFamily: 'var(--font)', color: 'rgba(255,255,255,0.62)' }}
            className="text-lg font-normal leading-relaxed max-w-xl mx-auto">
            No bloat, no unnecessary meetings. A tight team, clear goals, and code that ships.
            We move fast because we stay focused.
          </p>

          <div data-reveal className="pt-2">
            <Link
              to="/about"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-white text-sm font-semibold tracking-wide transition-colors hover:bg-white/15"
              style={{ border: '1px solid rgba(255,255,255,0.25)', backgroundColor: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)', fontFamily: 'var(--font)' }}
            >
              See how we work <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Process */}
        <div className="relative mt-20 lg:mt-28">
          <div className="absolute left-0 right-0 top-[7px] h-px hidden lg:block" style={{ backgroundColor: 'rgba(255,255,255,0.12)' }} />
          <div
            ref={lineRef}
            className="absolute left-0 right-0 top-[7px] h-px origin-left hidden lg:block"
            style={{ background: 'linear-gradient(90deg, #FF8D00, #FF140A)', boxShadow: '0 0 12px rgba(255,120,0,0.6)' }}
          />

          <ol ref={stepsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {steps.map((step, i) => (
              <li key={step.title} data-reveal className="relative" style={{ fontFamily: 'var(--font)' }}>
                <span className="process-node" aria-hidden="true" />
                <CountUp
                  value={i + 1}
                  pad={2}
                  delay={0.2 + i * 0.12}
                  className="mt-6 block text-sm font-medium tracking-[0.2em]"
                  style={{ color: '#FF8D00' }}
                />
                <h3 className="mt-3 text-2xl font-normal tracking-tight text-white">{step.title}</h3>
                <p className="mt-2 text-[15px] font-normal leading-relaxed max-w-[17rem]" style={{ color: 'rgba(255,255,255,0.58)' }}>
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};
