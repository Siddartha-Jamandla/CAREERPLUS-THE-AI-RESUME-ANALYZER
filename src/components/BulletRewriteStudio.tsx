import React, { useState } from 'react';
import { Wand2, Copy, Check, Sparkles, ArrowRight, RefreshCw, Layers } from 'lucide-react';
import { ResumeAnalysisResult } from '../types';
import { copyToClipboard } from '../utils/helpers';

interface BulletRewriteStudioProps {
  result: ResumeAnalysisResult;
  targetRole: string;
}

export const BulletRewriteStudio: React.FC<BulletRewriteStudioProps> = ({ result, targetRole }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [customBulletInput, setCustomBulletInput] = useState('');
  const [customFocusArea, setCustomFocusArea] = useState('Quantifiable Metrics & Leadership Action Verbs');
  const [customVariations, setCustomVariations] = useState<
    Array<{ label: string; rewrittenBullet: string; keyImprovement: string }>
  >([]);
  const [isRewriting, setIsRewriting] = useState(false);
  const [copiedCustomIndex, setCopiedCustomIndex] = useState<number | null>(null);

  const handleCopyOriginal = (text: string, idx: number) => {
    copyToClipboard(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleCopyCustom = (text: string, idx: number) => {
    copyToClipboard(text);
    setCopiedCustomIndex(idx);
    setTimeout(() => setCopiedCustomIndex(null), 2000);
  };

  const handleGenerateCustomVariations = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customBulletInput.trim()) return;

    setIsRewriting(true);
    try {
      const response = await fetch('/api/rewrite-bullet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bulletText: customBulletInput,
          targetRole,
          focusArea: customFocusArea,
        }),
      });

      const data = await response.json();
      if (data.variations) {
        setCustomVariations(data.variations);
      }
    } catch (err) {
      console.error('Failed to generate custom variations:', err);
    } finally {
      setIsRewriting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-blue-600 text-xs font-bold uppercase tracking-wider mb-1">
            <Wand2 className="w-4 h-4" />
            <span>AI Resume Bullet Point Enhancer</span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            High-Impact Bullet Point Rewrite Studio
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Transform passive responsibilities into metric-driven, action-verb led achievement bullets that impress hiring managers.
          </p>
        </div>
      </div>

      {/* Live Custom Bullet Rewriter Tool */}
      <div className="bg-gradient-to-tr from-slate-900 to-indigo-950 text-white border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-md space-y-6">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-indigo-400" />
          <h3 className="text-base font-bold">Interactive Custom Bullet Generator</h3>
        </div>

        <form onSubmit={handleGenerateCustomVariations} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-indigo-200 uppercase tracking-wider mb-1">
              Paste Any Resume Bullet Point to Rewrite
            </label>
            <textarea
              rows={2}
              required
              value={customBulletInput}
              onChange={(e) => setCustomBulletInput(e.target.value)}
              placeholder="e.g. Responsible for managing company website and helping fix bugs..."
              className="w-full px-4 py-3 rounded-xl border border-slate-700 bg-slate-900/80 text-white placeholder-slate-400 text-xs sm:text-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-indigo-200 uppercase tracking-wider mb-1">
                Target Role Alignment
              </label>
              <input
                type="text"
                value={targetRole}
                disabled
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-800 bg-slate-800/60 text-slate-300 text-xs font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-indigo-200 uppercase tracking-wider mb-1">
                Enhancement Focus
              </label>
              <select
                value={customFocusArea}
                onChange={(e) => setCustomFocusArea(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-white text-xs font-semibold"
              >
                <option value="Quantifiable Metrics & Leadership Action Verbs">Quantifiable Metrics & Action Verbs</option>
                <option value="Technical Depth & Architecture Keywords">Technical Depth & Architecture</option>
                <option value="Business ROI & Cost Savings Impact">Business ROI & Cost Savings</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={isRewriting}
            className="w-full py-3 px-5 rounded-full bg-blue-600 hover:bg-blue-700 font-bold text-xs sm:text-sm text-white transition-all flex items-center justify-center space-x-2 shadow-sm cursor-pointer disabled:opacity-50"
          >
            {isRewriting ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-blue-200" />
                <span>Rewriting with AI Engine...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4 text-blue-100" />
                <span>Generate High-Impact Bullet Variations</span>
              </>
            )}
          </button>
        </form>

        {/* Custom Generated Variations Output */}
        {customVariations.length > 0 && (
          <div className="pt-4 border-t border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
              AI Generated Alternatives:
            </h4>
            <div className="grid grid-cols-1 gap-3">
              {customVariations.map((varItem, idx) => (
                <div key={idx} className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded bg-indigo-900 text-indigo-200 text-[10px] font-bold uppercase">
                      {varItem.label}
                    </span>
                    <button
                      onClick={() => handleCopyCustom(varItem.rewrittenBullet, idx)}
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold flex items-center space-x-1"
                    >
                      {copiedCustomIndex === idx ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-slate-400" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-white font-mono text-xs leading-relaxed">{varItem.rewrittenBullet}</p>
                  <p className="text-[11px] text-slate-400">
                    <strong className="text-indigo-300">Why it works:</strong> {varItem.keyImprovement}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Pre-Analyzed Bullet Improvements from Analysis Result */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
          <Layers className="w-5 h-5 text-indigo-600" />
          <h3 className="font-bold text-slate-900 text-base">Detected Weak Bullets & AI Upgrades</h3>
        </div>

        <div className="space-y-4">
          {result.bulletPointEnhancements.map((bullet, idx) => (
            <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Original */}
                <div className="p-3 bg-white rounded-lg border border-slate-200">
                  <span className="text-[10px] font-bold text-rose-600 uppercase tracking-wider block mb-1">
                    Original Resume Bullet:
                  </span>
                  <p className="text-xs text-slate-700 font-mono leading-relaxed">{bullet.originalBullet}</p>
                </div>

                {/* Improved */}
                <div className="p-3 bg-emerald-50/70 rounded-lg border border-emerald-200 relative">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
                      AI Enhanced Version:
                    </span>
                    <button
                      onClick={() => handleCopyOriginal(bullet.improvedBullet, idx)}
                      className="px-2 py-0.5 rounded bg-white text-emerald-800 border border-emerald-300 hover:bg-emerald-100 text-[11px] font-bold flex items-center space-x-1"
                    >
                      {copiedIndex === idx ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-emerald-600" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-slate-900 font-mono font-semibold leading-relaxed">
                    {bullet.improvedBullet}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs pt-1 border-t border-slate-200/60">
                <span className="text-slate-600">
                  <strong className="text-slate-800">Key Upgrade:</strong> {bullet.impactReason}
                </span>
                <span className="px-2.5 py-0.5 bg-indigo-100 text-indigo-800 text-[11px] font-bold rounded shrink-0">
                  Added Metric: {bullet.metricAdded}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
