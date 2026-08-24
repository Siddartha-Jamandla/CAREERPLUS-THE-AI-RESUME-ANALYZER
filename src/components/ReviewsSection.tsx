import React, { useState, useEffect } from 'react';
import { 
  Star, 
  MessageSquare, 
  ThumbsUp, 
  CheckCircle2, 
  Sparkles, 
  Filter, 
  Plus, 
  X, 
  Send, 
  Briefcase, 
  Award, 
  TrendingUp, 
  ShieldCheck,
  User,
  AlertCircle
} from 'lucide-react';
import { UserProfile } from '../types';

interface PlatformReview {
  id: string;
  userName: string;
  userRole: string;
  avatarUrl: string;
  rating: number;
  featureTag: string;
  title: string;
  comment: string;
  companyLanded?: string;
  isVerified: boolean;
  helpfulCount: number;
  createdAt: string;
}

interface ReviewsSectionProps {
  currentUser: UserProfile | null;
  onOpenAuthModal: () => void;
}

const FEATURE_OPTIONS = [
  'General Platform Experience',
  'ATS Resume Optimization',
  'AI Mock Interview Studio',
  'Cover Letter Generator',
  'Hiring Manager Assessment',
  'Salary Evaluator & Growth',
  'Job Tracker CRM'
];

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  currentUser,
  onOpenAuthModal,
}) => {
  const [reviews, setReviews] = useState<PlatformReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters & Sorting
  const [selectedFeature, setSelectedFeature] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'recent' | 'rating' | 'helpful'>('recent');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewerName, setReviewerName] = useState(currentUser?.name || '');
  const [reviewerRole, setReviewerRole] = useState(currentUser?.targetRole || '');
  const [rating, setRating] = useState(5);
  const [featureTag, setFeatureTag] = useState(FEATURE_OPTIONS[1]);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [companyLanded, setCompanyLanded] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  // Upvoted reviews tracker
  const [upvotedIds, setUpvotedIds] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetchReviews();
  }, []);

  useEffect(() => {
    if (currentUser) {
      if (!reviewerName) setReviewerName(currentUser.name);
      if (!reviewerRole) setReviewerRole(currentUser.targetRole);
    }
  }, [currentUser]);

  const fetchReviews = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/reviews');
      if (res.ok) {
        const data = await res.json();
        setReviews(data.reviews || []);
      }
    } catch (err) {
      console.error('Failed to load reviews:', err);
      setError('Unable to load community reviews.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpvote = async (id: string) => {
    if (upvotedIds[id]) return;

    try {
      const res = await fetch(`/api/reviews/${id}/upvote`, { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        setReviews(prev =>
          prev.map(r => r.id === id ? { ...r, helpfulCount: data.helpfulCount } : r)
        );
        setUpvotedIds(prev => ({ ...prev, [id]: true }));
      }
    } catch (err) {
      console.error('Failed to upvote review:', err);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewTitle.trim() || !reviewComment.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userName: reviewerName || 'Candidate',
          userRole: reviewerRole || 'Job Seeker',
          avatarUrl: currentUser?.avatarUrl,
          rating,
          featureTag,
          title: reviewTitle,
          comment: reviewComment,
          companyLanded: companyLanded.trim() || undefined,
        }),
      });

      const data = await res.json();
      if (res.ok && data.review) {
        setReviews(prev => [data.review, ...prev]);
        setSubmitSuccess('Thank you! Your candidate review has been published.');
        setReviewTitle('');
        setReviewComment('');
        setCompanyLanded('');
        setTimeout(() => {
          setIsModalOpen(false);
          setSubmitSuccess(null);
        }, 1500);
      } else {
        setError(data.error || 'Failed to submit review.');
      }
    } catch (err) {
      console.error('Error submitting review:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter & Sort Logic
  const filteredReviews = reviews.filter(r => {
    if (selectedFeature === 'ALL') return true;
    return r.featureTag === selectedFeature;
  });

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'helpful') return b.helpfulCount - a.helpfulCount;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  // Calculate average rating
  const totalCount = reviews.length;
  const avgRating = totalCount > 0 
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / totalCount).toFixed(1)
    : '4.9';

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in duration-300">
      
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-black bg-amber-400 text-slate-950 uppercase tracking-wider flex items-center space-x-1">
                <Star className="w-3.5 h-3.5 fill-slate-950" />
                <span>Verified Candidate Feedback</span>
              </span>
              <span className="text-xs text-slate-300 font-bold">2,480+ Landed Offers</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Platform Reviews & Feature Ratings
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Explore authentic candidate feedback on ATS resume optimization, AI voice mock interviews, cover letter drafting, and executive salary negotiations.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs rounded-2xl transition-all shadow-lg flex items-center justify-center space-x-2 cursor-pointer shrink-0 border border-blue-400/30"
          >
            <Plus className="w-4 h-4 text-amber-300" />
            <span>Write a Candidate Review</span>
          </button>
        </div>

        {/* METRICS & HIGHLIGHTS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-700/60">
          <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-4 flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shrink-0">
              <Star className="w-6 h-6 fill-amber-400" />
            </div>
            <div>
              <div className="text-2xl font-black text-white">{avgRating} <span className="text-xs text-slate-400 font-normal">/ 5.0</span></div>
              <p className="text-[11px] text-slate-300 font-medium">Overall Satisfaction</p>
            </div>
          </div>

          <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-4 flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-300 shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-black text-white">99.4%</div>
              <p className="text-[11px] text-slate-300 font-medium">ATS Formatting Pass Rate</p>
            </div>
          </div>

          <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-4 flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 shrink-0">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-black text-white">+3.8x</div>
              <p className="text-[11px] text-slate-300 font-medium">More Interview Callbacks</p>
            </div>
          </div>

          <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-4 flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-400/40 flex items-center justify-center text-purple-300 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-black text-white">100%</div>
              <p className="text-[11px] text-slate-300 font-medium">Verified User Privacy</p>
            </div>
          </div>
        </div>
      </div>

      {/* FILTER AND SORT BAR */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 shadow-xs">
        {/* Feature Filter Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          <span className="text-xs font-black uppercase text-slate-400 flex items-center space-x-1 shrink-0">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter:</span>
          </span>

          <button
            onClick={() => setSelectedFeature('ALL')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
              selectedFeature === 'ALL'
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            All Features ({reviews.length})
          </button>

          {FEATURE_OPTIONS.map((feat) => {
            const count = reviews.filter(r => r.featureTag === feat).length;
            return (
              <button
                key={feat}
                onClick={() => setSelectedFeature(feat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                  selectedFeature === feat
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {feat} {count > 0 && `(${count})`}
              </button>
            );
          })}
        </div>

        {/* Sorting selector */}
        <div className="flex items-center space-x-2 shrink-0 border-t md:border-t-0 pt-2 md:pt-0 border-slate-100">
          <span className="text-xs font-bold text-slate-500">Sort By:</span>
          <select
            value={sortBy}
            onChange={(e: any) => setSortBy(e.target.value)}
            className="px-3 py-1.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 bg-white outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer"
          >
            <option value="recent">Most Recent</option>
            <option value="rating">Highest Rated</option>
            <option value="helpful">Most Helpful</option>
          </select>
        </div>
      </div>

      {/* REVIEWS GRID LIST */}
      {isLoading ? (
        <div className="py-12 text-center text-slate-500 text-xs font-bold">
          Loading community candidate reviews...
        </div>
      ) : sortedReviews.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-4">
          <MessageSquare className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-900">No Reviews Found for this Filter</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Be the first candidate to publish a review evaluating our AI resume tools!
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-5 py-2.5 bg-blue-600 text-white text-xs font-extrabold rounded-xl hover:bg-blue-700 transition-colors cursor-pointer"
          >
            Write a Review
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sortedReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              {/* TOP CANDIDATE INFO */}
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center space-x-3">
                    <img
                      src={rev.avatarUrl}
                      alt={rev.userName}
                      className="w-11 h-11 rounded-2xl object-cover border border-slate-200 bg-slate-100 shrink-0"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(rev.userName)}&background=2563eb&color=ffffff&bold=true`;
                      }}
                    />
                    <div>
                      <div className="flex items-center space-x-1.5">
                        <h4 className="text-sm font-black text-slate-900">{rev.userName}</h4>
                        {rev.isVerified && (
                          <span className="inline-flex items-center text-[10px] font-extrabold text-blue-600 bg-blue-50 border border-blue-100 px-1.5 py-0.5 rounded-full" title="Verified Account">
                            <CheckCircle2 className="w-3 h-3 mr-0.5 text-blue-600" /> Verified
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 font-medium">{rev.userRole}</p>
                    </div>
                  </div>

                  {/* Star Rating Display */}
                  <div className="flex items-center space-x-1 bg-amber-50 px-2.5 py-1 rounded-xl border border-amber-200/60 shrink-0">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < rev.rating ? 'text-amber-500 fill-amber-400' : 'text-slate-300'
                        }`}
                      />
                    ))}
                    <span className="text-xs font-black text-amber-900 ml-1">{rev.rating}.0</span>
                  </div>
                </div>

                {/* FEATURE & LANDED BADGES */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg text-[11px] font-bold">
                    {rev.featureTag}
                  </span>

                  {rev.companyLanded && (
                    <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg text-[11px] font-extrabold flex items-center space-x-1">
                      <Sparkles className="w-3 h-3 text-emerald-600" />
                      <span>{rev.companyLanded}</span>
                    </span>
                  )}
                </div>

                {/* TITLE & COMMENT */}
                <div className="space-y-1.5 pt-1">
                  <h5 className="text-sm font-extrabold text-slate-900 leading-snug">
                    "{rev.title}"
                  </h5>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {rev.comment}
                  </p>
                </div>
              </div>

              {/* FOOTER HELPFUL BUTTON & DATE */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span>Published {new Date(rev.createdAt).toLocaleDateString()}</span>

                <button
                  onClick={() => handleUpvote(rev.id)}
                  disabled={upvotedIds[rev.id]}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl transition-all cursor-pointer font-bold ${
                    upvotedIds[rev.id]
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>{upvotedIds[rev.id] ? 'Helpful!' : 'Helpful'}</span>
                  <span className="px-1.5 py-0.2 bg-white rounded-md text-[10px] font-black shadow-2xs">
                    {rev.helpfulCount}
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* WRITE A REVIEW MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white border border-slate-200 rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* MODAL HEADER */}
            <div className="px-6 py-5 bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 text-white flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-blue-300">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold tracking-tight">Candidate Platform Review</h3>
                  <p className="text-xs text-slate-300">Share feedback on features and candidate outcomes</p>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* MODAL FORM */}
            <form onSubmit={handleSubmitReview} className="p-6 overflow-y-auto space-y-4 flex-1 text-xs">
              
              {submitSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 font-bold flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{submitSuccess}</span>
                </div>
              )}

              {/* STAR RATING SELECTOR */}
              <div className="space-y-1.5 bg-slate-50 border border-slate-200 p-4 rounded-2xl text-center">
                <label className="font-extrabold text-slate-800 uppercase text-[10px] block">
                  Overall Feature Rating
                </label>
                <div className="flex items-center justify-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 transition-transform hover:scale-110 cursor-pointer"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          star <= rating ? 'text-amber-500 fill-amber-400' : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <span className="text-[11px] font-black text-amber-700 block mt-1">
                  {rating === 5 && '★ 5.0 — Outstanding Experience'}
                  {rating === 4 && '★ 4.0 — Very Good Features'}
                  {rating === 3 && '★ 3.0 — Average Performance'}
                  {rating === 2 && '★ 2.0 — Needs Improvement'}
                  {rating === 1 && '★ 1.0 — Poor Experience'}
                </span>
              </div>

              {/* NAME & ROLE */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-extrabold text-slate-700 uppercase text-[10px]">Your Name</label>
                  <input
                    type="text"
                    required
                    value={reviewerName}
                    onChange={(e) => setReviewerName(e.target.value)}
                    placeholder="e.g. J Siddartha"
                    className="w-full p-2.5 border border-slate-200 rounded-xl text-slate-900 font-medium focus:ring-2 focus:ring-blue-600 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-extrabold text-slate-700 uppercase text-[10px]">Target Role / Profession</label>
                  <input
                    type="text"
                    required
                    value={reviewerRole}
                    onChange={(e) => setReviewerRole(e.target.value)}
                    placeholder="e.g. Senior Software Engineer"
                    className="w-full p-2.5 border border-slate-200 rounded-xl text-slate-900 font-medium focus:ring-2 focus:ring-blue-600 outline-none"
                  />
                </div>
              </div>

              {/* FEATURE EVALUATED */}
              <div className="space-y-1">
                <label className="font-extrabold text-slate-700 uppercase text-[10px]">Feature Evaluated</label>
                <select
                  value={featureTag}
                  onChange={(e) => setFeatureTag(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-xl text-slate-900 font-bold bg-white focus:ring-2 focus:ring-blue-600 outline-none cursor-pointer"
                >
                  {FEATURE_OPTIONS.map(f => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
              </div>

              {/* OPTIONAL COMPANY LANDED */}
              <div className="space-y-1">
                <label className="font-extrabold text-slate-700 uppercase text-[10px] flex items-center justify-between">
                  <span>Success Outcome (Optional)</span>
                  <span className="text-slate-400 font-normal">e.g. Landed Offer at Microsoft</span>
                </label>
                <input
                  type="text"
                  value={companyLanded}
                  onChange={(e) => setCompanyLanded(e.target.value)}
                  placeholder="Landed Staff Engineer Offer at Google"
                  className="w-full p-2.5 border border-slate-200 rounded-xl text-slate-900 font-medium focus:ring-2 focus:ring-blue-600 outline-none"
                />
              </div>

              {/* REVIEW TITLE */}
              <div className="space-y-1">
                <label className="font-extrabold text-slate-700 uppercase text-[10px]">Review Headline</label>
                <input
                  type="text"
                  required
                  value={reviewTitle}
                  onChange={(e) => setReviewTitle(e.target.value)}
                  placeholder="e.g. Invaluable ATS feedback for executive engineering roles"
                  className="w-full p-2.5 border border-slate-200 rounded-xl text-slate-900 font-medium focus:ring-2 focus:ring-blue-600 outline-none"
                />
              </div>

              {/* REVIEW COMMENT */}
              <div className="space-y-1">
                <label className="font-extrabold text-slate-700 uppercase text-[10px]">Detailed Feedback & Comments</label>
                <textarea
                  required
                  rows={4}
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Describe how CareerPulse AI helped your job search, interview preparation, or ATS resume matching..."
                  className="w-full p-2.5 border border-slate-200 rounded-xl text-slate-900 font-medium focus:ring-2 focus:ring-blue-600 outline-none resize-none"
                />
              </div>

              {/* SUBMIT BUTTON */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Publishing Review...' : 'Publish Candidate Review'}</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
