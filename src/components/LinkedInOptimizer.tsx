import React, { useState } from 'react';
import {
  Share2,
  Sparkles,
  Copy,
  Check,
  RefreshCw,
  UserCheck,
  MessageSquare,
  Award,
  ExternalLink,
  Zap,
  Image,
  Calendar,
  BarChart3,
  Globe,
  PenTool,
  Download,
  Terminal,
  Send,
  Sliders,
  CheckCircle2,
  Bookmark
} from 'lucide-react';
import { ResumeAnalysisResult, LinkedInProfileResult } from '../types';

interface LinkedInOptimizerProps {
  analysis: ResumeAnalysisResult;
  targetRole: string;
}

interface GeneratedPostResult {
  hookHeadline: string;
  postText: string;
  hashtags: string[];
  bannerGraphic: {
    bannerTitle: string;
    bannerSubtitle: string;
    visualTheme: 'dark-cyber' | 'gradient-blue' | 'minimal-white' | 'tech-purple';
    featuredBadges: string[];
    codeSnippetOrQuote?: string;
  };
  engagementMetrics: {
    estimatedReachScore: number;
    recommendedPostTime: string;
    targetAudience: string;
  };
}

export const LinkedInOptimizer: React.FC<LinkedInOptimizerProps> = ({
  analysis,
  targetRole,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'post-generator'>('post-generator');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [profile, setProfile] = useState<LinkedInProfileResult | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Candidate Branding Default Details
  const candidateName = analysis?.extractedDetails?.candidateName || 'J Siddartha';
  const candidateRole = analysis?.extractedDetails?.currentRole || targetRole || 'Senior Full-Stack Engineer & AI Developer';

  // LinkedIn Post Generator State
  const [linkedinUrl, setLinkedinUrl] = useState<string>('https://linkedin.com/in/jsiddartha');
  const [postType, setPostType] = useState<string>('Project Showcase & Technical Deep Dive');
  const [topic, setTopic] = useState<string>('Architecting a high-throughput AI Career Intelligence Engine with sub-50ms latency using React, Node.js & Redis');
  const [tone, setTone] = useState<string>('Inspiring, Technical, and Professional');
  const [isGeneratingPost, setIsGeneratingPost] = useState<boolean>(false);
  const [generatedPost, setGeneratedPost] = useState<GeneratedPostResult | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<'dark-cyber' | 'gradient-blue' | 'minimal-white' | 'tech-purple'>('dark-cyber');

  const handleGenerateProfile = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/generate-linkedin-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetRole,
          resumeDetails: {
            ...analysis?.extractedDetails,
            candidateName,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate LinkedIn profile optimization.');
      }

      const data = await response.json();
      setProfile(data);
    } catch (err: any) {
      console.error(err);
      alert('Error generating LinkedIn profile: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGeneratePost = async () => {
    setIsGeneratingPost(true);
    try {
      const response = await fetch('/api/generate-linkedin-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postType,
          topic,
          authorName: candidateName,
          authorRole: candidateRole,
          linkedinUrl,
          resumeDetails: analysis?.extractedDetails,
          tone,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate LinkedIn post.');
      }

      const data = await response.json();
      setGeneratedPost(data);
      if (data.bannerGraphic?.visualTheme) {
        setSelectedTheme(data.bannerGraphic.visualTheme as any);
      }
    } catch (err: any) {
      console.error(err);
      alert('Error generating post: ' + err.message);
    } finally {
      setIsGeneratingPost(false);
    }
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Sub-Tabs Navigation */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-blue-600 text-xs font-bold uppercase tracking-wider mb-1">
            <Share2 className="w-4 h-4" />
            <span>LinkedIn Executive Studio & Personal Branding</span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            LinkedIn Post Generator & Profile Optimizer
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Build viral LinkedIn posts with AI-generated visual graphics, hashtag strategy, and recruiter search optimization for <strong className="text-slate-900">{candidateName}</strong>.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl shrink-0">
          <button
            onClick={() => setActiveTab('post-generator')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center space-x-1.5 cursor-pointer ${
              activeTab === 'post-generator'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <PenTool className="w-3.5 h-3.5" />
            <span>Post & Visual Banner Generator</span>
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center space-x-1.5 cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Profile & Recruiter SEO</span>
          </button>
        </div>
      </div>

      {activeTab === 'post-generator' ? (
        <div className="space-y-6">
          {/* Post Generation Controls Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-blue-600" />
                <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                  Reference LinkedIn Account & Content Objective
                </h3>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                Active Profile: {candidateName}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  LinkedIn Profile URL / Handle
                </label>
                <input
                  type="text"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  placeholder="https://linkedin.com/in/jsiddartha"
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Post Objective / Type
                </label>
                <select
                  value={postType}
                  onChange={(e) => setPostType(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Project Showcase & Technical Deep Dive">🚀 Project Showcase & Tech Architecture</option>
                  <option value="Thought Leadership & Lessons Learned">💡 Thought Leadership & Lessons Learned</option>
                  <option value="Career Milestone & Promotion">🎉 Career Milestone & Promotion</option>
                  <option value="Technical Code Breakdown">🛠️ Technical Code & Design Walkthrough</option>
                  <option value="Hiring & Open to Work Announcement">🔍 Hiring / Open to Work Announcement</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Tone & Personal Voice
                </label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Inspiring, Technical, and Professional">Inspiring, Technical & Professional</option>
                  <option value="Metric-Driven & Direct">Metric-Driven & Direct Executive</option>
                  <option value="Conversational Tech Storyteller">Conversational Tech Storyteller</option>
                  <option value="Bold & Visionary">Bold & Visionary Industry Perspective</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Specific Topic, Project, or Metric to Feature
              </label>
              <textarea
                rows={2}
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Describe your project, latency improvements, team milestones, or technical lessons..."
                className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              onClick={handleGeneratePost}
              disabled={isGeneratingPost}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs sm:text-sm rounded-xl transition-all shadow-xs flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
            >
              {isGeneratingPost ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-blue-200" />
                  <span>Generating Post Copy & AI Visual Graphic...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Generate LinkedIn Post & Custom Visual Graphic</span>
                </>
              )}
            </button>
          </div>

          {/* Generated LinkedIn Post Display Section */}
          {generatedPost ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: LinkedIn Post Text Preview */}
              <div className="lg:col-span-6 space-y-4">
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-extrabold flex items-center justify-center text-xs">
                        {candidateName.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">{candidateName}</h4>
                        <p className="text-[10px] text-slate-500">{candidateRole}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleCopy(`${generatedPost.hookHeadline}\n\n${generatedPost.postText}\n\n${generatedPost.hashtags.join(' ')}`, 'full_post')}
                      className="px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold text-xs rounded-lg transition-colors flex items-center space-x-1 cursor-pointer"
                    >
                      {copiedKey === 'full_post' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey === 'full_post' ? 'Copied Full Post' : 'Copy Post Text'}</span>
                    </button>
                  </div>

                  {/* Scroll-Stopping Hook */}
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl">
                    <span className="text-[10px] font-black text-amber-800 uppercase block mb-1">
                      🔥 Scroll-Stopping Hook Line
                    </span>
                    <p className="text-xs font-bold text-slate-900">
                      {generatedPost.hookHeadline}
                    </p>
                  </div>

                  {/* Post Body */}
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 leading-relaxed whitespace-pre-line font-normal">
                    {generatedPost.postText}
                  </div>

                  {/* Hashtags */}
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 block mb-1 uppercase">Recommended Hashtags</span>
                    <div className="flex flex-wrap gap-1.5">
                      {generatedPost.hashtags.map((tag, idx) => (
                        <span key={idx} className="px-2.5 py-1 bg-blue-50 text-blue-800 text-[11px] font-bold rounded-md">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Quick Share to LinkedIn */}
                  <a
                    href="https://www.linkedin.com/feed/"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center space-x-2 text-center block"
                  >
                    <span>Open LinkedIn & Paste Post</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Algorithm Reach & Timing Predictor */}
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
                  <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center space-x-2">
                    <BarChart3 className="w-4 h-4 text-emerald-600" />
                    <span>Algorithm Reach & Engagement Predictor</span>
                  </h4>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="bg-emerald-50 border border-emerald-100 p-2.5 rounded-xl">
                      <span className="text-[10px] font-bold text-emerald-700 uppercase block">Reach Potential</span>
                      <span className="text-base font-extrabold text-emerald-900">{generatedPost.engagementMetrics.estimatedReachScore}%</span>
                    </div>
                    <div className="bg-blue-50 border border-blue-100 p-2.5 rounded-xl">
                      <span className="text-[10px] font-bold text-blue-700 uppercase block">Best Time</span>
                      <span className="text-xs font-bold text-blue-900 leading-snug">{generatedPost.engagementMetrics.recommendedPostTime}</span>
                    </div>
                    <div className="bg-purple-50 border border-purple-100 p-2.5 rounded-xl">
                      <span className="text-[10px] font-bold text-purple-700 uppercase block">Target Demographic</span>
                      <span className="text-[11px] font-bold text-purple-900 leading-snug">{generatedPost.engagementMetrics.targetAudience}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive Visual Banner Graphic Canvas */}
              <div className="lg:col-span-6 space-y-4">
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center space-x-2">
                      <Image className="w-4 h-4 text-purple-600" />
                      <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                        Accompanying Visual Banner Graphic
                      </h4>
                    </div>

                    {/* Theme Switcher */}
                    <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-lg">
                      <button
                        onClick={() => setSelectedTheme('dark-cyber')}
                        className={`px-2 py-0.5 text-[10px] font-bold rounded ${selectedTheme === 'dark-cyber' ? 'bg-slate-900 text-white' : 'text-slate-600'}`}
                      >
                        Cyber
                      </button>
                      <button
                        onClick={() => setSelectedTheme('gradient-blue')}
                        className={`px-2 py-0.5 text-[10px] font-bold rounded ${selectedTheme === 'gradient-blue' ? 'bg-blue-600 text-white' : 'text-slate-600'}`}
                      >
                        Blue
                      </button>
                      <button
                        onClick={() => setSelectedTheme('tech-purple')}
                        className={`px-2 py-0.5 text-[10px] font-bold rounded ${selectedTheme === 'tech-purple' ? 'bg-purple-600 text-white' : 'text-slate-600'}`}
                      >
                        Purple
                      </button>
                      <button
                        onClick={() => setSelectedTheme('minimal-white')}
                        className={`px-2 py-0.5 text-[10px] font-bold rounded ${selectedTheme === 'minimal-white' ? 'bg-slate-200 text-slate-900' : 'text-slate-600'}`}
                      >
                        Light
                      </button>
                    </div>
                  </div>

                  {/* Rendered Visual Graphic Canvas Container */}
                  <div
                    id="linkedin-banner-canvas"
                    className={`rounded-2xl p-6 md:p-8 aspect-16/9 flex flex-col justify-between transition-all shadow-md relative overflow-hidden ${
                      selectedTheme === 'dark-cyber'
                        ? 'bg-slate-950 text-white border border-slate-800'
                        : selectedTheme === 'gradient-blue'
                        ? 'bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 text-white'
                        : selectedTheme === 'tech-purple'
                        ? 'bg-gradient-to-br from-purple-950 via-slate-900 to-indigo-950 text-white'
                        : 'bg-slate-50 text-slate-900 border border-slate-300'
                    }`}
                  >
                    {/* Background Decorative Accents */}
                    <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

                    {/* Banner Top Header */}
                    <div className="flex items-center justify-between relative z-10">
                      <div className="flex items-center space-x-2">
                        <div className="w-7 h-7 rounded-full bg-blue-500 text-white font-black text-xs flex items-center justify-center">
                          {candidateName.charAt(0)}
                        </div>
                        <span className="font-extrabold text-xs tracking-tight">
                          {candidateName}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-widest opacity-75 px-2.5 py-1 rounded-full border border-current">
                        {candidateRole.split('&')[0]}
                      </span>
                    </div>

                    {/* Banner Content Body */}
                    <div className="my-4 space-y-2 relative z-10">
                      <h3 className="text-lg md:text-xl font-black tracking-tight leading-tight">
                        {generatedPost.bannerGraphic.bannerTitle}
                      </h3>
                      <p className={`text-xs md:text-sm font-medium leading-normal ${selectedTheme === 'minimal-white' ? 'text-slate-600' : 'text-slate-300'}`}>
                        {generatedPost.bannerGraphic.bannerSubtitle}
                      </p>

                      {generatedPost.bannerGraphic.codeSnippetOrQuote && (
                        <div className={`mt-3 p-2.5 rounded-lg text-[11px] font-mono leading-relaxed border ${
                          selectedTheme === 'minimal-white'
                            ? 'bg-slate-200 border-slate-300 text-slate-800'
                            : 'bg-slate-900/80 border-slate-800 text-amber-300'
                        }`}>
                          <code>{generatedPost.bannerGraphic.codeSnippetOrQuote}</code>
                        </div>
                      )}
                    </div>

                    {/* Banner Bottom Badges */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-current/15 relative z-10">
                      <div className="flex flex-wrap gap-1.5">
                        {generatedPost.bannerGraphic.featuredBadges.map((badge, idx) => (
                          <span
                            key={idx}
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              selectedTheme === 'minimal-white'
                                ? 'bg-blue-100 text-blue-900'
                                : 'bg-white/10 text-white backdrop-blur-xs'
                            }`}
                          >
                            {badge}
                          </span>
                        ))}
                      </div>

                      <span className="text-[10px] font-bold opacity-60">
                        {linkedinUrl.replace('https://', '')}
                      </span>
                    </div>
                  </div>

                  {/* Download / Copy Visual Graphic Controls */}
                  <div className="flex items-center space-x-2 pt-2">
                    <button
                      onClick={() => handleCopy(`Banner Title: ${generatedPost.bannerGraphic.bannerTitle}\nSubtitle: ${generatedPost.bannerGraphic.bannerSubtitle}\nAuthor: ${candidateName}`, 'banner_meta')}
                      className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors flex items-center justify-center space-x-1 cursor-pointer"
                    >
                      {copiedKey === 'banner_meta' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey === 'banner_meta' ? 'Copied Specs' : 'Copy Graphic Specs'}</span>
                    </button>

                    <button
                      onClick={() => alert(`Visual graphic for "${candidateName}" is generated and styled! You can take a screenshot of the card or use it directly on LinkedIn.`)}
                      className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl transition-colors flex items-center space-x-1.5 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Ready for Post</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 border border-dashed border-slate-300 rounded-2xl p-10 text-center space-y-3">
              <PenTool className="w-10 h-10 text-slate-400 mx-auto" />
              <h4 className="font-bold text-slate-700 text-sm">AI LinkedIn Post Studio Ready</h4>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Customize your topic and click "Generate LinkedIn Post & Custom Visual Graphic" above to build a viral-ready post with copy, hashtags, and an accompanying branded visual graphic.
              </p>
            </div>
          )}
        </div>
      ) : (
        /* Profile SEO & Recruiter Optimization Tab */
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
                Recruiter Search & Profile Headline Optimizer
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Generate high-converting headlines, first-person "About" bio, and direct recruiter networking icebreakers.
              </p>
            </div>
            <button
              onClick={handleGenerateProfile}
              disabled={isLoading}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-full transition-all shadow-xs flex items-center space-x-2 shrink-0 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-blue-200" />
                  <span>Optimizing Profile with AI...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Generate Profile Strategy</span>
                </>
              )}
            </button>
          </div>

          {profile ? (
            <div className="space-y-6">
              {/* Headlines Card */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider text-xs border-b border-slate-100 pb-2 flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span>Recommended High-Converting Headlines for {candidateName}</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-extrabold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full uppercase">
                        SEO & Recruiter Search
                      </span>
                      <p className="text-xs font-bold text-slate-800 mt-2 leading-relaxed">
                        "{profile.headlines.seoOptimized}"
                      </p>
                    </div>
                    <button
                      onClick={() => handleCopy(profile.headlines.seoOptimized, 'seo')}
                      className="w-full mt-2 py-1.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 font-bold text-xs rounded-lg transition-colors flex items-center justify-center space-x-1 cursor-pointer"
                    >
                      {copiedKey === 'seo' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey === 'seo' ? 'Copied' : 'Copy Headline'}</span>
                    </button>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-extrabold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full uppercase">
                        Impact & Leadership
                      </span>
                      <p className="text-xs font-bold text-slate-800 mt-2 leading-relaxed">
                        "{profile.headlines.impactLeader}"
                      </p>
                    </div>
                    <button
                      onClick={() => handleCopy(profile.headlines.impactLeader, 'impact')}
                      className="w-full mt-2 py-1.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 font-bold text-xs rounded-lg transition-colors flex items-center justify-center space-x-1 cursor-pointer"
                    >
                      {copiedKey === 'impact' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey === 'impact' ? 'Copied' : 'Copy Headline'}</span>
                    </button>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full uppercase">
                        Technical Depth
                      </span>
                      <p className="text-xs font-bold text-slate-800 mt-2 leading-relaxed">
                        "{profile.headlines.technicalSpecialist}"
                      </p>
                    </div>
                    <button
                      onClick={() => handleCopy(profile.headlines.technicalSpecialist, 'tech')}
                      className="w-full mt-2 py-1.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 font-bold text-xs rounded-lg transition-colors flex items-center justify-center space-x-1 cursor-pointer"
                    >
                      {copiedKey === 'tech' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey === 'tech' ? 'Copied' : 'Copy Headline'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* About Bio & Skills */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center space-x-2">
                      <UserCheck className="w-4 h-4 text-blue-600" />
                      <span>Optimized "About" Bio Section</span>
                    </h3>
                    <button
                      onClick={() => handleCopy(profile.aboutBio, 'about')}
                      className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-full transition-colors flex items-center space-x-1 cursor-pointer"
                    >
                      {copiedKey === 'about' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey === 'about' ? 'Copied Bio' : 'Copy Bio'}</span>
                    </button>
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 leading-relaxed whitespace-pre-line">
                    {profile.aboutBio}
                  </div>
                </div>

                <div className="lg:col-span-5 space-y-6">
                  {/* Top Skills for Recruiter Endorsement */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
                    <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center space-x-2">
                      <Award className="w-4 h-4 text-purple-600" />
                      <span>Top Skills to List for Algorithm Ranking</span>
                    </h3>

                    <div className="flex flex-wrap gap-1.5">
                      {profile.topSkillsToFeature.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-purple-50 border border-purple-200 text-purple-800 font-bold text-xs rounded-full shadow-2xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Featured Bullet Points */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
                    <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center space-x-2">
                      <Sparkles className="w-4 h-4 text-blue-600" />
                      <span>Featured Posts / Media Accomplishments</span>
                    </h3>

                    <ul className="space-y-2 list-disc list-inside text-xs text-slate-700 leading-relaxed">
                      {profile.featuredHighlights.map((fh, idx) => (
                        <li key={idx} className="pl-1">{fh}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Direct Recruiter Messaging Icebreakers */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
                <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center space-x-2">
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span>Direct Recruiter Networking Connection Messages</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {profile.networkingIcebreakers.map((msg, idx) => (
                    <div key={idx} className="bg-emerald-50/50 border border-emerald-200 rounded-xl p-4 space-y-3 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-extrabold text-emerald-800 uppercase block mb-1">
                          Icebreaker #{idx + 1}
                        </span>
                        <p className="text-xs text-slate-800 leading-relaxed italic">
                          "{msg}"
                        </p>
                      </div>
                      <button
                        onClick={() => handleCopy(msg, `ice_${idx}`)}
                        className="w-full mt-2 py-1.5 bg-white border border-emerald-300 text-emerald-800 hover:bg-emerald-100 font-bold text-xs rounded-lg transition-colors flex items-center justify-center space-x-1 cursor-pointer"
                      >
                        {copiedKey === `ice_${idx}` ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedKey === `ice_${idx}` ? 'Copied Note' : 'Copy Connection Note'}</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 border border-dashed border-slate-300 rounded-2xl p-12 text-center space-y-3">
              <Share2 className="w-10 h-10 text-slate-400 mx-auto" />
              <h4 className="font-bold text-slate-700 text-sm">LinkedIn Profile Strategy Ready</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Click "Generate Profile Strategy" to build tailored SEO headlines, bio copy, and recruiter outreach notes for {candidateName}.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

