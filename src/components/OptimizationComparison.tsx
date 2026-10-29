import React, { useState } from 'react';
import { ArrowRight, Clock, Check, AlertCircle, Zap, Shield, Database, RefreshCw } from 'lucide-react';

interface MetricComparison {
  title: string;
  before: string;
  after: string;
  improvement: string;
  explanation: string;
}

const COMPARISONS: MetricComparison[] = [
  {
    title: "Délai de calcul & mise à disposition",
    before: "24 heures de traitement nocturne",
    after: "Moins de 48 minutes d'exécution",
    improvement: "-96% de temps de traitement",
    explanation: "Remplacement de scripts séquentiels non optimisés par des requêtes vectorisées sur GCP BigQuery et des flux parallélisés."
  },
  {
    title: "Disponibilité des tableaux de bord",
    before: "Après 10h30 le matin (retards fréquents)",
    after: "Dès 06h00 automatisé chaque matin",
    improvement: "Prêt avant l'arrivée des directions",
    explanation: "Orchestration automatique des jobs d'ingestion avec alertes de complétion et déclenchement programmé du Power BI Service."
  },
  {
    title: "Fiabilité & Anomalies de réconciliation",
    before: "10 à 15 écarts manuels par mois",
    after: "0 anomalie non détectée",
    improvement: "Contrôles d'intégrité automatisés",
    explanation: "Mise en place d'assertions statistiques aux bornes (Data Quality checks) et journalisation systématique des rejets."
  },
  {
    title: "Gouvernance & cloisonnement des accès",
    before: "Fichiers Excel dupliqués par région",
    after: "Tableau unique sécurisé par Row-Level Security",
    improvement: "100% de conformité et traçabilité",
    explanation: "Un modèle de données unique (Kimball) où chaque directeur ne visualise que son périmètre sans duplication de fichiers."
  }
];

export const OptimizationComparison: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'comparison' | 'architecture'>('comparison');

  return (
    <div className="rounded-3xl bg-[#0B0F17] border border-white/[0.08] p-6 sm:p-8 text-slate-200 relative overflow-hidden">
      
      {/* Header sobre & humain */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.06]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-slate-400" />
            <h3 className="text-base sm:text-lg font-medium text-white">
              Retour d'expérience : La transformation du pipeline (24h ➔ 1h)
            </h3>
          </div>
          <p className="text-xs text-slate-400 font-normal leading-relaxed">
            Mesurer l'impact concret d'une refonte d'ingénierie : comparaison concrète entre l'ancien système et l'architecture industrialisée pour SNCF Réseau.
          </p>
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('comparison')}
            className={`px-3 py-1 rounded-lg transition-all ${
              activeTab === 'comparison'
                ? 'bg-white text-slate-950 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Vue Comparative
          </button>
          <button
            onClick={() => setActiveTab('architecture')}
            className={`px-3 py-1 rounded-lg transition-all ${
              activeTab === 'architecture'
                ? 'bg-white text-slate-950 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Leviers Techniques
          </button>
        </div>
      </div>

      {/* Tab 1: Vue Comparative directe */}
      {activeTab === 'comparison' && (
        <div className="pt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Colonne Avant */}
            <div className="p-5 rounded-2xl bg-white/[0.015] border border-white/[0.04] space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.04]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-slate-500" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Système Hérité (Avant mon intervention)
                  </span>
                </div>
                <span className="text-xs font-mono text-slate-500">Flux Legacy</span>
              </div>

              <div className="space-y-3.5 text-xs text-slate-400">
                <div className="p-3 rounded-xl bg-slate-900/30 border border-white/[0.02]">
                  <span className="text-slate-500 block mb-0.5 font-mono text-[11px]">Temps de traitement</span>
                  <span className="text-slate-300 font-medium text-sm">24 heures de traitement nocturne</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/30 border border-white/[0.02]">
                  <span className="text-slate-500 block mb-0.5 font-mono text-[11px]">Disponibilité des chiffres</span>
                  <span className="text-slate-300 font-medium text-sm">Après 10h30 le matin avec retards fréquents</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/30 border border-white/[0.02]">
                  <span className="text-slate-500 block mb-0.5 font-mono text-[11px]">Mode de distribution</span>
                  <span className="text-slate-300 font-medium text-sm">Multiplication de fichiers Excel et extractions manuelles</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/30 border border-white/[0.02]">
                  <span className="text-slate-500 block mb-0.5 font-mono text-[11px]">Gouvernance & Sécurité</span>
                  <span className="text-slate-300 font-medium text-sm">Absence de cloisonnement automatisé des accès régionaux</span>
                </div>
              </div>
            </div>

            {/* Colonne Après */}
            <div className="p-5 rounded-2xl bg-slate-900/50 border border-white/[0.08] space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-slate-300" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-white">
                    Architecture Déployée (Après optimisation)
                  </span>
                </div>
                <span className="text-xs font-mono text-slate-300 font-medium">Production Active</span>
              </div>

              <div className="space-y-3.5 text-xs text-slate-300">
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-slate-400 font-mono text-[11px]">Temps de traitement</span>
                    <span className="text-slate-300 font-mono font-semibold text-[11px]">-96%</span>
                  </div>
                  <span className="text-white font-medium text-sm">Moins de 48 minutes d'exécution automatisée</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-slate-400 font-mono text-[11px]">Disponibilité des chiffres</span>
                    <span className="text-slate-300 font-mono font-semibold text-[11px]">Zéro retard</span>
                  </div>
                  <span className="text-white font-medium text-sm">Dès 06h00 du matin, prêt pour les réunions de direction</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-slate-400 font-mono text-[11px]">Mode de distribution</span>
                    <span className="text-slate-300 font-mono font-semibold text-[11px]">Centralisé</span>
                  </div>
                  <span className="text-white font-medium text-sm">Power BI Service sécurisé, interactif et synchronisé</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-slate-400 font-mono text-[11px]">Gouvernance & Sécurité</span>
                    <span className="text-slate-300 font-mono font-semibold text-[11px]">RLS Native</span>
                  </div>
                  <span className="text-white font-medium text-sm">Cloisonnement Row-Level Security strict selon le rôle métier</span>
                </div>
              </div>
            </div>

          </div>

          {/* Synthèse Métier */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <span className="text-slate-400 font-normal">
              Bénéfice opérationnel mesuré auprès des directions utilisatrices :
            </span>
            <span className="text-slate-200 font-mono">
              Plus de 50 décideurs équipés · Précision budgétaire certifiée
            </span>
          </div>
        </div>
      )}

      {/* Tab 2: Leviers Techniques */}
      {activeTab === 'architecture' && (
        <div className="pt-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/[0.06]">
              <span className="text-xs font-mono font-bold text-white block mb-1">
                1. Modélisation en Étoile (Kimball)
              </span>
              <p className="text-xs text-slate-400 leading-relaxed font-normal">
                Remplacement de jointures relationnelles lourdes par une table de faits unifiée et des dimensions filtrantes indexées.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/[0.06]">
              <span className="text-xs font-mono font-bold text-white block mb-1">
                2. Requêtage SQL Vectorisé
              </span>
              <p className="text-xs text-slate-400 leading-relaxed font-normal">
                Déplacement des calculs d'agrégation directement sur l'infrastructure Cloud (BigQuery) pour supprimer les goulots d'étranglement locaux.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/[0.06]">
              <span className="text-xs font-mono font-bold text-white block mb-1">
                3. Tests de Cohérence Automatiques
              </span>
              <p className="text-xs text-slate-400 leading-relaxed font-normal">
                Assertions de qualité des données pour intercepter immédiatement les écarts budgétaires avant mise à disposition dans Power BI.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
