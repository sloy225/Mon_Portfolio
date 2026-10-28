import React from 'react';
import { ArrowRight, Mail, Download, Calendar } from 'lucide-react';
import { QuantixLogo } from './QuantixLogo';
import { PERSONAL_INFO } from '../data/portfolioData';

interface CallToActionProps {
  onOpenCVModal?: () => void;
}

export const CallToAction: React.FC<CallToActionProps> = ({ onOpenCVModal }) => {
  return (
    <section
      id="contact"
      className="relative py-32 px-6 bg-[#080C14] text-white overflow-hidden flex flex-col items-center justify-center text-center"
    >
      {/* Background Halftone & Shading sobre */}
      <div className="absolute inset-0 bg-halftone-pattern opacity-10 pointer-events-none" />
      
      {/* Ambient soft glow */}
      <div className="absolute w-[500px] h-[350px] rounded-full bg-slate-700/10 blur-[130px] pointer-events-none" />
      <div className="absolute w-[700px] h-[400px] rounded-full bg-slate-900/40 blur-[160px] pointer-events-none -z-10" />

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
        
        {/* Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-mono text-slate-300 mb-8 shadow-sm">
          <QuantixLogo size={16} className="text-white" />
          <span>Opportunités & Recrutement</span>
        </div>

        {/* Main Headline en Français */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light text-white leading-tight tracking-tight mb-6 max-w-2xl">
          Prêt à échanger sur vos <br />
          <span className="font-normal text-slate-200">défis Data & Intelligence Artificielle ?</span>
        </h2>

        <p className="text-sm sm:text-base text-slate-400 font-normal max-w-xl mx-auto mb-10 leading-relaxed">
          Je suis disponible immédiatement pour échanger autour de vos projets ou d'un poste en CDI. Organisons un premier échange technique.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <a
            href={`mailto:${PERSONAL_INFO.email}?subject=Proposition%20de%20Poste%20/%20Mission%20-%20Entretien%20Abdoul-Aziz`}
            className="quantix-pill-btn px-7 py-3.5 rounded-full text-xs sm:text-sm font-semibold text-white flex items-center gap-2.5 shadow-xl group"
          >
            <Mail className="w-4 h-4 text-slate-300 group-hover:text-white transition-colors" />
            <span>M'envoyer un message / Entretien</span>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </a>

          {onOpenCVModal && (
            <button
              onClick={onOpenCVModal}
              className="px-6 py-3.5 rounded-full text-xs sm:text-sm font-semibold text-slate-300 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-slate-400" />
              <span>Consulter mon CV (PDF)</span>
            </button>
          )}
        </div>

        {/* Direct Contact Meta */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-slate-400">
          <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:text-white transition-colors">
            📧 {PERSONAL_INFO.email}
          </a>
          <span>·</span>
          <a href={`tel:${PERSONAL_INFO.phone}`} className="hover:text-white transition-colors">
            📱 {PERSONAL_INFO.phoneFormatted}
          </a>
          <span>·</span>
          <span className="text-emerald-400">● {PERSONAL_INFO.availability}</span>
          <span>·</span>
          <span>📍 {PERSONAL_INFO.location}</span>
        </div>

      </div>
    </section>
  );
};
