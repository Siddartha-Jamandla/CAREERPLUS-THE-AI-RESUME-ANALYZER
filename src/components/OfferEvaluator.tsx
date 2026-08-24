import React, { useState } from 'react';
import {
  Calculator,
  TrendingUp,
  DollarSign,
  Building,
  Sparkles,
  MapPin,
  Briefcase,
  FileText,
  Copy,
  Check,
  Award,
  ChevronRight,
  BarChart3,
  PieChart,
  Zap,
  ArrowUpRight
} from 'lucide-react';

export const OfferEvaluator: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [stockGrowthRate, setStockGrowthRate] = useState(10); // 10% annual stock growth assumption

  const [offerA, setOfferA] = useState({
    company: 'Meta',
    role: 'Staff Software Engineer',
    city: 'San Francisco, CA',
    baseSalary: 210000,
    signingBonus: 35000,
    annualBonusPercent: 15, // 15%
    equityGrant: 320000, // 4-year total RSU
    vestingYears: 4,
    matching401k: 9000,
    ptoDays: 20,
    healthPerksValuation: 8000
  });

  const [offerB, setOfferB] = useState({
    company: 'Stripe',
    role: 'Senior Tech Lead',
    city: 'Austin, TX (Remote)',
    baseSalary: 195000,
    signingBonus: 25000,
    annualBonusPercent: 10,
    equityGrant: 280000,
    vestingYears: 4,
    matching401k: 8000,
    ptoDays: 25,
    healthPerksValuation: 10000
  });

  // Calculate annual total compensation
  const calculateTotalComp = (offer: typeof offerA) => {
    const annualEquity = offer.equityGrant / offer.vestingYears;
    const annualBonus = offer.baseSalary * (offer.annualBonusPercent / 100);
    const totalYear1 = offer.baseSalary + offer.signingBonus + annualBonus + annualEquity + offer.matching401k + offer.healthPerksValuation;
    const totalAnnualRecurring = offer.baseSalary + annualBonus + annualEquity + offer.matching401k + offer.healthPerksValuation;
    return {
      totalYear1,
      totalAnnualRecurring,
      annualEquity,
      annualBonus
    };
  };

  const compA = calculateTotalComp(offerA);
  const compB = calculateTotalComp(offerB);

  // Cost of living factors (relative to SF = 1.0)
  const colFactors: { [key: string]: number } = {
    'San Francisco, CA': 1.0,
    'Austin, TX (Remote)': 0.72,
    'New York, NY': 1.02,
    'Seattle, WA': 0.88,
    'Remote (US National)': 0.75
  };

  const colAdjustedA = compA.totalYear1 / (colFactors[offerA.city] || 1.0);
  const colAdjustedB = compB.totalYear1 / (colFactors[offerB.city] || 0.75);

  const counterOfferEmailScript = `Dear ${offerA.company} Recruiting Team,

Thank you so much for extending the offer for the ${offerA.role} position. I am deeply excited about the team's roadmap and the impact I can drive.

As I evaluate my options, I have received a competing offer from a premier tech firm offering a total year 1 compensation package exceeding $${Math.round(compB.totalYear1).toLocaleString()} with remote flexibility.

Given my track record in distributed architecture and AI engineering, I am confident I can immediately deliver outsized value at ${offerA.company}. If we can adjust the base salary to $${(offerA.baseSalary + 20000).toLocaleString()} or increase the RSU grant by $50,000 over 4 years, I would be thrilled to sign immediately.

Thank you again for your partnership, and I look forward to finalizing our conversation.

Best regards,
J Siddartha`;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(counterOfferEmailScript);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* HEADER HERO */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden border border-emerald-800/40">
        <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-emerald-500/20 rounded-full border border-emerald-400/30 text-emerald-300 text-xs font-black uppercase tracking-wider">
              <Calculator className="w-3.5 h-3.5 text-emerald-400" />
              <span>Compensation & Equity Intelligence Engine</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Offer Evaluator & Total Comp Calculator
            </h1>
            <p className="text-emerald-200 text-sm max-w-2xl font-medium leading-relaxed">
              Compare job offers side-by-side with 4-year RSU vesting schedules, cost-of-living purchasing power adjustments, and AI counter-offer negotiation scripts.
            </p>
          </div>

          <div className="flex bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10 text-center space-x-4">
            <div>
              <span className="text-xs text-emerald-200 font-bold block">Top Offer Year 1</span>
              <span className="text-2xl font-black text-amber-400">${Math.round(Math.max(compA.totalYear1, compB.totalYear1)).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* OFFERS COMPARISON GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* OFFER A CARD */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Offer A</span>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-1">{offerA.company}</h2>
              <p className="text-xs text-slate-500 font-bold">{offerA.role} • {offerA.city}</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-emerald-600">${Math.round(compA.totalYear1).toLocaleString()}</span>
              <p className="text-[10px] text-slate-400 font-bold">Year 1 Total Comp</p>
            </div>
          </div>

          <div className="space-y-3 text-xs font-medium text-slate-700 dark:text-slate-300">
            <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500">Base Salary</span>
              <span className="font-bold">${offerA.baseSalary.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500">Signing Bonus</span>
              <span className="font-bold text-emerald-600">+${offerA.signingBonus.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500">Annual Target RSU (4-Yr Vest)</span>
              <span className="font-bold">+${Math.round(compA.annualEquity).toLocaleString()}/yr</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500">COL Purchasing Power (SF Adj)</span>
              <span className="font-bold text-blue-600">${Math.round(colAdjustedA).toLocaleString()}/yr</span>
            </div>
          </div>
        </div>

        {/* OFFER B CARD */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <span className="text-xs font-extrabold text-purple-600 dark:text-purple-400 uppercase tracking-wider">Offer B</span>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-1">{offerB.company}</h2>
              <p className="text-xs text-slate-500 font-bold">{offerB.role} • {offerB.city}</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-emerald-600">${Math.round(compB.totalYear1).toLocaleString()}</span>
              <p className="text-[10px] text-slate-400 font-bold">Year 1 Total Comp</p>
            </div>
          </div>

          <div className="space-y-3 text-xs font-medium text-slate-700 dark:text-slate-300">
            <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500">Base Salary</span>
              <span className="font-bold">${offerB.baseSalary.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500">Signing Bonus</span>
              <span className="font-bold text-emerald-600">+${offerB.signingBonus.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500">Annual Target RSU (4-Yr Vest)</span>
              <span className="font-bold">+${Math.round(compB.annualEquity).toLocaleString()}/yr</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500">COL Purchasing Power (Austin Adj)</span>
              <span className="font-bold text-emerald-600">${Math.round(colAdjustedB).toLocaleString()}/yr (28% Lower Cost)</span>
            </div>
          </div>
        </div>

      </div>

      {/* AI NEGOTIATION COUNTER-OFFER SCRIPT BOX */}
      <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              AI Counter-Offer Negotiation Email Script
            </h3>
          </div>
          <button
            onClick={handleCopyEmail}
            className="flex items-center space-x-1.5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer shadow-md"
          >
            {copiedEmail ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copiedEmail ? 'Script Copied!' : 'Copy Script'}</span>
          </button>
        </div>

        <pre className="p-5 bg-slate-950 text-slate-200 rounded-2xl text-xs font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap border border-slate-800">
          {counterOfferEmailScript}
        </pre>
      </div>
    </div>
  );
};
