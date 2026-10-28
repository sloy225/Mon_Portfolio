import React from 'react';
import { ArrowRight, ChevronDown, Download, Award, ShieldCheck, Zap } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroProps {
  onOpenCVModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCVModal }) => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-between pt-32 pb-12 px-6 overflow-hidden bg-[#080C14]"
    >
      {/* Background Halftone Matrix & Vignette sobre sans dégradé criard */}
      <div className="absolute inset-0 bg-halftone-pattern opacity-15 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(30,41,59,0.35),rgba(8,12,20,0.95))] pointer-events-none" />

      {/* Center Content */}
      <div className="relative z-10 max-w-4xl mx-auto my-auto text-center flex flex-col items-center">

        {/* Recruiter Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-slate-300 mb-6 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>En recherche active · Écoute opportunités CDI & Conseil</span>
        </div>

        {/* Main Hero Headline - En Français, percutant et professionnel */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-white mb-6 leading-[1.12]">
          Transformer la donnée complexe <br />
          en <span className="text-slate-400 font-normal">décision stratégique</span>
        </h1>

        {/* Subtitle professionnel */}
        <p className="text-base sm:text-lg text-slate-300 font-normal max-w-2xl mx-auto mb-4 leading-relaxed">
          {PERSONAL_INFO.title}
        </p>

        {/* Recruiter Trust Points */}
        <p className="text-xs sm:text-sm text-slate-400 font-mono max-w-2xl mx-auto mb-8 leading-relaxed">
          3 ans d'intervention chez <strong className="text-white font-semibold">SNCF Réseau</strong> (Projet PEPS) ·
          Major <strong className="text-white font-semibold">Master Big Data & IA (19,25/20)</strong> ·
          Modélisation dimensionnelle, SQL, Power BI & Systèmes Multi-Agents GenAI (RAG).
        </p>

        {/* 4 Métriques clés compactes pour recruteurs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full max-w-3xl mb-10">
          <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-center">
            <span className="text-lg sm:text-xl font-bold font-mono text-white block">3 Ans</span>
            <span className="text-[11px] text-slate-400 font-sans">SNCF Réseau (Grand Compte)</span>
          </div>
          <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-center">
            <span className="text-lg sm:text-xl font-bold font-mono text-emerald-400 block">24h ➔ 1h</span>
            <span className="text-[11px] text-slate-400 font-sans">Time-to-Reporting (-96%)</span>
          </div>
          <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-center">
            <span className="text-lg sm:text-xl font-bold font-mono text-white block">19,25/20</span>
            <span className="text-[11px] text-slate-400 font-sans">Major MSc Big Data & IA</span>
          </div>
          <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-center">
            <span className="text-lg sm:text-xl font-bold font-mono text-cyan-400 block">+20</span>
            <span className="text-[11px] text-slate-400 font-sans">Dashboards Power BI RLS</span>
          </div>
        </div>

        {/* Call to action buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={onOpenCVModal}
            className="quantix-pill-btn px-6 py-3.5 rounded-full text-xs sm:text-sm font-semibold text-white flex items-center gap-2 group shadow-lg"
          >
            <Download className="w-4 h-4 text-slate-300" />
            <span>Consulter / Télécharger le CV (PDF)</span>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </button>

          <a
            href="#case-studies"
            className="px-5 py-3.5 rounded-full text-xs sm:text-sm font-medium text-slate-400 hover:text-white transition-colors"
          >
            Voir mes Réalisations & Projets →
          </a>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <a
        href="#about"
        className="relative z-10 flex flex-col items-center gap-1.5 text-slate-400 hover:text-white transition-colors text-xs font-light tracking-wider select-none cursor-pointer pt-8"
      >
        <span>Découvrir mon profil</span>
        <ChevronDown className="w-4 h-4 animate-bounce text-slate-500" />
      </a>
    </section>
  );
};
