import { MetricItem, ExperienceItem, ProjectItem, SkillGroup } from '../types';

export const PERSONAL_INFO = {
  name: "Abdoul-Aziz Ouedraogo",
  shortName: "Aziz",
  brandName: "ABD-AZIZ OUEDRAOGO",
  title: "Consultant Data Analyst & Analytics Engineer",
  subtitle: "Spécialiste Power BI, SQL & Architectures d'Agents IA (GenAI)",
  education: "Master Big Data & Intelligence Artificielle (Bac+5, Mention Très-bien 19,25/20)",
  experienceYears: "3 ans",
  mainClient: "SNCF Réseau (via ALCYON-E)",
  location: "Île-de-France (Neuilly-Plaisance, 93) · Mobilité Île-de-France / Télétravail",
  availability: "Disponible immédiatement",
  license: "Permis B",
  email: "ouedraogoabdoulaziz1960@gmail.com",
  phone: "+33 6 51 54 32 22",
  phoneFormatted: "06 51 54 32 22",
  linkedin: "https://www.linkedin.com/in/ouedraogoaaziz/",
  github: "https://github.com/sloy225",
  photo: "/Moi.png",
  logo: "/ao.png",
};

export const KEY_METRICS: MetricItem[] = [
  {
    value: "19.25 / 20",
    label: "Mention Très-Bien",
    sublabel: "Master Big Data & IA (Bac+5)",
    iconName: "GraduationCap",
    highlight: true,
  },
  {
    value: "24h ➔ 1h",
    label: "Optimisation de Pipeline",
    sublabel: "Time-to-Reporting divisé par 24",
    iconName: "Zap",
    highlight: true,
  },
  {
    value: "+20",
    label: "Dashboards en Production",
    sublabel: "Power BI sécurisés (RLS, MCO)",
    iconName: "LayoutDashboard",
  },
  {
    value: "3 Ans",
    label: "Conseil Grand Compte",
    sublabel: "SNCF Réseau / ALCYON-E",
    iconName: "ShieldCheck",
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "sncf-alcyon",
    role: "Consultant Data Analyst / Engineer (Prestation Grand Compte)",
    company: "ALCYON-E",
    client: "SNCF Réseau (Projet PEPS)",
    period: "Nov. 2023 — Oct. 2026",
    badge: "Mission Grand Compte · 3 ans",
    location: "Saint-Denis / Paris & Télétravail",
    description: "Orchestration, modélisation et industrialisation de la chaîne de valeur Data & BI pour le pilotage stratégique et opérationnel des investissements et de la performance réseau.",
    impactMetric: "Traitement des données réduit de 24h à 1h",
    highlights: [
      "Modélisation décisionnelle avancée selon l'approche Kimball (schémas en étoile et en flocon) pour consolider des flux financiers et opérationnels hétérogènes.",
      "Développement, optimisation et sécurisation de plus de 20 tableaux de bord Power BI critiques avec DAX complexe, Power Query et gouvernance Row-Level Security (RLS).",
      "Écriture et optimisation de requêtes SQL analytiques de haute performance sous environnements Cloud.",
      "Automatisation complète des flux d'ingestion et de transformation via scripts Python et SQL, réduisant le temps de génération des rapports de 24h à moins d'une heure.",
      "Mise en place de protocoles stricts de contrôle qualité des données, détection d'anomalies et maintien en conditions opérationnelles (MCO).",
      "Animation d'ateliers de cadrage métier, recueil du besoin auprès des directeurs de projets et collaboration en cadre agile SAFe / Scrum."
    ],
    technologies: [
      "Power BI",
      "DAX Avancé",
      "SQL (BigQuery/Azure)",
      "Kimball",
      "Python",
      "GCP BigQuery",
      "Microsoft Azure",
      "Power Query",
      "RLS",
      "SAFe / Agile"
    ]
  },
  {
    id: "dev-people",
    role: "Analyste Concepteur BDD & Développeur Data",
    company: "DEV PEOPLE",
    period: "Juil. 2021 — Juil. 2023",
    badge: "2 ans d'expérience",
    location: "Abidjan / Remote",
    description: "Conception architecturale de bases de données relationnelles, modélisation conceptuelle et développement d'APIs pour l'intégration de services applicatifs.",
    highlights: [
      "Modélisation conceptuelle, logique et physique de bases de données relationnelles via la méthode MERISE et PostgreSQL.",
      "Rédaction et optimisation de plus de 100 procédures et requêtes SQL complexes pour l'interrogation rapide de grands volumes de données.",
      "Développement de microservices et d'APIs REST pour la communication fluide entre les applications frontend et les entrepôts de données.",
      "Conception de scripts d'ingestion et d'extraction automatisée pour nettoyer et formater les données brutes avant chargement."
    ],
    technologies: [
      "PostgreSQL",
      "MERISE",
      "SQL Avancé",
      "API REST",
      "Python",
      "PHP / Laravel",
      "Git"
    ]
  }
];

export const PROJECTS: ProjectItem[] = [
  {
    id: "ai-agents-rag",
    title: "Architectures d’Agents IA & Vector DB (RAG)",
    subtitle: "Système Multi-Agents Autonomes & Recherche Sémantique Avancée",
    category: "ai",
    featured: true,
    period: "2026",
    description: "Conception et déploiement d'un écosystème d'agents IA collaboratifs capables de traiter des flux de données non structurées (PDF, contrats, documentations) et d'automatiser la prospection et l'analyse de documents.",
    longDescription: "Ce projet met en œuvre une architecture multi-agents orchestrée avec CrewAI et LangChain. Les agents se répartissent des rôles spécialisés (recherche, extraction sémantique, vérification de cohérence, synthèse décisionnelle). Le pipeline RAG intègre une base vectorielle (Vector DB) pour de la recherche par similarité cosinus avec embeddings de pointe, interfacé avec des modèles LLM locaux (Mistral via Ollama) et des APIs cloud, le tout exposé via une API haute performance FastAPI.",
    technologies: [
      "Python",
      "LangChain",
      "CrewAI",
      "FastAPI",
      "Vector DB",
      "RAG",
      "Ollama / Mistral",
      "Docker"
    ],
    impact: "Automatisation de 85% du travail d'analyse documentaire et recherche contextuelle instantanée",
    githubUrl: "https://github.com/sloy225/AGENT-PROSPECTION-COMMERCIAL-CREWAI",
    demoUrl: "https://github.com/sloy225/rag-doc-offline",
    architectureHighlights: [
      "Orchestration Multi-Agents avec CrewAI (Agents planificateurs, chercheurs et rédacteurs)",
      "Pipeline RAG offline & online avec chunking adaptatif et reranking",
      "Vector Database indexée pour recherche sémantique sub-seconde",
      "Exposition sécurisée des fonctionnalités via endpoints REST FastAPI documentés"
    ]
  },
  {
    id: "sncf-bi-reporting",
    title: "Industrialisation BI & Reporting Financier (SNCF Réseau)",
    subtitle: "Pilotage Stratégique, Budgets d'État/UE & Performance Réseau",
    category: "bi",
    featured: true,
    period: "2023 — 2026",
    description: "Conception et déploiement d'une vingtaine de tableaux de bord Power BI haute sécurité pour le suivi des enveloppes budgétaires d'État et des financements européens de SNCF Réseau.",
    longDescription: "Mise en place d'une architecture décisionnelle complète fondée sur la modélisation en étoile (Kimball). Consolidation des données issues de multiples sources disparates (GCP BigQuery, Azure, flux ERP). Développement de mesures DAX de haute complexité (Time Intelligence, allocation budgétaire dynamique) et sécurisation granulaire par Row-Level Security (RLS) pour assurer l'accès cloisonné selon les profils d'utilisateurs et régions.",
    technologies: [
      "Power BI",
      "DAX Avancé",
      "Row-Level Security (RLS)",
      "SQL (BigQuery/Azure)",
      "Modélisation Kimball",
      "Power Query M",
      "Workspaces Power BI Service"
    ],
    impact: "Division du temps de traitement de 24h à 1h (-96%) et adoption par plus de 50 décideurs métiers",
    architectureHighlights: [
      "Architecture Data Warehouse en schéma en étoile unifiée",
      "Formules DAX optimisées avec variables et context transitions maîtrisées",
      "Sécurité Row-Level Security (RLS) multi-rôles et multi-entités",
      "Gouvernance, versioning et documentation des flux de données"
    ]
  },
  {
    id: "pipeline-optimization",
    title: "Optimisation d'Ingestion & Pipelines Data",
    subtitle: "Automatisation & Restructuration Autonome de Scripts de Croisement",
    category: "data-eng",
    featured: true,
    period: "2024 — 2025",
    description: "Refonte et industrialisation de pipelines de croisement d'inventaires d'actifs et de données d'exploitation ferroviaire avec tests d'intégrité automatisés.",
    longDescription: "Restructuration intégrale de scripts legacy non optimisés en un pipeline modulaire, conteneurisé et reproductible. Utilisation de Python (pandas, numpy) et de requêtes SQL vectorisées pour le nettoyage, le dédoublonnage et l'enrichissement automatique. Mise en place de logs structurés, de contrôles d'anomalies aux bornes et de notifications en cas d'écart statistique.",
    technologies: [
      "Python (Pandas, NumPy)",
      "SQL Avancé",
      "PostgreSQL",
      "Docker",
      "Git / CI-CD",
      "Data Quality Checks"
    ],
    impact: "Suppression des erreurs humaines d'import et réduction de 80% du temps de réconciliation",
    githubUrl: "https://github.com/sloy225",
    architectureHighlights: [
      "Pipeline ETL modulaire avec gestion d'erreurs et alertes automatiques",
      "Requêtes d'agrégation SQL hautement parallélisées",
      "Conteneurisation Docker pour reproductibilité totale des environnements",
      "Contrôle qualité automatique (Data Quality assertions)"
    ]
  },
  {
    id: "customer-support-ml",
    title: "Classification Prédictive & Routing Support Client",
    subtitle: "Modèle Machine Learning & Interface Interactive Streamlit",
    category: "ai",
    featured: false,
    period: "2024",
    description: "Modèle de Machine Learning entraîné sur des requêtes clients pour prédire la priorité, catégoriser la typologie de problème et router instantanément vers le bon service.",
    longDescription: "Pipeline de traitement du langage naturel (NLP) avec vectorisation TF-IDF, embeddings sémantiques et modèle de classification supervisée Scikit-learn. Interface utilisateur complète développée sous Streamlit permettant le test temps réel des prédictions, la visualisation de la matrice de confusion et l'analyse de feature importance.",
    technologies: [
      "Python",
      "Scikit-learn",
      "Streamlit",
      "NLP",
      "Pandas",
      "Matplotlib / Seaborn"
    ],
    impact: "Précision de classification supérieure à 91% et démonstrateur interactif disponible en ligne",
    githubUrl: "https://github.com/sloy225/customer-support-priority-classification-and-routing",
    architectureHighlights: [
      "Prétraitement NLP (lemmatisation, suppression stop-words, n-grams)",
      "Benchmarking multi-modèles (Random Forest, Gradient Boosting, SVM)",
      "Dashboard Streamlit interactif déployé sur le Cloud"
    ]
  }
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "Analytics & Business Intelligence",
    icon: "BarChart3",
    accentColor: "#00F0FF",
    description: "Transformation des données brutes en indicateurs stratégiques, storytelling visuel et pilotage de la performance.",
    skills: [
      { name: "Power BI (Desktop & Service)", level: "Expert", highlight: true },
      { name: "DAX Avancé (Time Intelligence, Calculations)", level: "Expert", highlight: true },
      { name: "Power Query (Langage M)", level: "Avancé" },
      { name: "Row-Level Security (RLS)", level: "Avancé", highlight: true },
      { name: "Modélisation Kimball (Étoile / Flocon)", level: "Expert", highlight: true },
      { name: "Tableau Software", level: "Intermédiaire" },
      { name: "Storytelling Data & KPIs Métier", level: "Avancé" },
      { name: "Gouvernance & MCO Dashboards", level: "Avancé" }
    ]
  },
  {
    category: "Data Engineering & Cloud",
    icon: "Database",
    accentColor: "#3B82F6",
    description: "Conception de pipelines robustes, modélisation relationnelle et exploitation d'infrastructures Cloud.",
    skills: [
      { name: "SQL Avancé (Fenêtrage, CTE, Tuning)", level: "Expert", highlight: true },
      { name: "Google Cloud Platform (BigQuery)", level: "Avancé", highlight: true },
      { name: "Microsoft Azure (Data Factory, DevOps)", level: "Avancé", highlight: true },
      { name: "Python (Pandas, PySpark, NumPy)", level: "Avancé", highlight: true },
      { name: "PostgreSQL & BDD Relationnelles", level: "Avancé" },
      { name: "dbt (Data Build Tool)", level: "Intermédiaire" },
      { name: "Docker & Conteneurisation", level: "Intermédiaire" },
      { name: "Git, GitHub & CI/CD", level: "Avancé" }
    ]
  },
  {
    category: "IA Générative & Machine Learning",
    icon: "BrainCircuit",
    accentColor: "#8B5CF6",
    description: "Architectures d'agents autonomes, systèmes RAG et valorisation des données par les modèles de fondation.",
    skills: [
      { name: "Systèmes Multi-Agents (CrewAI, LangChain)", level: "Avancé", highlight: true },
      { name: "Architectures RAG (Retrieval-Augmented)", level: "Avancé", highlight: true },
      { name: "Vector Databases (Chroma, FAISS)", level: "Avancé", highlight: true },
      { name: "LLMs (Mistral, Ollama, OpenAI API)", level: "Avancé", highlight: true },
      { name: "FastAPI (Microservices IA)", level: "Avancé" },
      { name: "Scikit-Learn & ML Supervisé", level: "Avancé" },
      { name: "NLP & Traitement de texte", level: "Intermédiaire" },
      { name: "IA Act & Gouvernance IA", level: "Maîtrisé" }
    ]
  },
  {
    category: "Méthodologie, Gestion & Agilité",
    icon: "CheckCircle2",
    accentColor: "#10B981",
    description: "Méthodes de travail collaboratives, rigueur de délivrabilité et alignement continu avec les métiers.",
    skills: [
      { name: "Cadre SAFe & Méthodes Agiles / Scrum", level: "Pratiqué 3 ans", highlight: true },
      { name: "Recueil & Cadrage de besoins métiers", level: "Avancé", highlight: true },
      { name: "Data Quality & Contrôles d'intégrité", level: "Expert", highlight: true },
      { name: "Management de projets SI & Conduite du changement", level: "Avancé" },
      { name: "Documentation technique & fonctionnelle", level: "Rigoureux" },
      { name: "Sens du relationnel & Vulgarisation technique", level: "Excellente" }
    ]
  }
];

export const EDUCATION_ITEMS = [
  {
    degree: "MSc Big Data & Intelligence Artificielle (Bac+5)",
    institution: "Major · Note : 19,25 / 20",
    period: "2024 — 2026",
    details: "Spécialisation en architectures Big Data distribuées, Deep Learning, MLOps, gouvernance de la donnée et architectures d'agents IA."
  },
  {
    degree: "Licence / Bachelor Data et Application Design",
    institution: "Mention TBien",
    period: "2020 — 2023",
    details: "Bases de données relationnelles, algorithmique avancée, génie logiciel, réseaux informatiques et statistiques décisionnelles."
  }
];
