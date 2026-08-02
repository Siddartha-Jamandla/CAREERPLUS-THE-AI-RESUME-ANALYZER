import React, { useState } from 'react';
import {
  Globe,
  Layout,
  Sparkles,
  Download,
  ExternalLink,
  Copy,
  Check,
  Eye,
  Code,
  Share2,
  FileText,
  User,
  Briefcase,
  FolderGit2,
  Award,
  Terminal,
  Palette,
  Smartphone,
  Monitor,
  CheckCircle2,
  Search,
  Settings
} from 'lucide-react';
import { ResumeAnalysisResult } from '../types';

interface PortfolioGeneratorProps {
  analysisData?: ResumeAnalysisResult | null;
}

export const PortfolioGenerator: React.FC<PortfolioGeneratorProps> = ({ analysisData }) => {
  const [activeTheme, setActiveTheme] = useState<'modern' | 'minimal' | 'neo' | 'dark'>('modern');
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeTab, setActiveTab] = useState<'preview' | 'seo' | 'code'>('preview');

  // Candidate default details extracted from analysis or defaults
  const candidateName = analysisData?.extractedDetails?.candidateName || 'J Siddartha';
  const currentRole = analysisData?.extractedDetails?.currentRole || 'Senior Full-Stack Engineer & Architect';
  const yearsExp = analysisData?.extractedDetails?.yearsExperience || '6+ Years';

  const [portfolioData, setPortfolioData] = useState({
    name: candidateName,
    title: currentRole,
    bio: 'Passionate software engineer crafting scalable web applications, distributed cloud services, and performant user experiences.',
    email: 'j.siddartha@example.com',
    github: 'https://github.com/jsiddartha',
    linkedin: 'https://linkedin.com/in/jsiddartha',
    customSlug: candidateName.toLowerCase().replace(/\s+/g, '-'),
    seoTitle: `${candidateName} - ${currentRole} | Portfolio & Web Resume`,
    seoDescription: `Explore ${candidateName}'s software engineering portfolio, featured cloud projects, technical skills, and career timeline.`
  });

  const portfolioProjects = analysisData?.portfolioProjectIdeas || [
    {
      title: 'Distributed Cloud AI Analytics Pipeline',
      techStack: ['TypeScript', 'React', 'Node.js', 'Redis', 'Docker'],
      description: 'Engineered a multi-tenant real-time data processing pipeline handling 10M+ daily events with sub-50ms latency.'
    },
    {
      title: 'Enterprise Microservices Gateway',
      techStack: ['Go', 'Kubernetes', 'GraphQL', 'PostgreSQL'],
      description: 'Designed unified authentication and rate-limiting gateway for 15+ internal services, improving response times by 40%.'
    }
  ];

  const detectedSkills = analysisData?.extractedDetails?.detectedSkills || [
    'React', 'TypeScript', 'Node.js', 'Express', 'Tailwind CSS', 'Docker', 'AWS', 'PostgreSQL', 'GraphQL', 'System Architecture'
  ];

  const handleCopyLink = () => {
    const link = `https://careerplus.site/p/${portfolioData.customSlug}`;
    navigator.clipboard.writeText(link);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const getThemeStyles = () => {
    switch (activeTheme) {
      case 'minimal':
        return 'bg-slate-50 text-slate-900 font-serif border-slate-200';
      case 'neo':
        return 'bg-amber-50 text-slate-950 font-sans border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]';
      case 'dark':
        return 'bg-slate-950 text-slate-100 font-sans border-slate-800';
      case 'modern':
      default:
        return 'bg-white text-slate-900 font-sans border-slate-200';
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* HEADER HERO */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden border border-blue-800/40">
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-blue-500/20 rounded-full border border-blue-400/30 text-blue-300 text-xs font-black uppercase tracking-wider">
              <Globe className="w-3.5 h-3.5 text-blue-400" />
              <span>1-Click AI Web Portfolio Generator</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Instant AI Web Portfolio & Personal Site
            </h1>
            <p className="text-blue-200 text-sm max-w-2xl font-medium leading-relaxed">
              Transform your resume into a live, interactive web portfolio with custom themes, project showcases, responsive timeline, downloadable PDF, and custom domain link.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleCopyLink}
              className="flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-3 rounded-2xl font-black text-xs shadow-lg shadow-emerald-500/20 transition-all cursor-pointer transform active:scale-95"
            >
              {copiedLink ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
              <span>{copiedLink ? 'Link Copied!' : 'Publish & Share Portfolio'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* CONTROL & THEME SELECTION BAR */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-wrap items-center justify-between gap-4">
        {/* THEME PRESET BUTTONS */}
        <div className="flex items-center space-x-2">
          <span className="text-xs font-black text-slate-500 uppercase tracking-wider mr-2 flex items-center space-x-1">
            <Palette className="w-3.5 h-3.5 text-blue-500" />
            <span>Theme:</span>
          </span>
          {[
            { id: 'modern', name: 'Modern Tech' },
            { id: 'minimal', name: 'Executive Minimal' },
            { id: 'neo', name: 'Neo-Brutalist' },
            { id: 'dark', name: 'Cyber Dark' }
          ].map((theme) => (
            <button
              key={theme.id}
              onClick={() => setActiveTheme(theme.id as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer border ${
                activeTheme === theme.id
                  ? 'bg-blue-600 text-white border-blue-500 shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200'
              }`}
            >
              {theme.name}
            </button>
          ))}
        </div>

        {/* DEVICE TOGGLE & VIEW TABS */}
        <div className="flex items-center space-x-3">
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setPreviewDevice('desktop')}
              className={`p-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                previewDevice === 'desktop' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs' : 'text-slate-500'
              }`}
              title="Desktop View"
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPreviewDevice('mobile')}
              className={`p-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                previewDevice === 'mobile' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs' : 'text-slate-500'
              }`}
              title="Mobile View"
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>

          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold">
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === 'preview' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs' : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Live Preview
            </button>
            <button
              onClick={() => setActiveTab('seo')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === 'seo' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs' : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              SEO & Metadata
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === 'code' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs' : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Export Code
            </button>
          </div>
        </div>
      </div>

      {/* PORTFOLIO PUBLISHED LINK BANNER */}
      <div className="bg-emerald-50 dark:bg-emerald-950/40 p-4 rounded-2xl border border-emerald-200 dark:border-emerald-800 flex items-center justify-between text-xs font-bold text-emerald-900 dark:text-emerald-200">
        <div className="flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Live Portfolio Web Page Hosted at:</span>
          <span className="font-mono bg-white dark:bg-slate-900 px-2.5 py-1 rounded-lg border border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300">
            https://careerplus.site/p/{portfolioData.customSlug}
          </span>
        </div>
        <button
          onClick={handleCopyLink}
          className="flex items-center space-x-1 text-emerald-700 dark:text-emerald-300 hover:underline cursor-pointer"
        >
          <span>Copy URL</span>
          <Copy className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* TAB CONTENT 1: LIVE PREVIEW STAGE */}
      {activeTab === 'preview' && (
        <div className="flex justify-center">
          <div
            className={`transition-all duration-300 rounded-3xl overflow-hidden shadow-2xl border ${getThemeStyles()} ${
              previewDevice === 'mobile' ? 'max-w-md w-full' : 'w-full'
            }`}
          >
            {/* PORTFOLIO NAVBAR */}
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="font-black text-lg tracking-tight">
                {portfolioData.name}<span className="text-blue-600">.dev</span>
              </div>
              <div className="flex items-center space-x-4 text-xs font-bold">
                <a href="#about" className="hover:text-blue-600">About</a>
                <a href="#projects" className="hover:text-blue-600">Projects</a>
                <a href="#skills" className="hover:text-blue-600">Skills</a>
                <button
                  onClick={() => alert('Downloading official PDF Resume!')}
                  className="bg-blue-600 text-white px-3 py-1.5 rounded-xl font-black text-xs hover:bg-blue-700 cursor-pointer"
                >
                  Resume PDF
                </button>
              </div>
            </div>

            {/* PORTFOLIO HERO SECTION */}
            <div className="p-8 sm:p-12 space-y-6 text-center sm:text-left">
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 rounded-full text-xs font-extrabold">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Available for Tech Roles & Consulting</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                Hi, I'm <span className="text-blue-600">{portfolioData.name}</span>
              </h1>
              <p className="text-lg sm:text-xl font-bold opacity-80 max-w-2xl">
                {portfolioData.title}
              </p>
              <p className="text-sm opacity-70 max-w-2xl leading-relaxed">
                {portfolioData.bio}
              </p>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-2">
                <a
                  href={`mailto:${portfolioData.email}`}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-xs font-black transition-all"
                >
                  Contact Me
                </a>
                <a
                  href={portfolioData.github}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-5 py-2.5 rounded-xl text-xs font-black transition-all"
                >
                  GitHub Profile
                </a>
              </div>
            </div>

            {/* FEATURED SKILLS GRID */}
            <div className="p-8 border-t border-slate-200 dark:border-slate-800 space-y-4">
              <h2 className="text-xs font-black uppercase tracking-wider opacity-60">Verified Core Skills</h2>
              <div className="flex flex-wrap gap-2">
                {detectedSkills.map((skill: string, idx: number) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 rounded-xl text-xs font-extrabold border border-blue-200 dark:border-blue-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* FEATURED PROJECTS SHOWCASE */}
            <div className="p-8 border-t border-slate-200 dark:border-slate-800 space-y-6">
              <h2 className="text-lg font-black tracking-tight">Featured Engineering Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {portfolioProjects.map((proj: any, idx: number) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-extrabold">{proj.title}</h3>
                      <FolderGit2 className="w-4 h-4 text-blue-500" />
                    </div>
                    <p className="text-xs opacity-80 leading-relaxed">
                      {proj.description || 'Architected and deployed full-stack cloud application with high reliability.'}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {(proj.techStack || ['React', 'Node.js']).map((tech: string, i: number) => (
                        <span key={i} className="text-[10px] font-mono bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded-md opacity-80">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FOOTER */}
            <div className="p-6 border-t border-slate-200 dark:border-slate-800 text-center text-xs opacity-60">
              © {new Date().getFullYear()} {portfolioData.name}. Powered by CareerPlus AI.
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 2: SEO & METADATA INSPECTOR */}
      {activeTab === 'seo' && (
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex items-center space-x-2">
            <Search className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-black text-slate-900 dark:text-white">
              SEO & Social OpenGraph Optimization
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300">Meta Title Tag</label>
              <input
                type="text"
                value={portfolioData.seoTitle}
                onChange={(e) => setPortfolioData({ ...portfolioData, seoTitle: e.target.value })}
                className="w-full mt-1 p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300">Meta Description</label>
              <textarea
                rows={3}
                value={portfolioData.seoDescription}
                onChange={(e) => setPortfolioData({ ...portfolioData, seoDescription: e.target.value })}
                className="w-full mt-1 p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white outline-none"
              />
            </div>

            {/* GOOGLE SEARCH PREVIEW BOX */}
            <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1">
              <p className="text-[10px] text-slate-500 font-mono">https://careerplus.site › p › {portfolioData.customSlug}</p>
              <h3 className="text-sm font-bold text-blue-700 dark:text-blue-400 hover:underline cursor-pointer">
                {portfolioData.seoTitle}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                {portfolioData.seoDescription}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 3: CODE EXPORT */}
      {activeTab === 'code' && (
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center space-x-2">
              <Code className="w-5 h-5 text-purple-600" />
              <span>Export Standalone HTML/CSS Code</span>
            </h2>
            <button
              onClick={() => alert('HTML/CSS Portfolio Zip downloaded!')}
              className="flex items-center space-x-2 bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-bold cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download ZIP Package</span>
            </button>
          </div>

          <pre className="p-4 bg-slate-950 text-emerald-400 rounded-2xl text-xs font-mono overflow-x-auto max-h-96">
            {`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${portfolioData.seoTitle}</title>
  <meta name="description" content="${portfolioData.seoDescription}">
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body className="bg-slate-900 text-white">
  <main className="max-w-4xl mx-auto py-12 px-6">
    <h1 className="text-4xl font-bold">${portfolioData.name}</h1>
    <p className="text-xl text-blue-400 mt-2">${portfolioData.title}</p>
  </main>
</body>
</html>`}
          </pre>
        </div>
      )}
    </div>
  );
};
