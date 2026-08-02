import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles, MessageSquare, CheckCircle } from 'lucide-react';
import { ResumeAnalysisResult } from '../types';

interface InterviewPrepViewProps {
  result: ResumeAnalysisResult;
}

export const InterviewPrepView: React.FC<InterviewPrepViewProps> = ({ result }) => {
  const { tailoredInterviewQuestions } = result;
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const toggleExpand = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-blue-600 text-xs font-bold uppercase tracking-wider mb-1">
            <HelpCircle className="w-4 h-4" />
            <span>Interview Gap Anticipation</span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Tailored Interview Questions & Strategies
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Questions top hiring managers will likely ask regarding your detected skill gaps and background.
          </p>
        </div>
      </div>

      {/* Questions Accordion List */}
      <div className="space-y-3">
        {tailoredInterviewQuestions.map((q, idx) => {
          const isExpanded = expandedIndex === idx;
          return (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden transition-all"
            >
              <button
                onClick={() => toggleExpand(idx)}
                className="w-full text-left p-5 flex items-start justify-between space-x-3 hover:bg-slate-50 transition-colors"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center space-x-2">
                    <span
                      className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
                        q.category === 'Skill Gap'
                          ? 'bg-rose-100 text-rose-800'
                          : q.category === 'Technical'
                          ? 'bg-indigo-100 text-indigo-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {q.category}
                    </span>
                    <span className="text-xs text-slate-400 font-semibold">Question #{idx + 1}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                    {q.question}
                  </h3>
                </div>

                <div className="p-1 rounded-lg bg-slate-100 text-slate-600 shrink-0">
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {isExpanded && (
                <div className="px-5 pb-5 pt-2 border-t border-slate-100 space-y-3 text-xs sm:text-sm bg-slate-50/50">
                  <div className="p-3 bg-indigo-50/60 border border-indigo-100 rounded-xl text-indigo-950">
                    <span className="font-bold block mb-1 text-indigo-900 flex items-center space-x-1">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Why Interviewers Ask This:</span>
                    </span>
                    <p className="text-slate-700 leading-relaxed">{q.whyAsked}</p>
                  </div>

                  <div className="p-3 bg-emerald-50/60 border border-emerald-100 rounded-xl text-emerald-950">
                    <span className="font-bold block mb-1 text-emerald-900 flex items-center space-x-1">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Winning Answer Strategy:</span>
                    </span>
                    <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                      {q.winningAnswerStrategy}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
