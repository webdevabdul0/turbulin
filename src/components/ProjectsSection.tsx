import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useGsapReveal } from '../hooks/useGsapReveal';
import { CountUp, Eyebrow, SplitWords } from './ui/motion';

const projects = [
  {
    id: 'ri',
    tagline: 'Premium property, simplified.',
    description: 'A digital platform for a premium London property services firm — streamlining lettings, management, and client communications into a single coherent workflow.',
    url: 'https://rilondon.uk',
    category: 'Property',
    accentColor: '#111111',
    logo: '/assets/logos/rilondon.svg',
    logoAlt: 'RI London',
  },
  {
    id: 'ec',
    tagline: 'Your clinic in your pocket.',
    description: 'A comprehensive patient portal for multi-site dental and aesthetic clinics — covering scheduling, records, treatment tracking, and real-time communications.',
    url: 'https://everyclinic-patient-portal.uat.aqlios.com',
    category: 'Healthcare',
    accentColor: '#0867F9',
    logo: '/assets/logos/everyclinic.svg',
    logoAlt: 'EveryClinic',
  },
  {
    id: 'iwaqf',
    tagline: 'Endowment for the digital age.',
    description: 'A platform modernising Islamic endowment management — bringing transparency, governance, and accessibility to charitable asset administration.',
    url: 'https://iwaqf.io',
    category: 'Fintech',
    accentColor: '#749B9D',
    logo: '/assets/logos/iwaqf.svg',
    logoAlt: 'iWaqf',
  },
  {
    id: 'tm',
    tagline: 'Find the right treatment.',
    description: 'A UK dental marketplace matching patients to treatments and practices through intelligent filtering, transparent pricing, and verified patient reviews.',
    url: 'https://www.twothmatch.co.uk',
    category: 'HealthTech',
    accentColor: '#955ACE',
    logo: '/assets/logos/twothmatch.svg',
    logoAlt: 'TwothMatch',
  },
  {
    id: 'flossly',
    tagline: 'AI-powered oral care.',
    description: 'An AI-powered dental health companion — personalised oral care plans, treatment recommendations, and smart clinic discovery for proactive dentistry.',
    url: 'https://flossly.ai',
    category: 'AI · HealthTech',
    accentColor: '#0061FB',
    logo: '/assets/logos/flossly.svg',
    logoAlt: 'Flossly',
  },
];

export const ProjectsSection: React.FC = () => {
  const headerRef = useGsapReveal<HTMLDivElement>({ stagger: 0.1 });
  const gridRef = useGsapReveal<HTMLDivElement>({ stagger: 0.09, y: 48, start: 'top 85%' });

  return (
    <section
      id="projects"
      style={{ backgroundColor: 'var(--bg-light-2)', borderTop: '1px solid var(--border-light)' }}
      className="py-24 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <div ref={headerRef} className="mb-14 lg:mb-16 flex items-end justify-between gap-8 flex-wrap">
          <div className="space-y-5">
            <Eyebrow>Projects</Eyebrow>
            <h2 style={{ fontFamily: 'var(--font)', color: 'var(--text-on-light)' }}
              className="text-4xl sm:text-5xl lg:text-[64px] font-normal leading-[1.04] tracking-tight">
              <SplitWords>Products we've</SplitWords>{' '}
              <SplitWords gradient delay={0.15}>shipped.</SplitWords>
            </h2>
          </div>
          <div data-reveal className="flex items-end gap-6">
            <p style={{ color: 'var(--text-muted-on-light)', fontFamily: 'var(--font)' }}
              className="text-base font-normal leading-relaxed max-w-xs">
              From early-stage startups to established businesses, each product is built to last.
            </p>
            <div className="hidden sm:block text-right shrink-0" style={{ fontFamily: 'var(--font)' }}>
              <CountUp value={projects.length} pad={2} className="block text-5xl font-normal leading-none tracking-tight" style={{ color: 'var(--text-on-light)' }} />
              <span className="text-xs tracking-[0.15em] uppercase" style={{ color: 'var(--text-muted-on-light)' }}>Featured</span>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {projects.map((project, i) => (
            <a
              key={project.id}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              data-reveal
              className="project-card group relative flex flex-col rounded-3xl p-7 lg:p-8 overflow-hidden"
              style={{ ['--accent' as string]: project.accentColor, fontFamily: 'var(--font)' }}
            >
              <span className="project-glow" aria-hidden="true" />

              <div className="relative flex items-center justify-between">
                <CountUp
                  value={i + 1}
                  pad={2}
                  delay={i * 0.06}
                  className="text-sm font-medium tracking-[0.15em]"
                  style={{ color: 'var(--text-subtle-on-light)' }}
                />
                <span
                  className="rounded-full px-3 py-1 text-[11px] font-medium tracking-[0.12em] uppercase"
                  style={{ color: project.accentColor, backgroundColor: `${project.accentColor}12`, border: `1px solid ${project.accentColor}26` }}
                >
                  {project.category}
                </span>
              </div>

              <div className="relative h-24 flex items-center mt-6">
                <img
                  src={project.logo}
                  alt={project.logoAlt}
                  className="h-10 w-auto max-w-[220px] object-contain transition-transform duration-500 ease-out group-hover:scale-105 origin-left"
                />
              </div>

              <div className="relative mt-auto pt-6 space-y-2" style={{ borderTop: '1px solid var(--border-light)' }}>
                <div className="flex items-start justify-between gap-4">
                  <h3 style={{ color: 'var(--text-on-light)' }} className="text-xl font-medium leading-snug">
                    {project.tagline}
                  </h3>
                  <span className="project-arrow shrink-0" aria-hidden="true">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
                <p style={{ color: 'var(--text-muted-on-light)' }} className="text-[15px] font-normal leading-relaxed">
                  {project.description}
                </p>
              </div>
            </a>
          ))}

          {/* CTA card — glossy brand render behind */}
          <a
            href="#contact"
            data-reveal
            className="group relative flex flex-col justify-between rounded-3xl p-7 lg:p-8 overflow-hidden min-h-[340px]"
            style={{ backgroundColor: '#000', fontFamily: 'var(--font)' }}
          >
            <img
              src="/hero-fluid.webp?v=3"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover opacity-70 transition-transform duration-[1200ms] ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0.6) 100%)' }} />
            <div className="relative space-y-3">
              <span className="text-xs font-light tracking-[0.2em] uppercase text-white/60">Next up</span>
              <h3 className="text-3xl font-normal leading-tight tracking-tight text-white">Your project,<br />next.</h3>
              <p className="text-sm font-normal leading-relaxed text-white/70 max-w-[16rem]">
                We're taking on new projects. If you have a product to build, let's talk.
              </p>
            </div>
            <span
              className="relative inline-flex items-center gap-2 self-start px-6 py-3 rounded-full text-white text-sm font-semibold tracking-wide transition-transform duration-300 group-hover:translate-x-1"
              style={{ background: 'linear-gradient(135deg, #FF8D00, #FF140A)' }}
            >
              Start a project <ArrowUpRight className="w-4 h-4" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};
