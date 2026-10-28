import React, { useState } from 'react';
import { Preloader } from './components/Preloader';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { TestimonialQuote } from './components/TestimonialQuote';
import { ServicesSection } from './components/ServicesSection';
import { InspirationBanner } from './components/InspirationBanner';
import { WhyQuantixBento } from './components/WhyQuantixBento';
import { CaseStudiesCarousel } from './components/CaseStudiesCarousel';
import { FAQSection } from './components/FAQSection';
import { CallToAction } from './components/CallToAction';
import { Footer } from './components/Footer';
import { CVModal } from './components/CVModal';

export const App: React.FC = () => {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [cvModalOpen, setCvModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#080C14] text-[#F3F4F6] selection:bg-slate-700 selection:text-white">
      {/* Preloader - Getting Ready in 100% (Screenshot 1) */}
      {!loadingComplete && (
        <Preloader onComplete={() => setLoadingComplete(true)} />
      )}

      {/* Navigation Bar (Screenshot 2) */}
      <Navbar onOpenCVModal={() => setCvModalOpen(true)} />

      {/* Main Sections */}
      <main>
        {/* Hero Section: We turn uncertainty into intelligence (Screenshot 2) */}
        <Hero onOpenCVModal={() => setCvModalOpen(true)} />

        {/* About Section: Quantix transforms uncertainty into intelligent advantage (Screenshot 3) */}
        <AboutSection onOpenCVModal={() => setCvModalOpen(true)} />

        {/* Testimonial Quote: Quantix transformed the way we make decisions (Screenshot 4) */}
        <TestimonialQuote />

        {/* Interactive Services Section: 1. AI Strategy, Data Engineering... (Screenshot 5) */}
        <ServicesSection />

        {/* Inspiration Banner: A data tracking starts here (Screenshot 6) */}
        <InspirationBanner />

        {/* Bento Grid: Built for Results, Chosen for Expertise (Screenshot 7) */}
        <WhyQuantixBento />

        {/* Case Studies Slider: Real Impact, Proven Results (Screenshot 8) */}
        <CaseStudiesCarousel />

        {/* FAQ Section: Category Filters & Smooth Accordions (Screenshot 9) */}
        <FAQSection />

        {/* Final CTA Banner: Ready to turn your data into a competitive advantage? (Screenshot 10) */}
        <CallToAction onOpenCVModal={() => setCvModalOpen(true)} />
      </main>

      {/* Footer (Screenshot 11) */}
      <Footer />

      {/* CV Modal for Resume viewing & printing */}
      <CVModal
        isOpen={cvModalOpen}
        onClose={() => setCvModalOpen(false)}
      />
    </div>
  );
};

export default App;
