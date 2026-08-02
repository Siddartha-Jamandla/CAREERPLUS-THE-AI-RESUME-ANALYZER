import React, { useState } from 'react';
import { DollarSign, Calculator, TrendingUp, ShieldCheck, Scale, Award, ArrowRight, HelpCircle } from 'lucide-react';
import { ResumeAnalysisResult } from '../types';

interface SalaryCalculatorProps {
  analysis?: ResumeAnalysisResult;
  targetRole?: string;
}

export const SalaryCalculator: React.FC<SalaryCalculatorProps> = ({
  analysis,
  targetRole = 'Senior Software Engineer',
}) => {
  // Offer A Inputs
  const [baseA, setBaseA] = useState<number>(140000);
  const [bonusA, setBonusA] = useState<number>(15); // %
  const [stockA, setStockA] = useState<number>(40000); // annual value
  const [signingA, setSigningA] = useState<number>(10000); // 1-time

  // Offer B Inputs
  const [baseB, setBaseB] = useState<number>(165000);
  const [bonusB, setBonusB] = useState<number>(10); // %
  const [stockB, setStockB] = useState<number>(20000); // annual value
  const [signingB, setSigningB] = useState<number>(15000); // 1-time

  const totalFirstYearA = baseA + (baseA * (bonusA / 100)) + stockA + signingA;
  const totalAnnualA = baseA + (baseA * (bonusA / 100)) + stockA;

  const totalFirstYearB = baseB + (baseB * (bonusB / 100)) + stockB + signingB;
  const totalAnnualB = baseB + (baseB * (bonusB / 100)) + stockB;

  const diff = totalFirstYearB - totalFirstYearA;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-blue-600 text-xs font-bold uppercase tracking-wider mb-1">
            <Calculator className="w-4 h-4" />
            <span>Total Compensation & Offer Benchmarking</span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Salary & Total Compensation Evaluator
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Compare job offer packages side-by-side factoring in base salary, annual bonuses, RSUs/equity grants, and signing bonuses.
          </p>
        </div>
      </div>

      {/* Side-by-Side Comparison Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Offer A */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-extrabold text-slate-900 text-base flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-blue-600" />
              <span>Offer Package A (e.g. Current or Offer 1)</span>
            </h3>
            <span className="text-xs font-extrabold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
              Year 1: ${totalFirstYearA.toLocaleString()}
            </span>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase block mb-1">Base Salary ($ / year)</label>
              <input
                type="number"
                value={baseA}
                onChange={(e) => setBaseA(Number(e.target.value))}
                className="w-full p-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-900"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase block mb-1">Target Annual Bonus (%)</label>
                <input
                  type="number"
                  value={bonusA}
                  onChange={(e) => setBonusA(Number(e.target.value))}
                  className="w-full p-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase block mb-1">Annual Stock / RSU ($)</label>
                <input
                  type="number"
                  value={stockA}
                  onChange={(e) => setStockA(Number(e.target.value))}
                  className="w-full p-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 uppercase block mb-1">Signing / Relocation Bonus ($)</label>
              <input
                type="number"
                value={signingA}
                onChange={(e) => setSigningA(Number(e.target.value))}
                className="w-full p-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-900"
              />
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
            <div className="flex items-center justify-between text-slate-700">
              <span>Base Pay:</span>
              <span className="font-bold text-slate-900">${baseA.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between text-slate-700">
              <span>Estimated Annual Bonus ({bonusA}%):</span>
              <span className="font-bold text-slate-900">${(baseA * (bonusA / 100)).toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between text-slate-700">
              <span>Annual Stock Grant:</span>
              <span className="font-bold text-slate-900">${stockA.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between text-slate-900 font-extrabold pt-2 border-t border-slate-200">
              <span>Ongoing Recurring Annual TC:</span>
              <span className="text-blue-600 text-sm">${totalAnnualA.toLocaleString()} / yr</span>
            </div>
          </div>
        </div>

        {/* Offer B */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-extrabold text-slate-900 text-base flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-emerald-600" />
              <span>Offer Package B (e.g. Target Offer 2)</span>
            </h3>
            <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
              Year 1: ${totalFirstYearB.toLocaleString()}
            </span>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase block mb-1">Base Salary ($ / year)</label>
              <input
                type="number"
                value={baseB}
                onChange={(e) => setBaseB(Number(e.target.value))}
                className="w-full p-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-900"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase block mb-1">Target Annual Bonus (%)</label>
                <input
                  type="number"
                  value={bonusB}
                  onChange={(e) => setBonusB(Number(e.target.value))}
                  className="w-full p-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase block mb-1">Annual Stock / RSU ($)</label>
                <input
                  type="number"
                  value={stockB}
                  onChange={(e) => setStockB(Number(e.target.value))}
                  className="w-full p-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 uppercase block mb-1">Signing / Relocation Bonus ($)</label>
              <input
                type="number"
                value={signingB}
                onChange={(e) => setSigningB(Number(e.target.value))}
                className="w-full p-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-900"
              />
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
            <div className="flex items-center justify-between text-slate-700">
              <span>Base Pay:</span>
              <span className="font-bold text-slate-900">${baseB.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between text-slate-700">
              <span>Estimated Annual Bonus ({bonusB}%):</span>
              <span className="font-bold text-slate-900">${(baseB * (bonusB / 100)).toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between text-slate-700">
              <span>Annual Stock Grant:</span>
              <span className="font-bold text-slate-900">${stockB.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between text-slate-900 font-extrabold pt-2 border-t border-slate-200">
              <span>Ongoing Recurring Annual TC:</span>
              <span className="text-emerald-600 text-sm">${totalAnnualB.toLocaleString()} / yr</span>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Delta Verdict */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Total Compensation Verdict</span>
          <span className="text-xs font-mono text-slate-400">Target Role: {targetRole}</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h4 className="text-lg font-black text-white">
              {diff > 0
                ? `Offer B provides +$${diff.toLocaleString()} higher first-year total earnings.`
                : diff < 0
                ? `Offer A provides +$${Math.abs(diff).toLocaleString()} higher first-year total earnings.`
                : 'Both offer packages provide identical first-year compensation.'}
            </h4>
            <p className="text-xs text-slate-300 mt-1">
              Tip: When negotiating, use recurring base salary + stock value as your primary anchor rather than one-time signing bonuses.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
