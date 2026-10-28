import React from 'react';
import { ArrowUp } from 'lucide-react';
import { QuantixLogo } from './QuantixLogo';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="relative bg-[#060910] text-slate-400 pt-20 pb-12 px-6 overflow-hidden border-t border-white/[0.06]">
      {/* Texture trame */}
      <div className="absolute inset-0 bg-halftone-pattern opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/[0.06]">
          
          {/* Brand Logo & Name */}
          <div className="md:col-span-5 flex flex-col items-start">
            <a href="#hero" className="flex items-center gap-3 group mb-4">
              <QuantixLogo size={28} className="text-white group-hover:scale-105 transition-transform" />
              <span className="font-bold text-lg tracking-tight text-white">
                Abdoul-Aziz OUEDRAOGO
              </span>
            </a>
            <p className="text-xs text-slate-400 font-mono max-w-sm leading-relaxed mb-4">
              Consultant Data Analyst & Analytics Engineer · Spécialiste Power BI, SQL, Kimball & Architectures d'Agents IA (RAG).
            </p>
            <div className="text-xs text-emerald-400 font-mono flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Disponible immédiatement pour opportunités CDI</span>
            </div>
          </div>

          {/* Columns */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            
            {/* Column 1: Navigation */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-semibold text-white uppercase tracking-wider">
                Plan du Site
              </span>
              <a href="#about" className="text-xs text-slate-400 hover:text-white transition-colors">
                À propos de moi
              </a>
              <a href="#services" className="text-xs text-slate-400 hover:text-white transition-colors">
                Domaines d'expertise
              </a>
              <a href="#why-hire-me" className="text-xs text-slate-400 hover:text-white transition-colors">
                Pourquoi mon profil
              </a>
              <a href="#case-studies" className="text-xs text-slate-400 hover:text-white transition-colors">
                Réalisations & Projets
              </a>
              <a href="#faq" className="text-xs text-slate-400 hover:text-white transition-colors">
                FAQ Recrutement
              </a>
            </div>

            {/* Column 2: Formation & Rigueur */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-semibold text-white uppercase tracking-wider">
                Diplômes & Rigueur
              </span>
              <span className="text-xs text-slate-400">
                MSc Big Data & IA (Major 19,25/20)
              </span>
              <span className="text-xs text-slate-400">
                Licence Data & App Design
              </span>
              <span className="text-xs text-slate-500 font-mono">
                Modélisation Kimball
              </span>
              <span className="text-xs text-slate-500 font-mono">
                Gouvernance RLS
              </span>
            </div>

            {/* Column 3: Contact Recrutement */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-semibold text-white uppercase tracking-wider">
                Contact Direct
              </span>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="text-xs text-slate-300 hover:text-white transition-colors break-all"
              >
                {PERSONAL_INFO.email}
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-slate-300 hover:text-white transition-colors underline underline-offset-4"
              >
                Profil LinkedIn
              </a>
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-slate-400 hover:text-white transition-colors"
              >
                Dépôts GitHub
              </a>
              <a
                href={`tel:${PERSONAL_INFO.phone}`}
                className="text-xs text-slate-400 hover:text-white transition-colors font-mono"
              >
                {PERSONAL_INFO.phoneFormatted}
              </a>
            </div>

          </div>

        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-light text-slate-400">
          <p>
            © 2026 Abdoul-Aziz Ouedraogo (AO). Tous droits réservés.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors select-none group"
          >
            <span>Haut de page</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

      </div>
    </footer>
  );
};
