import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ResumeInputSection } from './components/ResumeInputSection';
import { OverallScoreCard } from './components/OverallScoreCard';
import { SkillGapMatrix } from './components/SkillGapMatrix';
import { AtsOptimizationView } from './components/AtsOptimizationView';
import { CareerPathwaysView } from './components/CareerPathwaysView';
import { BulletRewriteStudio } from './components/BulletRewriteStudio';
import { InterviewPrepView } from './components/InterviewPrepView';
import { QuickActionChecklist } from './components/QuickActionChecklist';
import { CareerCoachChat } from './components/CareerCoachChat';
import { InterviewerAssessmentView } from './components/InterviewerAssessmentView';
import { MockInterviewRoom } from './components/MockInterviewRoom';
import { InteractiveResumeEditor } from './components/InteractiveResumeEditor';
import { CoverLetterGenerator } from './components/CoverLetterGenerator';
import { JobsAndUpskillHub } from './components/JobsAndUpskillHub';
import { LinkedInOptimizer } from './components/LinkedInOptimizer';
import { JobTrackerBoard } from './components/JobTrackerBoard';
import { SalaryCalculator } from './components/SalaryCalculator';
import { InterviewFlashcards } from './components/InterviewFlashcards';
import { AuthModal } from './components/AuthModal';
import { UserProfileView } from './components/UserProfileView';
import { AdminPanel } from './components/AdminPanel';
import { ReviewsSection } from './components/ReviewsSection';
import { DailyLimitModal } from './components/DailyLimitModal';
import { VoiceVideoInterviewer } from './components/VoiceVideoInterviewer';
import { PortfolioGenerator } from './components/PortfolioGenerator';
import { JobTrackerExtension } from './components/JobTrackerExtension';
import { SkillVerificationChallenges } from './components/SkillVerificationChallenges';
import { OfferEvaluator } from './components/OfferEvaluator';
import { AlumniPeerNetwork } from './components/AlumniPeerNetwork';
import { AboutUsView } from './components/AboutUsView';
import { Footer } from './components/Footer';
import { LegalModal } from './components/LegalModal';
import { FounderModal } from './components/FounderModal';
import { DEFAULT_SAMPLE_ANALYSIS } from './utils/defaultAnalysis';
import { ResumeAnalysisInput, ResumeAnalysisResult, UserProfile } from './types';
import { Sparkles, CheckCircle2, ShieldCheck, AlertTriangle } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('input');
  const [analysisResult, setAnalysisResult] = useState<ResumeAnalysisResult | null>(null);
  const [currentInput, setCurrentInput] = useState<ResumeAnalysisInput | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Legal & Security Modal State
  const [isLegalModalOpen, setIsLegalModalOpen] = useState<boolean>(false);
  const [legalSection, setLegalSection] = useState<'privacy' | 'terms' | 'security' | 'rights'>('privacy');

  // Founder Spotlight Modal State
  const [isFounderModalOpen, setIsFounderModalOpen] = useState<boolean>(false);

  // Authentication State
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [saveNotification, setSaveNotification] = useState<string | null>(null);

  // Daily AI Usage Rate Limiting State
  const [usageStatus, setUsageStatus] = useState<{
    usageCount: number;
    dailyLimit: number;
    remainingUses: number;
    limitReached: boolean;
    isAdmin: boolean;
    resetTime?: string;
  }>({
    usageCount: 0,
    dailyLimit: 5,
    remainingUses: 5,
    limitReached: false,
    isAdmin: false,
  });
  const [isDailyLimitModalOpen, setIsDailyLimitModalOpen] = useState<boolean>(false);

  // Dark / Light Mode Theme State
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('cp_theme') === 'dark';
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('cp_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('cp_theme', 'light');
    }
  }, [isDarkMode]);

  // Initialize session from localStorage and log visitor ping
  useEffect(() => {
    const savedToken = localStorage.getItem('cp_auth_token');
    if (savedToken) {
      fetchCurrentUser(savedToken);
    }
    fetchUsageStatus();
    logVisitorPing();
  }, []);

  const logVisitorPing = async () => {
    try {
      const token = localStorage.getItem('cp_auth_token');
      const headers: any = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;
      await fetch('/api/visitor-log', { method: 'POST', headers });
    } catch (err) {
      // silent
    }
  };

  const fetchUsageStatus = async () => {
    try {
      const token = localStorage.getItem('cp_auth_token');
      const headers: any = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch('/api/usage-status', { headers });
      if (res.ok) {
        const data = await res.json();
        setUsageStatus(data);
      }
    } catch (err) {
      console.error('Error fetching usage status:', err);
    }
  };

  // Hash-based multi-page URL sync
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        changeTabWithHash(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    if (window.location.hash) {
      handleHashChange();
    }

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const changeTabWithHash = (tab: string) => {
    // If navigating to a tool feature while analysisResult is null, populate with default sample analysis
    if (tab !== 'input' && tab !== 'profile' && tab !== 'admin' && tab !== 'reviews' && tab !== 'about' && !analysisResult) {
      setAnalysisResult(DEFAULT_SAMPLE_ANALYSIS);
      if (!currentInput) {
        setCurrentInput({ resumeText: '', targetRole: 'Senior Full Stack Architect' });
      }
    }
    setActiveTab(tab);
    window.location.hash = tab;
  };

  const fetchCurrentUser = async (token: string) => {
    try {
      const res = await fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setCurrentUser(data.user);
        setAuthToken(token);
      } else {
        localStorage.removeItem('cp_auth_token');
        setCurrentUser(null);
        setAuthToken(null);
      }
    } catch (err) {
      console.error('Error verifying auth token:', err);
      localStorage.removeItem('cp_auth_token');
      setCurrentUser(null);
      setAuthToken(null);
    }
  };

  const handleLoginSuccess = (user: UserProfile, token: string) => {
    setCurrentUser(user);
    setAuthToken(token);
    localStorage.setItem('cp_auth_token', token);
    fetchUsageStatus();
  };

  const handleLogout = async () => {
    if (authToken) {
      try {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: { Authorization: `Bearer ${authToken}` },
        });
      } catch (err) {
        console.error('Logout error:', err);
      }
    }
    setCurrentUser(null);
    setAuthToken(null);
    localStorage.removeItem('cp_auth_token');
    fetchUsageStatus();
    changeTabWithHash('input');
  };

  const autoSaveAnalysisToProfile = async (analysis: ResumeAnalysisResult, role: string, token: string) => {
    try {
      const res = await fetch('/api/user/saved-analyses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ targetRole: role, analysis }),
      });
      if (res.ok) {
        setSaveNotification(`Report saved to ${currentUser?.name || 'user'} profile!`);
        setTimeout(() => setSaveNotification(null), 4000);
      }
    } catch (err) {
      console.error('Error auto-saving analysis:', err);
    }
  };

  const handleAnalyze = async (input: ResumeAnalysisInput) => {
    setIsLoading(true);
    setErrorMessage(null);
    setCurrentInput(input);

    try {
      const token = localStorage.getItem('cp_auth_token');
      const headers: any = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const response = await fetch('/api/analyze-resume', {
        method: 'POST',
        headers,
        body: JSON.stringify(input),
      });

      const data = await response.json();

      if (response.status === 429 || data.limitReached) {
        const limitErr = data.error || 'Your daily limit is finished, come back again tomorrow.';
        setErrorMessage(limitErr);
        setIsDailyLimitModalOpen(true);
        fetchUsageStatus();
        return;
      }

      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze resume. Please try again.');
      }

      setAnalysisResult(data);
      changeTabWithHash('input');
      fetchUsageStatus();

      // Auto-save to user profile history if logged in
      if (authToken) {
        autoSaveAnalysisToProfile(data, input.targetRole || 'Target Role', authToken);
      }
    } catch (err: any) {
      console.error('Error during analysis:', err);
      setErrorMessage(err.message || 'An error occurred while communicating with the AI Engine.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadSavedAnalysis = (savedAnalysis: ResumeAnalysisResult, role: string) => {
    setAnalysisResult(savedAnalysis);
    setCurrentInput({ resumeText: '', targetRole: role });
    changeTabWithHash('input');
  };

  const handleNewAnalysisClick = () => {
    setAnalysisResult(null);
    setCurrentInput(null);
    changeTabWithHash('input');
    setErrorMessage(null);
  };

  const handleOpenLegalModal = (sec: 'privacy' | 'terms' | 'security' | 'rights') => {
    setLegalSection(sec);
    setIsLegalModalOpen(true);
  };

  const targetRoleName = currentInput?.targetRole || currentUser?.targetRole || 'Target Role';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans flex flex-col antialiased transition-colors duration-200 perspective-1000">

      {/* LEGAL & COMPLIANCE MODAL */}
      <LegalModal
        isOpen={isLegalModalOpen}
        onClose={() => setIsLegalModalOpen(false)}
        activeSection={legalSection}
        setActiveSection={setLegalSection}
      />

      {/* Top Header with Responsive Menu Bar, Auth & Rate Limit Controls */}
      <Header
        activeTab={activeTab}
        setActiveTab={changeTabWithHash}
        hasAnalysis={!!analysisResult}
        onNewAnalysisClick={handleNewAnalysisClick}
        currentUser={currentUser}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
        usageCount={usageStatus.usageCount}
        dailyLimit={usageStatus.dailyLimit}
        limitReached={usageStatus.limitReached}
        onOpenDailyLimitModal={() => setIsDailyLimitModalOpen(true)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        onOpenFounder={() => setIsFounderModalOpen(true)}
      />

      {/* Top Warning Banner if Daily Limit Reached */}
      {usageStatus.limitReached && !usageStatus.isAdmin && (
        <div className="bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white px-4 py-2.5 text-xs font-bold shadow-md flex items-center justify-between z-30">
          <div className="flex items-center space-x-2 max-w-4xl mx-auto">
            <AlertTriangle className="w-4 h-4 text-amber-300 shrink-0 animate-pulse" />
            <span>
              <strong>Your daily limit is finished, come back again tomorrow.</strong> You have used all {usageStatus.dailyLimit} daily AI analyses allocated for today.
            </span>
          </div>

          <button
            onClick={() => setIsDailyLimitModalOpen(true)}
            className="px-3 py-1 bg-white/20 hover:bg-white/30 text-white rounded-lg text-[11px] font-extrabold uppercase tracking-wider shrink-0 cursor-pointer ml-2"
          >
            View Reset Timer
          </button>
        </div>
      )}

      {/* Save Notification Toast */}
      {saveNotification && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center space-x-2 text-xs font-bold animate-in fade-in slide-in-from-bottom-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{saveNotification}</span>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* VIEW 1: USER PROFILE PAGE */}
        {activeTab === 'profile' ? (
          currentUser ? (
            <UserProfileView
              user={currentUser}
              token={authToken || ''}
              onUpdateUser={(updated) => setCurrentUser(updated)}
              onLoadSavedAnalysis={handleLoadSavedAnalysis}
              onLogout={handleLogout}
              onNavigateTab={changeTabWithHash}
            />
          ) : (
            <div className="max-w-md mx-auto py-12 text-center space-y-4">
              <ShieldCheck className="w-12 h-12 text-blue-600 mx-auto" />
              <h2 className="text-xl font-black text-slate-900">Sign In Required</h2>
              <p className="text-xs text-slate-500">Please sign in to view and manage your candidate profile.</p>
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
              >
                Sign In / Register
              </button>
            </div>
          )
        ) : activeTab === 'admin' ? (
          /* VIEW 2: SUPER ADMIN PANEL */
          <AdminPanel
            currentUser={currentUser}
            token={authToken}
            onOpenAuthModal={() => setIsAuthModalOpen(true)}
          />
        ) : activeTab === 'reviews' ? (
          /* VIEW 3: COMMUNITY REVIEWS & FEEDBACK */
          <ReviewsSection
            currentUser={currentUser}
            onOpenAuthModal={() => setIsAuthModalOpen(true)}
          />
        ) : activeTab === 'about' ? (
          /* VIEW 4: ABOUT US & FOUNDER SECTION */
          <AboutUsView
            onNavigateTab={changeTabWithHash}
            onOpenFounderModal={() => setIsFounderModalOpen(true)}
          />
        ) : activeTab === 'voice-interview' ? (
          <VoiceVideoInterviewer analysisData={analysisResult} targetRole={targetRoleName} />
        ) : activeTab === 'portfolio' ? (
          <PortfolioGenerator analysisData={analysisResult} />
        ) : activeTab === 'extension' ? (
          <JobTrackerExtension />
        ) : activeTab === 'skill-challenges' ? (
          <SkillVerificationChallenges />
        ) : activeTab === 'offer-evaluator' ? (
          <OfferEvaluator />
        ) : activeTab === 'community-hub' ? (
          <AlumniPeerNetwork />
        ) : !analysisResult ? (
          /* VIEW 4: INITIAL RESUME INPUT FORM */
          <ResumeInputSection
            onAnalyze={handleAnalyze}
            isLoading={isLoading}
            errorMessage={errorMessage}
          />
        ) : (
          /* VIEW 5: ANALYSIS DASHBOARD & FEATURE SUB-PAGES */
          <div className="space-y-8">
            {activeTab === 'input' && (
              <div className="space-y-8">
                <OverallScoreCard
                  result={analysisResult}
                  targetRole={targetRoleName}
                  onNavigateTab={(tab) => changeTabWithHash(tab)}
                />

                <QuickActionChecklist
                  initialChecklist={analysisResult.quickActionChecklist}
                  currentOverallScore={analysisResult.overallScore}
                />
              </div>
            )}

            {activeTab === 'jobs' && (
              <JobsAndUpskillHub analysis={analysisResult} targetRole={targetRoleName} />
            )}

            {activeTab === 'interviewer' && (
              <InterviewerAssessmentView analysis={analysisResult} targetRole={targetRoleName} />
            )}

            {activeTab === 'mock' && (
              <MockInterviewRoom analysis={analysisResult} targetRole={targetRoleName} />
            )}

            {activeTab === 'builder' && (
              <InteractiveResumeEditor analysis={analysisResult} targetRole={targetRoleName} />
            )}

            {activeTab === 'cover' && (
              <CoverLetterGenerator analysis={analysisResult} targetRole={targetRoleName} />
            )}

            {activeTab === 'linkedin' && (
              <LinkedInOptimizer analysis={analysisResult} targetRole={targetRoleName} />
            )}

            {activeTab === 'tracker' && (
              <JobTrackerBoard analysis={analysisResult} targetRole={targetRoleName} />
            )}

            {activeTab === 'salary' && (
              <SalaryCalculator analysis={analysisResult} targetRole={targetRoleName} />
            )}

            {activeTab === 'flashcards' && (
              <InterviewFlashcards analysis={analysisResult} targetRole={targetRoleName} />
            )}

            {activeTab === 'skills' && (
              <SkillGapMatrix result={analysisResult} targetRole={targetRoleName} />
            )}

            {activeTab === 'ats' && <AtsOptimizationView result={analysisResult} />}

            {activeTab === 'career' && (
              <CareerPathwaysView result={analysisResult} targetRole={targetRoleName} />
            )}

            {activeTab === 'bullets' && (
              <BulletRewriteStudio result={analysisResult} targetRole={targetRoleName} />
            )}

            {activeTab === 'interview' && <InterviewPrepView result={analysisResult} />}

            {activeTab === 'chat' && (
              <CareerCoachChat result={analysisResult} targetRole={targetRoleName} />
            )}
          </div>
        )}
      </main>

      {/* Auth & Admin Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Daily AI Usage Limit Modal */}
      <DailyLimitModal
        isOpen={isDailyLimitModalOpen}
        onClose={() => setIsDailyLimitModalOpen(false)}
        usageCount={usageStatus.usageCount}
        dailyLimit={usageStatus.dailyLimit}
        resetTime={usageStatus.resetTime}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
      />

      {/* Founder Spotlight Modal */}
      <FounderModal
        isOpen={isFounderModalOpen}
        onClose={() => setIsFounderModalOpen(false)}
      />

      {/* Comprehensive Multi-page Footer */}
      <Footer
        onNavigateTab={changeTabWithHash}
        isAdmin={currentUser?.isAdmin}
        onOpenLegal={handleOpenLegalModal}
        onOpenFounder={() => setIsFounderModalOpen(true)}
      />
    </div>
  );
}

