import React from 'react';
import Hero from '../components/hero/Hero';
import AboutSection from '../sections/AboutSection';
import ResearchSection from '../sections/ResearchSection';
import ProjectsSection from '../sections/ProjectsSection';
import AISection from '../sections/AISection';
import TeamSection from '../sections/TeamSection';
import CommunitySection from '../sections/CommunitySection';
import ContactSection from '../sections/ContactSection';

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#F5F0E8] text-[#252922]">
      {/* 1. Asymmetric Editorial Hero */}
      <Hero />

      {/* 2. Core Architectural Manifesto */}
      <AboutSection />

      {/* 3. Deep Forest Green Feature Section: Research Disciplines */}
      <ResearchSection />

      {/* 4. Selected Work Case Studies: ONLY admin-added projects */}
      <ProjectsSection />

      {/* 5. Sandstone Interactive Systems Assistant */}
      <AISection />

      {/* 6. Founding Leadership */}
      <TeamSection />

      {/* 7. Community & Fellowship */}
      <CommunitySection />

      {/* 8. Direct Inquiries Transmission */}
      <ContactSection />
    </div>
  );
};

export default HomePage;
