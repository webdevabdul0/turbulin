import React, { useState } from 'react';
import { ArrowRight, Building2, Landmark, ShieldCheck, HeartPulse, ShoppingBag } from 'lucide-react';

const industries = [
  {
    id: 'communications',
    name: 'Communications',
    icon: Building2,
    description: 'Transforming telecom & digital service providers with agile billing, network intelligence, and customer experience platforms.',
    image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'banking',
    name: 'Banking & Financial Services',
    icon: Landmark,
    description: 'Empowering tier-1 banks and fintech leaders with secure core banking modernisations, AI risk engines, and frictionless digital payments.',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'public-sector',
    name: 'Public Sector',
    icon: ShieldCheck,
    description: 'Accelerating digital government services, e-citizen engagement, and high-security infrastructure for public sector institutions.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'health',
    name: 'Health',
    icon: HeartPulse,
    description: 'Modernising healthcare delivery, patient record interoperability, telehealth analytics, and HIPAA-compliant cloud systems.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'retail',
    name: 'Retail',
    icon: ShoppingBag,
    description: 'Connecting omnichannel commerce, AI supply chain forecasting, personalized loyalty engines, and modern point-of-sale setups.',
    image: 'https://images.unsplash.com/photo-1556742049-0a670f4a4591?auto=format&fit=crop&w=1200&q=80'
  }
];

export const IndustriesWeServe: React.FC = () => {
  const [activeTab, setActiveTab] = useState('banking');

  const activeIndustry = industries.find((i) => i.id === activeTab) || industries[1];

  return (
    <section id="industries" className="py-20 bg-slate-50 text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Block */}
        <div className="max-w-3xl mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight">
            Industries we serve
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed">
            We partner with global enterprises across industries to solve complex challenges through practical, scalable technology services aligned with a changing world.
          </p>
        </div>

        {/* Content Split: Left Navigation / Right Preview Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Vertical Selector */}
          <div className="lg:col-span-5 space-y-3">
            {industries.map((ind) => {
              const IconComp = ind.icon;
              const isActive = activeTab === ind.id;

              return (
                <button
                  key={ind.id}
                  onClick={() => setActiveTab(ind.id)}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-200 flex items-center justify-between border ${
                    isActive
                      ? 'bg-white border-purple-600 shadow-md text-slate-950 font-bold'
                      : 'bg-transparent border-transparent hover:bg-white/80 text-slate-600 font-medium'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <IconComp className={`w-5 h-5 ${isActive ? 'text-purple-600' : 'text-slate-400'}`} />
                    <span className="text-base sm:text-lg">{ind.name}</span>
                  </div>
                  {isActive && <span className="text-purple-600 text-sm font-bold">→</span>}
                </button>
              );
            })}

            <div className="pt-6">
              <a
                href="#contact"
                className="inline-flex items-center space-x-2 border border-slate-900 hover:bg-slate-900 hover:text-white text-slate-900 px-6 py-3 rounded-full text-xs font-bold tracking-wider transition-colors"
              >
                <span>LEARN MORE</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Image Feature */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-900 aspect-[4/3]">
              <img
                src={activeIndustry.image}
                alt={activeIndustry.name}
                className="w-full h-full object-cover opacity-90 transition-opacity duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent p-8 flex flex-col justify-end text-white">
                <span className="text-xs font-bold uppercase tracking-widest text-purple-400 mb-1">
                  INDUSTRY EXPERTISE
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold mb-2">
                  {activeIndustry.name}
                </h3>
                <p className="text-slate-200 text-sm max-w-lg leading-relaxed">
                  {activeIndustry.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
