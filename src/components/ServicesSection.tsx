import React, { useState } from 'react';
import { ArrowRight, ChevronRight, Check } from 'lucide-react';

interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  deliverables: string[];
  metrics: string;
}

const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'genai-strategy',
    number: '1.',
    title: 'Stratégie & Architectures GenAI',
    description:
      'Conception et déploiement d’écosystèmes d’agents IA collaboratifs et de pipelines RAG (Retrieval-Augmented Generation). Valorisation des données d’entreprise non structurées (PDF, contrats, documentations) avec modèles de fondation locaux ou Cloud.',
    deliverables: [
      "Systèmes Multi-Agents autonomes (CrewAI / LangChain)",
      "Recherche sémantique vectorielle (Vector DB / Chroma)",
      "Microservices IA haute performance sous FastAPI & Docker"
    ],
    metrics: "Automatisation de 85% du travail d'analyse documentaire"
  },
  {
    id: 'data-engineering',
    number: '2.',
    title: 'Data Engineering & Pipelines Cloud',
    description:
      'Ingénierie de données, conception de pipelines ETL/ELT résilients et modélisation d’entrepôts de données décisionnels sous Google Cloud Platform (BigQuery) et Microsoft Azure.',
    deliverables: [
      "Modélisation dimensionnelle Kimball (schémas en étoile & flocon)",
      "Requêtes SQL analytiques de haute performance (Fenêtrage, CTE)",
      "Automatisation de scripts Python & contrôles de qualité (Data Quality)"
    ],
    metrics: "Temps de traitement divisé de 24h à 1h (-96%)"
  },
  {
    id: 'bi-powerbi',
    number: '3.',
    title: 'Business Intelligence & Power BI',
    description:
      'Développement, optimisation et sécurisation de tableaux de bord Power BI critiques pour comités de direction et chefs de projets. Storytelling visuel et pilotage des investissements.',
    deliverables: [
      "Mesures DAX complexes (Time Intelligence, allocations dynamiques)",
      "Sécurité granulaire Row-Level Security (RLS) multi-rôles",
      "Gouvernance, déploiement sur Power BI Service et MCO"
    ],
    metrics: "+20 dashboards déployés pour 50+ décideurs SNCF"
  },
  {
    id: 'automation-systems',
    number: '4.',
    title: 'Automatisation & Systèmes Décisionnels',
    description:
      'Suppression des ruptures de charge manuelles et automatisation de la réconciliation d’actifs. Conception d’architectures modulaires conteneurisées avec alertes et journalisation structurée.',
    deliverables: [
      "Pipelines d’ingestion automatisés sans intervention humaine",
      "Conteneurisation Docker & intégration continue Git / CI-CD",
      "Détection statistique automatique des écarts et anomalies"
    ],
    metrics: "80% de temps économisé sur la réconciliation des actifs"
  },
  {
    id: 'machine-learning',
    number: '5.',
    title: 'Machine Learning & Analyse Prédictive',
    description:
      'Modélisation statistique supervisée, traitement du langage naturel (NLP) et développement d’interfaces interactives d’aide à la décision.',
    deliverables: [
      "Pipelines NLP avec vectorisation et embeddings sémantiques",
      "Benchmarking multi-modèles (Random Forest, Gradient Boosting)",
      "Interfaces interactives de test en production sous Streamlit"
    ],
    metrics: "Précision de classification supérieure à 91%"
  }
];

export const ServicesSection: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeService = SERVICES_DATA[activeIdx];

  // Coordinates for radar diagram morphing
  const radarConfigs = [
    { points: "150,50 220,100 210,180 150,230 90,190 70,110" },
    { points: "150,70 240,110 200,200 150,210 100,180 60,130" },
    { points: "150,60 210,90 230,190 150,240 80,180 90,100" },
    { points: "150,40 230,120 190,190 150,220 70,200 80,90" },
    { points: "150,55 220,105 220,175 150,235 85,185 75,105" }
  ];

  return (
    <section id="services" className="relative bg-white text-zinc-900 pt-20 pb-20 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="pb-8 mb-12 border-b border-zinc-200 flex items-center justify-between">
          <span className="text-xs font-semibold tracking-wider uppercase text-zinc-400">
            Domaines d'Intervention & Expertises
          </span>
          <span className="text-xs text-zinc-400 font-mono">
            0{activeIdx + 1} / 0{SERVICES_DATA.length}
          </span>
        </div>

        {/* 2-Column Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          {/* Left Column: Interactive Services Menu */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {SERVICES_DATA.map((service, idx) => {
              const isActive = idx === activeIdx;
              return (
                <button
                  key={service.id}
                  onClick={() => setActiveIdx(idx)}
                  className={`text-left transition-all duration-200 flex items-baseline gap-3 group py-2 ${
                    isActive
                      ? 'text-zinc-950 font-semibold translate-x-2'
                      : 'text-zinc-400 font-light hover:text-zinc-700'
                  }`}
                >
                  <span className={`text-base font-mono ${isActive ? 'text-zinc-900 font-bold' : 'text-zinc-300'}`}>
                    {service.number}
                  </span>
                  <span className={`text-2xl sm:text-3xl tracking-tight transition-colors ${
                    isActive ? 'text-zinc-900' : 'text-zinc-400'
                  }`}>
                    {service.title}
                  </span>
                  {isActive && (
                    <ChevronRight className="w-5 h-5 text-zinc-900 ml-auto shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Center Column: Radar / Geometric Wireframe SVG Diagram */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center relative">
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center">
              
              {/* Geometric Polygon Wireframe SVG */}
              <svg viewBox="0 0 300 300" className="w-full h-full text-zinc-300">
                <polygon
                  points="150,30 254,90 254,210 150,270 46,210 46,90"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray="2,3"
                  className="text-zinc-200"
                />
                <polygon
                  points="150,60 228,105 228,195 150,240 72,195 72,105"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-zinc-300"
                />
                <polygon
                  points="150,90 202,120 202,180 150,210 98,180 98,120"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-zinc-200"
                />

                {/* Axes */}
                <line x1="150" y1="30" x2="150" y2="270" stroke="currentColor" strokeWidth="1" className="text-zinc-200" />
                <line x1="46" y1="90" x2="254" y2="210" stroke="currentColor" strokeWidth="1" className="text-zinc-200" />
                <line x1="46" y1="210" x2="254" y2="90" stroke="currentColor" strokeWidth="1" className="text-zinc-200" />

                {/* Dynamic Data Polygon */}
                <polygon
                  points={radarConfigs[activeIdx].points}
                  fill="rgba(15, 23, 42, 0.05)"
                  stroke="#0F172A"
                  strokeWidth="2"
                  className="transition-all duration-500 ease-out"
                />

                {/* Center dot */}
                <circle cx="150" cy="150" r="3" fill="#0F172A" />
              </svg>

              {/* Floating Key Impact Tag */}
              <div className="absolute -bottom-4 bg-zinc-900 text-white text-[11px] font-mono px-3.5 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>{activeService.metrics}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Split: Action link on left & Contextual description on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 border-t border-zinc-100 items-start">
          <div className="lg:col-span-5">
            <a
              href="#case-studies"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-900 hover:text-zinc-600 transition-colors"
            >
              <span>Découvrir les réalisations associées</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-4">
            <p className="text-sm text-zinc-600 leading-relaxed font-normal">
              {activeService.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2">
              {activeService.deliverables.map((item, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-zinc-700 bg-zinc-50 p-2.5 rounded-xl border border-zinc-200/60">
                  <Check className="w-3.5 h-3.5 text-zinc-900 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
