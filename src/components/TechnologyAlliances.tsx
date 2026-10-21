import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useGsapReveal } from '../hooks/useGsapReveal';
import {
  SiReact, SiNextdotjs, SiTypescript, SiNodedotjs, SiPython,
  SiPostgresql, SiMongodb, SiDocker, SiSupabase, SiLangchain,
  SiKubernetes, SiFigma, SiTailwindcss, SiRedis, SiVercel, SiTerraform,
  SiGraphql, SiNestjs, SiFastapi,
  SiStripe, SiGooglecloud, SiCloudflare, SiGithubactions, SiAnthropic,
} from 'react-icons/si';
import type { IconType } from 'react-icons';
import gsap from 'gsap';
import { CountUp, Eyebrow, SplitWords } from './ui/motion';

type Tech = { name: string; icon: IconType; color: string };
type Ring = { label: string; desc: string; size: number; duration: number; reverse: boolean; items: Tech[] };

// Grouped by layer, inside out: what users touch → APIs → data & AI → where it all runs
const rings: Ring[] = [
  {
    label: 'Interfaces', desc: 'The web and mobile front-ends people actually touch.', size: 36, duration: 46, reverse: false,
    items: [
      { name: 'React',      icon: SiReact,       color: '#61DAFB' },
      { name: 'Next.js',    icon: SiNextdotjs,   color: '#111111' },
      { name: 'TypeScript', icon: SiTypescript,  color: '#3178C6' },
      { name: 'Tailwind',   icon: SiTailwindcss, color: '#06B6D4' },
    ],
  },
  {
    label: 'APIs', desc: 'Services, business logic, integrations and payments.', size: 59, duration: 64, reverse: true,
    items: [
      { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
      { name: 'NestJS',  icon: SiNestjs,    color: '#E0234E' },
      { name: 'Python',  icon: SiPython,    color: '#3776AB' },
      { name: 'FastAPI', icon: SiFastapi,   color: '#009688' },
      { name: 'GraphQL', icon: SiGraphql,   color: '#E10098' },
      { name: 'Stripe',  icon: SiStripe,    color: '#635BFF' },
    ],
  },
  {
    label: 'Data & AI', desc: 'Storage, search and the intelligence on top.', size: 80, duration: 84, reverse: false,
    items: [
      { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
      { name: 'MongoDB',    icon: SiMongodb,    color: '#47A248' },
      { name: 'Redis',      icon: SiRedis,      color: '#DC382D' },
      { name: 'Supabase',   icon: SiSupabase,   color: '#3ECF8E' },
      { name: 'LangChain',  icon: SiLangchain,  color: '#1C3A4B' },
      { name: 'Anthropic',  icon: SiAnthropic,  color: '#191919' },
    ],
  },
  {
    label: 'Infrastructure', desc: 'Where it all runs, ships and scales.', size: 99, duration: 110, reverse: true,
    items: [
      { name: 'Docker',         icon: SiDocker,        color: '#2496ED' },
      { name: 'Kubernetes',     icon: SiKubernetes,    color: '#326CE5' },
      { name: 'Terraform',      icon: SiTerraform,     color: '#7B42BC' },
      { name: 'Google Cloud',   icon: SiGooglecloud,   color: '#4285F4' },
      { name: 'Cloudflare',     icon: SiCloudflare,    color: '#F38020' },
      { name: 'Vercel',         icon: SiVercel,        color: '#111111' },
      { name: 'GitHub Actions', icon: SiGithubactions, color: '#2088FF' },
      { name: 'Figma',          icon: SiFigma,         color: '#F24E1E' },
    ],
  },
];

const TILT = 30;        // degrees the orbit tips back on hover
const HOVER_SPEED = 0.3; // rings keep drifting at this fraction of speed while hovered
const MAX_BOOST = 9;     // scroll can spin rings up to (1 + this)× speed

const TurbulinMark: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 124 152" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path d="M29.9217 98.3689C29.9217 96.1007 28.083 94.262 25.8148 94.262H0L0 62.5802L25.8148 62.5802C45.5803 62.5802 61.6035 78.6033 61.6035 98.3689L61.6035 139.438L29.9217 151.759L29.9217 98.3689Z" fill="#FF140A" />
    <path d="M93.2844 98.3691C93.2844 96.1009 95.1231 94.2622 97.3913 94.2622H123.206V62.5804L97.3913 62.5804C77.6257 62.5804 61.6026 78.6035 61.6026 98.3691L61.6026 139.438L93.2844 128.291L93.2844 98.3691Z" fill="#FF140A" />
    <path d="M1.16857 25.0586L0.0501771 58.3497C0.0262676 59.0614 0.732807 59.5693 1.39982 59.32L61.2532 36.9417C61.4791 36.8572 61.7278 36.8572 61.9537 36.9417L121.807 59.32C122.474 59.5693 123.181 59.0614 123.157 58.3497L122.038 25.0586C122.025 24.6634 121.78 24.3131 121.414 24.165L61.9781 0.151322C61.7378 0.0542329 61.4691 0.0542329 61.2288 0.151322L1.7934 24.165C1.42676 24.3131 1.18185 24.6634 1.16857 25.0586Z" fill="#FF8D00" />
  </svg>
);

/** Billboard: undo the ring's spin and the plane's tilt so content always faces the viewer. */
const billboard = (ring: number | null) =>
  `rotateZ(calc(-1 * (${ring === null ? '0deg' : `var(--a${ring})`} + var(--yaw)))) rotateX(calc(-1 * var(--tilt)))`;

const Orbit: React.FC = () => {
  const stageRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const hoveredRef = useRef<HTMLElement | null>(null);
  const placeLabelRef = useRef<() => void>(() => {});
  const revealRef = useGsapReveal<HTMLDivElement>({ y: 30, start: 'top 85%' });

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    // Label lives outside the 3D scene so it can never be hidden behind the core
    const placeLabel = () => {
      const chip = hoveredRef.current, label = labelRef.current;
      if (!chip || !label) return;
      const sr = stage.getBoundingClientRect(), cr = chip.getBoundingClientRect();
      label.style.left = `${cr.left + cr.width / 2 - sr.left}px`;
      label.style.top = `${cr.bottom - sr.top + 10}px`;
    };
    placeLabelRef.current = placeLabel;

    const st = {
      angles: rings.map(() => 0),
      tilt: 0, tiltT: 0, yaw: 0, yawT: 0,
      speed: 1, speedT: 1, boost: 0,
    };
    const write = () => {
      st.angles.forEach((a, i) => stage.style.setProperty(`--a${i}`, `${a.toFixed(2)}deg`));
      stage.style.setProperty('--tilt', `${st.tilt.toFixed(2)}deg`);
      stage.style.setProperty('--yaw', `${st.yaw.toFixed(2)}deg`);
    };
    write();
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Scroll velocity → temporary spin boost
    let lastY = window.scrollY, lastT = performance.now();
    const onScroll = () => {
      const now = performance.now();
      const v = Math.abs(window.scrollY - lastY) / Math.max(16, now - lastT); // px per ms
      lastY = window.scrollY; lastT = now;
      st.boost = Math.min(MAX_BOOST, Math.max(st.boost, v * 7));
    };

    const onEnter = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      st.tiltT = TILT; st.speedT = HOVER_SPEED;
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      const r = stage.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5;
      const ny = (e.clientY - r.top) / r.height - 0.5;
      st.yawT = nx * -14;
      st.tiltT = TILT - ny * 8;
    };
    const onLeave = () => { st.tiltT = 0; st.yawT = 0; st.speedT = 1; };
    // Touch: tap toggles the 3D view
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== 'touch') return;
      const on = st.tiltT === 0;
      st.tiltT = on ? TILT : 0; st.speedT = on ? HOVER_SPEED : 1;
    };

    const tick = (_time: number, deltaMs: number) => {
      const dt = Math.min(deltaMs, 100) / 1000;
      st.boost *= Math.pow(0.05, dt);              // boost fades out over ~1s
      const ease = 1 - Math.pow(0.002, dt);         // frame-rate independent smoothing
      st.speed += (st.speedT - st.speed) * ease;
      st.tilt += (st.tiltT - st.tilt) * ease;
      st.yaw += (st.yawT - st.yaw) * ease;
      rings.forEach((ring, i) => {
        st.angles[i] = (st.angles[i] + (360 / ring.duration) * (ring.reverse ? -1 : 1) * dt * st.speed * (1 + st.boost)) % 360;
      });
      write();
      placeLabel();
    };

    let running = false;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !running) { gsap.ticker.add(tick); running = true; }
      else if (!entry.isIntersecting && running) { gsap.ticker.remove(tick); running = false; }
    });
    io.observe(stage);
    window.addEventListener('scroll', onScroll, { passive: true });
    stage.addEventListener('pointerenter', onEnter);
    stage.addEventListener('pointermove', onMove);
    stage.addEventListener('pointerleave', onLeave);
    stage.addEventListener('pointerdown', onDown);
    return () => {
      io.disconnect();
      gsap.ticker.remove(tick);
      window.removeEventListener('scroll', onScroll);
      stage.removeEventListener('pointerenter', onEnter);
      stage.removeEventListener('pointermove', onMove);
      stage.removeEventListener('pointerleave', onLeave);
      stage.removeEventListener('pointerdown', onDown);
    };
  }, []);

  return (
    <div ref={revealRef}>
      <div
        data-reveal
        ref={stageRef}
        className="orbit-stage relative w-full max-w-[640px] mx-auto aspect-square lg:max-w-none lg:w-full xl:w-[700px] lg:ml-auto lg:mr-0"
        role="list"
        aria-label="Our technology stack"
      >
        <div className="orbit-plane absolute inset-[7%] sm:inset-[5%]">
          {rings.map((ring, r) => (
            <div
              key={ring.label}
              data-ring={r}
              className="orbit-ring absolute left-1/2 top-1/2 aspect-square rounded-full pointer-events-none"
              style={{ width: `${ring.size}%`, transform: `translate(-50%, -50%) rotateZ(var(--a${r}))` }}
            >
              {/* Spark riding the ring */}
              <span className="orbit-spark absolute left-1/2 top-0 w-1.5 h-1.5 rounded-full" />

              {ring.items.map((tech, i) => {
                const angle = (((360 / ring.items.length) * i + r * 23 - 90) * Math.PI) / 180;
                const Icon = tech.icon;
                return (
                  <div
                    key={tech.name}
                    role="listitem"
                    className="orbit-slot absolute"
                    style={{ left: `${50 + 50 * Math.cos(angle)}%`, top: `${50 + 50 * Math.sin(angle)}%` }}
                  >
                    <div className="orbit-upright" style={{ transform: billboard(r) }}>
                      <div
                        className="orbit-chip pointer-events-auto relative flex items-center justify-center rounded-full w-9 h-9 sm:w-14 sm:h-14 lg:w-[60px] lg:h-[60px]"
                        aria-label={tech.name}
                        onPointerEnter={(e) => {
                          hoveredRef.current = e.currentTarget;
                          if (labelRef.current) { labelRef.current.textContent = tech.name; labelRef.current.classList.add('is-visible'); }
                          placeLabelRef.current();
                        }}
                        onPointerLeave={() => {
                          hoveredRef.current = null;
                          labelRef.current?.classList.remove('is-visible');
                        }}
                      >
                        <Icon style={{ color: tech.color }} className="w-4 h-4 sm:w-6 sm:h-6 lg:w-7 lg:h-7" aria-hidden="true" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}

          {/* Core */}
          <div className="absolute left-1/2 top-1/2" style={{ transformStyle: 'preserve-3d' }}>
            <div className="orbit-billboard" style={{ transform: billboard(null), transformStyle: 'preserve-3d' }}>
              <div className="orbit-core relative flex items-center justify-center rounded-full w-14 h-14 sm:w-24 sm:h-24 lg:w-28 lg:h-28 -translate-x-1/2 -translate-y-1/2">
                <TurbulinMark className="w-6 sm:w-10 lg:w-12 h-auto" />
              </div>
            </div>
          </div>
        </div>
        <span ref={labelRef} className="orbit-label" aria-hidden="true" />
      </div>
    </div>
  );
};

export const TechnologyAlliances: React.FC = () => {
  const headerRef = useGsapReveal<HTMLDivElement>({ stagger: 0.1 });
  const layersRef = useGsapReveal<HTMLOListElement>({ stagger: 0.08, y: 20, start: 'top 88%' });
  const ctaRef = useGsapReveal<HTMLDivElement>({ y: 16, start: 'top 95%' });
  const [activeLayer, setActiveLayer] = useState<number | null>(null);

  return (
    <section
      id="stack"
      data-layer={activeLayer ?? undefined}
      style={{ backgroundColor: 'var(--bg-light)', borderTop: '1px solid var(--border-light)' }}
      className="stack-section py-24 lg:py-32 overflow-x-clip"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          {/* Left — heading + layer legend */}
          <div className="lg:col-span-5">
            <div ref={headerRef} className="space-y-6">
              <Eyebrow>Our Stack</Eyebrow>
              <h2
                style={{ fontFamily: 'var(--font)', color: 'var(--text-on-light)' }}
                className="text-4xl sm:text-5xl lg:text-[56px] font-normal leading-[1.06] tracking-tight"
              >
                <SplitWords>Built on modern,</SplitWords>{' '}
                <SplitWords gradient delay={0.15}>proven technologies.</SplitWords>
              </h2>
              <p
                data-reveal
                style={{ color: 'var(--text-muted-on-light)', fontFamily: 'var(--font)' }}
                className="text-base sm:text-lg font-normal leading-relaxed max-w-md"
              >
                We choose tools for performance, maintainability, and longevity, not trends.
                Every technology in our stack is one we run in production.
              </p>
            </div>

            <ol ref={layersRef} className="mt-8 max-w-sm" onMouseLeave={() => setActiveLayer(null)}>
              {rings.map((ring, i) => (
                <li key={ring.label} data-reveal>
                  <button
                    type="button"
                    className={`layer-row group w-full text-left ${activeLayer === i ? 'is-active' : ''}`}
                    onMouseEnter={() => setActiveLayer(i)}
                    onFocus={() => setActiveLayer(i)}
                    onBlur={() => setActiveLayer(null)}
                    style={{ fontFamily: 'var(--font)' }}
                  >
                    <span className="layer-dot" aria-hidden="true" />
                    <span className="flex-1 text-base font-normal" style={{ color: 'var(--text-on-light)' }}>{ring.label}</span>
                  </button>
                </li>
              ))}
            </ol>

            <div ref={ctaRef} className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white text-sm font-semibold tracking-wide transition-transform duration-300 hover:-translate-y-0.5"
                style={{ background: 'linear-gradient(135deg, #FF8D00, #FF140A)', fontFamily: 'var(--font)' }}
              >
                Start a project <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right — orbit */}
          <div className="lg:col-span-7 py-6 lg:py-0">
            <Orbit />
          </div>

        </div>
      </div>
    </section>
  );
};
