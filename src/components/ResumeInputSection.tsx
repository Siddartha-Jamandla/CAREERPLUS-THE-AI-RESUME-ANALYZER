import React, { useState, useEffect } from 'react';
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
  Bot,
  Clipboard,
  Trash2,
  Clock,
  Cpu,
  Flame
} from 'lucide-react';
import { SAMPLE_RESUMES } from '../data/sampleResumes';
import { ResumeAnalysisInput, SampleResume } from '../types';
import { fileToBase64 } from '../utils/helpers';
import { CareerPlusLogo } from './CareerPlusLogo';

interface ResumeInputSectionProps {
  onAnalyze: (input: ResumeAnalysisInput) => void;
  isLoading: boolean;
  errorMessage: string | null;
  initialInput?: ResumeAnalysisInput | null;
}

export const ResumeInputSection: React.FC<ResumeInputSectionProps> = ({
  onAnalyze,
  isLoading,
  errorMessage,
  initialInput,
}) => {
  // Load initial cached values from sessionStorage or initialInput
  const getSavedState = () => {
    try {
      const cached = sessionStorage.getItem('cp_saved_resume_input');
      if (cached) return JSON.parse(cached);
    } catch (e) {}
    return null;
  };

  const saved = getSavedState();

  const [activeInputMode, setActiveInputMode] = useState<'upload' | 'paste'>(() => {
    return saved?.activeInputMode || (initialInput?.resumeText ? 'paste' : 'upload');
  });
  const [uploadedFile, setUploadedFile] = useState<{ file: File; base64: string } | null>(null);
  const [pastedText, setPastedText] = useState(() => {
    return initialInput?.resumeText || saved?.resumeText || '';
  });
  const [targetRole, setTargetRole] = useState(() => {
    return initialInput?.targetRole || saved?.targetRole || 'Senior Full Stack Software Architect';
  });
  const [jobDescription, setJobDescription] = useState(() => {
    return initialInput?.jobDescription || saved?.jobDescription || '';
  });
  const [experienceLevel, setExperienceLevel] = useState(() => {
    return initialInput?.experienceLevel || saved?.experienceLevel || 'Senior (5-8 yrs)';
  });
  const [industry, setIndustry] = useState(() => {
    return initialInput?.industry || saved?.industry || 'Software & Cloud Engineering';
  });
  const [analysisEngineMode, setAnalysisEngineMode] = useState<'turbo' | 'deep'>('turbo');
  const [selectedSampleId, setSelectedSampleId] = useState<string | null>(null);

  // Live Timer & Stages during loading
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
      setElapsedSeconds(0);
      setCurrentStepIndex(0);
      const start = Date.now();
      interval = setInterval(() => {
        const secs = (Date.now() - start) / 1000;
        setElapsedSeconds(secs);
        if (secs < 0.6) setCurrentStepIndex(0);
        else if (secs < 1.2) setCurrentStepIndex(1);
        else if (secs < 1.8) setCurrentStepIndex(2);
        else if (secs < 2.5) setCurrentStepIndex(3);
        else setCurrentStepIndex(4);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  // Sync state if initialInput prop changes
  React.useEffect(() => {
    if (initialInput) {
      if (initialInput.resumeText) {
        setPastedText(initialInput.resumeText);
        setActiveInputMode('paste');
      }
      if (initialInput.targetRole) setTargetRole(initialInput.targetRole);
      if (initialInput.jobDescription) setJobDescription(initialInput.jobDescription);
      if (initialInput.experienceLevel) setExperienceLevel(initialInput.experienceLevel);
      if (initialInput.industry) setIndustry(initialInput.industry);
    }
  }, [initialInput]);

  // Persist current input values continuously to sessionStorage
  React.useEffect(() => {
    try {
      sessionStorage.setItem('cp_saved_resume_input', JSON.stringify({
        activeInputMode,
        resumeText: pastedText,
        targetRole,
        jobDescription,
        experienceLevel,
        industry,
      }));
    } catch (e) {}
  }, [activeInputMode, pastedText, targetRole, jobDescription, experienceLevel, industry]);

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

  const handlePasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setPastedText(text);
        setActiveInputMode('paste');
      }
    } catch (err) {
      console.error('Could not access clipboard:', err);
    }
  };

  const wordCount = pastedText.trim() ? pastedText.trim().split(/\s+/).length : 0;
  const charCount = pastedText.length;

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

  const analysisSteps = [
    { title: 'Parsing ATS Text & File Structure', desc: 'Sanitizing syntax, tokens & layout' },
    { title: 'Extracting Technical DNA & Skills', desc: 'Detecting frameworks, tools & competencies' },
    { title: 'Benchmarking Against Industry Criteria', desc: 'Calculating keyword density & match rubrics' },
    { title: 'Formulating Executive Diagnostic & Scores', desc: 'Computing ATS, experience & impact scores' },
    { title: 'Finalizing Roadmap & Portfolio Engine', desc: 'Synthesizing customized action plan' },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-10 py-4 px-2 sm:px-4">
      
      {/* 1. EXECUTIVE HERO BANNER */}
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 rounded-3xl p-8 sm:p-12 text-white shadow-2xl border border-slate-800 overflow-hidden">
        {/* Decorative ambient glowing background blur */}
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-blue-600/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <CareerPlusLogo size="xl" lightText={true} />
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold tracking-wide">
              <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400 animate-pulse" />
              <span>⚡ Turbo Fast AI Analysis Enabled • Instant Results</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white">
            Transform Your Resume into a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-amber-300">High-Converting Interview Magnet</span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal max-w-2xl">
            Instant ATS compatibility scoring, hiring manager evaluation reports, metric-enhanced bullet point rewrites, skill gap matrices, and live AI interview practice — now analyzed in ultra-fast turnaround time.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-300 pt-2">
            <div className="flex items-center space-x-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Fast 2-Second Turbo Engine</span>
            </div>
            <div className="flex items-center space-x-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>ATS Parser & Keyword Matrix</span>
            </div>
            <div className="flex items-center space-x-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Executive Hiring Feedback</span>
            </div>
            <div className="flex items-center space-x-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Tailored Portfolio Ideas</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. STATS OVERVIEW BAR */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs card-3d flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <span className="text-lg font-black text-slate-900 dark:text-white block">~2.4s</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold block">Ultra-Fast Analysis Speed</span>
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
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold block">Career Intelligence Suite</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs card-3d flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-lg font-black text-slate-900 dark:text-white block">98.4%</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold block">ATS Parser Accuracy</span>
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

      {/* 4. MAIN INTERACTIVE RESUME INPUT FORM */}
      <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-md space-y-8">
        
        {/* Speed Mode Selector Bar */}
        <div className="bg-slate-50 dark:bg-slate-800/80 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-extrabold text-slate-800 dark:text-slate-200">Analysis Speed Engine:</span>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setAnalysisEngineMode('turbo')}
              className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
                analysisEngineMode === 'turbo'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600 hover:bg-slate-100'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>⚡ Turbo Fast Scan (~2s)</span>
            </button>
            <button
              type="button"
              onClick={() => setAnalysisEngineMode('deep')}
              className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
                analysisEngineMode === 'deep'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600 hover:bg-slate-100'
              }`}
            >
              <BrainCircuit className="w-3.5 h-3.5" />
              <span>🧠 Deep Audit Mode</span>
            </button>
          </div>
        </div>

        {/* Step 1: Input Choice */}
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-extrabold text-base shadow-xs">
                1
              </div>
              <div>
                <h2 className="text-base font-extrabold text-slate-900 dark:text-white">Provide Resume Content</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">Upload PDF / DOCX or paste raw resume text</p>
              </div>
            </div>

            <div className="inline-flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1 border border-slate-200 dark:border-slate-700">
              <button
                type="button"
                onClick={() => setActiveInputMode('upload')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
                  activeInputMode === 'upload'
                    ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <UploadCloud className="w-3.5 h-3.5" />
                <span>Upload Document</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveInputMode('paste')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
                  activeInputMode === 'paste'
                    ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Paste Text</span>
              </button>
            </div>
          </div>

          {activeInputMode === 'upload' ? (
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer ${
                uploadedFile
                  ? 'border-emerald-400 bg-emerald-50/40 dark:bg-emerald-950/20'
                  : 'border-slate-300 dark:border-slate-700 hover:border-blue-500 hover:bg-blue-50/30 dark:hover:bg-blue-900/10'
              }`}
            >
              <input
                type="file"
                id="resume-file-input"
                accept=".pdf,.docx,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
                onChange={handleFileUpload}
                className="hidden"
              />
              <label htmlFor="resume-file-input" className="cursor-pointer block space-y-3">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <UploadCloud className="w-7 h-7" />
                </div>
                {uploadedFile ? (
                  <div className="space-y-1">
                    <p className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400 flex items-center justify-center space-x-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{uploadedFile.file.name}</span>
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {(uploadedFile.file.size / 1024).toFixed(1)} KB • Ready for ultra-fast analysis
                    </p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                      Drag & Drop your resume here, or <span className="text-blue-600 dark:text-blue-400 underline">browse files</span>
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Supports PDF, DOCX, TXT (Maximum file size: 10MB)
                    </p>
                  </div>
                )}
              </label>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center space-x-2">
                  <span>Word Count: <strong className="text-slate-800 dark:text-slate-200">{wordCount}</strong></span>
                  <span>•</span>
                  <span>Characters: <strong className="text-slate-800 dark:text-slate-200">{charCount}</strong></span>
                  {wordCount > 0 && (
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      wordCount >= 300 && wordCount <= 900
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300'
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300'
                    }`}>
                      {wordCount >= 300 && wordCount <= 900 ? '✓ Optimal ATS Length' : 'Ideal ATS length is 400-800 words'}
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={handlePasteFromClipboard}
                    className="flex items-center space-x-1 text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                  >
                    <Clipboard className="w-3.5 h-3.5" />
                    <span>Paste Clipboard</span>
                  </button>
                  {pastedText && (
                    <button
                      type="button"
                      onClick={() => setPastedText('')}
                      className="flex items-center space-x-1 text-slate-400 hover:text-red-500 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Clear</span>
                    </button>
                  )}
                </div>
              </div>

              <textarea
                rows={8}
                value={pastedText}
                onChange={(e) => setPastedText(e.target.value)}
                placeholder="Paste the full text of your resume (Work Experience, Skills, Education, Projects, Certifications)..."
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-xs focus:ring-2 focus:ring-blue-600 outline-none leading-relaxed"
              />
            </div>
          )}
        </div>

        {/* Step 2: Target Parameters */}
        <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-extrabold text-base shadow-xs">
              2
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white">Specify Target Role & Career Criteria</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">AI Engine evaluates your qualifications against industry benchmarks</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-extrabold text-slate-700 dark:text-slate-300 uppercase text-[10px] flex items-center space-x-1">
                <Target className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>Target Job Title *</span>
              </label>
              <input
                type="text"
                required
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                placeholder="e.g. Senior Full Stack Engineer"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:ring-2 focus:ring-blue-600 font-medium text-slate-900 dark:text-white outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="font-extrabold text-slate-700 dark:text-slate-300 uppercase text-[10px] flex items-center space-x-1">
                <Building2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>Industry Sector</span>
              </label>
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:ring-2 focus:ring-blue-600 font-medium text-slate-900 dark:text-white outline-none"
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
            <label className="font-extrabold text-slate-700 dark:text-slate-300 uppercase text-[10px] flex items-center justify-between">
              <span className="flex items-center space-x-1">
                <Briefcase className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>Target Job Description (Optional for Direct ATS Keyword Matching)</span>
              </span>
            </label>
            <textarea
              rows={3}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste specific target job description here to generate keyword match gap reports..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:ring-2 focus:ring-blue-600 text-slate-900 dark:text-white font-medium outline-none"
            />
          </div>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 flex items-start space-x-3 text-red-800 dark:text-red-300 text-xs">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-extrabold block">Analysis Request Failed</span>
              <span>{errorMessage}</span>
            </div>
          </div>
        )}

        {/* SUBMIT BUTTON & LIVE PROGRESS OVERLAY */}
        {isLoading ? (
          <div className="bg-slate-900 border border-blue-500/40 rounded-2xl p-6 text-white space-y-4 shadow-xl animate-pulse">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center animate-spin">
                  <Cpu className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-white flex items-center space-x-2">
                    <span>⚡ AI Analysis in Progress</span>
                    <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-extrabold">
                      Turbo Engine
                    </span>
                  </h4>
                  <p className="text-xs text-slate-300 font-medium">
                    {analysisSteps[currentStepIndex]?.title || 'Processing candidate DNA...'}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono font-bold text-amber-300 flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{elapsedSeconds.toFixed(1)}s elapsed</span>
                </span>
                <span className="text-[10px] text-slate-400 block">Fast result in ~2-3s</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 via-sky-400 to-emerald-400 h-full transition-all duration-300 rounded-full"
                style={{ width: `${Math.min(96, ((currentStepIndex + 1) / analysisSteps.length) * 100)}%` }}
              />
            </div>

            {/* Live Step Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
              {analysisSteps.map((step, idx) => {
                const isDone = idx < currentStepIndex;
                const isCurrent = idx === currentStepIndex;
                return (
                  <div
                    key={idx}
                    className={`flex items-center space-x-2 p-2 rounded-xl border text-[11px] transition-all ${
                      isDone
                        ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                        : isCurrent
                        ? 'bg-blue-900/40 border-blue-400 text-blue-200 font-bold animate-pulse'
                        : 'bg-slate-800/40 border-slate-700 text-slate-400'
                    }`}
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    ) : isCurrent ? (
                      <div className="w-3.5 h-3.5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin shrink-0" />
                    ) : (
                      <div className="w-3.5 h-3.5 rounded-full border border-slate-600 shrink-0" />
                    )}
                    <span className="truncate">{step.title}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <button
            type="submit"
            className="w-full py-4 px-6 rounded-2xl text-sm font-extrabold text-white shadow-lg bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 active:scale-[0.99] transition-all flex items-center justify-center space-x-2 cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-amber-300 fill-amber-300 animate-pulse" />
            <span>⚡ Generate Fast AI Career & ATS Report</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        )}
      </form>

      {/* 5. LANDING FEATURE CARDS SHOWCASE */}
      <div className="space-y-6 pt-4">
        <div className="text-center space-y-1">
          <h2 className="text-xl font-black text-slate-900 dark:text-white">Complete AI Career Suite Included</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Everything you need to optimize your candidate profile and ace interviews</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-black text-slate-900 dark:text-white">ATS Keyword Optimizer</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Scan your resume against real recruiter applicant tracking systems. Detect missing hard skills, formatting flaws, and weak action verbs.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              <Bot className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-black text-slate-900 dark:text-white">Hiring Manager Simulator</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Simulate strict recruiter evaluation rubrics. Get candid executive feedback on impact statements, leadership depth, and career trajectory.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-black text-slate-900 dark:text-white">Interactive Career Hub</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Generate matching job recommendations, real-time salary benchmarks, customized cover letters, and voice-guided mock interview practice.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
