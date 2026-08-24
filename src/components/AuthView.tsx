import React, { useState } from 'react';
import { 
  ArrowLeft,
  Lock, 
  Mail, 
  User, 
  Briefcase, 
  ShieldCheck, 
  ArrowRight, 
  AlertCircle, 
  CheckCircle2,
  Eye,
  EyeOff,
  Sparkles,
  Zap
} from 'lucide-react';
import { UserProfile } from '../types';
import { CareerPlusLogo } from './CareerPlusLogo';

interface AuthViewProps {
  returnTo?: string;
  onNavigateBack: () => void;
  onLoginSuccess: (user: UserProfile, token: string, returnDestination?: string) => void;
}

const TAB_NAME_MAP: Record<string, string> = {
  input: 'Home / Analyzer',
  jobs: 'Jobs & Projects',
  chat: 'AI Career Coach',
  reviews: 'Reviews & Feedback',
  about: 'About CAREER PLUS+',
  profile: 'My Profile & Reports',
  admin: 'Super Admin Portal',
  'voice-interview': 'Live Voice & Video Interview',
  mock: 'Mock Interview Room',
  interview: 'Interview Prep Questions',
  interviewer: 'Interviewer Assessment',
  flashcards: 'Interview Flashcards',
  'community-hub': 'Alumni Peer Network',
  builder: 'Interactive Resume Builder',
  ats: 'ATS Optimization',
  bullets: 'Bullet Rewrite Studio',
  portfolio: 'AI Web Portfolio Generator',
  cover: 'Cover Letter Generator',
  skills: 'Skill Gap Matrix',
  'skill-challenges': 'Skill Badges & Challenges',
  linkedin: 'LinkedIn Optimizer',
  career: 'Career Pathways',
  salary: 'Salary Calculator',
  'offer-evaluator': 'Offer & Equity Evaluator',
  tracker: 'Job Tracker CRM',
  extension: 'Job Tracker Extension',
};

export const AuthView: React.FC<AuthViewProps> = ({
  returnTo = 'input',
  onNavigateBack,
  onLoginSuccess,
}) => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup' | 'forgot'>('login');
  const [forgotStep, setForgotStep] = useState<1 | 2>(1);
  
  // Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [targetRole, setTargetRole] = useState('');

  // Password Visibility States
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Forgot Password States
  const [forgotEmail, setForgotEmail] = useState('');
  const [resetSessId, setResetSessId] = useState('');
  const [otpCodeInput, setOtpCodeInput] = useState('');
  const [demoCode, setDemoCode] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const returnPageName = TAB_NAME_MAP[returnTo] || 'Previous Page';

  const resetFormState = () => {
    setError(null);
    setSuccessMessage(null);
    setForgotStep(1);
    setDemoCode(null);
  };

  // LOGIN HANDLER
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    const trimmedEmail = email.trim();
    if (!trimmedEmail || !EMAIL_REGEX.test(trimmedEmail)) {
      setError('Please enter a valid email address (e.g. name@domain.com).');
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmedEmail, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to log in.');
      }

      setSuccessMessage(`Signed in successfully! Returning to ${returnPageName}...`);
      setTimeout(() => {
        onLoginSuccess(data.user, data.token, returnTo);
      }, 400);
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check credentials or sign up.');
    } finally {
      setIsLoading(false);
    }
  };

  // FORGOT PASSWORD REQUEST HANDLER (STEP 1)
  const handleForgotPasswordRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    const trimmedEmail = forgotEmail.trim();
    if (!trimmedEmail || !EMAIL_REGEX.test(trimmedEmail)) {
      setError('Please enter a valid registered email address.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmedEmail }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to request password reset code.');
      }

      setResetSessId(data.resetSessId || '');
      setDemoCode(data.otpCode || '123456');
      if (data.otpCode) {
        setOtpCodeInput(data.otpCode);
      }
      setForgotStep(2);
      setSuccessMessage(`Reset code generated! Use code ${data.otpCode} below to set your new password.`);
    } catch (err: any) {
      setError(err.message || 'Failed to request password reset.');
    } finally {
      setIsLoading(false);
    }
  };

  // RESET PASSWORD SUBMIT HANDLER (STEP 2)
  const handleResetPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!otpCodeInput || otpCodeInput.trim().length < 4) {
      setError('Please enter the 6-digit verification code.');
      return;
    }

    if (!newPassword || newPassword.length < 4) {
      setError('New password must be at least 4 characters long.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: forgotEmail.trim(),
          resetSessId,
          otpCode: otpCodeInput.trim(),
          newPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to reset password.');
      }

      setSuccessMessage(`Password reset successfully! Returning to ${returnPageName}...`);
      setTimeout(() => {
        if (data.token && data.user) {
          onLoginSuccess(data.user, data.token, returnTo);
        } else {
          setEmail(forgotEmail.trim());
          setPassword(newPassword);
          setActiveTab('login');
          setForgotStep(1);
        }
      }, 700);
    } catch (err: any) {
      setError(err.message || 'Password reset failed.');
    } finally {
      setIsLoading(false);
    }
  };

  // SIGNUP HANDLER
  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName) {
      setError('Please enter your full name.');
      return;
    }

    if (!trimmedEmail || !EMAIL_REGEX.test(trimmedEmail)) {
      setError('Please enter a valid email address (e.g. name@domain.com).');
      return;
    }

    if (!password || password.length < 4) {
      setError('Password must be at least 4 characters long.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: trimmedName, 
          email: trimmedEmail, 
          password, 
          targetRole: targetRole.trim() 
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to register account.');
      }

      setSuccessMessage(`Account created! Returning you to ${returnPageName}...`);
      setTimeout(() => {
        onLoginSuccess(data.user, data.token, returnTo);
      }, 400);
    } catch (err: any) {
      setError(err.message || 'Registration failed.');
    } finally {
      setIsLoading(false);
    }
  };

  // Quick One-Click Fill for Demo Testing
  const fillDemoAccount = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setActiveTab('login');
    setError(null);
    setSuccessMessage(null);
  };

  return (
    <div className="space-y-6 max-w-xl mx-auto py-4 px-2 sm:px-4 animate-in fade-in duration-200">
      
      {/* TOP NAVIGATION BACK BAR */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onNavigateBack}
          className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold transition-all shadow-2xs cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover:-translate-x-0.5 transition-transform" />
          <span>Return to {returnPageName}</span>
        </button>

        <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
          Redirect target: <strong className="text-blue-600 dark:text-blue-400">{returnPageName}</strong>
        </span>
      </div>

      {/* MAIN AUTH CARD */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        
        {/* Top Hero Banner */}
        <div className="bg-slate-900 text-white p-6 sm:p-8 relative">
          <div className="flex items-center justify-between mb-4">
            <CareerPlusLogo size="lg" lightText={true} />
            <div className="px-2.5 py-1 rounded-full bg-blue-900/60 border border-blue-700/60 text-[10px] font-extrabold text-blue-300 flex items-center space-x-1">
              <Zap className="w-3 h-3 text-amber-300" />
              <span>Full-Stack Auth</span>
            </div>
          </div>

          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            {activeTab === 'login' && 'Sign In to Your Account'}
            {activeTab === 'signup' && 'Create Candidate Account'}
            {activeTab === 'forgot' && 'Reset Forgotten Password'}
          </h1>

          <p className="text-xs text-slate-400 mt-1.5">
            {activeTab === 'forgot' 
              ? 'Enter your registered email to receive a 6-digit OTP code and set a new password.'
              : `Sign in to access your saved resume evaluations, profile reports, and continue to ${returnPageName}.`}
          </p>

          {/* TAB SWITCHER */}
          <div className="flex bg-slate-800/90 p-1 rounded-xl mt-6 text-xs font-bold border border-slate-700/60">
            <button
              type="button"
              onClick={() => { setActiveTab('login'); resetFormState(); }}
              className={`flex-1 py-2 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'login' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setActiveTab('signup'); resetFormState(); }}
              className={`flex-1 py-2 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'signup' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign Up
            </button>
            <button
              type="button"
              onClick={() => { setActiveTab('forgot'); setForgotEmail(email); resetFormState(); }}
              className={`flex-1 py-2 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'forgot' ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              Reset
            </button>
          </div>
        </div>

        {/* Card Form Body */}
        <div className="p-6 sm:p-8 space-y-5">
          
          {error && (
            <div className="p-3.5 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 rounded-2xl text-red-700 dark:text-red-300 text-xs font-bold flex items-center space-x-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-2xl text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center space-x-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* TAB 1: LOGIN FORM */}
          {activeTab === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-extrabold text-slate-700 dark:text-slate-300 uppercase text-[10px]">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full pl-10 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="font-extrabold text-slate-700 dark:text-slate-300 uppercase text-[10px]">Password</label>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('forgot');
                      setForgotStep(1);
                      setForgotEmail(email);
                      resetFormState();
                    }}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 font-bold text-[11px] hover:underline cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type={showLoginPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute right-3 top-2.5 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
                    title={showLoginPassword ? "Hide password" : "Show password"}
                  >
                    {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer mt-2"
              >
                <span>{isLoading ? 'Signing In...' : `Sign In & Return to ${returnPageName}`}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* TAB 2: FORGOT / RESET PASSWORD FORM */}
          {activeTab === 'forgot' && (
            <div>
              {forgotStep === 1 ? (
                <form onSubmit={handleForgotPasswordRequest} className="space-y-4 text-xs">
                  <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                    Enter the email address associated with your CAREER PLUS+ account to receive a 6-digit verification reset code.
                  </p>

                  <div className="space-y-1.5">
                    <label className="font-extrabold text-slate-700 dark:text-slate-300 uppercase text-[10px]">Registered Email Address</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="email"
                        required
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        placeholder="name@domain.com"
                        className="w-full pl-10 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-extrabold rounded-xl transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer mt-2"
                  >
                    <span>{isLoading ? 'Sending Reset Code...' : 'Send Verification Reset Code'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <form onSubmit={handleResetPasswordSubmit} className="space-y-4 text-xs">
                  {demoCode && (
                    <div className="p-3.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-2xl text-amber-900 dark:text-amber-300 text-xs space-y-1">
                      <p className="font-extrabold flex items-center space-x-1">
                        <ShieldCheck className="w-4 h-4 text-amber-600" />
                        <span>Verification Code Dispatched!</span>
                      </p>
                      <p className="text-[11px] text-amber-800 dark:text-amber-400">
                        Demo Reset Code: <strong className="text-amber-900 dark:text-white font-black text-sm tracking-wider px-1.5 py-0.5 bg-amber-200 dark:bg-amber-900 rounded-md">{demoCode}</strong>
                      </p>
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <label className="font-extrabold text-slate-700 dark:text-slate-300 uppercase text-[10px]">6-Digit Verification Code</label>
                    <div className="relative">
                      <ShieldCheck className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        required
                        value={otpCodeInput}
                        onChange={(e) => setOtpCodeInput(e.target.value)}
                        placeholder="e.g. 123456"
                        className="w-full pl-10 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-bold focus:ring-2 focus:ring-amber-500 outline-none tracking-widest text-center"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-extrabold text-slate-700 dark:text-slate-300 uppercase text-[10px]">New Password</label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type={showNewPassword ? "text" : "password"}
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter your new password"
                        className="w-full pl-10 pr-10 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-2.5 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
                        title={showNewPassword ? "Hide password" : "Show password"}
                      >
                        {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => setForgotStep(1)}
                      className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white font-bold cursor-pointer"
                    >
                      ← Back to Email
                    </button>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="py-2.5 px-5 bg-amber-600 hover:bg-amber-700 text-white font-extrabold rounded-xl transition-all shadow-md flex items-center justify-center space-x-1.5 cursor-pointer"
                    >
                      <span>{isLoading ? 'Resetting...' : 'Save & Continue'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* TAB 3: SIGNUP FORM */}
          {activeTab === 'signup' && (
            <form onSubmit={handleSignupSubmit} className="space-y-3.5 text-xs">
              <div className="space-y-1.5">
                <label className="font-extrabold text-slate-700 dark:text-slate-300 uppercase text-[10px]">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full pl-10 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-extrabold text-slate-700 dark:text-slate-300 uppercase text-[10px]">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full pl-10 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-extrabold text-slate-700 dark:text-slate-300 uppercase text-[10px]">Target Career Role</label>
                <div className="relative">
                  <Briefcase className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    placeholder="e.g. Senior Software Engineer"
                    className="w-full pl-10 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-extrabold text-slate-700 dark:text-slate-300 uppercase text-[10px]">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type={showSignupPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowSignupPassword(!showSignupPassword)}
                    className="absolute right-3 top-2.5 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
                    title={showSignupPassword ? "Hide password" : "Show password"}
                  >
                    {showSignupPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer mt-2"
              >
                <span>{isLoading ? 'Creating Account...' : `Register & Continue to ${returnPageName}`}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* QUICK DEMO & TEST ACCOUNTS */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                Quick Test Accounts (1-Click Fill)
              </span>
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => fillDemoAccount('alex.turner@example.com', 'candidate123')}
                className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 hover:bg-blue-50 dark:hover:bg-blue-950/40 border border-slate-200 dark:border-slate-700/80 text-left transition-colors cursor-pointer"
              >
                <div className="font-extrabold text-[11px] text-slate-900 dark:text-white flex items-center justify-between">
                  <span>Demo Candidate</span>
                  <span className="text-[9px] px-1.5 py-0.2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded font-bold">User</span>
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">alex.turner@example.com</div>
              </button>

              <button
                type="button"
                onClick={() => fillDemoAccount('jamandlasiddartha@gmail.com', 'admin123')}
                className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 hover:bg-amber-50 dark:hover:bg-amber-950/40 border border-slate-200 dark:border-slate-700/80 text-left transition-colors cursor-pointer"
              >
                <div className="font-extrabold text-[11px] text-slate-900 dark:text-white flex items-center justify-between">
                  <span>Super Admin</span>
                  <span className="text-[9px] px-1.5 py-0.2 bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-300 rounded font-bold">Founder</span>
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">jamandlasiddartha@gmail.com</div>
              </button>
            </div>
          </div>

        </div>
      </div>
      
      {/* BOTTOM RETURN LINK */}
      <div className="text-center">
        <button
          type="button"
          onClick={onNavigateBack}
          className="text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer inline-flex items-center space-x-1"
        >
          <span>← Cancel and return directly to {returnPageName}</span>
        </button>
      </div>

    </div>
  );
};
