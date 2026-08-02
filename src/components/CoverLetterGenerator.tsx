import React, { useState } from 'react';
import { Mail, Sparkles, Copy, Download, Check, RefreshCw, Building, FileText } from 'lucide-react';
import { ResumeAnalysisResult, CoverLetterResult } from '../types';

interface CoverLetterGeneratorProps {
  analysis: ResumeAnalysisResult;
  targetRole: string;
}

export const CoverLetterGenerator: React.FC<CoverLetterGeneratorProps> = ({
  analysis,
  targetRole,
}) => {
  const [companyName, setCompanyName] = useState<string>('Target Company Inc.');
  const [tone, setTone] = useState<string>('Executive & Impact-Driven');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<CoverLetterResult | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/generate-cover-letter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetRole,
          companyName,
          resumeDetails: analysis.extractedDetails,
          jobDescription: '',
          tone,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate cover letter.');
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      console.error(err);
      alert('Error generating cover letter: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (result?.coverLetterText) {
      navigator.clipboard.writeText(result.coverLetterText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-blue-600 text-xs font-bold uppercase tracking-wider mb-1">
            <Mail className="w-4 h-4" />
            <span>AI Cover Letter Architect</span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Tailored Cover Letter Generator
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Generate high-converting, metric-backed cover letters specifically aligned with your target role ({targetRole}).
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls */}
        <div className="lg:col-span-5 space-y-4">
          <form onSubmit={handleGenerate} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-1">
                Target Company Name
              </label>
              <div className="relative">
                <Building className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g., Google, Microsoft, Stripe..."
                  className="w-full pl-9 p-2.5 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-1">
                Tone & Writing Style
              </label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full p-2.5 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
              >
                <option value="Executive & Impact-Driven">Executive & Impact-Driven</option>
                <option value="Technical & Engineering Depth">Technical & Engineering Depth</option>
                <option value="Modern & Startup Culture">Modern & Startup Culture</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm transition-all shadow-xs flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-blue-200" />
                  <span>Drafting Custom Cover Letter...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-blue-200" />
                  <span>Generate Cover Letter</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Generated Letter Display */}
        <div className="lg:col-span-7">
          {result ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <h3 className="font-bold text-slate-900 text-base">Cover Letter Draft</h3>
                </div>
                <button
                  onClick={handleCopy}
                  className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-full transition-colors flex items-center space-x-1 cursor-pointer"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl font-sans text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-line">
                {result.coverLetterText}
              </div>

              {result.keyHighlightsMentioned.length > 0 && (
                <div className="pt-2">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                    Key Achievements Highlighted:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {result.keyHighlightsMentioned.map((h, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-[11px] font-medium border border-blue-100">
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-slate-50 border border-dashed border-slate-300 rounded-2xl p-12 text-center space-y-3">
              <Mail className="w-10 h-10 text-slate-400 mx-auto" />
              <h4 className="font-bold text-slate-700 text-sm">Cover Letter Generator Ready</h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Enter your target company name on the left and click "Generate Cover Letter" to craft an aligned introduction letter.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
