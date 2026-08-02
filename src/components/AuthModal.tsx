import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  Mail, 
  User, 
  Briefcase, 
  ShieldCheck, 
  ArrowRight, 
  AlertCircle, 
  CheckCircle2,
  Eye,
  EyeOff
} from 'lucide-react';
import { UserProfile } from '../types';
import { CareerPlusLogo } from './CareerPlusLogo';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserProfile, token: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
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

  if (!isOpen) return null;

  const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const resetModalState = () => {
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

      setSuccessMessage('Signed in successfully!');
      setTimeout(() => {
        onLoginSuccess(data.user, data.token);
        onClose();
        resetModalState();
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

      setSuccessMessage('Password reset successfully! Logging you in...');
      setTimeout(() => {
        if (data.token && data.user) {
          onLoginSuccess(data.user, data.token);
          onClose();
          resetModalState();
        } else {
          setEmail(forgotEmail.trim());
          setPassword(newPassword);
          setActiveTab('login');
          setForgotStep(1);
        }
      }, 800);
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
        body: JSON.stringify({ name: trimmedName, email: trimmedEmail, password, targetRole: targetRole.trim() }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to register account.');
      }

      setSuccessMessage('Account created and signed in successfully!');
      setTimeout(() => {
        onLoginSuccess(data.user, data.token);
        onClose();
        resetModalState();
      }, 400);
    } catch (err: any) {
      setError(err.message || 'Registration failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-md w-full overflow-hidden relative">
        
        {/* Top Header Banner */}
        <div className="bg-slate-900 text-white p-6 relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="mb-4">
            <CareerPlusLogo size="lg" lightText={true} />
          </div>

          <h2 className="text-xl font-black tracking-tight text-white">
            {activeTab === 'login' && 'Sign In to Your Account'}
            {activeTab === 'signup' && 'Create Candidate Account'}
            {activeTab === 'forgot' && 'Reset Forgotten Password'}
          </h2>

          <p className="text-xs text-slate-400 mt-1">
            {activeTab === 'forgot' 
              ? 'Create a new password for your registered email address.'
              : 'Access saved resumes, profile analytics, and AI career tools.'}
          </p>

          {/* TAB SWITCHER */}
          <div className="flex bg-slate-800 p-1 rounded-xl mt-4 text-xs font-bold">
            <button
              type="button"
              onClick={() => { setActiveTab('login'); resetModalState(); }}
              className={`flex-1 py-2 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'login' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setActiveTab('signup'); resetModalState(); }}
              className={`flex-1 py-2 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'signup' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign Up
            </button>
            <button
              type="button"
              onClick={() => { setActiveTab('forgot'); setForgotEmail(email); resetModalState(); }}
              className={`flex-1 py-2 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'forgot' ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              Reset
            </button>
          </div>
        </div>

        {/* Modal Form Body */}
        <div className="p-6 space-y-4">
          
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-xs font-bold flex items-center space-x-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs font-bold flex items-center space-x-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* TAB: LOGIN FORM */}
          {activeTab === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <label className="font-extrabold text-slate-700 uppercase text-[10px]">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-slate-900 font-medium focus:ring-2 focus:ring-blue-600 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="font-extrabold text-slate-700 uppercase text-[10px]">Password</label>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('forgot');
                      setForgotStep(1);
                      setForgotEmail(email);
                      resetModalState();
                    }}
                    className="text-blue-600 hover:text-blue-700 font-bold text-[11px] hover:underline cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type={showLoginPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-10 py-2.5 border border-slate-200 rounded-xl text-slate-900 font-medium focus:ring-2 focus:ring-blue-600 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute right-3 top-2.5 p-1 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                    title={showLoginPassword ? "Hide password" : "Show password"}
                  >
                    {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl transition-all shadow-xs flex items-center justify-center space-x-2 cursor-pointer mt-2"
              >
                <span>{isLoading ? 'Signing In...' : 'Sign In'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* TAB: FORGOT / RESET PASSWORD FORM */}
          {activeTab === 'forgot' && (
            <div>
              {forgotStep === 1 ? (
                <form onSubmit={handleForgotPasswordRequest} className="space-y-3.5 text-xs">
                  <p className="text-slate-600 text-xs">
                    Enter the email address associated with your CAREER PLUS+ account to receive a 6-digit verification reset code.
                  </p>

                  <div className="space-y-1">
                    <label className="font-extrabold text-slate-700 uppercase text-[10px]">Registered Email Address</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="email"
                        required
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        placeholder="name@domain.com"
                        className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-slate-900 font-medium focus:ring-2 focus:ring-amber-500 outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-extrabold rounded-xl transition-all shadow-xs flex items-center justify-center space-x-2 cursor-pointer mt-2"
                  >
                    <span>{isLoading ? 'Sending Reset Code...' : 'Send Verification Reset Code'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <form onSubmit={handleResetPasswordSubmit} className="space-y-3.5 text-xs">
                  {demoCode && (
                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl text-amber-900 text-xs space-y-1">
                      <p className="font-extrabold flex items-center space-x-1">
                        <ShieldCheck className="w-4 h-4 text-amber-600" />
                        <span>Verification Code Dispatched!</span>
                      </p>
                      <p className="text-[11px] text-amber-800">
                        Demo Reset Code: <strong className="text-amber-900 font-black text-sm tracking-wider px-1.5 py-0.5 bg-amber-100 rounded-md">{demoCode}</strong>
                      </p>
                    </div>
                  )}

                  <div className="space-y-1">
                    <label className="font-extrabold text-slate-700 uppercase text-[10px]">6-Digit Verification Code</label>
                    <div className="relative">
                      <ShieldCheck className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        value={otpCodeInput}
                        onChange={(e) => setOtpCodeInput(e.target.value)}
                        placeholder="e.g. 123456"
                        className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-slate-900 font-bold focus:ring-2 focus:ring-amber-500 outline-none tracking-widest text-center"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-extrabold text-slate-700 uppercase text-[10px]">New Password</label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type={showNewPassword ? "text" : "password"}
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter your new password"
                        className="w-full pl-9 pr-10 py-2.5 border border-slate-200 rounded-xl text-slate-900 font-medium focus:ring-2 focus:ring-amber-500 outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-2.5 p-1 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                        title={showNewPassword ? "Hide password" : "Show password"}
                      >
                        {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <button
                      type="button"
                      onClick={() => setForgotStep(1)}
                      className="text-xs text-slate-500 hover:text-slate-800 font-bold cursor-pointer"
                    >
                      ← Back to Email
                    </button>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="py-2.5 px-5 bg-amber-600 hover:bg-amber-700 text-white font-extrabold rounded-xl transition-all shadow-xs flex items-center justify-center space-x-1.5 cursor-pointer"
                    >
                      <span>{isLoading ? 'Resetting Password...' : 'Save New Password & Sign In'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

        {/* TAB: SIGNUP FORM */}
        {activeTab === 'signup' && (
          <form onSubmit={handleSignupSubmit} className="space-y-3 text-xs">
            <div className="space-y-1">
              <label className="font-extrabold text-slate-700 uppercase text-[10px]">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-slate-900 font-medium focus:ring-2 focus:ring-blue-600 outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-extrabold text-slate-700 uppercase text-[10px]">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-slate-900 font-medium focus:ring-2 focus:ring-blue-600 outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-extrabold text-slate-700 uppercase text-[10px]">Target Career Role</label>
              <div className="relative">
                <Briefcase className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  placeholder="e.g. Senior Software Engineer"
                  className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-slate-900 font-medium focus:ring-2 focus:ring-blue-600 outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-extrabold text-slate-700 uppercase text-[10px]">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type={showSignupPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-10 py-2 border border-slate-200 rounded-xl text-slate-900 font-medium focus:ring-2 focus:ring-blue-600 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowSignupPassword(!showSignupPassword)}
                  className="absolute right-3 top-2 p-1 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                  title={showSignupPassword ? "Hide password" : "Show password"}
                >
                  {showSignupPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl transition-all shadow-xs flex items-center justify-center space-x-2 cursor-pointer mt-2"
            >
              <span>{isLoading ? 'Creating Account...' : 'Create Account'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        </div>
      </div>
    </div>
  );
};
