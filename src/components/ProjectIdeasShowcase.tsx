import React, { useState } from 'react';
import {
  FolderGit2,
  Code2,
  Clock,
  Compass,
  Award,
  ExternalLink,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Sparkles,
  BookOpen,
  ArrowRight,
  Filter,
  Search,
  Zap
} from 'lucide-react';
import { PortfolioProjectIdea } from '../types';

interface ProjectIdeasShowcaseProps {
  projects?: PortfolioProjectIdea[];
  targetRole: string;
  onNavigateJobs?: () => void;
}

export const ProjectIdeasShowcase: React.FC<ProjectIdeasShowcaseProps> = ({
  projects,
  targetRole,
  onNavigateJobs,
}) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedProjectId, setExpandedProjectId] = useState<number | null>(0); // First project expanded by default
  const [copiedBulletId, setCopiedBulletId] = useState<string | null>(null);

  const projectList: PortfolioProjectIdea[] = projects && projects.length > 0 ? projects : [];

  const handleCopyBullet = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBulletId(id);
    setTimeout(() => setCopiedBulletId(null), 2000);
  };

  const filteredProjects = projectList.filter((proj) => {
    const matchesDiff =
      selectedDifficulty === 'All' ||
      proj.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      !query ||
      proj.title.toLowerCase().includes(query) ||
      proj.techStack.some((t) => t.toLowerCase().includes(query)) ||
      proj.keySkillsDemonstrated.some((s) => s.toLowerCase().includes(query));
    return matchesDiff && matchesSearch;
  });

  const difficulties = ['All', 'Advanced', 'Intermediate', 'Beginner'];

  if (projectList.length === 0) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
        <div className="space-y-1.5">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>AI Resume Enhancer • {projectList.length} Recommended Projects</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            10 High-Impact Portfolio Projects for {targetRole}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            Bridge identified skill gaps and strengthen your resume with production-grade projects. Each project includes step-by-step roadmaps, recommended tech stacks, free learning docs, and ready-to-use resume bullet points.
          </p>
        </div>

        {onNavigateJobs && (
          <button
            onClick={onNavigateJobs}
            className="shrink-0 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-all shadow-xs flex items-center space-x-1.5 cursor-pointer self-start md:self-auto"
          >
            <span>Explore In Jobs Hub</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {difficulties.map((diff) => (
            <button
              key={diff}
              onClick={() => setSelectedDifficulty(diff)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedDifficulty === diff
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {diff === 'All' ? `All (${projectList.length})` : diff}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tech or skill..."
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          />
        </div>
      </div>

      {/* Projects List Grid */}
      <div className="space-y-4">
        {filteredProjects.map((proj, idx) => {
          const isExpanded = expandedProjectId === idx;
          const originalIndex = projectList.findIndex((p) => p.title === proj.title);
          const projectNumber = originalIndex !== -1 ? originalIndex + 1 : idx + 1;

          const difficultyColor =
            proj.difficulty === 'Advanced'
              ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800/60'
              : proj.difficulty === 'Intermediate'
              ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800/60'
              : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60';

          return (
            <div
              key={idx}
              className="border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900/60 overflow-hidden transition-all hover:border-slate-300 dark:hover:border-slate-700"
            >
              {/* Collapsed Header Bar */}
              <div
                onClick={() => setExpandedProjectId(isExpanded ? null : idx)}
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-7 h-7 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 flex items-center justify-center font-black text-xs shrink-0 mt-0.5">
                    {projectNumber}
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase border ${difficultyColor}`}>
                        {proj.difficulty}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 flex items-center space-x-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{proj.estimatedHours}</span>
                      </span>
                    </div>

                    <h4 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
                      {proj.title}
                    </h4>

                    {/* Tech Stack Preview */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      {proj.techStack.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-bold rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 self-end sm:self-center shrink-0">
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400 hidden sm:inline">
                    {isExpanded ? 'Hide Details' : 'View Blueprint & Roadmap'}
                  </span>
                  <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
              </div>

              {/* Expanded Body Details */}
              {isExpanded && (
                <div className="p-4 sm:p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/90 space-y-5">
                  {/* Hiring Manager Value Statement */}
                  <div className="p-3.5 bg-blue-50/60 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/60 rounded-xl flex items-start space-x-2.5 text-xs text-blue-900 dark:text-blue-200">
                    <Zap className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5 fill-blue-500" />
                    <div>
                      <strong className="font-extrabold block">Why this impresses hiring managers:</strong>
                      <span>{proj.targetRoleValue}</span>
                    </div>
                  </div>

                  {/* Skills Demonstrated */}
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center space-x-1">
                      <Award className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Key Resume Competencies Demonstrated:</span>
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {proj.keySkillsDemonstrated.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold rounded-lg"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Step-by-Step Execution Roadmap */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center space-x-1">
                      <Compass className="w-3.5 h-3.5 text-blue-600" />
                      <span>Step-by-Step Execution Roadmap:</span>
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                      {proj.stepByStepRoadmap.map((step, stIdx) => (
                        <div
                          key={stIdx}
                          className="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs space-y-1"
                        >
                          <span className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase block">
                            Phase {stIdx + 1}
                          </span>
                          <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                            {step}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Free Docs and Starter Templates */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="p-3.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl space-y-2">
                      <span className="text-[11px] font-bold uppercase text-slate-600 dark:text-slate-300 flex items-center space-x-1">
                        <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Free Documentation & Official Resources:</span>
                      </span>
                      <div className="space-y-1.5">
                        {proj.freeResourcesAndDocs.map((res, rIdx) => (
                          <a
                            key={rIdx}
                            href={res.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between text-xs text-blue-600 dark:text-blue-400 hover:underline p-1 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50"
                          >
                            <span className="font-semibold truncate">{res.name}</span>
                            <ExternalLink className="w-3 h-3 shrink-0 ml-1" />
                          </a>
                        ))}
                      </div>
                    </div>

                    <div className="p-3.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl flex flex-col justify-between space-y-2">
                      <div>
                        <span className="text-[11px] font-bold uppercase text-slate-600 dark:text-slate-300 flex items-center space-x-1">
                          <FolderGit2 className="w-3.5 h-3.5 text-amber-500" />
                          <span>Open-Source Starter Template:</span>
                        </span>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          Use verified starter repositories to jumpstart project setup in minutes.
                        </p>
                      </div>
                      <a
                        href={proj.githubStarterTemplateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center space-x-2 shadow-xs cursor-pointer"
                      >
                        <FolderGit2 className="w-3.5 h-3.5 text-amber-300" />
                        <span>Launch Starter GitHub Template</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  {/* Ready-to-Use Quantified Resume Bullets */}
                  <div className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center space-x-1.5">
                        <Code2 className="w-3.5 h-3.5 text-blue-600" />
                        <span>Ready-to-Paste Resume Bullet Points (Google XYZ Format):</span>
                      </span>
                    </div>

                    <div className="space-y-2">
                      {proj.resumeBulletPointsToInclude.map((bullet, bIdx) => {
                        const copyId = `${projectNumber}-${bIdx}`;
                        const isCopied = copiedBulletId === copyId;

                        return (
                          <div
                            key={bIdx}
                            className="p-3 bg-slate-50 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 rounded-xl flex items-start justify-between gap-3 text-xs text-slate-800 dark:text-slate-200"
                          >
                            <span className="leading-relaxed font-medium">{bullet}</span>
                            <button
                              onClick={() => handleCopyBullet(bullet, copyId)}
                              className={`shrink-0 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all flex items-center space-x-1 cursor-pointer ${
                                isCopied
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                              }`}
                            >
                              {isCopied ? (
                                <>
                                  <Check className="w-3 h-3" />
                                  <span>Copied!</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3" />
                                  <span>Copy</span>
                                </>
                              )}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
