import React, { useState } from 'react';
import { Shield, Lock, BarChart3, CheckCircle2 } from 'lucide-react';

interface RLSPersona {
  id: string;
  roleName: string;
  scope: string;
  rlsRule: string;
  daxMeasure: string;
  totalBudget: string;
  consumed: string;
  percentage: number;
  projectsCount: number;
  data: { label: string; budget: number; consumed: number }[];
}

const PERSONAS: RLSPersona[] = [
  {
    id: 'national',
    roleName: 'Direction Générale (Vue Nationale)',
    scope: 'Vision globale sur l’ensemble des investissements réseau France',
    rlsRule: 'Accès sans restriction géographique (Rôle Admin / Contrôle National)',
    daxMeasure: `CALCULATE(\n  [Total_Budget_Engage],\n  ALL(Dim_Region[Code_Region])\n)`,
    totalBudget: '4 250 M€',
    consumed: '3 890 M€',
    percentage: 91.5,
    projectsCount: 142,
    data: [
      { label: 'Île-de-France (Lignes & Hubs)', budget: 1480, consumed: 1390 },
      { label: 'Auvergne-Rhône-Alpes', budget: 920, consumed: 840 },
      { label: 'PACA & Axe Méditerranée', budget: 740, consumed: 680 },
      { label: 'Grand Est', budget: 610, consumed: 560 },
      { label: 'Occitanie', budget: 500, consumed: 420 },
    ]
  },
  {
    id: 'idf',
    roleName: 'Direction Régionale Île-de-France',
    scope: 'Données automatiquement restreintes aux lignes RER, Transilien et gares IDF',
    rlsRule: `Dim_Region[Code_Region] = "IDF" && Dim_Region[Email] = USERPRINCIPALNAME()`,
    daxMeasure: `// Règle de sécurité RLS appliquée automatiquement :\nDim_Region[Code_Region] == "IDF"`,
    totalBudget: '1 480 M€',
    consumed: '1 390 M€',
    percentage: 93.9,
    projectsCount: 48,
    data: [
      { label: 'RER B / D (Régénération des voies)', budget: 620, consumed: 590 },
      { label: 'Transilien (Signalisation PEPS)', budget: 490, consumed: 460 },
      { label: 'Pôles d’échanges & gares parisiennes', budget: 370, consumed: 340 },
    ]
  },
  {
    id: 'voies',
    roleName: 'Responsable Métier Travaux Voies',
    scope: 'Données restreintes au domaine technique des voies ferrées',
    rlsRule: `Dim_Domaine[Code_Domaine] = "VOIES"`,
    daxMeasure: `// Règle RLS par corps de métier :\nDim_Domaine[Code_Domaine] == "VOIES"`,
    totalBudget: '680 M€',
    consumed: '610 M€',
    percentage: 89.7,
    projectsCount: 22,
    data: [
      { label: 'Renouvellement ballast & traverses', budget: 340, consumed: 310 },
      { label: 'Appareils de voie & aiguillages', budget: 210, consumed: 190 },
      { label: 'Maintenance préventive des rails', budget: 130, consumed: 110 },
    ]
  }
];

export const RLSPowerBISimulator: React.FC = () => {
  const [activePersona, setActivePersona] = useState<RLSPersona>(PERSONAS[0]);

  return (
    <div className="rounded-3xl bg-[#0B0F17] border border-white/[0.08] p-6 sm:p-8 text-slate-200 relative overflow-hidden">
      
      {/* Header sobre & humain */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.06]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-slate-400" />
            <h3 className="text-base sm:text-lg font-medium text-white">
              Cas pratique : Cloisonnement sécurisé des données (RLS chez SNCF Réseau)
            </h3>
          </div>
          <p className="text-xs text-slate-400 font-normal leading-relaxed">
            Chaque responsable n'accède qu'aux données de son périmètre : changez de profil pour observer comment les chiffres et graphiques s'ajustent instantanément.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono bg-white/[0.03] px-3.5 py-2 rounded-xl border border-white/[0.06] text-slate-400 shrink-0">
          <Shield className="w-3.5 h-3.5 text-slate-300" />
          <span>Gouvernance Power BI Service</span>
        </div>
      </div>

      {/* Profil sélectionné */}
      <div className="pt-6 pb-4">
        <label className="text-xs text-slate-400 block mb-2.5">
          Simuler la consultation en tant que :
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {PERSONAS.map((persona) => {
            const isSelected = persona.id === activePersona.id;
            return (
              <button
                key={persona.id}
                onClick={() => setActivePersona(persona)}
                className={`p-3.5 rounded-2xl text-left transition-all border ${
                  isSelected
                    ? 'bg-white text-slate-950 font-semibold shadow-sm border-white'
                    : 'bg-white/[0.03] text-slate-300 hover:bg-white/[0.06] border-white/[0.08]'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-xs font-semibold leading-tight line-clamp-1">{persona.roleName}</span>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-slate-900 shrink-0" />}
                </div>
                <div className={`text-[11px] font-normal line-clamp-1 ${isSelected ? 'text-slate-600' : 'text-slate-400'}`}>
                  {persona.scope}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Règle active */}
      <div className="mb-6">
        <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="text-slate-400 font-medium">Règle de sécurité appliquée :</span>
            <span className="font-mono text-slate-200 bg-white/[0.05] px-2 py-0.5 rounded border border-white/[0.08]">
              {activePersona.rlsRule}
            </span>
          </div>
          <span className="text-slate-400 text-[11px] font-mono">
            {activePersona.projectsCount} projets visibles
          </span>
        </div>
      </div>

      {/* Indicateurs clés */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
          <span className="text-[11px] text-slate-400 block mb-1">
            Budget visible
          </span>
          <span className="text-xl font-medium text-white">
            {activePersona.totalBudget}
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
          <span className="text-[11px] text-slate-400 block mb-1">
            Dépenses engagées
          </span>
          <span className="text-xl font-medium text-slate-200">
            {activePersona.consumed}
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
          <span className="text-[11px] text-slate-400 block mb-1">
            Taux de consommation
          </span>
          <span className="text-xl font-medium text-slate-200">
            {activePersona.percentage}%
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
          <span className="text-[11px] text-slate-400 block mb-1">
            Délai d'affichage
          </span>
          <span className="text-xl font-medium text-slate-300">
            0.6s
          </span>
        </div>
      </div>

      {/* Graphique épuré et sobre */}
      <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/[0.06] mb-6">
        <div className="flex items-center justify-between text-xs text-slate-300 mb-4 pb-2 border-b border-white/[0.06]">
          <span className="font-medium flex items-center gap-1.5">
            <BarChart3 className="w-4 h-4 text-slate-400" />
            <span>Consommation budgétaire par ligne autorisée (en M€)</span>
          </span>
          <span className="text-[11px] text-slate-400">Modélisation Kimball en étoile</span>
        </div>

        <div className="space-y-3">
          {activePersona.data.map((item, i) => {
            const ratio = (item.consumed / item.budget) * 100;
            return (
              <div key={i} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-medium truncate">{item.label}</span>
                  <span className="text-slate-400 text-[11px] font-mono">
                    <strong className="text-white font-medium">{item.consumed} M€</strong> sur {item.budget} M€ ({ratio.toFixed(0)}%)
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden flex">
                  <div
                    style={{ width: `${ratio}%` }}
                    className="h-full bg-slate-300 transition-all duration-400 rounded-full"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Formule DAX */}
      <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
          <span>Logique DAX appliquée dans le modèle :</span>
          <span className="text-[11px] font-mono">Power BI Desktop & Service</span>
        </div>
        <pre className="text-xs font-mono text-slate-300 bg-slate-950 p-3 rounded-xl border border-white/[0.06] overflow-x-auto leading-relaxed">
          {activePersona.daxMeasure}
        </pre>
      </div>

    </div>
  );
};
