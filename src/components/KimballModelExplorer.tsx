import React, { useState } from 'react';
import { Database, Filter, Layers, CheckCircle2, ArrowDown, ArrowRight } from 'lucide-react';

interface TableModel {
  name: string;
  type: 'fact' | 'dimension';
  description: string;
  fields: { name: string; type: string; isKey?: boolean }[];
  relationshipRule?: string;
  daxExample?: string;
}

const TABLES: TableModel[] = [
  {
    name: 'Fact_Investissements_PEPS',
    type: 'fact',
    description: 'Table de faits centrale consolidant les flux budgétaires, engagements financiers et décaissements opérationnels de SNCF Réseau.',
    fields: [
      { name: 'ID_Date_Cle', type: 'INT (FK)', isKey: true },
      { name: 'ID_Region_Cle', type: 'INT (FK)', isKey: true },
      { name: 'ID_Ligne_Cle', type: 'INT (FK)', isKey: true },
      { name: 'ID_Domaine_Cle', type: 'INT (FK)', isKey: true },
      { name: 'Montant_Alloue_EUR', type: 'DECIMAL(18,2)' },
      { name: 'Montant_Engage_EUR', type: 'DECIMAL(18,2)' },
      { name: 'Ecart_Budgetaire_EUR', type: 'DECIMAL(18,2)' }
    ],
    daxExample: `Total_Engage = SUM(Fact_Investissements_PEPS[Montant_Engage_EUR])\nEcart_% = DIVIDE([Total_Engage] - [Total_Alloue], [Total_Alloue])`
  },
  {
    name: 'Dim_Region',
    type: 'dimension',
    description: 'Dimension géographique intégrant la clé de sécurité pour le Row-Level Security (RLS) afin de cloisonner les accès par direction régionale.',
    fields: [
      { name: 'ID_Region_Cle', type: 'INT (PK)', isKey: true },
      { name: 'Code_Region', type: 'VARCHAR(10)' },
      { name: 'Nom_Region', type: 'VARCHAR(100)' },
      { name: 'Email_Responsable_RLS', type: 'VARCHAR(150)' }
    ],
    relationshipRule: 'Relation 1 à Plusieurs (1:N) vers la table de faits. Le filtre se propage de la dimension vers les faits.',
    daxExample: `[Email_Responsable_RLS] == USERPRINCIPALNAME()`
  },
  {
    name: 'Dim_Ligne_Ferroviaire',
    type: 'dimension',
    description: 'Dimension descriptive des axes ferroviaires (lignes RER, Transilien, corridors fret et grande vitesse).',
    fields: [
      { name: 'ID_Ligne_Cle', type: 'INT (PK)', isKey: true },
      { name: 'Code_Ligne_RFN', type: 'VARCHAR(20)' },
      { name: 'Nom_Ligne', type: 'VARCHAR(120)' },
      { name: 'Type_Trafic', type: 'VARCHAR(50)' }
    ],
    relationshipRule: 'Relation 1 à Plusieurs (1:N). Permet de ventiler les dépenses au kilomètre de voie ferrée.',
    daxExample: `CALCULATE([Total_Engage], Dim_Ligne[Type_Trafic] == "Voyageurs")`
  },
  {
    name: 'Dim_Domaine_Technique',
    type: 'dimension',
    description: 'Nomenclature des corps d’état techniques (Voies, Caténaires, Signalisation, Télécoms, Ouvrages d’art).',
    fields: [
      { name: 'ID_Domaine_Cle', type: 'INT (PK)', isKey: true },
      { name: 'Code_Domaine', type: 'VARCHAR(20)' },
      { name: 'Libelle_Domaine', type: 'VARCHAR(100)' }
    ],
    relationshipRule: 'Relation 1 à Plusieurs (1:N). Évite toute ambiguïté de jointure entre corps d’état.',
    daxExample: `CALCULATE([Total_Engage], Dim_Domaine[Code_Domaine] == "VOIES")`
  },
  {
    name: 'Dim_Temps_Calendrier',
    type: 'dimension',
    description: 'Table de dates continue indispensable pour toutes les fonctions de Time Intelligence en DAX.',
    fields: [
      { name: 'ID_Date_Cle', type: 'INT (PK)', isKey: true },
      { name: 'Date_Jour', type: 'DATE' },
      { name: 'Annee', type: 'INT' },
      { name: 'Trimestre', type: 'VARCHAR(10)' },
      { name: 'Mois', type: 'VARCHAR(20)' }
    ],
    relationshipRule: 'Relation 1 à Plusieurs (1:N). Supporte les calculs YTD, MTD et comparaisons N-1.',
    daxExample: `Engage_YTD = TOTALYTD([Total_Engage], Dim_Temps[Date_Jour])`
  }
];

export const KimballModelExplorer: React.FC = () => {
  const [selectedTable, setSelectedTable] = useState<TableModel>(TABLES[0]);

  return (
    <div className="rounded-3xl bg-[#0B0F17] border border-white/[0.08] p-6 sm:p-8 text-slate-200 relative overflow-hidden">
      
      {/* Header sobre & humain */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.06]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-slate-400" />
            <h3 className="text-base sm:text-lg font-medium text-white">
              Explorateur de Modélisation Décisionnelle (Schéma en Étoile Kimball)
            </h3>
          </div>
          <p className="text-xs text-slate-400 font-normal leading-relaxed">
            Consultez la structure relationnelle déployée pour SNCF Réseau : une table de faits unifiée entourée de dimensions normalisées pour supprimer les ambiguïtés.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono bg-white/[0.03] px-3 py-1.5 rounded-xl border border-white/[0.06] text-slate-400 shrink-0">
          <Database className="w-3.5 h-3.5 text-slate-300" />
          <span>Star Schema Kimball</span>
        </div>
      </div>

      {/* Vue Visuelle des Tables */}
      <div className="pt-6 pb-6">
        <label className="text-xs text-slate-400 block mb-3 font-medium">
          Cliquez sur une table pour inspecter ses champs et la propagation du contexte de filtre :
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {TABLES.map((t) => {
            const isSelected = t.name === selectedTable.name;
            const isFact = t.type === 'fact';
            return (
              <button
                key={t.name}
                onClick={() => setSelectedTable(t)}
                className={`p-3.5 rounded-2xl text-left transition-all border flex flex-col justify-between min-h-[110px] ${
                  isSelected
                    ? 'bg-white text-slate-950 font-semibold shadow-sm border-white'
                    : 'bg-white/[0.03] text-slate-300 hover:bg-white/[0.06] border-white/[0.08]'
                }`}
              >
                <div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase tracking-wider inline-block mb-1.5 ${
                    isFact
                      ? isSelected ? 'bg-slate-950 text-white' : 'bg-white/10 text-slate-200'
                      : isSelected ? 'bg-slate-200 text-slate-800' : 'bg-white/5 text-slate-400'
                  }`}>
                    {isFact ? 'Table de Faits' : 'Dimension (1:N)'}
                  </span>
                  <div className="text-xs font-semibold leading-snug break-words">
                    {t.name}
                  </div>
                </div>

                <div className={`text-[10px] font-mono ${isSelected ? 'text-slate-600' : 'text-slate-400'}`}>
                  {t.fields.length} champs
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Détail de la table sélectionnée */}
      <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/[0.08] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/[0.06]">
          <div>
            <span className="text-xs font-bold text-white block">
              {selectedTable.name}
            </span>
            <p className="text-xs text-slate-400 font-normal mt-0.5">
              {selectedTable.description}
            </p>
          </div>
          {selectedTable.relationshipRule && (
            <div className="text-[11px] font-mono text-slate-300 bg-white/[0.04] px-2.5 py-1 rounded-lg border border-white/[0.06]">
              {selectedTable.relationshipRule}
            </div>
          )}
        </div>

        {/* Liste des champs */}
        <div>
          <span className="text-xs text-slate-400 block mb-2 font-medium">
            Structure des attributs & clés de jointure :
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
            {selectedTable.fields.map((f, i) => (
              <div key={i} className="flex items-center justify-between p-2 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <span className={`font-medium ${f.isKey ? 'text-white' : 'text-slate-300'}`}>
                  {f.name}
                </span>
                <span className="text-[11px] text-slate-500">
                  {f.type}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Exemple de mesure DAX */}
        {selectedTable.daxExample && (
          <div className="pt-2">
            <span className="text-xs text-slate-400 block mb-1.5 font-medium">
              Mesure DAX associée :
            </span>
            <pre className="text-xs font-mono text-slate-300 bg-slate-950 p-3 rounded-xl border border-white/[0.06] overflow-x-auto leading-relaxed">
              {selectedTable.daxExample}
            </pre>
          </div>
        )}
      </div>

    </div>
  );
};
