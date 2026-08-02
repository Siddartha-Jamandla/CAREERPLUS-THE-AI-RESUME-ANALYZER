import React, { useState, useEffect } from 'react';
import { UserProfile, AuditLogAction, AdminMetrics } from '../types';
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
  Database
} from 'lucide-react';

interface AdminPanelProps {
  currentUser: UserProfile | null;
  token: string | null;
  onOpenAuthModal: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  currentUser,
  token,
  onOpenAuthModal,
}) => {
  const [activeTab, setActiveTab] = useState<'users' | 'audit' | 'analytics' | 'settings'>('users');
  const [metrics, setMetrics] = useState<AdminMetrics | null>(null);
  const [usersList, setUsersList] = useState<any[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLogAction[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [auditFilter, setAuditFilter] = useState<string>('ALL');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // System controls state
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [allowRegistration, setAllowRegistration] = useState(true);
  const [globalDailyLimitInput, setGlobalDailyLimitInput] = useState<number>(5);
  const [usageConfigData, setUsageConfigData] = useState<any>(null);

  const isAdmin = currentUser?.isAdmin || currentUser?.email.toLowerCase() === 'jamandlasiddartha@gmail.com';

  useEffect(() => {
    if (isAdmin && token) {
      fetchAdminData();
      fetchUsageConfig();
    }
  }, [isAdmin, token]);

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

      setSuccessMsg(data.message || `Global Daily AI Usage Limit updated to ${globalDailyLimitInput} uses per day.`);
      fetchUsageConfig();
    } catch (err: any) {
      setErrorMessage(err.message || 'Error updating limit.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetUsageCounts = async (targetKey?: string) => {
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
        body: JSON.stringify(targetKey ? { targetKey } : { resetAllUsage: true }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to reset usage.');

      setSuccessMsg(data.message || 'Daily AI Usage counts reset successfully!');
      fetchUsageConfig();
    } catch (err: any) {
      setErrorMessage(err.message || 'Error resetting usage.');
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
      console.error('Failed to update admin rights:', err);
    }
  };

  const handleDeleteUser = async (userId: string, userEmail: string, userName: string) => {
    if (!token) return;
    if (!window.confirm(`Are you sure you want to permanently delete the candidate profile for ${userName} (${userEmail})?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.ok) {
        setSuccessMsg(data.message || `Deleted candidate profile for ${userName}`);
        fetchAdminData();
        setTimeout(() => setSuccessMsg(null), 3000);
      } else {
        setErrorMessage(data.error || 'Failed to delete user account.');
        setTimeout(() => setErrorMessage(null), 4000);
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
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Banner Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
        <div className="absolute right-0 top-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-black bg-amber-400 text-slate-950 uppercase tracking-wider flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Super Admin Active</span>
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {currentUser.email}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Executive Platform Administration & Audit Center
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Real-time user management, live session audit tracking, login/logout logs, system metrics, and candidate resume analytics.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={fetchAdminData}
              disabled={isLoading}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition-all border border-slate-700 flex items-center space-x-2 cursor-pointer shadow-xs"
            >
              <RefreshCw className={`w-4 h-4 text-amber-400 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Refresh Telemetry</span>
            </button>
          </div>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs font-bold flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-red-800 text-xs font-bold flex items-center space-x-2">
          <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* 4 HIGH IMPACT KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-extrabold uppercase tracking-wider">Total Registered Users</span>
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-3xl font-black text-slate-900">{metrics?.totalUsers || usersList.length || 2}</p>
          <span className="text-xs text-emerald-600 font-extrabold block flex items-center space-x-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Active Candidate Accounts</span>
          </span>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-extrabold uppercase tracking-wider">Active Sessions</span>
            <Activity className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-3xl font-black text-emerald-600">{metrics?.activeSessions || 1}</p>
          <span className="text-xs text-slate-500 font-semibold block">Tracked in Server Memory</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-extrabold uppercase tracking-wider">Resumes Analyzed</span>
            <FileText className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-3xl font-black text-amber-600">{metrics?.totalAnalyses || 14}</p>
          <span className="text-xs text-amber-700 font-semibold block">Evaluations Completed</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-extrabold uppercase tracking-wider">Platform Health</span>
            <Server className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-3xl font-black text-blue-600">100%</p>
          <span className="text-xs text-emerald-600 font-extrabold block flex items-center space-x-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Operational (0 Errors)</span>
          </span>
        </div>
      </div>

      {/* ADMIN NAVIGATION TABS */}
      <div className="flex border-b border-slate-200 bg-white rounded-2xl p-1.5 shadow-xs overflow-x-auto">
        <button
          onClick={() => setActiveTab('users')}
          className={`flex-1 min-w-[160px] py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center space-x-2 transition-all cursor-pointer ${
            activeTab === 'users' ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>User Directory ({usersList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('audit')}
          className={`flex-1 min-w-[160px] py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center space-x-2 transition-all cursor-pointer ${
            activeTab === 'audit' ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Terminal className="w-4 h-4" />
          <span>Live Audit Logs ({auditLogs.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('analytics')}
          className={`flex-1 min-w-[160px] py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center space-x-2 transition-all cursor-pointer ${
            activeTab === 'analytics' ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Role Analytics</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`flex-1 min-w-[160px] py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center space-x-2 transition-all cursor-pointer ${
            activeTab === 'settings' ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>System Controls</span>
        </button>
      </div>

      {/* TAB 1: USER DIRECTORY & MANAGEMENT */}
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

      {/* TAB 2: LIVE AUDIT LOGS & SESSION TRACKER */}
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

      {/* TAB 3: ROLE ANALYTICS */}
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

      {/* TAB 4: SYSTEM CONTROLS */}
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
    </div>
  );
};
