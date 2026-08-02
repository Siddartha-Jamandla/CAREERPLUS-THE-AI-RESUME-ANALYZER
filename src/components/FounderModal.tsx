import React from 'react';
import { X, Award, Sparkles, Linkedin, Github, Mail, ShieldCheck, Globe, CheckCircle2, Zap } from 'lucide-react';

interface FounderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FounderModal: React.FC<FounderModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden">
        
        {/* Top Header Background Banner */}
        <div className="h-32 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 relative p-6 flex items-start justify-between">
          <div className="flex items-center space-x-2 text-amber-300 font-extrabold text-xs uppercase tracking-widest bg-slate-950/40 px-3 py-1 rounded-full backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Founder & Chief Architect</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 bg-slate-950/50 hover:bg-slate-950 text-slate-300 hover:text-white rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Founder Details Section */}
        <div className="px-6 pb-6 pt-0 relative space-y-6">
          
          {/* Icon Badge & Core Info Header */}
          <div className="flex flex-col sm:flex-row items-center sm:items-end space-y-4 sm:space-y-0 sm:space-x-5 -mt-14">
            <div className="relative">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-blue-700 via-indigo-800 to-slate-900 flex items-center justify-center border-4 border-white dark:border-slate-900 shadow-xl text-amber-300">
                <Award className="w-12 h-12" />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-1.5 rounded-full border-2 border-white dark:border-slate-900 shadow-md">
                <CheckCircle2 className="w-4 h-4 text-amber-300" />
              </div>
            </div>

            <div className="text-center sm:text-left space-y-1">
              <div className="flex items-center justify-center sm:justify-start space-x-2">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  Siddartha Jamandla
                </h3>
                <span className="px-2.5 py-0.5 bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 text-[10px] font-extrabold rounded-full uppercase">
                  Founder & Chief Architect
                </span>
              </div>
              <p className="text-xs font-bold text-blue-600 dark:text-blue-400">
                AIML Engineer & AI Systems Architect
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Hyderabad, Telangana, India 500013 • AIML Engineering Student
              </p>
            </div>
          </div>

          {/* Mission & Vision Statement */}
          <div className="p-4 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-2">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-slate-200 flex items-center space-x-2">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>Founder's Mission & Platform Vision</span>
            </h4>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
              "I built <strong>CAREER PLUS+</strong> to democratize executive-level career coaching and level the hiring field for ambitious professionals. By fusing real-time AI analytics, interactive voice interview simulations, and recruiter-grade profile optimization, we give candidates the exact strategic tools needed to unlock higher compensation and dream roles."
            </p>
          </div>

          {/* Platform Innovations & Leadership Key Highlights */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-slate-200 flex items-center space-x-2">
              <Award className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Key Innovations Architected by Siddartha Jamandla</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl space-y-1">
                <span className="text-xs font-bold text-slate-900 dark:text-white block">
                  ⚡ Advanced AI Systems Engine
                </span>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                  Engineered sub-50ms multi-dimensional resume parsing and ATS gap detection algorithms.
                </p>
              </div>

              <div className="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl space-y-1">
                <span className="text-xs font-bold text-slate-900 dark:text-white block">
                  🎙️ Live Voice & Video AI Simulator
                </span>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                  Pioneered real-time speech assessment, posture tracking, and filler word detection.
                </p>
              </div>

              <div className="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl space-y-1">
                <span className="text-xs font-bold text-slate-900 dark:text-white block">
                  🌐 AI Portfolio & LinkedIn Studio
                </span>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                  Built auto-portfolio generation with visual banner rendering for viral personal branding.
                </p>
              </div>

              <div className="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl space-y-1">
                <span className="text-xs font-bold text-slate-900 dark:text-white block">
                  🛡️ Zero-Data Retention Security
                </span>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                  Architected strict candidate privacy controls with enterprise-grade SSL 256-bit encryption.
                </p>
              </div>
            </div>
          </div>

          {/* Connect & Social Actions */}
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center space-x-2">
              <a
                href="https://www.linkedin.com/in/siddartha-jamandla-97350b384?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-colors flex items-center space-x-1.5"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://github.com/siddarthajamandla-sketch"
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition-colors flex items-center space-x-1.5"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
              <a
                href="mailto:jamandlasiddartha@gmail.com"
                className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-xl transition-colors flex items-center space-x-1.5"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email Founder</span>
              </a>
            </div>

            <button
              onClick={onClose}
              className="px-5 py-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-xl transition-colors cursor-pointer"
            >
              Close Window
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
