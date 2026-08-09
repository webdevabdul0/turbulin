import React from 'react';
import { Hero } from '../components/Hero';
import { StatsSection } from '../components/StatsSection';
import { OurServices } from '../components/OurServices';
import { ProjectsSection } from '../components/ProjectsSection';
import { TechnologyAlliances } from '../components/TechnologyAlliances';
import { CareersSection } from '../components/CareersSection';
import { ContactFormSection } from '../components/ContactFormSection';
import { Footer } from '../components/Footer';

export const HomePage: React.FC = () => (
  <>
    <main>
      <Hero />
      <StatsSection />
      <OurServices />
      <ProjectsSection />
      <TechnologyAlliances />
      <CareersSection />
      <ContactFormSection />
    </main>
    <Footer />
  </>
);
