import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Footer } from '../components/Footer';
import { useGsapReveal } from '../hooks/useGsapReveal';

const stats = [
  { value: '7+', label: 'Products live', desc: 'Real applications used by real people every day.' },
  { value: '12+', label: 'Team members', desc: 'Full-stack, mobile, cloud, and AI specialists.' },
  { value: '4', label: 'Countries', desc: 'Deployed across UK, US, UAE, and Pakistan.' },
  { value: '3+', label: 'Years building', desc: 'Consistent delivery since day one.' },
];

const values = [
  {
    n: '01',
    title: 'Ships, not slides.',
    body: 'We measure our work in running code and deployed products — not decks, roadmaps, or ceremony. If it isn\'t moving toward production, we question whether it should exist.',
  },
  {
    n: '02',
    title: 'Quality is the default.',
    body: 'We don\'t bolt quality on at the end. Every line of code, every interface decision, every infrastructure choice is held to the same standard: would we be proud of this in two years?',
  },
  {
    n: '03',
    title: 'Small teams, full ownership.',
    body: 'We keep teams tight so every person has context on the whole. No silos, no handoffs that lose information. The engineer who writes the feature knows why it matters.',
  },
  {
    n: '04',
    title: 'Honest by design.',
    body: 'We tell clients when something is the wrong idea, when timelines are unrealistic, when a simpler approach exists. Trust is built on straight talk, not on telling people what they want to hear.',
  },
];

const services = [
  { title: 'Product Engineering', desc: 'End-to-end development of web and mobile products from MVP through to scale.' },
  { title: 'AI Systems', desc: 'Practical AI integrations — RAG pipelines, intelligent agents, and LLM-powered workflows.' },
  { title: 'Cloud Infrastructure', desc: 'Resilient, cost-optimised cloud architecture on AWS, GCP, and Azure.' },
  { title: 'Healthcare Technology', desc: 'Secure, compliant platforms for clinics, healthcare networks, and patient-facing products.' },
  { title: 'UX & Product Design', desc: 'Interface design grounded in usability — wireframes through to polished design systems.' },
  { title: 'Data & Analytics', desc: 'Data pipelines, dashboards, and analytics infrastructure that turns raw data into decisions.' },
];

export const AboutPage: React.FC = () => {
  const heroTextRef = useGsapReveal<HTMLDivElement>({ stagger: 0.12, start: 'top 95%' });
  const heroImgRef = useGsapReveal<HTMLDivElement>({ y: 24, duration: 0.9, start: 'top 95%' });
  const statsRef = useGsapReveal<HTMLDivElement>({ stagger: 0.1, start: 'top 90%' });
  const missionRef = useGsapReveal<HTMLDivElement>({ stagger: 0.15, start: 'top 88%' });
  const valuesHeadRef = useGsapReveal<HTMLDivElement>({ stagger: 0.12, start: 'top 88%' });
  const valuesGridRef = useGsapReveal<HTMLDivElement>({ stagger: 0.1, start: 'top 88%' });
  const servicesTextRef = useGsapReveal<HTMLDivElement>({ stagger: 0.12, start: 'top 88%' });
  const servicesGridRef = useGsapReveal<HTMLDivElement>({ stagger: 0.08, start: 'top 88%' });
  const ctaRef = useGsapReveal<HTMLDivElement>({ stagger: 0.12, start: 'top 88%' });

  return (
    <div style={{ backgroundColor: 'var(--bg-dark)', fontFamily: 'var(--font)' }} className="min-h-screen">

      {/* ── HERO ── */}
      <section className="relative pt-44 pb-28 overflow-hidden" style={{ backgroundColor: 'var(--bg-dark)' }}>
        <div className="absolute top-[-120px] right-[-100px] w-[800px] h-[700px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at top right, rgba(255,141,0,0.11) 0%, transparent 65%)', filter: 'blur(50px)' }} />
        <div className="absolute bottom-0 left-[-60px] w-[500px] h-[400px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at bottom left, rgba(255,20,10,0.09) 0%, transparent 65%)', filter: 'blur(40px)' }} />

        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-end">
            <div ref={heroTextRef} className="lg:col-span-7 space-y-7">
              <span data-reveal style={{ color: 'var(--text-muted-on-dark)' }} className="text-xs font-light tracking-[0.22em] uppercase">
                About Turbulin
              </span>
              <h1 data-reveal style={{ color: 'var(--text-on-dark)' }}
                className="text-5xl sm:text-6xl lg:text-[76px] font-normal leading-[1.04] tracking-tight">
                We build the tools<br />
                <span style={{
                  background: 'linear-gradient(135deg, #FF8D00, #FF140A)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  people rely on.
                </span>
              </h1>
              <p data-reveal style={{ color: 'var(--text-muted-on-dark)' }} className="text-lg font-normal leading-relaxed max-w-lg">
                Turbulin is a London-based digital product studio. We partner with founders,
                businesses, and healthcare organisations to build software that works — cleanly,
                reliably, and at pace.
              </p>
              <div data-reveal className="flex items-center gap-5 pt-1">
                <Link to="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-white text-sm font-semibold tracking-wide transition-opacity hover:opacity-90"
                  style={{ background: 'linear-gradient(135deg, #FF8D00, #FF140A)' }}>
                  Start a project <ArrowRight className="w-4 h-4" />
                </Link>
                <a href="mailto:hello@turbulin.io"
                  style={{ color: 'var(--text-muted-on-dark)' }}
                  className="text-sm font-normal hover:text-white transition-colors flex items-center gap-1.5">
                  hello@turbulin.io <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
            <div ref={heroImgRef} className="lg:col-span-5">
              <div
                className="relative w-full overflow-hidden rounded-2xl"
                style={{ aspectRatio: '4/3', backgroundColor: 'var(--bg-dark-3)', border: '1px solid var(--border-dark)' }}
              >
                <img src="/assets/preview.jpg" alt="Turbulin studio" className="absolute inset-0 w-full h-full object-cover opacity-80" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ backgroundColor: 'var(--bg-light)', borderTop: '1px solid var(--border-light)' }} className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-px" style={{ backgroundColor: 'var(--border-light)' }}>
            {stats.map(s => (
              <div data-reveal key={s.label} className="p-8 lg:p-10 space-y-2" style={{ backgroundColor: 'var(--bg-light)' }}>
                <div style={{ fontFamily: 'var(--font)', background: 'linear-gradient(135deg, #FF8D00, #FF140A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
                  className="text-5xl lg:text-6xl font-normal tracking-tight leading-none">
                  {s.value}
                </div>
                <div style={{ color: 'var(--text-on-light)' }} className="text-base font-medium">{s.label}</div>
                <div style={{ color: 'var(--text-muted-on-light)' }} className="text-sm font-normal leading-relaxed">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MISSION & VISION ── */}
      <section style={{ backgroundColor: 'var(--bg-light)', borderTop: '1px solid var(--border-light)' }} className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div ref={missionRef} className="grid grid-cols-1 lg:grid-cols-2 gap-px" style={{ backgroundColor: 'var(--border-light)' }}>

            <div data-reveal className="p-12 lg:p-16 space-y-6" style={{ backgroundColor: 'var(--bg-light)' }}>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-px" style={{ background: 'linear-gradient(90deg, #FF8D00, #FF140A)' }} />
                <span style={{ color: 'var(--text-muted-on-light)' }} className="text-xs font-light tracking-[0.2em] uppercase">Mission</span>
              </div>
              <h2 style={{ color: 'var(--text-on-light)' }} className="text-3xl lg:text-4xl font-normal leading-snug tracking-tight">
                To build software that earns trust through every interaction.
              </h2>
              <p style={{ color: 'var(--text-muted-on-light)' }} className="text-base font-normal leading-relaxed">
                We exist to close the gap between ambitious ideas and reliable, shipped products.
                Our mission is to be the partner that founders and product teams can trust to
                build fast, build well, and build things that actually get used.
              </p>
            </div>

            <div data-reveal className="p-12 lg:p-16 space-y-6" style={{ backgroundColor: 'var(--bg-light-2, var(--bg-light))' }}>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-px" style={{ background: 'linear-gradient(90deg, #FF8D00, #FF140A)' }} />
                <span style={{ color: 'var(--text-muted-on-light)' }} className="text-xs font-light tracking-[0.2em] uppercase">Vision</span>
              </div>
              <h2 style={{ color: 'var(--text-on-light)' }} className="text-3xl lg:text-4xl font-normal leading-snug tracking-tight">
                A world where the best technology reaches the right people.
              </h2>
              <p style={{ color: 'var(--text-muted-on-light)' }} className="text-base font-normal leading-relaxed">
                We believe great software should not be the exclusive domain of big-budget teams
                and Silicon Valley networks. Our vision is to bring world-class engineering
                to founders and organisations who have real problems worth solving.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section style={{ backgroundColor: 'var(--bg-light)', borderTop: '1px solid var(--border-light)' }} className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div ref={valuesHeadRef} className="mb-14">
            <span data-reveal style={{ color: 'var(--text-muted-on-light)' }} className="text-xs font-light tracking-[0.2em] uppercase">How we work</span>
            <h2 data-reveal style={{ color: 'var(--text-on-light)' }} className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight tracking-tight">
              Principles we don't<br />negotiate on.
            </h2>
          </div>
          <div ref={valuesGridRef} className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ backgroundColor: 'var(--border-light)' }}>
            {values.map(v => (
              <div data-reveal key={v.n} className="p-10 space-y-4" style={{ backgroundColor: 'var(--bg-light)' }}>
                <span style={{ background: 'linear-gradient(135deg, #FF8D00, #FF140A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
                  className="text-xs font-medium tracking-widest">
                  {v.n}
                </span>
                <h3 style={{ color: 'var(--text-on-light)' }} className="text-xl font-medium leading-snug">{v.title}</h3>
                <p style={{ color: 'var(--text-muted-on-light)' }} className="text-base font-normal leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section style={{ backgroundColor: 'var(--bg-dark)', borderTop: '1px solid var(--border-dark)' }} className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div ref={servicesTextRef} className="lg:col-span-4 space-y-4">
              <span data-reveal style={{ color: 'var(--text-muted-on-dark)' }} className="text-xs font-light tracking-[0.2em] uppercase">What we do</span>
              <h2 data-reveal style={{ color: 'var(--text-on-dark)' }} className="text-3xl sm:text-4xl font-normal leading-tight tracking-tight">
                Six practices, one team.
              </h2>
              <p data-reveal style={{ color: 'var(--text-muted-on-dark)' }} className="text-base font-normal leading-relaxed">
                We don't outsource or subcontract. Every engagement is run by a dedicated team
                drawn from the same pool of engineers, designers, and strategists.
              </p>
            </div>
            <div className="lg:col-span-8">
              <div ref={servicesGridRef} className="grid grid-cols-1 sm:grid-cols-2 gap-px" style={{ backgroundColor: 'var(--border-dark)' }}>
                {services.map(s => (
                  <div data-reveal key={s.title} className="p-8 space-y-3" style={{ backgroundColor: 'var(--bg-dark-2)' }}>
                    <h3 style={{ color: 'var(--text-on-dark)' }} className="text-base font-medium">{s.title}</h3>
                    <p style={{ color: 'var(--text-muted-on-dark)' }} className="text-sm font-normal leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-28 relative overflow-hidden" style={{ backgroundColor: 'var(--bg-dark)', borderTop: '1px solid var(--border-dark)' }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center bottom, rgba(255,80,0,0.12) 0%, transparent 60%)', filter: 'blur(40px)' }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10 text-center">
          <div ref={ctaRef} className="max-w-2xl mx-auto space-y-7">
            <span data-reveal style={{ color: 'var(--text-muted-on-dark)' }} className="text-xs font-light tracking-[0.22em] uppercase">
              Ready to build?
            </span>
            <h2 data-reveal style={{ color: 'var(--text-on-dark)' }} className="text-4xl sm:text-5xl lg:text-[60px] font-normal leading-[1.06] tracking-tight">
              Let's build something<br />
              <span style={{ background: 'linear-gradient(135deg, #FF8D00, #FF140A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                worth using.
              </span>
            </h2>
            <p data-reveal style={{ color: 'var(--text-muted-on-dark)' }} className="text-lg font-normal leading-relaxed">
              Tell us what you're building. We'll respond within 24 hours.
            </p>
            <div data-reveal className="flex items-center justify-center gap-4 pt-2">
              <Link to="/contact"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-full text-white text-sm font-semibold tracking-wide transition-opacity hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, #FF8D00, #FF140A)' }}>
                Start a project <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
