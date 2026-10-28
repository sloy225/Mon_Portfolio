import React, { useEffect, useRef, useState } from 'react';
import { Network, Sparkles, Activity } from 'lucide-react';

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

// Helper to convert hex to valid rgba string
const hexToRgba = (hex: string, alpha: number): string => {
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.substring(0, 2), 16) || 0;
  const g = parseInt(cleanHex.substring(2, 4), 16) || 240;
  const b = parseInt(cleanHex.substring(4, 6), 16) || 255;
  return `rgba(${r}, ${g}, ${b}, ${Math.max(0, Math.min(1, alpha))})`;
};

// Safe rounded rectangle for cross-browser support
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
  const [activeNode, setActiveNode] = useState<string | null>("CrewAI Agents");

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

    // Named core nodes — Enrichis & Spécifiques
    const nodeData: Array<{ label: string; type: Node['type']; color: string }> = [
      // Business Intelligence & Power BI
      { label: "Power BI (RLS & Service)", type: "bi", color: "#00F0FF" },
      { label: "DAX Measures & Power Query", type: "bi", color: "#38BDF8" },
      { label: "Kimball Star Schema", type: "bi", color: "#00F0FF" },
      { label: "Time-to-Reporting (24h->1h)", type: "bi", color: "#34D399" },

      // Data Engineering & Cloud Architecture
      { label: "GCP BigQuery", type: "cloud", color: "#3B82F6" },
      { label: "Microsoft Azure ADLS", type: "cloud", color: "#60A5FA" },
      { label: "SQL Advanced & Windowing", type: "data", color: "#22D3EE" },
      { label: "Data Fabric & Lakehouse", type: "data", color: "#0284C7" },
      { label: "Python Pandas & Pipelines", type: "data", color: "#3B82F6" },
      { label: "PostgreSQL & MERISE", type: "data", color: "#38BDF8" },

      // GenAI & Multi-Agent Systems
      { label: "CrewAI Multi-Agents", type: "ai", color: "#8B5CF6" },
      { label: "Vector DB & RAG Pipelines", type: "ai", color: "#A855F7" },
      { label: "LangChain Orchestration", type: "ai", color: "#6366F1" },
      { label: "FastAPI REST Services", type: "ai", color: "#C084FC" },
      { label: "LLM Document Processing", type: "ai", color: "#E879F9" },

      // Gouvernance, Agilité & MCO Grand Compte
      { label: "SAFe & Agile Framework", type: "data", color: "#F59E0B" },
      { label: "Data Quality & MDM", type: "data", color: "#10B981" },
      { label: "MCO & Support Applicatif", type: "data", color: "#059669" },
      { label: "Pilotage Financier & Flux", type: "bi", color: "#FBBF24" },
    ];

    // Generate nodes in 3D sphere
    const nodes: Node[] = [];
    const nodeCount = Math.max(28, nodeData.length);
    const radius = Math.max(100, Math.min(width, height) * 0.42);

    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / nodeCount);
      const theta = Math.sqrt(nodeCount * Math.PI) * phi;

      const named = nodeData[i];
      const isNamed = !!named;

      nodes.push({
        x: Math.cos(theta) * Math.sin(phi) * radius,
        y: Math.sin(theta) * Math.sin(phi) * radius * 0.85,
        z: Math.cos(phi) * radius,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        vz: (Math.random() - 0.5) * 0.3,
        baseRadius: isNamed ? 5 : 2.5,
        label: isNamed ? named.label : undefined,
        type: isNamed ? named.type : 'data',
        color: isNamed ? named.color : (i % 2 === 0 ? '#00F0FF' : '#3B82F6'),
      });
    }

    // Connections between closest nodes
    const connections: Array<[number, number]> = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dz = nodes[i].z - nodes[j].z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < radius * 0.75) {
          connections.push([i, j]);
        }
      }
    }

    // Moving data packets (particles)
    const particles: Particle[] = [];
    const totalPackets = Math.min(18, connections.length);
    for (let i = 0; i < totalPackets; i++) {
      const conn = connections[Math.floor(Math.random() * connections.length)] || [0, 1];
      particles.push({
        fromNode: conn[0],
        toNode: conn[1],
        progress: Math.random(),
        speed: 0.006 + Math.random() * 0.008,
        color: i % 2 === 0 ? '#00F0FF' : '#8B5CF6'
      });
    }

    let angleX = 0.0015;
    let angleY = 0.0025;
    let targetAngleX = 0.0015;
    let targetAngleY = 0.0025;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const mouseX = (e.clientX - rect.left - width / 2) / (width / 2 || 1);
      const mouseY = (e.clientY - rect.top - height / 2) / (height / 2 || 1);
      targetAngleY = mouseX * 0.008;
      targetAngleX = -mouseY * 0.008;
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
    }

    const render = () => {
      try {
        ctx.clearRect(0, 0, width, height);

        // Smooth rotate towards target
        angleX += (targetAngleX - angleX) * 0.05;
        angleY += (targetAngleY - angleY) * 0.05;

        const cosX = Math.cos(angleX);
        const sinX = Math.sin(angleX);
        const cosY = Math.cos(angleY + 0.0015);
        const sinY = Math.sin(angleY + 0.0015);

        // Rotate nodes in 3D
        nodes.forEach(node => {
          const x1 = node.x * cosY - node.z * sinY;
          const z1 = node.z * cosY + node.x * sinY;

          const y2 = node.y * cosX - z1 * sinX;
          const z2 = z1 * cosX + node.y * sinX;

          node.x = x1;
          node.y = y2;
          node.z = z2;
        });

        const centerX = width / 2;
        const centerY = height / 2;
        const fov = 420;

        // Draw connection lines
        ctx.lineWidth = 1;
        connections.forEach(([i, j]) => {
          const n1 = nodes[i];
          const n2 = nodes[j];

          const scale1 = fov / (fov + n1.z);
          const scale2 = fov / (fov + n2.z);

          const x1 = centerX + n1.x * scale1;
          const y1 = centerY + n1.y * scale1;
          const x2 = centerX + n2.x * scale2;
          const y2 = centerY + n2.y * scale2;

          const avgZ = (n1.z + n2.z) / 2;
          const alpha = Math.max(0.04, Math.min(0.35, (avgZ + radius) / (2 * radius) * 0.35));

          ctx.strokeStyle = hexToRgba('#00F0FF', alpha);
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        });

        // Draw data packets traveling along edges
        particles.forEach(p => {
          p.progress += p.speed;
          if (p.progress >= 1 && connections.length > 0) {
            p.progress = 0;
            const conn = connections[Math.floor(Math.random() * connections.length)];
            p.fromNode = conn[0];
            p.toNode = conn[1];
          }

          const n1 = nodes[p.fromNode];
          const n2 = nodes[p.toNode];
          if (!n1 || !n2) return;

          const scale1 = fov / (fov + n1.z);
          const scale2 = fov / (fov + n2.z);

          const x1 = centerX + n1.x * scale1;
          const y1 = centerY + n1.y * scale1;
          const x2 = centerX + n2.x * scale2;
          const y2 = centerY + n2.y * scale2;

          const px = x1 + (x2 - x1) * p.progress;
          const py = y1 + (y2 - y1) * p.progress;
          const pz = n1.z + (n2.z - n1.z) * p.progress;
          const pScale = fov / (fov + pz);

          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(px, py, Math.max(1.5, 2.5 * pScale), 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        });

        // Sort nodes by Z (back to front) for accurate 3D rendering
        const sortedNodes = [...nodes].sort((a, b) => a.z - b.z);

        // Draw nodes & labels
        sortedNodes.forEach(node => {
          const scale = fov / (fov + node.z);
          const x = centerX + node.x * scale;
          const y = centerY + node.y * scale;
          const r = Math.max(2, node.baseRadius * scale);

          const alpha = Math.max(0.3, Math.min(1, (node.z + radius) / (2 * radius) * 0.9 + 0.1));

          // Node outer glow
          if (node.label && r > 0) {
            ctx.beginPath();
            const glowGrad = ctx.createRadialGradient(x, y, 0, x, y, Math.max(4, r * 3));
            glowGrad.addColorStop(0, hexToRgba(node.color, 0.35));
            glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx.fillStyle = glowGrad;
            ctx.arc(x, y, Math.max(4, r * 3), 0, Math.PI * 2);
            ctx.fill();
          }

          // Node point
          ctx.fillStyle = node.color;
          ctx.shadowColor = node.color;
          ctx.shadowBlur = node.label ? 10 : 3;
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;

          // Draw text label for named nodes when in front
          if (node.label && node.z > -radius * 0.2) {
            const fontSize = Math.max(10, Math.round(11 * scale));
            ctx.font = `600 ${fontSize}px "JetBrains Mono", monospace`;
            ctx.textAlign = 'left';

            const textWidth = ctx.measureText(node.label).width;
            const padX = 6;
            const padY = 3;

            ctx.fillStyle = 'rgba(9, 13, 22, 0.85)';
            ctx.strokeStyle = 'rgba(0, 240, 255, 0.3)';
            ctx.lineWidth = 1;

            drawRoundRect(ctx, x + r + 4, y - fontSize / 2 - padY, textWidth + padX * 2, fontSize + padY * 2, 4);
            ctx.fill();
            ctx.stroke();

            // Label text
            ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, alpha + 0.3)})`;
            ctx.fillText(node.label, x + r + 4 + padX, y + fontSize / 3);
          }
        });
      } catch (e) {
        console.error("Canvas draw frame error:", e);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[460px] md:h-[540px] lg:h-[580px] rounded-2xl glass-card overflow-hidden gradient-border-glow group select-none"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#00F0FF]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-[#6366F1]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Grid background texture */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      {/* Interactive 3D Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
      />

      {/* Top HUD Bar */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-dark-900/80 backdrop-blur-md border border-cyan-400/30 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-cyan-400 font-semibold">NEURAL DATA TOPOLOGY</span>
          <span className="text-gray-500">|</span>
          <span className="text-gray-400">RAG · BI · AGENTS</span>
        </div>

        <div className="hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-full bg-dark-900/80 backdrop-blur-md border border-white/10 text-xs font-mono text-gray-300">
          <Activity className="w-3.5 h-3.5 text-emerald-400" />
          <span>SNCF MCO: <strong className="text-emerald-400">99.98%</strong></span>
          <span className="text-gray-600">·</span>
          <span>LATENCY: <strong className="text-cyan-400">0.8ms</strong></span>
        </div>
      </div>

      {/* Bottom Interactive HUD Overlay */}
      <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 pointer-events-none z-10">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-dark-900/90 backdrop-blur-md border border-white/10 text-cyan-400">
            <Network className="w-4 h-4" />
          </div>
          <div className="text-xs font-mono">
            <div className="text-white font-medium flex items-center gap-1.5">
              <span>Graphe de Connaissances & Pipelines ({activeNode || 'Actif'})</span>
              <Sparkles className="w-3 h-3 text-cyan-400" />
            </div>
            <div className="text-gray-400">Interagissez avec le curseur pour explorer la 3D</div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] font-mono pointer-events-auto">
          <button
            onClick={() => setActiveNode("CrewAI Agents")}
            className="px-2.5 py-1 rounded bg-purple-500/10 border border-purple-500/30 text-purple-300 hover:bg-purple-500/20 transition-colors"
          >
            CrewAI / RAG
          </button>
          <button
            onClick={() => setActiveNode("Power BI (RLS)")}
            className="px-2.5 py-1 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20 transition-colors"
          >
            Power BI / DAX
          </button>
          <button
            onClick={() => setActiveNode("GCP BigQuery")}
            className="px-2.5 py-1 rounded bg-blue-500/10 border border-blue-500/30 text-blue-300 hover:bg-blue-500/20 transition-colors"
          >
            Cloud / SQL
          </button>
        </div>
      </div>
    </div>
  );
};