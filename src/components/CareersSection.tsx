import React from 'react';
import { ArrowRight } from 'lucide-react';

export const CareersSection: React.FC = () => {
  return (
    <section id="careers" className="relative py-28 bg-slate-950 text-white overflow-hidden select-none">
      {/* Background Image & Gradient */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80"
          alt="Careers at Systems Limited"
          className="w-full h-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-950/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
        <div className="max-w-2xl space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">
            JOIN OUR GLOBAL TEAM
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            Where careers take shape
          </h2>
          <p className="text-slate-300 text-lg sm:text-xl font-normal leading-relaxed">
            Build meaningful work with a team that values growth, collaboration, and real impact.
          </p>

          <div className="pt-4">
            <a
              href="#careers-openings"
              className="inline-flex items-center space-x-3 bg-white hover:bg-slate-100 text-slate-950 px-8 py-3.5 rounded-full font-bold text-xs tracking-wider transition-all transform hover:scale-105 shadow-xl"
            >
              <span>EXPLORE CAREERS</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
