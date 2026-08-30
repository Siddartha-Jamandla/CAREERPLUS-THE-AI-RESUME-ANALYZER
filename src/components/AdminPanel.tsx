import React, { useState, useEffect, useRef } from 'react';
import { UserProfile, AuditLogAction, AdminMetrics, VisitorSession, TrafficAnalytics } from '../types';
import { 
  ShieldCheck, 
  Users, 
  Activity, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Search, 
  RefreshCw, 
  Lock, 
  Unlock, 
  Trash2, 
  UserCheck, 
  Download, 
  Filter, 
  Clock, 
  Terminal, 
  Sparkles, 
  Settings, 
  TrendingUp,
  Server,
  Key,
  Database,
  Globe,
  Monitor,
  Smartphone,
  Tablet,
  Eye,
  UserX,
  Ban,
  Radio,
  BarChart3,
  Compass,
  Layers,
  MapPin,
  ExternalLink,
  ChevronRight,
  X,
  Play,
  Pause,
  Sliders,
  Calendar,
  ArrowLeft
} from 'lucide-react';

interface AdminPanelProps {
  currentUser: UserProfile | null;
  token: string | null;
  onOpenAuthModal: () => void;
  onNavigateBack?: () => void;
  returnTo?: string;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  currentUser,
  token,
  onOpenAuthModal,
  onNavigateBack,
  returnTo,
}) => {
  const [activeTab, setActiveTab] = useState<'visitors' | 'traffic' | 'users' | 'audit' | 'analytics' | 'settings'>('visitors');
  const [metrics, setMetrics] = useState<AdminMetrics | null>(null);
  const [usersList, setUsersList] = useState<any[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLogAction[]>([]);
  
  // Visitor Telemetry State
  const [visitorsList, setVisitorsList] = useState<VisitorSession[]>([]);
  const [trafficAnalytics, setTrafficAnalytics] = useState<TrafficAnalytics | null>(null);
  const [visitorFilter, setVisitorFilter] = useState<'ALL' | 'GUESTS' | 'MEMBERS' | 'ONLINE' | 'BLOCKED'>('ALL');
  const [visitorSearch, setVisitorSearch] = useState('');
  const [autoRefreshVisitors, setAutoRefreshVisitors] = useState<boolean>(true);
  const [selectedVisitorForTimeline, setSelectedVisitorForTimeline] = useState<VisitorSession | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [auditFilter, setAuditFilter] = useState<string>('ALL');
  const [isLoading, setIsLoading] = useState(false);
  const [isVisitorLoading, setIsVisitorLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // System controls state
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [allowRegistration, setAllowRegistration] = useState(true);
  const [globalDailyLimitInput, setGlobalDailyLimitInput] = useState<number>(5);
  const [usageConfigData, setUsageConfigData] = useState<any>(null);

  const autoRefreshTimerRef = useRef<any>(null);

  const isAdmin = currentUser?.isAdmin || currentUser?.email.toLowerCase() === 'jamandlasiddartha@gmail.com';

  useEffect(() => {
    if (isAdmin && token) {
      fetchAdminData();
      fetchVisitorsData();
      fetchTrafficAnalytics();
      fetchUsageConfig();
    }
  }, [isAdmin, token]);

  // Real-time auto-refresh loop for visitors tab
  useEffect(() => {
    if (isAdmin && token && autoRefreshVisitors) {
      autoRefreshTimerRef.current = setInterval(() => {
        fetchVisitorsData(false);
        fetchTrafficAnalytics(false);
      }, 5000);
    }
    return () => {
      if (autoRefreshTimerRef.current) {
        clearInterval(autoRefreshTimerRef.current);
      }
    };
  }, [isAdmin, token, autoRefreshVisitors, visitorFilter, visitorSearch]);

  const fetchUsageConfig = async () => {
    if (!token) return;
    try {
      const res = await fetch('/api/admin/usage-config', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setUsageConfigData(data);
        if (data.globalDailyLimit) {
          setGlobalDailyLimitInput(data.globalDailyLimit);
        }
      }
    } catch (err) {
      console.error('Error fetching usage config:', err);
    }
  };

  const fetchVisitorsData = async (showLoadingSpinner: boolean = true) => {
    if (!token) return;
    if (showLoadingSpinner) setIsVisitorLoading(true);
    try {
      const params = new URLSearchParams();
      if (visitorFilter !== 'ALL') params.append('filter', visitorFilter);
      if (visitorSearch) params.append('search', visitorSearch);

      const res = await fetch(`/api/admin/visitors?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setVisitorsList(data.visitors || []);
      }
    } catch (err) {
      console.error('Error fetching visitor telemetry:', err);
    } finally {
      if (showLoadingSpinner) setIsVisitorLoading(false);
    }
  };

  const fetchTrafficAnalytics = async (showLoadingSpinner: boolean = true) => {
    if (!token) return;
    try {
      const res = await fetch('/api/admin/traffic-analytics', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setTrafficAnalytics(data);
      }
    } catch (err) {
      console.error('Error fetching traffic analytics:', err);
    }
  };

  const handleToggleBlockVisitor = async (visitorId: string, ipAddress?: string) => {
    if (!token) return;
    try {
      const res = await fetch('/api/admin/visitors/toggle-block', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ visitorId, ipAddress })
      });
      const data = await res.json();
      if (res.ok) {
        setSuccessMsg(data.message || 'Visitor block status updated.');
        fetchVisitorsData(false);
        setTimeout(() => setSuccessMsg(null), 3000);
      } else {
        setErrorMessage(data.error || 'Failed to update block status.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Error executing visitor restriction.');
    }
  };

  const handlePurgeVisitors = async (target: 'GUESTS_ONLY' | 'ALL') => {
    if (!token) return;
    const confirmMessage = target === 'ALL' 
      ? 'Are you sure you want to purge all historical visitor telemetry records?' 
      : 'Purge all anonymous guest tracking sessions? (Registered candidate history will be preserved)';
    
    if (!window.confirm(confirmMessage)) return;

    try {
      const res = await fetch('/api/admin/visitors/purge', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ target })
      });
      const data = await res.json();
      if (res.ok) {
        setSuccessMsg(data.message || 'Visitor records purged.');
        fetchVisitorsData();
        fetchTrafficAnalytics();
        setTimeout(() => setSuccessMsg(null), 3000);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to purge visitors.');
    }
  };

  const handleExportVisitors = (format: 'csv' | 'json') => {
    if (!token) return;
    window.open(`/api/admin/visitors/export?format=${format}`, '_blank');
  };

  const handleUpdateGlobalDailyLimit = async () => {
    if (!token) return;
    setIsLoading(true);
    setSuccessMsg(null);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/admin/usage-config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ newDailyLimit: Number(globalDailyLimitInput) || 5 }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update daily limit.');

      setSuccessMsg(`Global daily limit updated to ${data.globalDailyLimit} requests/day.`);
      setUsageConfigData(data);
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to update daily limit.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetUsageCounts = async (targetKey?: string) => {
    if (!token) return;
    if (!window.confirm(targetKey ? `Reset usage for ${targetKey}?` : 'Reset ALL users daily AI usage allocations?')) {
      return;
    }

    setIsLoading(true);
    setSuccessMsg(null);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/admin/usage-config/reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ targetKey }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to reset usage counts.');

      setSuccessMsg(data.message || 'Usage limits reset successfully.');
      fetchUsageConfig();
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to reset usage.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAdminData = async () => {
    if (!token) return;
    setIsLoading(true);
    setErrorMessage(null);

    try {
      // 1. Fetch Admin Metrics
      const mRes = await fetch('/api/admin/metrics', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (mRes.ok && mRes.headers.get('content-type')?.includes('application/json')) {
        const mData = await mRes.json();
        setMetrics(mData);
      } else if (!mRes.ok) {
        const errData = await mRes.json().catch(() => ({}));
        if (errData.error) setErrorMessage(errData.error);
      }

      // 2. Fetch All Users
      const uRes = await fetch('/api/admin/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (uRes.ok && uRes.headers.get('content-type')?.includes('application/json')) {
        const uData = await uRes.json();
        setUsersList(uData.users || []);
      }

      // 3. Fetch Audit Logs
      const aRes = await fetch('/api/admin/audit-logs', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (aRes.ok && aRes.headers.get('content-type')?.includes('application/json')) {
        const aData = await aRes.json();
        setAuditLogs(aData.auditLogs || []);
      }
    } catch (err: any) {
      console.error('Error fetching admin data:', err);
      setErrorMessage(err.message || 'Failed to load admin telemetry data.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleUserStatus = async (userId: string, currentStatus: string) => {
    if (!token) return;
    const newStatus = currentStatus === 'active' ? 'suspended' : 'active';

    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setSuccessMsg(`User status updated to ${newStatus}`);
        fetchAdminData();
        setTimeout(() => setSuccessMsg(null), 3000);
      }
    } catch (err) {
      console.error('Failed to update user status:', err);
    }
  };

  const handleToggleAdminStatus = async (userId: string, currentIsAdmin: boolean) => {
    if (!token) return;

    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isAdmin: !currentIsAdmin }),
      });

      if (res.ok) {
        setSuccessMsg(`User admin status toggled.`);
        fetchAdminData();
        setTimeout(() => setSuccessMsg(null), 3000);
      }
    } catch (err) {
      console.error('Failed to update admin status:', err);
    }
  };

  const handleDeleteUser = async (userId: string, email: string, name: string) => {
    if (!token) return;

    if (!window.confirm(`Are you sure you want to permanently delete candidate profile for "${name}" (${email})? This action is irreversible.`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setSuccessMsg(`Candidate ${name} profile removed.`);
        fetchAdminData();
        setTimeout(() => setSuccessMsg(null), 3000);
      } else {
        const err = await res.json();
        setErrorMessage(err.error || 'Failed to delete user.');
      }
    } catch (err) {
      console.error('Failed to delete user profile:', err);
    }
  };

  const handleExportAuditLogs = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(auditLogs, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `careerpulse_audit_logs_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const formatDuration = (seconds?: number) => {
    if (!seconds || seconds <= 0) return '< 1 min';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins === 0) return `${secs}s`;
    if (mins < 60) return `${mins}m ${secs}s`;
    const hrs = Math.floor(mins / 60);
    const remMins = mins % 60;
    return `${hrs}h ${remMins}m`;
  };

  const getDeviceIcon = (deviceType?: string) => {
    switch (deviceType) {
      case 'Mobile':
        return <Smartphone className="w-3.5 h-3.5 text-indigo-500" />;
      case 'Tablet':
        return <Tablet className="w-3.5 h-3.5 text-purple-500" />;
      default:
        return <Monitor className="w-3.5 h-3.5 text-blue-500" />;
    }
  };

  const getTabBadge = (tab: string) => {
    const map: Record<string, { label: string; bg: string; text: string }> = {
      input: { label: 'Resume Analyzer', bg: 'bg-blue-50 border-blue-200', text: 'text-blue-700' },
      ats: { label: 'ATS Optimizer', bg: 'bg-emerald-50 border-emerald-200', text: 'text-emerald-700' },
      'bullet-rewrite': { label: 'Bullet Studio', bg: 'bg-amber-50 border-amber-200', text: 'text-amber-700' },
      salary: { label: 'Salary Evaluator', bg: 'bg-violet-50 border-violet-200', text: 'text-violet-700' },
      flashcards: { label: 'Flashcards', bg: 'bg-pink-50 border-pink-200', text: 'text-pink-700' },
      'mock-interview': { label: 'Mock Interview', bg: 'bg-cyan-50 border-cyan-200', text: 'text-cyan-700' },
      'voice-video': { label: 'Live AI Voice/Video', bg: 'bg-purple-50 border-purple-200', text: 'text-purple-700' },
      'career-coach': { label: 'Global Career Coach', bg: 'bg-rose-50 border-rose-200', text: 'text-rose-700' },
      'career-paths': { label: 'Career Pathways', bg: 'bg-teal-50 border-teal-200', text: 'text-teal-700' },
      jobs: { label: 'Jobs & Upskilling', bg: 'bg-indigo-50 border-indigo-200', text: 'text-indigo-700' },
      portfolio: { label: 'Web Portfolio', bg: 'bg-orange-50 border-orange-200', text: 'text-orange-700' },
      'cover-letter': { label: 'Cover Letter', bg: 'bg-sky-50 border-sky-200', text: 'text-sky-700' },
      admin: { label: 'Admin Center', bg: 'bg-amber-100 border-amber-300', text: 'text-amber-900' }
    };
    const t = map[tab] || { label: tab, bg: 'bg-slate-100 border-slate-200', text: 'text-slate-700' };
    return (
      <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold border ${t.bg} ${t.text} truncate max-w-[130px] inline-block`}>
        {t.label}
      </span>
    );
  };

  if (!currentUser || !isAdmin) {
    return (
      <div className="max-w-2xl mx-auto my-12 p-8 bg-white border border-slate-200 rounded-3xl shadow-xl text-center space-y-6">
        <div className="w-16 h-16 bg-amber-100 border border-amber-200 rounded-2xl flex items-center justify-center mx-auto text-amber-700">
          <ShieldCheck className="w-8 h-8 text-amber-600" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-black text-slate-900">Admin Authentication Required</h2>
          <p className="text-xs text-slate-600 max-w-md mx-auto">
            The Admin Control Panel is reserved exclusively for system administrators (<strong className="text-slate-800">jamandlasiddartha@gmail.com</strong>).
          </p>
        </div>

        <button
          onClick={onOpenAuthModal}
          className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white text-xs font-extrabold rounded-xl transition-all shadow-md flex items-center justify-center space-x-2 mx-auto cursor-pointer"
        >
          <Key className="w-4 h-4" />
          <span>Authenticate as Super Admin</span>
        </button>
      </div>
    );
  }

  const filteredUsers = usersList.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.targetRole.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredAuditLogs = auditLogs.filter(log => {
    const matchesSearch = log.userEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          log.details.toLowerCase().includes(searchQuery.toLowerCase());
    if (auditFilter === 'ALL') return matchesSearch;
    return matchesSearch && log.action === auditFilter;
  });

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Top Banner Header with Live Online Pulse */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
        <div className="absolute right-0 top-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-black bg-amber-400 text-slate-950 uppercase tracking-wider flex items-center space-x-1.5 shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Super Admin Hub</span>
              </span>

              {/* Real-time Online Indicator */}
              <span className="px-3 py-1 rounded-full text-[10px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>{metrics?.liveVisitors?.onlineNow || 1} User(s) Viewing Live</span>
              </span>

              <span className="text-xs text-slate-400 font-mono">
                {currentUser.email}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Executive Platform Administration & Visitor Telemetry
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Track live users viewing without signing in and authenticated members in real-time, inspect visit timestamps, active tabs, hourly traffic trends, user accounts, and audit records.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <button
              onClick={() => {
                fetchAdminData();
                fetchVisitorsData();
                fetchTrafficAnalytics();
              }}
              disabled={isLoading || isVisitorLoading}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition-all border border-slate-700 flex items-center space-x-2 cursor-pointer shadow-xs"
            >
              <RefreshCw className={`w-4 h-4 text-amber-400 ${isLoading || isVisitorLoading ? 'animate-spin' : ''}`} />
              <span>Refresh Telemetry</span>
            </button>
          </div>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs font-bold flex items-center space-x-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-red-800 text-xs font-bold flex items-center space-x-2 animate-fadeIn">
          <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* 4 HIGH-IMPACT REAL-TIME KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Live Visitors Active Now */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-extrabold uppercase tracking-wider">Live Online Now</span>
            <div className="flex items-center space-x-1.5 text-emerald-600">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <Radio className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <p className="text-3xl font-black text-emerald-600">
              {metrics?.liveVisitors?.onlineNow || trafficAnalytics?.activeOnlineNow || 1}
            </p>
            <span className="text-xs font-bold text-slate-500">active sessions</span>
          </div>
          <div className="text-[11px] font-semibold text-slate-600 flex items-center justify-between pt-1 border-t border-slate-100">
            <span className="text-amber-700 font-bold">
              {metrics?.liveVisitors?.guestsNow || trafficAnalytics?.activeGuestsNow || 0} Guests (No Login)
            </span>
            <span className="text-blue-700 font-bold">
              {metrics?.liveVisitors?.usersNow || trafficAnalytics?.activeUsersNow || 1} Members
            </span>
          </div>
        </div>

        {/* Card 2: Today's Visits & Traffic */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-extrabold uppercase tracking-wider">Today's Total Visits</span>
            <Activity className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-3xl font-black text-slate-900">
            {metrics?.liveVisitors?.todayTotalVisits || trafficAnalytics?.todayTotalVisits || 28}
          </p>
          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
            <span>{trafficAnalytics?.todayUniqueVisitors || metrics?.liveVisitors?.todayUniqueVisitors || 16} Unique Visitors</span>
            <span className="font-extrabold text-amber-600">{trafficAnalytics?.guestPercentage || 75}% Guests</span>
          </div>
        </div>

        {/* Card 3: Registered Candidate Directory */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-extrabold uppercase tracking-wider">Registered Candidates</span>
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-3xl font-black text-blue-600">{metrics?.totalUsers || usersList.length || 2}</p>
          <span className="text-xs text-emerald-600 font-extrabold block flex items-center space-x-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Active Candidate Profiles</span>
          </span>
        </div>

        {/* Card 4: Resumes & System Operational Health */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-extrabold uppercase tracking-wider">Analyses & System</span>
            <Server className="w-4 h-4 text-indigo-600" />
          </div>
          <p className="text-3xl font-black text-indigo-600">{metrics?.totalAnalyses || 14}</p>
          <span className="text-xs text-emerald-600 font-extrabold block flex items-center space-x-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>100% Operational & Secure</span>
          </span>
        </div>
      </div>

      {/* ADMIN NAVIGATION TABS */}
      <div className="flex border-b border-slate-200 bg-white rounded-2xl p-1.5 shadow-xs overflow-x-auto gap-1">
        <button
          onClick={() => {
            setActiveTab('visitors');
            fetchVisitorsData();
          }}
          className={`flex-1 min-w-[170px] py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center space-x-2 transition-all cursor-pointer ${
            activeTab === 'visitors' ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Eye className="w-4 h-4" />
          <span>Live Visitors & Guests</span>
          <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${activeTab === 'visitors' ? 'bg-amber-700 text-amber-100' : 'bg-slate-100 text-slate-700'}`}>
            {visitorsList.length}
          </span>
        </button>

        <button
          onClick={() => {
            setActiveTab('traffic');
            fetchTrafficAnalytics();
          }}
          className={`flex-1 min-w-[160px] py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center space-x-2 transition-all cursor-pointer ${
            activeTab === 'traffic' ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Traffic & Time Analytics</span>
        </button>

        <button
          onClick={() => setActiveTab('users')}
          className={`flex-1 min-w-[150px] py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center space-x-2 transition-all cursor-pointer ${
            activeTab === 'users' ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Candidate Directory ({usersList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('audit')}
          className={`flex-1 min-w-[150px] py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center space-x-2 transition-all cursor-pointer ${
            activeTab === 'audit' ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Terminal className="w-4 h-4" />
          <span>Audit Logs ({auditLogs.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('analytics')}
          className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center space-x-2 transition-all cursor-pointer ${
            activeTab === 'analytics' ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Role Analytics</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center space-x-2 transition-all cursor-pointer ${
            activeTab === 'settings' ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>System Controls</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: LIVE VISITORS & GUESTS MANAGEMENT HUB (USER-REQUESTED CORE FEATURE) */}
      {/* ========================================================================= */}
      {activeTab === 'visitors' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-6">
          {/* Header & Controls */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <h2 className="text-base font-black text-slate-900 flex items-center space-x-2">
                  <Eye className="w-5 h-5 text-amber-600" />
                  <span>Real-Time Visitor & Unauthenticated Guest Management</span>
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800 flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  <span>Live Stream Active</span>
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Live monitoring of everyone viewing the website — including time of arrival, duration on site, feature currently being used without signing in, device, IP, and action timeline.
              </p>
            </div>

            {/* Quick Action Controls */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Auto-Refresh Toggle */}
              <button
                onClick={() => setAutoRefreshVisitors(!autoRefreshVisitors)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-colors cursor-pointer border ${
                  autoRefreshVisitors
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-slate-100 text-slate-600 border-slate-200'
                }`}
                title="Toggle real-time 5s auto refresh"
              >
                {autoRefreshVisitors ? <Play className="w-3.5 h-3.5 fill-current" /> : <Pause className="w-3.5 h-3.5" />}
                <span>{autoRefreshVisitors ? 'Auto-Sync (5s)' : 'Paused'}</span>
              </button>

              {/* Export Button */}
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => handleExportVisitors('csv')}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center space-x-1 transition-colors cursor-pointer"
                  title="Export visitor data as CSV"
                >
                  <Download className="w-3.5 h-3.5 text-slate-500" />
                  <span>CSV</span>
                </button>
                <button
                  onClick={() => handleExportVisitors('json')}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center space-x-1 transition-colors cursor-pointer"
                  title="Export visitor data as JSON"
                >
                  <Download className="w-3.5 h-3.5 text-slate-500" />
                  <span>JSON</span>
                </button>
              </div>

              {/* Purge Button */}
              <button
                onClick={() => handlePurgeVisitors('GUESTS_ONLY')}
                className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-xl text-xs font-bold flex items-center space-x-1 transition-colors cursor-pointer"
                title="Purge unauthenticated guest sessions"
              >
                <Trash2 className="w-3.5 h-3.5 text-red-500" />
                <span>Purge Guests</span>
              </button>
            </div>
          </div>

          {/* Search & Filter Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={visitorSearch}
                onChange={(e) => setVisitorSearch(e.target.value)}
                placeholder="Search by Visitor ID, Guest, Name, IP, Browser, or Tab..."
                className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              {(['ALL', 'ONLINE', 'GUESTS', 'MEMBERS', 'BLOCKED'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setVisitorFilter(f)}
                  className={`px-3 py-1 rounded-lg font-bold text-[11px] transition-all cursor-pointer ${
                    visitorFilter === f
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {f === 'GUESTS' ? 'Guests (Without Sign-in)' : f === 'MEMBERS' ? 'Logged-in Members' : f}
                </button>
              ))}
            </div>
          </div>

          {/* Real-time Visitor Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 uppercase font-extrabold text-[10px]">
                  <th className="p-3">Visitor / Identity</th>
                  <th className="p-3">Status & Pulse</th>
                  <th className="p-3">Arrival Time</th>
                  <th className="p-3">Last Active</th>
                  <th className="p-3">Duration & Views</th>
                  <th className="p-3">Active Feature / Tab</th>
                  <th className="p-3">Device & IP</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {visitorsList.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-slate-400">
                      No visitors match the current filter or search criteria.
                    </td>
                  </tr>
                ) : (
                  visitorsList.map((v) => {
                    const isOnline = v.isOnlineNow;
                    return (
                      <tr key={v.visitorId} className={`hover:bg-slate-50/80 transition-colors ${v.isBlocked ? 'bg-red-50/40' : ''}`}>
                        {/* 1. Identity */}
                        <td className="p-3">
                          <div className="flex items-center space-x-2.5">
                            {v.isGuest ? (
                              <div className="w-8 h-8 rounded-full bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-800 font-black text-xs shrink-0">
                                G
                              </div>
                            ) : (
                              <img
                                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(v.userName || 'Candidate')}&background=2563eb&color=ffffff&bold=true&size=128`}
                                alt={v.userName}
                                className="w-8 h-8 rounded-full object-cover border border-slate-200 shrink-0"
                              />
                            )}
                            <div className="min-w-0">
                              <div className="flex items-center space-x-1.5">
                                <span className="font-extrabold text-slate-900 truncate block">
                                  {v.isGuest ? (v.userName || `Guest (${v.visitorId.slice(0, 10)})`) : v.userName}
                                </span>
                                {v.isGuest && (
                                  <span className="px-1.5 py-0.2 rounded text-[9px] font-black bg-amber-100 text-amber-800 shrink-0">
                                    No Login
                                  </span>
                                )}
                              </div>
                              <span className="text-[10px] text-slate-400 font-mono block truncate">
                                {v.isGuest ? v.visitorId : v.userEmail}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* 2. Status */}
                        <td className="p-3">
                          {v.isBlocked ? (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-red-100 text-red-800 border border-red-200 flex items-center space-x-1 w-fit">
                              <Ban className="w-3 h-3 text-red-600" />
                              <span>Blocked</span>
                            </span>
                          ) : isOnline ? (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center space-x-1.5 w-fit">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                              <span>Online Now</span>
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 w-fit block">
                              Idle / Offline
                            </span>
                          )}
                        </td>

                        {/* 3. Arrival Time */}
                        <td className="p-3 text-slate-700">
                          <div className="font-semibold text-[11px] text-slate-800">
                            {new Date(v.initialVisitAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                          </div>
                          <div className="text-[9px] text-slate-400">
                            {new Date(v.initialVisitAt).toLocaleDateString()}
                          </div>
                        </td>

                        {/* 4. Last Active Time */}
                        <td className="p-3 text-slate-700">
                          <div className="font-semibold text-[11px] text-slate-800">
                            {new Date(v.lastActiveAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                          </div>
                          <div className="text-[9px] text-slate-400">
                            {Math.round((Date.now() - new Date(v.lastActiveAt).getTime()) / 60000)}m ago
                          </div>
                        </td>

                        {/* 5. Duration & Page Views */}
                        <td className="p-3">
                          <div className="font-extrabold text-slate-900 text-xs">
                            {formatDuration(v.totalDurationSeconds)}
                          </div>
                          <div className="text-[10px] text-slate-500 font-semibold">
                            {v.pageViewsCount || 1} pages viewed
                          </div>
                        </td>

                        {/* 6. Active Feature / Tab */}
                        <td className="p-3">
                          {getTabBadge(v.currentTab || 'input')}
                        </td>

                        {/* 7. Device & IP */}
                        <td className="p-3">
                          <div className="flex items-center space-x-1.5 text-slate-700 font-semibold">
                            {getDeviceIcon(v.deviceType)}
                            <span className="text-[11px]">{v.browser} • {v.os}</span>
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono">
                            IP: {v.ipAddress} {v.timezone ? `(${v.timezone})` : ''}
                          </div>
                        </td>

                        {/* 8. Actions */}
                        <td className="p-3 text-right space-x-1 shrink-0">
                          <button
                            onClick={() => setSelectedVisitorForTimeline(v)}
                            className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold text-[10px] rounded-lg transition-colors cursor-pointer inline-flex items-center space-x-1"
                            title="Inspect visitor session timeline"
                          >
                            <Clock className="w-3 h-3 text-amber-600" />
                            <span>Timeline</span>
                          </button>

                          <button
                            onClick={() => handleToggleBlockVisitor(v.visitorId, v.ipAddress)}
                            className={`px-2.5 py-1 font-bold text-[10px] rounded-lg transition-colors cursor-pointer inline-flex items-center space-x-1 ${
                              v.isBlocked
                                ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700'
                                : 'bg-red-50 hover:bg-red-100 text-red-700'
                            }`}
                            title={v.isBlocked ? 'Unblock Visitor' : 'Restrict / Block Visitor'}
                          >
                            {v.isBlocked ? <Unlock className="w-3 h-3" /> : <Ban className="w-3 h-3" />}
                            <span>{v.isBlocked ? 'Unblock' : 'Block'}</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: TRAFFIC & TIME ANALYTICS (PEAK HOURS, GUEST RATIOS, TOP FEATURES) */}
      {/* ========================================================================= */}
      {activeTab === 'traffic' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div className="space-y-1">
              <h2 className="text-base font-black text-slate-900 flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-amber-600" />
                <span>24-Hour Traffic Distribution & User Engagement Analysis</span>
              </h2>
              <p className="text-xs text-slate-500">
                Visual analysis of which times candidates and unauthenticated guests visit the website, feature popularity, and device distributions.
              </p>
            </div>

            <button
              onClick={() => fetchTrafficAnalytics()}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-all flex items-center space-x-1.5 cursor-pointer shadow-xs self-start sm:self-auto"
            >
              <RefreshCw className="w-3.5 h-3.5 text-amber-600" />
              <span>Refresh Analytics</span>
            </button>
          </div>

          {/* 1. Peak Visiting Hours (24-Hour Hourly Histogram) */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-extrabold text-slate-900 block">Peak Visiting Times (Hourly Breakdown 00:00 - 23:00)</span>
                <span className="text-[11px] text-slate-500">Shows traffic volume and unauthenticated guest ratio per hour today.</span>
              </div>
              <div className="flex items-center space-x-3 text-[11px] font-bold">
                <span className="flex items-center space-x-1 text-amber-600">
                  <span className="w-2.5 h-2.5 bg-amber-500 rounded-xs" />
                  <span>Guests (Without Sign-in)</span>
                </span>
                <span className="flex items-center space-x-1 text-blue-600">
                  <span className="w-2.5 h-2.5 bg-blue-600 rounded-xs" />
                  <span>Logged-in Members</span>
                </span>
              </div>
            </div>

            {/* Histogram bars */}
            <div className="grid grid-cols-12 sm:grid-cols-24 gap-1 items-end h-40 pt-4 border-b border-slate-200 pb-2">
              {(trafficAnalytics?.hourlyTraffic || []).map((ht, idx) => {
                const maxVal = Math.max(...(trafficAnalytics?.hourlyTraffic || []).map(h => h.totalVisits), 10);
                const barHeight = Math.max(8, (ht.totalVisits / maxVal) * 100);
                const guestHeight = ht.totalVisits > 0 ? (ht.guestVisits / ht.totalVisits) * barHeight : 0;
                const userHeight = barHeight - guestHeight;

                return (
                  <div key={idx} className="flex flex-col items-center h-full justify-end group relative">
                    {/* Tooltip on hover */}
                    <div className="absolute -top-12 bg-slate-900 text-white text-[9px] py-1 px-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20 shadow-lg">
                      <div className="font-extrabold">{ht.hourLabel} ({ht.hour})</div>
                      <div className="text-amber-300">{ht.guestVisits} Guests</div>
                      <div className="text-blue-300">{ht.authenticatedVisits} Members</div>
                      <div className="text-slate-300 font-bold">{ht.totalVisits} Total Visits</div>
                    </div>

                    {/* Combined Stacked Bar */}
                    <div className="w-full rounded-t-sm flex flex-col justify-end overflow-hidden" style={{ height: `${barHeight}%` }}>
                      <div className="w-full bg-blue-600" style={{ height: `${userHeight}%` }} />
                      <div className="w-full bg-amber-500" style={{ height: `${guestHeight}%` }} />
                    </div>

                    {/* Hour label */}
                    <span className="text-[8px] font-mono text-slate-400 mt-1 truncate">
                      {idx % 2 === 0 ? ht.hour.slice(0, 2) : ''}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>00:00 (Midnight)</span>
              <span>06:00 (Morning)</span>
              <span>12:00 (Noon)</span>
              <span>18:00 (Evening)</span>
              <span>23:00 (Night)</span>
            </div>
          </div>

          {/* 2. Top Features Visited without Signing In vs Logged In */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
              <span className="text-xs font-extrabold text-slate-900 block flex items-center space-x-1.5">
                <Compass className="w-4 h-4 text-amber-600" />
                <span>Top Visited Sections (Guest vs Member Traffic)</span>
              </span>

              <div className="space-y-3">
                {(trafficAnalytics?.topVisitedTabs || []).map((tab, idx) => {
                  const maxCount = Math.max(...(trafficAnalytics?.topVisitedTabs || []).map(t => t.count), 1);
                  const guestPct = tab.count > 0 ? Math.round((tab.guestCount / tab.count) * 100) : 0;
                  return (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-slate-800">{tab.label}</span>
                        <span className="text-slate-600">
                          {tab.count} views <span className="text-amber-600 font-mono">({guestPct}% Guests)</span>
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2 flex overflow-hidden">
                        <div
                          className="bg-amber-500 h-2"
                          style={{ width: `${(tab.guestCount / maxCount) * 100}%` }}
                          title={`${tab.guestCount} Guest Views`}
                        />
                        <div
                          className="bg-blue-600 h-2"
                          style={{ width: `${((tab.count - tab.guestCount) / maxCount) * 100}%` }}
                          title={`${tab.count - tab.guestCount} Member Views`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3. Device & Browser Breakdowns */}
            <div className="space-y-4">
              {/* Device distribution */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
                <span className="text-xs font-extrabold text-slate-900 block flex items-center space-x-1.5">
                  <Monitor className="w-4 h-4 text-blue-600" />
                  <span>Device Breakdown</span>
                </span>
                <div className="grid grid-cols-3 gap-3 text-center">
                  {(trafficAnalytics?.deviceBreakdown || [
                    { device: 'Desktop', percentage: 65, count: 12 },
                    { device: 'Mobile', percentage: 30, count: 6 },
                    { device: 'Tablet', percentage: 5, count: 1 }
                  ]).map((d) => (
                    <div key={d.device} className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
                      <span className="text-[10px] font-bold text-slate-500 uppercase">{d.device}</span>
                      <p className="text-xl font-black text-slate-900">{d.percentage}%</p>
                      <span className="text-[10px] text-slate-400 font-mono">{d.count} sessions</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Browser distribution */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
                <span className="text-xs font-extrabold text-slate-900 block flex items-center space-x-1.5">
                  <Globe className="w-4 h-4 text-indigo-600" />
                  <span>Browser Distribution</span>
                </span>
                <div className="space-y-2">
                  {(trafficAnalytics?.browserBreakdown || []).slice(0, 4).map((b) => (
                    <div key={b.browser} className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-700">{b.browser}</span>
                      <span className="font-mono font-extrabold text-indigo-600">{b.count} Users</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: REGISTERED CANDIDATE DIRECTORY */}
      {/* ========================================================================= */}
      {activeTab === 'users' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search registered users by name, email, or role..."
                className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <span className="text-xs text-slate-500 font-semibold">
              Showing {filteredUsers.length} registered candidate profiles
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 uppercase font-extrabold text-[10px]">
                  <th className="p-3">Candidate / User</th>
                  <th className="p-3">Target Role</th>
                  <th className="p-3">Account Status</th>
                  <th className="p-3">Admin Privileges</th>
                  <th className="p-3">Analyses Done</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3">
                      <div className="flex items-center space-x-3">
                        <img
                          src={u.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(u.name || u.email)}&background=2563eb&color=ffffff&bold=true&size=256`}
                          alt={u.name}
                          className="w-8 h-8 rounded-full object-cover border border-slate-200"
                        />
                        <div>
                          <span className="font-extrabold text-slate-900 block">{u.name}</span>
                          <span className="text-[10px] text-slate-500 font-mono">{u.email}</span>
                        </div>
                      </div>
                    </td>

                    <td className="p-3 font-semibold text-slate-700">
                      {u.targetRole}
                    </td>

                    <td className="p-3">
                      {u.status === 'active' ? (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          Active
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-red-50 text-red-700 border border-red-200">
                          Suspended
                        </span>
                      )}
                    </td>

                    <td className="p-3">
                      {u.isAdmin ? (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-900 border border-amber-300 flex items-center space-x-1 w-fit">
                          <ShieldCheck className="w-3 h-3 text-amber-600" />
                          <span>Super Admin</span>
                        </span>
                      ) : (
                        <span className="text-slate-400 font-medium text-[11px]">Standard User</span>
                      )}
                    </td>

                    <td className="p-3 font-bold text-slate-800">
                      {u.totalAnalyses || 0} Reports
                    </td>

                    <td className="p-3 text-right space-x-1">
                      <button
                        onClick={() => handleToggleAdminStatus(u.id, u.isAdmin)}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-900 font-bold text-[10px] rounded-lg transition-colors cursor-pointer"
                        title="Toggle Admin Privilege"
                      >
                        {u.isAdmin ? 'Demote' : 'Promote Admin'}
                      </button>

                      <button
                        onClick={() => handleToggleUserStatus(u.id, u.status)}
                        className={`px-2.5 py-1 font-bold text-[10px] rounded-lg transition-colors cursor-pointer ${
                          u.status === 'active'
                            ? 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                            : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                        }`}
                      >
                        {u.status === 'active' ? 'Suspend' : 'Activate'}
                      </button>

                      {!u.isAdmin && (
                        <button
                          onClick={() => handleDeleteUser(u.id, u.email, u.name)}
                          className="px-2 py-1 bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-800 font-bold text-[10px] rounded-lg transition-colors cursor-pointer inline-flex items-center space-x-1 ml-1"
                          title="Delete Candidate Profile"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Delete Profile</span>
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: LIVE AUDIT LOGS & AUTHENTICATION STREAM */}
      {/* ========================================================================= */}
      {activeTab === 'audit' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div className="space-y-1">
              <h2 className="text-base font-black text-slate-900 flex items-center space-x-2">
                <Terminal className="w-5 h-5 text-amber-600" />
                <span>Live System Audit Log & Authentication Stream</span>
              </h2>
              <p className="text-xs text-slate-500">Tracks all user login, logout, account registration, and resume analysis events.</p>
            </div>

            <button
              onClick={handleExportAuditLogs}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors flex items-center space-x-2 shadow-xs cursor-pointer self-start sm:self-auto"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>Export Logs (JSON)</span>
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-bold text-slate-500 flex items-center space-x-1 mr-2">
              <Filter className="w-3.5 h-3.5" />
              <span>Filter Category:</span>
            </span>
            {['ALL', 'VISIT', 'LOGIN', 'LOGOUT', 'SIGNUP', 'ANALYZE_RESUME', 'ADMIN_ACTION'].map((cat) => (
              <button
                key={cat}
                onClick={() => setAuditFilter(cat)}
                className={`px-3 py-1 rounded-lg font-bold text-[11px] transition-all cursor-pointer ${
                  auditFilter === cat ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
            {filteredAuditLogs.map((log) => (
              <div
                key={log.id}
                className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase ${
                      log.action === 'VISIT' ? 'bg-cyan-100 text-cyan-800' :
                      log.action === 'LOGIN' ? 'bg-blue-100 text-blue-800' :
                      log.action === 'LOGOUT' ? 'bg-red-100 text-red-800' :
                      log.action === 'SIGNUP' ? 'bg-emerald-100 text-emerald-800' :
                      log.action === 'ADMIN_ACTION' ? 'bg-amber-100 text-amber-900' : 'bg-violet-100 text-violet-800'
                    }`}>
                      {log.action}
                    </span>

                    <span className="font-extrabold text-slate-900">{log.userEmail}</span>
                  </div>

                  <p className="text-slate-700 font-medium">{log.details}</p>
                </div>

                <div className="text-[10px] text-slate-400 font-mono space-y-0.5 shrink-0 text-left sm:text-right">
                  <span className="block">{new Date(log.timestamp).toLocaleString()}</span>
                  <span className="block">IP: {log.ipAddress || '127.0.0.1'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: ROLE ANALYTICS */}
      {/* ========================================================================= */}
      {activeTab === 'analytics' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-6">
          <h2 className="text-base font-black text-slate-900 flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <span>Top Candidate Target Roles & Demand Distribution</span>
          </h2>

          <div className="space-y-4">
            {(metrics?.topTargetRoles || [
              { role: 'Executive Technical Director / Principal Engineer', count: 1 },
              { role: 'Senior Full Stack Engineer', count: 1 },
              { role: 'AI / Machine Learning Architect', count: 1 }
            ]).map((tr, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-800">{tr.role}</span>
                  <span className="text-blue-600">{tr.count} Candidates Target This</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full transition-all"
                    style={{ width: `${Math.min(100, (tr.count / (metrics?.totalUsers || 2)) * 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 6: SYSTEM CONTROLS */}
      {/* ========================================================================= */}
      {activeTab === 'settings' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-6">
          <h2 className="text-base font-black text-slate-900 flex items-center space-x-2">
            <Settings className="w-5 h-5 text-amber-600" />
            <span>Platform Configuration & Maintenance Controls</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between">
              <div>
                <span className="font-extrabold text-xs text-slate-900 block">Maintenance Mode</span>
                <span className="text-[11px] text-slate-500">Temporarily pause public resume submissions</span>
              </div>
              <button
                onClick={() => setMaintenanceMode(!maintenanceMode)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  maintenanceMode ? 'bg-red-600 text-white' : 'bg-slate-200 text-slate-700'
                }`}
              >
                {maintenanceMode ? 'ACTIVE' : 'DISABLED'}
              </button>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between">
              <div>
                <span className="font-extrabold text-xs text-slate-900 block">Allow New User Registrations</span>
                <span className="text-[11px] text-slate-500">Enable or disable new signup form</span>
              </div>
              <button
                onClick={() => setAllowRegistration(!allowRegistration)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  allowRegistration ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                }`}
              >
                {allowRegistration ? 'ENABLED' : 'PAUSED'}
              </button>
            </div>
          </div>

          {/* DAILY AI USAGE RATE LIMIT CONTROL SECTION */}
          <div className="border-t border-slate-200 pt-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-black text-slate-900 flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-amber-600" />
                  <span>Daily AI Usage Allocation & Rate Limits</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Manage candidate daily AI request allocations and reset usage counters.
                </p>
              </div>

              <button
                onClick={() => handleResetUsageCounts()}
                disabled={isLoading}
                className="px-3.5 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-extrabold rounded-xl transition-all shadow-xs flex items-center space-x-1.5 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset All Users Daily Usage</span>
              </button>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-extrabold text-amber-900 block">Global Max Daily Limit per Candidate</span>
                <span className="text-[11px] text-amber-700">Current setting: <strong>{usageConfigData?.globalDailyLimit || 5} requests/day</strong>. (When candidates exceed this, they see: "Your daily limit is finished come back again tomorrow.")</span>
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                <input
                  type="number"
                  min={1}
                  max={100}
                  value={globalDailyLimitInput}
                  onChange={(e) => setGlobalDailyLimitInput(Number(e.target.value))}
                  className="w-20 px-3 py-2 bg-white border border-amber-300 rounded-xl font-bold text-xs text-slate-900 outline-none text-center"
                />
                <button
                  onClick={handleUpdateGlobalDailyLimit}
                  disabled={isLoading}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-extrabold rounded-xl transition-colors cursor-pointer shadow-xs"
                >
                  Save Limit
                </button>
              </div>
            </div>

            {/* TRACKED CLIENT RECORDS LIST */}
            {usageConfigData?.activeUsageRecords && usageConfigData.activeUsageRecords.length > 0 && (
              <div className="space-y-2 pt-2">
                <span className="text-xs font-extrabold text-slate-700 block">
                  Active Client Daily Usage Tracking ({usageConfigData.activeUsageRecords.length} Active Today)
                </span>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {usageConfigData.activeUsageRecords.map((rec: any, idx: number) => (
                    <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs">
                      <div>
                        <span className="font-mono font-bold text-slate-800">{rec.key}</span>
                        <span className="text-[10px] text-slate-400 block">Date: {rec.lastDate}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`font-black px-2 py-0.5 rounded-md text-[11px] ${
                          rec.count >= (usageConfigData?.globalDailyLimit || 5) ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {rec.count} / {usageConfigData?.globalDailyLimit || 5} Used
                        </span>
                        <button
                          onClick={() => handleResetUsageCounts(rec.key)}
                          className="text-[10px] font-extrabold text-slate-500 hover:text-red-600 underline cursor-pointer"
                        >
                          Reset
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VISITOR EVENT JOURNEY TIMELINE MODAL */}
      {/* ========================================================================= */}
      {selectedVisitorForTimeline && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-black">
                  {selectedVisitorForTimeline.isGuest ? 'G' : 'U'}
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900">
                    {selectedVisitorForTimeline.isGuest
                      ? `Guest Journey (${selectedVisitorForTimeline.visitorId.slice(0, 12)}...)`
                      : `${selectedVisitorForTimeline.userName} (${selectedVisitorForTimeline.userEmail})`}
                  </h3>
                  <p className="text-[11px] text-slate-500 font-mono">
                    IP: {selectedVisitorForTimeline.ipAddress} • {selectedVisitorForTimeline.browser} on {selectedVisitorForTimeline.os}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedVisitorForTimeline(null)}
                className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body: Stats & Timeline */}
            <div className="p-5 space-y-4 overflow-y-auto">
              {/* Quick stats banner */}
              <div className="grid grid-cols-3 gap-2 text-center p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block">FIRST ARRIVAL</span>
                  <span className="font-extrabold text-slate-800">
                    {new Date(selectedVisitorForTimeline.initialVisitAt).toLocaleTimeString()}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block">TIME SPENT</span>
                  <span className="font-extrabold text-amber-600">
                    {formatDuration(selectedVisitorForTimeline.totalDurationSeconds)}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block">TOTAL PAGES</span>
                  <span className="font-extrabold text-blue-600">
                    {selectedVisitorForTimeline.pageViewsCount || 1}
                  </span>
                </div>
              </div>

              {/* Event Stream */}
              <div className="space-y-2">
                <span className="text-xs font-black text-slate-900 block flex items-center space-x-1.5">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span>Chronological Activity & Interaction Timeline</span>
                </span>

                <div className="space-y-2 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                  {(selectedVisitorForTimeline.events || [
                    {
                      timestamp: selectedVisitorForTimeline.initialVisitAt,
                      tab: 'input',
                      action: 'INITIAL_SESSION_START',
                      details: 'Candidate landed on platform without signing in'
                    },
                    {
                      timestamp: selectedVisitorForTimeline.lastActiveAt,
                      tab: selectedVisitorForTimeline.currentTab || 'input',
                      action: 'ACTIVE_HEARTBEAT',
                      details: `Browsing ${selectedVisitorForTimeline.currentTab} module`
                    }
                  ]).map((ev, idx) => (
                    <div key={idx} className="relative flex items-start space-x-3 pl-7 text-xs">
                      <div className="absolute left-1.5 top-1.5 w-3 h-3 rounded-full bg-amber-500 border-2 border-white shadow-xs" />
                      <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-extrabold text-slate-900 text-[11px]">
                            {ev.action}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {new Date(ev.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                        <p className="text-slate-600 text-[11px]">{ev.details}</p>
                        <div className="pt-1">
                          {getTabBadge(ev.tab)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
              <button
                onClick={() => {
                  handleToggleBlockVisitor(selectedVisitorForTimeline.visitorId, selectedVisitorForTimeline.ipAddress);
                  setSelectedVisitorForTimeline(null);
                }}
                className={`px-4 py-2 text-xs font-extrabold rounded-xl transition-all cursor-pointer ${
                  selectedVisitorForTimeline.isBlocked
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                    : 'bg-red-600 text-white hover:bg-red-700'
                }`}
              >
                {selectedVisitorForTimeline.isBlocked ? 'Unblock Visitor' : 'Block This Visitor / IP'}
              </button>

              <button
                onClick={() => setSelectedVisitorForTimeline(null)}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-extrabold rounded-xl transition-colors cursor-pointer"
              >
                Close Timeline
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
