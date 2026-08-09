import React, { useState } from 'react';
import { InsightCard } from '../types';

const insightsData: InsightCard[] = [
  {
    id: '1',
    category: 'NEWSROOM',
    title: 'Systems Limited achieves the 2025 - 2026 Microsoft AI Business Solutions Inner Circle award',
    imageBg: 'bg-gradient-to-b from-purple-950 via-slate-900 to-slate-950',
    graphicType: 'inner-circle',
    link: '#'
  },
  {
    id: '2',
    category: 'NEWSROOM',
    title: 'Systems Limited Recognized as "Aspirant" for Banking IT Services in Everest Group\'s PEAK Matrix® Assessment',
    imageBg: 'bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-950',
    graphicType: 'prism',
    link: '#'
  },
  {
    id: '3',
    category: 'NEWSROOM',
    title: 'Systems Limited acquires Confiz to expand its global presence in North America and Europe',
    imageBg: 'bg-gradient-to-b from-slate-900 via-purple-950 to-slate-950',
    graphicType: 'infinity',
    link: '#'
  },
  {
    id: '4',
    category: 'CASE STUDY',
    title: 'Transforming IT service management for a global telecom firm',
    imageBg: 'bg-gradient-to-b from-indigo-950 via-slate-900 to-slate-950',
    graphicType: 'lotus',
    link: '#'
  },
  {
    id: '5',
    category: 'BLOG',
    title: 'The defining shift: What will power banking in 2026',
    imageBg: 'bg-gradient-to-b from-purple-950 via-slate-900 to-slate-950',
    graphicType: 'purple-grid',
    link: '#'
  },
  {
    id: '6',
    category: 'BLOG',
    title: 'Frontier firms: A strategic imperative for enterprise leadership in 2026',
    imageBg: 'bg-gradient-to-b from-blue-950 via-slate-900 to-slate-950',
    graphicType: 'network-nodes',
    link: '#'
  },
  {
    id: '7',
    category: 'BLOG',
    title: 'The 2026 Shift: Why Responsible AI is becoming every enterprise\'s priority',
    imageBg: 'bg-gradient-to-b from-teal-950 via-slate-900 to-slate-950',
    graphicType: 'cyan-waves',
    link: '#'
  },
  {
    id: '8',
    category: 'EBOOK',
    title: 'Innovating with Generative AI Advancing data analytics capabilities',
    imageBg: 'bg-gradient-to-b from-red-950 via-slate-900 to-slate-950',
    graphicType: '3d-terrain',
    link: '#'
  }
];

export const FeaturedInsights: React.FC = () => {
  const [filter, setFilter] = useState<string>('ALL');

  const filteredItems = filter === 'ALL'
    ? insightsData
    : insightsData.filter((item) => item.category === filter);

  const renderGraphic = (type: string) => {
    switch (type) {
      case 'inner-circle':
        return (
          <div className="w-full h-44 flex items-center justify-center relative overflow-hidden bg-purple-950/40">
            <div className="w-28 h-28 rounded-full border-2 border-purple-400/30 flex items-center justify-center relative animate-pulse">
              <div className="w-24 h-24 rounded-full border border-purple-300/50 flex flex-col items-center justify-center text-center p-2 bg-gradient-to-br from-purple-900/80 to-indigo-900/90 shadow-[0_0_30px_rgba(168,85,247,0.4)]">
                <span className="text-[10px] font-bold text-purple-200 tracking-wider">25 | 26</span>
                <span className="text-[11px] font-black uppercase text-white tracking-tighter leading-tight mt-0.5">INNER CIRCLE</span>
                <span className="text-[8px] text-purple-300 tracking-tighter">FOR MICROSOFT AI SOLUTIONS</span>
              </div>
            </div>
          </div>
        );
      case 'prism':
        return (
          <div className="w-full h-44 flex items-center justify-center relative overflow-hidden bg-slate-950">
            <svg viewBox="0 0 100 100" className="w-32 h-32 drop-shadow-[0_0_20px_rgba(99,102,241,0.5)]">
              <polygon points="50,15 85,80 15,80" fill="url(#prismGrad)" stroke="#a855f7" strokeWidth="1.5" />
              <polygon points="50,15 85,80 50,70" fill="rgba(168,85,247,0.3)" />
              <defs>
                <linearGradient id="prismGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#818cf8" />
                  <stop offset="50%" stopColor="#c084fc" />
                  <stop offset="100%" stopColor="#38bdf8" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        );
      case 'infinity':
        return (
          <div className="w-full h-44 flex items-center justify-center relative overflow-hidden bg-slate-950">
            <svg viewBox="0 0 120 70" className="w-36 h-24 drop-shadow-[0_0_20px_rgba(236,72,153,0.5)]">
              <path
                d="M 30,35 C 10,15 10,55 30,35 C 50,15 70,55 90,35 C 110,15 110,55 90,35 C 70,15 50,55 30,35 Z"
                fill="none"
                stroke="url(#infinityGrad)"
                strokeWidth="8"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="infinityGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f97316" />
                  <stop offset="50%" stopColor="#ec4899" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        );
      case 'lotus':
        return (
          <div className="w-full h-44 flex items-center justify-center relative overflow-hidden bg-slate-950">
            <div className="w-28 h-28 relative flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-xl"></div>
              <svg viewBox="0 0 100 100" className="w-24 h-24 relative z-10 text-cyan-300 drop-shadow-[0_0_15px_rgba(6,182,212,0.8)]">
                <path d="M50 20 C60 40 80 50 50 85 C20 50 40 40 50 20 Z" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M50 35 C65 50 85 60 50 85 C15 60 35 50 50 35 Z" fill="none" stroke="#a855f7" strokeWidth="1.5" />
                <circle cx="50" cy="50" r="6" fill="#67e8f9" />
              </svg>
            </div>
          </div>
        );
      case 'purple-grid':
        return (
          <div className="w-full h-44 flex items-center justify-center relative overflow-hidden bg-purple-950/60">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#a855f720_1px,transparent_1px),linear-gradient(to_bottom,#a855f720_1px,transparent_1px)] bg-[size:1rem_1rem]"></div>
            <div className="w-20 h-20 rounded-2xl bg-purple-600/30 border border-purple-400/50 backdrop-blur-md transform rotate-12 flex items-center justify-center shadow-2xl">
              <div className="w-10 h-10 rounded-lg bg-indigo-500/50 border border-indigo-300"></div>
            </div>
          </div>
        );
      case 'network-nodes':
        return (
          <div className="w-full h-44 flex items-center justify-center relative overflow-hidden bg-slate-950">
            <svg viewBox="0 0 100 100" className="w-32 h-32 text-blue-400">
              <line x1="20" y1="30" x2="50" y2="20" stroke="#3b82f6" strokeWidth="1.5" opacity="0.6" />
              <line x1="50" y1="20" x2="80" y2="40" stroke="#3b82f6" strokeWidth="1.5" opacity="0.6" />
              <line x1="20" y1="30" x2="40" y2="70" stroke="#3b82f6" strokeWidth="1.5" opacity="0.6" />
              <line x1="50" y1="20" x2="40" y2="70" stroke="#3b82f6" strokeWidth="1.5" opacity="0.6" />
              <line x1="80" y1="40" x2="70" y2="80" stroke="#3b82f6" strokeWidth="1.5" opacity="0.6" />
              <circle cx="20" cy="30" r="5" fill="#60a5fa" />
              <circle cx="50" cy="20" r="7" fill="#3b82f6" />
              <circle cx="80" cy="40" r="6" fill="#93c5fd" />
              <circle cx="40" cy="70" r="8" fill="#2563eb" />
              <circle cx="70" cy="80" r="5" fill="#60a5fa" />
            </svg>
          </div>
        );
      case 'cyan-waves':
        return (
          <div className="w-full h-44 flex items-center justify-center relative overflow-hidden bg-teal-950/80">
            <svg viewBox="0 0 100 60" className="w-full h-full opacity-80">
              <path d="M0 20 Q 25 5, 50 20 T 100 20" fill="none" stroke="#2dd4bf" strokeWidth="2" />
              <path d="M0 30 Q 25 15, 50 30 T 100 30" fill="none" stroke="#38bdf8" strokeWidth="2" />
              <path d="M0 40 Q 25 25, 50 40 T 100 40" fill="none" stroke="#818cf8" strokeWidth="2" />
            </svg>
          </div>
        );
      case '3d-terrain':
      default:
        return (
          <div className="w-full h-44 flex items-center justify-center relative overflow-hidden bg-slate-950">
            <div className="w-full h-full bg-gradient-to-t from-red-950 via-purple-900 to-slate-950 flex items-center justify-center">
              <svg viewBox="0 0 100 60" className="w-full h-full opacity-90">
                <path d="M0 50 L 20 20 L 40 40 L 60 10 L 80 45 L 100 25 L 100 60 L 0 60 Z" fill="url(#terrainGrad)" />
                <defs>
                  <linearGradient id="terrainGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#ef4444" />
                    <stop offset="50%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#0f172a" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        );
    }
  };

  return (
    <section id="insights" className="py-20 bg-slate-100 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title & Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-slate-300 pb-6">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-950">
              Featured insights
            </h2>
            <p className="text-slate-600 mt-2 text-base font-normal">
              Latest news, case studies, blogs, and industry insights driving global AI innovation.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 mt-6 md:mt-0">
            {['ALL', 'NEWSROOM', 'CASE STUDY', 'BLOG', 'EBOOK'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  filter === cat
                    ? 'bg-slate-950 text-white shadow'
                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 4-Column Grid matching screenshot layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <a
              key={item.id}
              href={item.link}
              className="group flex flex-col bg-slate-950 rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-slate-800 transform hover:-translate-y-1"
            >
              {/* Card Graphic Container */}
              <div className="relative">
                {renderGraphic(item.graphicType)}
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-grow justify-between bg-slate-900/90 text-white">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-purple-400 block mb-2">
                    {item.category}
                  </span>
                  <h3 className="text-base font-bold leading-snug group-hover:text-indigo-300 transition-colors line-clamp-3">
                    {item.title}
                  </h3>
                </div>

                <div className="mt-6 flex items-center text-xs font-bold text-slate-400 group-hover:text-white transition-colors">
                  <span>READ MORE</span>
                  <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
