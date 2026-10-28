import React from 'react';
import { ShieldCheck, Compass, Database, Cpu, Globe2, BarChart2, Zap, Lock } from 'lucide-react';

export const WhyQuantixBento: React.FC = () => {
  return (
    <section id="why-hire-me" className="relative bg-white text-zinc-900 py-24 px-6 overflow-hidden border-t border-zinc-100">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-wider text-zinc-400 uppercase">
            Pourquoi Choisir Mon Profil
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-zinc-950 mt-3 mb-4 tracking-tight">
            Orienté Résultats, <br />
            <span className="font-semibold">Choisi pour l'Excellence Technique</span>
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 font-normal leading-relaxed">
            Je conçois des systèmes data & IA fiables, transparents et taillés pour la production — pas des démonstrateurs qui restent au placard.
          </p>
        </div>

        {/* 6-Card Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

          {/* Card 1: Wide Dark Card "Stratégie Orientée Impact & ROI" */}
          <div className="md:col-span-6 lg:col-span-5 rounded-3xl bg-[#0F172A] p-7 text-white relative overflow-hidden flex flex-col justify-between min-h-[320px] shadow-lg border border-slate-800 group">
            <div className="absolute inset-0 bg-gradient-to-t from-[#080C14] via-[#0F172A]/80 to-transparent pointer-events-none z-10" />
            <div className="absolute inset-0 bg-halftone-pattern opacity-10 pointer-events-none" />

            {/* Top Icon Badge */}
            <div className="relative z-20 w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center text-slate-300">
              <Compass className="w-4 h-4" />
            </div>

            {/* Bottom Content */}
            <div className="relative z-20">
              <h3 className="text-xl font-semibold text-white mb-2">
                Stratégie Orientée Impact & ROI
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Priorisation stricte des cas d'usage à fort retour sur investissement. Cadrage agile en collaboration étroite avec les directions métiers et chefs de projet.
              </p>
            </div>
          </div>

          {/* Card 2: Light Card "IA Responsable & Systèmes RAG" */}
          <div className="md:col-span-6 lg:col-span-3 rounded-3xl bg-zinc-50 p-7 text-zinc-900 relative overflow-hidden flex flex-col justify-between min-h-[320px] border border-zinc-200/80 shadow-sm group hover:border-zinc-300 transition-colors">
            <div className="w-9 h-9 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-zinc-700 shadow-sm">
              <Cpu className="w-4 h-4" />
            </div>

            {/* Center Topographic wireframe graphic */}
            <div className="my-auto py-2 flex items-center justify-center">
              <svg viewBox="0 0 120 120" className="w-24 h-24 text-zinc-300 animate-[spin_40s_linear_infinite]">
                <circle cx="60" cy="60" r="50" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3,3" />
                <ellipse cx="60" cy="60" rx="45" ry="25" fill="none" stroke="#64748B" strokeWidth="1.2" />
                <ellipse cx="60" cy="60" rx="35" ry="45" fill="none" stroke="currentColor" strokeWidth="0.8" />
                <circle cx="60" cy="60" r="6" fill="#0F172A" />
              </svg>
            </div>

            <div>
              <h3 className="text-base font-semibold text-zinc-950 mb-1">
                IA Responsable & RAG
              </h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Systèmes multi-agents maîtrisés, détection des hallucinations et conformité rigoureuse aux standards RGPD & IA Act.
              </p>
            </div>
          </div>

          {/* Card 3: Dark Card "Fondations Data Robustes" */}
          <div className="md:col-span-12 lg:col-span-4 rounded-3xl bg-[#0B111D] p-7 text-white relative overflow-hidden flex flex-col justify-between min-h-[320px] border border-slate-800 shadow-lg group">
            <div className="w-9 h-9 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-slate-300">
              <Database className="w-4 h-4" />
            </div>

            {/* 3D Glass Data Towers graphic */}
            <div className="my-auto py-2 flex items-center justify-center gap-3">
              <div className="w-12 h-24 rounded-lg bg-slate-800/80 border border-slate-700 flex flex-col justify-between p-1.5 opacity-80 group-hover:scale-105 transition-transform">
                <div className="h-1 bg-cyan-400/60 rounded" />
                <div className="h-1 bg-slate-600 rounded" />
                <div className="h-1 bg-slate-600 rounded" />
              </div>
              <div className="w-14 h-28 rounded-lg bg-slate-800 border border-slate-600 flex flex-col justify-between p-2 shadow-xl group-hover:scale-110 transition-transform">
                <div className="h-1.5 bg-emerald-400/80 rounded" />
                <div className="h-1 bg-slate-500 rounded" />
                <div className="h-1 bg-cyan-400/60 rounded" />
                <div className="h-1 bg-slate-600 rounded" />
              </div>
              <div className="w-12 h-20 rounded-lg bg-slate-800/80 border border-slate-700 flex flex-col justify-between p-1.5 opacity-80 group-hover:scale-105 transition-transform">
                <div className="h-1 bg-slate-500 rounded" />
                <div className="h-1 bg-slate-600 rounded" />
              </div>
            </div>

            <div>
              <h3 className="text-base font-semibold text-white mb-1">
                Fondations Data Robustes
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                Modélisation dimensionnelle Kimball, BigQuery & Azure. Des architectures décisionnelles taillées pour durer et évoluer sans dette technique.
              </p>
            </div>
          </div>

          {/* Card 4: Light/Dark Card "Haute Performance" */}
          <div className="md:col-span-6 lg:col-span-3 rounded-3xl bg-zinc-900 p-7 text-white relative overflow-hidden flex flex-col justify-between min-h-[260px] border border-zinc-800 shadow-md">
            <div className="w-9 h-9 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-emerald-400">
              <Zap className="w-4 h-4" />
            </div>

            <div className="my-auto py-2">
              <div className="text-3xl font-bold font-mono tracking-tight text-white mb-1">
                24h ➔ 1h
              </div>
              <p className="text-xs font-mono text-emerald-400">
                -96% Time-to-Reporting
              </p>
            </div>

            <div>
              <h3 className="text-base font-semibold text-white mb-1">
                Haute Performance
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Automatisation intégrale des flux d'ingestion et suppression de la latence de traitement sur les chaînes de reporting.
              </p>
            </div>
          </div>

          {/* Card 5: Wide Light Card "Architecture Cloud Évolutive" */}
          <div className="md:col-span-6 lg:col-span-5 rounded-3xl bg-zinc-50 p-7 text-zinc-900 relative overflow-hidden flex flex-col justify-between min-h-[260px] border border-zinc-200/80 shadow-sm">
            <div className="w-9 h-9 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-zinc-700 shadow-sm">
              <Globe2 className="w-4 h-4" />
            </div>

            <div className="my-auto py-2 flex items-center justify-center opacity-40">
              <div className="w-full h-16 bg-halftone-dark opacity-50" />
            </div>

            <div>
              <h3 className="text-base font-semibold text-zinc-950 mb-1">
                Architecture Cloud Évolutive
              </h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Consolidation multi-sources multi-formats sur Google Cloud Platform et Microsoft Azure avec haute disponibilité et résilience.
              </p>
            </div>
          </div>

          {/* Card 6: Gouvernance & Sécurité RLS */}
          <div className="md:col-span-12 lg:col-span-4 rounded-3xl bg-[#0F172A] p-7 text-white relative overflow-hidden flex flex-col justify-between min-h-[260px] border border-slate-800 shadow-lg">
            <div className="w-9 h-9 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-slate-300">
              <Lock className="w-4 h-4" />
            </div>

            <div className="my-auto py-2 flex items-center justify-center">
              <div className="grid grid-cols-4 gap-2 opacity-60">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className={`w-2 h-2 rounded-full ${i % 3 === 0 ? 'bg-cyan-400' : 'bg-slate-700'}`} />
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-base font-semibold text-white mb-1">
                Gouvernance & Sécurité RLS
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                Sécurisation Row-Level Security stricte des tableaux de bord Power BI pour cloisonner les accès selon les profils métiers et régions.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
