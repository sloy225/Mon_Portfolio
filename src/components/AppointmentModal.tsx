import React, { useState } from 'react';
import { X, Calendar, Clock, Mail, Phone, CheckCircle2, Send, ArrowRight, UserCheck } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({ isOpen, onClose }) => {
  const [format, setFormat] = useState<'15min' | '30min' | 'consulting'>('15min');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Proposition d'Entretien (${format}) - ${name} (${company || 'Entreprise'})`);
    const body = encodeURIComponent(
      `Bonjour Abdoul-Aziz,\n\nJe souhaite échanger avec vous concernant une opportunité pour le poste de :\nFormat : ${format}\nSociété : ${company}\nContact : ${name} (${email})\n\nMessage / Proposition de créneau :\n${message}\n\nCordialement,`
    );
    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      onClose();
    }, 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl bg-[#0F172A] text-white rounded-3xl p-6 sm:p-8 border border-slate-700 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-6">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-wider text-white uppercase">
              Planifier un Entretien / Échange
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div>
          <h3 className="text-xl sm:text-2xl font-light text-white mb-2">
            Organisons un premier contact
          </h3>
          <p className="text-xs text-slate-400 mb-6 leading-relaxed font-normal">
            Disponible immédiatement pour des opportunités en <strong>CDI</strong> ou <strong>Prestations de Conseil</strong> en Île-de-France et télétravail.
          </p>

          {/* Format selector */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-6">
            <button
              type="button"
              onClick={() => setFormat('15min')}
              className={`p-3 rounded-2xl border text-left transition-all ${
                format === '15min'
                  ? 'bg-white text-slate-950 font-bold border-white'
                  : 'bg-white/[0.03] text-slate-300 border-white/10 hover:bg-white/[0.06]'
              }`}
            >
              <div className="flex items-center gap-1.5 text-xs mb-1">
                <Clock className="w-3.5 h-3.5 text-cyan-500" />
                <span>Flash 15 min</span>
              </div>
              <p className={`text-[10px] ${format === '15min' ? 'text-slate-600' : 'text-slate-400'}`}>
                Premier contact RH & adéquation de poste
              </p>
            </button>

            <button
              type="button"
              onClick={() => setFormat('30min')}
              className={`p-3 rounded-2xl border text-left transition-all ${
                format === '30min'
                  ? 'bg-white text-slate-950 font-bold border-white'
                  : 'bg-white/[0.03] text-slate-300 border-white/10 hover:bg-white/[0.06]'
              }`}
            >
              <div className="flex items-center gap-1.5 text-xs mb-1">
                <Calendar className="w-3.5 h-3.5 text-purple-500" />
                <span>Tech 30-45 min</span>
              </div>
              <p className={`text-[10px] ${format === '30min' ? 'text-slate-600' : 'text-slate-400'}`}>
                Qualification technique, DAX, SQL, RAG
              </p>
            </button>

            <button
              type="button"
              onClick={() => setFormat('consulting')}
              className={`p-3 rounded-2xl border text-left transition-all ${
                format === 'consulting'
                  ? 'bg-white text-slate-950 font-bold border-white'
                  : 'bg-white/[0.03] text-slate-300 border-white/10 hover:bg-white/[0.06]'
              }`}
            >
              <div className="flex items-center gap-1.5 text-xs mb-1">
                <UserCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Projet Conseil</span>
              </div>
              <p className={`text-[10px] ${format === 'consulting' ? 'text-slate-600' : 'text-slate-400'}`}>
                Cadrage de besoin décisionnel & IA
              </p>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-mono text-slate-400 block mb-1">
                  Votre Nom & Prénom *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="ex: Thomas Martin"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono text-slate-400 block mb-1">
                  Entreprise / Cabinet *
                </label>
                <input
                  type="text"
                  required
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="ex: Cabinet / Entreprise"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-mono text-slate-400 block mb-1">
                Votre Adresse Email *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nom@entreprise.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="text-[11px] font-mono text-slate-400 block mb-1">
                Créneaux souhaités / Sujet de l'échange
              </label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="ex: Disponible ce jeudi après-midi pour un premier échange visio..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-full bg-white hover:bg-slate-200 text-slate-950 font-semibold text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Envoyer la demande d'entretien</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Direct Phone / Email Alternative */}
          <div className="pt-4 mt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Ou par téléphone direct :</span>
            <a href={`tel:${PERSONAL_INFO.phone}`} className="text-emerald-400 font-bold hover:underline">
              {PERSONAL_INFO.phoneFormatted}
            </a>
          </div>

        </div>

      </div>
    </div>
  );
};
