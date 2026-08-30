import React, { useState, useEffect } from 'react';
import { 
  FolderGit2, 
  Code2, 
  Sparkles, 
  CheckCircle2, 
  ExternalLink, 
  Plus, 
  Search, 
  Filter, 
  Check, 
  Layers, 
  GraduationCap, 
  MessageSquare, 
  Calendar, 
  ChevronDown, 
  ChevronUp, 
  BookOpen, 
  Award, 
  DollarSign, 
  MapPin, 
  Briefcase, 
  Clock, 
  Trash2, 
  Save, 
  Zap, 
  ArrowRight,
  HelpCircle,
  TrendingUp,
  FileText,
  AlertCircle
} from 'lucide-react';
import { 
  SavedAnalysisRecord, 
  ResumeAnalysisResult, 
  PortfolioProjectIdea, 
  JobOpening, 
  FreeCourse, 
  InterviewQuestion, 
  UserCareerTrackingData,
  ManagedProjectStatus,
  ManagedJobStatus,
  ManagedCourseStatus,
  ManagedQuestionStatus
} from '../types';
import { DEFAULT_SAMPLE_ANALYSIS } from '../utils/defaultAnalysis';

interface UserCareerManagementHubProps {
  token: string;
  savedAnalyses: SavedAnalysisRecord[];
  targetRole: string;
  onNavigateTab: (tab: string) => void;
  onLoadSavedAnalysis: (analysis: ResumeAnalysisResult, targetRole: string) => void;
}

export const UserCareerManagementHub: React.FC<UserCareerManagementHubProps> = ({
  token,
  savedAnalyses,
  targetRole,
  onNavigateTab,
  onLoadSavedAnalysis,
}) => {
  const [activeTab, setActiveTab] = useState<'projects' | 'jobs' | 'courses' | 'interviews'>('projects');
  const [selectedAnalysisId, setSelectedAnalysisId] = useState<string>(() => {
    return savedAnalyses.length > 0 ? savedAnalyses[0].id : 'latest';
  });

  const [careerData, setCareerData] = useState<UserCareerTrackingData>({
    projectStatuses: {},
    customProjects: [],
    jobStatuses: {},
    customJobs: [],
    courseStatuses: {},
    questionStatuses: {},
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [statusFeedback, setStatusFeedback] = useState<string | null>(null);

  // Filters & Search
  const [projectSearch, setProjectSearch] = useState<string>('');
  const [projectDiffFilter, setProjectDiffFilter] = useState<string>('All');
  const [projectStatusFilter, setProjectStatusFilter] = useState<string>('All');
  const [expandedProjectIdx, setExpandedProjectIdx] = useState<number | null>(0);

  const [jobSearch, setJobSearch] = useState<string>('');
  const [jobStatusFilter, setJobStatusFilter] = useState<string>('All');

  const [courseSearch, setCourseSearch] = useState<string>('');
  const [courseStatusFilter, setCourseStatusFilter] = useState<string>('All');

  const [questionSearch, setQuestionSearch] = useState<string>('');
  const [expandedQuestionIdx, setExpandedQuestionIdx] = useState<number | null>(0);

  // Modal / Add state
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState<boolean>(false);
  const [newProject, setNewProject] = useState<PortfolioProjectIdea>({
    title: '',
    difficulty: 'Intermediate',
    estimatedHours: '20 Hours',
    targetRoleValue: `Demonstrates full-stack development and system engineering for ${targetRole}`,
    keySkillsDemonstrated: ['TypeScript', 'React', 'Node.js', 'System Architecture'],
    techStack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    freeResourcesAndDocs: [{ name: 'Official Documentation', url: 'https://developer.mozilla.org', platform: 'MDN Web Docs' }],
    stepByStepRoadmap: [
      'Design database schema and RESTful API endpoints.',
      'Implement responsive client-side UI with component-driven state.',
      'Integrate caching and production CI/CD pipelines.',
      'Deploy application and link live URL to portfolio.'
    ],
    githubStarterTemplateUrl: 'https://github.com',
    resumeBulletPointsToInclude: [
      'Architected scalable full-stack application delivering 99.9% uptime and sub-100ms response times.',
      'Implemented automated CI/CD pipeline reducing deployment cycles by 40%.'
    ]
  });

  const [isAddJobModalOpen, setIsAddJobModalOpen] = useState<boolean>(false);
  const [newJob, setNewJob] = useState<JobOpening>({
    jobTitle: `${targetRole}`,
    companyName: '',
    location: 'Remote / Hybrid',
    salaryEstimate: '$140,000 - $190,000 / year',
    matchPercentage: 92,
    keySkillsRequired: ['TypeScript', 'System Design', 'Cloud Scale'],
    postedTime: 'Just now',
    platform: 'Custom Tracked',
    applyUrl: 'https://linkedin.com/jobs'
  });

  // Load career data on mount
  useEffect(() => {
    fetchCareerData();
  }, [token]);

  const fetchCareerData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/user/career-data', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        if (data.careerData) {
          setCareerData(data.careerData);
        }
      }
    } catch (err) {
      console.error('Error fetching user career data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const saveCareerDataUpdate = async (updatedData: UserCareerTrackingData) => {
    setCareerData(updatedData);
    setIsSaving(true);
    try {
      const res = await fetch('/api/user/career-data', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(updatedData)
      });
      if (res.ok) {
        setStatusFeedback('Saved to your profile!');
        setTimeout(() => setStatusFeedback(null), 2500);
      }
    } catch (err) {
      console.error('Error saving career tracking data:', err);
    } finally {
      setIsSaving(false);
    }
  };

  // Determine active resume analysis data source
  const currentRecord = savedAnalyses.find(r => r.id === selectedAnalysisId) || savedAnalyses[0];
  const activeAnalysis: ResumeAnalysisResult = currentRecord ? currentRecord.analysis : DEFAULT_SAMPLE_ANALYSIS;
  const currentRoleName = currentRecord ? currentRecord.targetRole : targetRole;

  // Extract analysis content
  const rawProjects: PortfolioProjectIdea[] = [
    ...(careerData.customProjects || []),
    ...(activeAnalysis.portfolioProjectIdeas && activeAnalysis.portfolioProjectIdeas.length > 0
      ? activeAnalysis.portfolioProjectIdeas
      : DEFAULT_SAMPLE_ANALYSIS.portfolioProjectIdeas || [])
  ];

  const rawJobs: JobOpening[] = [
    ...(careerData.customJobs || []),
    ...(activeAnalysis.recommendedJobs && activeAnalysis.recommendedJobs.length > 0
      ? activeAnalysis.recommendedJobs
      : DEFAULT_SAMPLE_ANALYSIS.recommendedJobs || [])
  ];

  const rawCourses: FreeCourse[] = [
    ...(activeAnalysis.freeCoursesWithCertificates && activeAnalysis.freeCoursesWithCertificates.length > 0
      ? activeAnalysis.freeCoursesWithCertificates
      : DEFAULT_SAMPLE_ANALYSIS.freeCoursesWithCertificates || [])
  ];

  const rawQuestions: InterviewQuestion[] = [
    ...(activeAnalysis.tailoredInterviewQuestions && activeAnalysis.tailoredInterviewQuestions.length > 0
      ? activeAnalysis.tailoredInterviewQuestions
      : DEFAULT_SAMPLE_ANALYSIS.tailoredInterviewQuestions || [])
  ];

  // Handlers for updating tracking state
  const handleUpdateProjectStatus = (title: string, status: ManagedProjectStatus) => {
    const updated = {
      ...careerData,
      projectStatuses: {
        ...careerData.projectStatuses,
        [title]: {
          status,
          notes: careerData.projectStatuses?.[title]?.notes || '',
          updatedAt: new Date().toISOString()
        }
      }
    };
    saveCareerDataUpdate(updated);
  };

  const handleUpdateProjectNotes = (title: string, notes: string) => {
    const prevStatus = careerData.projectStatuses?.[title]?.status || 'Planned';
    const updated = {
      ...careerData,
      projectStatuses: {
        ...careerData.projectStatuses,
        [title]: {
          status: prevStatus,
          notes,
          updatedAt: new Date().toISOString()
        }
      }
    };
    saveCareerDataUpdate(updated);
  };

  const handleCreateCustomProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.title.trim()) return;
    const updated = {
      ...careerData,
      customProjects: [newProject, ...(careerData.customProjects || [])],
      projectStatuses: {
        ...careerData.projectStatuses,
        [newProject.title]: {
          status: 'Planned' as ManagedProjectStatus,
          notes: 'Candidate custom project',
          updatedAt: new Date().toISOString()
        }
      }
    };
    saveCareerDataUpdate(updated);
    setIsAddProjectModalOpen(false);
    setNewProject({
      ...newProject,
      title: '',
      techStack: ['React', 'TypeScript', 'Node.js']
    });
  };

  const handleUpdateJobStatus = (key: string, status: ManagedJobStatus) => {
    const updated = {
      ...careerData,
      jobStatuses: {
        ...careerData.jobStatuses,
        [key]: {
          status,
          notes: careerData.jobStatuses?.[key]?.notes || '',
          appliedDate: status === 'Applied' ? new Date().toISOString() : careerData.jobStatuses?.[key]?.appliedDate,
          updatedAt: new Date().toISOString()
        }
      }
    };
    saveCareerDataUpdate(updated);
  };

  const handleCreateCustomJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJob.companyName.trim() || !newJob.jobTitle.trim()) return;
    const key = `${newJob.jobTitle} - ${newJob.companyName}`;
    const updated = {
      ...careerData,
      customJobs: [newJob, ...(careerData.customJobs || [])],
      jobStatuses: {
        ...careerData.jobStatuses,
        [key]: {
          status: 'Saved' as ManagedJobStatus,
          notes: 'Custom candidate tracked opportunity',
          updatedAt: new Date().toISOString()
        }
      }
    };
    saveCareerDataUpdate(updated);
    setIsAddJobModalOpen(false);
    setNewJob({
      ...newJob,
      companyName: '',
      jobTitle: `${targetRole}`
    });
  };

  const handleUpdateCourseStatus = (title: string, status: ManagedCourseStatus) => {
    const updated = {
      ...careerData,
      courseStatuses: {
        ...careerData.courseStatuses,
        [title]: {
          status,
          updatedAt: new Date().toISOString()
        }
      }
    };
    saveCareerDataUpdate(updated);
  };

  const handleUpdateQuestionStatus = (question: string, status: ManagedQuestionStatus, notes?: string) => {
    const updated = {
      ...careerData,
      questionStatuses: {
        ...careerData.questionStatuses,
        [question]: {
          status,
          notes: notes !== undefined ? notes : (careerData.questionStatuses?.[question]?.notes || ''),
          updatedAt: new Date().toISOString()
        }
      }
    };
    saveCareerDataUpdate(updated);
  };

  // Filtered lists
  const filteredProjects = rawProjects.filter(p => {
    const st = careerData.projectStatuses?.[p.title]?.status || 'Planned';
    const matchesDiff = projectDiffFilter === 'All' || p.difficulty.toLowerCase() === projectDiffFilter.toLowerCase();
    const matchesStatus = projectStatusFilter === 'All' || st === projectStatusFilter;
    const query = projectSearch.toLowerCase();
    const matchesQuery = !query || p.title.toLowerCase().includes(query) || p.techStack.some(t => t.toLowerCase().includes(query));
    return matchesDiff && matchesStatus && matchesQuery;
  });

  const filteredJobs = rawJobs.filter(j => {
    const key = `${j.jobTitle} - ${j.companyName}`;
    const st = careerData.jobStatuses?.[key]?.status || 'Saved';
    const matchesStatus = jobStatusFilter === 'All' || st === jobStatusFilter;
    const query = jobSearch.toLowerCase();
    const matchesQuery = !query || j.jobTitle.toLowerCase().includes(query) || j.companyName.toLowerCase().includes(query) || j.location.toLowerCase().includes(query);
    return matchesStatus && matchesQuery;
  });

  const filteredCourses = rawCourses.filter(c => {
    const st = careerData.courseStatuses?.[c.title]?.status || 'To Start';
    const matchesStatus = courseStatusFilter === 'All' || st === courseStatusFilter;
    const query = courseSearch.toLowerCase();
    const matchesQuery = !query || c.title.toLowerCase().includes(query) || c.skillCovered.toLowerCase().includes(query) || c.provider.toLowerCase().includes(query);
    return matchesStatus && matchesQuery;
  });

  const filteredQuestions = rawQuestions.filter(q => {
    const query = questionSearch.toLowerCase();
    return !query || q.question.toLowerCase().includes(query) || q.category.toLowerCase().includes(query);
  });

  // Calculate high-level progress statistics
  const completedProjectsCount = Object.values(careerData.projectStatuses || {}).filter((p: any) => p && (p.status === 'Completed' || p.status === 'Added to Resume')).length;
  const inProgressProjectsCount = Object.values(careerData.projectStatuses || {}).filter((p: any) => p && p.status === 'In Progress').length;
  const appliedJobsCount = Object.values(careerData.jobStatuses || {}).filter((j: any) => j && (j.status === 'Applied' || j.status === 'Screening' || j.status === 'Interviewing' || j.status === 'Offer')).length;
  const certifiedCoursesCount = Object.values(careerData.courseStatuses || {}).filter((c: any) => c && c.status === 'Certified').length;
  const masteredQuestionsCount = Object.values(careerData.questionStatuses || {}).filter((q: any) => q && q.status === 'Mastered').length;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
        <div className="space-y-1.5">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Profile Intelligence • Career & Resume Data Management</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center space-x-2">
            <span>Candidate Career Management Hub</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            Manage your AI-analyzed portfolio project ideas, track targeted job applications, organize certified courses, and log mock interview practice directly from your profile.
          </p>
        </div>

        {/* Saved Resume Report Selector */}
        {savedAnalyses.length > 0 && (
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="text-left">
              <span className="text-[10px] font-extrabold uppercase text-slate-400 block">Active Resume Data Source</span>
              <select
                value={selectedAnalysisId}
                onChange={(e) => setSelectedAnalysisId(e.target.value)}
                className="mt-0.5 text-xs font-bold text-slate-900 dark:text-white bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-2.5 py-1.5 outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer"
              >
                {savedAnalyses.map((rec) => (
                  <option key={rec.id} value={rec.id}>
                    {rec.targetRole} • {new Date(rec.createdAt).toLocaleDateString()} (Score: {rec.overallScore})
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => {
                if (currentRecord) {
                  onLoadSavedAnalysis(currentRecord.analysis, currentRecord.targetRole);
                }
              }}
              className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center space-x-1.5 shadow-xs cursor-pointer shrink-0"
              title="Launch full AI diagnosis report in analyzer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Open Report</span>
            </button>
          </div>
        )}
      </div>

      {/* Progress Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 bg-blue-50/50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 rounded-2xl space-y-1">
          <div className="flex items-center justify-between text-blue-600 dark:text-blue-400">
            <span className="text-[10px] font-extrabold uppercase">Projects Active</span>
            <FolderGit2 className="w-4 h-4" />
          </div>
          <p className="text-lg font-black text-slate-900 dark:text-white">
            {completedProjectsCount + inProgressProjectsCount} <span className="text-xs font-medium text-slate-400">/ {rawProjects.length}</span>
          </p>
          <span className="text-[10px] text-blue-600 dark:text-blue-400 font-bold block">{completedProjectsCount} Completed</span>
        </div>

        <div className="p-3.5 bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40 rounded-2xl space-y-1">
          <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400">
            <span className="text-[10px] font-extrabold uppercase">Jobs Applied</span>
            <Briefcase className="w-4 h-4" />
          </div>
          <p className="text-lg font-black text-slate-900 dark:text-white">
            {appliedJobsCount} <span className="text-xs font-medium text-slate-400">/ {rawJobs.length}</span>
          </p>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold block">In Pipeline</span>
        </div>

        <div className="p-3.5 bg-purple-50/50 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/40 rounded-2xl space-y-1">
          <div className="flex items-center justify-between text-purple-600 dark:text-purple-400">
            <span className="text-[10px] font-extrabold uppercase">Certifications</span>
            <GraduationCap className="w-4 h-4" />
          </div>
          <p className="text-lg font-black text-slate-900 dark:text-white">
            {certifiedCoursesCount} <span className="text-xs font-medium text-slate-400">/ {rawCourses.length}</span>
          </p>
          <span className="text-[10px] text-purple-600 dark:text-purple-400 font-bold block">Skills Certified</span>
        </div>

        <div className="p-3.5 bg-amber-50/50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/40 rounded-2xl space-y-1">
          <div className="flex items-center justify-between text-amber-600 dark:text-amber-400">
            <span className="text-[10px] font-extrabold uppercase">Questions Mastered</span>
            <MessageSquare className="w-4 h-4" />
          </div>
          <p className="text-lg font-black text-slate-900 dark:text-white">
            {masteredQuestionsCount} <span className="text-xs font-medium text-slate-400">/ {rawQuestions.length}</span>
          </p>
          <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold block">Interview Ready</span>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('projects')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center space-x-2 cursor-pointer ${
            activeTab === 'projects'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          <FolderGit2 className="w-4 h-4" />
          <span>Project Ideas & Areas ({rawProjects.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('jobs')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center space-x-2 cursor-pointer ${
            activeTab === 'jobs'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Target Jobs & Pipeline ({rawJobs.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('courses')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center space-x-2 cursor-pointer ${
            activeTab === 'courses'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Upskill Courses ({rawCourses.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('interviews')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center space-x-2 cursor-pointer ${
            activeTab === 'interviews'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>Mock Interview Q&A ({rawQuestions.length})</span>
        </button>

        {statusFeedback && (
          <span className="ml-auto text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center space-x-1 animate-pulse">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{statusFeedback}</span>
          </span>
        )}
      </div>

      {/* ========================================================= */}
      {/* TAB 1: PROJECT IDEAS & AREAS MANAGEMENT */}
      {/* ========================================================= */}
      {activeTab === 'projects' && (
        <div className="space-y-4">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl border border-slate-200 dark:border-slate-700">
            <div className="relative w-full sm:w-72">
              <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search projects or tech stacks..."
                value={projectSearch}
                onChange={(e) => setProjectSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <select
                value={projectStatusFilter}
                onChange={(e) => setProjectStatusFilter(e.target.value)}
                className="px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 outline-none cursor-pointer"
              >
                <option value="All">All Statuses</option>
                <option value="Planned">Planned</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Added to Resume">Added to Resume</option>
              </select>

              <button
                onClick={() => setIsAddProjectModalOpen(true)}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-all shadow-xs flex items-center space-x-1.5 cursor-pointer ml-auto sm:ml-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Custom Project</span>
              </button>
            </div>
          </div>

          {/* Projects List */}
          <div className="space-y-3">
            {filteredProjects.length === 0 ? (
              <div className="text-center py-8 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 space-y-2">
                <FolderGit2 className="w-8 h-8 text-slate-400 mx-auto" />
                <p className="text-xs text-slate-500 font-bold">No projects matched your search criteria.</p>
              </div>
            ) : (
              filteredProjects.map((proj, idx) => {
                const currentStatus: ManagedProjectStatus = careerData.projectStatuses?.[proj.title]?.status || 'Planned';
                const userNotes = careerData.projectStatuses?.[proj.title]?.notes || '';
                const isExpanded = expandedProjectIdx === idx;

                return (
                  <div
                    key={idx}
                    className="bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 rounded-2xl p-4 sm:p-5 transition-all space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2 flex-wrap gap-1">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                            proj.difficulty === 'Advanced'
                              ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                              : proj.difficulty === 'Intermediate'
                              ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                              : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                          }`}>
                            {proj.difficulty}
                          </span>
                          <span className="text-xs text-slate-400 font-semibold">• {proj.estimatedHours}</span>
                          <span className="text-xs text-slate-400 font-semibold">• Tailored for {currentRoleName}</span>
                        </div>
                        <h4 className="text-base font-black text-slate-900 dark:text-white leading-tight">
                          {proj.title}
                        </h4>
                      </div>

                      {/* Status Selector Pill */}
                      <div className="flex items-center space-x-2 shrink-0">
                        <select
                          value={currentStatus}
                          onChange={(e) => handleUpdateProjectStatus(proj.title, e.target.value as ManagedProjectStatus)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-black border cursor-pointer outline-none transition-all ${
                            currentStatus === 'Completed' || currentStatus === 'Added to Resume'
                              ? 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950/70 dark:text-emerald-300 dark:border-emerald-800'
                              : currentStatus === 'In Progress'
                              ? 'bg-blue-100 text-blue-900 border-blue-300 dark:bg-blue-950/70 dark:text-blue-300 dark:border-blue-800'
                              : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700'
                          }`}
                        >
                          <option value="Planned">💡 Planned</option>
                          <option value="In Progress">⚡ In Progress</option>
                          <option value="Completed">✅ Completed</option>
                          <option value="Added to Resume">⭐ Added to Resume</option>
                        </select>

                        <button
                          onClick={() => setExpandedProjectIdx(isExpanded ? null : idx)}
                          className="p-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        >
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Tech stack tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {proj.techStack.map((tech, tIdx) => (
                        <span key={tIdx} className="px-2 py-0.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-[11px] font-semibold rounded-lg">
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Expanded Detail View */}
                    {isExpanded && (
                      <div className="pt-3 border-t border-slate-200 dark:border-slate-700 space-y-3 text-xs">
                        <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1.5">
                          <span className="font-extrabold text-slate-900 dark:text-white uppercase text-[10px] tracking-wider block">
                            Target Hiring Value & Strategy
                          </span>
                          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                            {proj.targetRoleValue}
                          </p>
                        </div>

                        {/* Step by Step Roadmap */}
                        <div className="space-y-1.5">
                          <span className="font-extrabold text-slate-900 dark:text-white uppercase text-[10px] tracking-wider block">
                            Milestone Execution Roadmap
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {proj.stepByStepRoadmap.map((step, sIdx) => (
                              <div key={sIdx} className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-[11px] text-slate-700 dark:text-slate-300 flex items-start space-x-2">
                                <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 font-extrabold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                                  {sIdx + 1}
                                </span>
                                <span>{step}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Candidate Notes */}
                        <div className="space-y-1">
                          <label className="font-extrabold text-slate-700 dark:text-slate-300 uppercase text-[10px] block">
                            Candidate Project Notes / GitHub Repo Link:
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              placeholder="e.g. Started repository at github.com/myname/project, completed auth middleware..."
                              defaultValue={userNotes}
                              onBlur={(e) => handleUpdateProjectNotes(proj.title, e.target.value)}
                              className="flex-1 p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-blue-600"
                            />
                            <button
                              onClick={() => onNavigateTab('portfolio')}
                              className="px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl transition-colors flex items-center space-x-1 cursor-pointer shrink-0"
                            >
                              <span>Build Web Portfolio</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 2: TARGET JOBS & APPLICATION TRACKER */}
      {/* ========================================================= */}
      {activeTab === 'jobs' && (
        <div className="space-y-4">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl border border-slate-200 dark:border-slate-700">
            <div className="relative w-full sm:w-72">
              <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search jobs, company, location..."
                value={jobSearch}
                onChange={(e) => setJobSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <select
                value={jobStatusFilter}
                onChange={(e) => setJobStatusFilter(e.target.value)}
                className="px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 outline-none cursor-pointer"
              >
                <option value="All">All Pipeline Stages</option>
                <option value="Saved">Saved</option>
                <option value="Applied">Applied</option>
                <option value="Screening">Screening</option>
                <option value="Interviewing">Interviewing</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
              </select>

              <button
                onClick={() => setIsAddJobModalOpen(true)}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-all shadow-xs flex items-center space-x-1.5 cursor-pointer ml-auto sm:ml-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Track New Job</span>
              </button>
            </div>
          </div>

          {/* Jobs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {filteredJobs.map((job, idx) => {
              const jobKey = `${job.jobTitle} - ${job.companyName}`;
              const currentStatus: ManagedJobStatus = careerData.jobStatuses?.[jobKey]?.status || 'Saved';

              return (
                <div
                  key={idx}
                  className="bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 rounded-2xl p-4 sm:p-5 transition-all space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-extrabold uppercase text-blue-600 dark:text-blue-400 block">
                          {job.companyName}
                        </span>
                        <h4 className="text-base font-black text-slate-900 dark:text-white leading-tight">
                          {job.jobTitle}
                        </h4>
                      </div>
                      <span className="px-2.5 py-0.5 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-[10px] font-black rounded-full shrink-0">
                        {job.matchPercentage}% Match
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 dark:text-slate-300 py-1">
                      <span className="flex items-center space-x-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{job.location}</span>
                      </span>
                      <span className="flex items-center space-x-1 font-semibold text-emerald-600 dark:text-emerald-400">
                        <DollarSign className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{job.salaryEstimate}</span>
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1 pt-1">
                      {job.keySkillsRequired.map((skill, sIdx) => (
                        <span key={sIdx} className="px-2 py-0.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-[10px] font-semibold rounded-md">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions & Status */}
                  <div className="pt-3 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between gap-2">
                    <select
                      value={currentStatus}
                      onChange={(e) => handleUpdateJobStatus(jobKey, e.target.value as ManagedJobStatus)}
                      className={`px-2.5 py-1.5 rounded-xl text-xs font-black border cursor-pointer outline-none transition-all ${
                        currentStatus === 'Offer'
                          ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                          : currentStatus === 'Interviewing'
                          ? 'bg-amber-100 text-amber-900 border-amber-300'
                          : currentStatus === 'Applied'
                          ? 'bg-blue-100 text-blue-900 border-blue-300'
                          : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      <option value="Saved">📌 Saved</option>
                      <option value="Applied">📝 Applied</option>
                      <option value="Screening">📞 Screening</option>
                      <option value="Interviewing">🎯 Interviewing</option>
                      <option value="Offer">🎉 Offer</option>
                      <option value="Rejected">❌ Rejected</option>
                    </select>

                    <a
                      href={job.applyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-1.5 px-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-colors flex items-center space-x-1.5 shadow-xs"
                    >
                      <span>Apply Portal</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 3: CERTIFIED UPSKILLING COURSES */}
      {/* ========================================================= */}
      {activeTab === 'courses' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl border border-slate-200 dark:border-slate-700">
            <div className="relative w-full sm:w-72">
              <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search courses or skills..."
                value={courseSearch}
                onChange={(e) => setCourseSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <select
              value={courseStatusFilter}
              onChange={(e) => setCourseStatusFilter(e.target.value)}
              className="px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 outline-none cursor-pointer"
            >
              <option value="All">All Course Progress</option>
              <option value="To Start">To Start</option>
              <option value="In Progress">In Progress</option>
              <option value="Certified">Certified</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {filteredCourses.map((course, idx) => {
              const currentStatus: ManagedCourseStatus = careerData.courseStatuses?.[course.title]?.status || 'To Start';

              return (
                <div
                  key={idx}
                  className="bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-600 rounded-2xl p-4 sm:p-5 transition-all space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-0.5 bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 text-[10px] font-extrabold uppercase rounded-full">
                        {course.provider}
                      </span>
                      <span className="text-xs text-slate-400 font-semibold">• {course.duration}</span>
                      {course.hasCertificate && (
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 text-[10px] font-bold rounded-full flex items-center space-x-1">
                          <Award className="w-3 h-3" />
                          <span>Free Certificate</span>
                        </span>
                      )}
                    </div>

                    <h4 className="text-base font-black text-slate-900 dark:text-white leading-tight">
                      {course.title}
                    </h4>

                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                      {course.description}
                    </p>

                    <div className="pt-1">
                      <span className="text-[11px] font-bold text-slate-500">Skill Covered: </span>
                      <span className="text-[11px] font-extrabold text-blue-600 dark:text-blue-400">{course.skillCovered}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between gap-2">
                    <select
                      value={currentStatus}
                      onChange={(e) => handleUpdateCourseStatus(course.title, e.target.value as ManagedCourseStatus)}
                      className={`px-2.5 py-1.5 rounded-xl text-xs font-black border cursor-pointer outline-none transition-all ${
                        currentStatus === 'Certified'
                          ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                          : currentStatus === 'In Progress'
                          ? 'bg-purple-100 text-purple-900 border-purple-300'
                          : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      <option value="To Start">⏳ To Start</option>
                      <option value="In Progress">📚 In Progress</option>
                      <option value="Certified">🏆 Certified</option>
                    </select>

                    <a
                      href={course.directUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-1.5 px-3 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl transition-colors flex items-center space-x-1.5 shadow-xs"
                    >
                      <span>Launch Course</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 4: MOCK INTERVIEW QUESTIONS PRACTICE */}
      {/* ========================================================= */}
      {activeTab === 'interviews' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl border border-slate-200 dark:border-slate-700">
            <div className="relative w-full sm:w-72">
              <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search interview questions..."
                value={questionSearch}
                onChange={(e) => setQuestionSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <button
              onClick={() => onNavigateTab('mock')}
              className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-colors flex items-center space-x-1.5 shadow-xs cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 text-amber-300" />
              <span>Launch Live AI Mock Studio</span>
            </button>
          </div>

          <div className="space-y-3">
            {filteredQuestions.map((q, idx) => {
              const isMastered = careerData.questionStatuses?.[q.question]?.status === 'Mastered';
              const userNotes = careerData.questionStatuses?.[q.question]?.notes || '';
              const isExpanded = expandedQuestionIdx === idx;

              return (
                <div
                  key={idx}
                  className="bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 sm:p-5 space-y-3 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                          q.category === 'Skill Gap'
                            ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                            : q.category === 'Technical'
                            ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300'
                            : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                        }`}>
                          {q.category}
                        </span>
                        <span className="text-xs text-slate-400 font-semibold">Question #{idx + 1}</span>
                      </div>
                      <h4 className="text-base font-black text-slate-900 dark:text-white leading-snug">
                        {q.question}
                      </h4>
                    </div>

                    <div className="flex items-center space-x-2 shrink-0">
                      <button
                        onClick={() => handleUpdateQuestionStatus(q.question, isMastered ? 'Needs Practice' : 'Mastered')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center space-x-1.5 cursor-pointer ${
                          isMastered
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-emerald-500'
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{isMastered ? 'Mastered' : 'Mark Mastered'}</span>
                      </button>

                      <button
                        onClick={() => setExpandedQuestionIdx(isExpanded ? null : idx)}
                        className="p-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="pt-3 border-t border-slate-200 dark:border-slate-700 space-y-3 text-xs">
                      <div className="p-3 bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/40 rounded-xl text-indigo-950 dark:text-indigo-200 space-y-1">
                        <span className="font-extrabold uppercase text-[10px] text-indigo-800 dark:text-indigo-300 block">
                          Why Hiring Managers Ask This
                        </span>
                        <p>{q.whyAsked}</p>
                      </div>

                      <div className="p-3 bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/40 rounded-xl text-emerald-950 dark:text-emerald-200 space-y-1">
                        <span className="font-extrabold uppercase text-[10px] text-emerald-800 dark:text-emerald-300 block">
                          Winning STAR Strategy Formula
                        </span>
                        <p>{q.winningAnswerStrategy}</p>
                      </div>

                      <div className="space-y-1">
                        <label className="font-extrabold text-slate-700 dark:text-slate-300 uppercase text-[10px] block">
                          Personal Practice Notes & Bullet Points:
                        </label>
                        <textarea
                          rows={2}
                          placeholder="Record your personal STAR scenario, metrics, and key takeaways..."
                          defaultValue={userNotes}
                          onBlur={(e) => handleUpdateQuestionStatus(q.question, isMastered ? 'Mastered' : 'Needs Practice', e.target.value)}
                          className="w-full p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-blue-600 resize-none"
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ADD CUSTOM PROJECT MODAL */}
      {isAddProjectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <form onSubmit={handleCreateCustomProject} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center space-x-2">
                <FolderGit2 className="w-5 h-5 text-blue-600" />
                <span>Add Custom Portfolio Project</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsAddProjectModalOpen(false)}
                className="text-xs font-bold text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Project Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Distributed Real-time Stream Analytics Engine"
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Difficulty</label>
                  <select
                    value={newProject.difficulty}
                    onChange={(e) => setNewProject({ ...newProject, difficulty: e.target.value as any })}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white outline-none"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Est. Hours</label>
                  <input
                    type="text"
                    value={newProject.estimatedHours}
                    onChange={(e) => setNewProject({ ...newProject, estimatedHours: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Tech Stack (comma separated)</label>
                <input
                  type="text"
                  value={newProject.techStack.join(', ')}
                  onChange={(e) => setNewProject({ ...newProject, techStack: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setIsAddProjectModalOpen(false)}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
              >
                Save Project
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ADD CUSTOM JOB MODAL */}
      {isAddJobModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <form onSubmit={handleCreateCustomJob} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center space-x-2">
                <Briefcase className="w-5 h-5 text-blue-600" />
                <span>Track New Job Opening</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsAddJobModalOpen(false)}
                className="text-xs font-bold text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Company Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. OpenAI / Stripe"
                    value={newJob.companyName}
                    onChange={(e) => setNewJob({ ...newJob, companyName: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Job Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Staff Full Stack Engineer"
                    value={newJob.jobTitle}
                    onChange={(e) => setNewJob({ ...newJob, jobTitle: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Location</label>
                  <input
                    type="text"
                    value={newJob.location}
                    onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Estimated Salary</label>
                  <input
                    type="text"
                    value={newJob.salaryEstimate}
                    onChange={(e) => setNewJob({ ...newJob, salaryEstimate: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Application URL</label>
                <input
                  type="text"
                  value={newJob.applyUrl}
                  onChange={(e) => setNewJob({ ...newJob, applyUrl: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setIsAddJobModalOpen(false)}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
              >
                Track Job
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
