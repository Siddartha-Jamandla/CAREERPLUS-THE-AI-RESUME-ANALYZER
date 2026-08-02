import { ResumeAnalysisResult } from '../types';

export const DEFAULT_SAMPLE_ANALYSIS: ResumeAnalysisResult = {
  overallScore: 82,
  atsScore: 85,
  skillsMatchScore: 80,
  experienceMatchScore: 84,
  formattingScore: 88,
  executiveSummary: "Strong technical candidate with 3+ years of web engineering experience. Demonstrates proficiency in React, TypeScript, and Node.js. High potential for Senior Full Stack Architect roles with targeted metric quantification and Cloud System architecture enhancements.",
  extractedDetails: {
    candidateName: "Siddartha Jamandla",
    currentRole: "AIML Engineering Student & AI Systems Developer",
    yearsExperience: "Student / Developer",
    detectedSkills: ["Python", "TensorFlow", "PyTorch", "React", "TypeScript", "Node.js", "Machine Learning", "Deep Learning", "Tailwind CSS", "Git"],
    education: ["B.Tech in AIML Engineering - Hyderabad, Telangana, India (500013)"],
    topStrengths: ["AIML Model Training & Integration", "Full Stack AI Application Architecture", "Deep Learning & Neural Network Optimization"]
  },
  skillGapAnalysis: {
    missingCriticalSkills: [
      {
        skill: "System Design & Microservices",
        importance: "Critical",
        category: "Backend Architecture",
        description: "Essential for Senior Full Stack roles handling high-throughput distributed systems."
      },
      {
        skill: "AWS / GCP Cloud Deployments",
        importance: "Critical",
        category: "Cloud Infrastructure",
        description: "Deploying and orchestrating scalable containerized services on cloud infrastructure."
      },
      {
        skill: "GraphQL & Caching (Redis)",
        importance: "High",
        category: "Data Querying & Performance",
        description: "Optimizing database query performance and real-time frontend data synchronization."
      }
    ],
    matchingSkills: [
      { skill: "React.js & TypeScript", level: "Expert", category: "Frontend" },
      { skill: "Node.js & Express", level: "Proficient", category: "Backend" },
      { skill: "RESTful API Integration", level: "Expert", category: "Networking" },
      { skill: "Tailwind CSS & UI UX", level: "Proficient", category: "Design System" },
      { skill: "Git & GitHub CI/CD", level: "Proficient", category: "DevOps" }
    ],
    learningRoadmap: [
      {
        title: "Distributed System Design & Microservices",
        type: "Course",
        estimatedTime: "2 Weeks",
        keyTopics: ["API Gateway Pattern", "Event-Driven Architecture", "Kafka & Redis Caching"],
        rationale: "Required for architectural leadership in full-stack engineering."
      },
      {
        title: "Docker & Kubernetes Deployment Pipeline",
        type: "Project",
        estimatedTime: "10 Days",
        keyTopics: ["Containerization", "Helm Charts", "AWS ECS Deployment"],
        rationale: "Demonstrates cloud-native readiness for enterprise engineering roles."
      }
    ]
  },
  careerSuggestions: {
    immediateNextRoles: [
      {
        title: "Senior Full Stack Engineer",
        matchPercentage: 88,
        salaryRange: "$140,000 - $175,000",
        rationale: "Direct progression leveraging existing 3+ YOE with React and Node.js.",
        keyCompetenciesNeeded: ["TypeScript", "GraphQL", "Performance Tuning"]
      },
      {
        title: "Lead Frontend Architect",
        matchPercentage: 85,
        salaryRange: "$150,000 - $185,000",
        rationale: "High frontend score with strong component design pattern expertise.",
        keyCompetenciesNeeded: ["Micro-frontends", "Design Systems", "Web Vitals"]
      }
    ],
    reachRoles: [
      {
        title: "Staff Software Engineer / Architect",
        matchPercentage: 74,
        salaryRange: "$180,000 - $220,000",
        rationale: "Requires system design mastery and mentorship of junior engineers.",
        keyCompetenciesNeeded: ["Distributed Systems", "Cloud Security", "Technical Strategy"]
      }
    ],
    longTermPath: [
      { step: 1, title: "Senior Full Stack Engineer", targetYears: "Current - Year 2", milestoneSkills: ["System Design", "AWS Certification"] },
      { step: 2, title: "Lead Software Architect", targetYears: "Year 2 - Year 4", milestoneSkills: ["Microservices", "Team Mentorship"] },
      { step: 3, title: "Principal Engineer / VP of Tech", targetYears: "Year 4+", milestoneSkills: ["Enterprise Strategy", "P&L Management"] }
    ]
  },
  atsOptimization: {
    formattingIssues: [
      { issue: "Missing quantitative metrics in experience section", severity: "Critical", fixSuggestion: "Add % percentages, $ revenue numbers, or time saved to every bullet point." },
      { issue: "Generic summary statement", severity: "Warning", fixSuggestion: "Align summary directly with the Senior Architect job description." }
    ],
    missingKeywords: ["Microservices", "GraphQL", "AWS Cloud", "Docker", "Kubernetes", "Redis", "CI/CD Pipelines", "System Design"],
    keywordFrequency: [
      { keyword: "React", countInResume: 5, recommendedCount: 4, importance: "Must Have" },
      { keyword: "TypeScript", countInResume: 3, recommendedCount: 4, importance: "Must Have" },
      { keyword: "Node.js", countInResume: 3, recommendedCount: 3, importance: "Must Have" },
      { keyword: "AWS / Cloud", countInResume: 0, recommendedCount: 3, importance: "Must Have" },
      { keyword: "Docker", countInResume: 1, recommendedCount: 2, importance: "Recommended" }
    ]
  },
  bulletPointEnhancements: [
    {
      originalBullet: "Developed modern user interfaces for SaaS web platform using React and TypeScript.",
      improvedBullet: "Architected 15+ responsive React/TypeScript UI modules for enterprise SaaS platform, boosting monthly active user engagement by 32% across 40,000 users.",
      impactReason: "Quantifies user scale and measurable engagement impact.",
      metricAdded: "32% engagement boost, 40k users"
    },
    {
      originalBullet: "Improved frontend bundle load time by code splitting.",
      improvedBullet: "Engineered code-splitting and dynamic image lazy-loading pipelines, reducing initial bundle size by 28% and cutting PageSpeed load time from 3.2s to 1.1s.",
      impactReason: "Converts vague improvement into precise core web vital metrics.",
      metricAdded: "28% bundle reduction, 1.1s load time"
    }
  ],
  tailoredInterviewQuestions: [
    {
      question: "How do you handle state management and performance optimization in a large scale React application?",
      category: "Technical",
      whyAsked: "Evaluates your ability to prevent unnecessary re-renders and scale complex frontend applications.",
      winningAnswerStrategy: "Discuss React Query / Zustand for state separation, useMemo/useCallback for expensive computations, and virtualized lists for big datasets."
    },
    {
      question: "Describe a time you diagnosed and resolved a severe memory leak or slow API query in production.",
      category: "Behavioral",
      whyAsked: "Tests problem-solving under pressure and full-stack debugging skills.",
      winningAnswerStrategy: "Use STAR method: Describe Chrome DevTools profiling / APM monitoring, identifying the root cause, and the metric improvement post-fix."
    }
  ],
  quickActionChecklist: [
    { id: '1', task: 'Add AWS / Cloud architecture experience to your skills summary', scoreImpact: 5, completed: false, category: 'Skills' },
    { id: '2', task: 'Quantify at least 3 bullet points with revenue or performance metrics', scoreImpact: 4, completed: false, category: 'Impact & Metrics' },
    { id: '3', task: 'Include GraphQL and Redis keywords in your technical stack list', scoreImpact: 3, completed: false, category: 'Keywords' }
  ],
  recommendedJobs: [
    {
      jobTitle: "Senior Full Stack Engineer (React/Node)",
      companyName: "Stripe",
      location: "Remote / San Francisco, CA",
      salaryEstimate: "$155,000 - $190,000",
      matchPercentage: 92,
      keySkillsRequired: ["React", "TypeScript", "Node.js", "API Design"],
      postedTime: "2 days ago",
      platform: "LinkedIn Jobs",
      applyUrl: "https://www.linkedin.com/jobs"
    },
    {
      jobTitle: "Lead Frontend Architect",
      companyName: "Vercel",
      location: "Remote",
      salaryEstimate: "$165,000 - $205,000",
      matchPercentage: 88,
      keySkillsRequired: ["React", "Next.js", "TypeScript", "Performance Tuning"],
      postedTime: "1 day ago",
      platform: "Indeed",
      applyUrl: "https://www.indeed.com"
    }
  ],
  freeCoursesWithCertificates: [
    {
      title: "AWS Certified Developer - Associate Training",
      provider: "AWS Skill Builder / freeCodeCamp",
      duration: "12 Hours",
      hasCertificate: true,
      isFree: true,
      skillCovered: "AWS Cloud Deployments",
      directUrl: "https://www.freecodecamp.org",
      description: "Comprehensive guide to building, deploying, and debugging cloud applications on AWS."
    }
  ],
  skillUpskillRoadmaps: [
    {
      skillName: "Distributed System Design & Microservices",
      whyNeeded: "Required for senior and lead engineering positions.",
      targetLevel: "Senior Architect",
      stepByStepRoadmap: [
        "Master API Gateway & Load Balancing strategies",
        "Learn Caching Patterns (Write-through vs Read-through with Redis)",
        "Implement Message Queues (Kafka / RabbitMQ) for asynchronous worker tasks"
      ],
      topPlatforms: ["Educative.io", "ByteByteGo", "System Design Primer"],
      interviewTipsToClear: "Always start system design interviews with clarifying requirements, non-functional requirements (SLA/latency), and back-of-the-envelope calculations.",
      recommendedFreeCourse: {
        title: "System Design Course for Beginners",
        provider: "freeCodeCamp",
        duration: "8 Hours",
        hasCertificate: true,
        isFree: true,
        skillCovered: "System Architecture",
        directUrl: "https://www.freecodecamp.org",
        description: "Learn how to design large scale systems with load balancers, database sharding, and caching."
      }
    }
  ]
};
