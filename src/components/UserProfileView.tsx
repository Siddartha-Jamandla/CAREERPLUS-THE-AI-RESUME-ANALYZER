import React, { useState, useEffect } from 'react';
import { UserProfile, SavedAnalysisRecord, ResumeAnalysisResult } from '../types';
import { 
  User, 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Clock, 
  ShieldCheck, 
  Edit3, 
  Check, 
  Sparkles, 
  FileText, 
  Trash2, 
  ExternalLink, 
  Award, 
  Target, 
  CheckCircle2, 
  AlertCircle,
  AlertTriangle,
  Save,
  LogOut,
  Camera,
  Zap
} from 'lucide-react';
import { AvatarCustomizerModal } from './AvatarCustomizerModal';

interface UserProfileViewProps {
  user: UserProfile;
  token: string;
  onUpdateUser: (updatedUser: UserProfile) => void;
  onLoadSavedAnalysis: (analysis: ResumeAnalysisResult, targetRole: string) => void;
  onLogout: () => void;
  onNavigateTab: (tab: string) => void;
  usageCount?: number;
  dailyLimit?: number;
  remainingUses?: number;
}

export const UserProfileView: React.FC<UserProfileViewProps> = ({
  user,
  token,
  onUpdateUser,
  onLoadSavedAnalysis,
  onLogout,
  onNavigateTab,
  usageCount = 0,
  dailyLimit = 5,
  remainingUses = 5,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [targetRole, setTargetRole] = useState(user.targetRole);
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || user.email)}&background=2563eb&color=ffffff&bold=true&size=256`);
  const [yearsOfExperience, setYearsOfExperience] = useState(user.yearsOfExperience || '5-7 Years');
  const [preferredLocation, setPreferredLocation] = useState(user.preferredLocation || 'Remote / Hybrid');
  const [preferredSalary, setPreferredSalary] = useState(user.preferredSalary || '$140,000 - $180,000');
  const [bio, setBio] = useState(user.bio || 'Passionate software craftsman optimizing career progression with AI.');
  const [skillsInput, setSkillsInput] = useState(user.skills ? user.skills.join(', ') : 'TypeScript, React, Node.js, System Architecture');
  const [savedAnalyses, setSavedAnalyses] = useState<SavedAnalysisRecord[]>([]);
  const [isLoadingSaved, setIsLoadingSaved] = useState(false);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [isClearHistoryModalOpen, setIsClearHistoryModalOpen] = useState(false);
  const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] = useState(false);
  const [isDeletingData, setIsDeletingData] = useState(false);

  const handleSaveCustomAvatar = async (newAvatarUrl: string) => {
    setAvatarUrl(newAvatarUrl);
    try {
      const skillsArr = skillsInput.split(',').map(s => s.trim()).filter(Boolean);
      const res = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          targetRole,
          avatarUrl: newAvatarUrl,
          yearsOfExperience,
          preferredLocation,
          preferredSalary,
          skills: skillsArr,
          bio,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        onUpdateUser(data.user);
        setStatusMsg('New avatar updated and saved successfully!');
        setTimeout(() => setStatusMsg(null), 3000);
      }
    } catch (err) {
      console.error('Error saving custom avatar:', err);
    }
  };

  useEffect(() => {
    fetchSavedAnalyses();
  }, [user.id, token]);

  const fetchSavedAnalyses = async () => {
    setIsLoadingSaved(true);
    try {
      const res = await fetch('/api/user/saved-analyses', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setSavedAnalyses(data.analyses || []);
      }
    } catch (err) {
      console.error('Error fetching saved analyses:', err);
    } finally {
      setIsLoadingSaved(false);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingProfile(true);
    setStatusMsg(null);

    try {
      const skillsArr = skillsInput.split(',').map(s => s.trim()).filter(Boolean);
      const res = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          targetRole,
          avatarUrl,
          yearsOfExperience,
          preferredLocation,
          preferredSalary,
          skills: skillsArr,
          bio,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to update profile.');
      }

      onUpdateUser(data.user);
      setIsEditing(false);
      setStatusMsg('Profile updated successfully!');
      setTimeout(() => setStatusMsg(null), 3000);
    } catch (err: any) {
      setStatusMsg(`Error: ${err.message}`);
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handleDeleteAnalysis = async (id: string) => {
    try {
      const res = await fetch(`/api/user/saved-analyses/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setSavedAnalyses(prev => prev.filter(a => a.id !== id));
        setStatusMsg('Report deleted from profile history.');
        setTimeout(() => setStatusMsg(null), 3000);
      }
    } catch (err) {
      console.error('Failed to delete analysis:', err);
    }
  };

  const handleClearAllHistory = async () => {
    setIsDeletingData(true);
    try {
      const res = await fetch('/api/user/saved-analyses/all', {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setSavedAnalyses([]);
        setIsClearHistoryModalOpen(false);
        setStatusMsg('All saved resume reports deleted successfully!');
        setTimeout(() => setStatusMsg(null), 4000);
      }
    } catch (err) {
      console.error('Failed to clear history:', err);
    } finally {
      setIsDeletingData(false);
    }
  };

  const handleDeleteAccount = async () => {
    setIsDeletingData(true);
    try {
      const res = await fetch('/api/user/account', {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || 'Failed to delete profile data.');
        return;
      }
      setIsDeleteAccountModalOpen(false);
      onLogout();
    } catch (err) {
      console.error('Failed to delete user account:', err);
    } finally {
      setIsDeletingData(false);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Cover Header Banner */}
      <div className="relative bg-slate-900 rounded-3xl p-6 sm:p-8 text-white overflow-hidden shadow-xl border border-slate-800">
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-5">
            <div 
              className="relative group cursor-pointer"
              onClick={() => setIsAvatarModalOpen(true)}
              title="Click to customize avatar"
            >
              <img
                src={avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || user.email)}&background=2563eb&color=ffffff&bold=true&size=256`}
                alt={user.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-white/20 shadow-md bg-blue-900 transition-transform group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-slate-900/60 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-[10px] font-extrabold gap-0.5">
                <Camera className="w-5 h-5 text-amber-300" />
                <span>Customize</span>
              </div>
              {user.isAdmin && (
                <span className="absolute -bottom-2 -right-2 bg-amber-500 text-slate-950 p-1.5 rounded-full shadow-xs" title="Super Admin">
                  <ShieldCheck className="w-4 h-4 fill-amber-300" />
                </span>
              )}
            </div>

            <div className="space-y-1">
              <div className="flex items-center space-x-2 flex-wrap gap-1">
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">{user.name}</h1>
                {user.isAdmin ? (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-400 text-slate-950 border border-amber-300 uppercase tracking-wider flex items-center space-x-1">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Super Admin</span>
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-500/20 text-blue-300 border border-blue-400/30 uppercase tracking-wider">
                    Candidate Profile
                  </span>
                )}
              </div>

              <p className="text-sm font-medium text-slate-300 flex items-center space-x-2">
                <Briefcase className="w-4 h-4 text-blue-400 shrink-0" />
                <span>{user.targetRole}</span>
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
                <span className="flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  <span>{user.preferredLocation || 'Remote'}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  <span>{user.yearsOfExperience || 'Mid-Senior'}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300 font-semibold">{user.preferredSalary || '$140k - $180k'}</span>
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setIsAvatarModalOpen(true)}
              className="px-3.5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-extrabold rounded-xl transition-all flex items-center space-x-2 border border-blue-400/40 cursor-pointer shadow-xs"
            >
              <Camera className="w-4 h-4 text-amber-300" />
              <span>Customize Avatar</span>
            </button>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-3.5 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl transition-all flex items-center space-x-2 border border-white/20 cursor-pointer"
            >
              <Edit3 className="w-4 h-4 text-blue-400" />
              <span>{isEditing ? 'Cancel Editing' : 'Edit Profile'}</span>
            </button>

            <button
              onClick={onLogout}
              className="px-3.5 py-2.5 bg-red-500/20 hover:bg-red-500/30 text-red-300 text-xs font-bold rounded-xl transition-all flex items-center space-x-2 border border-red-500/30 cursor-pointer"
            >
              <LogOut className="w-4 h-4 text-red-400" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {statusMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs font-bold flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{statusMsg}</span>
        </div>
      )}

      {/* EDIT PROFILE FORM MODAL / SECTION */}
      {isEditing && (
        <form onSubmit={handleSaveProfile} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-md space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center space-x-2">
              <Edit3 className="w-5 h-5 text-blue-600" />
              <span>Edit Personal & Career Details</span>
            </h3>
            <span className="text-xs text-slate-500">Updates sync instantly across AI suggestions</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-extrabold text-slate-700 uppercase text-[10px]">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2.5 border border-slate-200 rounded-xl text-slate-900 font-medium focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="font-extrabold text-slate-700 uppercase text-[10px]">Target Career Role</label>
              <input
                type="text"
                required
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="w-full p-2.5 border border-slate-200 rounded-xl text-slate-900 font-medium focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="font-extrabold text-slate-700 uppercase text-[10px] flex items-center justify-between">
                <span>Profile Photo / Avatar</span>
                <button
                  type="button"
                  onClick={() => setIsAvatarModalOpen(true)}
                  className="text-[10px] text-blue-600 hover:underline font-extrabold flex items-center space-x-1"
                >
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  <span>Open Customizer Studio</span>
                </button>
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  placeholder="https://ui-avatars.com/..."
                  className="w-full p-2.5 border border-slate-200 rounded-xl text-slate-900 font-medium focus:ring-2 focus:ring-blue-600 outline-none text-xs"
                />
                <button
                  type="button"
                  onClick={() => setIsAvatarModalOpen(true)}
                  className="px-3 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-xl text-xs font-bold border border-blue-200 shrink-0 cursor-pointer"
                >
                  Studio
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-extrabold text-slate-700 uppercase text-[10px]">Years of Experience</label>
              <input
                type="text"
                value={yearsOfExperience}
                onChange={(e) => setYearsOfExperience(e.target.value)}
                className="w-full p-2.5 border border-slate-200 rounded-xl text-slate-900 font-medium focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="font-extrabold text-slate-700 uppercase text-[10px]">Preferred Work Location</label>
              <input
                type="text"
                value={preferredLocation}
                onChange={(e) => setPreferredLocation(e.target.value)}
                className="w-full p-2.5 border border-slate-200 rounded-xl text-slate-900 font-medium focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="font-extrabold text-slate-700 uppercase text-[10px]">Target Salary Range</label>
              <input
                type="text"
                value={preferredSalary}
                onChange={(e) => setPreferredSalary(e.target.value)}
                className="w-full p-2.5 border border-slate-200 rounded-xl text-slate-900 font-medium focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>

            <div className="space-y-1 sm:col-span-2 lg:col-span-1">
              <label className="font-extrabold text-slate-700 uppercase text-[10px]">Core Skills (Comma Separated)</label>
              <input
                type="text"
                value={skillsInput}
                onChange={(e) => setSkillsInput(e.target.value)}
                className="w-full p-2.5 border border-slate-200 rounded-xl text-slate-900 font-medium focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>

            <div className="space-y-1 sm:col-span-2 lg:col-span-3">
              <label className="font-extrabold text-slate-700 uppercase text-[10px]">Candidate Bio / Summary</label>
              <textarea
                rows={2}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full p-2.5 border border-slate-200 rounded-xl text-slate-900 font-medium focus:ring-2 focus:ring-blue-600 outline-none resize-none"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSavingProfile}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-colors shadow-xs flex items-center space-x-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{isSavingProfile ? 'Saving Changes...' : 'Save Profile Changes'}</span>
            </button>
          </div>
        </form>
      )}

      {/* QUICK STATS RESPONSIVE GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* AI RESUME CREDITS CARD - SHOWN AFTER SIGNING UP */}
        <div className="bg-gradient-to-br from-blue-50 via-indigo-50/50 to-white border border-blue-200 rounded-2xl p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase text-blue-700 tracking-wider">AI Resume Credits</span>
            <Zap className="w-4 h-4 text-amber-500 fill-amber-400" />
          </div>
          <p className="text-2xl font-black text-blue-700">
            {user.isAdmin ? 'Unlimited' : `${remainingUses} / ${dailyLimit}`}
          </p>
          <span className="text-xs text-blue-600 font-bold block">
            {user.isAdmin ? 'Super Admin Access' : `${remainingUses} Credits Available`}
          </span>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-2">
          <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider block">Target Career Role</span>
          <p className="text-base font-black text-slate-900 truncate">{user.targetRole}</p>
          <span className="text-xs text-blue-600 font-bold block">Optimized for ATS</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-2">
          <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider block">Saved Resume Analyses</span>
          <p className="text-2xl font-black text-blue-600">{savedAnalyses.length}</p>
          <span className="text-xs text-slate-500 block">Reports stored in profile</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-2">
          <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider block">Account Privileges</span>
          <p className="text-base font-black text-slate-900">{user.isAdmin ? 'Super Administrator' : 'Verified Candidate'}</p>
          <span className="text-xs text-emerald-600 font-bold block">Active Account</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-2">
          <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider block">Member Since</span>
          <p className="text-base font-black text-slate-900">{new Date(user.createdAt).toLocaleDateString()}</p>
          <span className="text-xs text-slate-500 block">Last login: Today</span>
        </div>
      </div>

      {/* SAVED RESUME ANALYSES HISTORY */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <h2 className="text-lg font-black text-slate-900 flex items-center space-x-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <span>Saved Resume Analysis Reports ({savedAnalyses.length})</span>
            </h2>
            <p className="text-xs text-slate-500">Access and view previous AI evaluation reports saved to your profile.</p>
          </div>

          <div className="flex items-center space-x-2 self-start sm:self-auto">
            {savedAnalyses.length > 0 && (
              <button
                onClick={() => setIsClearHistoryModalOpen(true)}
                className="px-3.5 py-2 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-xs font-bold rounded-xl transition-colors flex items-center space-x-1.5 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All History</span>
              </button>
            )}

            <button
              onClick={() => onNavigateTab('input')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-colors shadow-xs flex items-center space-x-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Analyze New Resume</span>
            </button>
          </div>
        </div>

        {savedAnalyses.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200 space-y-3">
            <FileText className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-sm font-bold text-slate-700">No Saved Resume Reports Yet</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Run a resume analysis and save the report to keep track of your ATS compatibility scores and interview recommendations.
            </p>
            <button
              onClick={() => onNavigateTab('input')}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
            >
              Analyze Resume Now
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {savedAnalyses.map((rec) => (
              <div
                key={rec.id}
                className="bg-slate-50 border border-slate-200 hover:border-blue-400 rounded-2xl p-5 transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-100 text-blue-800 uppercase">
                      {rec.targetRole}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">
                      {new Date(rec.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 py-2 bg-white rounded-xl p-3 border border-slate-100 text-center">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 block uppercase">Overall</span>
                      <span className="text-lg font-black text-blue-600">{rec.overallScore}/100</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 block uppercase">ATS Score</span>
                      <span className="text-lg font-black text-emerald-600">{rec.atsScore}%</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 block uppercase">Skill Match</span>
                      <span className="text-lg font-black text-amber-600">{rec.skillsMatchScore}%</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 pt-2 border-t border-slate-200">
                  <button
                    onClick={() => onLoadSavedAnalysis(rec.analysis, rec.targetRole)}
                    className="flex-1 py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center space-x-1.5 shadow-xs cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>View Full Report</span>
                  </button>

                  <button
                    onClick={() => handleDeleteAnalysis(rec.id)}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                    title="Delete Saved Report"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CANDIDATE DATA & PROFILE HISTORY MANAGEMENT CARD */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs card-3d space-y-5">
        <div className="flex items-center space-x-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="p-2 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 rounded-xl">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-black text-slate-900 dark:text-white">Candidate Data & Profile History Controls</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Manage saved reports, history, and account privacy options.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2 flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-extrabold text-slate-900 dark:text-white flex items-center space-x-1.5">
                <Trash2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Clear All Resume Analysis History</span>
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                Removes all {savedAnalyses.length} saved AI resume evaluation reports from your candidate profile.
              </p>
            </div>
            <button
              onClick={() => setIsClearHistoryModalOpen(true)}
              disabled={savedAnalyses.length === 0}
              className="mt-3 w-full py-2 px-3 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/60 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 font-bold text-xs rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center space-x-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{savedAnalyses.length === 0 ? 'No History to Clear' : 'Clear All Analysis Reports'}</span>
            </button>
          </div>

          <div className="p-4 bg-red-50/50 dark:bg-red-950/30 rounded-2xl border border-red-200 dark:border-red-900/50 space-y-2 flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-extrabold text-red-900 dark:text-red-300 flex items-center space-x-1.5">
                <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
                <span>Delete Candidate Account & Data</span>
              </h4>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
                Permanently delete your profile, saved analyses, and all candidate data stored on CAREER PLUS+.
              </p>
            </div>
            <button
              onClick={() => setIsDeleteAccountModalOpen(true)}
              disabled={user.isAdmin}
              className="mt-3 w-full py-2 px-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl transition-colors shadow-xs disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center space-x-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{user.isAdmin ? 'Super Admin Protected' : 'Delete Account & All Data'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* CLEAR HISTORY CONFIRMATION MODAL */}
      {isClearHistoryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-5">
            <div className="flex items-center space-x-3 text-amber-600">
              <div className="p-3 bg-amber-100 rounded-2xl">
                <AlertTriangle className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">Clear All Resume Reports?</h3>
                <p className="text-xs text-slate-500">This action will delete all saved reports in your profile history.</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 bg-amber-50 p-3 rounded-xl border border-amber-200">
              You currently have <strong>{savedAnalyses.length} saved resume report(s)</strong>. Deleting them will remove them permanently.
            </p>

            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setIsClearHistoryModalOpen(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleClearAllHistory}
                disabled={isDeletingData}
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl transition-colors shadow-xs flex items-center space-x-1.5 cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <span>{isDeletingData ? 'Deleting Reports...' : 'Yes, Delete All History'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE ACCOUNT CONFIRMATION MODAL */}
      {isDeleteAccountModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-5">
            <div className="flex items-center space-x-3 text-red-600">
              <div className="p-3 bg-red-100 rounded-2xl">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">Delete Account & Profile?</h3>
                <p className="text-xs text-slate-500">Permanently wipe your profile and candidate history.</p>
              </div>
            </div>

            <div className="p-3.5 bg-red-50 rounded-2xl border border-red-200 space-y-2 text-xs text-red-900">
              <p className="font-bold">Warning: This action cannot be undone.</p>
              <ul className="list-disc list-inside space-y-1 text-[11px] text-red-800">
                <li>Your profile settings and avatar will be removed.</li>
                <li>All {savedAnalyses.length} saved resume analysis reports will be deleted.</li>
                <li>Your active login session will be invalidated immediately.</li>
              </ul>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setIsDeleteAccountModalOpen(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteAccount}
                disabled={isDeletingData}
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl transition-colors shadow-xs flex items-center space-x-1.5 cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <span>{isDeletingData ? 'Deleting Account...' : 'Permanently Delete Account'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AVATAR CUSTOMIZER STUDIO MODAL */}
      <AvatarCustomizerModal
        isOpen={isAvatarModalOpen}
        onClose={() => setIsAvatarModalOpen(false)}
        currentAvatarUrl={avatarUrl}
        userName={name || user.name}
        userEmail={user.email}
        onSaveAvatar={handleSaveCustomAvatar}
      />
    </div>
  );
};
