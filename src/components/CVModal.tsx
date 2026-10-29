import React, { useState } from 'react';
import {
  X,
  Download,
  Printer,
  CheckCircle,
  Copy,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Award,
  Briefcase,
  GraduationCap,
  ExternalLink,
  Zap,
  Check,
  Sparkles,
  Layers,
  ChevronDown,
  ChevronUp,
  FileText
} from 'lucide-react';
import { PERSONAL_INFO, EXPERIENCES, EDUCATION_ITEMS, SKILL_GROUPS } from '../data/portfolioData';
import { QuantixLogo } from './QuantixLogo';

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CVModal: React.FC<CVModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'interactive' | 'skills' | 'executive' | 'printable'>('interactive');
  const [copied, setCopied] = useState<string | null>(null);
  const [expandedExp, setExpandedExp] = useState<string | null>('sncf-alcyon');

  if (!isOpen) return null;

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Modal Container */}
      <div
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#0B111D] border border-slate-700/80 shadow-2xl text-slate-200 flex flex-col no-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header with Mode Switcher & Actions */}
        <div className="sticky top-0 z-30 flex flex-wrap items-center justify-between gap-3 p-4 sm:px-8 bg-[#090D16]/95 backdrop-blur-xl border-b border-white/10">

          {/* Logo & Status */}
          <div className="flex items-center gap-2.5">
            <QuantixLogo size={24} className="text-white" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-bold text-white tracking-tight">
                  CURRICULUM VITAE · AO
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Disponible ASAP
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono hidden sm:block">
                Abdoul-Aziz OUEDRAOGO · MSc Big Data & IA (Mention Très Bien 19,25/20)
              </span>
            </div>
          </div>

          {/* Tab Selector */}
          <div className="flex flex-wrap items-center gap-1 p-1 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs">
            <button
              onClick={() => setActiveTab('interactive')}
              className={`px-2.5 sm:px-3 py-1 rounded-lg font-medium transition-all ${activeTab === 'interactive'
                  ? 'bg-white text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
                }`}
            >
              Expériences
            </button>
            <button
              onClick={() => setActiveTab('skills')}
              className={`px-2.5 sm:px-3 py-1 rounded-lg font-medium transition-all ${activeTab === 'skills'
                  ? 'bg-white text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
                }`}
            >
              Compétences
            </button>
            <button
              onClick={() => setActiveTab('executive')}
              className={`px-2.5 sm:px-3 py-1 rounded-lg font-medium transition-all ${activeTab === 'executive'
                  ? 'bg-white text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
                }`}
            >
              Synthèse Décideurs (1-Pager)
            </button>
            <button
              onClick={() => setActiveTab('printable')}
              className={`px-2.5 sm:px-3 py-1 rounded-lg font-medium transition-all ${activeTab === 'printable'
                  ? 'bg-white text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
                }`}
            >
              A4 Imprimable
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-xl text-xs font-medium bg-white/[0.06] hover:bg-white/[0.12] text-slate-300 border border-white/10 transition-colors flex items-center gap-1.5"
              title="Imprimer ou enregistrer au format PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Imprimer / PDF</span>
            </button>

            <a
              href={`mailto:${PERSONAL_INFO.email}?subject=Recrutement%20/%20Mission%20Data%20-%20Entretien%20Abdoul-Aziz`}
              className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-950 bg-white hover:bg-slate-200 transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contacter</span>
            </a>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors ml-1"
              aria-label="Fermer le CV"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">

          {/* Header Identity Card */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {PERSONAL_INFO.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                  Écoute CDI & Conseil
                </span>
              </div>
              <h2 className="text-sm sm:text-base font-semibold text-slate-300 font-mono">
                {PERSONAL_INFO.title}
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                {PERSONAL_INFO.subtitle}
              </p>
            </div>

            {/* Quick Contact & Copy pills */}
            <div className="flex flex-wrap md:flex-col gap-2 text-xs font-mono">
              <div className="flex items-center gap-2 text-slate-300 bg-white/[0.03] px-3 py-1.5 rounded-xl border border-white/[0.06]">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{PERSONAL_INFO.location}</span>
              </div>

              <div className="flex items-center gap-2 text-slate-300 bg-white/[0.03] px-3 py-1.5 rounded-xl border border-white/[0.06]">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:text-white underline">
                  {PERSONAL_INFO.email}
                </a>
                <button
                  onClick={() => handleCopy(PERSONAL_INFO.email, 'email')}
                  className="ml-auto text-slate-500 hover:text-white"
                  title="Copier l'adresse email"
                >
                  {copied === 'email' ? <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <div className="flex items-center gap-2 text-slate-300 bg-white/[0.03] px-3 py-1.5 rounded-xl border border-white/[0.06]">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <a href={`tel:${PERSONAL_INFO.phone}`} className="hover:text-white">
                  {PERSONAL_INFO.phoneFormatted}
                </a>
                <button
                  onClick={() => handleCopy(PERSONAL_INFO.phone, 'phone')}
                  className="ml-auto text-slate-500 hover:text-white"
                  title="Copier le numéro de téléphone"
                >
                  {copied === 'phone' ? <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>

          {/* TAB 1: Expériences & Parcours Interactifs */}
          {activeTab === 'interactive' && (
            <div className="space-y-6 animate-in fade-in duration-150">

              {/* Synthèse Métier */}
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-white" />
                  <span>Synthèse Opérationnelle & Valeur Ajoutée</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  Consultant Data & Analytics Engineer spécialisé dans la conception et l'industrialisation de solutions data de bout-en-bout.
                  Solide expertise de <strong>3 ans en mission Grand Compte chez SNCF Réseau</strong> sur la modélisation dimensionnelle (Kimball),
                  le développement de tableaux de bord décisionnels <strong>Power BI (DAX, RLS)</strong> et l'optimisation de requêtes <strong>SQL (BigQuery, Azure)</strong>,
                  ayant permis de diviser les temps de traitement de <strong>24h à 1h (-96%)</strong>.
                  Maîtrise opérationnelle des architectures modernes d'<strong>IA Générative (Agents CrewAI, RAG, FAISS, Vector DB)</strong> pour automatiser les tâches documentaires.
                </p>
              </div>

              {/* Expériences Accordion */}
              <div>
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-white" />
                    <span>Expériences Professionnelles Récentes</span>
                  </span>
                  <span className="text-[11px] font-normal text-slate-500">
                    Cliquer sur une mission pour déplier les réalisations
                  </span>
                </h3>

                <div className="space-y-3">
                  {EXPERIENCES.map((exp) => {
                    const isExpanded = expandedExp === exp.id;
                    return (
                      <div
                        key={exp.id}
                        className={`rounded-2xl border transition-all duration-200 overflow-hidden ${isExpanded
                            ? 'bg-slate-900/90 border-slate-700 shadow-lg'
                            : 'bg-white/[0.02] border-white/[0.06] hover:border-white/10'
                          }`}
                      >
                        {/* Header clickable */}
                        <div
                          onClick={() => setExpandedExp(isExpanded ? null : exp.id)}
                          className="p-5 cursor-pointer flex items-start justify-between gap-4"
                        >
                          <div>
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <h4 className="font-bold text-white text-sm sm:text-base">
                                {exp.role}
                              </h4>
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-white/10 text-slate-300">
                                {exp.company} {exp.client && `· ${exp.client}`}
                              </span>
                            </div>

                            <p className="text-xs text-slate-400 font-mono">
                              {exp.period} · {exp.location}
                            </p>
                          </div>

                          <div className="flex items-center gap-3 shrink-0">
                            {exp.impactMetric && (
                              <span className="hidden sm:inline-flex items-center gap-1 text-xs font-mono text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                                <Zap className="w-3.5 h-3.5" />
                                {exp.impactMetric}
                              </span>
                            )}
                            <button
                              className="p-1 rounded-lg bg-white/5 text-slate-400"
                              aria-label="Toggle details"
                            >
                              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>

                        {/* Expanded details */}
                        {isExpanded && (
                          <div className="px-5 pb-5 pt-1 border-t border-white/[0.06] animate-in fade-in duration-150">
                            <p className="text-xs sm:text-sm text-slate-300 mb-3 font-normal leading-relaxed">
                              {exp.description}
                            </p>

                            <div className="space-y-2 mb-4">
                              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                                Réalisations & Responsabilités Clés :
                              </span>
                              {exp.highlights.map((h, i) => (
                                <div key={i} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                                  <span>{h}</span>
                                </div>
                              ))}
                            </div>

                            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/[0.04]">
                              {exp.technologies.map((t) => (
                                <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/10">
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Formations & Diplômes */}
              <div>
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-white" />
                  <span>Formation Académique</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {EDUCATION_ITEMS.map((edu, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="font-bold text-white text-xs sm:text-sm">{edu.degree}</span>
                          <span className="text-xs font-mono text-emerald-400 font-semibold">{edu.period}</span>
                        </div>
                        <div className="text-xs text-slate-300 font-medium">{edu.institution}</div>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-2 font-normal leading-relaxed">
                        {edu.details}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: Compétences Détaillées */}
          {activeTab === 'skills' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SKILL_GROUPS.map((group, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Award className="w-4 h-4 text-white" />
                        <h4 className="font-bold text-white text-sm">
                          {group.category}
                        </h4>
                      </div>
                      <p className="text-xs text-slate-400 mb-4 leading-relaxed font-normal">
                        {group.description}
                      </p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-white/[0.06]">
                      {group.skills.map((skill, sIdx) => (
                        <div key={sIdx} className="flex items-center justify-between text-xs">
                          <span className="text-slate-300 font-medium">
                            {skill.name}
                          </span>
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${skill.highlight
                              ? 'bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20'
                              : 'bg-white/5 text-slate-400'
                            }`}>
                            {skill.level}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Synthèse Décideurs / One-Pager Recruteur */}
          {activeTab === 'executive' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              {/* Carte Chiffres & Enjeux */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 text-center sm:text-left">
                  <span className="text-2xl sm:text-3xl font-light text-white font-mono block mb-1">
                    3 ans
                  </span>
                  <span className="text-xs font-semibold text-slate-300 block mb-1">
                    Prestation SNCF Réseau
                  </span>
                  <p className="text-[11px] text-slate-400 font-normal leading-relaxed">
                    Pilotage décisionnel du projet PEPS, plus de 50 décideurs régionaux et nationaux équipés.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 text-center sm:text-left">
                  <span className="text-2xl sm:text-3xl font-light text-white font-mono block mb-1">
                    24h ➔ 48min
                  </span>
                  <span className="text-xs font-semibold text-slate-300 block mb-1">
                    Optimisation de Traitement
                  </span>
                  <p className="text-[11px] text-slate-400 font-normal leading-relaxed">
                    Refonte SQL et modèle en étoile : données disponibles dès 06h00 chaque matin avec 0 retard.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 text-center sm:text-left">
                  <span className="text-2xl sm:text-3xl font-light text-white font-mono block mb-1">
                    19,25 / 20
                  </span>
                  <span className="text-xs font-semibold text-slate-300 block mb-1">
                    Major Master Big Data & IA
                  </span>
                  <p className="text-[11px] text-slate-400 font-normal leading-relaxed">
                    Mention Très Bien, maîtrise combinée des fondations BI et des architectures agents LLM.
                  </p>
                </div>
              </div>

              {/* Critères RH & Disponibilité */}
              <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                  <span>Conditions d'Embauche & Disponibilité</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                    <span className="text-slate-500 block mb-0.5 font-mono text-[11px]">Disponibilité</span>
                    <span className="text-white font-medium">Immédiate (ASAP)</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                    <span className="text-slate-500 block mb-0.5 font-mono text-[11px]">Types de contrat</span>
                    <span className="text-white font-medium">CDI ou Conseil / ESN</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                    <span className="text-slate-500 block mb-0.5 font-mono text-[11px]">Localisation</span>
                    <span className="text-white font-medium">Île-de-France & Hybride</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                    <span className="text-slate-500 block mb-0.5 font-mono text-[11px]">Postes ciblés</span>
                    <span className="text-white font-medium">Data Analyst / Analytics Eng.</span>
                  </div>
                </div>
              </div>

              {/* Les 3 Réalisations Clés */}
              <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                  <span>3 Réalisations Majeures Prêtes pour Démonstration</span>
                </h3>

                <div className="space-y-2 text-xs">
                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-white font-semibold">1. Système Décisionnel PEPS (SNCF Réseau) :</span>
                      <p className="text-slate-400 text-[11px] mt-0.5 font-normal">
                        20+ tableaux de bord Power BI, sécurisation granulaire Row-Level Security par direction régionale, modélisation Kimball.
                      </p>
                    </div>
                    <span className="text-slate-300 font-mono text-[10px] shrink-0 bg-white/[0.05] px-2 py-1 rounded-md">Production</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-white font-semibold">2. Prospection Commerciale Multi-Agents CrewAI :</span>
                      <p className="text-slate-400 text-[11px] mt-0.5 font-normal">
                        3 agents coordonnés (Recherche, Analyse, Rédaction), LLM local offline (Ollama DeepSeek-R1), 0€ coût d'API.
                      </p>
                    </div>
                    <a
                      href="https://github.com/sloy225/AGENT-PROSPECTION-COMMERCIAL-CREWAI"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-300 hover:text-white font-mono text-[10px] shrink-0 bg-white/[0.05] hover:bg-white/[0.1] px-2 py-1 rounded-md flex items-center gap-1"
                    >
                      <span>Code GitHub</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-white font-semibold">3. RAG Documentaire Vectoriel Local :</span>
                      <p className="text-slate-400 text-[11px] mt-0.5 font-normal">
                        Moteur d'indexation vectorielle FAISS + LangChain, recherche sémantique avec citation de sources, respect strict RGPD.
                      </p>
                    </div>
                    <a
                      href="https://github.com/sloy225/rag-doc-offline"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-300 hover:text-white font-mono text-[10px] shrink-0 bg-white/[0.05] hover:bg-white/[0.1] px-2 py-1 rounded-md flex items-center gap-1"
                    >
                      <span>Code GitHub</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Actions directes Recruteur */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04] flex flex-wrap items-center justify-between gap-3 text-xs">
                <span className="text-slate-400">
                  Besoin d'intégrer ce résumé dans votre ATS ou dossier RH ?
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(`CANDIDAT : Abdoul-Aziz OUEDRAOGO (AO)\nPOSTE : Consultant Data Analyst & Analytics Engineer\nEXPÉRIENCE : 3 ans chez SNCF Réseau (Projet PEPS)\nDIPLÔME : Master Big Data & IA (Major 19,25/20)\nDISPONIBILITÉ : Immédiate (ASAP)\nLOCALISATION : Île-de-France (Hybride)\nCONTACT : ouedraogoaziz900@gmail.com | 07 43 01 02 85\nGITHUB : github.com/sloy225`, 'onepager')}
                    className="px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-slate-300 border border-white/10 transition-colors flex items-center gap-1.5"
                  >
                    {copied === 'onepager' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied === 'onepager' ? 'Résumé copié !' : 'Copier la fiche résumé'}</span>
                  </button>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}?subject=Entretien%20de%20recrutement%20-%20Abdoul-Aziz%20OUEDRAOGO`}
                    className="px-3.5 py-1.5 rounded-xl text-slate-950 bg-white hover:bg-slate-200 font-semibold transition-colors flex items-center gap-1.5"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Planifier un échange</span>
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Vue Synthétique A4 (ATS & Print Friendly) */}
          {activeTab === 'printable' && (
            <div className="p-8 rounded-2xl bg-white text-zinc-900 shadow-xl border border-zinc-200 animate-in fade-in duration-150 space-y-6">

              {/* Header A4 */}
              <div className="border-b border-zinc-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-zinc-950">
                    {PERSONAL_INFO.name}
                  </h2>
                  <p className="text-xs font-semibold uppercase tracking-wider text-zinc-600 mt-0.5">
                    {PERSONAL_INFO.title}
                  </p>
                  <p className="text-[11px] text-zinc-500 font-mono mt-1">
                    Major MSc Big Data & IA (19,25/20) · 3 ans en Prestation Grand Compte (SNCF Réseau)
                  </p>
                </div>

                <div className="text-xs font-mono text-zinc-600 space-y-0.5 text-right sm:text-right">
                  <div>{PERSONAL_INFO.email}</div>
                  <div>{PERSONAL_INFO.phoneFormatted}</div>
                  <div>{PERSONAL_INFO.location}</div>
                  <div className="text-emerald-700 font-semibold">{PERSONAL_INFO.availability}</div>
                </div>
              </div>

              {/* Synthèse */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-200 pb-1 mb-2">
                  Profil & Synthèse Opérationnelle
                </h3>
                <p className="text-xs text-zinc-700 leading-relaxed">
                  Consultant Data & Analytics Engineer intervenant sur toute la chaîne de valeur décisionnelle : modélisation en étoile (Kimball), conception et sécurisation de tableaux de bord Power BI critiques (DAX, RLS), optimisation de pipelines SQL (GCP BigQuery / Azure) ayant permis de diviser les temps de traitement de 24h à 1h chez SNCF Réseau. Spécialiste des systèmes multi-agents GenAI (CrewAI, LangChain, RAG vectoriel FAISS).
                </p>
              </div>

              {/* Expériences */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-200 pb-1 mb-3">
                  Expériences Professionnelles
                </h3>
                <div className="space-y-4">
                  {EXPERIENCES.map((exp) => (
                    <div key={exp.id}>
                      <div className="flex items-baseline justify-between text-xs font-bold text-zinc-900">
                        <span>{exp.role} — {exp.company} {exp.client && `(${exp.client})`}</span>
                        <span className="font-mono text-zinc-500 text-[11px]">{exp.period}</span>
                      </div>
                      <p className="text-[11px] text-emerald-700 font-mono font-semibold">
                        Impact : {exp.impactMetric}
                      </p>
                      <ul className="list-disc list-inside text-[11px] text-zinc-700 space-y-1 mt-1 leading-relaxed">
                        {exp.highlights.slice(0, 4).map((h, i) => (
                          <li key={i}>{h}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Formation */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-200 pb-1 mb-2">
                  Formation & Diplômes
                </h3>
                <div className="space-y-2 text-xs">
                  {EDUCATION_ITEMS.map((edu, idx) => (
                    <div key={idx} className="flex items-baseline justify-between">
                      <div>
                        <span className="font-bold text-zinc-900">{edu.degree}</span> — <span className="text-zinc-600">{edu.institution}</span>
                      </div>
                      <span className="font-mono text-zinc-500 text-[11px]">{edu.period}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Compétences Résumé */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-200 pb-1 mb-2">
                  Compétences Techniques & Environnements
                </h3>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-zinc-700">
                  <div><strong>BI & Décisionnel :</strong> Power BI (Desktop & Service), DAX Avancé, Kimball, RLS, Power Query.</div>
                  <div><strong>Data & Cloud :</strong> SQL Avancé, GCP BigQuery, Microsoft Azure, Python, PostgreSQL, Docker.</div>
                  <div><strong>IA Générative :</strong> Systèmes Multi-Agents (CrewAI, LangChain), RAG, FAISS, Ollama, FastAPI.</div>
                  <div><strong>Méthodes :</strong> SAFe, Agile / Scrum, Data Quality, Recueil de besoin métier, Conduite du changement.</div>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
