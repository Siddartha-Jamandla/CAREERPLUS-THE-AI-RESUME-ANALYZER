import React, { useState } from 'react';
import {
  Puzzle,
  Download,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  Briefcase,
  Layers,
  Zap,
  Globe,
  FileText,
  Copy,
  Check,
  Search,
  ArrowRight,
  ShieldCheck,
  Send
} from 'lucide-react';

interface JobTrackerExtensionProps {
  onSaveJobToKanban?: (job: any) => void;
}

export const JobTrackerExtension: React.FC<JobTrackerExtensionProps> = ({ onSaveJobToKanban }) => {
  const [activeSite, setActiveSite] = useState<'linkedin' | 'indeed' | 'glassdoor'>('linkedin');
  const [isScraped, setIsScraped] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [downloadedZip, setDownloadedZip] = useState(false);

  // Simulated active tab scraped job
  const simulatedJobs = {
    linkedin: {
      title: 'Senior Staff Software Engineer - AI Platforms',
      company: 'OpenScale AI',
      location: 'San Francisco, CA (Hybrid)',
      salary: '$185,000 - $240,000 + Equity',
      posted: '2 hours ago',
      skills: ['TypeScript', 'Python', 'LLM Agents', 'Kubernetes', 'Redis'],
      description: 'Architect next-generation AI orchestration pipelines, lead high-throughput microservices engineering, and collaborate with cross-functional AI product teams.'
    },
    indeed: {
      title: 'Lead Full-Stack React & Node Architect',
      company: 'Apex Digital Systems',
      location: 'Austin, TX (Remote)',
      salary: '$160,000 - $210,000',
      posted: '1 day ago',
      skills: ['React', 'Node.js', 'PostgreSQL', 'AWS Lambda', 'GraphQL'],
      description: 'Lead engineering team developing cloud SaaS products. Responsible for component design, backend performance, and CI/CD deployment automation.'
    },
    glassdoor: {
      title: 'Principal Systems Architect',
      company: 'CloudMatrix Global',
      location: 'New York, NY (On-site)',
      salary: '$200,000 - $260,000',
      posted: '3 days ago',
      skills: ['System Design', 'Go', 'Distributed Systems', 'Kafka', 'Terraform'],
      description: 'Drive architectural roadmap for real-time distributed data pipelines processing billions of transactions weekly.'
    }
  };

  const currentScrapedJob = simulatedJobs[activeSite];

  const handleSimulateScrape = () => {
    setIsScraped(true);
  };

  const handleSaveToKanban = () => {
    if (onSaveJobToKanban) {
      onSaveJobToKanban({
        id: Date.now().toString(),
        jobTitle: currentScrapedJob.title,
        companyName: currentScrapedJob.company,
        location: currentScrapedJob.location,
        salary: currentScrapedJob.salary,
        status: 'Saved',
        appliedDate: new Date().toISOString().split('T')[0],
        notes: `Imported via CareerPlus Chrome Extension from ${activeSite.toUpperCase()}`
      });
    }
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleDownloadExtensionZip = () => {
    setDownloadedZip(true);
    setTimeout(() => setDownloadedZip(false), 3000);
    alert('CareerPlus Extension Manifest v3 ZIP downloaded! Load unpacked in chrome://extensions to auto-sync job applications!');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* HEADER HERO */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden border border-blue-800/40">
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-blue-500/20 rounded-full border border-blue-400/30 text-blue-300 text-xs font-black uppercase tracking-wider">
              <Puzzle className="w-3.5 h-3.5 text-blue-400" />
              <span>Smart Browser Extension & Auto-Sync</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              CareerPlus Browser Extension Hub
            </h1>
            <p className="text-blue-200 text-sm max-w-2xl font-medium leading-relaxed">
              Auto-extract job postings directly from LinkedIn, Indeed, and Glassdoor with 1-click. Auto-sync to your Kanban Job Tracker board, generate tailored resumes, and auto-fill job applications!
            </p>
          </div>

          <button
            onClick={handleDownloadExtensionZip}
            className="flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3.5 rounded-2xl font-black text-xs shadow-lg shadow-emerald-500/20 transition-all cursor-pointer transform active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>{downloadedZip ? 'Extension Zip Downloaded!' : 'Download Extension (.zip)'}</span>
          </button>
        </div>
      </div>

      {/* EXTENSION SIMULATION WORKSPACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: SIMULATED WEBPAGE (LinkedIn / Indeed) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
            
            {/* BROWSER ADDRESS BAR SIMULATION */}
            <div className="bg-slate-100 dark:bg-slate-800 p-3 border-b border-slate-200 dark:border-slate-700 flex items-center space-x-3">
              <div className="flex space-x-1.5">
                <span className="w-3 h-3 bg-red-400 rounded-full"></span>
                <span className="w-3 h-3 bg-amber-400 rounded-full"></span>
                <span className="w-3 h-3 bg-emerald-400 rounded-full"></span>
              </div>

              <div className="flex-1 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-600 dark:text-slate-300 flex items-center space-x-2">
                <Globe className="w-3.5 h-3.5 text-slate-400" />
                <span>https://www.{activeSite}.com/jobs/view/892401</span>
              </div>

              {/* SITE SELECTOR BUTTONS */}
              <div className="flex bg-slate-200 dark:bg-slate-700 p-1 rounded-xl text-xs font-bold">
                {(['linkedin', 'indeed', 'glassdoor'] as const).map((site) => (
                  <button
                    key={site}
                    onClick={() => {
                      setActiveSite(site);
                      setIsScraped(false);
                    }}
                    className={`px-2.5 py-1 rounded-lg capitalize transition-all cursor-pointer ${
                      activeSite === site ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {site}
                  </button>
                ))}
              </div>
            </div>

            {/* SIMULATED JOB PAGE CONTENT */}
            <div className="p-8 space-y-6">
              <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                <div>
                  <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                    {activeSite.toUpperCase()} JOB POSTING
                  </span>
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                    {currentScrapedJob.title}
                  </h2>
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    {currentScrapedJob.company} • {currentScrapedJob.location}
                  </p>
                </div>
                <span className="text-xs font-black text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-3 py-1.5 rounded-xl border border-emerald-200 dark:border-emerald-800">
                  {currentScrapedJob.salary}
                </span>
              </div>

              <div className="space-y-3">
                <h3 className="text-xs font-black text-slate-500 uppercase tracking-wider">Required Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {currentScrapedJob.skills.map((skill, idx) => (
                    <span key={idx} className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-3 py-1 rounded-xl text-xs font-bold">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-xs font-black text-slate-500 uppercase tracking-wider">Job Summary</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
                  {currentScrapedJob.description}
                </p>
              </div>

              {/* SIMULATED APPLICATION FORM AUTO-FILL ZONE */}
              <div className="p-4 bg-blue-50/50 dark:bg-blue-950/30 rounded-2xl border border-blue-200 dark:border-blue-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-blue-900 dark:text-blue-200">
                    Extension Form Auto-Fill Status
                  </span>
                  <span className="text-[10px] font-black text-emerald-600 bg-emerald-100 dark:bg-emerald-900/60 px-2 py-0.5 rounded-md">
                    Ready to Auto-Fill
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs font-medium text-slate-700 dark:text-slate-300">
                  <div className="bg-white dark:bg-slate-900 p-2 rounded-xl border border-slate-200 dark:border-slate-700">
                    Name: J Siddartha
                  </div>
                  <div className="bg-white dark:bg-slate-900 p-2 rounded-xl border border-slate-200 dark:border-slate-700">
                    Email: j.siddartha@example.com
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: SIMULATED EXTENSION POPUP WIDGET */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-2xl border border-slate-800 space-y-5 relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center font-black text-white text-xs">
                  CP
                </div>
                <div>
                  <h3 className="text-sm font-black text-white">CareerPlus Companion</h3>
                  <p className="text-[10px] text-slate-400 font-bold">Extension v3.4 Active</p>
                </div>
              </div>
              <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping"></span>
            </div>

            <div className="space-y-4">
              <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 space-y-2">
                <div className="flex items-center justify-between text-xs font-extrabold text-blue-400">
                  <span>Target Detected</span>
                  <span className="capitalize">{activeSite}</span>
                </div>
                <p className="text-xs font-bold text-slate-100 line-clamp-1">
                  {currentScrapedJob.title}
                </p>
                <p className="text-[11px] text-slate-400">
                  {currentScrapedJob.company} • {currentScrapedJob.salary}
                </p>
              </div>

              {/* ACTION 1: SAVE TO KANBAN */}
              <button
                onClick={handleSaveToKanban}
                className={`w-full flex items-center justify-center space-x-2 py-3 rounded-2xl font-black text-xs transition-all cursor-pointer shadow-lg ${
                  isSaved
                    ? 'bg-emerald-600 text-white'
                    : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30'
                }`}
              >
                {isSaved ? <CheckCircle2 className="w-4 h-4" /> : <Briefcase className="w-4 h-4" />}
                <span>{isSaved ? 'Saved to Kanban Board!' : '1-Click Save to Job Tracker Board'}</span>
              </button>

              {/* ACTION 2: AUTO-GENERATE TAILORED COVER LETTER */}
              <button
                onClick={() => alert('Extension auto-generated tailored Cover Letter for ' + currentScrapedJob.company)}
                className="w-full flex items-center justify-center space-x-2 bg-slate-800 hover:bg-slate-700 text-slate-200 py-3 rounded-2xl font-bold text-xs border border-slate-700 cursor-pointer"
              >
                <FileText className="w-4 h-4 text-purple-400" />
                <span>Auto-Generate Tailored Cover Letter</span>
              </button>

              {/* ACTION 3: AUTO-FILL APPLICATION FORM */}
              <button
                onClick={() => alert('Extension auto-filled application fields on ' + activeSite)}
                className="w-full flex items-center justify-center space-x-2 bg-slate-800 hover:bg-slate-700 text-slate-200 py-3 rounded-2xl font-bold text-xs border border-slate-700 cursor-pointer"
              >
                <Send className="w-4 h-4 text-emerald-400" />
                <span>Auto-Fill Application Form On Page</span>
              </button>
            </div>

            <div className="text-[10px] text-center text-slate-500 font-mono">
              Manifest V3 • Encrypted Local Vault • 0 Data Selling
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
