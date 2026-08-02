import React, { useState } from 'react';
import { 
  Sparkles, 
  FileText, 
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

  const isAdmin = currentUser?.isAdmin || currentUser?.email.toLowerCase() === 'jamandlasiddartha@gmail.com';

  const primaryNav = [
    { id: 'input', label: 'Analyzer', icon: FileText },
    { id: 'jobs', label: 'Jobs & Projects', icon: Briefcase },
    { id: 'chat', label: 'AI Coach', icon: MessageSquare },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'about', label: 'About Us', icon: Info },
  ];

  const interviewTools = [
    { id: 'interviewer', label: 'Interviewer Report', icon: UserCheck },
    { id: 'mock', label: 'Mock Interview Room', icon: Mic },
    { id: 'voice-interview', label: 'Live Voice & Video AI', icon: Video },
    { id: 'interview', label: 'Interview Prep Questions', icon: HelpCircle },
    { id: 'flashcards', label: 'Flashcard Drills', icon: HelpCircle },
    { id: 'community-hub', label: 'Alumni & Peer Network', icon: Users },
  ];

  const careerTools = [
    { id: 'career', label: 'Career Pathways', icon: TrendingUp },
    { id: 'salary', label: 'Salary Evaluator', icon: Calculator },
    { id: 'offer-evaluator', label: 'Offer & Equity Evaluator', icon: Calculator },
    { id: 'tracker', label: 'Job Tracker CRM', icon: Briefcase },
    { id: 'extension', label: 'Job Extension Auto-Sync', icon: Puzzle },
  ];

  const resumeTools = [
    { id: 'builder', label: 'Resume Builder', icon: Edit3 },
    { id: 'bullets', label: 'Bullet Rewrite Studio', icon: Edit3 },
    { id: 'portfolio', label: 'AI Web Portfolio Generator', icon: Globe },
    { id: 'skill-challenges', label: 'Skill Challenges & Badges', icon: Award },
    { id: 'cover', label: 'Cover Letter', icon: Mail },
    { id: 'linkedin', label: 'LinkedIn Optimizer', icon: Share2 },
    { id: 'ats', label: 'ATS Checker', icon: ShieldCheck },
    { id: 'skills', label: 'Skill Matrix', icon: Target },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-xs transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Branding */}
          <div className="cursor-pointer" onClick={() => handleNavClick('input')}>
            <CareerPlusLogo size="md" showText={true} />
          </div>

          {/* DESKTOP MAIN NAVIGATION MENU BAR */}
          <nav className="hidden lg:flex items-center space-x-1">
            {/* Primary Navigation Buttons */}
            {primaryNav.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}

            {/* Dropdown 1: Interview Hub */}
            <div className="relative" onMouseLeave={() => setActiveDropdown(null)}>
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'interview' ? null : 'interview')}
                className={`flex items-center space-x-1 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  ['interviewer', 'mock', 'voice-interview', 'interview', 'flashcards', 'community-hub'].includes(activeTab)
                    ? 'bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Mic className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>Interview Hub</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {activeDropdown === 'interview' && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in duration-150">
                  {interviewTools.map((t) => {
                    const Icon = t.icon;
                    return (
                      <button
                        key={t.id}
                        onClick={() => handleNavClick(t.id)}
                        className={`w-full text-left px-4 py-2 text-xs font-bold flex items-center space-x-2 transition-colors cursor-pointer ${
                          activeTab === t.id ? 'bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                        <span className="truncate">{t.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Dropdown 2: Resume Tools */}
            <div className="relative" onMouseLeave={() => setActiveDropdown(null)}>
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'resume' ? null : 'resume')}
                className={`flex items-center space-x-1 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  ['builder', 'bullets', 'portfolio', 'skill-challenges', 'cover', 'linkedin', 'ats', 'skills'].includes(activeTab)
                    ? 'bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>Resume Tools</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {activeDropdown === 'resume' && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in duration-150">
                  {resumeTools.map((t) => {
                    const Icon = t.icon;
                    return (
                      <button
                        key={t.id}
                        onClick={() => handleNavClick(t.id)}
                        className={`w-full text-left px-4 py-2 text-xs font-bold flex items-center space-x-2 transition-colors cursor-pointer ${
                          activeTab === t.id ? 'bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                        <span className="truncate">{t.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Dropdown 3: Career & Salary */}
            <div className="relative" onMouseLeave={() => setActiveDropdown(null)}>
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'career' ? null : 'career')}
                className={`flex items-center space-x-1 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  ['career', 'salary', 'offer-evaluator', 'tracker', 'extension'].includes(activeTab)
                    ? 'bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>Career Growth</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {activeDropdown === 'career' && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in duration-150">
                  {careerTools.map((t) => {
                    const Icon = t.icon;
                    return (
                      <button
                        key={t.id}
                        onClick={() => handleNavClick(t.id)}
                        className={`w-full text-left px-4 py-2 text-xs font-bold flex items-center space-x-2 transition-colors cursor-pointer ${
                          activeTab === t.id ? 'bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                        <span className="truncate">{t.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* USER PROFILE PAGE BUTTON */}
            {currentUser && (
              <button
                onClick={() => handleNavClick('profile')}
                className={`flex items-center space-x-1 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'profile'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>My Profile</span>
              </button>
            )}

            {/* ADMIN PANEL BUTTON (If Super Admin) */}
            {isAdmin && (
              <button
                onClick={() => handleNavClick('admin')}
                className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                  activeTab === 'admin'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-amber-50 dark:bg-amber-950/50 text-amber-900 dark:text-amber-200 border border-amber-200 dark:border-amber-800 hover:bg-amber-100 dark:hover:bg-amber-900/60'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600 fill-amber-300" />
                <span>Admin Panel</span>
              </button>
            )}
          </nav>

          {/* RIGHT ACTION CONTROLS */}
          <div className="flex items-center space-x-2">

            {/* FOUNDER SPOTLIGHT BADGE BUTTON */}
            {onOpenFounder && (
              <button
                onClick={onOpenFounder}
                title="Meet Founder J Siddartha"
                className="hidden xl:flex items-center space-x-2 px-3 py-1.5 bg-gradient-to-r from-blue-900 to-slate-900 hover:from-blue-800 hover:to-slate-800 text-white rounded-xl transition-all cursor-pointer border border-blue-500/40 shadow-xs group"
              >
                <Award className="w-4 h-4 text-amber-300 group-hover:scale-110 transition-transform" />
                <span className="text-[11px] font-extrabold text-amber-300">
                  Founder J Siddartha
                </span>
              </button>
            )}

            {/* DARK / LIGHT MODE 3D TOGGLE BUTTON */}
            {onToggleDarkMode && (
              <button
                onClick={onToggleDarkMode}
                title={isDarkMode ? 'Switch to 3D Light Mode' : 'Switch to 3D Dark Mode'}
                className="p-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-amber-300 rounded-xl transition-all cursor-pointer border border-slate-200 dark:border-slate-700 shadow-xs flex items-center justify-center transform active:scale-95"
              >
                {isDarkMode ? <Sun className="w-4 h-4 text-amber-400 fill-amber-300" /> : <Moon className="w-4 h-4 text-slate-700" />}
              </button>
            )}

            {/* DAILY AI USAGE RATE LIMIT BADGE */}
            <button
              onClick={onOpenDailyLimitModal}
              title={isAdmin ? 'Super Admin: Unlimited Daily AI Access' : limitReached ? 'Daily Limit Finished! Click to view details.' : `${dailyLimit - usageCount} AI Uses Remaining Today`}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer border ${
                isAdmin
                  ? 'bg-amber-50 dark:bg-amber-950/50 text-amber-900 dark:text-amber-300 border-amber-300 dark:border-amber-800 hover:bg-amber-100'
                  : limitReached
                  ? 'bg-red-50 dark:bg-red-950/50 text-red-700 dark:text-red-300 border-red-300 dark:border-red-800 hover:bg-red-100 animate-pulse'
                  : 'bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800 hover:bg-blue-100'
              }`}
            >
              <Zap className={`w-3.5 h-3.5 ${isAdmin ? 'text-amber-600 fill-amber-400' : limitReached ? 'text-red-600 fill-red-400' : 'text-blue-600 fill-blue-300'}`} />
              <span className="hidden sm:inline">
                {isAdmin ? 'Unlimited' : limitReached ? 'Daily Limit Reached' : `${usageCount}/${dailyLimit} Uses`}
              </span>
              <span className="sm:hidden font-mono">
                {isAdmin ? '∞' : `${usageCount}/${dailyLimit}`}
              </span>
            </button>

            {hasAnalysis && (
              <button
                onClick={onNewAnalysisClick}
                className="hidden sm:flex items-center space-x-1.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white text-xs font-extrabold rounded-xl transition-colors shadow-xs cursor-pointer btn-3d-primary"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>New Analysis</span>
              </button>
            )}

            {/* USER PROFILE / AUTH MENU */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center space-x-2 p-1.5 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all border border-slate-200 cursor-pointer"
                >
                  <img
                    src={currentUser.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.name || currentUser.email)}&background=2563eb&color=ffffff&bold=true&size=256`}
                    alt={currentUser.name}
                    className="w-7 h-7 rounded-lg object-cover border border-white"
                  />
                  <span className="text-xs font-bold text-slate-800 hidden md:block max-w-[100px] truncate">
                    {currentUser.name.split(' ')[0]}
                  </span>
                  {isAdmin && <ShieldCheck className="w-3.5 h-3.5 text-amber-600 fill-amber-300 shrink-0" />}
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 z-50 animate-in fade-in duration-150">
                    <div className="px-3 py-2 border-b border-slate-100 space-y-0.5">
                      <span className="font-extrabold text-slate-900 text-xs block">{currentUser.name}</span>
                      <span className="text-[10px] text-slate-500 font-mono block truncate">{currentUser.email}</span>
                      {isAdmin && (
                        <span className="inline-block mt-1 px-2 py-0.5 bg-amber-100 text-amber-900 font-extrabold text-[9px] rounded-md uppercase">
                          Super Admin
                        </span>
                      )}
                    </div>

                    <div className="py-1 space-y-0.5">
                      <button
                        onClick={() => { handleNavClick('profile'); setUserDropdownOpen(false); }}
                        className="w-full text-left px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 rounded-lg flex items-center space-x-2 cursor-pointer"
                      >
                        <User className="w-3.5 h-3.5 text-blue-600" />
                        <span>View Profile & Saved Reports</span>
                      </button>

                      {isAdmin && (
                        <button
                          onClick={() => { handleNavClick('admin'); setUserDropdownOpen(false); }}
                          className="w-full text-left px-3 py-2 text-xs font-bold text-amber-900 bg-amber-50 hover:bg-amber-100 rounded-lg flex items-center space-x-2 cursor-pointer"
                        >
                          <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                          <span>Admin Management Portal</span>
                        </button>
                      )}

                      <button
                        onClick={() => { onLogout(); setUserDropdownOpen(false); }}
                        className="w-full text-left px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50 rounded-lg flex items-center space-x-2 cursor-pointer"
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
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold rounded-xl transition-all shadow-xs flex items-center space-x-1.5 cursor-pointer"
              >
                <User className="w-3.5 h-3.5" />
                <span>Sign In / Admin</span>
              </button>
            )}

            {/* MOBILE MENU TOGGLE BUTTON */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* MOBILE SLIDE-OUT MENU DRAWER */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-slate-100 dark:border-slate-800 space-y-4 animate-in slide-in-from-top-2 duration-200">
            <div className="grid grid-cols-2 gap-2">
              {onToggleDarkMode && (
                <button
                  onClick={onToggleDarkMode}
                  className="col-span-2 p-3 rounded-xl text-xs font-extrabold text-left flex items-center justify-between bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 cursor-pointer"
                >
                  <div className="flex items-center space-x-2">
                    {isDarkMode ? <Sun className="w-4 h-4 text-amber-400 fill-amber-300" /> : <Moon className="w-4 h-4 text-slate-700" />}
                    <span>{isDarkMode ? '3D Light Theme' : '3D Dark Theme'}</span>
                  </div>
                  <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
                    {isDarkMode ? 'Dark Active' : 'Light Active'}
                  </span>
                </button>
              )}

              <button
                onClick={() => handleNavClick('input')}
                className={`p-3 rounded-xl text-xs font-bold text-left flex items-center space-x-2 ${
                  activeTab === 'input' ? 'bg-blue-600 text-white' : 'bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Analyzer Home</span>
              </button>

              <button
                onClick={() => handleNavClick('jobs')}
                className={`p-3 rounded-xl text-xs font-bold text-left flex items-center space-x-2 ${
                  activeTab === 'jobs' ? 'bg-blue-600 text-white' : 'bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span>Jobs & Projects</span>
              </button>

              <button
                onClick={() => handleNavClick('chat')}
                className={`p-3 rounded-xl text-xs font-bold text-left flex items-center space-x-2 ${
                  activeTab === 'chat' ? 'bg-blue-600 text-white' : 'bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>AI Career Coach</span>
              </button>

              <button
                onClick={() => handleNavClick('profile')}
                className={`p-3 rounded-xl text-xs font-bold text-left flex items-center space-x-2 ${
                  activeTab === 'profile' ? 'bg-blue-600 text-white' : 'bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200'
                }`}
              >
                <User className="w-4 h-4" />
                <span>My Profile</span>
              </button>

              {isAdmin && (
                <button
                  onClick={() => handleNavClick('admin')}
                  className={`col-span-2 p-3 rounded-xl text-xs font-extrabold text-left flex items-center space-x-2 ${
                    activeTab === 'admin' ? 'bg-amber-600 text-white' : 'bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  <span>Super Admin Control Panel</span>
                </button>
              )}
            </div>

            {/* Additional Sub-pages in Mobile Drawer */}
            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider block">More Career Tools</span>
              <div className="grid grid-cols-2 gap-1.5 text-xs font-semibold">
                {interviewTools.concat(resumeTools).concat(careerTools).map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`p-2 rounded-lg text-left flex items-center space-x-1.5 ${
                        activeTab === item.id ? 'bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-bold' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                      <span className="truncate">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
