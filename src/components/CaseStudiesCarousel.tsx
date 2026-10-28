import React, { useRef, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, ExternalLink, Github, Sparkles, CheckCircle2, Cpu, Database, Bot } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';

export const CaseStudiesCarousel: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    const maxScroll = scrollWidth - clientWidth;
    setScrollProgress(maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const offset = 420;
    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -offset : offset,
      behavior: 'smooth'
    });
  };

  const caseStudies = [
    {
      id: 'crewai-prospection',
      tag: 'Multi-Agents IA · Offline',
      title: 'POC Prospection Commerciale CrewAI',
      description: 'Automatisation B2B avec 3 agents autonomes (Collecteur Wikipedia, Analyste opportunités & Rédacteur d’emails) et LLM local deepseek-r1 / Mistral via Ollama.',
      metric: '3 Agents · 100% Offline',
      tech: ['CrewAI', 'Ollama (deepseek-r1)', 'LiteLLM', 'Wikipedia API', 'Python'],
      visualType: 'agents',
      originalProject: PROJECTS[0]
    },
    {
      id: 'rag-doc-offline',
      tag: 'RAG Agentique · Local',
      title: 'RAG Documentaire Offline Agentique',
      description: 'Assistant documentaire Streamlit avec routeur décisionnel, FAISS, Ollama llama3.2:3b, mémoire conversationnelle et monitoring CPU/RAM en direct.',
      metric: 'FAISS · Multi-Formats · SQLite',
      tech: ['Streamlit', 'FAISS', 'Ollama (llama3.2)', 'LangChain', 'SQLite', 'psutil'],
      visualType: 'rag',
      originalProject: PROJECTS[1]
    },
    {
      id: 'sncf-bi',
      tag: 'Systèmes Décisionnels & BI',
      title: 'Reporting Financier & Décisionnel (SNCF Réseau)',
      description: 'Pilotage budgétaire des investissements d’État et financements UE via 20+ dashboards Power BI sécurisés (RLS, Kimball).',
      metric: 'Time-to-reporting 24h ➔ 1h',
      tech: ['Power BI', 'DAX Avancé', 'SQL BigQuery', 'Kimball', 'RLS'],
      visualType: 'chart',
      originalProject: PROJECTS[2]
    },
    {
      id: 'operational-optimization',
      tag: 'Data Engineering & Pipelines',
      title: 'Optimisation de Pipelines ETL & Réconciliation',
      description: 'Workflow automatisé d’ingestion et de croisement d’inventaires ferroviaires critiques avec tests de cohérence et conteneurisation Docker.',
      metric: '80% de temps économisé',
      tech: ['Python ETL', 'SQL Vectoriel', 'PostgreSQL', 'Docker'],
      visualType: 'grid',
      originalProject: PROJECTS[3]
    }
  ];

  return (
    <section id="case-studies" className="relative bg-white text-zinc-900 py-24 px-6 overflow-hidden border-t border-zinc-100">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-semibold tracking-wider text-zinc-400 uppercase">
              Études de Cas & Réalisations
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-zinc-950 mt-2 tracking-tight">
              Impact Mesurable, <br className="hidden sm:inline" />
              <span className="font-semibold">Résultats Éprouvés</span>
            </h2>
          </div>

          <a
            href="https://github.com/sloy225"
            target="_blank"
            rel="noopener noreferrer"
            className="self-start sm:self-auto px-5 py-2.5 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-semibold tracking-wide flex items-center gap-2 transition-all shadow-md group"
          >
            <span>Tous mes projets GitHub (sloy225)</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Carousel Container */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto no-scrollbar pb-6 scroll-smooth snap-x snap-mandatory"
        >
          {caseStudies.map((study) => (
            <div
              key={study.id}
              onClick={() => setSelectedProject(study.originalProject)}
              className="w-[300px] sm:w-[360px] md:w-[410px] shrink-0 snap-start rounded-3xl bg-[#0F172A] text-white p-7 flex flex-col justify-between min-h-[460px] relative overflow-hidden group cursor-pointer border border-slate-800 shadow-xl transition-all duration-300 hover:-translate-y-1.5"
            >
              {/* Background Halftone & Shading */}
              <div className="absolute inset-0 bg-halftone-pattern opacity-10 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080C14] via-[#0F172A]/90 to-transparent pointer-events-none" />

              {/* Top Tag & Pill Badge */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-[11px] font-medium bg-white/10 text-slate-300 backdrop-blur-md border border-white/10">
                  {study.tag}
                </span>
                <span className="text-xs font-mono text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-0.5 rounded-md border border-emerald-500/20">
                  {study.metric}
                </span>
              </div>

              {/* Center Abstract Visual / Wireframe */}
              <div className="my-auto py-6 flex items-center justify-center relative">
                {study.visualType === 'agents' && (
                  <div className="flex items-center gap-4 relative">
                    <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-600 flex flex-col items-center justify-center text-[10px] font-mono text-cyan-300">
                      <Bot className="w-4 h-4 mb-0.5" />
                      Wiki
                    </div>
                    <div className="w-6 h-[1.5px] bg-slate-600" />
                    <div className="w-14 h-14 rounded-2xl bg-cyan-950/80 border border-cyan-400/50 flex flex-col items-center justify-center text-[10px] font-mono text-cyan-200 shadow-lg">
                      <Cpu className="w-5 h-5 mb-0.5" />
                      Analyste
                    </div>
                    <div className="w-6 h-[1.5px] bg-slate-600" />
                    <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-600 flex flex-col items-center justify-center text-[10px] font-mono text-emerald-300">
                      <Bot className="w-4 h-4 mb-0.5" />
                      Email
                    </div>
                  </div>
                )}

                {study.visualType === 'rag' && (
                  <div className="w-52 h-28 flex flex-col items-center justify-center relative">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] font-mono text-slate-300">
                        DOCX/PDF
                      </span>
                      <span className="text-slate-500">➔</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40 text-[10px] font-mono text-emerald-300">
                        FAISS Index
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-500/30">
                        Ollama (llama3.2:3b)
                      </span>
                      <span className="text-slate-500">➔</span>
                      <span className="text-[10px] font-mono text-slate-300 bg-slate-800 px-2 py-0.5 rounded">
                        Streamlit UI
                      </span>
                    </div>
                  </div>
                )}

                {study.visualType === 'chart' && (
                  <div className="w-48 h-28 flex items-end justify-center gap-2">
                    {[40, 65, 55, 80, 95, 75, 110].map((h, i) => (
                      <div
                        key={i}
                        style={{ height: `${h}px` }}
                        className="w-4 rounded-t bg-gradient-to-t from-slate-700 to-cyan-400/80 group-hover:to-cyan-300 transition-colors"
                      />
                    ))}
                  </div>
                )}

                {study.visualType === 'grid' && (
                  <div className="grid grid-cols-4 gap-2 opacity-70">
                    {[...Array(16)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-4 h-4 rounded-sm ${
                          i % 5 === 0 ? 'bg-cyan-400' : 'bg-slate-800 border border-slate-700'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom Content & Meta */}
              <div className="relative z-10">
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {study.title}
                </h3>
                <p className="text-xs text-slate-300 font-normal leading-relaxed mb-4 line-clamp-2">
                  {study.description}
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/80">
                  {study.tech.slice(0, 4).map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400"
                    >
                      {t}
                    </span>
                  ))}
                  {study.tech.length > 4 && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 text-slate-500">
                      +{study.tech.length - 4}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Navigation & Slider Bar */}
        <div className="flex items-center justify-between pt-6 border-t border-zinc-100">
          <div className="w-48 sm:w-64 h-[2px] bg-zinc-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-zinc-900 transition-all duration-300 ease-out"
              style={{ width: `${Math.max(25, scrollProgress)}%` }}
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className="p-2 rounded-full border border-zinc-200 text-zinc-700 hover:bg-zinc-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Projet précédent"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className="p-2 rounded-full border border-zinc-200 text-zinc-700 hover:bg-zinc-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Projet suivant"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Project Modal Preview Complet & Détaillé */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#0F172A] text-white rounded-3xl p-6 sm:p-10 border border-slate-700 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 transition-colors"
              aria-label="Fermer"
            >
              ✕
            </button>

            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2 block">
              Projet & Architecture Technique · {selectedProject.category.toUpperCase()}
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              {selectedProject.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 font-mono mb-6">
              {selectedProject.subtitle}
            </p>

            <p className="text-sm text-slate-300 leading-relaxed mb-6 font-normal">
              {selectedProject.longDescription || selectedProject.description}
            </p>

            {/* Impact Metric Card */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Impact & Valeur ajoutée</span>
              <span className="text-xs sm:text-sm font-mono font-bold text-emerald-400">
                {selectedProject.impact}
              </span>
            </div>

            {/* Architecture Highlights Checklist */}
            {selectedProject.architectureHighlights && selectedProject.architectureHighlights.length > 0 && (
              <div className="mb-6">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                  Points Clés d'Architecture & Conception
                </h4>
                <div className="space-y-2">
                  {selectedProject.architectureHighlights.map((hl, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300 bg-white/[0.02] p-2.5 rounded-xl border border-white/[0.04]">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technologies */}
            <div className="mb-8">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2.5">
                Stack Technique
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.technologies.map((t, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-slate-300">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions: Direct GitHub Link */}
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-800">
              {selectedProject.githubUrl && (
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-200 text-slate-950 text-xs font-bold flex items-center gap-2 shadow-lg transition-all"
                >
                  <Github className="w-4 h-4" />
                  <span>Consulter le Code Source sur GitHub</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
