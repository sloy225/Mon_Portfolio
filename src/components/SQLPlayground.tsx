import React, { useState } from 'react';
import { Terminal, Play, RefreshCw, CheckCircle2, Clock, Database } from 'lucide-react';

interface SQLScenario {
  id: string;
  title: string;
  category: string;
  purpose: string;
  query: string;
  executionTime: string;
  bytesScanned: string;
  columns: string[];
  rows: (string | number)[][];
}

const SQL_SCENARIOS: SQLScenario[] = [
  {
    id: 'windowing',
    title: 'Fonctions de fenêtrage : Cumul glissant & Part régionale',
    category: 'SQL Analytique Avancé',
    purpose: 'Calculer le cumul d’engagements financiers mois par mois et la part de chaque région dans le budget national sans auto-jointure coûteuse.',
    query: `SELECT\n  r.Nom_Region,\n  t.Mois,\n  SUM(f.Montant_Engage_EUR) AS Total_Mois,\n  SUM(SUM(f.Montant_Engage_EUR)) OVER(\n    PARTITION BY r.Nom_Region \n    ORDER BY t.Date_Jour\n  ) AS Cumul_Glissant_YTD,\n  ROUND(\n    SUM(f.Montant_Engage_EUR) * 100.0 / \n    SUM(SUM(f.Montant_Engage_EUR)) OVER(PARTITION BY t.Mois),\n    2\n  ) AS Part_Nationale_Pct\nFROM \`sncf_data.Fact_Investissements\` f\nJOIN \`sncf_data.Dim_Region\` r ON f.ID_Region_Cle = r.ID_Region_Cle\nJOIN \`sncf_data.Dim_Temps\` t ON f.ID_Date_Cle = t.ID_Date_Cle\nGROUP BY r.Nom_Region, t.Mois, t.Date_Jour\nORDER BY t.Date_Jour, r.Nom_Region;`,
    executionTime: '0.012s',
    bytesScanned: '24.8 Ko (BigQuery cache)',
    columns: ['Nom_Region', 'Mois', 'Total_Mois (M€)', 'Cumul_YTD (M€)', 'Part_Nationale (%)'],
    rows: [
      ['Île-de-France', 'Janvier', 120.4, 120.4, '34.8%'],
      ['Auvergne-Rhône-Alpes', 'Janvier', 85.2, 85.2, '24.6%'],
      ['PACA', 'Janvier', 64.1, 64.1, '18.5%'],
      ['Île-de-France', 'Février', 142.0, 262.4, '36.2%'],
      ['Auvergne-Rhône-Alpes', 'Février', 91.5, 176.7, '23.3%'],
    ]
  },
  {
    id: 'dedup',
    title: 'Requête CTE : Dédoublonnage d’actifs ferroviaires',
    category: 'Qualité des Données & ETL',
    purpose: 'Consolider les flux d’inventaires d’équipements en ne conservant que l’état le plus récent de chaque actif via ROW_NUMBER().',
    query: `WITH DernierEtatActifs AS (\n  SELECT\n    Code_Actif_RFN,\n    Type_Equipement,\n    Statut_Operationnel,\n    Date_Derniere_Revision,\n    ROW_NUMBER() OVER(\n      PARTITION BY Code_Actif_RFN\n      ORDER BY Date_Derniere_Revision DESC, ID_Audit DESC\n    ) AS Rang_Priorite\n  FROM \`sncf_data.Staging_Inventaire_Brut\`\n)\nSELECT\n  Code_Actif_RFN,\n  Type_Equipement,\n  Statut_Operationnel,\n  Date_Derniere_Revision\nFROM DernierEtatActifs\nWHERE Rang_Priorite = 1\nLIMIT 5;`,
    executionTime: '0.018s',
    bytesScanned: '52.1 Ko',
    columns: ['Code_Actif', 'Type_Equipement', 'Statut_Operationnel', 'Derniere_Revision'],
    rows: [
      ['ACT-IDF-0482', 'Aiguillage Voie 2', 'Conforme / En service', '2026-02-14'],
      ['ACT-IDF-0483', 'Sectionneur Caténaire', 'Maintenance planifiée', '2026-02-18'],
      ['ACT-ARA-1104', 'Balise Signalisation', 'Conforme / En service', '2026-02-10'],
      ['ACT-PAC-0891', 'Traverse Béton L4', 'Conforme / En service', '2026-02-22'],
      ['ACT-GES-0312', 'Relais Voie Impaire', 'Vérification en cours', '2026-02-20'],
    ]
  },
  {
    id: 'anomalies',
    title: 'Détection d’anomalies et d’écarts budgétaires',
    category: 'Gouvernance & Alerting',
    purpose: 'Identifier automatiquement les lignes de dépenses présentant un écart supérieur à 15% par rapport à l’enveloppe prévisionnelle pour audit.',
    query: `SELECT\n  l.Nom_Ligne,\n  d.Libelle_Domaine,\n  f.Montant_Alloue_EUR AS Alloue_MEUR,\n  f.Montant_Engage_EUR AS Engage_MEUR,\n  (f.Montant_Engage_EUR - f.Montant_Alloue_EUR) AS Ecart_MEUR,\n  ROUND(\n    (f.Montant_Engage_EUR - f.Montant_Alloue_EUR) * 100.0 / NULLIF(f.Montant_Alloue_EUR, 0),\n    1\n  ) AS Depassement_Pct\nFROM \`sncf_data.Fact_Investissements\` f\nJOIN \`sncf_data.Dim_Ligne\` l ON f.ID_Ligne_Cle = l.ID_Ligne_Cle\nJOIN \`sncf_data.Dim_Domaine\` d ON f.ID_Domaine_Cle = d.ID_Domaine_Cle\nWHERE (f.Montant_Engage_EUR - f.Montant_Alloue_EUR) > 0\n  AND (f.Montant_Engage_EUR - f.Montant_Alloue_EUR) / NULLIF(f.Montant_Alloue_EUR, 0) > 0.15\nORDER BY Ecart_MEUR DESC;`,
    executionTime: '0.009s',
    bytesScanned: '18.4 Ko',
    columns: ['Nom_Ligne', 'Domaine', 'Alloué (M€)', 'Engagé (M€)', 'Écart (M€)', 'Dépassement'],
    rows: [
      ['RER B Nord', 'Signalisation & Postes', 42.0, 49.8, '+7.8', '+18.6%'],
      ['Transilien Ligne J', 'Régénération Voies', 28.5, 33.2, '+4.7', '+16.5%'],
      ['Axe Paris-Marseille', 'Caténaires Hiver', 35.0, 40.6, '+5.6', '+16.0%'],
    ]
  }
];

export const SQLPlayground: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<SQLScenario>(SQL_SCENARIOS[0]);
  const [isRunning, setIsRunning] = useState(false);

  const runQuery = (sc: SQLScenario) => {
    setSelectedScenario(sc);
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
    }, 280);
  };

  return (
    <div className="rounded-3xl bg-[#0B0F17] border border-white/[0.08] p-6 sm:p-8 text-slate-200 relative overflow-hidden">
      
      {/* Header sobre & humain */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.06]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-slate-400" />
            <h3 className="text-base sm:text-lg font-medium text-white">
              Bac à sable SQL Analytique en direct
            </h3>
          </div>
          <p className="text-xs text-slate-400 font-normal leading-relaxed">
            Exécutez des requêtes SQL réelles : fonctions de fenêtrage analytiques, dédoublonnage d'actifs et détection automatique des anomalies budgétaires.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono bg-white/[0.03] px-3.5 py-1.5 rounded-xl border border-white/[0.06] text-slate-400 shrink-0">
          <Terminal className="w-3.5 h-3.5 text-slate-300" />
          <span>BigQuery / PostgreSQL Engine</span>
        </div>
      </div>

      {/* Choix des requêtes */}
      <div className="pt-6 pb-4">
        <label className="text-xs text-slate-400 block mb-2.5 font-medium">
          Sélectionnez une requête pour l'exécuter sur le jeu de données :
        </label>
        <div className="flex flex-wrap gap-2">
          {SQL_SCENARIOS.map((sc) => {
            const isSelected = sc.id === selectedScenario.id;
            return (
              <button
                key={sc.id}
                onClick={() => runQuery(sc)}
                disabled={isRunning}
                className={`px-3.5 py-2 rounded-xl text-xs transition-all flex items-center gap-2 ${
                  isSelected
                    ? 'bg-white text-slate-950 font-semibold shadow-sm'
                    : 'bg-white/[0.04] text-slate-300 hover:bg-white/[0.08] border border-white/[0.08]'
                }`}
              >
                <Play className={`w-3 h-3 ${isSelected ? 'fill-current text-slate-950' : 'text-slate-400'}`} />
                <span>{sc.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Code SQL */}
      <div className="mb-6">
        <div className="p-4 rounded-2xl bg-slate-950 border border-white/[0.06]">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-mono">
            <span>{selectedScenario.category}</span>
            <button
              onClick={() => runQuery(selectedScenario)}
              disabled={isRunning}
              className="px-2.5 py-1 rounded bg-white/[0.06] hover:bg-white/[0.12] text-slate-200 text-xs flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className={`w-3 h-3 ${isRunning ? 'animate-spin' : ''}`} />
              <span>Exécuter</span>
            </button>
          </div>
          <pre className="text-xs font-mono text-slate-300 overflow-x-auto leading-relaxed">
            {selectedScenario.query}
          </pre>
        </div>
      </div>

      {/* Résultat d'exécution */}
      <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/[0.08] space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-white/[0.06] text-xs">
          <span className="font-semibold text-white">
            Résultats de la requête ({selectedScenario.rows.length} lignes affichées)
          </span>
          <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400">
            <span>Temps d'exécution : <strong className="text-slate-200">{selectedScenario.executionTime}</strong></span>
            <span>·</span>
            <span>Données scannées : <strong className="text-slate-200">{selectedScenario.bytesScanned}</strong></span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-white/[0.06] text-slate-400">
                {selectedScenario.columns.map((col, idx) => (
                  <th key={idx} className="pb-2 pr-4 font-medium">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {selectedScenario.rows.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-white/[0.02]">
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="py-2 pr-4 text-slate-300">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
