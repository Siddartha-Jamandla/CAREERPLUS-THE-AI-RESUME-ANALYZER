import React, { useState } from 'react';
import {
  UploadCloud,
  FileText,
  Briefcase,
  Target,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Layers,
  Building2,
  Check,
  ShieldCheck,
  TrendingUp,
  Award,
  Zap,
  Users,
  FileSearch,
  BarChart3,
  BrainCircuit,
  Star,
  Compass,
  Bot
} from 'lucide-react';
import { SAMPLE_RESUMES } from '../data/sampleResumes';
import { ResumeAnalysisInput, SampleResume } from '../types';
import { fileToBase64 } from '../utils/helpers';
import { CareerPlusLogo } from './CareerPlusLogo';

interface ResumeInputSectionProps {
  onAnalyze: (input: ResumeAnalysisInput) => void;
  isLoading: boolean;
  errorMessage: string | null;
}

export const ResumeInputSection: React.FC<ResumeInputSectionProps> = ({
  onAnalyze,
  isLoading,
  errorMessage,
}) => {
  const [activeInputMode, setActiveInputMode] = useState<'upload' | 'paste'>('upload');
  const [uploadedFile, setUploadedFile] = useState<{ file: File; base64: string } | null>(null);
  const [pastedText, setPastedText] = useState('');
  const [targetRole, setTargetRole] = useState('Senior Full Stack Software Architect');
  const [jobDescription, setJobDescription] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('Senior (5-8 yrs)');
  const [industry, setIndustry] = useState('Software & Cloud Engineering');
  const [selectedSampleId, setSelectedSampleId] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const base64 = await fileToBase64(file);
      setUploadedFile({ file, base64 });
      setSelectedSampleId(null);
    } catch (err) {
      console.error('Failed to process file:', err);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const base64 = await fileToBase64(file);
      setUploadedFile({ file, base64 });
      setSelectedSampleId(null);
    }
  };

  const loadSample = (sample: SampleResume) => {
    setSelectedSampleId(sample.id);
    setActiveInputMode('paste');
    setPastedText(sample.resumeText);
    setTargetRole(sample.targetRole);
    setJobDescription(sample.jobDescription);
    setUploadedFile(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (activeInputMode === 'upload' && !uploadedFile && !pastedText) {
      alert('Please select a file or paste your resume text to begin analysis.');
      return;
    }
    if (activeInputMode === 'paste' && !pastedText.trim() && !uploadedFile) {
      alert('Please paste your resume text to analyze.');
      return;
    }

    const payload: ResumeAnalysisInput = {
      resumeText: pastedText,
      fileData: uploadedFile
        ? {
            base64: uploadedFile.base64,
            mimeType: uploadedFile.file.type || 'application/pdf',
            fileName: uploadedFile.file.name,
          }
        : undefined,
      targetRole: targetRole || 'Target Professional Role',
      jobDescription,
      experienceLevel,
      industry,
    };

    onAnalyze(payload);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 py-6 px-4 sm:px-6">
      
      {/* 1. EXECUTIVE HERO BANNER */}
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 rounded-3xl p-8 sm:p-12 text-white shadow-2xl border border-slate-800 overflow-hidden">
        {/* Decorative ambient glowing background blur */}
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-blue-600/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <CareerPlusLogo size="xl" lightText={true} />
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>AI Career Intelligence • CAREER PLUS+</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white">
            Transform Your Resume into a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-amber-300">High-Converting Interview Magnet</span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal max-w-2xl">
            Instant ATS compatibility scoring, hiring manager evaluation reports, metric-enhanced bullet point rewrites, skill gap matrices, and live AI interview practice — tailored specifically to your target role.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-300 pt-2">
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>ATS Resume Parser</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Executive Hiring Feedback</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Tailored Cover Letters</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Interactive Mock Interviews</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. STATS OVERVIEW BAR */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs card-3d flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-lg font-black text-slate-900 dark:text-white block">98.4%</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold block">ATS Parser Accuracy</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs card-3d flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <span className="text-lg font-black text-slate-900 dark:text-white block">+42%</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold block">Average Callback Rate</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs card-3d flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <BrainCircuit className="w-5 h-5" />
          </div>
          <div>
            <span className="text-lg font-black text-slate-900 dark:text-white block">15+ Tools</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold block">Career Intelligence</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs card-3d flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 flex items-center justify-center shrink-0">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <span className="text-lg font-black text-slate-900 dark:text-white block">&lt; 3 Secs</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold block">Advanced AI Engine</span>
          </div>
        </div>
      </div>

      {/* 3. PRE-BUILT SAMPLE RESUMES QUICK SELECTOR */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs card-3d space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <Layers className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
              1-Click Demo Profiles (Try Instant AI Analysis)
            </h3>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Select a role template to auto-populate form</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {SAMPLE_RESUMES.map((sample) => {
            const isSelected = selectedSampleId === sample.id;
            return (
              <button
                key={sample.id}
                type="button"
                onClick={() => loadSample(sample)}
                className={`text-left p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md ring-2 ring-blue-400/50'
                    : 'bg-slate-50/70 dark:bg-slate-800/60 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-blue-400 hover:bg-blue-50/30 dark:hover:bg-blue-900/20'
                }`}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between font-extrabold text-xs">
                    <span className="truncate">{sample.role}</span>
                    {isSelected && <Check className="w-4 h-4 text-amber-300 shrink-0" />}
                  </div>
                  <p className={`text-[11px] font-medium line-clamp-2 ${isSelected ? 'text-blue-100' : 'text-slate-500 dark:text-slate-400'}`}>
                    Target: {sample.targetRole}
                  </p>
                </div>

                <div className={`mt-3 pt-2 border-t text-[11px] font-bold flex items-center justify-between ${
                  isSelected ? 'border-blue-500 text-amber-300' : 'border-slate-200 dark:border-slate-700 text-blue-600 dark:text-blue-400'
                }`}>
                  <span>Load Template</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. MAIN INPUT FORM */}
      <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xl card-3d p-6 sm:p-10 space-y-8">
        
        {/* Step 1: Document Upload or Text Paste */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-extrabold text-base shadow-xs">
                1
              </div>
              <div>
                <h2 className="text-base font-extrabold text-slate-900">Upload Resume or Paste Text</h2>
                <p className="text-xs text-slate-500">Supports PDF, DOCX, TXT, or Image files up to 10MB</p>
              </div>
            </div>

            {/* Toggle Switch */}
            <div className="bg-slate-100 p-1 rounded-xl flex space-x-1 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setActiveInputMode('upload')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeInputMode === 'upload' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Document Upload
              </button>
              <button
                type="button"
                onClick={() => setActiveInputMode('paste')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeInputMode === 'paste' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Paste Text
              </button>
            </div>
          </div>

          {activeInputMode === 'upload' ? (
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className="border-2 border-dashed border-blue-200 hover:border-blue-500 bg-blue-50/20 rounded-2xl p-10 text-center transition-all relative cursor-pointer group"
            >
              <input
                type="file"
                accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
                onChange={handleFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              {uploadedFile ? (
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-xs">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="text-sm font-extrabold text-slate-900">{uploadedFile.file.name}</div>
                  <div className="text-xs text-slate-500 font-mono">
                    {(uploadedFile.file.size / 1024).toFixed(1)} KB • Document Ready for Parsing
                  </div>
                  <span className="text-xs text-blue-600 hover:underline font-bold pt-2 cursor-pointer">
                    Click to replace or drop another file
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center space-y-3">
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-md flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                    <UploadCloud className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="text-sm font-extrabold text-slate-900">
                      <span className="text-blue-600">Click to browse file</span> or drag & drop resume here
                    </p>
                    <p className="text-xs text-slate-400 mt-1">PDF, Word Document, TXT, or Image</p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider">
                Paste Resume Text Content
              </label>
              <textarea
                rows={9}
                value={pastedText}
                onChange={(e) => {
                  setPastedText(e.target.value);
                  setSelectedSampleId(null);
                }}
                placeholder="Paste work experience, skills, education, and summary sections here..."
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-xs sm:text-sm font-mono leading-relaxed bg-slate-50/50 outline-none"
              />
            </div>
          )}
        </div>

        {/* Step 2: Target Parameters */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-extrabold text-base shadow-xs">
              2
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900">Specify Target Role & Career Criteria</h2>
              <p className="text-xs text-slate-500">AI Engine evaluates your qualifications against industry benchmarks</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-extrabold text-slate-700 uppercase text-[10px] flex items-center space-x-1">
                <Target className="w-3.5 h-3.5 text-blue-600" />
                <span>Target Job Title *</span>
              </label>
              <input
                type="text"
                required
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                placeholder="e.g. Senior Full Stack Engineer"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 font-medium text-slate-900 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="font-extrabold text-slate-700 uppercase text-[10px] flex items-center space-x-1">
                <Building2 className="w-3.5 h-3.5 text-blue-600" />
                <span>Industry Sector</span>
              </label>
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 font-medium text-slate-900 outline-none bg-white"
              >
                <option value="Software & Cloud Engineering">Software & Cloud Engineering</option>
                <option value="AI & Machine Learning">AI & Machine Learning</option>
                <option value="Product Management">Product Management</option>
                <option value="Data & Business Analytics">Data & Business Analytics</option>
                <option value="Marketing & Growth">Marketing & Growth</option>
                <option value="Finance & Banking">Finance & Banking</option>
                <option value="Cybersecurity">Cybersecurity</option>
                <option value="Healthcare & Tech">Healthcare & Biotech</option>
              </select>
            </div>
          </div>

          <div className="space-y-1 text-xs">
            <label className="font-extrabold text-slate-700 uppercase text-[10px] flex items-center justify-between">
              <span className="flex items-center space-x-1">
                <Briefcase className="w-3.5 h-3.5 text-blue-600" />
                <span>Target Job Description (Optional for Direct ATS Keyword Matching)</span>
              </span>
            </label>
            <textarea
              rows={3}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste specific target job description here to generate keyword match gap reports..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 text-slate-900 font-medium outline-none bg-white"
            />
          </div>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 flex items-start space-x-3 text-red-800 text-xs">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-extrabold block">Analysis Request Failed</span>
              <span>{errorMessage}</span>
            </div>
          </div>
        )}

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-4 px-6 rounded-2xl text-sm font-extrabold text-white shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer ${
            isLoading
              ? 'bg-blue-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 active:scale-[0.99]'
          }`}
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Analyzing Qualifications with Advanced AI Engine...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 text-amber-300 fill-amber-300" />
              <span>Generate Comprehensive AI Career & ATS Report</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </>
          )}
        </button>
      </form>

      {/* 5. LANDING FEATURE CARDS SHOWCASE */}
      <div className="space-y-6 pt-4">
        <div className="text-center space-y-1">
          <h2 className="text-xl font-black text-slate-900">Complete AI Career Suite Included</h2>
          <p className="text-xs text-slate-500">Everything you need to optimize your candidate profile and ace interviews</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-black text-slate-900">ATS Keyword Optimizer</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Scan your resume against real recruiter applicant tracking systems. Detect missing hard skills, formatting flaws, and weak action verbs.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <Bot className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-black text-slate-900">Hiring Manager Simulator</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Simulate strict recruiter evaluation rubrics. Get candid executive feedback on impact statements, leadership depth, and career trajectory.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-black text-slate-900">Interactive Career Hub</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Generate matching job recommendations, real-time salary benchmarks, customized cover letters, and voice-guided mock interview practice.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
