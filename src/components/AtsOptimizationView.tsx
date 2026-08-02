import React from 'react';
import { ShieldCheck, AlertCircle, AlertTriangle, FileText, CheckCircle2, Tag, Hash, Key } from 'lucide-react';
import { ResumeAnalysisResult } from '../types';
import { getScoreColor } from '../utils/helpers';

interface AtsOptimizationViewProps {
  result: ResumeAnalysisResult;
}

export const AtsOptimizationView: React.FC<AtsOptimizationViewProps> = ({ result }) => {
  const { formattingIssues, missingKeywords, keywordFrequency } = result.atsOptimization;
  const atsScoreColor = getScoreColor(result.atsScore);

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-blue-600 text-xs font-bold uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>ATS Compatibility Audit</span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            ATS Optimization Score & Keyword Check
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Ensure your resume passes Workday, Greenhouse, Taleo, and Lever ATS scanners without getting filtered out.
          </p>
        </div>

        <div className={`p-4 rounded-xl border flex items-center space-x-3 shrink-0 ${atsScoreColor.bg} ${atsScoreColor.border}`}>
          <div className={`text-3xl font-extrabold ${atsScoreColor.text}`}>{result.atsScore}%</div>
          <div className="text-xs">
            <div className="font-bold text-slate-800">ATS Pass Index</div>
            <div className="text-slate-500">Target: &gt; 80%</div>
          </div>
        </div>
      </div>

      {/* Grid: Formatting Audit + Missing Keywords */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Formatting Audit Section */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <FileText className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-slate-900 text-base">Formatting & Parsing Flags</h3>
          </div>

          {formattingIssues.length === 0 ? (
            <div className="p-6 text-center text-slate-500 text-sm bg-slate-50 rounded-xl">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
              <span>Your resume structure and layout look perfectly ATS-friendly!</span>
            </div>
          ) : (
            <div className="space-y-3">
              {formattingIssues.map((issue, idx) => {
                const isCritical = issue.severity === 'Critical';
                const isWarning = issue.severity === 'Warning';
                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border ${
                      isCritical
                        ? 'bg-rose-50/60 border-rose-200'
                        : isWarning
                        ? 'bg-amber-50/60 border-amber-200'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-900 text-xs sm:text-sm flex items-center space-x-1.5">
                        {isCritical ? (
                          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                        )}
                        <span>{issue.issue}</span>
                      </span>
                      <span
                        className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase ${
                          isCritical ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {issue.severity}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-2 pl-5">
                      <strong className="text-slate-800">Fix Recommendation:</strong> {issue.fixSuggestion}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Missing Keywords Section */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <Key className="w-5 h-5 text-indigo-600" />
            <h3 className="font-bold text-slate-900 text-base">Recommended Missing ATS Keywords</h3>
          </div>

          <p className="text-xs text-slate-500">
            Adding these high-frequency job keywords to your experience bullet points or skills section will increase your ATS search match rate.
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {missingKeywords.map((keyword, idx) => (
              <div
                key={idx}
                className="px-3 py-1.5 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-900 text-xs font-semibold flex items-center space-x-1"
              >
                <Tag className="w-3 h-3 text-indigo-600" />
                <span>{keyword}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Keyword Frequency & Density Table */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
        <div className="flex items-center space-x-2 border-b border-slate-100 pb-4 mb-4">
          <Hash className="w-5 h-5 text-indigo-600" />
          <div>
            <h3 className="font-bold text-slate-900 text-base">Keyword Frequency & Density Benchmarks</h3>
            <p className="text-xs text-slate-500">Compare present count vs recommended target count in job descriptions</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm text-slate-700">
            <thead className="bg-slate-50 text-slate-500 text-[11px] font-bold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Keyword / Skill</th>
                <th className="py-3 px-4">Importance</th>
                <th className="py-3 px-4">Found in Resume</th>
                <th className="py-3 px-4">Recommended Target</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {keywordFrequency.map((item, idx) => {
                const isOptimal = item.countInResume >= item.recommendedCount;
                return (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900">{item.keyword}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-xs font-semibold">
                        {item.importance}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-semibold">{item.countInResume} times</td>
                    <td className="py-3 px-4 font-semibold">{item.recommendedCount} times</td>
                    <td className="py-3 px-4">
                      {isOptimal ? (
                        <span className="inline-flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 mr-1" /> Optimal Density
                        </span>
                      ) : (
                        <span className="inline-flex items-center text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                          Needs +{item.recommendedCount - item.countInResume} mentions
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
