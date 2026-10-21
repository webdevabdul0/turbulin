import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Carousel, Card } from './ui/apple-cards-carousel';
import type { Card as CardType } from './ui/apple-cards-carousel';
import { Eyebrow, SplitWords } from './ui/motion';
import { useGsapReveal } from '../hooks/useGsapReveal';

const services: CardType[] = [
  {
    category: 'Engineering',
    title: 'Product Engineering',
    description: 'End-to-end development for digital products — from architecture decisions to production deployments. We write clean, testable code that holds up under real-world pressure.',
    src: '/assets/services/glass/product-engineering-cube.jpg?v=2',
  },
  {
    category: 'Artificial Intelligence',
    title: 'AI & Intelligent Systems',
    description: 'We integrate machine learning, large language models, and automation into your product workflows — so your software adapts, learns, and reduces manual overhead over time.',
    src: '/assets/services/glass/ai-systems-card.jpg?v=1',
  },
  {
    category: 'Infrastructure',
    title: 'Cloud & Infrastructure',
    description: 'Scalable, cost-efficient cloud environments built for high availability. We architect systems that grow with demand and maintain reliability without constant firefighting.',
    src: '/assets/services/glass/cloud-infrastructure-card.jpg?v=1',
  },
  {
    category: 'Data',
    title: 'Data & Analytics',
    description: 'Structured pipelines and reporting layers that turn fragmented data into clear intelligence. We make sure the right numbers reach the right people at the right time.',
    src: '/assets/services/glass/data-analytics-card.jpg?v=1',
  },
  {
    category: 'Design',
    title: 'UX & Digital Design',
    description: 'Interface design that earns user trust through clarity and consistency. We translate complex workflows into experiences that feel obvious — nothing is more powerful than simple.',
    src: '/assets/services/glass/ux-design-card.jpg?v=1',
  },
  {
    category: 'Healthcare',
    title: 'Healthcare Technology',
    description: 'Compliant, specialist software for patient management, clinical workflows, and health data. We understand the regulatory nuance and move quickly without cutting corners.',
    src: '/assets/services/glass/healthcare-tech-card.jpg?v=1',
  },
];

export const OurServices: React.FC = () => {
  const cards = services.map((card, index) => (
    <Card key={card.title} card={card} index={index} />
  ));

  const headerRef = useGsapReveal<HTMLDivElement>({ stagger: 0.1 });

  return (
    <section
      id="services"
      className="py-24 lg:py-32"
      style={{ backgroundColor: 'var(--bg-light-2)', borderTop: '1px solid var(--border-light)' }}
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div ref={headerRef} className="flex items-end justify-between mb-4 gap-8 flex-wrap">
          <div className="space-y-5">
            <Eyebrow>Services</Eyebrow>
            <h2 style={{ fontFamily: 'var(--font)', color: 'var(--text-on-light)' }} className="text-4xl sm:text-5xl lg:text-[64px] font-normal leading-[1.04] tracking-tight">
              <SplitWords>What we build, and</SplitWords>{' '}
              <SplitWords gradient delay={0.2}>how we build it.</SplitWords>
            </h2>
          </div>
          <div data-reveal className="flex items-center gap-6">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase font-light transition-colors duration-200 hover:text-[#FF140A]"
              style={{ color: 'var(--text-muted-on-light)', fontFamily: 'var(--font)' }}
            >
              <span>Start a project</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Carousel — bleeds edge to edge */}
      <Carousel items={cards} />
    </section>
  );
};
