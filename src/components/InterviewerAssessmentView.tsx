import React, { useState, useEffect } from 'react';
import { ShieldAlert, Users, DollarSign, Award, ThumbsUp, AlertTriangle, RefreshCw, ChevronRight, CheckCircle2, UserCheck, Scale, FileText } from 'lucide-react';
import { ResumeAnalysisResult, InterviewerAssessmentReport } from '../types';

interface InterviewerAssessmentViewProps {
  analysis: ResumeAnalysisResult;
  targetRole: string;
}

export const InterviewerAssessmentView: React.FC<InterviewerAssessmentViewProps> = ({
  analysis,
  targetRole,
}) => {
  const [report, setReport] = useState<InterviewerAssessmentReport | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'decision' | 'redflags' | 'panel' | 'salary'>('decision');

  const fetchAssessment = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/interviewer-assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetRole,
          resumeDetails: analysis.extractedDetails,
          overallScore: analysis.overallScore,
          skillGaps: analysis.skillGapAnalysis.missingCriticalSkills,
        }),
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        throw new Error(errJson.error || 'Failed to generate interviewer assessment report.');
      }

      const data = await response.json();
      setReport(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAssessment();
  }, [analysis, targetRole]);

  if (isLoading) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-xs space-y-4">
        <div className="w-12 h-12 bg-blue-50 border border-blue-200 rounded-2xl flex items-center justify-center mx-auto text-blue-600 animate-spin">
          <RefreshCw className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-extrabold text-slate-900">Generating Professional Interviewer & Hiring Debrief</h3>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          Simulating an executive hiring committee assessment, red flag analysis, and salary bracket benchmarking...
        </p>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center shadow-xs space-y-4">
        <AlertTriangle className="w-10 h-10 text-amber-500 mx-auto" />
        <h3 className="text-base font-bold text-slate-900">Could not load interviewer assessment</h3>
        <p className="text-xs text-slate-500">{error || 'Please try re-generating.'}</p>
        <button
          onClick={fetchAssessment}
          className="px-4 py-2 bg-blue-600 text-white rounded-full text-xs font-bold hover:bg-blue-700 transition-colors cursor-pointer"
        >
          Retry Evaluation
        </button>
      </div>
    );
  }

  const getRecommendationBadge = (rec: string) => {
    switch (rec) {
      case 'Strong Hire':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Lean Hire':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Borderline':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      default:
        return 'bg-rose-100 text-rose-800 border-rose-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 text-white border border-slate-800 rounded-2xl p-6 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-blue-400 text-xs font-bold uppercase tracking-wider">
            <UserCheck className="w-4 h-4" />
            <span>Executive Hiring Committee Lens</span>
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight">
            Interviewer & Hiring Manager Report
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl">
            This is how senior panelists, recruiters, and bar-raisers will evaluate your background, flag risks, and structure interview debriefs.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
          <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-4 text-center min-w-[180px]">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Hiring Decision
            </span>
            <span className={`inline-block px-4 py-1 rounded-full text-sm font-extrabold border ${getRecommendationBadge(report.hiringRecommendation)}`}>
              {report.hiringRecommendation}
            </span>
          </div>
          <button
            onClick={fetchAssessment}
            className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="Re-run Hiring Manager Assessment"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex border-b border-slate-200 space-x-2 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('decision')}
          className={`flex items-center space-x-2 px-4 py-3 border-b-2 text-xs font-bold whitespace-nowrap cursor-pointer transition-colors ${
            activeTab === 'decision'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <ThumbsUp className="w-4 h-4" />
          <span>Hiring Debrief & Rubric</span>
        </button>
        <button
          onClick={() => setActiveTab('redflags')}
          className={`flex items-center space-x-2 px-4 py-3 border-b-2 text-xs font-bold whitespace-nowrap cursor-pointer transition-colors ${
            activeTab === 'redflags'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <ShieldAlert className="w-4 h-4 text-amber-500" />
          <span>Red Flags & Risk Mitigation ({report.redFlags.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('panel')}
          className={`flex items-center space-x-2 px-4 py-3 border-b-2 text-xs font-bold whitespace-nowrap cursor-pointer transition-colors ${
            activeTab === 'panel'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Panel Member Question Guide</span>
        </button>
        <button
          onClick={() => setActiveTab('salary')}
          className={`flex items-center space-x-2 px-4 py-3 border-b-2 text-xs font-bold whitespace-nowrap cursor-pointer transition-colors ${
            activeTab === 'salary'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <DollarSign className="w-4 h-4 text-emerald-600" />
          <span>Salary Band & Offer Script</span>
        </button>
      </div>

      {/* Tab 1: Hiring Debrief & Rubric */}
      {activeTab === 'decision' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
              <FileText className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-slate-900 text-base">Executive Rationale & Assessment Narrative</h3>
            </div>
            <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line bg-slate-50 p-4 rounded-xl border border-slate-200/80">
              {report.recommendationRationale}
            </p>

            <div className="pt-2">
              <h4 className="font-bold text-slate-900 text-sm mb-3">Key Candidate Strengths Noted by Committee</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {analysis.extractedDetails.topStrengths.map((strength, idx) => (
                  <div key={idx} className="flex items-center space-x-2 bg-emerald-50 text-emerald-800 border border-emerald-100 p-2.5 rounded-lg text-xs font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{strength}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
              <Award className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-slate-900 text-base">Competency Scorecard</h3>
            </div>

            <div className="space-y-3.5">
              {[
                { label: 'Technical Depth', score: report.competencyRubric.technicalDepth },
                { label: 'Execution & Impact', score: report.competencyRubric.executionImpact },
                { label: 'System Architecture', score: report.competencyRubric.systemArchitecture },
                { label: 'Communication & Leadership', score: report.competencyRubric.communicationLeadership },
                { label: 'Cultural Fit & Agility', score: report.competencyRubric.cultureFitAgility },
              ].map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-slate-700">
                    <span>{item.label}</span>
                    <span className="text-blue-600">{item.score}/10</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-blue-600 h-full rounded-full transition-all duration-500"
                      style={{ width: `${item.score * 10}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Red Flags */}
      {activeTab === 'redflags' && (
        <div className="space-y-4">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-800 flex items-start space-x-3">
            <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Interviewer Risk Warning:</span> Professional recruiters scan resumes for vague impact statements, unquantified results, and potential missing core tech stacks. Use the candidate mitigation scripts below during interviews to neutralize these concerns.
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {report.redFlags.map((item, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="w-5 h-5 text-amber-500" />
                    <h4 className="font-bold text-slate-900 text-base">{item.flag}</h4>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-extrabold border ${
                    item.severity === 'High' ? 'bg-rose-100 text-rose-800 border-rose-200' : 'bg-amber-100 text-amber-800 border-amber-200'
                  }`}>
                    {item.severity} Risk
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                    <span className="font-bold text-slate-800 uppercase tracking-wider text-[10px] block mb-1">
                      Interviewer's Internal Concern:
                    </span>
                    <p className="text-slate-600 leading-relaxed">{item.interviewerConcern}</p>
                  </div>

                  <div className="bg-blue-50/60 p-3.5 rounded-xl border border-blue-100">
                    <span className="font-bold text-blue-900 uppercase tracking-wider text-[10px] block mb-1">
                      Candidate Defense Strategy:
                    </span>
                    <p className="text-slate-700 leading-relaxed">{item.candidateMitigationStrategy}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Panel Question Guide */}
      {activeTab === 'panel' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {report.panelQuestionGuides.map((guide, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-3">
              <div className="flex items-center space-x-2.5 border-b border-slate-100 pb-3">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                  #{idx + 1}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{guide.interviewerPersona}</h4>
                  <span className="text-[11px] text-slate-500">Focus Area: {guide.focusArea}</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Expected Panel Question:
                </span>
                <p className="text-xs font-bold text-slate-800 bg-slate-50 p-3 rounded-lg border border-slate-200">
                  "{guide.topQuestionToAsk}"
                </p>
              </div>

              <div>
                <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block mb-1">
                  What Interviewer Looks For In A Winning Answer:
                </span>
                <p className="text-xs text-slate-600 leading-relaxed bg-emerald-50/50 p-3 rounded-lg border border-emerald-100">
                  {guide.whatToLookForInAnswer}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: Salary Band */}
      {activeTab === 'salary' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-xl space-y-1">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">
                Estimated Market Base Salary
              </span>
              <div className="text-2xl font-black text-emerald-900">
                {report.salaryNegotiation.estimatedBaseSalary}
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 p-5 rounded-xl space-y-1">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">
                Target Bonus / Stock Grant Range
              </span>
              <div className="text-2xl font-black text-blue-900">
                {report.salaryNegotiation.targetBonusEquity}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 text-sm">Key Negotiation Leverage Points</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {report.salaryNegotiation.negotiationLeveragePoints.map((pt, idx) => (
                <div key={idx} className="flex items-start space-x-2 bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span className="text-slate-700">{pt}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">Recommended Counter-Offer Script</h4>
            <div className="p-4 rounded-xl bg-slate-900 text-slate-100 text-xs font-mono leading-relaxed border border-slate-800">
              {report.salaryNegotiation.counterOfferScript}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
