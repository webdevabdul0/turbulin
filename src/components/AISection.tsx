import React, { useEffect, useRef, useState } from 'react';
import { BrainCircuit, Workflow, FileSearch, TrendingUp, Sparkles, Check } from 'lucide-react';
import { useGsapReveal } from '../hooks/useGsapReveal';
import { Eyebrow, SplitWords } from './ui/motion';

const capabilities = [
  { icon: BrainCircuit, title: 'Knowledge assistants', body: 'RAG systems that answer from your own documents, with sources.' },
  { icon: Workflow, title: 'AI agents & automation', body: 'Agents that take actions across your tools, not just chat.' },
  { icon: FileSearch, title: 'Document intelligence', body: 'Extract, classify and summarise contracts, forms and records.' },
  { icon: TrendingUp, title: 'Predictive insights', body: 'Models that forecast demand, risk and churn from your data.' },
];

// One scripted agent run, replayed in a loop
const QUESTION = 'Which clinics had the most no-shows last month, and why?';
const STEPS = [
  'Searching appointment records',
  'Reading 3 clinic reports',
  'Comparing reminder settings',
];
const ANSWER =
  'Leeds and Croydon led with 14% and 11% no-shows. Both send a single reminder 24h before; clinics sending a second reminder 2h before averaged 4%.';
const SOURCES = ['appointments_oct.csv', 'leeds_report.pdf', 'reminder_config'];

type Phase = 'idle' | 'question' | 'steps' | 'answer' | 'done';

const AgentConsole: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>('idle');
  const [stepsDone, setStepsDone] = useState(0);
  const [typed, setTyped] = useState(0);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPhase('done'); setStepsDone(STEPS.length); setTyped(ANSWER.length);
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];
    let interval: ReturnType<typeof setInterval> | null = null;
    let running = false;
    const later = (fn: () => void, ms: number) => timers.push(setTimeout(fn, ms));

    const run = () => {
      setPhase('question'); setStepsDone(0); setTyped(0);
      later(() => setPhase('steps'), 900);
      STEPS.forEach((_, i) => later(() => setStepsDone(i + 1), 1500 + i * 850));
      later(() => {
        setPhase('answer');
        let n = 0;
        interval = setInterval(() => {
          n += 2;
          setTyped(Math.min(n, ANSWER.length));
          if (n >= ANSWER.length && interval) {
            clearInterval(interval); interval = null;
            setPhase('done');
            later(run, 5200); // hold the finished answer, then replay
          }
        }, 22);
      }, 1500 + STEPS.length * 850 + 300);
    };

    const stop = () => {
      timers.splice(0).forEach(clearTimeout);
      if (interval) { clearInterval(interval); interval = null; }
    };

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !running) { running = true; run(); }
      else if (!entry.isIntersecting && running) { running = false; stop(); }
    }, { threshold: 0.35 });
    io.observe(el);
    return () => { io.disconnect(); stop(); };
  }, []);

  const showSteps = phase === 'steps' || phase === 'answer' || phase === 'done';
  const showAnswer = phase === 'answer' || phase === 'done';

  return (
    <div ref={rootRef} className="ai-console relative rounded-3xl p-px">
      <div className="relative rounded-[calc(1.5rem-1px)] overflow-hidden" style={{ background: '#0B0B0C' }}>
        {/* Title bar */}
        <div className="flex items-center justify-between px-5 py-3.5" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
          </div>
          <span className="text-[11px] tracking-[0.18em] uppercase text-white/40">turbulin-agent</span>
          <span className="flex items-center gap-1.5 text-[11px] text-white/45">
            <span className="ai-live-dot" aria-hidden="true" /> live
          </span>
        </div>

        <div className="p-5 sm:p-6 space-y-5 min-h-[420px]" aria-live="polite">
          {/* User question */}
          <div className={`flex justify-end transition-all duration-500 ${phase === 'idle' ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
            <div className="max-w-[85%] rounded-2xl rounded-br-md px-4 py-3 text-[14px] leading-relaxed text-white"
              style={{ background: 'linear-gradient(135deg, #FF8D00, #FF140A)' }}>
              {QUESTION}
            </div>
          </div>

          {/* Agent steps */}
          <div className={`space-y-2.5 transition-opacity duration-500 ${showSteps ? 'opacity-100' : 'opacity-0'}`}>
            {STEPS.map((step, i) => {
              const done = i < stepsDone;
              const active = i === stepsDone && phase === 'steps';
              return (
                <div key={step} className={`flex items-center gap-3 text-[13px] transition-all duration-400 ${i <= stepsDone ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-1'}`}>
                  <span className={`flex items-center justify-center w-5 h-5 rounded-full shrink-0 ${done ? 'bg-[#FF8D00]/15 text-[#FF8D00]' : 'bg-white/5 text-white/40'}`}>
                    {done ? <Check className="w-3 h-3" /> : <span className={`w-1.5 h-1.5 rounded-full bg-current ${active ? 'ai-pulse' : ''}`} />}
                  </span>
                  <span className={done ? 'text-white/70' : 'text-white/45'}>{step}{active && <span className="ai-ellipsis" />}</span>
                </div>
              );
            })}
          </div>

          {/* Answer */}
          <div className={`flex gap-3 transition-all duration-500 ${showAnswer ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
            <span className="flex items-center justify-center w-8 h-8 rounded-full shrink-0" style={{ background: 'rgba(255,141,0,0.12)', border: '1px solid rgba(255,141,0,0.3)' }}>
              <Sparkles className="w-4 h-4 text-[#FF8D00]" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[14px] leading-relaxed text-white/85">
                {ANSWER.slice(0, typed)}
                {phase === 'answer' && <span className="ai-caret" aria-hidden="true" />}
              </p>
              <div className={`mt-3 flex flex-wrap gap-2 transition-opacity duration-500 ${phase === 'done' ? 'opacity-100' : 'opacity-0'}`}>
                {SOURCES.map((s) => (
                  <span key={s} className="rounded-full px-2.5 py-1 text-[11px] text-white/55" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AISection: React.FC = () => {
  const headerRef = useGsapReveal<HTMLDivElement>({ stagger: 0.1 });
  const listRef = useGsapReveal<HTMLUListElement>({ stagger: 0.09, y: 20, start: 'top 88%' });
  const consoleRef = useGsapReveal<HTMLDivElement>({ y: 50, duration: 1.1, start: 'top 85%' });

  return (
    <section id="ai" className="relative overflow-hidden py-24 lg:py-32" style={{ backgroundColor: '#050505' }}>
      {/* Brand glows */}
      <div className="absolute -top-40 right-[-10%] w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,141,0,0.13) 0%, transparent 65%)' }} />
      <div className="absolute bottom-[-30%] left-[-15%] w-[650px] h-[650px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,20,10,0.10) 0%, transparent 65%)' }} />
      {/* Fine grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse at 50% 40%, #000 0%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 40%, #000 0%, transparent 75%)',
        }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16 items-center">
          {/* Left — copy + capabilities */}
          <div className="lg:col-span-6">
            <div ref={headerRef} className="space-y-6">
              <Eyebrow tone="dark">Artificial intelligence</Eyebrow>
              <h2 style={{ fontFamily: 'var(--font)' }} className="text-4xl sm:text-5xl lg:text-[60px] font-normal leading-[1.05] tracking-tight text-white">
                <SplitWords>AI that does real work,</SplitWords>{' '}
                <SplitWords gradient delay={0.2}>not demos.</SplitWords>
              </h2>
              <p data-reveal className="text-lg leading-relaxed max-w-lg" style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font)' }}>
                We build AI into the products people already use: grounded in your data,
                measured against real outcomes, and shipped to production with guardrails.
              </p>
            </div>

            <ul ref={listRef} className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-7">
              {capabilities.map(({ icon: Icon, title, body }) => (
                <li key={title} data-reveal className="ai-capability flex gap-4" style={{ fontFamily: 'var(--font)' }}>
                  <span className="ai-icon flex items-center justify-center w-11 h-11 rounded-xl shrink-0">
                    <Icon className="w-5 h-5" />
                  </span>
                  <span>
                    <span className="block text-[16px] text-white">{title}</span>
                    <span className="block mt-1 text-[14px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>{body}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — live agent console */}
          <div className="lg:col-span-6">
            <div ref={consoleRef}>
              <div data-reveal>
                <AgentConsole />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
