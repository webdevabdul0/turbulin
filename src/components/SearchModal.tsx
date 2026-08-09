import React, { useState } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const popularSearches = [
  'Generative AI Consulting',
  'Microsoft Inner Circle',
  'Core Banking Transformation',
  'Cloud Migration Services',
  'Confiz Acquisition',
  'Careers at Systems Limited'
];

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl shadow-2xl p-6 text-white relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Input */}
        <div className="flex items-center space-x-3 border-b border-slate-700 pb-4 pr-10">
          <Search className="w-6 h-6 text-indigo-400" />
          <input
            type="text"
            autoFocus
            placeholder="Search insights, services, solutions, news..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-lg text-white placeholder-slate-400 focus:outline-none"
          />
        </div>

        {/* Popular Searches / Results */}
        <div className="mt-6">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Popular Searches
          </div>
          <div className="flex flex-wrap gap-2">
            {popularSearches.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setQuery(item)}
                className="px-3 py-1.5 rounded-full bg-slate-800 hover:bg-indigo-600/30 hover:border-indigo-500 border border-slate-700 text-xs text-slate-200 transition-colors flex items-center space-x-1"
              >
                <span>{item}</span>
                <ArrowRight className="w-3 h-3 text-slate-400" />
              </button>
            ))}
          </div>
        </div>

        {/* Helper footer */}
        <div className="mt-8 pt-4 border-t border-slate-800 text-xs text-slate-500 flex justify-between items-center">
          <span>Press ESC or click close to dismiss</span>
          <span>Systems Limited AI Search</span>
        </div>
      </div>
    </div>
  );
};
