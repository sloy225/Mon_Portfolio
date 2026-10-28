import React, { useState, useEffect } from 'react';
import { QuantixLogo } from './QuantixLogo';
import { Download, FileText, X, Menu, Briefcase } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  onOpenCVModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCVModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'À propos', href: '#about' },
    { name: 'Expertises', href: '#services' },
    { name: 'Pourquoi mon profil', href: '#why-hire-me' },
    { name: 'Réalisations & Projets', href: '#case-studies' },
    { name: 'FAQ Recrutement', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? 'bg-[#080C14]/90 backdrop-blur-md border-b border-white/[0.08] py-3.5'
          : 'bg-transparent py-5'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <a href="#hero" className="flex items-center gap-3 group">
          <QuantixLogo size={28} className="text-white group-hover:scale-105 transition-transform" />
          <div className="flex flex-col">
            <span className="font-bold text-base sm:text-lg tracking-tight text-white group-hover:text-slate-200 transition-colors">
              Abdoul-Aziz OUEDRAOGO
            </span>
            <span className="text-[10px] text-slate-400 font-mono -mt-1 hidden sm:block">
              Consultant Data & Analytics Engineer
            </span>
          </div>
        </a>

        {/* Center Recruiter Pill Badge */}
        <div className="hidden md:flex items-center">
          <div className="flex items-center gap-2 text-xs font-mono tracking-wide text-slate-300 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Disponible ASAP · Mobilité IDF</span>
          </div>
        </div>

        {/* Right Nav Links & Actions */}
        <div className="flex items-center gap-4">
          <nav className="hidden lg:flex items-center gap-6 text-xs text-slate-300 font-normal">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* CV Button */}
          <button
            onClick={onOpenCVModal}
            className="hidden sm:flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold text-white bg-white/[0.08] hover:bg-white/[0.16] border border-white/15 transition-all shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-slate-300" />
            <span>CV (PDF)</span>
          </button>

          {/* Minimal 2-bar menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-300 hover:text-white transition-colors focus:outline-none"
            aria-label="Ouvrir le menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <div className="w-5 h-4 flex flex-col justify-between items-end">
                <span className="w-5 h-[1.5px] bg-white rounded-full transition-all" />
                <span className="w-3.5 h-[1.5px] bg-white rounded-full transition-all" />
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 mx-4 p-5 rounded-2xl bg-[#0B111D] border border-white/10 shadow-2xl backdrop-blur-xl transition-all">
          <div className="flex flex-col gap-3">
            <div className="pb-3 border-b border-white/[0.08] flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">Statut Recrutement</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Disponible Immédiatement
              </span>
            </div>

            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-slate-300 hover:text-white py-1.5 transition-colors border-b border-white/[0.04]"
              >
                {link.name}
              </a>
            ))}

            <div className="pt-3 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCVModal();
                }}
                className="w-full py-2.5 rounded-xl text-xs font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/10 flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Consulter / Télécharger le CV (PDF)</span>
              </button>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-2 font-mono">
                <span>📍 Île-de-France (93)</span>
                <span>🚗 Permis B</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
