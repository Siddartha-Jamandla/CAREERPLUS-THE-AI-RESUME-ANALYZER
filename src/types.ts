export interface ResumeAnalysisInput {
  resumeText: string;
  fileData?: {
    base64: string;
    mimeType: string;
    fileName: string;
  };
  targetRole: string;
  jobDescription?: string;
  experienceLevel?: string;
  industry?: string;
}

export interface MissingSkill {
  skill: string;
  importance: 'Critical' | 'High' | 'Medium';
  category: string;
  description: string;
}

export interface MatchingSkill {
  skill: string;
  level: 'Expert' | 'Proficient' | 'Basic';
  category: string;
}

export interface LearningRoadmap {
  title: string;
  type: 'Course' | 'Project' | 'Certification';
  estimatedTime: string;
  keyTopics: string[];
  rationale: string;
}

export interface CareerRoleSuggestion {
  title: string;
  matchPercentage: number;
  salaryRange: string;
  rationale: string;
  keyCompetenciesNeeded: string[];
}

export interface LongTermCareerStep {
  step: number;
  title: string;
  targetYears: string;
  milestoneSkills: string[];
}

export interface FormattingIssue {
  issue: string;
  severity: 'Critical' | 'Warning' | 'Info';
  fixSuggestion: string;
}

export interface KeywordAnalysis {
  keyword: string;
  countInResume: number;
  recommendedCount: number;
  importance: 'Must Have' | 'Recommended' | 'Bonus';
}

export interface BulletRewrite {
  originalBullet: string;
  improvedBullet: string;
  impactReason: string;
  metricAdded: string;
}

export interface InterviewQuestion {
  question: string;
  category: 'Technical' | 'Behavioral' | 'Skill Gap';
  whyAsked: string;
  winningAnswerStrategy: string;
}

export interface ActionItem {
  id: string;
  task: string;
  scoreImpact: number;
  completed: boolean;
  category: 'Skills' | 'ATS & Formatting' | 'Impact & Metrics' | 'Keywords';
}

export interface FreeCourse {
  title: string;
  provider: string;
  duration: string;
  hasCertificate: boolean;
  isFree: boolean;
  skillCovered: string;
  directUrl: string;
  description: string;
}

export interface JobOpening {
  jobTitle: string;
  companyName: string;
  location: string;
  salaryEstimate: string;
  matchPercentage: number;
  keySkillsRequired: string[];
  postedTime: string;
  platform: string;
  applyUrl: string;
}

export interface UpskillRoadmapSkill {
  skillName: string;
  whyNeeded: string;
  targetLevel: string;
  stepByStepRoadmap: string[];
  topPlatforms: string[];
  interviewTipsToClear: string;
  recommendedFreeCourse: FreeCourse;
}

export interface PortfolioProjectIdea {
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedHours: string;
  targetRoleValue: string;
  keySkillsDemonstrated: string[];
  techStack: string[];
  freeResourcesAndDocs: { name: string; url: string; platform: string }[];
  stepByStepRoadmap: string[];
  githubStarterTemplateUrl: string;
  resumeBulletPointsToInclude: string[];
}

export interface LinkedInProfileResult {
  headlines: {
    seoOptimized: string;
    impactLeader: string;
    technicalSpecialist: string;
  };
  aboutBio: string;
  featuredHighlights: string[];
  topSkillsToFeature: string[];
  networkingIcebreakers: string[];
}

export interface JobApplicationItem {
  id: string;
  jobTitle: string;
  companyName: string;
  location: string;
  salary: string;
  status: 'Saved' | 'Applied' | 'Screening' | 'Interviewing' | 'Offer' | 'Rejected';
  appliedDate: string;
  notes: string;
  applyUrl?: string;
}

export interface ResumeAnalysisResult {
  overallScore: number;
  atsScore: number;
  skillsMatchScore: number;
  experienceMatchScore: number;
  formattingScore: number;
  executiveSummary: string;
  extractedDetails: {
    candidateName: string;
    currentRole: string;
    yearsExperience: string;
    detectedSkills: string[];
    education: string[];
    topStrengths: string[];
  };
  skillGapAnalysis: {
    missingCriticalSkills: MissingSkill[];
    matchingSkills: MatchingSkill[];
    learningRoadmap: LearningRoadmap[];
  };
  careerSuggestions: {
    immediateNextRoles: CareerRoleSuggestion[];
    reachRoles: CareerRoleSuggestion[];
    longTermPath: LongTermCareerStep[];
  };
  atsOptimization: {
    formattingIssues: FormattingIssue[];
    missingKeywords: string[];
    keywordFrequency: KeywordAnalysis[];
  };
  bulletPointEnhancements: BulletRewrite[];
  tailoredInterviewQuestions: InterviewQuestion[];
  quickActionChecklist: ActionItem[];
  recommendedJobs: JobOpening[];
  freeCoursesWithCertificates: FreeCourse[];
  skillUpskillRoadmaps: UpskillRoadmapSkill[];
  portfolioProjectIdeas?: PortfolioProjectIdea[];
}

export interface SampleResume {
  id: string;
  title: string;
  role: string;
  targetRole: string;
  jobDescription: string;
  resumeText: string;
}

export interface RedFlagItem {
  flag: string;
  severity: 'High' | 'Medium' | 'Low';
  interviewerConcern: string;
  candidateMitigationStrategy: string;
}

export interface PanelQuestionGuide {
  interviewerPersona: string;
  focusArea: string;
  topQuestionToAsk: string;
  whatToLookForInAnswer: string;
}

export interface SalaryNegotiationData {
  estimatedBaseSalary: string;
  targetBonusEquity: string;
  negotiationLeveragePoints: string[];
  counterOfferScript: string;
}

export interface CompetencyRubric {
  technicalDepth: number;
  executionImpact: number;
  systemArchitecture: number;
  communicationLeadership: number;
  cultureFitAgility: number;
}

export interface InterviewerAssessmentReport {
  hiringRecommendation: 'Strong Hire' | 'Lean Hire' | 'Borderline' | 'Pass';
  recommendationRationale: string;
  redFlags: RedFlagItem[];
  panelQuestionGuides: PanelQuestionGuide[];
  salaryNegotiation: SalaryNegotiationData;
  competencyRubric: CompetencyRubric;
}

export interface MockInterviewEvaluation {
  overallAnswerScore: number;
  starScore: {
    situation: number;
    task: number;
    action: number;
    result: number;
  };
  interviewerFeedback: string;
  missingKeywords: string[];
  strengthsInAnswer: string[];
  improvementPoints: string[];
  exemplaryAnswer: string;
  followUpQuestion: string;
}

export interface CoverLetterResult {
  coverLetterText: string;
  keyHighlightsMentioned: string[];
  matchingKeywordsIncluded: string[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  targetRole: string;
  yearsOfExperience?: string;
  preferredLocation?: string;
  preferredSalary?: string;
  skills?: string[];
  bio?: string;
  isAdmin: boolean;
  createdAt: string;
  lastLoginAt: string;
  status: 'active' | 'suspended';
}

export interface UserSession {
  token: string;
  user: UserProfile;
}

export interface AuditLogAction {
  id: string;
  userId: string;
  userEmail: string;
  action: 'LOGIN' | 'LOGOUT' | 'SIGNUP' | 'ANALYZE_RESUME' | 'SAVE_RESUME' | 'UPDATE_PROFILE' | 'ADMIN_ACTION';
  details: string;
  ipAddress?: string;
  userAgent?: string;
  timestamp: string;
}

export interface SavedAnalysisRecord {
  id: string;
  userId: string;
  targetRole: string;
  overallScore: number;
  atsScore: number;
  skillsMatchScore: number;
  createdAt: string;
  analysis: ResumeAnalysisResult;
}

export interface AdminMetrics {
  totalUsers: number;
  activeSessions: number;
  totalAnalyses: number;
  avgAtsScore: number;
  topTargetRoles: { role: string; count: number }[];
  recentAuditLogs: AuditLogAction[];
}


