import React from 'react';
import { Hero } from '../components/Hero';
import { StatsSection } from '../components/StatsSection';
import { OurServices } from '../components/OurServices';
import { ProjectsSection } from '../components/ProjectsSection';
import { TechnologyAlliances } from '../components/TechnologyAlliances';
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
      <ContactFormSection />
    </main>
    <Footer />
  </>
);
