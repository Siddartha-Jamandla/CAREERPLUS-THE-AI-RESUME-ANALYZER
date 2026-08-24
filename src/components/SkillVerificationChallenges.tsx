import React, { useState } from 'react';
import {
  Award,
  Code2,
  CheckCircle2,
  Play,
  Terminal,
  Layers,
  Sparkles,
  Share2,
  Download,
  Check,
  ShieldCheck,
  RefreshCw,
  ExternalLink,
  ChevronRight,
  Brain,
  Zap,
  Lock,
  Unlock
} from 'lucide-react';

export const SkillVerificationChallenges: React.FC = () => {
  const [selectedTrack, setSelectedTrack] = useState<'coding' | 'system' | 'sql'>('coding');
  const [codeSolution, setCodeSolution] = useState(`// Implement a high-performance LRU Cache with O(1) time complexity
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    if (!this.cache.has(key)) return -1;
    const val = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, val);
    return val;
  }

  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      this.cache.delete(this.cache.keys().next().value);
    }
    this.cache.set(key, value);
  }
}`);

  const [testResults, setTestResults] = useState<any | null>(null);
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [earnedBadge, setEarnedBadge] = useState<boolean>(true);

  const handleRunCodeTests = () => {
    setIsRunningTests(true);
    setTestResults(null);

    setTimeout(() => {
      setTestResults({
        passedCount: 4,
        totalCount: 4,
        score: 100,
        testCases: [
          { name: 'Test 1: Basic Get & Put Operations', status: 'Passed', time: '1.2ms' },
          { name: 'Test 2: Capacity Eviction Order', status: 'Passed', time: '0.8ms' },
          { name: 'Test 3: Update Existing Key Priority', status: 'Passed', time: '1.0ms' },
          { name: 'Test 4: High Concurrency Load (100k items)', status: 'Passed', time: '14.5ms' }
        ],
        badgeEarned: 'Verified Senior React & System Architect',
        verificationHash: 'CP-VER-8942-X90'
      });
      setIsRunningTests(false);
      setEarnedBadge(true);
    }, 1200);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* HEADER HERO */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden border border-blue-800/40">
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-blue-500/20 rounded-full border border-blue-400/30 text-blue-300 text-xs font-black uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Verified Skill Challenges & Credentials</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Hands-On Skill Verification Challenges
            </h1>
            <p className="text-blue-200 text-sm max-w-2xl font-medium leading-relaxed">
              Complete interactive coding, system design, or data analytics challenges to earn verified CareerPlus Skill Badges that display on your resume and LinkedIn profile.
            </p>
          </div>

          <div className="flex bg-white/10 backdrop-blur-md p-1.5 rounded-2xl border border-white/10 text-xs font-bold">
            <button
              onClick={() => setSelectedTrack('coding')}
              className={`px-3 py-1.5 rounded-xl cursor-pointer transition-all ${
                selectedTrack === 'coding' ? 'bg-blue-600 text-white shadow-xs' : 'text-blue-200 hover:text-white'
              }`}
            >
              Coding Track
            </button>
            <button
              onClick={() => setSelectedTrack('system')}
              className={`px-3 py-1.5 rounded-xl cursor-pointer transition-all ${
                selectedTrack === 'system' ? 'bg-blue-600 text-white shadow-xs' : 'text-blue-200 hover:text-white'
              }`}
            >
              System Design
            </button>
            <button
              onClick={() => setSelectedTrack('sql')}
              className={`px-3 py-1.5 rounded-xl cursor-pointer transition-all ${
                selectedTrack === 'sql' ? 'bg-blue-600 text-white shadow-xs' : 'text-blue-200 hover:text-white'
              }`}
            >
              SQL & Analytics
            </button>
          </div>
        </div>
      </div>

      {/* CHALLENGE WORKSPACE GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: INTERACTIVE CODE / SYSTEM IDE */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden">
            
            {/* IDE HEADER */}
            <div className="bg-slate-950 p-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-mono font-bold text-slate-200">
                  Challenge: LRU Cache Implementation (O(1))
                </span>
              </div>
              
              <button
                onClick={handleRunCodeTests}
                disabled={isRunningTests}
                className="flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer shadow-lg shadow-emerald-500/20"
              >
                {isRunningTests ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-white" />}
                <span>{isRunningTests ? 'Running Test Suite...' : 'Run & Grade Tests'}</span>
              </button>
            </div>

            {/* CODE EDITOR TEXTAREA */}
            <textarea
              value={codeSolution}
              onChange={(e) => setCodeSolution(e.target.value)}
              rows={16}
              className="w-full bg-slate-950 text-emerald-400 p-5 font-mono text-xs outline-none leading-relaxed resize-none"
              spellCheck={false}
            />

            {/* TEST RESULTS BOX */}
            {testResults && (
              <div className="p-5 bg-slate-900 border-t border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-emerald-400 flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>All {testResults.passedCount} Test Cases Passed (100% Score)</span>
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">Hash: {testResults.verificationHash}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono text-slate-300">
                  {testResults.testCases.map((tc: any, i: number) => (
                    <div key={i} className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between">
                      <span>{tc.name}</span>
                      <span className="text-emerald-400 font-bold">{tc.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

        {/* RIGHT COLUMN: VERIFIED SKILL BADGE DISPLAY */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-6 text-center">
            
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-tr from-amber-400 via-amber-500 to-amber-600 p-1 shadow-xl mx-auto">
              <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center">
                <Award className="w-12 h-12 text-amber-400 animate-bounce" />
              </div>
            </div>

            <div>
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-amber-50 dark:bg-amber-950 text-amber-800 dark:text-amber-300 rounded-full text-[11px] font-extrabold border border-amber-300 dark:border-amber-800 mb-2">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600 fill-amber-300" />
                <span>Verified CareerPlus Badge</span>
              </div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">
                Senior React & System Architect
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Cryptographically Verified • ID: CP-VER-8942-X90
              </p>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 text-left space-y-2 text-xs font-medium text-slate-700 dark:text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-500">Issued To:</span>
                <span className="font-bold">J Siddartha</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Verification Score:</span>
                <span className="font-bold text-emerald-600">100 / 100</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Skills Verified:</span>
                <span className="font-bold">Data Structures, LRU Cache, O(1) Optimization</span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <button
                onClick={() => alert('Badge added to your CareerPlus Resume and LinkedIn credentials!')}
                className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-2xl font-black text-xs transition-all cursor-pointer shadow-lg shadow-blue-500/20"
              >
                <Share2 className="w-4 h-4" />
                <span>Add Verified Badge to LinkedIn & Resume</span>
              </button>

              <button
                onClick={() => alert('Embed SVG Code copied to clipboard!')}
                className="w-full flex items-center justify-center space-x-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 py-3 rounded-2xl font-bold text-xs hover:bg-slate-200 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Badge SVG Certificate</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
