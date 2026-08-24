import React from 'react';
import {
  Award,
  ShieldCheck,
  Target,
  Zap,
  TrendingUp,
  User,
  GraduationCap,
  Sparkles,
  ArrowRight,
  CheckCircle,
  FileCheck,
  CheckSquare,
  Briefcase
} from 'lucide-react';
import { ResumeAnalysisResult } from '../types';
import { getScoreColor } from '../utils/helpers';
import { ProjectIdeasShowcase } from './ProjectIdeasShowcase';

interface OverallScoreCardProps {
  result: ResumeAnalysisResult;
  targetRole: string;
  onNavigateTab: (tab: string) => void;
}

export const OverallScoreCard: React.FC<OverallScoreCardProps> = ({
  result,
  targetRole,
  onNavigateTab,
}) => {
  const overallColor = getScoreColor(result.overallScore);
  const atsColor = getScoreColor(result.atsScore);
  const skillsColor = getScoreColor(result.skillsMatchScore);
  const expColor = getScoreColor(result.experienceMatchScore);
  const fmtColor = getScoreColor(result.formattingScore);

  return (
    <div className="space-y-6">
      {/* Top Main Score Card Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm card-3d relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50/50 dark:bg-blue-950/20 rounded-full blur-3xl -z-0 pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Ring Score Gauge */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 rounded-2xl">
            <div className="relative w-36 h-36 flex items-center justify-center">
              {/* SVG Circular Progress */}
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  stroke="#cbd5e1"
                  strokeWidth="10"
                  fill="transparent"
                  className="dark:stroke-slate-700"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  stroke="#2563eb"
                  strokeWidth="10"
                  strokeDasharray={2 * Math.PI * 42}
                  strokeDashoffset={2 * Math.PI * 42 * (1 - result.overallScore / 100)}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                  fill="transparent"
                />
              </svg>
              <div className="absolute flex flex-col items-center text-center">
                <span className="text-4xl font-black text-slate-800 dark:text-white">
                  {result.overallScore}%
                </span>
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider">
                  Overall Score
                </span>
              </div>
            </div>

            <div className="mt-4 text-center">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${overallColor.badge}`}>
                <Award className="w-3.5 h-3.5 mr-1" />
                {result.overallScore >= 80
                  ? 'Strong Job Ready Profile'
                  : result.overallScore >= 65
                  ? 'Competitive - Needs Optimization'
                  : 'High Skill Gap - Needs Enhancement'}
              </span>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5">Target Role: <span className="font-bold text-slate-800 dark:text-slate-200">{targetRole}</span></p>
            </div>
          </div>

          {/* Sub Score Metrics Grid */}
          <div className="lg:col-span-7 space-y-4">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center space-x-2">
                <span>Executive Diagnostic Summary</span>
                <span className="text-xs font-bold px-2.5 py-0.5 bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 rounded-full border border-blue-100 dark:border-blue-800">
                  AI Evaluated
                </span>
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
                {result.executiveSummary}
              </p>
            </div>

            {/* 4 Metric Pillar Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="bg-slate-50 border border-slate-200/80 p-3 rounded-xl">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                  <span>ATS Score</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                </div>
                <div className={`text-xl font-bold ${atsColor.text}`}>{result.atsScore}%</div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className={`h-full ${result.atsScore >= 75 ? 'bg-blue-600' : 'bg-amber-500'}`} style={{ width: `${result.atsScore}%` }} />
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200/80 p-3 rounded-xl">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                  <span>Skills Match</span>
                  <Target className="w-3.5 h-3.5 text-blue-600" />
                </div>
                <div className={`text-xl font-bold ${skillsColor.text}`}>{result.skillsMatchScore}%</div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className={`h-full ${result.skillsMatchScore >= 75 ? 'bg-blue-600' : 'bg-amber-500'}`} style={{ width: `${result.skillsMatchScore}%` }} />
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200/80 p-3 rounded-xl">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                  <span>Experience</span>
                  <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
                </div>
                <div className={`text-xl font-bold ${expColor.text}`}>{result.experienceMatchScore}%</div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className={`h-full ${result.experienceMatchScore >= 75 ? 'bg-blue-600' : 'bg-amber-500'}`} style={{ width: `${result.experienceMatchScore}%` }} />
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200/80 p-3 rounded-xl">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                  <span>Formatting</span>
                  <FileCheck className="w-3.5 h-3.5 text-blue-600" />
                </div>
                <div className={`text-xl font-bold ${fmtColor.text}`}>{result.formattingScore}%</div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className={`h-full ${result.formattingScore >= 75 ? 'bg-blue-600' : 'bg-amber-500'}`} style={{ width: `${result.formattingScore}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Candidate Profile Details & Extracted Strengths */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
          <div className="flex items-center space-x-2 text-slate-900 font-bold mb-4">
            <User className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm uppercase tracking-wider">Candidate Metadata Extracted</h3>
          </div>
          <div className="space-y-3 text-xs sm:text-sm">
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Candidate Name:</span>
              <span className="font-semibold text-slate-800">{result.extractedDetails.candidateName}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Inferred Role Title:</span>
              <span className="font-semibold text-slate-800">{result.extractedDetails.currentRole}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Experience Tenure:</span>
              <span className="font-semibold text-slate-800">{result.extractedDetails.yearsExperience}</span>
            </div>
            <div className="py-2">
              <span className="text-slate-500 block mb-1.5">Education / Credentials:</span>
              <div className="flex flex-wrap gap-1.5">
                {result.extractedDetails.education.map((edu, idx) => (
                  <span key={idx} className="px-2.5 py-1 bg-slate-100 text-slate-700 text-xs rounded-full flex items-center space-x-1">
                    <GraduationCap className="w-3 h-3 text-slate-500" />
                    <span>{edu}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
          <div className="flex items-center space-x-2 text-slate-900 font-bold mb-4">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm uppercase tracking-wider">Key Strengths Identified</h3>
          </div>
          <ul className="space-y-2.5 text-xs sm:text-sm">
            {result.extractedDetails.topStrengths.map((strength, idx) => (
              <li key={idx} className="flex items-start space-x-2 text-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                <span>{strength}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 10 AI Suggested Portfolio Projects Showcase */}
      <ProjectIdeasShowcase
        projects={result.portfolioProjectIdeas}
        targetRole={targetRole}
        onNavigateJobs={() => onNavigateTab('jobs')}
      />

      {/* Quick Navigation Action Cards */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center space-x-1.5 text-blue-400 text-xs font-bold mb-1 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Deep-Dive Career Acceleration Modules</span>
            </div>
            <h3 className="text-lg font-bold">Explore Detailed Skill Gaps & AI Optimizations</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              Switch between tabs below to view missing critical skills, ATS keyword frequency, customized career progression paths, or rewrite weak bullets.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onNavigateTab('voice-interview')}
              className="px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-black text-xs transition-colors shadow-xs flex items-center space-x-1.5 cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 text-amber-300" />
              <span>Voice & Video AI Interview</span>
            </button>
            <button
              onClick={() => onNavigateTab('portfolio')}
              className="px-4 py-2 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-black text-xs transition-colors shadow-xs flex items-center space-x-1.5 cursor-pointer"
            >
              <span>AI Web Portfolio</span>
            </button>
            <button
              onClick={() => onNavigateTab('extension')}
              className="px-4 py-2 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-colors shadow-xs flex items-center space-x-1.5 cursor-pointer"
            >
              <span>Chrome Extension Hub</span>
            </button>
            <button
              onClick={() => onNavigateTab('skill-challenges')}
              className="px-4 py-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition-colors shadow-xs flex items-center space-x-1.5 cursor-pointer"
            >
              <span>Skill Badges</span>
            </button>
            <button
              onClick={() => onNavigateTab('offer-evaluator')}
              className="px-4 py-2 rounded-full bg-slate-800 text-slate-200 font-bold text-xs hover:bg-slate-700 transition-colors border border-slate-700 flex items-center space-x-1.5 cursor-pointer"
            >
              <span>Offer & Equity Evaluator</span>
            </button>
            <button
              onClick={() => onNavigateTab('community-hub')}
              className="px-4 py-2 rounded-full bg-slate-800 text-slate-200 font-bold text-xs hover:bg-slate-700 transition-colors border border-slate-700 flex items-center space-x-1.5 cursor-pointer"
            >
              <span>Alumni Peer Network</span>
            </button>
            <button
              onClick={() => onNavigateTab('jobs')}
              className="px-4 py-2 rounded-full bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-500 transition-colors shadow-xs flex items-center space-x-1.5 cursor-pointer"
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Live Jobs & Free Courses</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
