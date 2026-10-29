import React, { useState } from 'react';
import { InteractiveDataGraph } from './InteractiveDataGraph';
import { RAGSimulator } from './RAGSimulator';
import { RLSPowerBISimulator } from './RLSPowerBISimulator';
import { Network, Bot, Shield } from 'lucide-react';

export const TechEcosystemSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'graph' | 'rag' | 'rls'>('graph');

  return (
    <section id="ecosystem" className="relative bg-[#080C14] text-slate-200 py-24 px-6 overflow-hidden border-t border-white/[0.06]">
      {/* Texture trame de fond discrète */}
      <div className="absolute inset-0 bg-halftone-pattern opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header - Ton humain, calme et professionnel */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-slate-400 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
              <span>Atelier & Démonstrations Pratiques</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight mb-2">
              Comprendre mes démarches <br className="hidden sm:inline" />
              <span className="font-normal text-slate-300">à travers des cas concrets</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl font-normal leading-relaxed">
              Une vision pragmatique de mon travail : découvrez comment s'articulent mes compétences, la recherche documentaire locale par IA et la sécurisation des reportings.
            </p>
          </div>

          {/* Sélecteur sobre et discret */}
          <div className="flex flex-wrap items-center gap-1.5 bg-white/[0.03] p-1.5 rounded-2xl border border-white/[0.06] self-start md:self-auto">
            <button
              onClick={() => setActiveTab('graph')}
              className={`px-3.5 py-2 rounded-xl text-xs transition-all flex items-center gap-2 ${
                activeTab === 'graph'
                  ? 'bg-white text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Network className="w-3.5 h-3.5" />
              <span>Cartographie 3D</span>
            </button>

            <button
              onClick={() => setActiveTab('rag')}
              className={`px-3.5 py-2 rounded-xl text-xs transition-all flex items-center gap-2 ${
                activeTab === 'rag'
                  ? 'bg-white text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Bot className="w-3.5 h-3.5" />
              <span>Recherche IA (RAG)</span>
            </button>

            <button
              onClick={() => setActiveTab('rls')}
              className={`px-3.5 py-2 rounded-xl text-xs transition-all flex items-center gap-2 ${
                activeTab === 'rls'
                  ? 'bg-white text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Sécurité Power BI (RLS)</span>
            </button>
          </div>
        </div>

        {/* Affichage de l'atelier sélectionné */}
        <div className="transition-all duration-300">
          {activeTab === 'graph' && (
            <div className="rounded-3xl border border-white/[0.06] overflow-hidden bg-[#0B0F17] shadow-xl p-2 sm:p-4">
              <InteractiveDataGraph />
            </div>
          )}

          {activeTab === 'rag' && (
            <RAGSimulator />
          )}

          {activeTab === 'rls' && (
            <RLSPowerBISimulator />
          )}
        </div>

      </div>
    </section>
  );
};
