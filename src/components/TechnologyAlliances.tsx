import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useGsapReveal } from '../hooks/useGsapReveal';
import {
  SiReact, SiNextdotjs, SiTypescript, SiNodedotjs, SiPython,
  SiPostgresql, SiMongodb, SiDocker, SiSupabase, SiLangchain,
  SiKubernetes, SiFigma, SiTailwindcss, SiRedis, SiVercel, SiTerraform,
} from 'react-icons/si';

const techStack = [
  { name: 'React',       icon: SiReact,       color: '#61DAFB' },
  { name: 'Next.js',     icon: SiNextdotjs,   color: '#888888' },
  { name: 'TypeScript',  icon: SiTypescript,  color: '#3178C6' },
  { name: 'Tailwind',    icon: SiTailwindcss, color: '#06B6D4' },
  { name: 'Node.js',     icon: SiNodedotjs,   color: '#339933' },
  { name: 'Python',      icon: SiPython,      color: '#3776AB' },
  { name: 'PostgreSQL',  icon: SiPostgresql,  color: '#4169E1' },
  { name: 'MongoDB',     icon: SiMongodb,     color: '#47A248' },
  { name: 'Redis',       icon: SiRedis,       color: '#DC382D' },
  { name: 'Supabase',    icon: SiSupabase,    color: '#3ECF8E' },
  { name: 'Docker',      icon: SiDocker,      color: '#2496ED' },
  { name: 'Kubernetes',  icon: SiKubernetes,  color: '#326CE5' },
  { name: 'Terraform',   icon: SiTerraform,   color: '#7B42BC' },
  { name: 'Vercel',      icon: SiVercel,      color: '#888888' },
  { name: 'LangChain',   icon: SiLangchain,   color: '#1C3A4B' },
  { name: 'Figma',       icon: SiFigma,       color: '#F24E1E' },
];

export const TechnologyAlliances: React.FC = () => {
  const headerRef = useGsapReveal<HTMLDivElement>({ stagger: 0.1 });
  const gridRef = useGsapReveal<HTMLDivElement>({ stagger: 0.05, start: 'top 88%' });

  return (
    <section
      id="stack"
      style={{ backgroundColor: 'var(--bg-light)', borderTop: '1px solid var(--border-light)' }}
      className="py-24"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          {/* Left — heading */}
          <div ref={headerRef} className="lg:col-span-5 space-y-7 lg:sticky lg:top-32">
            <div data-reveal>
              <span
                style={{ color: 'var(--text-muted-on-light)', fontFamily: 'var(--font)' }}
                className="text-xs font-light tracking-[0.2em] uppercase"
              >
                Our Stack
              </span>
            </div>
            <h2
              data-reveal
              style={{ fontFamily: 'var(--font)', color: 'var(--text-on-light)' }}
              className="text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight tracking-tight"
            >
              Built on modern, proven technologies.
            </h2>
            <p
              data-reveal
              style={{ color: 'var(--text-muted-on-light)', fontFamily: 'var(--font)' }}
              className="text-lg font-normal leading-relaxed"
            >
              We choose tools for performance, maintainability, and longevity — not trends.
              Every technology in our stack is one we run in production.
            </p>
            <div data-reveal>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide transition-colors duration-200 hover:text-[#FF140A]"
                style={{ color: 'var(--text-on-light)', fontFamily: 'var(--font)' }}
              >
                <span>Start a project</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right — grid */}
          <div ref={gridRef} className="lg:col-span-7">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {techStack.map((tech) => {
                const Icon = tech.icon;
                return (
                  <div
                    key={tech.name}
                    data-reveal
                    style={{
                      backgroundColor: 'var(--bg-light)',
                      border: '1px solid var(--border-light)',
                      fontFamily: 'var(--font)',
                    }}
                    className="group flex flex-col items-center justify-center gap-4 p-8 rounded-2xl transition-all duration-300 hover:border-[#FF8D00] hover:shadow-sm cursor-default"
                  >
                    <Icon
                      style={{ color: tech.color, width: '2.5rem', height: '2.5rem', transition: 'transform 0.3s ease' }}
                      className="group-hover:scale-110"
                    />
                    <span
                      style={{ color: 'var(--text-muted-on-light)' }}
                      className="text-xs font-medium tracking-wide text-center"
                    >
                      {tech.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
