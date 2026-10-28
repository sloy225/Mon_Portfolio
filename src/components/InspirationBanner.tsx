import React, { useRef, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

export const InspirationBanner: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    const particleCount = 65;
    const particles: { x: number; y: number; vx: number; vy: number; radius: number }[] = [];

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = 110 + Math.random() * 120;
      particles.push({
        x: width / 2 + Math.cos(angle) * dist,
        y: height / 2 + Math.sin(angle) * dist,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.8 + 1
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Faint center circle
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, 160, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(226, 232, 240, 0.6)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]);
      ctx.stroke();
      ctx.setLineDash([]);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        const dx = width / 2 - p.x;
        const dy = height / 2 - p.y;
        p.vx += dx * 0.00005;
        p.vy += dy * 0.00005;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#0F172A';
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 75) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(15, 23, 42, ${0.25 * (1 - dist / 75)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative py-28 px-6 bg-white text-zinc-900 overflow-hidden border-t border-zinc-100 flex flex-col items-center justify-center">
      {/* Interactive Particle Constellation Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-auto cursor-crosshair opacity-70"
      />

      {/* Prev / Next Labels */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden md:block">
        <span className="text-xs font-mono text-zinc-400 select-none">
          ‹ Précédent
        </span>
      </div>
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden md:block">
        <span className="text-xs font-mono text-zinc-400 select-none">
          Suivant ›
        </span>
      </div>

      {/* Center Content */}
      <div className="relative z-10 max-w-2xl mx-auto text-center pointer-events-none flex flex-col items-center">
        <span className="text-xs font-semibold tracking-wider text-zinc-400 uppercase mb-3">
          Vision & Rigueur Technique
        </span>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-950 mb-6 leading-tight">
          L'ingénierie data <br />
          au service de la décision.
        </h2>

        <p className="text-sm text-zinc-600 max-w-md mx-auto mb-8 font-normal leading-relaxed">
          De l'ingestion brute jusqu'au dashboard de direction : respect strict de la modélisation Kimball, requêtes SQL vectorisées et gouvernance sans compromis.
        </p>

        {/* Action button */}
        <div className="pointer-events-auto">
          <a
            href="#case-studies"
            className="px-6 py-3 rounded-none bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-semibold tracking-wider transition-all shadow-md inline-block"
          >
            Détail des Réalisations.
          </a>
        </div>
      </div>
    </section>
  );
};
