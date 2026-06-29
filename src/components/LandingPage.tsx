import React, { useState, useEffect } from 'react';
import { Navbar } from './landing/Navbar';
import { Hero } from './landing/Hero';
import { HowItWorks } from './landing/HowItWorks';
import { ProgressionSystem } from './landing/ProgressionSystem';
import { DomainSection } from './landing/DomainSection';
import { ClassesSection } from './landing/ClassesSection';
import { StatsSection } from './landing/StatsSection';
import { Manifesto } from './landing/Manifesto';
import { FinalCTA } from './landing/FinalCTA';

export const LandingPage: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-accent selection:text-white">
      <Navbar scrolled={scrolled} scrollTo={scrollTo} />
      <Hero scrollTo={scrollTo} />
      <HowItWorks />
      <ProgressionSystem />
      <DomainSection />
      <ClassesSection />
      <StatsSection />
      <Manifesto />
      <FinalCTA />
    </div>
  );
};
