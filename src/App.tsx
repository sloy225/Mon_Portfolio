import React, { useState } from 'react';
import { Preloader } from './components/Preloader';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { TestimonialQuote } from './components/TestimonialQuote';
import { ServicesSection } from './components/ServicesSection';
import { TechEcosystemSection } from './components/TechEcosystemSection';
import { MethodologySection } from './components/MethodologySection';
import { InspirationBanner } from './components/InspirationBanner';
import { WhyQuantixBento } from './components/WhyQuantixBento';
import { CaseStudiesCarousel } from './components/CaseStudiesCarousel';
import { FAQSection } from './components/FAQSection';
import { CallToAction } from './components/CallToAction';
import { Footer } from './components/Footer';
import { CVModal } from './components/CVModal';
import { AppointmentModal } from './components/AppointmentModal';

export const App: React.FC = () => {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [cvModalOpen, setCvModalOpen] = useState(false);
  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#080C14] text-[#F3F4F6] selection:bg-slate-700 selection:text-white">
      {/* Preloader - Initialisation du profil 100% */}
      {!loadingComplete && (
        <Preloader onComplete={() => setLoadingComplete(true)} />
      )}

      {/* Navigation Bar */}
      <Navbar
        onOpenCVModal={() => setCvModalOpen(true)}
        onOpenAppointmentModal={() => setAppointmentModalOpen(true)}
      />

      {/* Main Sections */}
      <main>
        {/* Hero Section */}
        <Hero onOpenCVModal={() => setCvModalOpen(true)} />

        {/* Section À Propos & Vision */}
        <AboutSection onOpenCVModal={() => setCvModalOpen(true)} />

        {/* Témoignage Client SNCF Réseau */}
        <TestimonialQuote />

        {/* Domaines d'Intervention & Expertises */}
        <ServicesSection />

        {/* Laboratoire Technique Live & Graphe 3D (RAG Simulator, RLS Simulator, 3D Data Topology, Kimball, SQL, Optimisation) */}
        <TechEcosystemSection />

        {/* Démarche & Rigueur Méthodologique (4 étapes Agile / SAFe) */}
        <MethodologySection />

        {/* Bannière Rigueur & Vision */}
        <InspirationBanner />

        {/* Bento Grid: Pourquoi Choisir Mon Profil */}
        <WhyQuantixBento />

        {/* Carrousel Études de Cas & Projets (CrewAI & RAG Offline) */}
        <CaseStudiesCarousel />

        {/* FAQ Recrutement & Échange */}
        <FAQSection />

        {/* Bannière Contact & Prise de Rendez-vous */}
        <CallToAction
          onOpenCVModal={() => setCvModalOpen(true)}
          onOpenAppointmentModal={() => setAppointmentModalOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modale CV Interactif (3 onglets, A4, impression, détails) */}
      <CVModal
        isOpen={cvModalOpen}
        onClose={() => setCvModalOpen(false)}
      />

      {/* Modale Prise d'Entretien Express (15 min / 30-45 min / Conseil) */}
      <AppointmentModal
        isOpen={appointmentModalOpen}
        onClose={() => setAppointmentModalOpen(false)}
      />
    </div>
  );
};

export default App;
