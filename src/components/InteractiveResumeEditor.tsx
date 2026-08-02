import React, { useState } from 'react';
import { FileText, Download, Copy, Check, Sparkles, Plus, Trash2, Edit3, Save, Eye, Layout, ShieldCheck, Award } from 'lucide-react';
import { ResumeAnalysisResult } from '../types';

interface InteractiveResumeEditorProps {
  analysis: ResumeAnalysisResult;
  targetRole: string;
}

type TemplateType = 'modern' | 'harvard' | 'minimalist' | 'tech';

interface TemplateOption {
  id: TemplateType;
  name: string;
  tagline: string;
  badge: string;
  badgeColor: string;
  description: string;
  fontFamily: string;
  headerStyle: string;
  sectionHeaderStyle: string;
}

const ATS_TEMPLATES: TemplateOption[] = [
  {
    id: 'modern',
    name: 'Modern Executive',
    tagline: 'Sleek & Professional',
    badge: '98% ATS Score',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
    description: 'Clean single-column layout with navy accent lines, high-scannability headers, and structured bullet spacing.',
    fontFamily: 'font-sans',
    headerStyle: 'border-b-2 border-blue-600 pb-3 text-center',
    sectionHeaderStyle: 'text-blue-900 border-b-2 border-blue-600 pb-1 font-bold uppercase tracking-wider text-[11px]'
  },
  {
    id: 'harvard',
    name: 'Harvard Classic',
    tagline: 'Traditional & Formal',
    badge: 'Standard Corporate',
    badgeColor: 'bg-slate-100 text-slate-800 border-slate-300',
    description: 'Timeless serif typography modeled after Ivy League career guidelines. Maximum parser compatibility.',
    fontFamily: 'font-serif',
    headerStyle: 'border-b-2 border-slate-900 pb-3 text-center',
    sectionHeaderStyle: 'text-slate-900 border-b-2 border-slate-800 pb-1 font-bold uppercase tracking-widest text-[11px]'
  },
  {
    id: 'minimalist',
    name: 'Clean Minimalist',
    tagline: 'Monochrome & Crisp',
    badge: 'High Readability',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    description: 'Ultra-clean spacing without visual clutter. Uses pills for core competencies and subtle horizontal rules.',
    fontFamily: 'font-sans',
    headerStyle: 'pb-3 text-left border-b border-slate-200',
    sectionHeaderStyle: 'text-slate-800 border-b border-slate-300 pb-1 font-extrabold uppercase tracking-wide text-[11px]'
  },
  {
    id: 'tech',
    name: 'Tech Specialist',
    tagline: 'Developer & Data Focus',
    badge: 'Engineering Grade',
    badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    description: 'Tailored for software engineers, product managers, and data scientists. Highlights skills in structured tag blocks.',
    fontFamily: 'font-sans',
    headerStyle: 'bg-slate-900 text-white p-4 rounded-xl text-left border-l-4 border-indigo-500',
    sectionHeaderStyle: 'text-indigo-900 border-b-2 border-indigo-500 pb-1 font-black uppercase tracking-wider text-[11px]'
  }
];

export const InteractiveResumeEditor: React.FC<InteractiveResumeEditorProps> = ({
  analysis,
  targetRole,
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>('modern');

  const [candidateName, setCandidateName] = useState<string>(analysis.extractedDetails.candidateName || 'John Doe');
  const [currentRoleTitle, setCurrentRoleTitle] = useState<string>(analysis.extractedDetails.currentRole || targetRole);
  const [executiveSummary, setExecutiveSummary] = useState<string>(
    `Results-driven ${analysis.extractedDetails.currentRole || 'professional'} with ${analysis.extractedDetails.yearsExperience} of hands-on experience in ${analysis.extractedDetails.detectedSkills.slice(0, 4).join(', ')}. Seeking to leverage core technical competencies for the ${targetRole} position.`
  );
  
  const [skillsList, setSkillsList] = useState<string[]>([
    ...analysis.extractedDetails.detectedSkills,
    ...analysis.skillGapAnalysis.missingCriticalSkills.map(s => s.skill)
  ]);
  const [newSkillInput, setNewSkillInput] = useState<string>('');

  const [bullets, setBullets] = useState<string[]>(
    analysis.bulletPointEnhancements.map(b => b.improvedBullet)
  );
  const [newBulletInput, setNewBulletInput] = useState<string>('');
  
  const [copied, setCopied] = useState<boolean>(false);

  const activeTemplateObj = ATS_TEMPLATES.find(t => t.id === selectedTemplate) || ATS_TEMPLATES[0];

  const handleAddSkill = () => {
    if (newSkillInput.trim() && !skillsList.includes(newSkillInput.trim())) {
      setSkillsList([...skillsList, newSkillInput.trim()]);
      setNewSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkillsList(skillsList.filter(s => s !== skillToRemove));
  };

  const handleAddBullet = () => {
    if (newBulletInput.trim()) {
      setBullets([...bullets, newBulletInput.trim()]);
      setNewBulletInput('');
    }
  };

  const handleRemoveBullet = (index: number) => {
    setBullets(bullets.filter((_, idx) => idx !== index));
  };

  const generateFullResumeText = () => {
    return `${candidateName.toUpperCase()}
${currentRoleTitle} | Target Role: ${targetRole}
Layout Template: ${activeTemplateObj.name}
--------------------------------------------------------------------------------

EXECUTIVE SUMMARY
${executiveSummary}

CORE COMPETENCIES & SKILLS
${skillsList.join(' • ')}

KEY PROFESSIONAL ACHIEVEMENTS & EXPERIENCE
${bullets.map(b => `• ${b}`).join('\n')}

EDUCATION & QUALIFICATIONS
${analysis.extractedDetails.education.map(e => `• ${e}`).join('\n')}
`;
  };

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(generateFullResumeText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadTxt = () => {
    const element = document.createElement('a');
    const file = new Blob([generateFullResumeText()], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${candidateName.replace(/\s+/g, '_')}_${selectedTemplate.toUpperCase()}_Resume.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-blue-600 text-xs font-bold uppercase tracking-wider mb-1">
            <Edit3 className="w-4 h-4" />
            <span>Interactive Live Resume Builder</span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Apply ATS Layout Templates & Export Resume
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Choose from ATS-optimized layout templates, edit resume sections in real-time, and download formatted text.
          </p>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={handleCopyMarkdown}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-full transition-colors flex items-center space-x-1.5 cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied Text' : 'Copy Text'}</span>
          </button>
          <button
            onClick={handleDownloadTxt}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-full transition-colors flex items-center space-x-1.5 cursor-pointer shadow-xs"
          >
            <Download className="w-4 h-4" />
            <span>Download .TXT</span>
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* SECTION: ATS TEMPLATE SELECTION BAR                       */}
      {/* ========================================================= */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2">
            <Layout className="w-5 h-5 text-blue-600" />
            <h3 className="font-extrabold text-slate-900 text-sm tracking-tight">
              Select ATS-Friendly Resume Layout Template
            </h3>
          </div>
          <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
            4 Templates Available
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {ATS_TEMPLATES.map((tmpl) => {
            const isSelected = selectedTemplate === tmpl.id;
            return (
              <button
                key={tmpl.id}
                type="button"
                onClick={() => setSelectedTemplate(tmpl.id)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-3 relative ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/50 shadow-sm ring-2 ring-blue-500/20'
                    : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50'
                }`}
              >
                {isSelected && (
                  <span className="absolute top-3 right-3 p-1 bg-blue-600 text-white rounded-full">
                    <Check className="w-3 h-3" />
                  </span>
                )}

                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-md border ${tmpl.badgeColor}`}>
                      {tmpl.badge}
                    </span>
                  </div>
                  <h4 className="font-extrabold text-sm text-slate-900">{tmpl.name}</h4>
                  <p className="text-[11px] font-medium text-slate-500 mb-1.5">{tmpl.tagline}</p>
                  <p className="text-[11px] text-slate-600 leading-relaxed">{tmpl.description}</p>
                </div>

                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px] font-bold text-slate-500">
                  <span>ATS Safe</span>
                  <span className={isSelected ? 'text-blue-700 font-extrabold' : 'text-slate-400'}>
                    {isSelected ? 'Active Template' : 'Click to Apply'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Editor Controls Column */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider text-xs border-b border-slate-100 pb-2">
              Basic Candidate Info
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1">Candidate Name</label>
                <input
                  type="text"
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-lg text-xs font-bold text-slate-900"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1">Current Role Title</label>
                <input
                  type="text"
                  value={currentRoleTitle}
                  onChange={(e) => setCurrentRoleTitle(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-lg text-xs text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1">Executive Summary Statement</label>
              <textarea
                rows={3}
                value={executiveSummary}
                onChange={(e) => setExecutiveSummary(e.target.value)}
                className="w-full p-2.5 border border-slate-200 rounded-lg text-xs text-slate-900 leading-relaxed"
              />
            </div>
          </div>

          {/* Core Skills Management */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider text-xs border-b border-slate-100 pb-2">
              Core Technical Competencies ({skillsList.length})
            </h3>

            <div className="flex space-x-2">
              <input
                type="text"
                value={newSkillInput}
                onChange={(e) => setNewSkillInput(e.target.value)}
                placeholder="Add new skill (e.g., Docker, Kubernetes)..."
                className="flex-1 p-2 border border-slate-200 rounded-lg text-xs"
              />
              <button
                onClick={handleAddSkill}
                className="px-3 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto p-1">
              {skillsList.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 bg-slate-100 border border-slate-200 text-slate-800 text-xs font-medium rounded-full flex items-center space-x-1.5"
                >
                  <span>{skill}</span>
                  <button onClick={() => handleRemoveSkill(skill)} className="text-slate-400 hover:text-rose-600 cursor-pointer">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Work Experience Bullets Management */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider text-xs border-b border-slate-100 pb-2">
              Key Metric-Driven Bullet Points
            </h3>

            <div className="space-y-3">
              {bullets.map((b, idx) => (
                <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <textarea
                      rows={2}
                      value={b}
                      onChange={(e) => {
                        const newB = [...bullets];
                        newB[idx] = e.target.value;
                        setBullets(newB);
                      }}
                      className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs text-slate-800 leading-relaxed"
                    />
                    <button
                      onClick={() => handleRemoveBullet(idx)}
                      className="text-slate-400 hover:text-rose-600 p-1 shrink-0 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex space-x-2 pt-2">
              <input
                type="text"
                value={newBulletInput}
                onChange={(e) => setNewBulletInput(e.target.value)}
                placeholder="Add custom bullet point..."
                className="flex-1 p-2 border border-slate-200 rounded-lg text-xs"
              />
              <button
                onClick={handleAddBullet}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 cursor-pointer"
              >
                Add Bullet
              </button>
            </div>
          </div>
        </div>

        {/* Live Resume Sheet Preview Column */}
        <div className="lg:col-span-6">
          <div className="bg-white border border-slate-300 rounded-2xl p-8 shadow-md space-y-6 sticky top-20">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div className="flex items-center space-x-2">
                <Eye className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Live Preview • {activeTemplateObj.name}
                </span>
              </div>
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${activeTemplateObj.badgeColor}`}>
                {activeTemplateObj.badge}
              </span>
            </div>

            {/* Resume Sheet rendered dynamically based on selected template */}
            <div className={`space-y-5 text-slate-900 text-xs ${activeTemplateObj.fontFamily}`}>
              
              {/* Header based on Template */}
              {selectedTemplate === 'tech' ? (
                <div className={activeTemplateObj.headerStyle}>
                  <h1 className="text-xl font-black uppercase tracking-tight text-white">{candidateName}</h1>
                  <p className="text-indigo-200 font-bold text-xs mt-0.5">{currentRoleTitle} • Target: {targetRole}</p>
                </div>
              ) : selectedTemplate === 'minimalist' ? (
                <div className={activeTemplateObj.headerStyle}>
                  <h1 className="text-2xl font-black tracking-tight text-slate-900">{candidateName}</h1>
                  <p className="text-slate-500 font-bold text-xs mt-0.5">{currentRoleTitle} | Target Role: {targetRole}</p>
                </div>
              ) : selectedTemplate === 'harvard' ? (
                <div className={activeTemplateObj.headerStyle}>
                  <h1 className="text-2xl font-extrabold uppercase tracking-widest text-slate-900">{candidateName}</h1>
                  <p className="text-slate-700 italic font-medium text-xs mt-1">{currentRoleTitle} • Target Role: {targetRole}</p>
                </div>
              ) : (
                /* Modern Executive Default */
                <div className={activeTemplateObj.headerStyle}>
                  <h1 className="text-xl font-black uppercase tracking-tight text-slate-900">{candidateName}</h1>
                  <p className="text-blue-700 font-bold mt-0.5">{currentRoleTitle} • Target Role: {targetRole}</p>
                </div>
              )}

              {/* Executive Summary Section */}
              <div>
                <h2 className={activeTemplateObj.sectionHeaderStyle}>
                  Executive Summary
                </h2>
                <p className="text-slate-700 leading-relaxed text-xs mt-2">{executiveSummary}</p>
              </div>

              {/* Technical & Domain Competencies */}
              <div>
                <h2 className={activeTemplateObj.sectionHeaderStyle}>
                  Technical & Core Competencies
                </h2>
                {selectedTemplate === 'tech' ? (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {skillsList.map((sk, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 font-mono text-[11px] font-bold rounded-md">
                        {sk}
                      </span>
                    ))}
                  </div>
                ) : selectedTemplate === 'minimalist' ? (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {skillsList.map((sk, idx) => (
                      <span key={idx} className="px-2.5 py-0.5 bg-slate-100 border border-slate-200 text-slate-800 text-[11px] font-semibold rounded-full">
                        {sk}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-700 leading-relaxed text-xs mt-2">{skillsList.join(' • ')}</p>
                )}
              </div>

              {/* Work Experience / Achievements */}
              <div>
                <h2 className={activeTemplateObj.sectionHeaderStyle}>
                  Key Professional Impact & Achievements
                </h2>
                <ul className="space-y-2 list-disc list-inside text-slate-700 text-xs leading-relaxed mt-2">
                  {bullets.map((b, idx) => (
                    <li key={idx} className="pl-1">{b}</li>
                  ))}
                </ul>
              </div>

              {/* Education */}
              <div>
                <h2 className={activeTemplateObj.sectionHeaderStyle}>
                  Education & Professional Credentials
                </h2>
                <ul className="space-y-1 list-disc list-inside text-slate-700 text-xs mt-2">
                  {analysis.extractedDetails.education.map((edu, idx) => (
                    <li key={idx}>{edu}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
