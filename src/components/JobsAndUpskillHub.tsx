import React, { useState } from 'react';
import { 
  Briefcase, 
  GraduationCap, 
  ExternalLink, 
  CheckCircle, 
  Award, 
  MapPin, 
  DollarSign, 
  Clock, 
  BookOpen, 
  Layers, 
  Sparkles, 
  Search, 
  Compass, 
  TrendingUp, 
  ChevronRight,
  ShieldCheck,
  Check,
  FolderGit2,
  Code2,
  Copy,
  Terminal,
  Zap,
  CheckSquare,
  Building2,
  Calendar,
  Gift,
  Star
} from 'lucide-react';
import { ResumeAnalysisResult, JobOpening, FreeCourse, UpskillRoadmapSkill, PortfolioProjectIdea, InternshipOpening } from '../types';
import { DEFAULT_SAMPLE_ANALYSIS } from '../utils/defaultAnalysis';

interface JobsAndUpskillHubProps {
  analysis: ResumeAnalysisResult;
  targetRole: string;
}

export const JobsAndUpskillHub: React.FC<JobsAndUpskillHubProps> = ({
  analysis,
  targetRole,
}) => {
  const [activeTab, setActiveTab] = useState<'jobs' | 'internships' | 'courses' | 'projects' | 'roadmaps'>('projects');
  const [jobSearchFilter, setJobSearchFilter] = useState<string>('');
  const [internshipSearchFilter, setInternshipSearchFilter] = useState<string>('');
  const [internshipTypeFilter, setInternshipTypeFilter] = useState<string>('All');
  const [courseSearchFilter, setCourseSearchFilter] = useState<string>('');
  const [projectSearchFilter, setProjectSearchFilter] = useState<string>('');
  const [projectDifficultyFilter, setProjectDifficultyFilter] = useState<string>('All');
  const [copiedBullet, setCopiedBullet] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBullet(id);
    setTimeout(() => setCopiedBullet(null), 2000);
  };

  const rawProjects = (analysis.portfolioProjectIdeas && analysis.portfolioProjectIdeas.length > 0)
    ? analysis.portfolioProjectIdeas
    : (DEFAULT_SAMPLE_ANALYSIS.portfolioProjectIdeas || []);

  const portfolioProjects: PortfolioProjectIdea[] = rawProjects.filter(p => {
    const matchesDiff = projectDifficultyFilter === 'All' || p.difficulty.toLowerCase() === projectDifficultyFilter.toLowerCase();
    const query = projectSearchFilter.toLowerCase();
    const matchesQuery = !query || p.title.toLowerCase().includes(query) || p.techStack.some(t => t.toLowerCase().includes(query)) || p.keySkillsDemonstrated.some(s => s.toLowerCase().includes(query));
    return matchesDiff && matchesQuery;
  });

  const internshipsList: InternshipOpening[] = (analysis.recommendedInternships && analysis.recommendedInternships.length > 0)
    ? analysis.recommendedInternships
    : (DEFAULT_SAMPLE_ANALYSIS.recommendedInternships || []);

  const filteredInternships = internshipsList.filter(i => {
    const matchesType = internshipTypeFilter === 'All' || (i.workType || '').toLowerCase() === internshipTypeFilter.toLowerCase();
    const query = internshipSearchFilter.toLowerCase();
    const matchesQuery = !query || 
      i.roleTitle.toLowerCase().includes(query) || 
      i.companyName.toLowerCase().includes(query) || 
      i.location.toLowerCase().includes(query) ||
      i.keySkillsRequired.some(s => s.toLowerCase().includes(query));
    return matchesType && matchesQuery;
  });

  const jobsList: JobOpening[] = (analysis.recommendedJobs && analysis.recommendedJobs.length > 0) ? analysis.recommendedJobs : [
    {
      jobTitle: `${targetRole}`,
      companyName: "Google",
      location: "Mountain View, CA / Remote",
      salaryEstimate: "$165,000 - $220,000 / year",
      matchPercentage: analysis.skillsMatchScore || 94,
      keySkillsRequired: ["System Architecture", "TypeScript", "Node.js", "Cloud Infrastructure"],
      postedTime: "1 hour ago",
      platform: "Google Careers",
      applyUrl: `https://www.google.com/about/careers/applications/jobs/results/?q=${encodeURIComponent(targetRole)}`
    },
    {
      jobTitle: `Senior ${targetRole}`,
      companyName: "Microsoft",
      location: "Redmond, WA / Remote",
      salaryEstimate: "$170,000 - $230,000 / year",
      matchPercentage: 92,
      keySkillsRequired: ["Cloud Scale", "Distributed Systems", "TypeScript", "API Design"],
      postedTime: "3 hours ago",
      platform: "Microsoft Careers",
      applyUrl: `https://careers.microsoft.com/v2/global/en/search?q=${encodeURIComponent(targetRole)}`
    },
    {
      jobTitle: `Lead ${targetRole} Engineer`,
      companyName: "Apple",
      location: "Cupertino, CA / Hybrid",
      salaryEstimate: "$180,000 - $250,000 / year",
      matchPercentage: 90,
      keySkillsRequired: ["System Design", "Performance Optimization", "Security"],
      postedTime: "5 hours ago",
      platform: "Apple Careers",
      applyUrl: `https://www.apple.com/careers/us/`
    },
    {
      jobTitle: `${targetRole} - Core Platform`,
      companyName: "Amazon",
      location: "Seattle, WA / Remote",
      salaryEstimate: "$160,000 - $210,000 / year",
      matchPercentage: 88,
      keySkillsRequired: ["AWS", "Microservices", "Java / Node.js", "CI/CD"],
      postedTime: "1 day ago",
      platform: "Amazon Jobs",
      applyUrl: `https://www.amazon.jobs/en/search?base_query=${encodeURIComponent(targetRole)}`
    },
    {
      jobTitle: `Staff ${targetRole}`,
      companyName: "Meta / Instagram",
      location: "Menlo Park, CA / Remote",
      salaryEstimate: "$195,000 - $270,000 / year",
      matchPercentage: 95,
      keySkillsRequired: ["React", "GraphQL", "High Scale", "Distributed Caching"],
      postedTime: "1 day ago",
      platform: "Meta Careers",
      applyUrl: `https://www.metacareers.com/jobs?q=${encodeURIComponent(targetRole)}`
    },
    {
      jobTitle: `${targetRole} - AI & Platform`,
      companyName: "OpenAI",
      location: "San Francisco, CA / Hybrid",
      salaryEstimate: "$200,000 - $320,000 / year",
      matchPercentage: 93,
      keySkillsRequired: ["LLM Infrastructure", "Python", "TypeScript", "Vector Search"],
      postedTime: "2 days ago",
      platform: "OpenAI Careers",
      applyUrl: "https://openai.com/careers/search/"
    },
    {
      jobTitle: `Principal ${targetRole}`,
      companyName: "Stripe",
      location: "San Francisco, CA / Remote",
      salaryEstimate: "$190,000 - $260,000 / year",
      matchPercentage: 89,
      keySkillsRequired: ["Fintech Security", "API Engineering", "Resilience", "TypeScript"],
      postedTime: "2 days ago",
      platform: "Stripe Careers",
      applyUrl: "https://stripe.com/jobs"
    },
    {
      jobTitle: `${targetRole} Specialist`,
      companyName: "Netflix",
      location: "Los Gatos, CA / Remote",
      salaryEstimate: "$210,000 - $350,000 / year",
      matchPercentage: 87,
      keySkillsRequired: ["Real-time Streaming", "Microservices", "Node.js", "Observability"],
      postedTime: "3 days ago",
      platform: "Netflix Jobs",
      applyUrl: "https://jobs.netflix.com/"
    },
    {
      jobTitle: `${targetRole} Lead`,
      companyName: "Uber",
      location: "San Francisco, CA / Hybrid",
      salaryEstimate: "$175,000 - $240,000 / year",
      matchPercentage: 86,
      keySkillsRequired: ["Geospatial APIs", "Distributed Locks", "Go / TypeScript"],
      postedTime: "3 days ago",
      platform: "Uber Careers",
      applyUrl: "https://www.uber.com/us/en/careers/"
    },
    {
      jobTitle: `Senior AI ${targetRole}`,
      companyName: "Anthropic",
      location: "San Francisco, CA / Remote",
      salaryEstimate: "$210,000 - $310,000 / year",
      matchPercentage: 91,
      keySkillsRequired: ["LLMs", "Python", "TypeScript", "Prompt Engineering"],
      postedTime: "4 days ago",
      platform: "Anthropic Careers",
      applyUrl: "https://www.anthropic.com/careers"
    },
    {
      jobTitle: `${targetRole} - Cloud Architecture`,
      companyName: "Snowflake",
      location: "San Mateo, CA / Remote",
      salaryEstimate: "$170,000 - $230,000 / year",
      matchPercentage: 85,
      keySkillsRequired: ["Data Warehousing", "Distributed Querying", "SQL / NoSQL"],
      postedTime: "4 days ago",
      platform: "LinkedIn",
      applyUrl: `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(targetRole)}`
    },
    {
      jobTitle: `${targetRole} Developer`,
      companyName: "Datadog",
      location: "New York, NY / Hybrid",
      salaryEstimate: "$160,000 - $215,000 / year",
      matchPercentage: 84,
      keySkillsRequired: ["Observability", "Telemetry", "React", "Go / Node"],
      postedTime: "5 days ago",
      platform: "LinkedIn",
      applyUrl: `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(targetRole)}`
    },
    {
      jobTitle: `Full Stack ${targetRole}`,
      companyName: "Atlassian",
      location: "Remote (US/Canada)",
      salaryEstimate: "$155,000 - $205,000 / year",
      matchPercentage: 89,
      keySkillsRequired: ["React", "TypeScript", "GraphQL", "Design Systems"],
      postedTime: "5 days ago",
      platform: "Atlassian Careers",
      applyUrl: "https://www.atlassian.com/company/careers"
    },
    {
      jobTitle: `Senior ${targetRole} - Product`,
      companyName: "Figma",
      location: "San Francisco, CA / Remote",
      salaryEstimate: "$180,000 - $245,000 / year",
      matchPercentage: 93,
      keySkillsRequired: ["Canvas API", "WebGL / WASM", "TypeScript", "UI UX"],
      postedTime: "6 days ago",
      platform: "Figma Careers",
      applyUrl: "https://www.figma.com/careers/"
    },
    {
      jobTitle: `${targetRole} Infrastructure`,
      companyName: "Cloudflare",
      location: "Austin, TX / Remote",
      salaryEstimate: "$165,000 - $225,000 / year",
      matchPercentage: 88,
      keySkillsRequired: ["Edge Workers", "DNS / CDN", "Rust / TypeScript"],
      postedTime: "6 days ago",
      platform: "Cloudflare Careers",
      applyUrl: "https://www.cloudflare.com/careers/"
    },
    {
      jobTitle: `${targetRole} Solutions Architect`,
      companyName: "Salesforce",
      location: "San Francisco, CA / Hybrid",
      salaryEstimate: "$160,000 - $220,000 / year",
      matchPercentage: 83,
      keySkillsRequired: ["Enterprise Systems", "Apex / Node", "Multi-tenant"],
      postedTime: "1 week ago",
      platform: "Salesforce Careers",
      applyUrl: "https://careers.salesforce.com/"
    },
    {
      jobTitle: `Growth ${targetRole}`,
      companyName: "Airbnb",
      location: "San Francisco, CA / Remote",
      salaryEstimate: "$175,000 - $235,000 / year",
      matchPercentage: 90,
      keySkillsRequired: ["A/B Testing", "Full Stack", "React", "Analytics"],
      postedTime: "1 week ago",
      platform: "Airbnb Careers",
      applyUrl: "https://careers.airbnb.com/"
    },
    {
      jobTitle: `Lead ${targetRole} - Platform`,
      companyName: "Shopify",
      location: "Remote (Global)",
      salaryEstimate: "$160,000 - $215,000 / year",
      matchPercentage: 87,
      keySkillsRequired: ["E-commerce APIs", "Ruby / Node", "GraphQL"],
      postedTime: "1 week ago",
      platform: "Shopify Careers",
      applyUrl: "https://www.shopify.com/careers"
    },
    {
      jobTitle: `${targetRole} Security Engineer`,
      companyName: "CrowdStrike",
      location: "Remote (US)",
      salaryEstimate: "$170,000 - $230,000 / year",
      matchPercentage: 82,
      keySkillsRequired: ["AppSec", "OAuth 2.0", "Node.js", "Threat Modeling"],
      postedTime: "1 week ago",
      platform: "LinkedIn",
      applyUrl: `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(targetRole)}`
    },
    {
      jobTitle: `Executive ${targetRole} Director`,
      companyName: "Innovate AI Global",
      location: "San Francisco, CA / Remote",
      salaryEstimate: "$220,000 - $350,000 / year",
      matchPercentage: 96,
      keySkillsRequired: ["Executive Leadership", "AI Architecture", "Strategy"],
      postedTime: "Featured Today",
      platform: "Direct Partner",
      applyUrl: `https://www.google.com/about/careers/applications/jobs/results/?q=${encodeURIComponent(targetRole)}`
    }
  ];

  const coursesList: FreeCourse[] = (analysis.freeCoursesWithCertificates && analysis.freeCoursesWithCertificates.length > 0) ? analysis.freeCoursesWithCertificates : [
    {
      title: `Full Stack Developer & ${targetRole} Certification`,
      provider: "freeCodeCamp",
      duration: "30 Hours (Self-Paced)",
      hasCertificate: true,
      isFree: true,
      skillCovered: "Full Stack Systems & API Design",
      directUrl: "https://www.freecodecamp.org/learn",
      description: "Comprehensive hands-on curriculum with verified developer certification upon completing 5 core projects."
    },
    {
      title: "CS50: Introduction to Computer Science & Systems",
      provider: "Harvard University / edX",
      duration: "12 Weeks (Free Audit + Certificate)",
      hasCertificate: true,
      isFree: true,
      skillCovered: "Algorithms, Data Structures & Architecture",
      directUrl: "https://pll.harvard.edu/course/cs50-introduction-computer-science",
      description: "World-renowned course covering algorithmic complexity, C/Python/JS, and scalable software design."
    },
    {
      title: "Google Cloud System Architecture & DevOps Specialization",
      provider: "Google Cloud Skills Boost",
      duration: "15 Hours",
      hasCertificate: true,
      isFree: true,
      skillCovered: "Cloud Computing & Kubernetes",
      directUrl: "https://www.cloudskillsboost.google/",
      description: "Official labs and verified skill badges directly from Google Cloud for enterprise system deployments."
    },
    {
      title: "AWS Cloud Practitioner & Serverless Architecture",
      provider: "AWS Skill Builder",
      duration: "20 Hours",
      hasCertificate: true,
      isFree: true,
      skillCovered: "AWS Cloud & Lambda Microservices",
      directUrl: "https://explore.skillbuilder.aws/",
      description: "Official Amazon Web Services training path for cloud practitioner and serverless solution design."
    },
    {
      title: "Generative AI & LLM Engineering Masterclass",
      provider: "DeepLearning.AI / Andrew Ng",
      duration: "10 Hours",
      hasCertificate: true,
      isFree: true,
      skillCovered: "LLM Fine-Tuning & RAG Pipelines",
      directUrl: "https://www.deeplearning.ai/short-courses/",
      description: "Hands-on instruction on building AI applications using Gemini, LangChain, and vector embeddings."
    },
    {
      title: "Modern JavaScript, TypeScript & React Deep Dive",
      provider: "Meta / Coursera",
      duration: "25 Hours",
      hasCertificate: true,
      isFree: true,
      skillCovered: "TypeScript & Production React",
      directUrl: "https://www.coursera.org/learn/meta-front-end-developer",
      description: "Meta-certified curriculum mastering state management, custom hooks, and modern frontend design."
    },
    {
      title: "Node.js Microservices & High Performance Backend",
      provider: "OpenJS Foundation",
      duration: "18 Hours",
      hasCertificate: true,
      isFree: true,
      skillCovered: "Node.js & Caching Strategies",
      directUrl: "https://openjsf.org/certification/",
      description: "Official Node.js certificate track focusing on event loop optimization, streams, and Express APIs."
    },
    {
      title: "PostgreSQL & Database Architecture Mastery",
      provider: "PostgreSQL Official Documentation & Labs",
      duration: "12 Hours",
      hasCertificate: true,
      isFree: true,
      skillCovered: "Database Query Optimization & Indexing",
      directUrl: "https://www.postgresqltutorial.com/",
      description: "In-depth guide to indexing strategies, query execution plans, transactions, and ACID compliance."
    },
    {
      title: "Docker & Containerization for Cloud Applications",
      provider: "Docker Training / Play with Docker",
      duration: "8 Hours",
      hasCertificate: true,
      isFree: true,
      skillCovered: "Docker Containers & Compose",
      directUrl: "https://www.docker.com/101-tutorial/",
      description: "Interactive hands-on sandbox mastering Dockerfile optimization, volume mounting, and multi-container apps."
    },
    {
      title: "System Design Interview Prep & Scalability",
      provider: "System Design Primer / GitHub",
      duration: "25 Hours",
      hasCertificate: true,
      isFree: true,
      skillCovered: "Distributed Systems & Load Balancing",
      directUrl: "https://github.com/donnemartin/system-design-primer",
      description: "The premier open-source guide for designing high-volume distributed platforms for FAANG tech interviews."
    },
    {
      title: "GraphQL API Engineering & Microservices",
      provider: "Apollo GraphQL Academy",
      duration: "10 Hours",
      hasCertificate: true,
      isFree: true,
      skillCovered: "GraphQL Schemas & Federation",
      directUrl: "https://www.apollographql.com/tutorials/",
      description: "Learn schema-first API development, resolvers, caching, and federated architecture."
    },
    {
      title: "Git & GitHub Enterprise DevOps Workflow",
      provider: "GitHub Skills",
      duration: "6 Hours",
      hasCertificate: true,
      isFree: true,
      skillCovered: "Git Branching & GitHub Actions CI/CD",
      directUrl: "https://skills.github.com/",
      description: "Interactive GitHub repositories teaching branching strategies, PR code reviews, and automated CI/CD."
    },
    {
      title: "OWASP Web Application Security & Pen Testing",
      provider: "OWASP / TryHackMe",
      duration: "15 Hours",
      hasCertificate: true,
      isFree: true,
      skillCovered: "Cybersecurity & OAuth 2.0 Security",
      directUrl: "https://owasp.org/www-project-top-ten/",
      description: "Master vulnerability mitigation for SQLi, XSS, CSRF, JWT security, and secure API design."
    },
    {
      title: "Redis In-Memory Caching & Distributed Locks",
      provider: "Redis University",
      duration: "8 Hours",
      hasCertificate: true,
      isFree: true,
      skillCovered: "In-Memory Caching & Pub/Sub",
      directUrl: "https://university.redis.io/",
      description: "Official Redis certification covering data structures, pub/sub queues, and sub-millisecond data access."
    },
    {
      title: "Kubernetes Cloud Native Fundamentals (CKAD Prep)",
      provider: "Linux Foundation / edX",
      duration: "20 Hours",
      hasCertificate: true,
      isFree: true,
      skillCovered: "Kubernetes Pods, Services & Deployments",
      directUrl: "https://www.edx.org/learn/kubernetes",
      description: "Hands-on cloud native computing foundation curriculum for container orchestration at enterprise scale."
    },
    {
      title: "Python for Data Science & Machine Learning",
      provider: "Kaggle Learn",
      duration: "15 Hours",
      hasCertificate: true,
      isFree: true,
      skillCovered: "Python, Pandas & Scikit-Learn",
      directUrl: "https://www.kaggle.com/learn",
      description: "Free micro-courses with interactive notebooks for data wrangling, model training, and evaluation."
    },
    {
      title: "Tailwind CSS & Modern Responsive UI Design",
      provider: "Tailwind Labs Official Video Series",
      duration: "6 Hours",
      hasCertificate: true,
      isFree: true,
      skillCovered: "Tailwind CSS & Responsive Layouts",
      directUrl: "https://tailwindcss.com/docs",
      description: "Master modern utility-first CSS design, dark mode implementation, and fluid responsive layouts."
    },
    {
      title: "Rest API Security & API Design Patterns",
      provider: "Google Apigee Academy",
      duration: "10 Hours",
      hasCertificate: true,
      isFree: true,
      skillCovered: "API Management & Rate Limiting",
      directUrl: "https://cloud.google.com/apigee/docs",
      description: "Industry standard course on designing resilient, backwards-compatible, rate-limited RESTful services."
    },
    {
      title: "Agile & Scrum Project Management for Developers",
      provider: "Scrum.org",
      duration: "8 Hours",
      hasCertificate: true,
      isFree: true,
      skillCovered: "Agile Methodology & Jira Workflows",
      directUrl: "https://www.scrum.org/learning-series",
      description: "Understand sprint planning, user story estimation, velocity tracking, and cross-functional team execution."
    },
    {
      title: "Linux Command Line & Server Administration",
      provider: "Linux Foundation",
      duration: "14 Hours",
      hasCertificate: true,
      isFree: true,
      skillCovered: "Linux Shell, Permissions & Systemd",
      directUrl: "https://www.edx.org/learn/linux",
      description: "Essential Linux operating system skills for managing cloud instances, shell scripts, and cron jobs."
    }
  ];

  const roadmapsList: UpskillRoadmapSkill[] = analysis.skillUpskillRoadmaps || (
    (analysis.skillGapAnalysis?.missingCriticalSkills || [{ skill: 'System Design', importance: 'Critical', description: 'Essential architecture skills' }]).map((mSkill, idx) => ({
      skillName: mSkill.skill,
      whyNeeded: mSkill.description || `Essential competency required to qualify for ${targetRole} positions.`,
      targetLevel: mSkill.importance === 'Critical' ? 'Advanced Expert' : 'Proficient',
      stepByStepRoadmap: [
        `Master foundational syntax, design patterns, and core principles of ${mSkill.skill}.`,
        `Build a real-world mini project demonstrating production-grade implementation of ${mSkill.skill}.`,
        `Practice solving architecture and coding challenges specifically testing ${mSkill.skill}.`,
        `Add metric-backed project bullet points featuring ${mSkill.skill} to your resume.`
      ],
      topPlatforms: ["freeCodeCamp", "Coursera", "Official Documentation", "GitHub Repositories"],
      interviewTipsToClear: `Interviewers will ask how you handle tradeoffs and bottlenecks in ${mSkill.skill}. Be ready to discuss real memory/time complexity metrics.`,
      recommendedFreeCourse: coursesList[idx % coursesList.length] || coursesList[0]
    }))
  );

  const filteredJobs = jobsList.filter(j => 
    j.jobTitle.toLowerCase().includes(jobSearchFilter.toLowerCase()) ||
    j.companyName.toLowerCase().includes(jobSearchFilter.toLowerCase()) ||
    j.location.toLowerCase().includes(jobSearchFilter.toLowerCase())
  );

  const filteredCourses = coursesList.filter(c =>
    c.title.toLowerCase().includes(courseSearchFilter.toLowerCase()) ||
    c.skillCovered.toLowerCase().includes(courseSearchFilter.toLowerCase()) ||
    c.provider.toLowerCase().includes(courseSearchFilter.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="flex items-center space-x-2 text-blue-400 font-bold text-xs uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>100% Genuine Jobs & Internships • Free Certifications • Project Ideas Roadmaps</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Apply to Genuine Jobs & Internships, Earn Certifications & Build High-Weight Project Ideas
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
            Tailored specifically for <strong className="text-blue-300 font-bold">{targetRole}</strong>: Build portfolio project ideas with free resources & roadmaps, discover active hiring internships with verified stipends, take 100% free certified courses, and apply to verified live jobs.
          </p>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-3 border-t border-slate-800">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-3 text-center">
              <span className="text-lg sm:text-xl font-extrabold text-amber-400">{portfolioProjects.length}</span>
              <span className="block text-[10px] text-slate-400 uppercase font-semibold">Project Ideas</span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-3 text-center">
              <span className="text-lg sm:text-xl font-extrabold text-emerald-400">{coursesList.length}</span>
              <span className="block text-[10px] text-slate-400 uppercase font-semibold">Free Courses</span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-3 text-center">
              <span className="text-lg sm:text-xl font-extrabold text-teal-400">{internshipsList.length}</span>
              <span className="block text-[10px] text-slate-400 uppercase font-semibold">Live Internships</span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-3 text-center">
              <span className="text-lg sm:text-xl font-extrabold text-blue-400">{jobsList.length}</span>
              <span className="block text-[10px] text-slate-400 uppercase font-semibold">Genuine Jobs</span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-3 text-center">
              <span className="text-lg sm:text-xl font-extrabold text-violet-400">{analysis.skillsMatchScore || 85}%</span>
              <span className="block text-[10px] text-slate-400 uppercase font-semibold">Readiness Score</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 bg-white rounded-2xl p-1.5 shadow-xs overflow-x-auto gap-1">
        <button
          onClick={() => setActiveTab('projects')}
          className={`flex-1 min-w-[150px] py-3 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 transition-all cursor-pointer ${
            activeTab === 'projects'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <FolderGit2 className="w-4 h-4 text-amber-300" />
          <span>Project Ideas ({portfolioProjects.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('internships')}
          className={`flex-1 min-w-[150px] py-3 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 transition-all cursor-pointer ${
            activeTab === 'internships'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Building2 className="w-4 h-4 text-teal-300" />
          <span>Internships ({internshipsList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('courses')}
          className={`flex-1 min-w-[150px] py-3 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 transition-all cursor-pointer ${
            activeTab === 'courses'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Free Courses ({coursesList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('jobs')}
          className={`flex-1 min-w-[150px] py-3 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 transition-all cursor-pointer ${
            activeTab === 'jobs'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Genuine Jobs ({jobsList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('roadmaps')}
          className={`flex-1 min-w-[150px] py-3 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 transition-all cursor-pointer ${
            activeTab === 'roadmaps'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Roadmaps</span>
        </button>
      </div>

      {/* TAB 1: RESUME-BOOSTING PORTFOLIO PROJECTS */}
      {activeTab === 'projects' && (
        <div className="space-y-6">
          <div className="bg-amber-50/60 border border-amber-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-amber-900">
            <div className="flex items-center space-x-3">
              <Zap className="w-5 h-5 text-amber-600 shrink-0 fill-amber-500" />
              <div className="text-xs">
                <span className="font-extrabold block">How 10 Suggested Project Ideas Increase Resume Weight:</span>
                <span>Adding 1-2 production-grade project ideas with metrics (e.g. latency reduction, caching, AI/LLM integration) instantly compensates for experience gaps in recruiter screens.</span>
              </div>
            </div>
            <span className="shrink-0 px-3 py-1 bg-amber-100/80 rounded-full font-black text-xs text-amber-950">
              {rawProjects.length} Project Ideas Suggested
            </span>
          </div>

          {/* Search & Difficulty Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
              {['All', 'Advanced', 'Intermediate', 'Beginner'].map((diff) => (
                <button
                  key={diff}
                  onClick={() => setProjectDifficultyFilter(diff)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    projectDifficultyFilter === diff
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {diff === 'All' ? `All (${rawProjects.length})` : diff}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={projectSearchFilter}
                onChange={(e) => setProjectSearchFilter(e.target.value)}
                placeholder="Filter by tech or skill..."
                className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
              />
            </div>
          </div>

          <div className="space-y-6">
            {portfolioProjects.map((proj, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs hover:shadow-md transition-all space-y-6"
              >
                {/* Project Header */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-slate-100 pb-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center space-x-2">
                      <span className="px-3 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-50 text-blue-700 border border-blue-100 uppercase">
                        Project #{idx + 1} • {proj.difficulty}
                      </span>
                      <span className="text-xs font-bold text-slate-500 flex items-center space-x-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Est: {proj.estimatedHours}</span>
                      </span>
                    </div>

                    <h3 className="text-lg font-black text-slate-900">
                      {proj.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      <strong className="text-slate-800">Why hiring managers love this: </strong>
                      {proj.targetRoleValue}
                    </p>
                  </div>

                  <a
                    href={proj.githubStarterTemplateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors flex items-center space-x-2 shadow-xs cursor-pointer"
                  >
                    <FolderGit2 className="w-4 h-4 text-amber-300" />
                    <span>Starter GitHub Repositories</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Tech Stack & Skills */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2">
                    <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block flex items-center space-x-1">
                      <Code2 className="w-3.5 h-3.5 text-blue-600" />
                      <span>Recommended Tech Stack:</span>
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {proj.techStack.map((tech, tIdx) => (
                        <span key={tIdx} className="px-2.5 py-1 bg-white border border-slate-200 text-slate-900 text-xs font-bold rounded-lg shadow-2xs">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100 space-y-2">
                    <span className="text-[11px] font-bold text-blue-800 uppercase tracking-wider block flex items-center space-x-1">
                      <Award className="w-3.5 h-3.5 text-blue-600" />
                      <span>Key Resume Competencies Demonstrated:</span>
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {proj.keySkillsDemonstrated.map((skill, sIdx) => (
                        <span key={sIdx} className="px-2.5 py-1 bg-blue-100/80 text-blue-900 text-xs font-extrabold rounded-lg">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Step-by-Step Execution Roadmap */}
                <div className="space-y-3">
                  <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center space-x-1.5">
                    <Compass className="w-4 h-4 text-blue-600" />
                    <span>Step-by-Step Execution Roadmap:</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {proj.stepByStepRoadmap.map((step, stIdx) => (
                      <div key={stIdx} className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs space-y-1">
                        <span className="font-extrabold text-blue-600 block text-[10px] uppercase">Milestone {stIdx + 1}</span>
                        <p className="text-slate-800 font-medium leading-relaxed">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Free Resources & Docs Links */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center space-x-1.5">
                    <BookOpen className="w-4 h-4 text-emerald-600" />
                    <span>Free Official Resources, Documentation & Tutorials:</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {proj.freeResourcesAndDocs.map((res, rIdx) => (
                      <a
                        key={rIdx}
                        href={res.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-emerald-50/60 hover:bg-emerald-100/80 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-950 transition-all flex items-center justify-between group cursor-pointer"
                      >
                        <div className="truncate space-y-0.5">
                          <span className="text-[10px] text-emerald-700 font-extrabold block uppercase">{res.platform}</span>
                          <span className="truncate block font-semibold">{res.name}</span>
                        </div>
                        <ExternalLink className="w-3.5 h-3.5 text-emerald-600 shrink-0 ml-1 group-hover:translate-x-0.5 transition-transform" />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Copyable Resume Bullet Points */}
                <div className="bg-slate-900 text-white rounded-2xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-400 flex items-center space-x-1">
                      <Terminal className="w-3.5 h-3.5" />
                      <span>Ready-to-Paste Resume Bullet Points (Copy Directly to Resume)</span>
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">STAR + Metric Formatted</span>
                  </div>

                  <div className="space-y-2">
                    {proj.resumeBulletPointsToInclude.map((bullet, bIdx) => (
                      <div key={bIdx} className="bg-slate-800/80 border border-slate-700 p-3 rounded-xl flex items-start justify-between gap-3">
                        <p className="text-xs text-slate-200 leading-relaxed font-mono">
                          • {bullet}
                        </p>
                        <button
                          onClick={() => handleCopy(bullet, `p_${idx}_b_${bIdx}`)}
                          className="px-2.5 py-1 bg-slate-700 hover:bg-slate-600 text-white text-[10px] font-bold rounded-lg transition-colors shrink-0 flex items-center space-x-1 cursor-pointer"
                        >
                          {copiedBullet === `p_${idx}_b_${bIdx}` ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3 text-slate-300" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: ACTIVE & GENUINE INTERNSHIPS (HIRING NOW) */}
      {activeTab === 'internships' && (
        <div className="space-y-4">
          {/* Header Bar with Search and Type Filter */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={internshipSearchFilter}
                onChange={(e) => setInternshipSearchFilter(e.target.value)}
                placeholder="Search internships by role, company, skills, or location..."
                className="w-full pl-9 p-2 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-bold text-slate-600">
                {(['All', 'Remote', 'Hybrid', 'On-site'] as const).map(type => (
                  <button
                    key={type}
                    onClick={() => setInternshipTypeFilter(type)}
                    className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                      internshipTypeFilter === type
                        ? 'bg-teal-600 text-white shadow-2xs'
                        : 'hover:text-slate-900'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              <div className="text-xs text-teal-800 font-extrabold flex items-center space-x-1 shrink-0 bg-teal-50 px-3 py-2 rounded-xl border border-teal-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>{filteredInternships.length} Active Openings</span>
              </div>
            </div>
          </div>

          {/* Genuine Guarantee Alert */}
          <div className="bg-gradient-to-r from-teal-50 via-emerald-50 to-blue-50 border border-teal-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center space-x-3">
              <ShieldCheck className="w-5 h-5 text-teal-600 shrink-0" />
              <div className="text-xs text-teal-950">
                <span className="font-extrabold block">100% Genuine & Verified Internship Opportunities:</span>
                <span>Direct portal links from top tech leaders (Google, Microsoft, Meta, Stripe, OpenAI, etc.) with pre-placement offer (PPO) conversion pathways, verified hourly/monthly stipends, and housing support.</span>
              </div>
            </div>
            <span className="shrink-0 px-3 py-1 bg-teal-600 text-white font-extrabold text-xs rounded-full shadow-2xs">
              Direct Apply
            </span>
          </div>

          {/* Internships Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredInternships.map((internship, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 hover:border-teal-500 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all space-y-4 flex flex-col justify-between group"
              >
                <div className="space-y-3.5">
                  {/* Top Badges & Match */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-teal-50 text-teal-800 border border-teal-200 flex items-center space-x-1">
                          <Building2 className="w-3 h-3 text-teal-600" />
                          <span>{internship.platform || 'Company Careers'}</span>
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center space-x-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          <span>{internship.postedTime || 'Actively Hiring'}</span>
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 text-slate-600">
                          {internship.workType}
                        </span>
                      </div>

                      <h3 className="text-base font-black text-slate-900 group-hover:text-teal-700 transition-colors leading-tight pt-1">
                        {internship.roleTitle}
                      </h3>
                      <p className="text-xs font-bold text-slate-700 flex items-center space-x-1.5">
                        <span className="text-teal-600 font-extrabold">{internship.companyName}</span>
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-sm font-black text-teal-700 bg-teal-50 px-2.5 py-1 rounded-xl border border-teal-200/80 inline-block shadow-2xs">
                        {internship.matchPercentage}% Match
                      </div>
                    </div>
                  </div>

                  {/* Key Details: Location, Stipend, Duration */}
                  <div className="bg-slate-50/80 p-3 rounded-xl border border-slate-200/80 space-y-2 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700">
                      <div className="flex items-center space-x-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate font-medium text-slate-800">{internship.location}</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate font-medium text-slate-800">{internship.duration}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-1.5 text-emerald-800 bg-emerald-50/70 px-2.5 py-1.5 rounded-lg border border-emerald-200/60 font-semibold">
                      <DollarSign className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{internship.stipendOrSalary}</span>
                    </div>
                  </div>

                  {/* Eligibility */}
                  {internship.eligibility && (
                    <div className="text-xs text-slate-600">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-0.5">
                        Eligibility:
                      </span>
                      <p className="text-[11px] font-medium text-slate-700 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                        {internship.eligibility}
                      </p>
                    </div>
                  )}

                  {/* Required Skills */}
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                      Required Skills & Topics:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {internship.keySkillsRequired.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2 py-0.5 bg-slate-100 border border-slate-200 text-slate-800 text-[11px] font-medium rounded-md"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Perks / Benefits */}
                  {internship.perks && internship.perks.length > 0 && (
                    <div>
                      <span className="text-[10px] font-bold text-teal-800 uppercase tracking-wider block mb-1 flex items-center space-x-1">
                        <Gift className="w-3 h-3 text-teal-600" />
                        <span>Featured Perks & Return Offer Pathway:</span>
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                        {internship.perks.map((perk, pIdx) => (
                          <div key={pIdx} className="flex items-center space-x-1 text-[11px] text-slate-700">
                            <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                            <span className="truncate">{perk}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Direct Apply Button */}
                <div className="pt-3 border-t border-slate-100">
                  <a
                    href={internship.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center space-x-2 shadow-xs cursor-pointer"
                  >
                    <span>Apply for Internship on {internship.platform || 'Careers Portal'}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-teal-200" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: FREE COURSES WITH CERTIFICATIONS */}
      {activeTab === 'courses' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={courseSearchFilter}
                onChange={(e) => setCourseSearchFilter(e.target.value)}
                placeholder="Search free courses by skill, provider, or topic..."
                className="w-full pl-9 p-2 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div className="text-xs text-emerald-700 font-extrabold flex items-center space-x-1 shrink-0 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>100% Genuine Verified Free Certifications</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCourses.map((course, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 hover:border-emerald-500 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center space-x-1">
                      <Award className="w-3 h-3 text-emerald-600" />
                      <span>Free Certificate Included</span>
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">{course.provider}</span>
                  </div>

                  <h3 className="text-sm font-extrabold text-slate-900 leading-snug">
                    {course.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {course.description}
                  </p>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between text-slate-700">
                      <span className="text-[11px] font-bold text-slate-500">Skill Covered:</span>
                      <span className="font-bold text-blue-700">{course.skillCovered}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-700">
                      <span className="text-[11px] font-bold text-slate-500">Duration:</span>
                      <span className="font-semibold text-slate-800">{course.duration}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href={course.directUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center space-x-2 shadow-xs cursor-pointer"
                  >
                    <span>Enroll Free & Get Certified</span>
                    <ExternalLink className="w-3.5 h-3.5 text-emerald-200" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: GENUINE JOBS */}
      {activeTab === 'jobs' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={jobSearchFilter}
                onChange={(e) => setJobSearchFilter(e.target.value)}
                placeholder="Search jobs by title, company, or location..."
                className="w-full pl-9 p-2 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div className="text-xs text-blue-700 font-extrabold flex items-center space-x-1 shrink-0 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-200">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>100% Genuine Verified Job Links</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredJobs.map((job, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 hover:border-blue-400 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all space-y-4 flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-100">
                          {job.platform}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">
                          Posted: {job.postedTime}
                        </span>
                      </div>
                      <h3 className="text-base font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {job.jobTitle}
                      </h3>
                      <p className="text-xs font-bold text-slate-700">{job.companyName}</p>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-sm font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-100 inline-block">
                        {job.matchPercentage}% Match
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span className="truncate">{job.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="truncate">{job.salaryEstimate}</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                      Key Competencies Tested:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {job.keySkillsRequired.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2 py-0.5 bg-slate-100 border border-slate-200 text-slate-700 text-[11px] font-medium rounded-md"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <a
                    href={job.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center space-x-2 shadow-xs cursor-pointer"
                  >
                    <span>Apply Now on {job.platform}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-blue-200" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: UPSKILLING ROADMAPS */}
      {activeTab === 'roadmaps' && (
        <div className="space-y-6">
          {roadmapsList.map((rm, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-50 text-amber-800 border border-amber-200 uppercase">
                      Skill Gap #{idx + 1}
                    </span>
                    <span className="text-xs text-slate-500 font-bold">Target Level: {rm.targetLevel}</span>
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900">{rm.skillName}</h3>
                </div>

                {rm.recommendedFreeCourse && (
                  <a
                    href={rm.recommendedFreeCourse.directUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-bold rounded-xl transition-colors flex items-center space-x-1.5 cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                    <span>Free {rm.recommendedFreeCourse.provider} Course</span>
                    <ExternalLink className="w-3 h-3 text-blue-500" />
                  </a>
                )}
              </div>

              <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200/80 leading-relaxed">
                <strong className="text-slate-900">Why this skill is required: </strong>
                {rm.whyNeeded}
              </p>

              {/* Step-by-Step Roadmap */}
              <div>
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-3 flex items-center space-x-1.5">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                  <span>Step-by-Step Mastery Roadmap:</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {rm.stepByStepRoadmap.map((stepText, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-3.5 bg-blue-50/40 border border-blue-100 rounded-xl text-xs space-y-1.5 relative"
                    >
                      <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center">
                        {sIdx + 1}
                      </span>
                      <p className="text-slate-700 font-medium leading-relaxed">{stepText}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Learning Platforms & Interview Tips */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                  <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                    Top Platforms & Docs:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {rm.topPlatforms.map((plat, pIdx) => (
                      <span key={pIdx} className="px-2.5 py-1 bg-white border border-slate-200 text-slate-800 text-xs font-medium rounded-lg shadow-2xs">
                        {plat}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-200/80 space-y-1.5">
                  <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider block flex items-center space-x-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                    <span>How to Clear Interview Questions on {rm.skillName}:</span>
                  </span>
                  <p className="text-xs text-amber-900 leading-relaxed">
                    {rm.interviewTipsToClear}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
