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
  ],
  portfolioProjectIdeas: [
    {
      title: "Distributed Microservices & Redis In-Memory Caching Platform",
      difficulty: "Advanced",
      estimatedHours: "20-30 Hours",
      targetRoleValue: "Demonstrates high-scale distributed backend engineering, memory caching strategies, and sub-50ms API throughput directly relevant to senior engineering hiring managers.",
      keySkillsDemonstrated: ["System Architecture", "Microservices", "Redis Caching", "Docker", "PostgreSQL"],
      techStack: ["TypeScript", "Node.js / Express", "Redis", "Docker", "PostgreSQL"],
      freeResourcesAndDocs: [
        { name: "Node.js Official Best Practices", url: "https://nodejs.org/en/docs/", platform: "Official Docs" },
        { name: "freeCodeCamp Microservices Certification", url: "https://www.freecodecamp.org/learn/back-end-development-and-apis/", platform: "freeCodeCamp" },
        { name: "Redis Caching Architecture Guide", url: "https://redis.io/docs/latest/develop/use/", platform: "Redis Docs" }
      ],
      stepByStepRoadmap: [
        "Phase 1: Design RESTful schemas, database models, and entity-relationship diagrams.",
        "Phase 2: Implement Redis write-through & read-through caching for sub-50ms queries.",
        "Phase 3: Containerize multi-container services with Docker Compose and healthchecks.",
        "Phase 4: Setup GitHub Actions CI/CD with automated unit tests and linting."
      ],
      githubStarterTemplateUrl: "https://github.com/topics/fullstack-starter-template",
      resumeBulletPointsToInclude: [
        "Architected scalable microservices platform in Node.js/TypeScript handling 15,000+ API requests/min with sub-50ms latency.",
        "Engineered Redis in-memory caching pipeline reducing Postgres database load by 68% and boosting throughput by 3.5x.",
        "Containerized backend services with Docker and created automated GitHub Actions CI/CD workflows for zero-downtime releases."
      ]
    },
    {
      title: "Real-Time AI Agent & LLM RAG Intelligence Platform",
      difficulty: "Advanced",
      estimatedHours: "25-35 Hours",
      targetRoleValue: "Showcases cutting-edge generative AI capabilities, vector database embeddings, streaming APIs, and server-side model orchestration.",
      keySkillsDemonstrated: ["Gemini API / LLMs", "Vector Search & RAG", "Streaming Responses", "Full Stack TypeScript", "API Security"],
      techStack: ["React", "TypeScript", "Google Gen AI SDK", "Tailwind CSS", "Express / Node.js"],
      freeResourcesAndDocs: [
        { name: "Google Gemini API Developer Guide", url: "https://ai.google.dev/docs", platform: "Google AI" },
        { name: "DeepLearning.AI LangChain & RAG Course", url: "https://www.deeplearning.ai/short-courses/", platform: "DeepLearning.AI" },
        { name: "Tailwind CSS Component Docs", url: "https://tailwindcss.com/docs", platform: "Tailwind" }
      ],
      stepByStepRoadmap: [
        "Phase 1: Build responsive multi-modal chat interface with streaming markdown and syntax highlighting.",
        "Phase 2: Create secure Node.js backend proxy with rate-limiting and structured Gemini JSON schemas.",
        "Phase 3: Integrate vector similarity matching or semantic search over document uploads.",
        "Phase 4: Deploy with containerized Cloud Run / Vercel architecture and benchmark latency."
      ],
      githubStarterTemplateUrl: "https://github.com/topics/ai-agent",
      resumeBulletPointsToInclude: [
        "Built full-stack AI Copilot with Gemini API and TypeScript, streaming context-aware responses with sub-1.2s first-token latency.",
        "Engineered server-side secure API proxy layer with token bucket rate limiting and strict schema validation.",
        "Implemented document vector search index enabling semantic querying across 500+ page technical manuals."
      ]
    },
    {
      title: "Cloud Infrastructure Automation & Production Observability Pipeline",
      difficulty: "Intermediate",
      estimatedHours: "15-20 Hours",
      targetRoleValue: "Proves cloud infrastructure readiness, DevOps best practices, infrastructure-as-code (IaC), and production monitoring.",
      keySkillsDemonstrated: ["Cloud Computing", "Terraform / IaC", "GitHub Actions CI/CD", "Prometheus & Metrics", "Docker"],
      techStack: ["AWS / GCP", "Terraform", "GitHub Actions", "Docker", "Prometheus / Grafana"],
      freeResourcesAndDocs: [
        { name: "HashiCorp Terraform Tutorials", url: "https://developer.hashicorp.com/terraform/tutorials", platform: "HashiCorp" },
        { name: "Google Cloud Skills Boost Labs", url: "https://www.cloudskillsboost.google/", platform: "Google Cloud" },
        { name: "GitHub Actions Documentation", url: "https://docs.github.com/en/actions", platform: "GitHub" }
      ],
      stepByStepRoadmap: [
        "Phase 1: Write modular Terraform scripts to provision VPC, compute instances, and storage buckets.",
        "Phase 2: Build automated monitoring service tracking CPU, memory usage, and request latencies.",
        "Phase 3: Configure webhook alerts for Slack / Discord triggering on SLA threshold breaches.",
        "Phase 4: Establish automated continuous integration pipeline testing IaC syntax on pull requests."
      ],
      githubStarterTemplateUrl: "https://github.com/topics/devops-template",
      resumeBulletPointsToInclude: [
        "Provisioned multi-environment cloud infrastructure using Terraform on AWS/GCP, reducing environment setup time from 4h to 8m.",
        "Built automated system observability pipeline with Prometheus & Grafana alerting team on anomalies within 5 seconds.",
        "Created GitHub Actions CI/CD pipeline achieving 100% automated build, lint, and security validation before deploy."
      ]
    },
    {
      title: "Multi-Tenant Enterprise SaaS Platform with RBAC & Stripe Billing",
      difficulty: "Advanced",
      estimatedHours: "30-40 Hours",
      targetRoleValue: "Demonstrates enterprise-grade SaaS engineering including multi-tenant data isolation, role-based access control (RBAC), and subscription payment processing.",
      keySkillsDemonstrated: ["Multi-Tenancy", "Role-Based Access Control", "Stripe API & Webhooks", "Prisma / Drizzle ORM", "Next.js / React"],
      techStack: ["React", "TypeScript", "Node.js / Express", "Stripe SDK", "PostgreSQL", "Tailwind CSS"],
      freeResourcesAndDocs: [
        { name: "Stripe Developer Documentation", url: "https://stripe.com/docs", platform: "Stripe" },
        { name: "PostgreSQL Multi-Tenant Security Guide", url: "https://www.postgresql.org/docs/", platform: "PostgreSQL Docs" },
        { name: "OWASP Authorization Best Practices", url: "https://cheatsheetseries.owasp.org/", platform: "OWASP" }
      ],
      stepByStepRoadmap: [
        "Phase 1: Build multi-tenant schema with organizational tenant IDs and row-level security.",
        "Phase 2: Implement granular RBAC permissions (Admin, Member, Viewer) with JWT claims.",
        "Phase 3: Integrate Stripe Checkout, Customer Portal, and webhook handler for subscription lifecycles.",
        "Phase 4: Design audit logging dashboard tracking administrative actions with exportable CSVs."
      ],
      githubStarterTemplateUrl: "https://github.com/topics/saas-starter",
      resumeBulletPointsToInclude: [
        "Engineered multi-tenant SaaS platform supporting 50+ organizations with strict tenant isolation and role-based permissions.",
        "Integrated Stripe subscription billing engine processing recurring payments, invoices, and webhook event reconciliation.",
        "Built immutable administrative audit log tracking security-sensitive actions with sub-millisecond query performance."
      ]
    },
    {
      title: "High-Throughput Financial Order Book & Real-Time WebSocket Engine",
      difficulty: "Advanced",
      estimatedHours: "25-35 Hours",
      targetRoleValue: "Proves low-latency data handling, high-frequency WebSocket state synchronization, and complex mathematical state machines.",
      keySkillsDemonstrated: ["WebSockets", "Event-Driven Systems", "Concurrent State", "Data Structures", "Real-Time Visuals"],
      techStack: ["TypeScript", "Node.js", "WebSockets (ws)", "Redis Pub/Sub", "React", "Tailwind CSS"],
      freeResourcesAndDocs: [
        { name: "WebSocket RFC Standards & Guide", url: "https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API", platform: "MDN" },
        { name: "Redis Pub/Sub Patterns Guide", url: "https://redis.io/docs/latest/develop/interact/pubsub/", platform: "Redis" },
        { name: "High-Performance JavaScript Algorithms", url: "https://github.com/trekhleb/javascript-algorithms", platform: "GitHub" }
      ],
      stepByStepRoadmap: [
        "Phase 1: Implement in-memory order book matching engine using binary search and double-linked lists.",
        "Phase 2: Build scalable WebSocket broadcast server distributing live bid/ask updates to connected clients.",
        "Phase 3: Create frontend depth-chart and real-time candlestick trading visualization.",
        "Phase 4: Run load tests simulating 10,000 simultaneous order placements/sec using Artillery."
      ],
      githubStarterTemplateUrl: "https://github.com/topics/orderbook",
      resumeBulletPointsToInclude: [
        "Engineered real-time order matching engine in TypeScript processing 10,000+ orders/sec with zero race conditions.",
        "Built low-latency WebSocket gateway utilizing Redis Pub/Sub to broadcast price ticks to 5,000+ concurrent clients.",
        "Designed responsive interactive financial chart UI rendering 60fps updates with canvas virtual rendering."
      ]
    },
    {
      title: "Automated DevSecOps Vulnerability Scanner & Container Auditor",
      difficulty: "Intermediate",
      estimatedHours: "12-18 Hours",
      targetRoleValue: "Highlights deep security awareness, static code analysis (SAST), and container compliance checking valued by enterprise recruiters.",
      keySkillsDemonstrated: ["Application Security", "AST Parsing", "Docker Security", "OWASP Top 10", "Report Generation"],
      techStack: ["Python / TypeScript", "Docker CLI / SDK", "GitHub Webhooks", "Tailwind CSS", "Vite"],
      freeResourcesAndDocs: [
        { name: "OWASP Top 10 Security Guide", url: "https://owasp.org/www-project-top-ten/", platform: "OWASP" },
        { name: "Docker Security Best Practices", url: "https://docs.docker.com/engine/security/", platform: "Docker" },
        { name: "Snyk Open Source Security Insights", url: "https://snyk.io/learn/", platform: "Snyk" }
      ],
      stepByStepRoadmap: [
        "Phase 1: Build parser scanning package manifests (package.json, requirements.txt) against CVE vulnerability databases.",
        "Phase 2: Inspect Dockerfiles for root user execution, unpinned versions, and exposed sensitive ports.",
        "Phase 3: Generate executive PDF and JSON security compliance reports with severity scoring.",
        "Phase 4: Build automated GitHub Pull Request bot commenting remediation steps directly on PRs."
      ],
      githubStarterTemplateUrl: "https://github.com/topics/security-scanner",
      resumeBulletPointsToInclude: [
        "Developed automated vulnerability scanner auditing npm and Python dependencies against National Vulnerability Database CVEs.",
        "Built Dockerfile static analyzer catching 12+ common security misconfigurations before production build stages.",
        "Engineered automated GitHub PR bot providing actionable remediation guidance, preventing critical CVE merges."
      ]
    },
    {
      title: "Real-Time Collaborative Multi-User Canvas with CRDT Synchronization",
      difficulty: "Advanced",
      estimatedHours: "20-30 Hours",
      targetRoleValue: "Demonstrates advanced frontend state management, Conflict-free Replicated Data Types (CRDTs), and peer-to-peer multiplayer UX.",
      keySkillsDemonstrated: ["CRDTs (Yjs)", "WebSockets", "Canvas Rendering", "Conflict Resolution", "Multiplayer UI"],
      techStack: ["React", "TypeScript", "Yjs", "WebSockets", "HTML5 Canvas / SVG", "Tailwind CSS"],
      freeResourcesAndDocs: [
        { name: "Yjs CRDT Official Documentation", url: "https://docs.yjs.dev/", platform: "Yjs" },
        { name: "HTML5 Canvas API Reference", url: "https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API", platform: "MDN" },
        { name: "Real-Time Collaboration Patterns", url: "https://github.com/yjs/yjs", platform: "GitHub" }
      ],
      stepByStepRoadmap: [
        "Phase 1: Build vector drawing canvas supporting shapes, freehand drawing, and text manipulation.",
        "Phase 2: Bind local canvas state to Yjs CRDT shared types for conflict-free multi-client merging.",
        "Phase 3: Broadcast live multiplayer cursor presence and user color avatars via WebSockets.",
        "Phase 4: Implement undo/redo history stacks and export to PNG, SVG, and JSON formats."
      ],
      githubStarterTemplateUrl: "https://github.com/topics/collaborative-canvas",
      resumeBulletPointsToInclude: [
        "Created collaborative multiplayer whiteboard using React, TypeScript, and Yjs CRDTs with zero server state conflicts.",
        "Engineered real-time cursor presence engine broadcasting mouse coordinates at 60fps across multiple active users.",
        "Implemented local-first offline storage allowing users to draw seamlessly without internet and auto-sync on reconnect."
      ]
    },
    {
      title: "High-Performance Edge Image Processing & CDN Asset Delivery Service",
      difficulty: "Intermediate",
      estimatedHours: "14-20 Hours",
      targetRoleValue: "Shows mastery of edge computing, WebAssembly compilation, image optimization, and CDN cache headers.",
      keySkillsDemonstrated: ["Edge Computing", "WebAssembly (WASM)", "CDN Caching", "Image Resizing", "Cloudflare Workers"],
      techStack: ["Cloudflare Workers / Vercel Edge", "TypeScript", "WebAssembly", "Sharp", "REST API"],
      freeResourcesAndDocs: [
        { name: "Cloudflare Workers Developer Docs", url: "https://developers.cloudflare.com/workers/", platform: "Cloudflare" },
        { name: "WebAssembly MDN Learning Path", url: "https://developer.mozilla.org/en-US/docs/WebAssembly", platform: "MDN" },
        { name: "HTTP Caching Headers Masterclass", url: "https://web.dev/http-cache/", platform: "web.dev" }
      ],
      stepByStepRoadmap: [
        "Phase 1: Configure serverless Edge worker listening to dynamic URL query parameters (width, quality, format).",
        "Phase 2: Compile image resizing and WebP/AVIF compression routines into WebAssembly.",
        "Phase 3: Design Cache-Control headers ensuring 99%+ CDN cache hit ratios at edge POP locations.",
        "Phase 4: Add signed URL HMAC verification to prevent unauthorized resource hotlinking."
      ],
      githubStarterTemplateUrl: "https://github.com/topics/edge-functions",
      resumeBulletPointsToInclude: [
        "Developed edge image transformation service on Cloudflare Workers reducing image payload size by 64% using AVIF/WebP.",
        "Architected CDN caching strategy achieving 99.4% cache-hit ratio and sub-25ms global asset delivery times.",
        "Implemented cryptographic HMAC token validation preventing unauthorized API usage and asset bandwidth leeching."
      ]
    },
    {
      title: "Intelligent Job Application Tracker & ATS Extension Sync Hub",
      difficulty: "Intermediate",
      estimatedHours: "15-22 Hours",
      targetRoleValue: "Demonstrates browser extension engineering, DOM parsing across LinkedIn/Indeed, Kanban state management, and real-time CRM synchronization.",
      keySkillsDemonstrated: ["Chrome Extension V3", "Kanban CRM", "DOM Scraping", "State Persistence", "React & Tailwind"],
      techStack: ["React", "TypeScript", "Chrome Extension API", "Tailwind CSS", "IndexedDB", "Node.js"],
      freeResourcesAndDocs: [
        { name: "Chrome Extensions Manifest V3 Guide", url: "https://developer.chrome.com/docs/extensions/mv3/", platform: "Chrome Developers" },
        { name: "Modern Drag-and-Drop in React", url: "https://github.com/atlassian/react-beautiful-dnd", platform: "GitHub" },
        { name: "IndexedDB Storage Tutorial", url: "https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API", platform: "MDN" }
      ],
      stepByStepRoadmap: [
        "Phase 1: Build Manifest V3 content script extracting job title, company, and location from LinkedIn & Indeed.",
        "Phase 2: Build interactive React Kanban board with drag-and-drop status stages (Applied, Interviewing, Offer).",
        "Phase 3: Implement automated interview date reminders and application stage notes.",
        "Phase 4: Add one-click CSV/JSON export and sync with local browser IndexedDB storage."
      ],
      githubStarterTemplateUrl: "https://github.com/topics/job-tracker",
      resumeBulletPointsToInclude: [
        "Engineered full-stack job application CRM with Chrome Extension syncing job postings from LinkedIn and Indeed in 1-click.",
        "Built responsive drag-and-drop Kanban interface with React & Tailwind, tracking 100+ applications across custom stages.",
        "Integrated client-side IndexedDB persistence with automated reminder alerts for upcoming recruiter interviews."
      ]
    },
    {
      title: "Zero-Trust Identity Provider & OAuth 2.0 / OpenID Authentication Server",
      difficulty: "Advanced",
      estimatedHours: "25-35 Hours",
      targetRoleValue: "Demonstrates enterprise security proficiency, JWT signing & verification, PKCE token exchange, and password hashing standards.",
      keySkillsDemonstrated: ["OAuth 2.0 & OIDC", "JWT & Cryptography", "Zero-Trust Security", "Session Management", "API Gateway"],
      techStack: ["Node.js", "TypeScript", "Jose / Web Crypto", "PostgreSQL", "React", "Tailwind CSS"],
      freeResourcesAndDocs: [
        { name: "OAuth 2.0 and OpenID Connect Specs", url: "https://oauth.net/2/", platform: "OAuth.net" },
        { name: "Auth0 Security Identity Architecture", url: "https://auth0.com/docs", platform: "Auth0 Docs" },
        { name: "Web Cryptography API Guide", url: "https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API", platform: "MDN" }
      ],
      stepByStepRoadmap: [
        "Phase 1: Implement OAuth 2.0 Authorization Code flow with PKCE challenge verification.",
        "Phase 2: Generate asymmetric RS256 signed JSON Web Tokens (JWT) with rotating key pairs (JWKS).",
        "Phase 3: Build multi-factor authentication (MFA / TOTP) with QR code onboarding in React.",
        "Phase 4: Implement brute-force protection, IP rate limiting, and secure HTTP-only refresh cookie rotation."
      ],
      githubStarterTemplateUrl: "https://github.com/topics/oauth2-server",
      resumeBulletPointsToInclude: [
        "Built standalone OAuth 2.0 & OIDC authorization server in TypeScript supporting Authorization Code with PKCE flow.",
        "Implemented RS256 asymmetric JWT key rotation with public JWKS endpoint for decentralized microservice token validation.",
        "Engineered TOTP multi-factor authentication (MFA) and cryptographic token rotation mitigating replay attacks."
      ]
    }
  ]
};
