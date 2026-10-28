import React, { useEffect, useState } from 'react';
import { QuantixLogo } from './QuantixLogo';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setFading(true);
          setTimeout(() => {
            onComplete();
          }, 600);
          return 100;
        }
        // Accelerates towards completion
        const step = Math.max(1, Math.floor(Math.random() * 8) + 3);
        return Math.min(100, prev + step);
      });
    }, 35);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      onClick={() => {
        setFading(true);
        setTimeout(onComplete, 300);
      }}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#080C14] text-white transition-opacity duration-700 cursor-pointer select-none ${
        fading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Texture trame & scanlines discrètes */}
      <div className="absolute inset-0 bg-halftone-pattern opacity-10 pointer-events-none" />
      <div className="absolute inset-0 bg-scanlines opacity-25 pointer-events-none" />

      {/* Lignes fines d'ambiance */}
      <div className="absolute w-3/4 h-[1px] bg-slate-500/20 top-1/4 animate-pulse pointer-events-none" />
      <div className="absolute w-1/2 h-[1px] bg-slate-500/15 top-2/3 animate-pulse delay-300 pointer-events-none" />

      {/* Logo AO au centre */}
      <div className="relative mb-12 flex items-center justify-center">
        <div className="absolute w-44 h-44 rounded-full bg-slate-700/10 blur-2xl pointer-events-none" />
        
        <div className="relative transform transition-transform duration-700 scale-125">
          <QuantixLogo size={120} className="text-white/80 drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]" />
        </div>
      </div>

      {/* Compteur en Français orienté profil */}
      <div className="relative z-10 flex flex-col items-center">
        <p className="font-sans text-sm tracking-wide text-slate-300 font-normal">
          Initialisation du profil · {progress}%
        </p>
        <div className="w-28 h-[2px] bg-slate-800 rounded-full mt-3 overflow-hidden">
          <div
            className="h-full bg-slate-200 transition-all duration-75 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-[11px] text-slate-400 mt-2.5 font-mono">
          Cliquer pour accéder au portfolio
        </span>
      </div>
    </div>
  );
};
