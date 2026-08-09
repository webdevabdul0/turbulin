import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const awards = [
  {
    id: '1',
    partner: 'Red Hat',
    tagline: 'Enablement Champion of the Year - 2025',
    svgIcon: (
      <div className="flex items-center justify-center space-x-2 text-red-600 font-extrabold text-lg">
        <svg viewBox="0 0 100 30" className="w-24 h-8 fill-current">
          <path d="M 20,20 C 10,20 5,10 20,5 C 35,5 30,20 20,20 Z" fill="#e00" />
          <path d="M 15,12 C 10,12 10,18 20,18 C 30,18 30,12 15,12 Z" fill="#000" />
        </svg>
        <span>Red Hat</span>
      </div>
    )
  },
  {
    id: '2',
    partner: 'Huawei',
    tagline: 'Cloud Partner of the Year',
    svgIcon: (
      <div className="flex items-center justify-center space-x-2 text-red-500 font-bold text-lg">
        <svg viewBox="0 0 60 60" className="w-8 h-8 fill-current">
          <path d="M 30,5 C 20,15 20,40 30,55 C 40,40 40,15 30,5 Z" />
          <path d="M 10,20 C 20,25 35,45 25,55 C 10,45 5,30 10,20 Z" />
          <path d="M 50,20 C 40,25 25,45 35,55 C 50,45 55,30 50,20 Z" />
        </svg>
        <span className="tracking-widest text-slate-800">HUAWEI</span>
      </div>
    )
  },
  {
    id: '3',
    partner: 'Global BankTech Awards 2025',
    tagline: 'Outstanding Financial Technology Implementation by a global technology vendor',
    svgIcon: (
      <div className="border border-slate-300 rounded p-1 text-center bg-slate-50">
        <div className="text-[9px] uppercase font-bold text-slate-500">THE DIGITAL BANKER</div>
        <div className="text-[11px] font-black text-slate-900 tracking-tighter">GLOBAL BankTech AWARDS 2025</div>
      </div>
    )
  },
  {
    id: '4',
    partner: 'Microsoft Inner Circle',
    tagline: 'Among top global technology partners four times in a row',
    svgIcon: (
      <div className="w-12 h-12 rounded-full border border-indigo-400 bg-indigo-50 flex items-center justify-center mx-auto">
        <div className="text-[10px] font-black text-indigo-900">24 | 25</div>
      </div>
    )
  },
  {
    id: '5',
    partner: 'Global BankTech Awards',
    tagline: 'Outstanding Financial Technology Implementation',
    svgIcon: (
      <div className="border border-slate-300 rounded p-1 text-center bg-slate-50">
        <div className="text-[9px] uppercase font-bold text-slate-500">THE DIGITAL BANKER</div>
        <div className="text-[11px] font-black text-slate-900 tracking-tighter">BankTech AWARDS</div>
      </div>
    )
  }
];

export const AwardsSection: React.FC = () => {
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % awards.length);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + awards.length) % awards.length);
  };

  return (
    <section className="py-12 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {awards.map((award) => (
            <div
              key={award.id}
              className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all text-center flex flex-col items-center justify-between min-h-[160px]"
            >
              <div className="mb-3 w-full flex items-center justify-center h-12">
                {award.svgIcon}
              </div>
              <p className="text-xs text-slate-600 font-medium leading-snug line-clamp-2">
                {award.tagline}
              </p>
            </div>
          ))}
        </div>

        {/* Carousel controls indicator */}
        <div className="mt-6 flex items-center justify-end space-x-2 text-slate-400">
          <button
            onClick={handlePrev}
            aria-label="Previous award"
            className="p-1 hover:text-slate-800"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next award"
            className="p-1 hover:text-slate-800"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};
