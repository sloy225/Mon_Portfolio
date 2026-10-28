import React from 'react';
import { ArrowRight, CheckCircle2, Award, ShieldCheck, Zap } from 'lucide-react';
import { QuantixLogo } from './QuantixLogo';
import { PERSONAL_INFO } from '../data/portfolioData';

interface AboutSectionProps {
  onOpenCVModal?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenCVModal }) => {
  return (
    <section id="about" className="relative bg-white text-zinc-900 pt-20 pb-16 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Main 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20">
          
          {/* Left Column: Visual Card with Sphere & AO Nodes */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md aspect-square rounded-3xl bg-[#0F172A] p-8 flex items-center justify-center overflow-hidden shadow-2xl border border-slate-800 group">
              {/* Halftone texture inside card */}
              <div className="absolute inset-0 bg-halftone-pattern opacity-10 pointer-events-none" />
              
              {/* 3D Wireframe / Particle Sphere Visualization */}
              <div className="relative w-64 h-64 flex items-center justify-center">
                {/* Dotted Hemisphere Globe */}
                <div className="absolute inset-0 rounded-full border border-slate-700/60 flex items-center justify-center">
                  <div className="w-52 h-52 rounded-full border border-dashed border-slate-600/40 animate-[spin_60s_linear_infinite]" />
                  <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-slate-900 via-slate-800 to-slate-900/40 opacity-80" />
                </div>

                {/* Connected Node Logo Overlay */}
                <div className="relative z-10 scale-125 text-white/90 drop-shadow-[0_0_12px_rgba(255,255,255,0.25)]">
                  <QuantixLogo size={110} variant="outline" />
                </div>
              </div>

              {/* Floating Key Highlight Badge */}
              <div className="absolute bottom-6 left-6 right-6 px-4 py-2.5 rounded-2xl bg-slate-900/90 border border-slate-700/80 backdrop-blur-md flex items-center justify-between text-xs font-mono text-slate-300">
                <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <Zap className="w-3.5 h-3.5" /> 24h ➔ 1h
                </span>
                <span className="text-slate-400">Time-to-Reporting</span>
                <span className="text-white font-bold">SNCF Réseau</span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Copy en Français pour Recruteurs */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <span className="text-xs font-semibold tracking-wider uppercase text-zinc-400 mb-3">
              À Propos & Parcours
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-zinc-900 leading-tight mb-6">
              Transformer la complexité technique <br className="hidden sm:inline" />
              en <span className="font-semibold text-zinc-950">avantage décisionnel mesurable</span>
            </h2>

            <p className="text-base text-zinc-700 leading-relaxed mb-5 font-normal">
              Diplômé d’un <strong>Mastere Big Data & Intelligence Artificielle (Major de Promotion avec 19,25/20)</strong> et fort de <strong>3 années d'intervention au sein de SNCF Réseau</strong> (Projet PEPS via ALCYON-E), je conçois et industrialise des architectures décisionnelles robustes, de l'ingestion brute jusqu'au tableau de bord exécutif.
            </p>

            <p className="text-sm text-zinc-600 leading-relaxed mb-6">
              Mon approche allie une solide rigueur d'ingénierie (modélisation dimensionnelle <strong>Kimball</strong>, optimisation de requêtes SQL sur <strong>GCP BigQuery</strong> et <strong>Azure</strong>, gouvernance stricte <strong>Row-Level Security</strong>) avec la maîtrise opérationnelle des <strong>systèmes multi-agents IA et architectures RAG</strong> (CrewAI, LangChain, bases vectorielles).
            </p>

            <div className="w-full h-[1px] bg-zinc-200 mb-6" />

            {/* Points forts recruteurs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full mb-8 text-xs font-medium text-zinc-800">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>+20 dashboards Power BI critiques en production</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Traitement automatisé divisé de 24h à 1h</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Pratique éprouvée du cadre Agile / SAFe</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Disponible immédiatement (Mobilité IDF & Télétravail)</span>
              </div>
            </div>

            {/* Action Link */}
            {onOpenCVModal && (
              <button
                onClick={onOpenCVModal}
                className="group flex items-center gap-2 text-sm font-semibold text-zinc-900 hover:text-zinc-600 transition-colors"
              >
                <span>Consulter mon CV complet (Expériences & Diplômes)</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </button>
            )}
          </div>
        </div>

        {/* Bandeau Partenaires & Environnements Maîtrisés */}
        <div className="pt-8 border-t border-zinc-100 flex flex-col gap-4">
          <p className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 text-center">
            Environnements & Technologies Éprouvés en Production
          </p>

          <div className="flex flex-wrap items-center justify-around gap-8 md:gap-12 opacity-75 py-3">
            <div className="flex items-center gap-2 font-bold text-zinc-800 text-sm tracking-tight">
              <span className="w-2.5 h-2.5 rounded-full bg-zinc-600" />
              SNCF Réseau
            </div>
            <div className="flex items-center gap-2 font-semibold text-zinc-800 text-sm">
              <span className="w-2 h-2 rounded bg-zinc-600" />
              ALCYON-E Conseil
            </div>
            <div className="flex items-center gap-2 font-semibold text-zinc-800 text-sm">
              <span className="w-2.5 h-2.5 rounded-full border border-zinc-700" />
              Microsoft Power BI
            </div>
            <div className="flex items-center gap-2 font-semibold text-zinc-800 text-sm">
              <span className="w-2 h-2 rotate-45 bg-zinc-600" />
              Google Cloud BigQuery
            </div>
            <div className="flex items-center gap-2 font-semibold text-zinc-800 text-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-zinc-600" />
              Microsoft Azure
            </div>
            <div className="flex items-center gap-2 font-semibold text-zinc-800 text-sm">
              <span className="w-2.5 h-2.5 rounded border border-zinc-700" />
              CrewAI & RAG Vectoriel
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
