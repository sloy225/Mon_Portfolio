import React, { useEffect, useRef, useState } from 'react';
import { Network, Sparkles, Compass } from 'lucide-react';

interface Node {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  baseRadius: number;
  label?: string;
  type: 'core' | 'ai' | 'cloud' | 'bi' | 'data';
  color: string;
}

interface Particle {
  fromNode: number;
  toNode: number;
  progress: number;
  speed: number;
  color: string;
}

// Convert hex to muted low-contrast rgba
const hexToRgba = (hex: string, alpha: number): string => {
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.substring(0, 2), 16) || 200;
  const g = parseInt(cleanHex.substring(2, 4), 16) || 210;
  const b = parseInt(cleanHex.substring(4, 6), 16) || 220;
  return `rgba(${r}, ${g}, ${b}, ${Math.max(0, Math.min(1, alpha))})`;
};

const drawRoundRect = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  radius: number
) => {
  if (typeof ctx.roundRect === 'function') {
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, radius);
  } else {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + w - radius, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
    ctx.lineTo(x + w, y + h - radius);
    ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
    ctx.lineTo(x + radius, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }
};

export const InteractiveDataGraph: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeNode, setActiveNode] = useState<string | null>("Power BI (RLS & Service)");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const resize = () => {
      if (!canvas || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width || 400;
      height = rect.height || 460;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    // Muted, low-contrast, elegant palette (slate, soft off-white, light warm titanium)
    const nodeData: Array<{ label: string; type: Node['type']; color: string }> = [
      // Business Intelligence & Power BI (Muted Slate / Light Grey)
      { label: "Power BI (Desktop & Service)", type: "bi", color: "#E2E8F0" },
      { label: "Mesures DAX & Time Intelligence", type: "bi", color: "#CBD5E1" },
      { label: "Modélisation Kimball (Étoile)", type: "bi", color: "#E2E8F0" },
      { label: "Réduction latence (24h ➔ 1h)", type: "bi", color: "#A7F3D0" },

      // Data Engineering & Cloud (Soft warm slate / subtle titanium)
      { label: "GCP BigQuery", type: "cloud", color: "#94A3B8" },
      { label: "Microsoft Azure", type: "cloud", color: "#94A3B8" },
      { label: "SQL Analytique Avancé", type: "data", color: "#CBD5E1" },
      { label: "Python Pandas & Ingestion", type: "data", color: "#E2E8F0" },
      { label: "PostgreSQL & Modélisation", type: "data", color: "#94A3B8" },

      // GenAI & Multi-Agent Systems (Subtle soft grey with delicate lavender undertone)
      { label: "CrewAI Multi-Agents", type: "ai", color: "#C4B5FD" },
      { label: "RAG & Recherche Vectorielle", type: "ai", color: "#E2E8F0" },
      { label: "Ollama (LLM Locaux)", type: "ai", color: "#CBD5E1" },
      { label: "FAISS & Indexation", type: "ai", color: "#C4B5FD" },
      { label: "FastAPI Microservices", type: "ai", color: "#94A3B8" },

      // Méthodes & Gouvernance (Soft sage / muted warm)
      { label: "Cadre SAFe & Agile", type: "data", color: "#CBD5E1" },
      { label: "Contrôle Qualité & Données", type: "data", color: "#A7F3D0" },
      { label: "Sécurité Row-Level (RLS)", type: "bi", color: "#E2E8F0" },
      { label: "Pilotage Budgétaire PEPS", type: "bi", color: "#CBD5E1" },
    ];

    const nodes: Node[] = [];
    const nodeCount = Math.max(28, nodeData.length);
    const radius = Math.max(90, Math.min(width, height) * 0.40);

    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / nodeCount);
      const theta = Math.sqrt(nodeCount * Math.PI) * phi;

      const named = nodeData[i];
      const isNamed = !!named;

      nodes.push({
        x: Math.cos(theta) * Math.sin(phi) * radius,
        y: Math.sin(theta) * Math.sin(phi) * radius * 0.82,
        z: Math.cos(phi) * radius,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        vz: (Math.random() - 0.5) * 0.15,
        baseRadius: isNamed ? 4 : 2,
        label: isNamed ? named.label : undefined,
        type: isNamed ? named.type : 'data',
        color: isNamed ? named.color : '#64748B',
      });
    }

    // Gentle particles between nodes
    const particles: Particle[] = [];
    for (let i = 0; i < 18; i++) {
      const from = Math.floor(Math.random() * nodes.length);
      let to = Math.floor(Math.random() * nodes.length);
      while (to === from) to = Math.floor(Math.random() * nodes.length);
      particles.push({
        fromNode: from,
        toNode: to,
        progress: Math.random(),
        speed: 0.003 + Math.random() * 0.005,
        color: '#94A3B8',
      });
    }

    let rotX = 0.2;
    let rotY = 0.3;
    let isDragging = false;
    let lastMouseX = 0;
    let lastMouseY = 0;
    let autoRotY = 0.0018;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
      autoRotY = 0;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - lastMouseX;
      const dy = e.clientY - lastMouseY;
      rotY += dx * 0.004;
      rotX += dy * 0.004;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
      autoRotY = 0.0018;
    };

    const el = canvas;
    el.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    const render = () => {
      rotY += autoRotY;
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // Project 3D to 2D
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);

      const projected = nodes.map((node) => {
        const x1 = node.x * cosY - node.z * sinY;
        const z1 = node.z * cosY + node.x * sinY;
        const y2 = node.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + node.y * sinX;

        const fov = 340;
        const scale = fov / (fov + z2);

        return {
          px: cx + x1 * scale,
          py: cy + y2 * scale,
          scale,
          z2,
          node,
        };
      });

      projected.sort((a, b) => b.z2 - a.z2);

      // Subtle, calm connecting lines with low opacity
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const a = projected[i];
          const b = projected[j];
          const dist3D = Math.hypot(
            a.node.x - b.node.x,
            a.node.y - b.node.y,
            a.node.z - b.node.z
          );

          if (dist3D < 115) {
            const alpha = Math.max(0, (1 - dist3D / 115) * 0.14);
            ctx.beginPath();
            ctx.moveTo(a.px, a.py);
            ctx.lineTo(b.px, b.py);
            ctx.strokeStyle = `rgba(148, 163, 184, ${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      // Gentle floating particles
      particles.forEach((p) => {
        p.progress += p.speed;
        if (p.progress >= 1) {
          p.progress = 0;
          p.fromNode = Math.floor(Math.random() * nodes.length);
          p.toNode = Math.floor(Math.random() * nodes.length);
        }
        const fromP = projected.find((item) => item.node === nodes[p.fromNode]);
        const toP = projected.find((item) => item.node === nodes[p.toNode]);

        if (fromP && toP) {
          const px = fromP.px + (toP.px - fromP.px) * p.progress;
          const py = fromP.py + (toP.py - fromP.py) * p.progress;
          ctx.beginPath();
          ctx.arc(px, py, 1.2, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(203, 213, 225, 0.45)';
          ctx.fill();
        }
      });

      // Render nodes & text
      projected.forEach((p) => {
        const { px, py, scale, node } = p;
        const r = Math.max(1.8, node.baseRadius * scale);
        const isActive = activeNode === node.label;

        // Subtle soft circle
        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.fillStyle = isActive ? '#FFFFFF' : node.color;
        ctx.fill();

        // Render readable labels for named nodes
        if (node.label && scale > 0.72) {
          ctx.font = `${isActive ? '600' : '400'} ${Math.max(10, Math.floor(11 * scale))}px 'Plus Jakarta Sans', sans-serif`;
          ctx.fillStyle = isActive ? '#FFFFFF' : 'rgba(226, 232, 240, 0.75)';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'bottom';
          ctx.fillText(node.label, px, py - r - 3);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      el.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeNode]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[480px] sm:h-[520px] rounded-3xl bg-[#0B0F17] overflow-hidden select-none"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
      />

      {/* Top HUD Bar - Plus humain & apaisé */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/[0.08] text-xs font-sans text-slate-300">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
          <span className="font-medium text-white">Cartographie des compétences</span>
          <span className="text-slate-500">·</span>
          <span className="text-slate-400 font-mono text-[11px]">3D interactive</span>
        </div>

        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/[0.08] text-xs font-mono text-slate-400">
          <span>Glisser pour faire pivoter la sphère</span>
        </div>
      </div>

      {/* Bottom Interactive HUD Overlay */}
      <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 pointer-events-none z-10">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-slate-900/90 backdrop-blur-md border border-white/[0.08] text-slate-300">
            <Compass className="w-4 h-4" />
          </div>
          <div className="text-xs">
            <div className="text-white font-medium">
              Point mis en avant : <span className="text-slate-300 font-mono">{activeNode || 'Power BI'}</span>
            </div>
            <div className="text-slate-400 text-[11px]">Survolez ou sélectionnez un groupe pour explorer</div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-mono pointer-events-auto">
          <button
            onClick={() => setActiveNode("Power BI (Desktop & Service)")}
            className="px-3 py-1 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-slate-300 transition-colors"
          >
            Décisionnel & BI
          </button>
          <button
            onClick={() => setActiveNode("GCP BigQuery")}
            className="px-3 py-1 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-slate-300 transition-colors"
          >
            Cloud & SQL
          </button>
          <button
            onClick={() => setActiveNode("CrewAI Multi-Agents")}
            className="px-3 py-1 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-slate-300 transition-colors"
          >
            IA & Agents
          </button>
        </div>
      </div>
    </div>
  );
};