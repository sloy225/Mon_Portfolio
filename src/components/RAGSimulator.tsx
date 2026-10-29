import React, { useState } from 'react';
import { Bot, Cpu, Database, Play, Sparkles, Check, Clock, HardDrive, RefreshCw, FileText } from 'lucide-react';

interface SimulationScenario {
  id: string;
  label: string;
  query: string;
  routerAction: string;
  routerReason: string;
  retrievalTime: string;
  generationTime: string;
  model: string;
  topK: number;
  sources: { title: string; score: number; excerpt: string }[];
  answer: string;
}

const SCENARIOS: SimulationScenario[] = [
  {
    id: 'procedure',
    label: 'Question sur une procédure métier',
    query: 'Quelle est la procédure de maintenance et de validation des actifs ferroviaires ?',
    routerAction: 'Recherche documentaire (RAG)',
    routerReason: 'La question porte sur le contenu des guides techniques. Le système va chercher les extraits précis avant de répondre.',
    retrievalTime: '0.04s (recherche FAISS)',
    generationTime: '0.48s (génération locale)',
    model: 'llama3.2:3b (modèle local 100% offline)',
    topK: 2,
    sources: [
      {
        title: 'Guide_Maintenance_Voies.pdf (page 14)',
        score: 0.94,
        excerpt: 'La vérification d’intégrité des traverses et du ballast doit faire l’objet d’un rapport de conformité hebdomadaire consigné sous GMAO...'
      },
      {
        title: 'Protocole_Controle_Qualite_SNCF.docx (page 8)',
        score: 0.89,
        excerpt: 'Toute anomalie de niveau 2 entraîne un gel préventif des circulations et l’émission automatique d’un ticket incident...'
      }
    ],
    answer: 'Selon la documentation technique indexée, la procédure exige un contrôle hebdomadaire consigné dans la GMAO. Toute anomalie de niveau 2 déclenche un protocole de sécurisation immédiat et une traçabilité automatique des interventions.'
  },
  {
    id: 'prospection',
    label: 'Scénario Multi-Agents (CrewAI)',
    query: 'Identifier les opportunités d’automatisation pour une entreprise ciblée',
    routerAction: 'Orchestration Multi-Agents B2B',
    routerReason: 'Démarche séquentielle collaborative : recherche d’informations Wikipedia ➔ analyse des opportunités ➔ rédaction de l’email.',
    retrievalTime: '0.01s (outil Wikipedia)',
    generationTime: '0.62s (modèle deepseek-r1)',
    model: 'deepseek-r1:1.5b via Ollama local',
    topK: 1,
    sources: [
      {
        title: 'Wikipedia API · Fiche entreprise cible',
        score: 0.98,
        excerpt: 'Groupe industriel opérant sur 14 sites logistiques avec flux ERP SAP hétérogènes et reportings décentralisés...'
      }
    ],
    answer: 'Rapport synthétisé par les 3 agents :\n1. Opportunité : Unification des flux ERP décentralisés vers un entrepôt BigQuery.\n2. Opportunité : Automatisation des reportings hebdomadaires via Power BI (-80% de temps).\n3. Email préparé : Courriel sur-mesure prêt à être relu et envoyé, sans aucune hallucination.'
  },
  {
    id: 'metadata',
    label: 'Vérifier l’état des documents',
    query: 'Combien de documents sont chargés et quel est l’état de l’index ?',
    routerAction: 'Consultation des métadonnées',
    routerReason: 'L’utilisateur demande un état du système : réponse instantanée via la base SQLite locale, sans solliciter le modèle de langage.',
    retrievalTime: '0.003s (requête SQLite)',
    generationTime: '0.01s (réponse directe)',
    model: 'Réponse système immédiate',
    topK: 0,
    sources: [],
    answer: '14 documents sont actuellement indexés (PDF, Word, Excel, présentations), découpés en 348 passages vectorisés avec nomic-embed-text. Base SQLite et mémoire locale prêtes.'
  }
];

export const RAGSimulator: React.FC = () => {
  const [activeScenario, setActiveScenario] = useState<SimulationScenario>(SCENARIOS[0]);
  const [isRunning, setIsRunning] = useState(false);
  const [step, setStep] = useState<number>(3);

  const runSimulation = (scenario: SimulationScenario) => {
    setActiveScenario(scenario);
    setIsRunning(true);
    setStep(1);

    setTimeout(() => {
      setStep(2);
      setTimeout(() => {
        setStep(3);
        setIsRunning(false);
      }, 350);
    }, 300);
  };

  return (
    <div className="rounded-3xl bg-[#0B0F17] border border-white/[0.08] p-6 sm:p-8 text-slate-200 relative overflow-hidden">
      
      {/* Header sobre & humain */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.06]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-slate-400" />
            <h3 className="text-base sm:text-lg font-medium text-white">
              Cas pratique : Recherche documentaire & Agents IA en local
            </h3>
          </div>
          <p className="text-xs text-slate-400 font-normal leading-relaxed">
            Observez comment l'assistant analyse une demande, extrait les passages fiables et formule une réponse claire sans jamais envoyer vos données sur le Cloud.
          </p>
        </div>

        {/* Empreinte matérielle modérée */}
        <div className="flex items-center gap-3 text-xs font-mono bg-white/[0.03] px-3.5 py-2 rounded-xl border border-white/[0.06] text-slate-400 shrink-0">
          <span>CPU : <strong>14%</strong></span>
          <span className="text-slate-600">·</span>
          <span>RAM : <strong>4.2 Go</strong></span>
          <span className="text-slate-600">·</span>
          <span className="text-slate-300">100% Hors-Ligne</span>
        </div>
      </div>

      {/* Sélection de scénarios concrets */}
      <div className="pt-6 pb-4">
        <label className="text-xs text-slate-400 block mb-2.5">
          Choisissez une question pour lancer la démonstration :
        </label>
        <div className="flex flex-wrap gap-2">
          {SCENARIOS.map((sc) => {
            const isSelected = sc.id === activeScenario.id;
            return (
              <button
                key={sc.id}
                onClick={() => runSimulation(sc)}
                disabled={isRunning}
                className={`px-3.5 py-2 rounded-xl text-xs transition-all flex items-center gap-2 ${
                  isSelected
                    ? 'bg-white text-slate-950 font-semibold shadow-sm'
                    : 'bg-white/[0.04] text-slate-300 hover:bg-white/[0.08] border border-white/[0.08]'
                }`}
              >
                <Play className={`w-3 h-3 ${isSelected ? 'fill-current text-slate-950' : 'text-slate-400'}`} />
                <span>{sc.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Requête sélectionnée */}
      <div className="mb-6">
        <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-white/[0.06] flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="text-slate-400 font-medium">Question posée :</span>
            <span className="text-white">« {activeScenario.query} »</span>
          </div>
          <button
            onClick={() => runSimulation(activeScenario)}
            disabled={isRunning}
            className="px-3 py-1 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-slate-300 text-xs flex items-center gap-1.5 transition-colors shrink-0"
          >
            <RefreshCw className={`w-3 h-3 ${isRunning ? 'animate-spin' : ''}`} />
            <span>Relancer</span>
          </button>
        </div>
      </div>

      {/* Les 3 étapes compréhensibles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mb-6">
        
        {/* Étape 1 */}
        <div className={`p-4 rounded-2xl border transition-all ${
          step >= 1 ? 'bg-slate-900/60 border-white/[0.12]' : 'bg-slate-900/20 border-white/[0.04] opacity-50'
        }`}>
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
            <span className="font-medium text-slate-300">1. Décision de l'assistant</span>
            <span className="text-[11px] font-mono text-slate-400">Étape validée</span>
          </div>
          <div className="text-xs font-semibold text-white mb-1">
            {activeScenario.routerAction}
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed font-normal">
            {activeScenario.routerReason}
          </p>
        </div>

        {/* Étape 2 */}
        <div className={`p-4 rounded-2xl border transition-all ${
          step >= 2 ? 'bg-slate-900/60 border-white/[0.12]' : 'bg-slate-900/20 border-white/[0.04] opacity-50'
        }`}>
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
            <span className="font-medium text-slate-300">2. Recherche dans les documents</span>
            <span className="text-[11px] font-mono text-slate-400">{activeScenario.retrievalTime}</span>
          </div>
          <div className="text-xs font-semibold text-white mb-1">
            Index local FAISS
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed font-normal">
            {activeScenario.sources.length > 0
              ? `${activeScenario.sources.length} passages pertinents identifiés dans le corpus.`
              : 'Résolu directement par les métadonnées de l\'index.'}
          </p>
        </div>

        {/* Étape 3 */}
        <div className={`p-4 rounded-2xl border transition-all ${
          step >= 3 ? 'bg-slate-900/60 border-white/[0.12]' : 'bg-slate-900/20 border-white/[0.04] opacity-50'
        }`}>
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
            <span className="font-medium text-slate-300">3. Réponse rédigée</span>
            <span className="text-[11px] font-mono text-slate-400">{activeScenario.generationTime}</span>
          </div>
          <div className="text-xs font-semibold text-white mb-1 truncate">
            {activeScenario.model}
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed font-normal">
            Synthèse en français, fondée exclusivement sur les sources.
          </p>
        </div>

      </div>

      {/* Passages sources & Réponse */}
      <div className="space-y-3.5">
        {activeScenario.sources.length > 0 && (
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
            <span className="text-xs text-slate-400 block mb-2 font-medium">
              Extraits documentaires retrouvés pour étayer la réponse :
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {activeScenario.sources.map((src, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-900/50 border border-white/[0.06] text-xs">
                  <div className="flex items-center justify-between text-slate-300 font-mono mb-1 text-[11px]">
                    <span className="text-white font-medium truncate">{src.title}</span>
                    <span className="text-slate-400">pertinence : {(src.score * 100).toFixed(0)}%</span>
                  </div>
                  <p className="text-slate-400 italic font-normal text-[11px] leading-relaxed">
                    « {src.excerpt} »
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Synthèse finale */}
        <div className="p-5 rounded-2xl bg-slate-900/70 border border-white/[0.08]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-white flex items-center gap-1.5">
              <span>Réponse formulée pour le collaborateur :</span>
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              ● Réponse vérifiée
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line font-normal">
            {activeScenario.answer}
          </p>
        </div>
      </div>

    </div>
  );
};
