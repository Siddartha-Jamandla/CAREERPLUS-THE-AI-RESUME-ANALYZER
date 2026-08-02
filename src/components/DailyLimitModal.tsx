import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, 
  Clock, 
  Calendar, 
  ShieldCheck, 
  X, 
  Sparkles, 
  RefreshCw, 
  Lock,
  ArrowRight,
  Zap
} from 'lucide-react';

interface DailyLimitModalProps {
  isOpen: boolean;
  onClose: () => void;
  usageCount: number;
  dailyLimit: number;
  isSignedUp?: boolean;
  resetTime?: string;
  onOpenAuthModal?: () => void;
}

export const DailyLimitModal: React.FC<DailyLimitModalProps> = ({
  isOpen,
  onClose,
  usageCount,
  dailyLimit,
  isSignedUp = false,
  resetTime,
  onOpenAuthModal,
}) => {
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number }>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (!isOpen) return;

    const calculateTimeLeft = () => {
      const now = new Date();
      let target: Date;
      if (resetTime) {
        target = new Date(resetTime);
      } else {
        target = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
      }

      const diffMs = Math.max(0, target.getTime() - now.getTime());
      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

      setTimeLeft({ hours, minutes, seconds });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, [isOpen, resetTime]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-red-200 max-w-lg w-full overflow-hidden relative">
        
        {/* Red / Gradient Alert Banner Header */}
        <div className="bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/20 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-2 text-amber-200 text-xs font-black uppercase tracking-widest mb-2">
            <AlertTriangle className="w-4 h-4 text-amber-300 shrink-0" />
            <span>{!isSignedUp ? 'Guest Analysis Limit Reached' : 'AI Resume Credit Limit Reached'}</span>
          </div>

          <h2 className="text-2xl font-black tracking-tight text-white leading-snug">
            {!isSignedUp ? 'Unlock 50 Daily Credits by Signing Up!' : 'Your daily credit limit has been reached.'}
          </h2>

          <p className="text-xs text-rose-100 mt-2 font-medium leading-relaxed">
            {!isSignedUp ? (
              <>You have used your <strong>15 free guest AI analysis credits</strong>. Create a free account or sign in to unlock <strong>50 Daily AI Resume Credits</strong>!</>
            ) : (
              <>You have used all <strong className="font-bold text-white">{dailyLimit} of {dailyLimit}</strong> allocated AI resume optimization & career analysis credits today.</>
            )}
          </p>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 space-y-5">

          {/* Server Peak Capacity Notice Callout */}
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 text-amber-900 space-y-1">
            <div className="flex items-center space-x-2 text-amber-800 font-extrabold text-xs">
              <Zap className="w-4 h-4 text-amber-600 shrink-0 fill-amber-400" />
              <span>Server Peak Capacity Notice</span>
            </div>
            <p className="text-xs text-amber-900 leading-relaxed font-medium">
              The server is currently operating at peak time of ending the credit limit. All available credits for this session have been used.
            </p>
          </div>

          {/* Special Signup Callout for Guests */}
          {!isSignedUp && onOpenAuthModal && (
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-4 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="space-y-1 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start space-x-1.5">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span className="font-black text-sm">Create Free Account</span>
                </div>
                <p className="text-xs text-blue-100 font-medium">
                  Extend your limit from 1 to <strong>5 AI Credits</strong> immediately after signing up!
                </p>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onOpenAuthModal();
                }}
                className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl shadow-xs transition-all flex items-center space-x-1.5 shrink-0 cursor-pointer"
              >
                <span>Sign Up for 5 Credits</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Usage Meter Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between text-xs font-extrabold text-slate-700">
              <span className="flex items-center space-x-1.5">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>AI Resume Usage</span>
              </span>
              <span className="text-red-600 font-black">{usageCount} / {dailyLimit} Used ({dailyLimit === 1 ? 'Guest Credit' : 'Signed-in User'})</span>
            </div>

            <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden p-0.5">
              <div className="h-full bg-gradient-to-r from-amber-500 to-red-600 rounded-full w-full transition-all duration-500" />
            </div>
          </div>

          {/* Why limits exist message */}
          <div className="space-y-1.5 text-xs text-slate-600">
            <h4 className="font-extrabold text-slate-900 flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>AI Access Tiers</span>
            </h4>
            <p className="leading-relaxed text-slate-600">
              Unauthenticated guests receive <strong>1 free credit</strong>. Signed up users receive <strong>5 AI Resume Credits</strong>.
            </p>
          </div>

          {/* Action buttons */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <button
              onClick={onClose}
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs rounded-xl transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>Understood, Close</span>
            </button>

            {!isSignedUp && onOpenAuthModal && (
              <button
                onClick={() => {
                  onClose();
                  onOpenAuthModal();
                }}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs rounded-xl transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>Sign In / Register for 5 Credits</span>
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
