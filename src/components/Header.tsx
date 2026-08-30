import React, { useState, useRef, useEffect } from 'react';
import { 
  Home,
  Sparkles, 
  Target, 
  ShieldCheck, 
  TrendingUp, 
  MessageSquare, 
  Zap, 
  UserCheck, 
  Mic, 
  Edit3, 
  Mail, 
  Share2, 
  Briefcase, 
  Calculator, 
  HelpCircle,
  User,
  Menu,
  X,
  ChevronDown,
  LogOut,
  Star,
  Sun,
  Moon,
  Globe,
  Award,
  Puzzle,
  Users,
  Video,
  Info
} from 'lucide-react';
import { UserProfile } from '../types';
import { CareerPlusLogo } from './CareerPlusLogo';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  hasAnalysis: boolean;
  onNewAnalysisClick: () => void;
  currentUser: UserProfile | null;
  onOpenAuthModal: () => void;
  onLogout: () => void;
  usageCount?: number;
  dailyLimit?: number;
  limitReached?: boolean;
  onOpenDailyLimitModal?: () => void;
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
  onOpenFounder?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  hasAnalysis,
  onNewAnalysisClick,
  currentUser,
  onOpenAuthModal,
  onLogout,
  usageCount = 0,
  dailyLimit = 5,
  limitReached = false,
  onOpenDailyLimitModal,
  isDarkMode = false,
  onToggleDarkMode,
  onOpenFounder,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  const isAdmin = currentUser?.isAdmin || currentUser?.email.toLowerCase() === 'jamandlasiddartha@gmail.com';

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const primaryNav = [
    { id: 'input', label: 'Home', icon: Home },
    { id: 'jobs', label: 'Jobs', icon: Briefcase },
    { id: 'chat', label: 'AI Coach', icon: MessageSquare },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'about', label: 'About', icon: Info },
  ];

  const interviewTools = [
    { id: 'voice-interview', label: 'Live AI Voice & Video', desc: 'Real-time webcam/mic mock interview simulation', icon: Video },
    { id: 'mock', label: 'Mock Interview Room', desc: 'Custom questions with AI feedback & scoring', icon: Mic },
    { id: 'interview', label: 'Interview Prep Questions', desc: 'Top behavioral & technical question drills', icon: HelpCircle },
    { id: 'interviewer', label: 'Interviewer Assessment', desc: 'Recruiter perspective analysis & gaps', icon: UserCheck },
    { id: 'flashcards', label: 'Flashcard Drills', desc: 'Rapid interview concept practice', icon: HelpCircle },
    { id: 'community-hub', label: 'Alumni Network', desc: 'Connect with verified candidate peers', icon: Users },
  ];

  const resumeTools = [
    { id: 'builder', label: 'Resume Builder', desc: 'Clean, ATS-ready formatted resume editor', icon: Edit3 },
    { id: 'ats', label: 'ATS Score Checker', desc: 'Keyword match & screening compatibility', icon: ShieldCheck },
    { id: 'bullets', label: 'Bullet Rewrite Studio', desc: 'Transform bullets using Google XYZ formula', icon: Edit3 },
    { id: 'portfolio', label: 'AI Web Portfolio', desc: 'Instant developer portfolio with live preview', icon: Globe },
    { id: 'cover', label: 'Cover Letter Generator', desc: 'Targeted letters tailored to job listings', icon: Mail },
    { id: 'skills', label: 'Skill Gap Matrix', desc: 'Visual benchmark vs job requirements', icon: Target },
    { id: 'skill-challenges', label: 'Skill Badges & Tests', desc: 'Take technical quizzes & earn badges', icon: Award },
    { id: 'linkedin', label: 'LinkedIn Optimizer', desc: 'Headline & summary booster', icon: Share2 },
  ];

  const careerTools = [
    { id: 'career', label: 'Career Pathways', desc: 'Explore career roadmaps & progressions', icon: TrendingUp },
    { id: 'salary', label: 'Salary Evaluator', desc: 'Market rates, percentiles & compensation', icon: Calculator },
    { id: 'offer-evaluator', label: 'Offer & Equity Evaluator', desc: 'Compare offers, base salary & stock equity', icon: Calculator },
    { id: 'tracker', label: 'Job Tracker CRM', desc: 'Kanban board for all your applications', icon: Briefcase },
    { id: 'extension', label: 'Job Extension Sync', desc: '1-click job auto-import helper', icon: Puzzle },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    setUserDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isInterviewActive = interviewTools.some(t => t.id === activeTab);
  const isResumeActive = resumeTools.some(t => t.id === activeTab);
  const isCareerActive = careerTools.some(t => t.id === activeTab);

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-xs transition-colors duration-200" ref={navRef}>
      {/* Centered container with clean 1024px maximum width */}
      <div className="max-w-5xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 gap-2">
          
          {/* Logo & Direct Home Link - Always routes to fresh AI Resume Analyzer Home */}
          <button
            type="button"
            onClick={() => {
              if (onNewAnalysisClick) {
                onNewAnalysisClick();
              } else {
                handleNavClick('input');
              }
              setMobileMenuOpen(false);
              setActiveDropdown(null);
              setUserDropdownOpen(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            title="CAREER PLUS+ AI Resume Analyzer Home"
            aria-label="CAREER PLUS+ AI Resume Analyzer Home"
            className="flex items-center space-x-1.5 text-left p-1 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500/40 cursor-pointer group shrink-0"
          >
            <CareerPlusLogo size="md" showText={true} />
          </button>

          {/* DESKTOP MAIN NAVIGATION MENU (Clean, simple, easily understandable tabs) */}
          <nav className="hidden lg:flex items-center space-x-1 text-xs font-semibold">
            {/* Home */}
            <button
              onClick={() => handleNavClick('input')}
              className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'input'
                  ? 'bg-blue-600 text-white font-bold shadow-xs'
                  : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>

            {/* Jobs */}
            <button
              onClick={() => handleNavClick('jobs')}
              className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'jobs'
                  ? 'bg-blue-600 text-white font-bold shadow-xs'
                  : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Jobs</span>
            </button>

            {/* Dropdown 1: Interview Hub */}
            <div className="relative">
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'interview' ? null : 'interview')}
                className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  isInterviewActive
                    ? 'bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-bold border border-blue-200 dark:border-blue-800'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Mic className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>Interview</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${activeDropdown === 'interview' ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === 'interview' && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-2 z-50 animate-in fade-in duration-150">
                  <div className="px-2 py-1 mb-1 text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Interview Preparation & Practice
                  </div>
                  {interviewTools.map((t) => {
                    const Icon = t.icon;
                    const isActive = activeTab === t.id;
                    return (
                      <button
                        key={t.id}
                        onClick={() => handleNavClick(t.id)}
                        className={`w-full text-left p-2 rounded-xl transition-colors flex items-start space-x-2.5 cursor-pointer ${
                          isActive 
                            ? 'bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-bold' 
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                        }`}
                      >
                        <div className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-xs font-bold leading-tight">{t.label}</div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5">{t.desc}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Dropdown 2: Resume Tools */}
            <div className="relative">
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'resume' ? null : 'resume')}
                className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  isResumeActive
                    ? 'bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-bold border border-blue-200 dark:border-blue-800'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>Resume</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${activeDropdown === 'resume' ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === 'resume' && (
                <div className="absolute top-full left-0 mt-2 w-76 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-2 z-50 animate-in fade-in duration-150 max-h-[80vh] overflow-y-auto">
                  <div className="px-2 py-1 mb-1 text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Resume Building & Optimization
                  </div>
                  {resumeTools.map((t) => {
                    const Icon = t.icon;
                    const isActive = activeTab === t.id;
                    return (
                      <button
                        key={t.id}
                        onClick={() => handleNavClick(t.id)}
                        className={`w-full text-left p-2 rounded-xl transition-colors flex items-start space-x-2.5 cursor-pointer ${
                          isActive 
                            ? 'bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-bold' 
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                        }`}
                      >
                        <div className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-xs font-bold leading-tight">{t.label}</div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5">{t.desc}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Dropdown 3: Career Growth */}
            <div className="relative">
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'career' ? null : 'career')}
                className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  isCareerActive
                    ? 'bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-bold border border-blue-200 dark:border-blue-800'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>Career</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${activeDropdown === 'career' ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === 'career' && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-2 z-50 animate-in fade-in duration-150">
                  <div className="px-2 py-1 mb-1 text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Career Progression & Compensation
                  </div>
                  {careerTools.map((t) => {
                    const Icon = t.icon;
                    const isActive = activeTab === t.id;
                    return (
                      <button
                        key={t.id}
                        onClick={() => handleNavClick(t.id)}
                        className={`w-full text-left p-2 rounded-xl transition-colors flex items-start space-x-2.5 cursor-pointer ${
                          isActive 
                            ? 'bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-bold' 
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                        }`}
                      >
                        <div className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-xs font-bold leading-tight">{t.label}</div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5">{t.desc}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* AI Coach */}
            <button
              onClick={() => handleNavClick('chat')}
              className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'chat'
                  ? 'bg-blue-600 text-white font-bold shadow-xs'
                  : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Coach</span>
            </button>

            {/* Reviews */}
            <button
              onClick={() => handleNavClick('reviews')}
              className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'reviews'
                  ? 'bg-blue-600 text-white font-bold shadow-xs'
                  : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Star className="w-3.5 h-3.5" />
              <span>Reviews</span>
            </button>

            {/* About */}
            <button
              onClick={() => handleNavClick('about')}
              className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'about'
                  ? 'bg-blue-600 text-white font-bold shadow-xs'
                  : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Info className="w-3.5 h-3.5" />
              <span>About</span>
            </button>
          </nav>

          {/* RIGHT ACTION CONTROLS */}
          <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">
            {/* DARK / LIGHT MODE TOGGLE */}
            {onToggleDarkMode && (
              <button
                onClick={onToggleDarkMode}
                title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                className="p-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-amber-300 rounded-lg transition-all cursor-pointer border border-slate-200 dark:border-slate-700 shadow-xs flex items-center justify-center"
              >
                {isDarkMode ? <Sun className="w-4 h-4 text-amber-400 fill-amber-300" /> : <Moon className="w-4 h-4 text-slate-700" />}
              </button>
            )}

            {/* DAILY AI USAGE BADGE */}
            <button
              onClick={onOpenDailyLimitModal}
              title={isAdmin ? 'Super Admin: Unlimited Access' : limitReached ? 'Daily Limit Finished' : `${dailyLimit - usageCount} AI Uses Left Today`}
              className={`flex items-center space-x-1 px-2 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer border ${
                isAdmin
                  ? 'bg-amber-50 dark:bg-amber-950/50 text-amber-900 dark:text-amber-300 border-amber-300 dark:border-amber-800'
                  : limitReached
                  ? 'bg-red-50 dark:bg-red-950/50 text-red-700 dark:text-red-300 border-red-300 dark:border-red-800 animate-pulse'
                  : 'bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800'
              }`}
            >
              <Zap className={`w-3 h-3 ${isAdmin ? 'text-amber-600 fill-amber-400' : limitReached ? 'text-red-600 fill-red-400' : 'text-blue-600 fill-blue-300'}`} />
              <span>{isAdmin ? '∞' : `${usageCount}/${dailyLimit}`}</span>
            </button>

            {/* USER PROFILE / AUTH MENU */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center space-x-1.5 p-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition-all border border-slate-200 dark:border-slate-700 cursor-pointer"
                >
                  <img
                    src={currentUser.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.name || currentUser.email)}&background=2563eb&color=ffffff&bold=true&size=256`}
                    alt={currentUser.name}
                    className="w-6 h-6 rounded-md object-cover"
                  />
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 hidden md:block max-w-[80px] truncate">
                    {currentUser.name.split(' ')[0]}
                  </span>
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-2 z-50 animate-in fade-in duration-150">
                    <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800 space-y-0.5">
                      <span className="font-extrabold text-slate-900 dark:text-white text-xs block truncate">{currentUser.name}</span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono block truncate">{currentUser.email}</span>
                      {isAdmin && (
                        <span className="inline-block mt-1 px-2 py-0.5 bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 font-extrabold text-[9px] rounded-md uppercase">
                          Super Admin
                        </span>
                      )}
                    </div>

                    <div className="py-1 space-y-0.5">
                      <button
                        onClick={() => { handleNavClick('profile'); setUserDropdownOpen(false); }}
                        className="w-full text-left px-3 py-2 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg flex items-center space-x-2 cursor-pointer"
                      >
                        <User className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                        <span>My Profile & Reports</span>
                      </button>

                      {isAdmin && (
                        <button
                          onClick={() => { handleNavClick('admin'); setUserDropdownOpen(false); }}
                          className="w-full text-left px-3 py-2 text-xs font-bold text-amber-900 dark:text-amber-200 bg-amber-50 dark:bg-amber-950/50 hover:bg-amber-100 dark:hover:bg-amber-900/60 rounded-lg flex items-center space-x-2 cursor-pointer"
                        >
                          <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                          <span>Admin Portal</span>
                        </button>
                      )}

                      <button
                        onClick={() => { onLogout(); setUserDropdownOpen(false); }}
                        className="w-full text-left px-3 py-2 text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg flex items-center space-x-2 cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenAuthModal}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-all shadow-xs flex items-center space-x-1 cursor-pointer"
              >
                <User className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sign In</span>
              </button>
            )}

            {/* MOBILE MENU TOGGLE BUTTON */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* MOBILE SLIDE-OUT MENU DRAWER */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-slate-100 dark:border-slate-800 space-y-4 animate-in slide-in-from-top-2 duration-200">
            {/* Primary Mobile Links */}
            <div className="grid grid-cols-2 gap-2 text-xs font-bold">
              {primaryNav.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`p-2.5 rounded-xl text-left flex items-center space-x-2 transition-colors ${
                      isActive 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}

              {currentUser && (
                <button
                  onClick={() => handleNavClick('profile')}
                  className={`p-2.5 rounded-xl text-left flex items-center space-x-2 ${
                    activeTab === 'profile' ? 'bg-blue-600 text-white' : 'bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200'
                  }`}
                >
                  <User className="w-4 h-4" />
                  <span>My Profile</span>
                </button>
              )}

              {isAdmin && (
                <button
                  onClick={() => handleNavClick('admin')}
                  className={`col-span-2 p-2.5 rounded-xl text-xs font-bold text-left flex items-center space-x-2 ${
                    activeTab === 'admin' ? 'bg-amber-600 text-white' : 'bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  <span>Super Admin Portal</span>
                </button>
              )}
            </div>

            {/* Categorized Tools in Mobile Drawer */}
            <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
              {/* Interview Hub */}
              <div>
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-1.5">Interview Hub</span>
                <div className="grid grid-cols-2 gap-1.5 text-xs font-medium">
                  {interviewTools.map((t) => {
                    const Icon = t.icon;
                    return (
                      <button
                        key={t.id}
                        onClick={() => handleNavClick(t.id)}
                        className={`p-2 rounded-lg text-left flex items-center space-x-1.5 transition-colors ${
                          activeTab === t.id ? 'bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-bold' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                        <span className="truncate">{t.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Resume Tools */}
              <div>
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-1.5">Resume Studio</span>
                <div className="grid grid-cols-2 gap-1.5 text-xs font-medium">
                  {resumeTools.map((t) => {
                    const Icon = t.icon;
                    return (
                      <button
                        key={t.id}
                        onClick={() => handleNavClick(t.id)}
                        className={`p-2 rounded-lg text-left flex items-center space-x-1.5 transition-colors ${
                          activeTab === t.id ? 'bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-bold' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                        <span className="truncate">{t.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Career Growth */}
              <div>
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-1.5">Career & Compensation</span>
                <div className="grid grid-cols-2 gap-1.5 text-xs font-medium">
                  {careerTools.map((t) => {
                    const Icon = t.icon;
                    return (
                      <button
                        key={t.id}
                        onClick={() => handleNavClick(t.id)}
                        className={`p-2 rounded-lg text-left flex items-center space-x-1.5 transition-colors ${
                          activeTab === t.id ? 'bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-bold' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                        <span className="truncate">{t.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {!currentUser && (
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenAuthModal();
                    }}
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center justify-center space-x-2 transition-colors cursor-pointer shadow-xs"
                  >
                    <User className="w-4 h-4" />
                    <span>Sign In / Create Account</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
