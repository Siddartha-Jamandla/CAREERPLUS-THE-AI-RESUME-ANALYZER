import React from 'react';
import { 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  FileText, 
  Mic, 
  Star, 
  ArrowUpRight,
  Award,
  Instagram,
  Linkedin,
  Github,
  Mail
} from 'lucide-react';
import { CareerPlusLogo } from './CareerPlusLogo';

interface FooterProps {
  onNavigateTab: (tab: string) => void;
  isAdmin?: boolean;
  onOpenLegal?: (section: 'privacy' | 'terms' | 'security' | 'rights') => void;
  onOpenFounder?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateTab,
  isAdmin,
  onOpenLegal,
  onOpenFounder,
}) => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-300 pt-12 pb-8 mt-16">
      <div className="max-w-5xl mx-auto px-3 sm:px-4 lg:px-6 space-y-10">
        
        {/* TOP BRAND & COPYRIGHT BANNER GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          
          {/* COLUMN 1: BRAND & VISION */}
          <div className="md:col-span-1 space-y-4">
            <div className="cursor-pointer" onClick={() => onNavigateTab('input')}>
              <CareerPlusLogo size="lg" lightText={true} />
            </div>

            <p className="text-xs text-slate-400 leading-relaxed font-medium">
              Enterprise candidate career intelligence powered by CAREER PLUS+ AI Engine. Turn resume gaps into competitive hiring advantages.
            </p>

            {/* FOUNDER SPOTLIGHT BADGE & SOCIAL LINKS */}
            {onOpenFounder && (
              <div className="space-y-2">
                <button
                  onClick={onOpenFounder}
                  className="w-full p-3 bg-slate-800/90 hover:bg-slate-800 border border-slate-700/80 rounded-2xl flex items-center space-x-3 transition-colors text-left cursor-pointer group shadow-sm"
                >
                  <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-blue-500/60 shadow-md shrink-0 bg-slate-800 group-hover:scale-105 transition-transform">
                    <img
                      src="https://i.postimg.cc/Z5G0BnZL/Generated-Image-September-14-2025-8-37AM-090126.png"
                      alt="Siddartha Jamandla"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-extrabold text-blue-400 uppercase tracking-wider flex items-center space-x-1">
                      <Award className="w-3 h-3 text-amber-300 inline" />
                      <span>Meet the Founder</span>
                    </span>
                    <h5 className="text-xs font-black text-white truncate">
                      Siddartha Jamandla
                    </h5>
                    <p className="text-[10px] text-slate-300 truncate font-semibold">
                      AIML Engineer & AI Systems Architect
                    </p>
                    <p className="text-[9px] text-slate-400 truncate">
                      Hyderabad, Telangana, India (500013)
                    </p>
                  </div>
                </button>

                {/* Founder Quick Social Connects */}
                <div className="flex items-center space-x-1.5 px-1">
                  <a
                    href="https://www.instagram.com/ya.its_me_21?igsh=MXJibWtwb2V0bnA1dw==&utm_source=ig_contact_invite"
                    target="_blank"
                    rel="noreferrer"
                    title="Instagram: @ya.its_me_21"
                    className="p-1.5 bg-slate-800 hover:bg-gradient-to-r hover:from-pink-600 hover:to-rose-600 border border-slate-700 rounded-lg text-slate-300 hover:text-white transition-all text-[11px] flex items-center space-x-1"
                  >
                    <Instagram className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/siddartha-jamandla-97350b384?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                    target="_blank"
                    rel="noreferrer"
                    title="LinkedIn Profile"
                    className="p-1.5 bg-slate-800 hover:bg-blue-600 border border-slate-700 rounded-lg text-slate-300 hover:text-white transition-all text-[11px] flex items-center space-x-1"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="https://github.com/Siddartha-Jamandla"
                    target="_blank"
                    rel="noreferrer"
                    title="GitHub Portfolio"
                    className="p-1.5 bg-slate-800 hover:bg-purple-600 border border-slate-700 rounded-lg text-slate-300 hover:text-white transition-all text-[11px] flex items-center space-x-1"
                  >
                    <Github className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="mailto:jamandlasiddartha@gmail.com"
                    title="Email: jamandlasiddartha@gmail.com"
                    className="p-1.5 bg-slate-800 hover:bg-emerald-600 border border-slate-700 rounded-lg text-slate-300 hover:text-white transition-all text-[11px] flex items-center space-x-1"
                  >
                    <Mail className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            )}

            {/* COPYRIGHTS ARE RESERVED BADGE */}
            <button
              onClick={() => onOpenLegal && onOpenLegal('rights')}
              className="inline-flex items-center space-x-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700/80 border border-slate-700/80 rounded-xl text-xs font-bold text-slate-200 shadow-2xs cursor-pointer transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>© 2026 CAREER PLUS+. All Rights Reserved.</span>
            </button>
          </div>

          {/* COLUMN 2: EXECUTIVE SUITE NAVIGATION */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-100 flex items-center space-x-1.5">
              <FileText className="w-3.5 h-3.5 text-blue-400" />
              <span>Resume & Profile Tools</span>
            </h4>
            <ul className="space-y-1.5 text-xs font-medium text-slate-400">
              <li>
                <button onClick={() => onNavigateTab('input')} className="hover:text-white transition-colors cursor-pointer">
                  ATS Resume Analyzer
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('builder')} className="hover:text-white transition-colors cursor-pointer">
                  Interactive Resume Builder
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('bullets')} className="hover:text-white transition-colors cursor-pointer">
                  Bullet Point Metric Enhancer
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('ats')} className="hover:text-white transition-colors cursor-pointer">
                  ATS Formatting Studio
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('cover')} className="hover:text-white transition-colors cursor-pointer">
                  Tailored Cover Letter
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('portfolio')} className="hover:text-white transition-colors cursor-pointer">
                  AI Web Portfolio Generator
                </button>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: INTERVIEW & CAREER HUB */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-100 flex items-center space-x-1.5">
              <Mic className="w-3.5 h-3.5 text-blue-400" />
              <span>Interview & Network</span>
            </h4>
            <ul className="space-y-1.5 text-xs font-medium text-slate-400">
              <li>
                <button onClick={() => onNavigateTab('voice-interview')} className="hover:text-white transition-colors cursor-pointer">
                  Live Voice & Video AI Studio
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('mock')} className="hover:text-white transition-colors cursor-pointer">
                  AI Voice Mock Interview Room
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('interviewer')} className="hover:text-white transition-colors cursor-pointer">
                  Hiring Manager Assessment
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('flashcards')} className="hover:text-white transition-colors cursor-pointer">
                  Technical Flashcard Drills
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('community-hub')} className="hover:text-white transition-colors cursor-pointer">
                  Alumni & Peer Network
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('chat')} className="hover:text-white transition-colors cursor-pointer">
                  24/7 AI Career Coach
                </button>
              </li>
            </ul>
          </div>

          {/* COLUMN 4: CAREER GROWTH & TRUST */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-100 flex items-center space-x-1.5">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>Career Growth & About</span>
            </h4>
            <ul className="space-y-1.5 text-xs font-medium text-slate-400">
              <li>
                <button onClick={() => onNavigateTab('career')} className="hover:text-white transition-colors cursor-pointer">
                  Career Pathway Roadmap
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('salary')} className="hover:text-white transition-colors cursor-pointer">
                  Salary Benchmark Estimator
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('offer-evaluator')} className="hover:text-white transition-colors cursor-pointer">
                  Offer & Equity Evaluator
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('tracker')} className="hover:text-white transition-colors cursor-pointer">
                  Candidate Job Tracker CRM
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('jobs')} className="hover:text-white transition-colors cursor-pointer">
                  Jobs & Upskill Projects
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('about')} className="hover:text-white transition-colors cursor-pointer flex items-center space-x-1 text-blue-400 font-bold">
                  <span>About Us & Founder</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('reviews')} className="hover:text-white transition-colors cursor-pointer flex items-center space-x-1 text-amber-300 font-bold">
                  <span>Community Reviews & Feedback</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </li>
              {isAdmin && (
                <li>
                  <button onClick={() => onNavigateTab('admin')} className="text-amber-400 hover:text-amber-300 font-bold transition-colors cursor-pointer flex items-center space-x-1">
                    <ShieldCheck className="w-3 h-3 text-amber-400" />
                    <span>Super Admin Control Panel</span>
                  </button>
                </li>
              )}
            </ul>

            <div className="pt-2">
              <button
                onClick={() => onOpenLegal && onOpenLegal('security')}
                className="w-full text-left p-3 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 rounded-2xl text-[11px] space-y-1 transition-colors cursor-pointer"
              >
                <div className="flex items-center space-x-1 text-emerald-400 font-extrabold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified Security & Encryption</span>
                </div>
                <p className="text-slate-400 leading-snug">
                  Zero retention of personal resume data. Enterprise SSL 256-bit encryption. Click for details.
                </p>
              </button>
            </div>
          </div>

        </div>

        {/* BOTTOM LEGAL & ALL RIGHTS RESERVED BADGE BAR */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 pt-2">
          
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onOpenLegal && onOpenLegal('rights')}
              className="inline-flex items-center px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-extrabold text-[10px] uppercase tracking-wider cursor-pointer transition-colors"
            >
              <Lock className="w-3 h-3 text-emerald-400 mr-1" /> All Rights Reserved
            </button>
            <span>CAREER PLUS+ / CareerPulse AI Platform v3.6</span>
          </div>

          <div className="flex items-center space-x-4 text-slate-400 font-bold">
            <button
              onClick={() => onOpenLegal && onOpenLegal('privacy')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              onClick={() => onOpenLegal && onOpenLegal('terms')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <span>•</span>
            <button
              onClick={() => onOpenLegal && onOpenLegal('security')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Security Center
            </button>
          </div>

        </div>

      </div>
    </footer>
  );
};
