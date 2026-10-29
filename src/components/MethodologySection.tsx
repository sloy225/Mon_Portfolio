import React from 'react';
import { Compass, Database, BarChart2, CheckCircle2, RefreshCw } from 'lucide-react';

interface MethodStep {
  step: string;
  period: string;
  title: string;
  description: string;
  deliverables: string[];
}

const STEPS: MethodStep[] = [
  {
    step: "01",
    period: "Semaine 1",
    title: "Cadrage & Alignement Métier",
    description: "Comprendre les vrais enjeux avant d'écrire une ligne de code. Entretiens avec les directions opérationnelles, cartographie des sources de données et définition conjointe des indicateurs clés (KPIs).",
    deliverables: [
      "Matrice d'opportunités & ROI chiffré",
      "Spécifications fonctionnelles et dictionnaire des données",
      "Définition des règles de gestion et périmètres de sécurité"
    ]
  },
  {
    step: "02",
    period: "Semaines 2 — 3",
    title: "Modélisation Kimball & Pipelines",
    description: "Conception du modèle décisionnel en étoile (Kimball) pour éviter les goulots d'étranglement. Écriture de requêtes SQL vectorisées et automatisation des flux sous BigQuery ou Azure.",
    deliverables: [
      "Schéma dimensionnel unifié (Faits & Dimensions 1:N)",
      "Pipelines d'ingestion automatisés avec gestion des erreurs",
      "Contrôles d'intégrité et de qualité des données (assertions)"
    ]
  },
  {
    step: "03",
    period: "Semaines 4 — 5",
    title: "Dashboards Power BI & Sécurité RLS",
    description: "Développement de tableaux de bord exécutifs intuitifs. Écriture de mesures DAX complexes (Time Intelligence), storytelling visuel et cloisonnement granulaire Row-Level Security.",
    deliverables: [
      "Tableaux de bord interactifs testés et optimisés",
      "Règles RLS actives par direction régionale et corps de métier",
      "Temps de réponse sub-seconde et ergonomie validée"
    ]
  },
  {
    step: "04",
    period: "En Continu",
    title: "Accompagnement, MCO & Transfert",
    description: "La donnée n'a de valeur que si elle est adoptée. Formation des collaborateurs, documentation technique complète et maintien en conditions opérationnelles (MCO).",
    deliverables: [
      "Ateliers de prise en main pour les décideurs métiers",
      "Guide de maintenance et documentation d'architecture",
      "Supervision des rafraîchissements et support applicatif réactif"
    ]
  }
];

export const MethodologySection: React.FC = () => {
  return (
    <section className="relative bg-[#080C14] text-slate-200 py-24 px-6 overflow-hidden border-t border-white/[0.06]">
      {/* Texture trame sobre */}
      <div className="absolute inset-0 bg-halftone-pattern opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-slate-400 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
            <span>Rigueur Méthodologique & Pratique SAFe / Agile</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight mb-3">
            Comment se déroule <br className="hidden sm:inline" />
            <span className="font-normal text-slate-300">une mission type de bout-en-bout</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-normal leading-relaxed">
            Une démarche itérative éprouvée sur des projets complexes chez SNCF Réseau, garantissant visibilité, respect des délais et adoption rapide par les équipes métiers.
          </p>
        </div>

        {/* 4 Étapes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {STEPS.map((s, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-[#0B0F17] border border-white/[0.06] flex flex-col justify-between min-h-[340px] hover:border-white/[0.12] transition-colors"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-3 pb-2 border-b border-white/[0.04]">
                  <span className="text-white font-bold">{s.step}</span>
                  <span>{s.period}</span>
                </div>

                <h3 className="text-base font-semibold text-white mb-2 leading-snug">
                  {s.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed font-normal mb-6">
                  {s.description}
                </p>
              </div>

              {/* Livrables */}
              <div className="pt-3 border-t border-white/[0.04] space-y-1.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block">
                  Livrables concrets :
                </span>
                {s.deliverables.map((d, dIdx) => (
                  <div key={dIdx} className="flex items-start gap-1.5 text-[11px] text-slate-300">
                    <span className="text-slate-500 font-bold">·</span>
                    <span className="leading-snug">{d}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
