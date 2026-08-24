import React, { useState } from 'react';
import {
  Users,
  MessageSquare,
  Star,
  Calendar,
  CheckCircle2,
  Sparkles,
  Award,
  Search,
  Filter,
  Send,
  Building,
  Heart,
  MessageCircle,
  Share2,
  Lock,
  DollarSign,
  Briefcase
} from 'lucide-react';

export const AlumniPeerNetwork: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'scheduler' | 'resumeswap' | 'transparency'>('scheduler');
  const [karmaPoints, setKarmaPoints] = useState(280);
  const [bookedSlot, setBookedSlot] = useState<string | null>(null);

  const mockPartners = [
    {
      id: 1,
      name: 'Sarah Chen',
      role: 'Staff Engineer @ Google',
      targetCompanies: ['Google', 'Meta', 'Apple'],
      availability: 'Today, 4:00 PM EST',
      rating: 4.9,
      reviewsCount: 34,
      karmaRequired: 50
    },
    {
      id: 2,
      name: 'Marcus Vance',
      role: 'Principal PM @ Stripe',
      targetCompanies: ['Stripe', 'Airbnb', 'Square'],
      availability: 'Tomorrow, 2:00 PM EST',
      rating: 5.0,
      reviewsCount: 48,
      karmaRequired: 60
    },
    {
      id: 3,
      name: 'Elena Rostova',
      role: 'Senior Data Scientist @ Amazon',
      targetCompanies: ['Amazon', 'Netflix', 'Uber'],
      availability: 'Thursday, 6:00 PM EST',
      rating: 4.8,
      reviewsCount: 22,
      karmaRequired: 40
    }
  ];

  const resumeSwapPosts = [
    {
      id: 'r1',
      authorAlias: 'Candidate #8942',
      targetRole: 'Senior Full-Stack Architect',
      score: 88,
      karmaReward: 25,
      commentsCount: 6,
      previewText: 'Ex-startup founding engineer with 7+ years scaling React & Node microservices. Seeking detailed critique on ATS keyword density for FAANG roles.'
    },
    {
      id: 'r2',
      authorAlias: 'Candidate #3104',
      targetRole: 'AI/ML Product Manager',
      score: 82,
      karmaReward: 30,
      commentsCount: 11,
      previewText: 'Transitioning from Senior Data Analyst to AI PM. Need feedback on bullet points quantifying business impact of LLM agent deployments.'
    }
  ];

  const cultureTransparencyPosts = [
    {
      id: 'c1',
      company: 'OpenAI',
      role: 'Member of Technical Staff',
      overallRating: 4.8,
      interviewDifficulty: 'Hard (5 rounds)',
      salaryReport: '$220k Base • $350k Equity',
      wfhPolicy: 'Flexible Hybrid (3 days in office)',
      cultureReview: 'High ownership culture. Fast-paced, research-driven environment with top-tier engineering talent.'
    },
    {
      id: 'c2',
      company: 'Stripe',
      role: 'Staff Frontend Engineer',
      overallRating: 4.9,
      interviewDifficulty: 'Moderate-Hard (Practical coding + System Design)',
      salaryReport: '$195k Base • $280k Equity',
      wfhPolicy: '100% Remote Option Available',
      cultureReview: 'Obsessive focus on code clarity and developer experience. Exceptional async documentation.'
    }
  ];

  const handleBookSession = (partnerName: string) => {
    setBookedSlot(partnerName);
    setKarmaPoints(prev => prev - 50);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* HEADER HERO */}
      <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden border border-indigo-800/40">
        <div className="absolute right-0 top-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-purple-500/20 rounded-full border border-purple-400/30 text-purple-300 text-xs font-black uppercase tracking-wider">
              <Users className="w-3.5 h-3.5 text-purple-300" />
              <span>Peer-to-Peer Career Network</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Alumni & Peer Review Community Hub
            </h1>
            <p className="text-indigo-200 text-sm max-w-2xl font-medium leading-relaxed">
              Connect with alumni and peers for anonymized mock interview practice, peer resume reviews, and verified salary & company culture insights.
            </p>
          </div>

          <div className="flex bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10 items-center space-x-3">
            <Award className="w-8 h-8 text-amber-400" />
            <div>
              <span className="text-2xl font-black text-amber-400">{karmaPoints}</span>
              <p className="text-[10px] text-indigo-200 font-bold uppercase">Community Karma Points</p>
            </div>
          </div>
        </div>
      </div>

      {/* NAVIGATION TABS */}
      <div className="flex bg-white dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm max-w-md mx-auto text-xs font-bold">
        <button
          onClick={() => setActiveTab('scheduler')}
          className={`flex-1 py-2.5 rounded-xl cursor-pointer transition-all text-center ${
            activeTab === 'scheduler' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          Mock Interview Partners
        </button>
        <button
          onClick={() => setActiveTab('resumeswap')}
          className={`flex-1 py-2.5 rounded-xl cursor-pointer transition-all text-center ${
            activeTab === 'resumeswap' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          Resume Review Swap
        </button>
        <button
          onClick={() => setActiveTab('transparency')}
          className={`flex-1 py-2.5 rounded-xl cursor-pointer transition-all text-center ${
            activeTab === 'transparency' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          Culture & Salary Insights
        </button>
      </div>

      {/* TAB 1: MOCK INTERVIEW PRACTICE SCHEDULER */}
      {activeTab === 'scheduler' && (
        <div className="space-y-6">
          {bookedSlot && (
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-xs font-bold text-emerald-900 dark:text-emerald-200 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Mock Interview Session Scheduled with {bookedSlot}! Confirmation sent to your email.</span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockPartners.map((partner) => (
              <div key={partner.id} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-black text-sm">
                      {partner.name[0]}
                    </div>
                    <div>
                      <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">{partner.name}</h3>
                      <p className="text-xs text-slate-500 font-medium">{partner.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 text-xs font-black text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{partner.rating}</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs font-medium text-slate-600 dark:text-slate-300">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-3.5 h-3.5 text-blue-500" />
                    <span>{partner.availability}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {partner.targetCompanies.map((c, i) => (
                      <span key={i} className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handleBookSession(partner.name)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-2xl text-xs font-black cursor-pointer shadow-md transition-all"
                >
                  Book Session ({partner.karmaRequired} Karma)
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: RESUME SWAP BOARD */}
      {activeTab === 'resumeswap' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resumeSwapPosts.map((post) => (
              <div key={post.id} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-wider">{post.authorAlias}</span>
                  <span className="text-xs font-bold text-amber-600 bg-amber-50 dark:bg-amber-950 px-2.5 py-1 rounded-full">+${post.karmaReward} Karma Reward</span>
                </div>

                <h3 className="text-sm font-black text-slate-900 dark:text-white">{post.targetRole}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
                  "{post.previewText}"
                </p>

                <button
                  onClick={() => alert('Opening peer review feedback sheet!')}
                  className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 text-white py-2.5 rounded-2xl text-xs font-black cursor-pointer shadow-md"
                >
                  Review Resume & Earn Karma
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: CULTURE & SALARY INSIGHTS */}
      {activeTab === 'transparency' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cultureTransparencyPosts.map((post) => (
              <div key={post.id} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-black text-slate-900 dark:text-white">{post.company}</h3>
                    <p className="text-xs text-slate-500 font-bold">{post.role}</p>
                  </div>
                  <span className="text-xs font-black text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-3 py-1.5 rounded-xl">
                    {post.salaryReport}
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                  {post.cultureReview}
                </p>

                <div className="flex items-center justify-between text-xs font-bold text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span>Interview: {post.interviewDifficulty}</span>
                  <span>{post.wfhPolicy}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
