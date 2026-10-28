import React, { useState } from 'react';
import { Plus, Minus, Mail, Calendar } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface FAQItem {
  question: string;
  answer: string;
  category: 'contracts' | 'stack' | 'security' | 'general';
}

const FAQ_ITEMS: FAQItem[] = [
  {
    category: 'contracts',
    question: "Quel est votre préavis et votre disponibilité actuelle ?",
    answer: "Je suis disponible immédiatement (ASAP), sans aucun préavis à respecter. Je suis basé en Île-de-France (Neuilly-Plaisance, 93), titulaire du permis B, et mobile sur toute la région parisienne ainsi qu’en formule hybride ou full remote."
  },
  {
    category: 'contracts',
    question: "Quels types de postes et formats de collaboration étudiez-vous ?",
    answer: "Je suis principalement à l'écoute d'opportunités en CDI (Consultant Data Analyst, Analytics Engineer, Data Engineer ou Chef de Projet Décisionnel / IA) au sein d'entreprises utilisatrices ou de cabinets de conseil. J'étudie également les missions de conseil et d'expertise ciblée."
  },
  {
    category: 'stack',
    question: "Quels sont vos points forts par rapport à un profil Data traditionnel ?",
    answer: "La double casquette Décisionnel & IA Générative : 3 ans de rigueur grand compte chez SNCF Réseau (modélisation Kimball, DAX complexe, SQL BigQuery/Azure, sécurité RLS) combinés à une expertise de pointe issue de mon Mastere Big Data & IA (Major avec 19,25/20) sur les architectures multi-agents autonomes (CrewAI, LangChain) et les pipelines RAG."
  },
  {
    category: 'stack',
    question: "Comment s'est déroulée votre expérience chez SNCF Réseau ?",
    answer: "J'ai opéré pendant 3 ans sur le projet stratégique PEPS (pilotage financier et des investissements du réseau). J'ai notamment conçu plus de 20 tableaux de bord critiques, modélisé les schémas décisionnels, et automatisé la chaîne de calcul pour diviser le délai de génération des rapports de 24h à moins d'une heure."
  },
  {
    category: 'security',
    question: "Comment garantissez-vous la sécurité et la gouvernance des données ?",
    answer: "La sécurité est intégrée par conception : implémentation stricte du Row-Level Security (RLS) sur Power BI pour cloisonner les accès selon les rôles et régions, assertions de qualité des données (Data Quality), respect du RGPD et conformité aux exigences de l'IA Act européen."
  }
];

export const FAQSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'contracts' | 'stack' | 'security'>('all');
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const categories = [
    { id: 'all', label: 'Toutes les questions' },
    { id: 'contracts', label: 'Disponibilité & Contrats' },
    { id: 'stack', label: 'Stack & Méthodologie' },
    { id: 'security', label: 'Sécurité & Gouvernance' }
  ];

  const filteredItems = activeCategory === 'all'
    ? FAQ_ITEMS
    : FAQ_ITEMS.filter(item => item.category === activeCategory);

  const toggleAccordion = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="relative bg-white text-zinc-900 py-24 px-6 overflow-hidden border-t border-zinc-100">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Header & Category Pills */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
          <div>
            <span className="text-xs font-semibold tracking-wider text-zinc-400 uppercase">
              Recrutement & Échange
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-zinc-950 mt-1">
              Questions Fréquentes (FAQ)
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map(cat => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id as any);
                    setOpenIdx(null);
                  }}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-zinc-950 text-white shadow-sm'
                      : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Support Card */}
          <div className="lg:col-span-4">
            <div className="p-7 rounded-3xl bg-zinc-50 border border-zinc-200/80 shadow-sm flex flex-col justify-between min-h-[240px]">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-600 font-semibold block mb-2">
                  ● À l'écoute du marché
                </span>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-6 font-normal">
                  Vous souhaitez me proposer une opportunité en CDI ou organiser un entretien de qualification technique ? Échangeons directement.
                </p>
              </div>

              <a
                href={`mailto:${PERSONAL_INFO.email}?subject=Proposition%20Opportunit%C3%A9%20Data%20-%20Entretien%20Abdoul-Aziz`}
                className="w-full py-3 rounded-full border border-zinc-900 text-zinc-950 hover:bg-zinc-950 hover:text-white transition-all text-xs font-semibold text-center flex items-center justify-center gap-2 group"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Planifier un Entretien / M'écrire</span>
              </a>
            </div>
          </div>

          {/* Right Accordion List */}
          <div className="lg:col-span-8 flex flex-col divide-y divide-zinc-200">
            {filteredItems.map((item, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div key={idx} className="py-5">
                  <button
                    onClick={() => toggleAccordion(idx)}
                    className="w-full flex items-center justify-between gap-4 text-left group"
                  >
                    <span className="text-base sm:text-lg font-normal text-zinc-900 group-hover:text-zinc-600 transition-colors">
                      {item.question}
                    </span>
                    <span className="w-8 h-8 rounded-full bg-zinc-100 group-hover:bg-zinc-200 flex items-center justify-center text-zinc-900 shrink-0 transition-colors">
                      {isOpen ? (
                        <Minus className="w-4 h-4" />
                      ) : (
                        <Plus className="w-4 h-4" />
                      )}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="pt-4 pr-12 text-sm text-zinc-600 leading-relaxed font-normal animate-in fade-in duration-200">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
