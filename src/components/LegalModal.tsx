import React from 'react';
import { X, ShieldCheck, Lock, FileText, CheckCircle2 } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: 'privacy' | 'terms' | 'security' | 'rights';
  setActiveSection: (sec: 'privacy' | 'terms' | 'security' | 'rights') => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  onClose,
  activeSection,
  setActiveSection,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden relative">
        
        {/* Header Banner */}
        <div className="bg-slate-900 text-white p-6 relative flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600/20 border border-blue-500/30 rounded-2xl flex items-center justify-center text-blue-400">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-lg font-black tracking-tight text-white">Legal & Compliance Center</h2>
              <p className="text-xs text-slate-400">CareerPulse AI / CAREER PLUS+ Enterprise Trust Framework</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex bg-slate-100 p-1.5 border-b border-slate-200 text-xs font-bold overflow-x-auto">
          <button
            onClick={() => setActiveSection('privacy')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeSection === 'privacy' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Privacy Policy
          </button>
          <button
            onClick={() => setActiveSection('terms')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeSection === 'terms' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Terms of Service
          </button>
          <button
            onClick={() => setActiveSection('security')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeSection === 'security' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Security Center
          </button>
          <button
            onClick={() => setActiveSection('rights')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeSection === 'rights' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Rights Reserved
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs text-slate-700 leading-relaxed font-medium">
          
          {activeSection === 'privacy' && (
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-blue-600 font-extrabold text-sm border-b border-slate-100 pb-2">
                <Lock className="w-4 h-4 text-emerald-500" />
                <span>Candidate Data Privacy & Retention Policy</span>
              </div>
              <p>
                CareerPulse AI (CAREER PLUS+) is committed to strict candidate data privacy. Your resumes, text submissions, and career history are processed exclusively in-memory for live analysis and AI feedback generation.
              </p>
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-1.5">
                <div className="font-extrabold text-slate-900 flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Zero Unsolicited Data Monetization</span>
                </div>
                <p className="text-slate-600">
                  We never sell, rent, or trade your personal information, contact email, or resume content to recruiters, third parties, or advertising networks.
                </p>
              </div>
              <p>
                When logged into a registered candidate account, your saved analysis history is protected via encrypted tokens and stored safely for your personal career tracking.
              </p>
            </div>
          )}

          {activeSection === 'terms' && (
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-blue-600 font-extrabold text-sm border-b border-slate-100 pb-2">
                <FileText className="w-4 h-4 text-blue-600" />
                <span>Terms of Service Agreement</span>
              </div>
              <p>
                By accessing or using CareerPulse AI / CAREER PLUS+, you agree to be bound by these Terms of Service.
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-600">
                <li><strong>Permitted Use:</strong> You may use the platform for personal career development, resume enhancement, and mock interview practice.</li>
                <li><strong>AI Recommendations:</strong> AI score calculations and career advice are generated by the CAREER PLUS+ AI Engine for informational and advisory guidance.</li>
                <li><strong>Daily AI Fair Use:</strong> Daily rate limits (5 free AI analyses per day for guest users) maintain platform performance and server stability.</li>
              </ul>
            </div>
          )}

          {activeSection === 'security' && (
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-emerald-600 font-extrabold text-sm border-b border-slate-100 pb-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Enterprise Security & Encryption</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl">
                  <div className="font-extrabold text-emerald-900">256-Bit SSL Encryption</div>
                  <div className="text-slate-600 mt-1">All data transmitted between browser and server is encrypted in transit.</div>
                </div>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-2xl">
                  <div className="font-extrabold text-blue-900">Sandboxed Processing</div>
                  <div className="text-slate-600 mt-1">Server API calls proxy AI requests safely without exposing client credentials.</div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'rights' && (
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-amber-600 font-extrabold text-sm border-b border-slate-100 pb-2">
                <ShieldCheck className="w-4 h-4 text-amber-500" />
                <span>© 2026 CareerPulse AI / CAREER PLUS+. All Rights Reserved.</span>
              </div>
              <p>
                All brand marks, logos, user interface designs, AI feedback algorithms, and 3D motion animations (including the CAREER PLUS+ trademark and opening animation) are protected intellectual property.
              </p>
              <div className="p-3 bg-slate-900 text-white rounded-2xl text-xs space-y-1">
                <div className="font-bold text-amber-400">Official Platform Version</div>
                <div>CareerPulse AI Enterprise Edition v3.6 • Build 2026.07</div>
              </div>
            </div>
          )}

        </div>

        {/* Footer Close */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs rounded-xl transition-all cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
