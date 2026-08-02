import React, { useState, useEffect } from 'react';
import { 
  Briefcase, 
  Plus, 
  Trash2, 
  ExternalLink, 
  Edit3, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  DollarSign, 
  Building, 
  ChevronRight,
  Sparkles,
  FileText
} from 'lucide-react';
import { JobApplicationItem, ResumeAnalysisResult } from '../types';

interface JobTrackerBoardProps {
  analysis?: ResumeAnalysisResult;
  targetRole?: string;
}

const STORAGE_KEY = 'career_pulse_job_applications';

export const JobTrackerBoard: React.FC<JobTrackerBoardProps> = ({
  analysis,
  targetRole = 'Software Engineer',
}) => {
  const [applications, setApplications] = useState<JobApplicationItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [
      {
        id: '1',
        jobTitle: targetRole,
        companyName: 'TechCorp Solutions',
        location: 'Remote',
        salary: '$130,000 - $160,000',
        status: 'Applied',
        appliedDate: new Date().toISOString().split('T')[0],
        notes: 'Submitted resume via company portal. Followed up on LinkedIn with Engineering Manager.',
        applyUrl: 'https://linkedin.com'
      },
      {
        id: '2',
        jobTitle: `Senior ${targetRole}`,
        companyName: 'Innovate Systems',
        location: 'Hybrid / SF',
        salary: '$150,000 + Equity',
        status: 'Interviewing',
        appliedDate: new Date(Date.now() - 86400000 * 5).toISOString().split('T')[0],
        notes: 'Technical screen passed. Onsite panel scheduled for next Tuesday.',
        applyUrl: 'https://google.com'
      }
    ];
  });

  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>(targetRole);
  const [newCompany, setNewCompany] = useState<string>('');
  const [newLocation, setNewLocation] = useState<string>('Remote');
  const [newSalary, setNewSalary] = useState<string>('');
  const [newStatus, setNewStatus] = useState<JobApplicationItem['status']>('Saved');
  const [newNotes, setNewNotes] = useState<string>('');
  const [newApplyUrl, setNewApplyUrl] = useState<string>('');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
    } catch (e) {
      console.error(e);
    }
  }, [applications]);

  const handleAddJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompany.trim() || !newTitle.trim()) return;

    const newItem: JobApplicationItem = {
      id: Date.now().toString(),
      jobTitle: newTitle,
      companyName: newCompany,
      location: newLocation || 'Remote',
      salary: newSalary || 'Undisclosed',
      status: newStatus,
      appliedDate: new Date().toISOString().split('T')[0],
      notes: newNotes,
      applyUrl: newApplyUrl,
    };

    setApplications([newItem, ...applications]);
    setShowAddModal(false);
    setNewCompany('');
    setNewSalary('');
    setNewNotes('');
    setNewApplyUrl('');
  };

  const handleStatusChange = (id: string, newStat: JobApplicationItem['status']) => {
    setApplications(
      applications.map((app) => (app.id === id ? { ...app, status: newStat } : app))
    );
  };

  const handleDeleteJob = (id: string) => {
    setApplications(applications.filter((app) => app.id !== id));
  };

  const columns: { status: JobApplicationItem['status']; label: string; color: string }[] = [
    { status: 'Saved', label: 'Bookmarked / Draft', color: 'bg-slate-100 text-slate-800 border-slate-200' },
    { status: 'Applied', label: 'Application Sent', color: 'bg-blue-50 text-blue-800 border-blue-200' },
    { status: 'Screening', label: 'Recruiter Call', color: 'bg-purple-50 text-purple-800 border-purple-200' },
    { status: 'Interviewing', label: 'Technical & Panel', color: 'bg-amber-50 text-amber-800 border-amber-200' },
    { status: 'Offer', label: 'Offer Received 🎉', color: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-blue-600 text-xs font-bold uppercase tracking-wider mb-1">
            <Briefcase className="w-4 h-4" />
            <span>Job Application Tracker & Pipeline CRM</span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Application Command Center
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Track your job applications, interview stages, offer details, and recruiter notes with persistent storage.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-full transition-all shadow-xs flex items-center space-x-1.5 shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Track New Job</span>
        </button>
      </div>

      {/* Add Job Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xl max-w-md w-full space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-slate-900 text-base">Add Job Application to Tracker</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddJob} className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1">Job Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1">Company Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Stripe, Google, Airbnb"
                  value={newCompany}
                  onChange={(e) => setNewCompany(e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1">Location</label>
                  <input
                    type="text"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full p-2 border border-slate-200 rounded-lg text-xs text-slate-900"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1">Salary / Range</label>
                  <input
                    type="text"
                    placeholder="e.g. $140,000"
                    value={newSalary}
                    onChange={(e) => setNewSalary(e.target.value)}
                    className="w-full p-2 border border-slate-200 rounded-lg text-xs text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1">Stage Status</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as any)}
                  className="w-full p-2 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 bg-white"
                >
                  <option value="Saved">Saved / Draft</option>
                  <option value="Applied">Applied</option>
                  <option value="Screening">Recruiter Screening</option>
                  <option value="Interviewing">Interviewing</option>
                  <option value="Offer">Offer Received</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1">Apply URL / Portal Link</label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={newApplyUrl}
                  onChange={(e) => setNewApplyUrl(e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-lg text-xs text-slate-900"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1">Notes & Follow-ups</label>
                <textarea
                  rows={3}
                  placeholder="Recruiter contact, interview dates, key requirements..."
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-lg text-xs text-slate-900"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl cursor-pointer"
                >
                  Save Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Kanban Stages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto pb-4">
        {columns.map((col) => {
          const colApps = applications.filter((app) => app.status === col.status);
          return (
            <div key={col.status} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col justify-between min-h-[400px]">
              <div className="space-y-3">
                <div className={`p-2.5 rounded-xl border font-bold text-xs flex items-center justify-between ${col.color}`}>
                  <span>{col.label}</span>
                  <span className="w-5 h-5 rounded-full bg-white/80 text-slate-900 text-[11px] font-black flex items-center justify-center">
                    {colApps.length}
                  </span>
                </div>

                <div className="space-y-3">
                  {colApps.map((app) => (
                    <div
                      key={app.id}
                      className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-2xs space-y-2 hover:border-blue-400 transition-all"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-extrabold text-slate-900 text-xs">{app.jobTitle}</h4>
                          <span className="text-[11px] font-bold text-slate-600 flex items-center space-x-1">
                            <Building className="w-3 h-3 text-slate-400" />
                            <span>{app.companyName}</span>
                          </span>
                        </div>
                        <button
                          onClick={() => handleDeleteJob(app.id)}
                          className="text-slate-300 hover:text-rose-600 p-0.5 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] text-slate-500 space-y-1 pt-1 border-t border-slate-100">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center space-x-1">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            <span>{app.location}</span>
                          </span>
                          <span className="font-bold text-emerald-700">{app.salary}</span>
                        </div>
                      </div>

                      {app.notes && (
                        <p className="text-[11px] text-slate-600 bg-slate-50 p-2 rounded-lg italic leading-tight">
                          "{app.notes}"
                        </p>
                      )}

                      {/* Status Selector Switcher */}
                      <div className="flex items-center justify-between pt-1">
                        <select
                          value={app.status}
                          onChange={(e) => handleStatusChange(app.id, e.target.value as any)}
                          className="text-[10px] font-bold bg-slate-100 border border-slate-200 rounded-md p-1 text-slate-700 cursor-pointer"
                        >
                          <option value="Saved">Move to Saved</option>
                          <option value="Applied">Move to Applied</option>
                          <option value="Screening">Move to Screening</option>
                          <option value="Interviewing">Move to Interviewing</option>
                          <option value="Offer">Move to Offer</option>
                          <option value="Rejected">Move to Rejected</option>
                        </select>

                        {app.applyUrl && (
                          <a
                            href={app.applyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 p-1"
                          >
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}

                  {colApps.length === 0 && (
                    <div className="border border-dashed border-slate-200 rounded-xl p-4 text-center text-slate-400 text-xs">
                      No applications
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
