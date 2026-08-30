import React from 'react';
import { 
  ArrowLeft, 
  ChevronRight, 
  Home, 
  ShieldCheck, 
  RotateCcw,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export const PAGE_TITLES: Record<string, string> = {
  input: 'Resume Analyzer (Home)',
  founder: 'Founder Spotlight',
  auth: 'Sign In & Register',
  profile: 'Candidate Profile & Reports',
  admin: 'Super Admin Control Center',
  reviews: 'Platform Reviews & Trust',
  about: 'About CAREER PLUS+',
  jobs: 'Jobs, Internships & Upskill Hub',
  interviewer: 'Interviewer Assessment View',
  mock: 'Mock Interview Room',
  'voice-interview': 'Live Voice & Video Interview',
  builder: 'Interactive Resume Editor',
  cover: 'Cover Letter Generator',
  portfolio: 'AI Web Portfolio Generator',
  linkedin: 'LinkedIn Profile Optimizer',
  tracker: 'Job Tracker CRM',
  extension: 'Job Tracker Extension Sync',
  salary: 'Salary & Compensation Evaluator',
  'offer-evaluator': 'Offer & Equity Evaluator',
  flashcards: 'Interview Flashcards',
  skills: 'Skill Gap Matrix',
  'skill-challenges': 'Skill Verification Badges',
  ats: 'ATS Keyword & Format Optimizer',
  career: 'Career Pathways & Roadmaps',
  bullets: 'Bullet Rewrite Studio',
  interview: 'Interview Preparation Questions',
  chat: 'Global AI Career Coach',
  'community-hub': 'Alumni & Peer Network',
};

interface NavigationBreadcrumbBarProps {
  currentTab: string;
  previousTab?: string;
  onNavigateBack: () => void;
  onNavigateHome: () => void;
  hasAnalysis: boolean;
  targetRole?: string;
}

// Pages where having a direct "Go to Home" companion button is key
const HIGH_PRIORITY_HOME_PAGES = new Set([
  'founder',
  'auth',
  'profile',
  'admin',
  'reviews',
  'about',
  'jobs',
  'mock',
  'voice-interview',
  'builder',
  'portfolio',
  'salary',
  'tracker',
  'community-hub'
]);

export const NavigationBreadcrumbBar: React.FC<NavigationBreadcrumbBarProps> = ({
  currentTab,
  previousTab = 'input',
  onNavigateBack,
  onNavigateHome,
  hasAnalysis,
  targetRole,
}) => {
  if (currentTab === 'input' && !hasAnalysis) {
    return null; // On fresh initial home input page, no navigation bar needed
  }

  const currentTitle = PAGE_TITLES[currentTab] || currentTab;
  const previousTitle = PAGE_TITLES[previousTab] || 'Previous Page';
  const showDedicatedHomeBtn = currentTab !== 'input' && (HIGH_PRIORITY_HOME_PAGES.has(currentTab) || previousTab !== 'input');

  return (
    <div className="w-full mb-5 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-2.5 sm:p-3 shadow-xs flex flex-wrap items-center justify-between gap-3 animate-in fade-in slide-in-from-top-1 duration-200">
      
      {/* Left: Prominent Single Back Button + Home Companion Button */}
      <div className="flex items-center flex-wrap gap-2 sm:gap-2.5">
        {/* Single Main Interactive Back Button */}
        <button
          type="button"
          onClick={onNavigateBack}
          id="global-back-nav-btn"
          className="group px-3.5 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-amber-500 hover:text-slate-950 dark:hover:bg-amber-400 dark:hover:text-slate-950 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-black flex items-center space-x-1.5 transition-all shadow-2xs hover:shadow-sm cursor-pointer active:scale-95 border border-slate-200/80 dark:border-slate-700"
          title={`Go back to ${previousTitle} without losing any data`}
          aria-label={`Go back to ${previousTitle}`}
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1 shrink-0" />
          <span className="font-extrabold">Back to {previousTitle}</span>
        </button>

        {/* Dedicated Home Button for important redirect pages */}
        {showDedicatedHomeBtn && (
          <button
            type="button"
            onClick={onNavigateHome}
            id="global-home-nav-btn"
            className="group px-3 py-1.5 bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 dark:hover:text-white text-blue-700 dark:text-blue-300 rounded-xl text-xs font-black flex items-center space-x-1.5 transition-all shadow-2xs hover:shadow-sm cursor-pointer active:scale-95 border border-blue-200/80 dark:border-blue-800/80"
            title="Return directly to Home / Resume Analyzer"
            aria-label="Return to Home"
          >
            <Home className="w-3.5 h-3.5 transition-transform group-hover:scale-110 shrink-0" />
            <span className="font-extrabold">Home</span>
          </button>
        )}

        <span className="h-4 w-px bg-slate-200 dark:bg-slate-700 hidden md:inline-block" />

        {/* Breadcrumb Trail */}
        <nav aria-label="Breadcrumb" className="hidden md:flex items-center space-x-1.5 text-xs text-slate-500 dark:text-slate-400">
          <button
            type="button"
            onClick={onNavigateHome}
            className="hover:text-amber-600 dark:hover:text-amber-400 font-bold flex items-center space-x-1 transition-colors cursor-pointer"
            title="Return to Home / Resume Analyzer"
          >
            <span>Home</span>
          </button>

          <ChevronRight className="w-3 h-3 text-slate-300 dark:text-slate-600 shrink-0" />

          {previousTab !== 'input' && previousTab !== currentTab && (
            <>
              <button
                type="button"
                onClick={onNavigateBack}
                className="hover:text-amber-600 dark:hover:text-amber-400 font-bold transition-colors truncate max-w-[130px] cursor-pointer"
                title={`Go back to ${previousTitle}`}
              >
                {previousTitle}
              </button>
              <ChevronRight className="w-3 h-3 text-slate-300 dark:text-slate-600 shrink-0" />
            </>
          )}

          <span className="font-black text-slate-900 dark:text-white truncate max-w-[180px]">
            {currentTitle}
          </span>
        </nav>
      </div>

      {/* Right: Data Safety Assurance Badge */}
      <div className="flex items-center space-x-1.5 text-[11px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60 px-2.5 py-1 rounded-xl shrink-0">
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
        <span className="hidden xs:inline">Session Data Preserved</span>
        <span className="xs:hidden">Data Saved</span>
      </div>

    </div>
  );
};
