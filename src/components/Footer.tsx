import React from 'react';
import { ArrowUp } from 'lucide-react';

const TurbulinMark: React.FC = () => (
  <svg viewBox="0 0 124 152" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-10">
    <path d="M29.9217 98.3689C29.9217 96.1008 28.083 94.262 25.8148 94.262H0L0 62.5803L25.8148 62.5803C45.5803 62.5803 61.6035 78.6034 61.6035 98.3689L61.6035 139.438L29.9217 151.759L29.9217 98.3689Z" fill="#FF140A"/>
    <path d="M93.2844 98.3691C93.2844 96.101 95.1231 94.2622 97.3913 94.2622H123.206V62.5805L97.3913 62.5805C77.6257 62.5805 61.6026 78.6036 61.6026 98.3691L61.6026 139.438L93.2844 128.291L93.2844 98.3691Z" fill="#FF140A"/>
    <path d="M1.16857 25.0586L0.0501771 58.3498C0.0262676 59.0615 0.732807 59.5694 1.39982 59.32L61.2532 36.9417C61.4791 36.8573 61.7278 36.8573 61.9537 36.9417L121.807 59.32C122.474 59.5694 123.181 59.0615 123.157 58.3498L122.038 25.0586C122.025 24.6634 121.78 24.3132 121.414 24.165L61.9781 0.151383C61.7378 0.0542939 61.4691 0.0542939 61.2288 0.151383L1.7934 24.165C1.42676 24.3132 1.18185 24.6634 1.16857 25.0586Z" fill="#FF8D00"/>
  </svg>
);

const footerLinks = {
  Services: ['Product Engineering', 'AI & Intelligent Systems', 'Cloud & Infrastructure', 'Data & Analytics', 'UX & Digital Design', 'Healthcare Technology'],
  Projects: ['My Specialist App Opinion', 'RI London', 'EveryClinic', 'iWaqf', 'Primal Win', 'TwothMatch', 'Flossly'],
  Company: ['About', 'Our Stack', 'Careers', 'Contact'],
};

export const Footer: React.FC = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer
      style={{
        backgroundColor: 'var(--bg-dark)',
        borderTop: '1px solid var(--border-dark)',
        fontFamily: 'var(--font)',
      }}
      className="relative pt-16 pb-8 overflow-hidden"
    >
      {/* Footer glow accents */}
      <div
        className="absolute top-0 left-1/4 w-[600px] h-[200px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top, rgba(255,141,0,0.07) 0%, transparent 65%)' }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-[400px] h-[200px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at bottom, rgba(255,20,10,0.06) 0%, transparent 65%)' }}
      />
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        {/* Top row */}
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-10 pb-16" style={{ borderBottom: '1px solid var(--border-dark)' }}>
          {/* Brand */}
          <div className="col-span-2 lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3">
              <TurbulinMark />
              <div>
                <div style={{ color: 'var(--text-on-dark)' }} className="text-base font-light tracking-wide">
                  Turbulin
                </div>
                <div style={{ color: 'var(--text-muted-on-dark)' }} className="text-xs font-light tracking-widest uppercase">
                  Engineering Tomorrow
                </div>
              </div>
            </div>
            <p style={{ color: 'var(--text-muted-on-dark)' }} className="text-sm font-light leading-relaxed max-w-xs">
              A software engineering studio building production-grade digital products that make a difference.
            </p>
            <a
              href="mailto:hello@turbulin.io"
              style={{ color: 'var(--text-muted-on-dark)' }}
              className="text-sm font-light hover:text-white transition-colors"
            >
              hello@turbulin.io
            </a>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group} className="lg:col-span-2 space-y-4">
              <h5 style={{ color: 'var(--text-on-dark)' }} className="text-sm font-semibold tracking-[0.12em] uppercase">
                {group}
              </h5>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      style={{ color: 'rgba(255,255,255,0.55)' }}
                      className="text-sm font-normal hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8">
          <p style={{ color: 'rgba(255,255,255,0.35)' }} className="text-xs font-normal">
            © 2026 Turbulin Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms', 'Cookie Policy'].map((item) => (
              <a
                key={item}
                href="#"
                style={{ color: 'rgba(255,255,255,0.4)' }}
                className="text-xs font-normal hover:text-white transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Back to top */}
      <button
        onClick={scrollToTop}
        aria-label="Back to top"
        style={{
          position: 'fixed',
          bottom: '1.5rem',
          right: '1.5rem',
          background: 'linear-gradient(135deg, #FF8D00, #FF140A)',
          zIndex: 40,
        }}
        className="w-10 h-10 rounded-full text-white flex items-center justify-center shadow-lg hover:opacity-90 transition-opacity"
      >
        <ArrowUp className="w-4 h-4" />
      </button>
    </footer>
  );
};
