import React from 'react';
import { 
  ArrowLeft,
  Award,
  Sparkles, 
  Linkedin, 
  Github, 
  Instagram,
  Mail, 
  MapPin, 
  GraduationCap, 
  Code2, 
  Cpu, 
  Globe, 
  ShieldCheck, 
  Zap, 
  Brain, 
  Send, 
  CheckCircle2, 
  ExternalLink,
  Target,
  Terminal,
  BookOpen,
  Briefcase
} from 'lucide-react';
import { CareerPlusLogo } from './CareerPlusLogo';

interface FounderViewProps {
  returnTo?: string;
  onNavigateBack: () => void;
  onNavigateTab?: (tab: string) => void;
}

const TAB_NAME_MAP: Record<string, string> = {
  input: 'Home / Resume Analyzer',
  jobs: 'Jobs & Projects',
  chat: 'AI Career Coach',
  reviews: 'Reviews & Feedback',
  about: 'About CAREER PLUS+',
  profile: 'My Profile & Reports',
  admin: 'Super Admin Portal',
  'voice-interview': 'Live Voice & Video Interview',
  mock: 'Mock Interview Room',
  interview: 'Interview Prep Questions',
  interviewer: 'Interviewer Assessment',
  flashcards: 'Interview Flashcards',
  'community-hub': 'Alumni Peer Network',
  builder: 'Interactive Resume Builder',
  ats: 'ATS Optimization',
  bullets: 'Bullet Rewrite Studio',
  portfolio: 'AI Web Portfolio Generator',
  cover: 'Cover Letter Generator',
  skills: 'Skill Gap Matrix',
  'skill-challenges': 'Skill Badges & Challenges',
  linkedin: 'LinkedIn Optimizer',
  career: 'Career Pathways',
  salary: 'Salary Calculator',
  'offer-evaluator': 'Offer & Equity Evaluator',
  tracker: 'Job Tracker CRM',
  extension: 'Job Tracker Extension',
  auth: 'Sign In / Register',
};

export const FounderView: React.FC<FounderViewProps> = ({
  returnTo = 'input',
  onNavigateBack,
  onNavigateTab,
}) => {
  const returnPageName = TAB_NAME_MAP[returnTo] || 'Previous Page';
  const founderImageUrl = "https://i.postimg.cc/Z5G0BnZL/Generated-Image-September-14-2025-8-37AM-090126.png";

  const coreInnovations = [
    {
      title: 'Real-Time Neural ATS Parsing Engine',
      category: 'Core AI Architecture',
      desc: 'Engineered sub-50ms tokenization and entity extraction algorithms that benchmark candidate resumes against recruiter filtering models with 98.4% scoring parity.',
      icon: Cpu,
      badge: 'Patented Workflow',
    },
    {
      title: 'Live Voice & Video Interview Simulator',
      category: 'Computer Vision & Audio ML',
      desc: 'Integrated real-time speech prosody, filler word tracking, eye contact analysis, and technical answer scoring for realistic behavioral and coding interviews.',
      icon: Zap,
      badge: 'Multimodal AI',
    },
    {
      title: 'Google XYZ Bullet Rewrite Matrix',
      category: 'NLP & Executive Copywriting',
      desc: 'Architected automated conversion of passive resume statements into metric-driven "Accomplished [X], as measured by [Y], by doing [Z]" bullet points.',
      icon: Code2,
      badge: 'High Impact',
    },
    {
      title: 'Instant AI Developer Portfolio Engine',
      category: 'Full-Stack Web Generation',
      desc: 'Created dynamic portfolio generation from parsed resume structures with live responsive previews, code syntax highlighting, and downloadable source packages.',
      icon: Globe,
      badge: 'Developer Tooling',
    },
    {
      title: 'Interactive Skill Gap & Challenge Matrix',
      category: 'Candidate Verification',
      desc: 'Formulated visual skill radar benchmarking against live market roles paired with verified technical badges and timed assessments.',
      icon: Target,
      badge: 'Skill Verification',
    },
    {
      title: 'Total Compensation & Equity Modeler',
      category: 'Fintech & Career Strategy',
      desc: 'Built comparative salary, 4-year stock equity vesting schedules, and cost-of-living calculators to empower candidates during offer negotiations.',
      icon: Award,
      badge: 'Comp Intelligence',
    },
  ];

  const technicalProficiencies = [
    {
      category: 'Machine Learning & AI',
      skills: ['PyTorch', 'TensorFlow', 'LLM Prompt Engineering', 'Computer Vision (OpenCV)', 'Speech Analysis', 'NLP Tokenization', 'Hugging Face'],
    },
    {
      category: 'Frontend & Full-Stack',
      skills: ['React 18+', 'TypeScript', 'Tailwind CSS', 'Next.js / Vite', 'Node.js', 'Express', 'State Management'],
    },
    {
      category: 'Cloud, Data & Architecture',
      skills: ['Cloud Run / Containerization', 'RESTful & Real-time APIs', 'PostgreSQL / SQL', 'Distributed Microservices', 'CI/CD Pipelines'],
    },
  ];

  const milestones = [
    {
      year: '2024 - 2025',
      title: 'Ideation & AI Engine Research',
      desc: 'Conducted deep research on recruiter screening algorithms, applicant tracking heuristics, and LLM-assisted evaluation frameworks to build the initial CAREER PLUS+ core.',
    },
    {
      year: '2025 - 2026',
      title: 'Full Multimodal Suite Release',
      desc: 'Expanded CAREER PLUS+ into an end-to-end career suite featuring 18+ intelligence modules, real-time voice/video simulations, and automated portfolio synthesis.',
    },
    {
      year: 'Vision & Future',
      title: 'Autonomous Career Agents & Global Reach',
      desc: 'Leading research on proactive job application agents, automated technical portfolio hosting, and peer-to-peer recruiter verification networks.',
    },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16 animate-in fade-in duration-200">
      
      {/* TOP NAVIGATION BACK BAR */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-3.5 sm:px-5 sm:py-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs">
        <button
          type="button"
          onClick={onNavigateBack}
          className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/80 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-xs font-extrabold transition-all cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover:-translate-x-1 transition-transform" />
          <span>Return to {returnPageName}</span>
        </button>

        <div className="flex items-center space-x-2 text-[11px] font-bold text-slate-500 dark:text-slate-400">
          <span>Viewing:</span>
          <span className="px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300 font-extrabold flex items-center space-x-1">
            <Award className="w-3 h-3 text-amber-600" />
            <span>Founder Spotlight Profile</span>
          </span>
        </div>
      </div>

      {/* EXECUTIVE FOUNDER HERO CARD */}
      <div className="relative rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-6 sm:p-10 text-white overflow-hidden shadow-2xl border border-slate-800">
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 bottom-0 w-72 h-72 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
          
          {/* Founder Portrait Image with Elegant Border Framing */}
          <div className="relative group shrink-0">
            <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-3xl overflow-hidden border-4 border-white/20 dark:border-slate-700/60 shadow-2xl bg-slate-800">
              <img
                src={founderImageUrl}
                alt="Siddartha Jamandla - Founder of CAREER PLUS+"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
            </div>
          </div>

          {/* Core Founder Biography Details */}
          <div className="flex-1 text-center md:text-left space-y-4">
            
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-extrabold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Founder & Chief AI Systems Architect</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                Siddartha Jamandla
              </h1>

              <p className="text-sm sm:text-base font-bold text-blue-300">
                Artificial Intelligence & Machine Learning (AIML) Engineer
              </p>
            </div>

            {/* Location & Academic Credentials */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-slate-300 font-medium pt-1">
              <div className="flex items-center space-x-1.5">
                <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
                <span>Hyderabad, Telangana, India — 500013</span>
              </div>

              <div className="flex items-center space-x-1.5">
                <GraduationCap className="w-4 h-4 text-blue-400 shrink-0" />
                <span>B.Tech in AIML Engineering</span>
              </div>

              <div className="flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Creator of CAREER PLUS+</span>
              </div>
            </div>

            {/* Quick Action Contact Links */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 pt-3">
              <a
                href="mailto:jamandlasiddartha@gmail.com"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center space-x-1.5 cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>jamandlasiddartha@gmail.com</span>
              </a>

              <a
                href="https://www.linkedin.com/in/siddartha-jamandla-97350b384?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold text-xs rounded-xl transition-all border border-slate-700 flex items-center space-x-1.5 cursor-pointer"
              >
                <Linkedin className="w-4 h-4 text-blue-400" />
                <span>LinkedIn Profile</span>
                <ExternalLink className="w-3 h-3 text-slate-400 ml-0.5" />
              </a>

              <a
                href="https://www.instagram.com/ya.its_me_21?igsh=MXJibWtwb2V0bnA1dw==&utm_source=ig_contact_invite"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-gradient-to-r from-pink-600 via-rose-600 to-amber-600 hover:from-pink-500 hover:via-rose-500 hover:to-amber-500 text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center space-x-1.5 cursor-pointer"
              >
                <Instagram className="w-4 h-4 text-white" />
                <span>Instagram Profile</span>
                <ExternalLink className="w-3 h-3 text-white/80 ml-0.5" />
              </a>

              <a
                href="https://github.com/Siddartha-Jamandla"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold text-xs rounded-xl transition-all border border-slate-700 flex items-center space-x-1.5 cursor-pointer"
              >
                <Github className="w-4 h-4 text-purple-300" />
                <span>GitHub Portfolio</span>
                <ExternalLink className="w-3 h-3 text-slate-400 ml-0.5" />
              </a>
            </div>

          </div>

        </div>
      </div>

      {/* FOUNDER'S VISION & PURPOSE */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center space-x-2 text-xs font-black uppercase text-blue-600 dark:text-blue-400 tracking-wider">
          <Brain className="w-4 h-4" />
          <span>Founder's Vision & Mission Statement</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
          "Democratizing Executive-Grade Career Intelligence for Every Ambitious Candidate"
        </h2>

        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          I conceived and built <strong>CAREER PLUS+</strong> to solve a fundamental imbalance in the modern recruitment ecosystem. Job seekers are frequently screened out by opaque Applicant Tracking Systems (ATS) or struggle with interview anxiety without ever receiving constructive feedback.
        </p>

        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          By bringing together real-time natural language processing, computer-vision assisted speech and posture tracking, and personalized career roadmaps into one cohesive platform, CAREER PLUS+ gives candidates the exact strategic advantage needed to land top-tier tech roles and maximize compensation.
        </p>

        <div className="p-4 bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 rounded-2xl">
          <blockquote className="text-xs sm:text-sm italic text-slate-700 dark:text-slate-300 font-medium">
            "As an AIML engineering student, my core passion is turning cutting-edge artificial intelligence models into practical, empowering software tools that tangibly elevate people's lives and careers."
          </blockquote>
          <div className="mt-2 text-right text-xs font-bold text-slate-900 dark:text-white">
            — Siddartha Jamandla, Founder
          </div>
        </div>
      </div>

      {/* KEY ARCHITECTURAL INNOVATIONS BUILT BY SIDDARTHA */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs font-black uppercase text-blue-600 dark:text-blue-400 tracking-wider">
            <Zap className="w-4 h-4 text-amber-500" />
            <span>Platform Innovations & Core Systems Architected</span>
          </div>
          <span className="text-[11px] font-bold text-slate-400">18+ Integrated Modules</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {coreInnovations.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs hover:shadow-md transition-all space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-bold rounded-md uppercase">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-sm font-black text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.desc}
                </p>

                <div className="pt-1 text-[10px] font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                  {item.category}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* TECHNICAL PROFICIENCIES & STACK */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center space-x-2 text-xs font-black uppercase text-blue-600 dark:text-blue-400 tracking-wider">
          <Terminal className="w-4 h-4 text-purple-500" />
          <span>Technical Stack & Engineering Disciplines</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {technicalProficiencies.map((group, idx) => (
            <div key={idx} className="p-4 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-3">
              <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
                {group.category}
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {group.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-2 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-[11px] font-semibold rounded-lg"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FOUNDER'S JOURNEY TIMELINE & ROADMAP */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center space-x-2 text-xs font-black uppercase text-blue-600 dark:text-blue-400 tracking-wider">
          <BookOpen className="w-4 h-4 text-emerald-500" />
          <span>Journey Milestones & Innovation Roadmap</span>
        </div>

        <div className="space-y-4">
          {milestones.map((m, idx) => (
            <div key={idx} className="flex items-start space-x-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800">
              <div className="px-2.5 py-1 rounded-lg bg-blue-600 text-white font-mono text-[10px] font-bold shrink-0 mt-0.5">
                {m.year}
              </div>
              <div className="space-y-1">
                <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">
                  {m.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {m.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DIRECT CONNECT & CONTACT BANNER */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white border border-blue-800 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <span className="text-amber-300 text-xs font-extrabold uppercase tracking-wider flex items-center justify-center sm:justify-start space-x-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Collaboration & Inquiries</span>
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            Connect Directly with Siddartha
          </h3>
          <p className="text-xs text-slate-300 max-w-md">
            Interested in partnership opportunities, tech talks, or platform suggestions? Reach out directly via email or LinkedIn.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row flex-wrap gap-2.5 shrink-0 w-full sm:w-auto">
          <a
            href="mailto:jamandlasiddartha@gmail.com"
            className="px-4 py-2.5 bg-white text-slate-900 hover:bg-slate-100 font-extrabold text-xs rounded-xl transition-all shadow-md flex items-center justify-center space-x-1.5 cursor-pointer"
          >
            <Mail className="w-4 h-4 text-blue-600" />
            <span>Send Email</span>
          </a>
          <a
            href="https://www.linkedin.com/in/siddartha-jamandla-97350b384?utm_source=share_via&utm_content=profile&utm_medium=member_android"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl transition-all shadow-md flex items-center justify-center space-x-1.5 cursor-pointer border border-blue-400/40"
          >
            <Linkedin className="w-4 h-4 text-white" />
            <span>LinkedIn</span>
          </a>
          <a
            href="https://www.instagram.com/ya.its_me_21?igsh=MXJibWtwb2V0bnA1dw==&utm_source=ig_contact_invite"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2.5 bg-gradient-to-r from-pink-600 via-rose-600 to-amber-600 hover:from-pink-500 hover:via-rose-500 hover:to-amber-500 text-white font-extrabold text-xs rounded-xl transition-all shadow-md flex items-center justify-center space-x-1.5 cursor-pointer"
          >
            <Instagram className="w-4 h-4 text-white" />
            <span>Instagram</span>
          </a>
          <a
            href="https://github.com/Siddartha-Jamandla"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs rounded-xl transition-all shadow-md flex items-center justify-center space-x-1.5 cursor-pointer border border-slate-700"
          >
            <Github className="w-4 h-4 text-purple-300" />
            <span>GitHub</span>
          </a>
        </div>
      </div>

      {/* BOTTOM RETURN NAVIGATION BUTTON */}
      <div className="text-center pt-2">
        <button
          type="button"
          onClick={onNavigateBack}
          className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white text-xs font-black transition-all shadow-md cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 text-blue-400 group-hover:-translate-x-1 transition-transform" />
          <span>Return to {returnPageName}</span>
        </button>
      </div>

    </div>
  );
};
