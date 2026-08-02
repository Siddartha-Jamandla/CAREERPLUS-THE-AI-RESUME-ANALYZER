import React from 'react';
import { TrendingUp, Award, DollarSign, Calendar, ArrowUpRight, Compass, Shield, CheckCircle, Briefcase, Zap } from 'lucide-react';
import { ResumeAnalysisResult } from '../types';

interface CareerPathwaysViewProps {
  result: ResumeAnalysisResult;
  targetRole: string;
}

export const CareerPathwaysView: React.FC<CareerPathwaysViewProps> = ({ result, targetRole }) => {
  const { immediateNextRoles, reachRoles, longTermPath } = result.careerSuggestions;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-blue-600 text-xs font-bold uppercase tracking-wider mb-1">
            <Compass className="w-4 h-4" />
            <span>AI Career Trajectory</span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Personalized Career Paths
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Data-backed career options tailored to your candidate skill baseline and experience.
          </p>
        </div>
      </div>

      {/* Immediate Next Roles */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          <h3 className="font-bold text-slate-900 text-base">Immediate Next Roles (High Fit)</h3>
        </div>

        <div className="space-y-3">
          {immediateNextRoles.map((role, idx) => (
            <div
              key={idx}
              className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-blue-200 transition-colors bg-white group shadow-xs"
            >
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 shrink-0">
                <Briefcase className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-800 text-base">{role.title}</h4>
                <p className="text-xs text-slate-500 italic mt-0.5">High Fit • Based on {role.matchPercentage}% competency match</p>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">{role.rationale}</p>
              </div>
              <div className="sm:text-right shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
                <span className="text-sm font-bold text-slate-900">{role.salaryRange}</span>
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Est. Salary Range</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reach / Stretch Promotion Roles */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
          <Award className="w-5 h-5 text-blue-600" />
          <h3 className="font-bold text-slate-900 text-base">Reach & High-Growth Stretch Roles</h3>
        </div>

        <div className="space-y-3">
          {reachRoles.map((role, idx) => (
            <div
              key={idx}
              className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-blue-200 transition-colors bg-slate-50/50 group"
            >
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 shrink-0">
                <Zap className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-800 text-base flex items-center space-x-1">
                  <span>{role.title}</span>
                  <ArrowUpRight className="w-4 h-4 text-blue-600" />
                </h4>
                <p className="text-xs text-slate-500 italic mt-0.5">Bridge Skill Gap required ({role.matchPercentage}% match)</p>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">{role.rationale}</p>
              </div>
              <div className="sm:text-right shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
                <span className="text-sm font-bold text-slate-900">{role.salaryRange}</span>
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Est. Salary Range</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Long-Term Strategic Roadmap */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
        <div className="flex items-center space-x-2 border-b border-slate-100 pb-4 mb-6">
          <Calendar className="w-5 h-5 text-blue-600" />
          <div>
            <h3 className="font-bold text-slate-900 text-base">3-Year Executive Pathway</h3>
            <p className="text-xs text-slate-500">Step-by-step career escalation timeline and milestone competencies</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {longTermPath.map((stepItem) => (
            <div key={stepItem.step} className="bg-slate-50 border border-slate-200 rounded-xl p-5 relative">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-extrabold text-sm flex items-center justify-center mb-3 shadow-xs">
                {stepItem.step}
              </div>

              <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
                Timeline: {stepItem.targetYears}
              </div>

              <h4 className="font-bold text-slate-900 text-base mb-3">{stepItem.title}</h4>

              <div>
                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-2">
                  Milestone Competencies:
                </span>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {stepItem.milestoneSkills.map((mSkill, mIdx) => (
                    <li key={mIdx} className="flex items-center space-x-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>{mSkill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
