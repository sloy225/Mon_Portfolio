import React from 'react';
import { QuantixLogo } from './QuantixLogo';

export const TestimonialQuote: React.FC = () => {
  return (
    <section className="relative py-28 px-6 bg-[#080C14] overflow-hidden text-center flex flex-col items-center justify-center">
      {/* Texture trame discrète */}
      <div className="absolute inset-0 bg-halftone-pattern opacity-10 pointer-events-none" />

      {/* Filigrane géant discret du logo en arrière-plan */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <QuantixLogo
          size={380}
          variant="outline"
          className="text-slate-800/20 transform scale-150 select-none"
        />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
        {/* Guillemet typographique */}
        <span className="font-serif text-5xl sm:text-6xl text-slate-400/80 leading-none mb-4 select-none">
          “
        </span>

        {/* Citation / Recommandation Client en Français */}
        <blockquote className="text-xl sm:text-2xl md:text-3xl font-light text-white leading-snug tracking-tight mb-8">
          « Abdoul-Aziz a transformé notre chaîne décisionnelle : des reportings budgétaires fiabilisés, des requêtes optimisées et un temps de traitement divisé de 24h à 1h. Une rigueur technique exemplaire au service de nos projets. »
        </blockquote>

        {/* Attribution de mission */}
        <div className="flex flex-col items-center">
          <p className="text-sm font-semibold text-slate-300 tracking-wide">
            Direction de Projet & Pilotage des Investissements · SNCF Réseau
          </p>
          <span className="text-xs text-slate-400 font-mono mt-1">
            (Mission Conseil ALCYON-E · Projet PEPS)
          </span>
        </div>
      </div>
    </section>
  );
};
