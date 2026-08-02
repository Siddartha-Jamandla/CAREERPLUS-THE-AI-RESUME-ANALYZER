import React from 'react';
import { Target, AlertTriangle, CheckCircle2, BookOpen, Clock, Code, Award, Sparkles } from 'lucide-react';
import { ResumeAnalysisResult } from '../types';

interface SkillGapMatrixProps {
  result: ResumeAnalysisResult;
  targetRole: string;
}

export const SkillGapMatrix: React.FC<SkillGapMatrixProps> = ({ result, targetRole }) => {
  const { missingCriticalSkills, matchingSkills, learningRoadmap } = result.skillGapAnalysis;

  return (
    <div className="space-y-8">
      {/* Header Info */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-blue-600 text-xs font-bold uppercase tracking-wider mb-1">
            <Target className="w-4 h-4" />
            <span>Skill Gap Analysis</span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Competency Benchmark for <span className="text-blue-600">{targetRole}</span>
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Comparison between your detected skills and required industry competencies.
          </p>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100">
            Target: {targetRole}
          </span>
        </div>
      </div>

      {/* Two Column Grid: Missing Gaps vs Matched Skills */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Missing Skills Section */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3 mb-4">
            <AlertTriangle className="w-5 h-5 text-rose-500" />
            <h3 className="font-bold text-slate-900 text-base">
              Missing Critical & High-Priority Skills ({missingCriticalSkills.length})
            </h3>
          </div>

          {missingCriticalSkills.length === 0 ? (
            <div className="p-6 text-center text-slate-500 text-sm bg-slate-50 rounded-xl">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
              <span>Great job! No major skill gaps detected for this role.</span>
            </div>
          ) : (
            <div className="space-y-3">
              {missingCriticalSkills.map((item, idx) => {
                const isCritical = item.importance === 'Critical';
                const isHigh = item.importance === 'High';
                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border transition-all ${
                      isCritical
                        ? 'bg-rose-50/50 border-rose-200'
                        : isHigh
                        ? 'bg-amber-50/50 border-amber-200'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-slate-900 text-sm">{item.skill}</span>
                      <span
                        className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
                          isCritical
                            ? 'bg-rose-100 text-rose-800 border border-rose-200'
                            : isHigh
                            ? 'bg-amber-100 text-amber-800 border border-amber-200'
                            : 'bg-blue-100 text-blue-800 border border-blue-200'
                        }`}
                      >
                        {item.importance} Gap
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed mb-2">{item.description}</p>
                    <div className="flex items-center space-x-2 text-[11px]">
                      <span className="text-slate-400 font-semibold">Category:</span>
                      <span className="px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700 font-medium">
                        {item.category}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Matched Skills Section */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3 mb-4">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <h3 className="font-bold text-slate-900 text-base">
              In-Demand Skills Found ({matchingSkills.length})
            </h3>
          </div>

          <div className="flex flex-wrap gap-2">
            {matchingSkills.map((item, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 bg-green-50 text-green-700 text-xs font-medium rounded border border-green-100"
              >
                {item.skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Recommended Learning & Upskilling Roadmap */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            <div>
              <h3 className="font-bold text-slate-900 text-base">Actionable Upskilling & Learning Roadmap</h3>
              <p className="text-xs text-slate-500">Recommended project blueprints, topics, and courses to close your gaps</p>
            </div>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100 hidden sm:inline-flex items-center">
            <Sparkles className="w-3 h-3 mr-1" /> Custom AI Curated
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {learningRoadmap.map((item, idx) => (
            <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 font-bold uppercase text-[10px]">
                    {item.type}
                  </span>
                  <span className="flex items-center text-slate-500 font-medium">
                    <Clock className="w-3 h-3 mr-1 text-slate-400" />
                    {item.estimatedTime}
                  </span>
                </div>

                <h4 className="font-bold text-slate-900 text-sm mb-1">{item.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">{item.rationale}</p>

                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">Key Competencies Covered:</span>
                  <div className="flex flex-wrap gap-1">
                    {item.keyTopics.map((topic, tIdx) => (
                      <span key={tIdx} className="px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700 text-[11px] font-medium">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
