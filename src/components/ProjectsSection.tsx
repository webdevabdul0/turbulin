import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useGsapReveal } from '../hooks/useGsapReveal';

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
  const gridRef = useGsapReveal<HTMLDivElement>({ stagger: 0.08, delay: 0.05 });

  return (
    <section
      id="projects"
      style={{ backgroundColor: 'var(--bg-light)', borderTop: '1px solid var(--border-light)' }}
      className="py-24"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <div ref={headerRef} className="mb-16 flex items-end justify-between gap-8 flex-wrap">
          <div className="space-y-4">
            <div data-reveal>
              <span style={{ color: 'var(--text-muted-on-light)', fontFamily: 'var(--font)' }}
                className="text-xs font-light tracking-[0.2em] uppercase">
                Projects
              </span>
            </div>
            <h2 data-reveal style={{ fontFamily: 'var(--font)', color: 'var(--text-on-light)' }}
              className="text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight tracking-tight">
              Products we've shipped.
            </h2>
          </div>
          <p data-reveal style={{ color: 'var(--text-muted-on-light)', fontFamily: 'var(--font)' }}
            className="text-base font-normal leading-relaxed max-w-xs">
            From early-stage startups to established businesses — each product is built to last.
          </p>
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px"
          style={{ backgroundColor: 'var(--border-light)' }}
        >
          {projects.map((project) => (
            <div
              key={project.id}
              data-reveal
              style={{ backgroundColor: 'var(--bg-light)', fontFamily: 'var(--font)' }}
              className="group flex flex-col justify-between p-8 transition-colors duration-300 hover:bg-[var(--bg-light-2)]"
            >
              {/* Top — text */}
              <div className="space-y-4">
                <div className="flex items-center justify-end">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{
                      color: project.accentColor,
                      backgroundColor: `${project.accentColor}10`,
                      border: `1px solid ${project.accentColor}25`,
                    }}
                  >
                    <span>View project</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>

                <div>
                  <h3
                    style={{ color: project.accentColor, fontFamily: 'var(--font)' }}
                    className="text-xl font-medium leading-snug mb-1"
                  >
                    {project.tagline}
                  </h3>
                  <p style={{ color: 'var(--text-muted-on-light)' }} className="text-base font-normal leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Bottom — real logo */}
              <div
                className="mt-10 pt-8 flex items-end"
                style={{ borderTop: '1px solid var(--border-light)' }}
              >
                <img
                  src={project.logo}
                  alt={project.logoAlt}
                  className="h-10 w-auto max-w-[220px] object-contain"
                />
              </div>
            </div>
          ))}

          {/* CTA cell */}
          <div
            data-reveal
            style={{ backgroundColor: 'var(--bg-light-2)', fontFamily: 'var(--font)' }}
            className="group flex flex-col justify-between p-8 transition-colors duration-300 hover:bg-[var(--bg-light-3)]"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-end h-4" />
              <div>
                <h3 style={{ color: '#FF8D00', fontFamily: 'var(--font)' }} className="text-xl font-medium leading-snug mb-1">
                  Your project, next.
                </h3>
                <p style={{ color: 'var(--text-muted-on-light)' }} className="text-sm font-normal leading-relaxed">
                  We're taking on new projects. If you have a product to build, let's talk.
                </p>
              </div>
            </div>
            <div className="mt-10 pt-8" style={{ borderTop: '1px solid var(--border-light)' }}>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white text-sm font-semibold tracking-wide transition-opacity hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, #FF8D00, #FF140A)' }}
              >
                <span>Start a project</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
