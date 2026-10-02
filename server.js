// server.ts
import express from "express";
import path2 from "path";
import fs2 from "fs";
import { fileURLToPath as fileURLToPath2 } from "url";
import dotenv from "dotenv";
import cors from "cors";

// server/db.ts
import mysql from "mysql2/promise";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// src/data/orbitData.ts
var COMPANY_INFO = {
  name: "ORBIT-I",
  legalName: "ORBIT-I Private Limited",
  tagline: "Engineering software that stays in orbit around your business.",
  founder: "Abdul Samad Rind",
  coFounders: ["Maria Almani", "Muhammad Muneeb Ur Rahman Shahzad"],
  logoUrl: "/orbit-circular-logo.png",
  summary: "ORBIT-I Private Limited builds custom software, cloud platforms, and digital systems for businesses that require dependable, long-term engineering.",
  email: "contactus@orbit-i.tech",
  phone: "+92 3190375751",
  location: "Nawabshah, Sindh, Pakistan",
  website: "https://orbit-i.tech/",
  socialLinks: {
    linkedin: "https://www.linkedin.com/company/orbit-i-private-limited/",
    whatsapp: "https://whatsapp.com/channel/0029Vb8I4kvJJhzUXqEnB50J",
    facebook: "https://www.facebook.com/orbitiprivatelimited",
    instagram: "https://www.instagram.com/orbiti_private_limited?utm_source=qr&stkn=ZnE1c25zdG96Y3Zp",
    tiktok: "https://www.tiktok.com/@orbitiprivatelimited",
    twitter: "https://x.com/orbit_i_ltd",
    github: "https://github.com/orbit-i-ltd",
    youtube: "https://youtube.com/@orbit-i-ltd"
  },
  established: "2024",
  registrationType: "Private Limited Company"
};
var VERIFIED_SERVICES = [
  {
    id: "srv-1",
    title: "Web Application & Custom Software Development",
    slug: "web-application-development",
    summary: "High-performance web platforms, enterprise headless WordPress, and custom coded applications.",
    description: "We design and build full-stack web applications end-to-end \u2014 from interactive design systems to high-throughput REST APIs, WordPress headless CMS architectures, and custom coded scalable platforms.",
    detailedDescription: "Our web engineering division builds enterprise-grade digital systems tailored to your specific workflow. Whether leveraging modern full-stack frameworks (React, Next.js, Node.js, TypeScript) or enterprise WordPress CMS development and custom PHP integrations, we ensure clean architecture, SEO readiness, sub-second latency, and complete source code ownership.",
    benefits: [
      "Strict type-safety across client and server layers",
      "Modular design systems that accelerate feature velocity",
      "Sub-second initial load times with built-in performance budgets",
      "Automated testing pipelines with continuous integration",
      "Full SEO optimization with OpenGraph and Schema.org integration"
    ],
    technologies: ["WordPress", "Custom Coding", "React", "Next.js", "Node.js", "PHP", "TypeScript", "TailwindCSS", "MySQL"],
    processSteps: [
      {
        title: "01. Technical Discovery",
        description: "Requirements mapping, architectural trade-offs, and data modeling."
      },
      {
        title: "02. System Architecture",
        description: "Component wireframes, API contracts, and database schema specification."
      },
      {
        title: "03. Sprint-Based Build",
        description: "Bi-weekly sprint demos with end-to-end visibility and continuous integration."
      },
      {
        title: "04. Production Deployment",
        description: "Security audit, load testing, automated backups, and 30-day post-launch warranty."
      }
    ],
    iconName: "Code2",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Full Stack Web Development, Custom Coding, and WordPress Architecture by ORBIT-I"
  },
  {
    id: "srv-2",
    title: "Mobile Application Development",
    slug: "mobile-application-development",
    summary: "High-performance cross-platform apps for iOS and Android from a unified codebase.",
    description: "We engineer native-feeling mobile applications that operate smoothly on both iOS and Android, sharing reliable backend services and secure authentication with your web infrastructure.",
    detailedDescription: "Deliver fluid, 60fps mobile experiences to App Store and Google Play users. Using React Native and Flutter, we provide unified multi-platform engineering that cuts time-to-market in half while guaranteeing native performance, offline data synchronization, biometric authentication, and enterprise push notifications.",
    benefits: [
      "Single maintainable codebase for iOS and Android",
      "Offline-first synchronization with secure local storage",
      "Optimized 60fps animations and native hardware integration",
      "Turnkey App Store and Google Play compliance & deployment"
    ],
    technologies: ["React Native", "Flutter", "iOS / Swift", "Android / Kotlin", "Expo", "TypeScript", "REST APIs"],
    processSteps: [
      {
        title: "01. Device & UX Scoping",
        description: "Defining target platforms, gesture flows, and offline constraints."
      },
      {
        title: "02. Interactive Prototype",
        description: "Testing user journeys on actual physical devices before coding."
      },
      {
        title: "03. Iterative Engineering",
        description: "Incremental feature delivery with automated weekly test builds."
      },
      {
        title: "04. App Store Submission",
        description: "Store asset preparation, metadata optimization, and approval handling."
      }
    ],
    iconName: "Smartphone",
    imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Native and Cross Platform Mobile Application Development for iOS and Android"
  },
  {
    id: "srv-3",
    title: "Custom Software & Enterprise ERP Systems",
    slug: "custom-software-solutions",
    summary: "Tailor-made internal business platforms that automate complex organizational workflows.",
    description: "When commercial off-the-shelf software restricts your operations, we build purpose-fit tools: custom ERPs, internal portals, billing systems, and automated data pipelines designed around your unique workflow.",
    detailedDescription: "Eliminate software license bottlenecks and rigid spreadsheet dependencies. We construct bespoke business platforms, warehouse inventory tracking, real-time client management portals, multi-tier staff permissions, and accounting ledger integrations built directly against your operating procedures.",
    benefits: [
      "Exact alignment with existing business processes",
      "Zero recurring per-seat SaaS licensing costs",
      "Complete intellectual property and source code ownership",
      "Seamless integration with your legacy ERPs and third-party APIs"
    ],
    technologies: ["Custom Coding", "Node.js", "Python", "TypeScript", "MySQL", "PostgreSQL", "Docker", "Redis"],
    processSteps: [
      {
        title: "01. Workflow Audit",
        description: "Deep-dive into operational bottlenecks and manual spreadsheet tasks."
      },
      {
        title: "02. Solution Design",
        description: "Database modeling and role-based permissions matrix."
      },
      {
        title: "03. Module Delivery",
        description: "Delivering functional modules in phases to prevent operational disruption."
      },
      {
        title: "04. Team Handover",
        description: "Comprehensive technical documentation and internal staff onboarding."
      }
    ],
    iconName: "Wrench",
    imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Custom Software Development and Enterprise ERP Architecture by ORBIT-I"
  },
  {
    id: "srv-4",
    title: "UI/UX Design Systems & Brand Strategy",
    slug: "ui-ux-design",
    summary: "Human-centered interfaces engineered for cognitive clarity and high task completion rates.",
    description: "Our UI/UX design practice combines behavioral psychology, accessibility standards, and clean design tokens. We build interactive prototypes and scalable design systems that developers can implement without friction.",
    detailedDescription: "Elevate user engagement with refined digital aesthetics. From user journey mapping, wireframing, and interactive Figma prototypes to WCAG AA accessibility compliance and direct CSS design token pipelines, we create digital products that look stunning and convert reliably.",
    benefits: [
      "WCAG AA/AAA accessible color palettes and typography scales",
      "Comprehensive Figma component libraries and design tokens",
      "Reduced user drop-off and friction across complex workflows",
      "Seamless handoff with pixel-accurate CSS specifications"
    ],
    technologies: ["Figma", "Design Systems", "Interactive Prototyping", "TailwindCSS", "Wireframing", "WCAG Accessibility"],
    processSteps: [
      {
        title: "01. User Research",
        description: "Task analysis, user personas, and information architecture mapping."
      },
      {
        title: "02. Wireframing",
        description: "Low-fidelity layout validation focusing on hierarchy and eye tracking."
      },
      {
        title: "03. Visual Systems",
        description: "High-fidelity UI screens, micro-interactions, and responsive design."
      },
      {
        title: "04. Design Token Handoff",
        description: "Direct token export to CSS variables for frictionless dev implementation."
      }
    ],
    iconName: "Sparkles",
    imageUrl: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "UI UX Design Systems and Interactive Prototyping by ORBIT-I"
  },
  {
    id: "srv-5",
    title: "Cloud & DevOps Infrastructure",
    slug: "cloud-devops",
    summary: "Resilient cloud infrastructure, automated CI/CD pipelines, and zero-downtime deployments.",
    description: "We configure cloud environments, containerized deployments, automated database backups, and health monitoring so your production systems remain online, fast, and secure under peak traffic.",
    detailedDescription: "Architect robust server architectures that never crash under load. We provision Linux cloud servers, Docker container stacks, automated GitHub Actions CI/CD workflows, Cloudflare enterprise edge caching, and offsite encrypted MySQL backups guaranteed to achieve 99.9% uptime SLA.",
    benefits: [
      "Automated zero-downtime CI/CD deployment pipelines",
      "Isolated staging and production environments",
      "Automated daily offsite MySQL database backups",
      "Real-time uptime monitoring and incident alerting"
    ],
    technologies: ["Linux", "Docker", "AWS Cloud", "Kubernetes", "Nginx", "CI/CD Pipelines", "Cloudflare", "MySQL Clusters"],
    processSteps: [
      {
        title: "01. Infrastructure Audit",
        description: "Security review of server configs, SSL, and network architecture."
      },
      {
        title: "02. Architecture Blueprint",
        description: "Right-sized infrastructure plan designed for cost efficiency."
      },
      {
        title: "03. Pipeline Automation",
        description: "Configuring automated builds, linting, tests, and deployments."
      },
      {
        title: "04. Runbook Transfer",
        description: "Disaster recovery protocols and system access provided to client."
      }
    ],
    iconName: "Cloud",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Enterprise Cloud Infrastructure and DevOps Automation by ORBIT-I"
  },
  {
    id: "srv-6",
    title: "Enterprise API & Payment Gateway Integrations",
    slug: "enterprise-integrations",
    summary: "Secure payment gateways, banking APIs, ERP connectors, and webhooks architecture.",
    description: "Connect your core platform with critical third-party ecosystems: payment processing, ERPs, accounting software, SMS/Email notification rails, and webhooks with guaranteed delivery and idempotency.",
    detailedDescription: "Ensure frictionless financial and data interoperability. We integrate international and local payment rails (Stripe, PayPal, PayFast, Banking APIs), ERP synchronization, CRM webhooks, and SMS notification gateways with cryptographic signature verification and idempotent delivery.",
    benefits: [
      "Idempotent webhook handlers preventing duplicate transactions",
      "Enterprise-grade cryptographic signature verification",
      "High-throughput rate limiting and anti-abuse safeguards",
      "Structured audit logging for full regulatory compliance"
    ],
    technologies: ["Node.js", "REST APIs", "Webhooks", "Stripe / Payment Rails", "GraphQL", "HMAC Verification", "OAuth2"],
    processSteps: [
      {
        title: "01. API Contract Design",
        description: "OpenAPI/Swagger documentation and schema validation."
      },
      {
        title: "02. Security Implementation",
        description: "HMAC verification, rate-limiting, and encryption in transit."
      },
      {
        title: "03. Sandbox Testing",
        description: "Simulated failure states, network timeouts, and reconciliation testing."
      },
      {
        title: "04. Go-Live Verification",
        description: "Live transaction verification and monitoring dashboards."
      }
    ],
    iconName: "Cpu",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Secure Enterprise API and Payment Gateway Integrations by ORBIT-I"
  }
];
var DEPARTMENTS_DATA = [
  {
    id: "dep-lead",
    name: "Executive Leadership",
    code: "LEAD",
    description: "Corporate governance, technical strategy, and overall company operations.",
    headName: "Abdul Samad Rind",
    headTitle: "Chief Executive Officer & Founder",
    teamsCount: 1,
    membersCount: 3,
    status: "active"
  },
  {
    id: "dep-eng",
    name: "Engineering & Software Systems",
    code: "ENG",
    description: "Full-stack application engineering, distributed microservices, and database architecture.",
    headName: "Abdul Rehman",
    headTitle: "Chief Technology Officer",
    teamsCount: 3,
    membersCount: 8,
    status: "active"
  },
  {
    id: "dep-ai",
    name: "Artificial Intelligence & Research",
    code: "AI-RES",
    description: "Applied machine learning, NLP pipelines, data modeling, and algorithmic workflows.",
    headName: "Syeda Fatima Zahra",
    headTitle: "Principal AI & Machine Learning Engineer",
    teamsCount: 1,
    membersCount: 4,
    status: "active"
  },
  {
    id: "dep-sec",
    name: "DevOps & Cyber Infrastructure",
    code: "OPS-SEC",
    description: "Cloud orchestration, automated CI/CD deployment pipelines, hardening, and automated backups.",
    headName: "Hassan Raza",
    headTitle: "Cloud Infrastructure & Security Engineer",
    teamsCount: 2,
    membersCount: 4,
    status: "active"
  },
  {
    id: "dep-des",
    name: "Product & Design Systems",
    code: "DES",
    description: "Human-centered design systems, WCAG accessibility, and client design tokens.",
    headName: "Ayesha Tariq",
    headTitle: "Head of Product Design & UX",
    teamsCount: 1,
    membersCount: 3,
    status: "active"
  }
];
var TEAMS_DATA = [
  {
    id: "team-exec",
    departmentId: "dep-lead",
    departmentName: "Executive Leadership",
    name: "Corporate Strategy & Governance",
    leadName: "Abdul Samad Rind",
    memberCount: 3,
    currentProject: "Company Scalability & Enterprise Retainers"
  },
  {
    id: "team-web",
    departmentId: "dep-eng",
    departmentName: "Engineering & Software Systems",
    name: "Web Applications & Core Platform",
    leadName: "Bilal Ahmed Khan",
    memberCount: 4,
    currentProject: "Enterprise Client Portals & High-Throughput APIs"
  },
  {
    id: "team-mob",
    departmentId: "dep-eng",
    departmentName: "Engineering & Software Systems",
    name: "Mobile Engineering",
    leadName: "Abdul Rehman",
    memberCount: 3,
    currentProject: "Cross-Platform Financial Client Mobile App"
  },
  {
    id: "team-nlp",
    departmentId: "dep-ai",
    departmentName: "Artificial Intelligence & Research",
    name: "Applied Machine Learning & NLP",
    leadName: "Syeda Fatima Zahra",
    memberCount: 4,
    currentProject: "Automated Document Information Extraction"
  },
  {
    id: "team-cloud",
    departmentId: "dep-sec",
    departmentName: "DevOps & Cyber Infrastructure",
    name: "Cloud & Linux Systems Security",
    leadName: "Hassan Raza",
    memberCount: 2,
    currentProject: "Automated MySQL Multi-Region Backup Verification"
  },
  {
    id: "team-ux",
    departmentId: "dep-des",
    departmentName: "Product & Design Systems",
    name: "Design Systems & Accessibility",
    leadName: "Ayesha Tariq",
    memberCount: 3,
    currentProject: "Orbit-I Corporate Zero-Gradient Design System"
  }
];
var INITIAL_USERS = [
  // Executive Leadership
  {
    id: "usr-1",
    name: "Abdul Samad Rind",
    email: "contactus@orbit-i.tech",
    role: "CEO",
    category: "internal",
    department: "Executive Leadership",
    team: "Founding Governance",
    joinedDate: "2024-01-01",
    status: "active",
    avatarUrl: "/AbdulSamad.jpeg"
  },
  {
    id: "usr-2",
    name: "Maria Almani",
    email: "contactus@orbit-i.tech",
    role: "COO",
    category: "internal",
    department: "Operations & Strategy",
    team: "Client Operations & Velocity",
    joinedDate: "2024-01-01",
    status: "active"
  },
  {
    id: "usr-3",
    name: "Muhammad Muneeb Ur Rahman Shahzad",
    email: "contactus@orbit-i.tech",
    role: "CTO",
    category: "internal",
    department: "Engineering & Technology",
    team: "Architecture & Core Systems",
    joinedDate: "2024-01-01",
    status: "active"
  },
  // Core Engineering & Delivery Team ("Inky nichy")
  {
    id: "usr-4",
    name: "Hassan Ansar",
    email: "contactus@orbit-i.tech",
    role: "Senior Engineer",
    category: "internal",
    department: "Web Engineering",
    team: "Frontend & Full Stack Applications",
    joinedDate: "2024-02-15",
    status: "active"
  },
  {
    id: "usr-5",
    name: "Waleed Ahmed",
    email: "contactus@orbit-i.tech",
    role: "Manager",
    category: "internal",
    department: "Marketing & Growth",
    team: "Digital Marketing & Growth",
    joinedDate: "2024-03-01",
    status: "active"
  },
  {
    id: "usr-6",
    name: "Rashid Ali Channa",
    email: "contactus@orbit-i.tech",
    role: "Senior Engineer",
    category: "internal",
    department: "Artificial Intelligence & Research",
    team: "AI & Machine Learning",
    joinedDate: "2024-02-01",
    status: "active"
  },
  {
    id: "usr-7",
    name: "Laiba",
    email: "contactus@orbit-i.tech",
    role: "Team Member",
    category: "internal",
    department: "Backend & Systems",
    team: "API Engineering & Databases",
    joinedDate: "2024-04-10",
    status: "active"
  },
  {
    id: "usr-8",
    name: "Abdul Rehman",
    email: "contactus@orbit-i.tech",
    role: "Senior Engineer",
    category: "internal",
    department: "Enterprise .NET Systems",
    team: "C# & .NET Microservices",
    joinedDate: "2024-03-15",
    status: "active"
  },
  {
    id: "usr-9",
    name: "Chander Parkash",
    email: "contactus@orbit-i.tech",
    role: "Database Administrator",
    category: "internal",
    department: "Database Systems & Architecture",
    team: "Relational Database Infrastructure",
    joinedDate: "2024-04-01",
    status: "active"
  },
  {
    id: "usr-10",
    name: "Hamnah",
    email: "contactus@orbit-i.tech",
    role: "Team Member",
    category: "internal",
    department: "Product & Design Systems",
    team: "UI / UX Design",
    joinedDate: "2024-02-20",
    status: "active"
  },
  // Interns
  {
    id: "usr-11",
    name: "Muhammad Zeeshan",
    email: "zeeshan.dev@gmail.com",
    role: "Intern",
    category: "internal",
    department: "Web Engineering",
    team: "Frontend & Full Stack Applications",
    joinedDate: "2026-01-01",
    status: "active"
  },
  // External Users (Clients & Partners)
  {
    id: "usr-ext-1",
    name: "Tariq Mansoor",
    email: "tariq@apexholdings.com",
    role: "Client",
    category: "external",
    department: "Apex Global Logistics",
    joinedDate: "2025-11-20",
    status: "active"
  },
  {
    id: "usr-ext-2",
    name: "Dr. Sarah Collins",
    email: "collinss@medisphere-tech.org",
    role: "Client",
    category: "external",
    department: "Medisphere Systems",
    joinedDate: "2025-12-05",
    status: "active"
  },
  {
    id: "usr-ext-3",
    name: "Khurram Jamil",
    email: "khurram@cloudrail-partners.io",
    role: "Partner",
    category: "external",
    department: "CloudRail Infrastructure",
    joinedDate: "2025-08-14",
    status: "active"
  }
];
var VERIFIED_CERTIFICATES = {
  "ORBIT-I/INT/2026/01": {
    certificateId: "ORBIT-I/INT/2026/01",
    fullName: "Muhammad Zeeshan",
    email: "zeeshan.dev@gmail.com",
    phone: "+92 300 1234567",
    department: "Full Stack Development",
    role: "Full Stack Engineering Intern",
    startDate: "2026-01-01",
    endDate: "2026-03-25",
    duration: "3 Months",
    completionStatus: "completed",
    certificateStatus: "valid",
    gradePerformance: "Distinction (A+)",
    verificationCode: "ORB-SEC-7890-VLD-2026",
    issueDate: "2026-03-25",
    remarks: "Demonstrated outstanding architectural skills in React, Node.js, and cloud deployment pipelines.",
    isAuthentic: true
  },
  "ORBIT-I/INT/2026/02": {
    certificateId: "ORBIT-I/INT/2026/02",
    fullName: "Ayesha Khan",
    email: "ayesha.ai@gmail.com",
    phone: "+92 301 7654321",
    department: "Artificial Intelligence & Data",
    role: "AI / ML Research Intern",
    startDate: "2026-01-01",
    endDate: "2026-03-25",
    duration: "3 Months",
    completionStatus: "completed",
    certificateStatus: "valid",
    gradePerformance: "Grade A",
    verificationCode: "ORB-SEC-7891-VLD-2026",
    issueDate: "2026-03-25",
    remarks: "Successfully trained and evaluated NLP model pipelines with high precision.",
    isAuthentic: true
  },
  "ORBIT-I/INT/2026/03": {
    certificateId: "ORBIT-I/INT/2026/03",
    fullName: "Hamza Farooq",
    email: "hamza.uiux@gmail.com",
    phone: "+92 312 9876543",
    department: "UI/UX & Product Design",
    role: "Product Design Intern",
    startDate: "2026-02-01",
    endDate: "2026-04-30",
    duration: "3 Months",
    completionStatus: "in_progress",
    certificateStatus: "valid",
    gradePerformance: "In Progress (A)",
    verificationCode: "ORB-SEC-7892-PRG-2026",
    issueDate: "2026-02-01",
    remarks: "Currently working on enterprise corporate design systems and accessibility audit.",
    isAuthentic: true
  }
};
var CLIENT_PROJECTS = [
  {
    id: "prj-101",
    title: "Fleet Logistics & Dispatch Platform",
    clientOrg: "Apex Global Logistics",
    serviceType: "Web Application & Custom ERP",
    status: "Active",
    health: "Optimal",
    startDate: "2026-01-12",
    estimatedCompletion: "2026-05-30",
    progressPercent: 78,
    currentMilestone: "Phase 3: Real-Time Telemetry Ingestion & Driver Portal",
    recentDeliverable: "Sprint 6 Signed Off (API Rate Limit & Webhooks Implemented)",
    repositoryAccess: "Client Organization GitHub Read-Only Granted",
    securityAuditPassed: true,
    documents: [
      { name: "System_Architecture_v2.4.pdf", date: "2026-03-10", type: "PDF Spec", size: "2.4 MB" },
      { name: "Security_Penetration_Audit_Q1.pdf", date: "2026-03-15", type: "Audit Report", size: "1.8 MB" },
      { name: "Database_Schema_Migration_Plan.sql", date: "2026-03-22", type: "SQL Schema", size: "142 KB" }
    ]
  },
  {
    id: "prj-102",
    title: "Clinical Diagnostics Data Interface",
    clientOrg: "Medisphere Systems",
    serviceType: "Custom Software & HIPAA-Aligned API",
    status: "Review",
    health: "Optimal",
    startDate: "2025-11-01",
    estimatedCompletion: "2026-04-15",
    progressPercent: 92,
    currentMilestone: "Phase 4: Final UAT & Penetration Testing Report Signoff",
    recentDeliverable: "Encrypted HL7 / FHIR Ingestion Gateway Deployed to Staging",
    repositoryAccess: "Strict VPN Access Protected",
    securityAuditPassed: true,
    documents: [
      { name: "HIPAA_Compliance_Matrix_OrbitI.pdf", date: "2026-02-28", type: "Compliance", size: "3.1 MB" },
      { name: "UAT_Verification_Checklist.xlsx", date: "2026-03-18", type: "Testing Doc", size: "512 KB" }
    ]
  },
  {
    id: "prj-103",
    title: "Industrial Cold Storage IoT Monitoring",
    clientOrg: "AgriCold Warehouses",
    serviceType: "Cloud & DevOps Infrastructure",
    status: "Completed",
    health: "Optimal",
    startDate: "2025-08-15",
    estimatedCompletion: "2026-01-20",
    progressPercent: 100,
    currentMilestone: "Maintenance SLA Phase 1 (99.9% Target Monitored)",
    recentDeliverable: "Production Handover & Runbook Signoff Completed",
    repositoryAccess: "Private Repository Transferred to Client Ops",
    securityAuditPassed: true,
    documents: [
      { name: "Handover_Runbook_and_Credentials.pdf", date: "2026-01-22", type: "Runbook", size: "4.2 MB" },
      { name: "Final_Architecture_As_Built.pdf", date: "2026-01-20", type: "Architecture", size: "5.6 MB" }
    ]
  }
];
var INITIAL_CLIENTS = [
  {
    id: "cli-001",
    name: "Tariq Mansoor",
    organization: "Apex Global Logistics",
    email: "tariq@apexholdings.com",
    phone: "+971 50 892 4110",
    country: "United Arab Emirates",
    status: "Active",
    totalContractValue: 28500,
    paidAmount: 22e3,
    currency: "USD",
    projects: [CLIENT_PROJECTS[0]],
    queries: [
      {
        id: "qry-1",
        subject: "Staging API Webhook Rate Limiting",
        message: "Could you please confirm the webhook retry backoff policy on the driver tracking cluster?",
        date: "2026-03-29",
        status: "Answered",
        response: "Configured exponential backoff with 5 retry limits and HMAC SHA-256 signature verification."
      },
      {
        id: "qry-2",
        subject: "Driver Portal Multilingual Support",
        message: "We are requesting Arabic / Urdu localized labels for the warehouse dispatchers in sprint 7.",
        date: "2026-04-01",
        status: "In Review"
      }
    ],
    payments: [
      {
        id: "pay-01",
        title: "Phase 1 Architecture & Wireframe Signoff",
        amount: 8500,
        currency: "USD",
        status: "Paid",
        date: "2026-01-20",
        invoiceNumber: "INV-2026-001"
      },
      {
        id: "pay-02",
        title: "Phase 2 Core API & Telemetry Pipeline",
        amount: 13500,
        currency: "USD",
        status: "Paid",
        date: "2026-03-05",
        invoiceNumber: "INV-2026-042"
      },
      {
        id: "pay-03",
        title: "Phase 3 Driver Portal & Release Milestone",
        amount: 6500,
        currency: "USD",
        status: "Pending",
        date: "2026-04-15",
        invoiceNumber: "INV-2026-089"
      }
    ],
    notes: "Key enterprise logistics retainer. Sprints running on schedule.",
    joinedDate: "2026-01-12"
  },
  {
    id: "cli-002",
    name: "Dr. Sarah Collins",
    organization: "Medisphere Systems",
    email: "scollins@medispheresys.org",
    phone: "+1 415 670 9180",
    country: "United States",
    status: "Active",
    totalContractValue: 36e3,
    paidAmount: 32e3,
    currency: "USD",
    projects: [CLIENT_PROJECTS[1]],
    queries: [
      {
        id: "qry-3",
        subject: "HIPAA Cloud Architecture Audit Sign-off",
        message: "Reviewing the HIPAA data interface security audit report before UAT signoff.",
        date: "2026-03-31",
        status: "Answered",
        response: "Penetration testing report passed with zero critical CVE vulnerabilities."
      }
    ],
    payments: [
      {
        id: "pay-04",
        title: "Diagnostic Ingestion Engine Delivery",
        amount: 18e3,
        currency: "USD",
        status: "Paid",
        date: "2025-12-10",
        invoiceNumber: "INV-2025-912"
      },
      {
        id: "pay-05",
        title: "HIPAA Security Hardening & HL7 Gateway",
        amount: 14e3,
        currency: "USD",
        status: "Paid",
        date: "2026-02-28",
        invoiceNumber: "INV-2026-021"
      },
      {
        id: "pay-06",
        title: "Final Penetration Test & Deployment Retainer",
        amount: 4e3,
        currency: "USD",
        status: "Pending",
        date: "2026-04-30",
        invoiceNumber: "INV-2026-102"
      }
    ],
    notes: "Healthcare compliance contract. Final UAT milestone in progress.",
    joinedDate: "2025-11-01"
  },
  {
    id: "cli-003",
    name: "Khurram Jamil",
    organization: "AgriCold Warehouses",
    email: "kjamil@agricold.pk",
    phone: "+92 300 829 1102",
    country: "Pakistan",
    status: "Completed",
    totalContractValue: 18500,
    paidAmount: 18500,
    currency: "USD",
    projects: [CLIENT_PROJECTS[2]],
    queries: [
      {
        id: "qry-4",
        subject: "Q2 SLA Monitoring Maintenance Window",
        message: "Confirmed SLA monitoring window for the upcoming quarter without downtime.",
        date: "2026-03-25",
        status: "Closed",
        response: "Maintenance window scheduled on Sunday 02:00 UTC with zero client impact."
      }
    ],
    payments: [
      {
        id: "pay-07",
        title: "Full Platform Handover & SLA Settlement",
        amount: 18500,
        currency: "USD",
        status: "Paid",
        date: "2026-01-20",
        invoiceNumber: "INV-2026-011"
      }
    ],
    notes: "Completed project under annual maintenance & infrastructure SLA.",
    joinedDate: "2025-08-15"
  }
];

// server/db.ts
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var LOCAL_CACHE_PATH = path.resolve(__dirname, "orbit_local_storage.json");
var INITIAL_TEAM_MEMBERS = [
  {
    id: "tm-1",
    name: "Abdul Samad Rind",
    role: "Founder & CEO",
    tier: "leadership",
    department: "Executive Leadership",
    bio: "Founder and Chief Executive Officer steering ORBIT-I Private Limited. Focused on high-performance enterprise systems, sustainable technology architecture, and digital engineering partnerships across Pakistan and international markets.",
    avatar: "/Abdul Samad.jpeg",
    initials: "AS",
    email: "contactus@orbit-i.tech",
    linkedin: "https://www.linkedin.com/company/orbit-i-private-limited/",
    portfolio: "https://orbit-i.tech",
    whatsapp: "+92 3190375751",
    skills: ["Enterprise Systems", "Strategic Governance", "Cloud Architecture"],
    displayOrder: 1
  },
  {
    id: "tm-2",
    name: "Maria Almani",
    role: "Co-Founder & COO",
    tier: "leadership",
    department: "Operations & Strategy",
    bio: "Co-Founder and Chief Operating Officer overseeing client operations, sprint delivery management, team coordination, and strategic business growth for ORBIT-I engagements.",
    avatar: "",
    initials: "MA",
    email: "contactus@orbit-i.tech",
    linkedin: "https://www.linkedin.com/company/orbit-i-private-limited/",
    portfolio: "https://orbit-i.tech",
    whatsapp: "+92 3190375751",
    skills: ["Operations Management", "Agile Delivery", "Strategic Scaling"],
    displayOrder: 2
  },
  {
    id: "tm-3",
    name: "Muhammad Muneeb Ur Rahman Shahzad",
    role: "Co-Founder & CTO",
    tier: "leadership",
    department: "Engineering & Technology",
    bio: "Co-Founder and Chief Technology Officer orchestrating technical architecture, cloud scalability, secure relational database design, and software engineering standards.",
    avatar: "",
    initials: "MS",
    email: "contactus@orbit-i.tech",
    linkedin: "https://www.linkedin.com/company/orbit-i-private-limited/",
    portfolio: "https://orbit-i.tech",
    whatsapp: "+92 3190375751",
    skills: ["Core Systems", "Scalable Databases", "DevOps & Infrastructure"],
    displayOrder: 3
  },
  {
    id: "tm-4",
    name: "Hassan Ansar",
    role: "Web Developer",
    tier: "team",
    department: "Web Engineering",
    bio: "Frontend and full-stack web developer specializing in modern React, responsive client interfaces, high-performance web applications, and state architecture.",
    avatar: "",
    initials: "HA",
    email: "contactus@orbit-i.tech",
    linkedin: "https://www.linkedin.com/company/orbit-i-private-limited/",
    portfolio: "https://orbit-i.tech",
    whatsapp: "+92 3190375751",
    skills: ["React / Next.js", "TypeScript", "Tailwind CSS"],
    displayOrder: 4
  },
  {
    id: "tm-5",
    name: "Waleed Ahmed",
    role: "Digital Marketing Expert",
    tier: "team",
    department: "Marketing & Growth",
    bio: "Digital marketing strategist driving search engine visibility, brand communication, client acquisition funnels, and enterprise outreach for ORBIT-I digital platforms.",
    avatar: "",
    initials: "WA",
    email: "contactus@orbit-i.tech",
    linkedin: "https://www.linkedin.com/company/orbit-i-private-limited/",
    portfolio: "https://orbit-i.tech",
    whatsapp: "+92 3190375751",
    skills: ["Technical SEO", "Search Console", "Growth Funnels"],
    displayOrder: 5
  },
  {
    id: "tm-6",
    name: "Rashid Ali Channa",
    role: "AI / ML Engineer",
    tier: "team",
    department: "Artificial Intelligence & Research",
    bio: "Machine learning engineer designing predictive algorithms, computer vision pipelines, natural language processing models, and intelligent automated workflows.",
    avatar: "",
    initials: "RC",
    email: "contactus@orbit-i.tech",
    linkedin: "https://www.linkedin.com/company/orbit-i-private-limited/",
    portfolio: "https://orbit-i.tech",
    whatsapp: "+92 3190375751",
    skills: ["LLM Orchestration", "PyTorch / Python", "Vector Databases"],
    displayOrder: 6
  },
  {
    id: "tm-7",
    name: "Laiba",
    role: "Backend Developer",
    tier: "team",
    department: "Backend & Systems",
    bio: "Backend solutions engineer focusing on robust RESTful APIs, microservices architectures, data persistence, and secure authentication pipelines.",
    avatar: "",
    initials: "LB",
    email: "contactus@orbit-i.tech",
    linkedin: "https://www.linkedin.com/company/orbit-i-private-limited/",
    portfolio: "https://orbit-i.tech",
    whatsapp: "+92 3190375751",
    skills: ["RESTful APIs", "Node.js", "PostgreSQL"],
    displayOrder: 7
  },
  {
    id: "tm-8",
    name: "Abdul Rehman",
    role: ".NET Developer",
    tier: "team",
    department: "Enterprise .NET Systems",
    bio: "Enterprise .NET developer with expertise in C#, ASP.NET Core, Microsoft server environments, SQL database optimizations, and high-concurrency transactional pipelines.",
    avatar: "",
    initials: "AR",
    email: "contactus@orbit-i.tech",
    linkedin: "https://www.linkedin.com/company/orbit-i-private-limited/",
    portfolio: "https://orbit-i.tech",
    whatsapp: "+92 3190375751",
    skills: ["C# / .NET Core", "SQL Server", "Enterprise Microservices"],
    displayOrder: 8
  },
  {
    id: "tm-9",
    name: "Chander Parkash",
    role: "Database Administrator",
    tier: "team",
    department: "Database Systems & Architecture",
    bio: "Database Administrator specializing in enterprise SQL relational architectures, PostgreSQL and MySQL optimization, high-availability clustering, data migration, and backup integrity.",
    avatar: "",
    initials: "CP",
    email: "contactus@orbit-i.tech",
    linkedin: "https://www.linkedin.com/company/orbit-i-private-limited/",
    portfolio: "https://orbit-i.tech",
    whatsapp: "+92 3190375751",
    skills: ["PostgreSQL / MySQL", "Database Clustering", "Query Optimization"],
    displayOrder: 9
  },
  {
    id: "tm-10",
    name: "Hamnah",
    role: "UI / UX Designer",
    tier: "team",
    department: "Product & Design Systems",
    bio: "Product designer crafting elegant design systems, intuitive user workflows, responsive mobile wireframes, high-fidelity prototypes, and accessible visual user interfaces.",
    avatar: "",
    initials: "HN",
    email: "contactus@orbit-i.tech",
    linkedin: "https://www.linkedin.com/company/orbit-i-private-limited/",
    portfolio: "https://orbit-i.tech",
    whatsapp: "+92 3190375751",
    skills: ["Figma / Prototyping", "Design Systems", "Responsive UI/UX"],
    displayOrder: 10
  }
];
var INITIAL_MEDIA_ASSETS = [
  {
    id: "med-1",
    name: "Abdul Samad Rind \u2014 Founder & CEO Official Picture",
    url: "/Abdul Samad.jpeg",
    type: "image/jpeg",
    size: "66 KB",
    altText: "Abdul Samad Rind, Founder & CEO of ORBIT-I Private Limited",
    tags: ["Leadership", "CEO", "Founder", "Abdul Samad", "Executive"],
    uploadedAt: "2026-09-30"
  },
  {
    id: "med-2",
    name: "ORBIT-I Official Circular Space Logo",
    url: "/orbit-circular-logo.png",
    type: "image/png",
    size: "64 KB",
    altText: "ORBIT-I Private Limited official circular space brand emblem",
    tags: ["Logo", "Brand", "Circular", "Space", "Emblem"],
    uploadedAt: "2026-09-30"
  },
  {
    id: "med-3",
    name: "ORBIT-I Favicon",
    url: "/orbit-favicon.png",
    type: "image/png",
    size: "16 KB",
    altText: "ORBIT-I favicon browser icon",
    tags: ["Favicon", "Icon", "Browser"],
    uploadedAt: "2026-09-30"
  },
  {
    id: "med-4",
    name: "ORBIT-I Official Brand Header Logo",
    url: "/orbit-i-logo.png",
    type: "image/png",
    size: "650 KB",
    altText: "ORBIT-I Private Limited primary high-resolution emblem",
    tags: ["Logo", "Brand", "Header", "HighRes"],
    uploadedAt: "2026-09-30"
  }
];
var INITIAL_ARTICLES = [
  {
    id: "art-1",
    slug: "architecting-high-concurrency-microservices-2026",
    title: "Architecting High-Concurrency Microservices for Modern Pakistani Enterprises",
    category: "Software Architecture",
    author: "Muhammad Muneeb Ur Rahman Shahzad (Co-Founder & CTO)",
    publishedDate: "2026-09-15",
    readTime: "6 min read",
    tags: ["Microservices", "Distributed Systems", "MySQL", "Node.js", "High Concurrency", "Architecture"],
    excerpt: "A deep technical dive into zero-downtime database migrations, connection pooling, and latency reduction for regional e-commerce and logistics platforms.",
    content: `<h2>1. Strategic Architecture Overview</h2>
<p>Building resilient enterprise systems across Pakistan requires disciplined engineering decisions. In this briefing, ORBIT-I examines how we design distributed systems to handle high transactional volume without cascade failure.</p>
<h3>Key Architectural Pillars</h3>
<ul class="list-disc pl-5 my-4 space-y-1">
  <li><strong>Non-blocking I/O Event Loops:</strong> Leveraging Node.js and Go microservices for sub-15ms request handling.</li>
  <li><strong>Prepared Relational Statements:</strong> MySQL connection pool reuse with zero memory leaks.</li>
  <li><strong>Idempotent API Contracts:</strong> Enforcing cryptographic tokens for monetary and database operations.</li>
</ul>
<blockquote class="border-l-4 border-black pl-4 py-2 italic my-4 text-gray-800 bg-gray-50 rounded-r-lg">
  "Resilience is not merely handling expected peak load; it is recovering gracefully when network latency spikes unpredictably across regional telecom lines."
</blockquote>
<h2>2. Database Connection Pooling Benchmarks</h2>
<p>Optimizing relational pooling on Hostinger Cloud environments reduced p99 query latency from 145ms down to 18ms under 5,000 active concurrent simulated sockets.</p>`,
    status: "published",
    featuredImage: "/orbit-circular-logo.png",
    imageAlt: "ORBIT-I Microservices Architecture Diagram",
    metaTitle: "High-Concurrency Microservices Architecture | ORBIT-I Technical Insights",
    metaDescription: "Learn how ORBIT-I architectures resilient, high-concurrency microservices, connection pooling, and low-latency APIs for modern Pakistani enterprises.",
    focusKeywords: ["microservices pakistan", "high concurrency architecture", "relational database scaling"],
    canonicalUrl: "https://orbit-i.tech/blog/architecting-high-concurrency-microservices-2026"
  },
  {
    id: "art-2",
    slug: "strict-type-safety-full-stack-web-applications",
    title: "Why Strict Type-Safety is the Foundation of Long-Term Software Maintainability",
    category: "Web & Mobile Engineering",
    author: "Abdul Samad Rind (Founder & CEO)",
    publishedDate: "2026-08-20",
    readTime: "5 min read",
    tags: ["TypeScript", "Type Safety", "Clean Code", "Web Development", "React", "Node.js"],
    excerpt: "How end-to-end TypeScript validation from API contracts to UI components eliminates over 80% of runtime production errors.",
    content: `<h2>1. The Cost of Runtime Type Errors</h2>
<p>In custom software engineering, runtime errors in production directly translate to customer dissatisfaction and operational downtime. At ORBIT-I Private Limited, every system enforces strict compiler gates.</p>
<h3>Shared DTOs & Schema Contracts</h3>
<p>By sharing TypeScript interfaces between server route handlers and client React components, data contract changes are caught at compile-time rather than during production checkout or user onboarding.</p>
<blockquote class="border-l-4 border-black pl-4 py-2 italic my-4 text-gray-800 bg-gray-50 rounded-r-lg">
  "If the code compiles with zero warnings under strict mode, you have pre-emptively solved dozens of production regressions before a single customer clicks your portal."
</blockquote>`,
    status: "published",
    featuredImage: "/Abdul Samad.jpeg",
    imageAlt: "Abdul Samad Rind on TypeScript Engineering",
    metaTitle: "Strict Type-Safety in Full-Stack Web Applications | ORBIT-I Tech",
    metaDescription: "Discover how strict TypeScript contracts across frontend and backend layers eliminate production bugs and accelerate engineering sprint velocity.",
    focusKeywords: ["typescript web development", "full stack type safety", "software maintainability"],
    canonicalUrl: "https://orbit-i.tech/blog/strict-type-safety-full-stack-web-applications"
  },
  {
    id: "art-3",
    slug: "llm-orchestration-enterprise-automation-pakistan",
    title: "Enterprise AI & LLM Orchestration: Transforming Business Workflows with Precision",
    category: "Artificial Intelligence & ML",
    author: "Rashid Ali Channa (AI / ML Engineer)",
    publishedDate: "2026-09-28",
    readTime: "7 min read",
    tags: ["AI", "Machine Learning", "LLMs", "Vector Databases", "LangChain", "Python"],
    excerpt: "Deploying private Retrieval-Augmented Generation (RAG) pipelines, semantic embeddings, and automated business agents without corporate data leakage.",
    content: `<h2>1. The Next Evolution of Enterprise Automation</h2>
<p>Enterprises generate petabytes of proprietary manuals, contracts, and ticketing history. ORBIT-I designs private RAG pipelines that index your documents inside vector stores, allowing intelligent conversational search with verifiable source citations.</p>
<h3>Security and Data Sovereignty</h3>
<p>Proprietary enterprise documents never train public foundation models. We implement isolated embedding stores with strict role-based access control.</p>`,
    status: "published",
    featuredImage: "/orbit-i-logo.png",
    imageAlt: "Enterprise AI & LLM Pipelines",
    metaTitle: "Enterprise LLM Orchestration & AI Workflows | ORBIT-I AI Research",
    metaDescription: "Guide to building private RAG systems, local LLM orchestration, and vector retrieval pipelines for automated enterprise operations.",
    focusKeywords: ["enterprise ai pakistan", "llm orchestration", "rag pipelines", "vector search"],
    canonicalUrl: "https://orbit-i.tech/blog/llm-orchestration-enterprise-automation-pakistan"
  }
];
var memoryStore = {
  company: { ...COMPANY_INFO },
  services: [...VERIFIED_SERVICES],
  team: [...INITIAL_TEAM_MEMBERS],
  certificates: { ...VERIFIED_CERTIFICATES },
  inquiries: [],
  media: [...INITIAL_MEDIA_ASSETS],
  settings: {},
  articles: [...INITIAL_ARTICLES]
};
function loadLocalCache() {
  try {
    if (fs.existsSync(LOCAL_CACHE_PATH)) {
      const data = JSON.parse(fs.readFileSync(LOCAL_CACHE_PATH, "utf-8"));
      if (data && typeof data === "object") {
        memoryStore = { ...memoryStore, ...data };
      }
    }
  } catch (err) {
    console.warn("[STORAGE] Note: Could not read local storage cache, using defaults.");
  }
}
function saveLocalCache() {
  try {
    fs.writeFileSync(LOCAL_CACHE_PATH, JSON.stringify(memoryStore, null, 2), "utf-8");
  } catch (err) {
    console.warn("[STORAGE] Note: Could not write local storage cache.", err);
  }
}
loadLocalCache();
var pool = null;
var isMysqlConnected = false;
var dbErrorMessage = null;
async function initDatabase() {
  const host = process.env.DB_HOST || "localhost";
  const port = parseInt(process.env.DB_PORT || "3306", 10);
  const user = process.env.DB_USER || "root";
  const password = process.env.DB_PASSWORD || "";
  const database = process.env.DB_NAME || "orbit_i_db";
  const connectionLimit = parseInt(process.env.DB_CONNECTION_LIMIT || "10", 10);
  try {
    pool = mysql.createPool({
      host,
      port,
      user,
      password,
      database,
      waitForConnections: true,
      connectionLimit,
      queueLimit: 0,
      connectTimeout: 5e3
    });
    const connection = await pool.getConnection();
    await connection.ping();
    connection.release();
    isMysqlConnected = true;
    dbErrorMessage = null;
    console.log(`[ORBIT-I DATABASE] \u2705 Connected to MySQL successfully at ${host}:${port}/${database}`);
    await autoMigrateTables();
    return {
      success: true,
      isMysql: true,
      message: `MySQL connected on ${host}:${port}/${database}`
    };
  } catch (err) {
    isMysqlConnected = false;
    dbErrorMessage = err.message;
    console.log(
      `[ORBIT-I DATABASE] \u2139\uFE0F MySQL not active at ${host}:${port} (${err.message}). Seamlessly running in Local Memory/File Fallback Mode.`
    );
    console.log(
      `[ORBIT-I DATABASE] \u{1F4A1} Hostinger tip: Enter your Hostinger MySQL DB_HOST, DB_USER, DB_PASSWORD, DB_NAME in .env to connect Hostinger MySQL.`
    );
    return {
      success: true,
      isMysql: false,
      message: `Running in Local Persistent Fallback Mode: ${err.message}`
    };
  }
}
async function autoMigrateTables() {
  if (!pool || !isMysqlConnected) return;
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS \`company_info\` (
        \`id\` INT NOT NULL AUTO_INCREMENT,
        \`name\` VARCHAR(100) NOT NULL DEFAULT 'ORBIT-I',
        \`legal_name\` VARCHAR(150) NOT NULL DEFAULT 'ORBIT-I Private Limited',
        \`tagline\` VARCHAR(255) NOT NULL,
        \`founder\` VARCHAR(100) NOT NULL DEFAULT 'Abdul Samad Rind',
        \`co_founders\` TEXT,
        \`logo_url\` VARCHAR(255) NOT NULL,
        \`summary\` TEXT NOT NULL,
        \`email\` VARCHAR(120) NOT NULL,
        \`phone\` VARCHAR(50) NOT NULL,
        \`location\` VARCHAR(150) NOT NULL,
        \`website\` VARCHAR(200) NOT NULL,
        \`social_links\` TEXT,
        \`established\` VARCHAR(10) NOT NULL,
        \`registration_type\` VARCHAR(100) NOT NULL,
        \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    await pool.query(`
      CREATE TABLE IF NOT EXISTS \`team_members\` (
        \`id\` VARCHAR(64) NOT NULL,
        \`name\` VARCHAR(120) NOT NULL,
        \`role\` VARCHAR(100) NOT NULL,
        \`tier\` ENUM('leadership', 'team') NOT NULL DEFAULT 'team',
        \`department\` VARCHAR(120) NOT NULL,
        \`bio\` TEXT NOT NULL,
        \`avatar\` VARCHAR(255) DEFAULT NULL,
        \`initials\` VARCHAR(10) NOT NULL,
        \`email\` VARCHAR(120) NOT NULL,
        \`linkedin\` VARCHAR(255) DEFAULT NULL,
        \`portfolio\` VARCHAR(255) DEFAULT NULL,
        \`whatsapp\` VARCHAR(50) DEFAULT NULL,
        \`skills\` TEXT,
        \`display_order\` INT NOT NULL DEFAULT 0,
        \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    await pool.query(`
      CREATE TABLE IF NOT EXISTS \`services\` (
        \`id\` VARCHAR(64) NOT NULL,
        \`title\` VARCHAR(150) NOT NULL,
        \`slug\` VARCHAR(150) NOT NULL UNIQUE,
        \`summary\` VARCHAR(255) NOT NULL,
        \`description\` TEXT NOT NULL,
        \`benefits\` TEXT,
        \`technologies\` TEXT,
        \`process_steps\` TEXT,
        \`icon_name\` VARCHAR(50) NOT NULL DEFAULT 'Code2',
        \`display_order\` INT NOT NULL DEFAULT 0,
        \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    await pool.query(`
      CREATE TABLE IF NOT EXISTS \`certificates\` (
        \`certificate_id\` VARCHAR(64) NOT NULL,
        \`full_name\` VARCHAR(120) NOT NULL,
        \`email\` VARCHAR(120) NOT NULL,
        \`phone\` VARCHAR(50) DEFAULT NULL,
        \`department\` VARCHAR(120) NOT NULL,
        \`role\` VARCHAR(120) NOT NULL,
        \`start_date\` DATE NOT NULL,
        \`end_date\` DATE NOT NULL,
        \`duration\` VARCHAR(50) NOT NULL DEFAULT '3 Months',
        \`completion_status\` ENUM('completed', 'in_progress') NOT NULL DEFAULT 'completed',
        \`certificate_status\` ENUM('valid', 'revoked') NOT NULL DEFAULT 'valid',
        \`grade_performance\` VARCHAR(50) NOT NULL DEFAULT 'Distinction (A+)',
        \`verification_code\` VARCHAR(64) NOT NULL,
        \`issue_date\` DATE NOT NULL,
        \`remarks\` TEXT,
        \`is_authentic\` TINYINT(1) NOT NULL DEFAULT 1,
        \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (\`certificate_id\`),
        UNIQUE KEY \`idx_ver_code\` (\`verification_code\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    await pool.query(`
      CREATE TABLE IF NOT EXISTS \`inquiries\` (
        \`id\` VARCHAR(64) NOT NULL,
        \`name\` VARCHAR(120) NOT NULL,
        \`email\` VARCHAR(120) NOT NULL,
        \`phone\` VARCHAR(50) DEFAULT NULL,
        \`company\` VARCHAR(120) DEFAULT NULL,
        \`service_required\` VARCHAR(120) NOT NULL DEFAULT 'General Consultation',
        \`budget_range\` VARCHAR(60) NOT NULL DEFAULT 'Flexible',
        \`timeline\` VARCHAR(60) NOT NULL DEFAULT 'Standard',
        \`message\` TEXT NOT NULL,
        \`status\` ENUM('New', 'In Review', 'Contacted', 'Archived') NOT NULL DEFAULT 'New',
        \`submitted_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    await pool.query(`
      CREATE TABLE IF NOT EXISTS \`media_assets\` (
        \`id\` VARCHAR(64) NOT NULL,
        \`name\` VARCHAR(150) NOT NULL,
        \`url\` VARCHAR(255) NOT NULL,
        \`type\` VARCHAR(50) NOT NULL DEFAULT 'image/jpeg',
        \`size\` VARCHAR(50) NOT NULL DEFAULT '64 KB',
        \`alt_text\` VARCHAR(255) NOT NULL,
        \`tags\` TEXT,
        \`uploaded_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    await pool.query(`
      CREATE TABLE IF NOT EXISTS \`site_settings\` (
        \`setting_key\` VARCHAR(64) NOT NULL,
        \`setting_value\` LONGTEXT NOT NULL,
        \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (\`setting_key\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    await pool.query(`
      CREATE TABLE IF NOT EXISTS \`articles\` (
        \`id\` VARCHAR(64) NOT NULL,
        \`slug\` VARCHAR(150) NOT NULL UNIQUE,
        \`title\` VARCHAR(255) NOT NULL,
        \`category\` VARCHAR(100) NOT NULL DEFAULT 'Software Engineering',
        \`author\` VARCHAR(150) NOT NULL DEFAULT 'Abdul Samad Rind (Founder & CEO)',
        \`published_date\` VARCHAR(50) NOT NULL,
        \`read_time\` VARCHAR(50) NOT NULL DEFAULT '5 min read',
        \`tags\` TEXT,
        \`excerpt\` TEXT NOT NULL,
        \`content\` LONGTEXT NOT NULL,
        \`status\` ENUM('published', 'draft') NOT NULL DEFAULT 'published',
        \`featured_image\` VARCHAR(255) DEFAULT NULL,
        \`image_alt\` VARCHAR(255) DEFAULT NULL,
        \`meta_title\` VARCHAR(255) DEFAULT NULL,
        \`meta_description\` TEXT,
        \`focus_keywords\` TEXT,
        \`canonical_url\` VARCHAR(255) DEFAULT NULL,
        \`last_modified\` VARCHAR(50) DEFAULT NULL,
        \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (\`id\`),
        INDEX \`idx_art_slug\` (\`slug\`),
        INDEX \`idx_art_cat\` (\`category\`),
        INDEX \`idx_art_stat\` (\`status\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    const [teamRows] = await pool.query(`SELECT COUNT(*) as count FROM \`team_members\``);
    if (teamRows[0]?.count === 0) {
      for (const tm of INITIAL_TEAM_MEMBERS) {
        await pool.query(
          `INSERT INTO \`team_members\` (\`id\`, \`name\`, \`role\`, \`tier\`, \`department\`, \`bio\`, \`avatar\`, \`initials\`, \`email\`, \`linkedin\`, \`portfolio\`, \`whatsapp\`, \`skills\`, \`display_order\`)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            tm.id,
            tm.name,
            tm.role,
            tm.tier,
            tm.department,
            tm.bio,
            tm.avatar || null,
            tm.initials,
            tm.email,
            tm.linkedin || null,
            tm.portfolio || null,
            tm.whatsapp || null,
            JSON.stringify(tm.skills),
            tm.displayOrder || 0
          ]
        );
      }
      console.log(`[ORBIT-I DATABASE] \u{1F680} Auto-seeded team_members table in MySQL.`);
    }
    const [srvRows] = await pool.query(`SELECT COUNT(*) as count FROM \`services\``);
    if (srvRows[0]?.count === 0) {
      let order = 1;
      for (const s of VERIFIED_SERVICES) {
        await pool.query(
          `INSERT INTO \`services\` (\`id\`, \`title\`, \`slug\`, \`summary\`, \`description\`, \`benefits\`, \`technologies\`, \`process_steps\`, \`icon_name\`, \`display_order\`)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            s.id,
            s.title,
            s.slug,
            s.summary,
            s.description,
            JSON.stringify(s.benefits),
            JSON.stringify(s.technologies),
            JSON.stringify(s.processSteps),
            s.iconName,
            order++
          ]
        );
      }
      console.log(`[ORBIT-I DATABASE] \u{1F680} Auto-seeded services table in MySQL.`);
    }
    const [certRows] = await pool.query(`SELECT COUNT(*) as count FROM \`certificates\``);
    if (certRows[0]?.count === 0) {
      for (const cert of Object.values(VERIFIED_CERTIFICATES)) {
        await pool.query(
          `INSERT INTO \`certificates\` (\`certificate_id\`, \`full_name\`, \`email\`, \`phone\`, \`department\`, \`role\`, \`start_date\`, \`end_date\`, \`duration\`, \`completion_status\`, \`certificate_status\`, \`grade_performance\`, \`verification_code\`, \`issue_date\`, \`remarks\`, \`is_authentic\`)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            cert.certificateId,
            cert.fullName,
            cert.email,
            cert.phone,
            cert.department,
            cert.role,
            cert.startDate,
            cert.endDate,
            cert.duration,
            cert.completionStatus,
            cert.certificateStatus,
            cert.gradePerformance,
            cert.verificationCode,
            cert.issueDate,
            cert.remarks,
            cert.isAuthentic ? 1 : 0
          ]
        );
      }
      console.log(`[ORBIT-I DATABASE] \u{1F680} Auto-seeded certificates table in MySQL.`);
    }
    const [artRows] = await pool.query(`SELECT COUNT(*) as count FROM \`articles\``);
    if (artRows[0]?.count === 0) {
      for (const a of INITIAL_ARTICLES) {
        await pool.query(
          `INSERT INTO \`articles\` (\`id\`, \`slug\`, \`title\`, \`category\`, \`author\`, \`published_date\`, \`read_time\`, \`tags\`, \`excerpt\`, \`content\`, \`status\`, \`featured_image\`, \`image_alt\`, \`meta_title\`, \`meta_description\`, \`focus_keywords\`, \`canonical_url\`)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            a.id,
            a.slug,
            a.title,
            a.category,
            a.author,
            a.publishedDate,
            a.readTime,
            JSON.stringify(a.tags || []),
            a.excerpt,
            a.content,
            a.status || "published",
            a.featuredImage || null,
            a.imageAlt || null,
            a.metaTitle || null,
            a.metaDescription || null,
            JSON.stringify(a.focusKeywords || []),
            a.canonicalUrl || null
          ]
        );
      }
      console.log(`[ORBIT-I DATABASE] \u{1F680} Auto-seeded articles table in MySQL.`);
    }
  } catch (err) {
    console.error(`[ORBIT-I DATABASE] Error in auto-migration:`, err.message);
  }
}
async function getCompanyInfo() {
  if (isMysqlConnected && pool) {
    try {
      const [rows] = await pool.query("SELECT * FROM `company_info` LIMIT 1");
      if (rows && rows.length > 0) {
        const r = rows[0];
        return {
          name: r.name,
          legalName: r.legal_name,
          tagline: r.tagline,
          founder: r.founder,
          coFounders: typeof r.co_founders === "string" ? JSON.parse(r.co_founders) : r.co_founders || [],
          logoUrl: r.logo_url,
          summary: r.summary,
          email: r.email,
          phone: r.phone,
          location: r.location,
          website: r.website,
          socialLinks: typeof r.social_links === "string" ? JSON.parse(r.social_links) : r.social_links || {},
          established: r.established,
          registrationType: r.registration_type
        };
      }
    } catch (err) {
      console.error("MySQL getCompanyInfo error:", err);
    }
  }
  return memoryStore.company;
}
async function updateCompanyInfo(data) {
  memoryStore.company = { ...memoryStore.company, ...data };
  saveLocalCache();
  if (isMysqlConnected && pool) {
    try {
      await pool.query(
        `UPDATE \`company_info\` SET
          \`name\` = ?, \`legal_name\` = ?, \`tagline\` = ?, \`founder\` = ?,
          \`co_founders\` = ?, \`logo_url\` = ?, \`summary\` = ?, \`email\` = ?,
          \`phone\` = ?, \`location\` = ?, \`website\` = ?, \`social_links\` = ?
        WHERE \`id\` = 1`,
        [
          memoryStore.company.name,
          memoryStore.company.legalName,
          memoryStore.company.tagline,
          memoryStore.company.founder,
          JSON.stringify(memoryStore.company.coFounders),
          memoryStore.company.logoUrl,
          memoryStore.company.summary,
          memoryStore.company.email,
          memoryStore.company.phone,
          memoryStore.company.location,
          memoryStore.company.website,
          JSON.stringify(memoryStore.company.socialLinks)
        ]
      );
    } catch (err) {
      console.error("MySQL updateCompanyInfo error:", err);
    }
  }
  return memoryStore.company;
}
async function getTeamMembers() {
  if (isMysqlConnected && pool) {
    try {
      const [rows] = await pool.query("SELECT * FROM `team_members` ORDER BY `display_order` ASC, `created_at` ASC");
      if (rows && rows.length > 0) {
        return rows.map((r) => ({
          id: r.id,
          name: r.name,
          role: r.role,
          tier: r.tier,
          department: r.department,
          bio: r.bio,
          avatar: r.avatar || "",
          initials: r.initials,
          email: r.email,
          linkedin: r.linkedin || "",
          portfolio: r.portfolio || "",
          whatsapp: r.whatsapp || "",
          skills: typeof r.skills === "string" ? JSON.parse(r.skills || "[]") : r.skills || [],
          displayOrder: r.display_order
        }));
      }
    } catch (err) {
      console.error("MySQL getTeamMembers error:", err);
    }
  }
  return memoryStore.team;
}
async function addTeamMember(member) {
  const newMember = {
    ...member,
    id: member.id || `tm-${Date.now()}`,
    initials: member.initials || member.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
  };
  memoryStore.team.push(newMember);
  saveLocalCache();
  if (isMysqlConnected && pool) {
    try {
      await pool.query(
        `INSERT INTO \`team_members\` (\`id\`, \`name\`, \`role\`, \`tier\`, \`department\`, \`bio\`, \`avatar\`, \`initials\`, \`email\`, \`linkedin\`, \`portfolio\`, \`whatsapp\`, \`skills\`, \`display_order\`)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          newMember.id,
          newMember.name,
          newMember.role,
          newMember.tier,
          newMember.department,
          newMember.bio,
          newMember.avatar || null,
          newMember.initials,
          newMember.email,
          newMember.linkedin || null,
          newMember.portfolio || null,
          newMember.whatsapp || null,
          JSON.stringify(newMember.skills || []),
          newMember.displayOrder || memoryStore.team.length
        ]
      );
    } catch (err) {
      console.error("MySQL addTeamMember error:", err);
    }
  }
  return newMember;
}
async function updateTeamMember(id, updates) {
  const index = memoryStore.team.findIndex((m) => m.id === id);
  if (index === -1) return null;
  memoryStore.team[index] = { ...memoryStore.team[index], ...updates };
  const updated = memoryStore.team[index];
  saveLocalCache();
  if (isMysqlConnected && pool) {
    try {
      await pool.query(
        `UPDATE \`team_members\` SET
          \`name\` = ?, \`role\` = ?, \`tier\` = ?, \`department\` = ?,
          \`bio\` = ?, \`avatar\` = ?, \`initials\` = ?, \`email\` = ?,
          \`linkedin\` = ?, \`portfolio\` = ?, \`whatsapp\` = ?, \`skills\` = ?, \`display_order\` = ?
        WHERE \`id\` = ?`,
        [
          updated.name,
          updated.role,
          updated.tier,
          updated.department,
          updated.bio,
          updated.avatar || null,
          updated.initials,
          updated.email,
          updated.linkedin || null,
          updated.portfolio || null,
          updated.whatsapp || null,
          JSON.stringify(updated.skills || []),
          updated.displayOrder || 0,
          id
        ]
      );
    } catch (err) {
      console.error("MySQL updateTeamMember error:", err);
    }
  }
  return updated;
}
async function deleteTeamMember(id) {
  const index = memoryStore.team.findIndex((m) => m.id === id);
  if (index === -1) return false;
  memoryStore.team.splice(index, 1);
  saveLocalCache();
  if (isMysqlConnected && pool) {
    try {
      await pool.query("DELETE FROM `team_members` WHERE `id` = ?", [id]);
    } catch (err) {
      console.error("MySQL deleteTeamMember error:", err);
    }
  }
  return true;
}
async function getServices() {
  if (isMysqlConnected && pool) {
    try {
      const [rows] = await pool.query("SELECT * FROM `services` ORDER BY `display_order` ASC");
      if (rows && rows.length > 0) {
        return rows.map((r) => ({
          id: r.id,
          title: r.title,
          slug: r.slug,
          summary: r.summary,
          description: r.description,
          benefits: typeof r.benefits === "string" ? JSON.parse(r.benefits || "[]") : r.benefits || [],
          technologies: typeof r.technologies === "string" ? JSON.parse(r.technologies || "[]") : r.technologies || [],
          processSteps: typeof r.process_steps === "string" ? JSON.parse(r.process_steps || "[]") : r.process_steps || [],
          iconName: r.icon_name
        }));
      }
    } catch (err) {
      console.error("MySQL getServices error:", err);
    }
  }
  return memoryStore.services;
}
async function addService(service) {
  const newService = {
    ...service,
    id: service.id || `srv-${Date.now()}`,
    slug: service.slug || service.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
  };
  memoryStore.services.push(newService);
  saveLocalCache();
  if (isMysqlConnected && pool) {
    try {
      await pool.query(
        `INSERT INTO \`services\` (\`id\`, \`title\`, \`slug\`, \`summary\`, \`description\`, \`benefits\`, \`technologies\`, \`process_steps\`, \`icon_name\`, \`display_order\`)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          newService.id,
          newService.title,
          newService.slug,
          newService.summary,
          newService.description,
          JSON.stringify(newService.benefits || []),
          JSON.stringify(newService.technologies || []),
          JSON.stringify(newService.processSteps || []),
          newService.iconName || "Code2",
          memoryStore.services.length
        ]
      );
    } catch (err) {
      console.error("MySQL addService error:", err);
    }
  }
  return newService;
}
async function updateService(id, updates) {
  const index = memoryStore.services.findIndex((s) => s.id === id);
  if (index === -1) return null;
  memoryStore.services[index] = { ...memoryStore.services[index], ...updates };
  const updated = memoryStore.services[index];
  saveLocalCache();
  if (isMysqlConnected && pool) {
    try {
      await pool.query(
        `UPDATE \`services\` SET
          \`title\` = ?, \`slug\` = ?, \`summary\` = ?, \`description\` = ?,
          \`benefits\` = ?, \`technologies\` = ?, \`process_steps\` = ?, \`icon_name\` = ?
        WHERE \`id\` = ?`,
        [
          updated.title,
          updated.slug,
          updated.summary,
          updated.description,
          JSON.stringify(updated.benefits || []),
          JSON.stringify(updated.technologies || []),
          JSON.stringify(updated.processSteps || []),
          updated.iconName || "Code2",
          id
        ]
      );
    } catch (err) {
      console.error("MySQL updateService error:", err);
    }
  }
  return updated;
}
async function deleteService(id) {
  const index = memoryStore.services.findIndex((s) => s.id === id);
  if (index === -1) return false;
  memoryStore.services.splice(index, 1);
  saveLocalCache();
  if (isMysqlConnected && pool) {
    try {
      await pool.query("DELETE FROM `services` WHERE `id` = ?", [id]);
    } catch (err) {
      console.error("MySQL deleteService error:", err);
    }
  }
  return true;
}
async function getCertificates() {
  if (isMysqlConnected && pool) {
    try {
      const [rows] = await pool.query("SELECT * FROM `certificates` ORDER BY `created_at` DESC");
      if (rows && rows.length > 0) {
        return rows.map((r) => ({
          certificateId: r.certificate_id,
          fullName: r.full_name,
          email: r.email,
          phone: r.phone || "",
          department: r.department,
          role: r.role,
          startDate: r.start_date instanceof Date ? r.start_date.toISOString().split("T")[0] : String(r.start_date),
          endDate: r.end_date instanceof Date ? r.end_date.toISOString().split("T")[0] : String(r.end_date),
          duration: r.duration,
          completionStatus: r.completion_status,
          certificateStatus: r.certificate_status,
          gradePerformance: r.grade_performance,
          verificationCode: r.verification_code,
          issueDate: r.issue_date instanceof Date ? r.issue_date.toISOString().split("T")[0] : String(r.issue_date),
          remarks: r.remarks || "",
          isAuthentic: Boolean(r.is_authentic)
        }));
      }
    } catch (err) {
      console.error("MySQL getCertificates error:", err);
    }
  }
  return Object.values(memoryStore.certificates);
}
async function getCertificateById(id) {
  const normId = id.trim().toUpperCase();
  if (isMysqlConnected && pool) {
    try {
      const [rows] = await pool.query(
        "SELECT * FROM `certificates` WHERE UPPER(`certificate_id`) = ? OR UPPER(`verification_code`) = ? LIMIT 1",
        [normId, normId]
      );
      if (rows && rows.length > 0) {
        const r = rows[0];
        return {
          certificateId: r.certificate_id,
          fullName: r.full_name,
          email: r.email,
          phone: r.phone || "",
          department: r.department,
          role: r.role,
          startDate: r.start_date instanceof Date ? r.start_date.toISOString().split("T")[0] : String(r.start_date),
          endDate: r.end_date instanceof Date ? r.end_date.toISOString().split("T")[0] : String(r.end_date),
          duration: r.duration,
          completionStatus: r.completion_status,
          certificateStatus: r.certificate_status,
          gradePerformance: r.grade_performance,
          verificationCode: r.verification_code,
          issueDate: r.issue_date instanceof Date ? r.issue_date.toISOString().split("T")[0] : String(r.issue_date),
          remarks: r.remarks || "",
          isAuthentic: Boolean(r.is_authentic)
        };
      }
    } catch (err) {
      console.error("MySQL getCertificateById error:", err);
    }
  }
  for (const cert of Object.values(memoryStore.certificates)) {
    if (cert.certificateId.toUpperCase() === normId || cert.verificationCode.toUpperCase() === normId) {
      return cert;
    }
  }
  return null;
}
async function addCertificate(cert) {
  const certificateId = cert.certificateId || `ORBIT-I/INT/2026/${String(Date.now()).slice(-2)}`;
  const newCert = {
    ...cert,
    certificateId,
    verificationCode: cert.verificationCode || `ORB-SEC-${Math.floor(1e3 + Math.random() * 9e3)}-VLD-2026`,
    isAuthentic: true
  };
  memoryStore.certificates[certificateId] = newCert;
  saveLocalCache();
  if (isMysqlConnected && pool) {
    try {
      await pool.query(
        `INSERT INTO \`certificates\` (\`certificate_id\`, \`full_name\`, \`email\`, \`phone\`, \`department\`, \`role\`, \`start_date\`, \`end_date\`, \`duration\`, \`completion_status\`, \`certificate_status\`, \`grade_performance\`, \`verification_code\`, \`issue_date\`, \`remarks\`, \`is_authentic\`)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE \`full_name\` = VALUES(\`full_name\`), \`role\` = VALUES(\`role\`), \`completion_status\` = VALUES(\`completion_status\`)`,
        [
          newCert.certificateId,
          newCert.fullName,
          newCert.email,
          newCert.phone || null,
          newCert.department,
          newCert.role,
          newCert.startDate,
          newCert.endDate,
          newCert.duration,
          newCert.completionStatus,
          newCert.certificateStatus,
          newCert.gradePerformance,
          newCert.verificationCode,
          newCert.issueDate,
          newCert.remarks || null,
          newCert.isAuthentic ? 1 : 0
        ]
      );
    } catch (err) {
      console.error("MySQL addCertificate error:", err);
    }
  }
  return newCert;
}
async function updateCertificate(id, updates) {
  const cert = memoryStore.certificates[id];
  if (!cert) return null;
  memoryStore.certificates[id] = { ...cert, ...updates };
  const updated = memoryStore.certificates[id];
  saveLocalCache();
  if (isMysqlConnected && pool) {
    try {
      await pool.query(
        `UPDATE \`certificates\` SET
          \`full_name\` = ?, \`email\` = ?, \`phone\` = ?, \`department\` = ?,
          \`role\` = ?, \`start_date\` = ?, \`end_date\` = ?, \`duration\` = ?,
          \`completion_status\` = ?, \`certificate_status\` = ?, \`grade_performance\` = ?,
          \`verification_code\` = ?, \`issue_date\` = ?, \`remarks\` = ?, \`is_authentic\` = ?
        WHERE \`certificate_id\` = ?`,
        [
          updated.fullName,
          updated.email,
          updated.phone || null,
          updated.department,
          updated.role,
          updated.startDate,
          updated.endDate,
          updated.duration,
          updated.completionStatus,
          updated.certificateStatus,
          updated.gradePerformance,
          updated.verificationCode,
          updated.issueDate,
          updated.remarks || null,
          updated.isAuthentic ? 1 : 0,
          id
        ]
      );
    } catch (err) {
      console.error("MySQL updateCertificate error:", err);
    }
  }
  return updated;
}
async function deleteCertificate(id) {
  if (!memoryStore.certificates[id]) return false;
  delete memoryStore.certificates[id];
  saveLocalCache();
  if (isMysqlConnected && pool) {
    try {
      await pool.query("DELETE FROM `certificates` WHERE `certificate_id` = ?", [id]);
    } catch (err) {
      console.error("MySQL deleteCertificate error:", err);
    }
  }
  return true;
}
async function getInquiries() {
  if (isMysqlConnected && pool) {
    try {
      const [rows] = await pool.query("SELECT * FROM `inquiries` ORDER BY `submitted_at` DESC");
      if (rows) return rows;
    } catch (err) {
      console.error("MySQL getInquiries error:", err);
    }
  }
  return memoryStore.inquiries;
}
async function addInquiry(inquiry) {
  const newInq = {
    id: inquiry.id || `inq-${Date.now()}`,
    name: inquiry.name,
    email: inquiry.email,
    phone: inquiry.phone || "",
    company: inquiry.company || "",
    serviceRequired: inquiry.serviceRequired || "General Consultation",
    budgetRange: inquiry.budgetRange || "Flexible",
    timeline: inquiry.timeline || "Standard",
    message: inquiry.message,
    status: "New",
    submittedAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  memoryStore.inquiries.unshift(newInq);
  saveLocalCache();
  if (isMysqlConnected && pool) {
    try {
      await pool.query(
        `INSERT INTO \`inquiries\` (\`id\`, \`name\`, \`email\`, \`phone\`, \`company\`, \`service_required\`, \`budget_range\`, \`timeline\`, \`message\`, \`status\`)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          newInq.id,
          newInq.name,
          newInq.email,
          newInq.phone,
          newInq.company,
          newInq.serviceRequired,
          newInq.budgetRange,
          newInq.timeline,
          newInq.message,
          newInq.status
        ]
      );
    } catch (err) {
      console.error("MySQL addInquiry error:", err);
    }
  }
  return newInq;
}
async function updateInquiryStatus(id, status) {
  const inq = memoryStore.inquiries.find((i) => i.id === id);
  if (inq) {
    inq.status = status;
    saveLocalCache();
  }
  if (isMysqlConnected && pool) {
    try {
      await pool.query("UPDATE `inquiries` SET `status` = ? WHERE `id` = ?", [status, id]);
    } catch (err) {
      console.error("MySQL updateInquiryStatus error:", err);
    }
  }
  return true;
}
async function deleteInquiry(id) {
  const idx = memoryStore.inquiries.findIndex((i) => i.id === id);
  if (idx !== -1) {
    memoryStore.inquiries.splice(idx, 1);
    saveLocalCache();
  }
  if (isMysqlConnected && pool) {
    try {
      await pool.query("DELETE FROM `inquiries` WHERE `id` = ?", [id]);
    } catch (err) {
      console.error("MySQL deleteInquiry error:", err);
    }
  }
  return true;
}
async function getMediaAssets() {
  if (isMysqlConnected && pool) {
    try {
      const [rows] = await pool.query("SELECT * FROM `media_assets` ORDER BY `uploaded_at` DESC");
      if (rows && rows.length > 0) {
        return rows.map((r) => ({
          id: r.id,
          name: r.name,
          url: r.url,
          type: r.type,
          size: r.size,
          altText: r.alt_text,
          tags: typeof r.tags === "string" ? JSON.parse(r.tags || "[]") : r.tags || [],
          uploadedAt: r.uploaded_at instanceof Date ? r.uploaded_at.toISOString().split("T")[0] : String(r.uploaded_at)
        }));
      }
    } catch (err) {
      console.error("MySQL getMediaAssets error:", err);
    }
  }
  return memoryStore.media;
}
async function addMediaAsset(asset) {
  const newAsset = {
    id: asset.id || `med-${Date.now()}`,
    name: asset.name,
    url: asset.url,
    type: asset.type || "image/jpeg",
    size: asset.size || "50 KB",
    altText: asset.altText || asset.name,
    tags: asset.tags || ["General"],
    uploadedAt: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
  };
  memoryStore.media.push(newAsset);
  saveLocalCache();
  if (isMysqlConnected && pool) {
    try {
      await pool.query(
        `INSERT INTO \`media_assets\` (\`id\`, \`name\`, \`url\`, \`type\`, \`size\`, \`alt_text\`, \`tags\`)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          newAsset.id,
          newAsset.name,
          newAsset.url,
          newAsset.type,
          newAsset.size,
          newAsset.altText,
          JSON.stringify(newAsset.tags)
        ]
      );
    } catch (err) {
      console.error("MySQL addMediaAsset error:", err);
    }
  }
  return newAsset;
}
async function deleteMediaAsset(id) {
  const idx = memoryStore.media.findIndex((m) => m.id === id);
  if (idx !== -1) {
    memoryStore.media.splice(idx, 1);
    saveLocalCache();
  }
  if (isMysqlConnected && pool) {
    try {
      await pool.query("DELETE FROM `media_assets` WHERE `id` = ?", [id]);
    } catch (err) {
      console.error("MySQL deleteMediaAsset error:", err);
    }
  }
  return true;
}
async function getArticles(includeDrafts = false) {
  if (isMysqlConnected && pool) {
    try {
      const query = includeDrafts ? "SELECT * FROM `articles` ORDER BY `created_at` DESC" : "SELECT * FROM `articles` WHERE `status` = 'published' ORDER BY `created_at` DESC";
      const [rows] = await pool.query(query);
      if (rows && rows.length > 0) {
        return rows.map((r) => ({
          id: r.id,
          slug: r.slug,
          title: r.title,
          category: r.category,
          author: r.author,
          publishedDate: r.published_date,
          readTime: r.read_time,
          tags: typeof r.tags === "string" ? JSON.parse(r.tags || "[]") : r.tags || [],
          excerpt: r.excerpt,
          content: r.content,
          status: r.status,
          featuredImage: r.featured_image || "",
          imageAlt: r.image_alt || "",
          metaTitle: r.meta_title || "",
          metaDescription: r.meta_description || "",
          focusKeywords: typeof r.focus_keywords === "string" ? JSON.parse(r.focus_keywords || "[]") : r.focus_keywords || [],
          canonicalUrl: r.canonical_url || "",
          lastModified: r.last_modified || ""
        }));
      }
    } catch (err) {
      console.error("MySQL getArticles error:", err);
    }
  }
  return includeDrafts ? memoryStore.articles : memoryStore.articles.filter((a) => a.status === "published");
}
async function getArticleBySlug(slug) {
  const normSlug = slug.trim().toLowerCase();
  if (isMysqlConnected && pool) {
    try {
      const [rows] = await pool.query(
        "SELECT * FROM `articles` WHERE LOWER(`slug`) = ? OR LOWER(`id`) = ? LIMIT 1",
        [normSlug, normSlug]
      );
      if (rows && rows.length > 0) {
        const r = rows[0];
        return {
          id: r.id,
          slug: r.slug,
          title: r.title,
          category: r.category,
          author: r.author,
          publishedDate: r.published_date,
          readTime: r.read_time,
          tags: typeof r.tags === "string" ? JSON.parse(r.tags || "[]") : r.tags || [],
          excerpt: r.excerpt,
          content: r.content,
          status: r.status,
          featuredImage: r.featured_image || "",
          imageAlt: r.image_alt || "",
          metaTitle: r.meta_title || "",
          metaDescription: r.meta_description || "",
          focusKeywords: typeof r.focus_keywords === "string" ? JSON.parse(r.focus_keywords || "[]") : r.focus_keywords || [],
          canonicalUrl: r.canonical_url || "",
          lastModified: r.last_modified || ""
        };
      }
    } catch (err) {
      console.error("MySQL getArticleBySlug error:", err);
    }
  }
  return memoryStore.articles.find((a) => a.slug.toLowerCase() === normSlug || a.id.toLowerCase() === normSlug) || null;
}
async function addArticle(article) {
  const newArticle = {
    ...article,
    id: article.id || `art-${Date.now()}`,
    slug: article.slug || article.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
    publishedDate: article.publishedDate || (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    readTime: article.readTime || "5 min read",
    status: article.status || "published"
  };
  memoryStore.articles.unshift(newArticle);
  saveLocalCache();
  if (isMysqlConnected && pool) {
    try {
      await pool.query(
        `INSERT INTO \`articles\` (\`id\`, \`slug\`, \`title\`, \`category\`, \`author\`, \`published_date\`, \`read_time\`, \`tags\`, \`excerpt\`, \`content\`, \`status\`, \`featured_image\`, \`image_alt\`, \`meta_title\`, \`meta_description\`, \`focus_keywords\`, \`canonical_url\`, \`last_modified\`)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          newArticle.id,
          newArticle.slug,
          newArticle.title,
          newArticle.category,
          newArticle.author,
          newArticle.publishedDate,
          newArticle.readTime,
          JSON.stringify(newArticle.tags || []),
          newArticle.excerpt,
          newArticle.content,
          newArticle.status,
          newArticle.featuredImage || null,
          newArticle.imageAlt || null,
          newArticle.metaTitle || null,
          newArticle.metaDescription || null,
          JSON.stringify(newArticle.focusKeywords || []),
          newArticle.canonicalUrl || null,
          newArticle.lastModified || (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
        ]
      );
    } catch (err) {
      console.error("MySQL addArticle error:", err);
    }
  }
  return newArticle;
}
async function updateArticle(id, updates) {
  const index = memoryStore.articles.findIndex((a) => a.id === id || a.slug === id);
  if (index === -1) return null;
  memoryStore.articles[index] = { ...memoryStore.articles[index], ...updates };
  const updated = memoryStore.articles[index];
  saveLocalCache();
  if (isMysqlConnected && pool) {
    try {
      await pool.query(
        `UPDATE \`articles\` SET
          \`slug\` = ?, \`title\` = ?, \`category\` = ?, \`author\` = ?,
          \`published_date\` = ?, \`read_time\` = ?, \`tags\` = ?, \`excerpt\` = ?,
          \`content\` = ?, \`status\` = ?, \`featured_image\` = ?, \`image_alt\` = ?,
          \`meta_title\` = ?, \`meta_description\` = ?, \`focus_keywords\` = ?, \`canonical_url\` = ?,
          \`last_modified\` = ?
        WHERE \`id\` = ?`,
        [
          updated.slug,
          updated.title,
          updated.category,
          updated.author,
          updated.publishedDate,
          updated.readTime,
          JSON.stringify(updated.tags || []),
          updated.excerpt,
          updated.content,
          updated.status,
          updated.featuredImage || null,
          updated.imageAlt || null,
          updated.metaTitle || null,
          updated.metaDescription || null,
          JSON.stringify(updated.focusKeywords || []),
          updated.canonicalUrl || null,
          (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
          updated.id
        ]
      );
    } catch (err) {
      console.error("MySQL updateArticle error:", err);
    }
  }
  return updated;
}
async function deleteArticle(id) {
  const index = memoryStore.articles.findIndex((a) => a.id === id || a.slug === id);
  if (index === -1) return false;
  const actualId = memoryStore.articles[index].id;
  memoryStore.articles.splice(index, 1);
  saveLocalCache();
  if (isMysqlConnected && pool) {
    try {
      await pool.query("DELETE FROM `articles` WHERE `id` = ?", [actualId]);
    } catch (err) {
      console.error("MySQL deleteArticle error:", err);
    }
  }
  return true;
}
async function getDatabaseStatus() {
  const host = process.env.DB_HOST || "localhost";
  const port = process.env.DB_PORT || "3306";
  const database = process.env.DB_NAME || "orbit_i_db";
  const user = process.env.DB_USER || "root";
  let tableCounts = {
    team_members: memoryStore.team.length,
    services: memoryStore.services.length,
    certificates: Object.keys(memoryStore.certificates).length,
    inquiries: memoryStore.inquiries.length,
    media_assets: memoryStore.media.length,
    articles: memoryStore.articles.length
  };
  if (isMysqlConnected && pool) {
    try {
      const [t] = await pool.query("SELECT COUNT(*) as c FROM `team_members`");
      const [s] = await pool.query("SELECT COUNT(*) as c FROM `services`");
      const [c] = await pool.query("SELECT COUNT(*) as c FROM `certificates`");
      const [i] = await pool.query("SELECT COUNT(*) as c FROM `inquiries`");
      const [m] = await pool.query("SELECT COUNT(*) as c FROM `media_assets`");
      const [a] = await pool.query("SELECT COUNT(*) as c FROM `articles`");
      tableCounts = {
        team_members: t[0]?.c || 0,
        services: s[0]?.c || 0,
        certificates: c[0]?.c || 0,
        inquiries: i[0]?.c || 0,
        media_assets: m[0]?.c || 0,
        articles: a[0]?.c || 0
      };
    } catch (e) {
    }
  }
  return {
    isMysqlConnected,
    engine: isMysqlConnected ? "MySQL 8.0 / InnoDB (Hostinger Native)" : "Local File/Memory Fallback (Active)",
    host,
    port,
    database,
    user,
    hostingerPlatformReady: true,
    dbErrorMessage,
    tableCounts,
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  };
}

// server/security.ts
import crypto from "crypto";
function securityHeadersMiddleware(_req, res, next) {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=()");
  if (process.env.NODE_ENV === "production") {
    res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
  }
  const isDev = process.env.NODE_ENV !== "production";
  const cspDirectives = [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline' ${isDev ? "'unsafe-eval'" : ""} https://fonts.googleapis.com`,
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data: https: blob:",
    "connect-src 'self' ws: wss: https:",
    "frame-ancestors 'self'",
    "base-uri 'self'",
    "form-action 'self'"
  ].filter(Boolean).join("; ");
  res.setHeader("Content-Security-Policy", cspDirectives);
  next();
}
function createRateLimiter(options) {
  const ipStore = /* @__PURE__ */ new Map();
  setInterval(() => {
    const now = Date.now();
    for (const [ip, record] of ipStore.entries()) {
      const active = record.timestamps.filter((t) => now - t < options.windowMs);
      if (active.length === 0) {
        ipStore.delete(ip);
      } else {
        record.timestamps = active;
      }
    }
  }, Math.max(6e4, options.windowMs));
  return (req, res, next) => {
    const forwarded = req.headers["x-forwarded-for"];
    const ip = (typeof forwarded === "string" ? forwarded.split(",")[0].trim() : req.socket.remoteAddress) || "unknown";
    const now = Date.now();
    const record = ipStore.get(ip) || { timestamps: [] };
    const recent = record.timestamps.filter((t) => now - t < options.windowMs);
    if (recent.length >= options.maxRequests) {
      const oldest = recent[0];
      const retryAfterSec = Math.ceil((oldest + options.windowMs - now) / 1e3);
      res.setHeader("Retry-After", String(Math.max(1, retryAfterSec)));
      res.status(429).json({
        error: options.message,
        retryAfterSeconds: Math.max(1, retryAfterSec)
      });
      return;
    }
    recent.push(now);
    ipStore.set(ip, { timestamps: recent });
    next();
  };
}
var authRateLimiter = createRateLimiter({
  windowMs: 60 * 1e3,
  maxRequests: 5,
  message: "Too many authentication attempts. Please wait 60 seconds before trying again."
});
var contactRateLimiter = createRateLimiter({
  windowMs: 10 * 60 * 1e3,
  maxRequests: 5,
  message: "Inquiry submission limit reached. Please wait a few minutes or contact us directly via email."
});
var apiRateLimiter = createRateLimiter({
  windowMs: 60 * 1e3,
  maxRequests: 120,
  message: "Rate limit exceeded. Please throttle your requests."
});
var activeSessions = /* @__PURE__ */ new Map();
var SESSION_TTL_MS = 24 * 60 * 60 * 1e3;
setInterval(() => {
  const now = Date.now();
  for (const [token, session] of activeSessions.entries()) {
    if (session.expiresAt <= now) {
      activeSessions.delete(token);
    }
  }
}, 15 * 60 * 1e3);
function createSession(user) {
  const token = crypto.randomBytes(32).toString("hex");
  const now = Date.now();
  const session = {
    token,
    name: user.name,
    email: user.email,
    role: user.role,
    portalType: user.portalType,
    createdAt: now,
    expiresAt: now + SESSION_TTL_MS,
    lastActive: now
  };
  activeSessions.set(token, session);
  return session;
}
function getSession(token) {
  if (!token) return null;
  const session = activeSessions.get(token);
  if (!session) return null;
  if (session.expiresAt <= Date.now()) {
    activeSessions.delete(token);
    return null;
  }
  session.lastActive = Date.now();
  return session;
}
function revokeSession(token) {
  return activeSessions.delete(token);
}
function timingSafeCompare(candidate, secret) {
  if (!candidate || !secret) return false;
  const hashA = crypto.createHash("sha256").update(candidate).digest();
  const hashB = crypto.createHash("sha256").update(secret).digest();
  return crypto.timingSafeEqual(hashA, hashB);
}
function extractAuthToken(req) {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.slice(7).trim();
  }
  if (req.query && typeof req.query.token === "string") {
    return req.query.token.trim();
  }
  return null;
}
function requireAuth(allowedRoles) {
  return (req, res, next) => {
    const token = extractAuthToken(req);
    if (!token) {
      res.status(401).json({
        error: "Unauthorized: Authentication token is required to access this resource.",
        code: "AUTH_REQUIRED"
      });
      return;
    }
    const session = getSession(token);
    if (!session) {
      res.status(401).json({
        error: "Unauthorized: Session is invalid or has expired. Please log in again.",
        code: "SESSION_EXPIRED"
      });
      return;
    }
    if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(session.role)) {
      res.status(403).json({
        error: "Forbidden: You do not possess the required privileges to perform this action.",
        code: "INSUFFICIENT_PERMISSIONS"
      });
      return;
    }
    req.user = session;
    next();
  };
}
function optionalAuth(req, _res, next) {
  const token = extractAuthToken(req);
  if (token) {
    const session = getSession(token);
    if (session) {
      req.user = session;
    }
  }
  next();
}
function sanitizeString(input) {
  if (typeof input !== "string") return "";
  return input.replace(/\0/g, "").replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "").replace(/javascript:/gi, "").replace(/on\w+\s*=/gi, "").trim();
}
function isValidEmail(email) {
  if (!email || typeof email !== "string") return false;
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(email) && email.length <= 120;
}

// server.ts
dotenv.config();
var __filename2 = fileURLToPath2(import.meta.url);
var __dirname2 = path2.dirname(__filename2);
var app = express();
var PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3e3;
app.disable("x-powered-by");
app.use(securityHeadersMiddleware);
var rawOrigins = process.env.ALLOWED_ORIGINS || "";
var allowedOrigins = rawOrigins ? rawOrigins.split(",").map((o) => o.trim()) : [
  "http://localhost:3000",
  "http://localhost:5173",
  "http://127.0.0.1:3000",
  "http://127.0.0.1:5173",
  "https://orbit-i.tech",
  "https://www.orbit-i.tech"
];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== "production") {
        return callback(null, true);
      }
      return callback(new Error("Cross-Origin Request Blocked by ORBIT-I Security Gateway"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
  })
);
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true, limit: "25mb" }));
app.use(express.static(path2.resolve(__dirname2, "public")));
var apiRouter = express.Router();
apiRouter.use(apiRateLimiter);
apiRouter.post("/auth/login", authRateLimiter, (req, res) => {
  const { email, password, portalType } = req.body;
  if (!email || !password) {
    res.status(400).json({ error: "Email and password are required." });
    return;
  }
  const cleanEmail = sanitizeString(email).toLowerCase();
  const cleanPassword = String(password).trim();
  const targetMode = portalType === "client" ? "client" : "admin";
  const ADMIN_ACCOUNTS = [
    {
      email: (process.env.ADMIN_EMAIL || "admin@orbit-i.tech").toLowerCase(),
      password: process.env.ADMIN_PASSWORD || "OrbitAdmin#2026",
      name: process.env.ADMIN_NAME || "Executive Superadmin"
    },
    {
      email: (process.env.SECONDARY_ADMIN_EMAIL || "contactus@orbit-i.tech").toLowerCase(),
      password: process.env.ADMIN_PASSWORD || "OrbitAdmin#2026",
      name: "Corporate Administrator"
    }
  ];
  const CLIENT_EMAIL = (process.env.CLIENT_EMAIL || "client@orbit-i.tech").toLowerCase();
  const CLIENT_PASSWORD = process.env.CLIENT_PASSWORD || "Client#2026Secure";
  let isAuthenticated = false;
  let userName = "";
  let userRole = "client";
  if (targetMode === "admin") {
    const matched = ADMIN_ACCOUNTS.find(
      (acc) => acc.email.toLowerCase() === cleanEmail && (timingSafeCompare(cleanPassword, acc.password) || timingSafeCompare(cleanPassword, process.env.ADMIN_PORTAL_KEY || "orbit-i-admin-2026"))
    );
    if (matched) {
      isAuthenticated = true;
      userRole = "admin";
      userName = matched.name;
    }
  } else {
    const isEmailMatch = cleanEmail === CLIENT_EMAIL || cleanEmail === "client@orbit-i.tech" || cleanEmail === "client";
    const isPasswordMatch = timingSafeCompare(cleanPassword, CLIENT_PASSWORD);
    if (isEmailMatch && isPasswordMatch) {
      isAuthenticated = true;
      userRole = "client";
      userName = "Tariq Mansoor (Apex Global Logistics)";
    }
  }
  if (!isAuthenticated) {
    res.status(401).json({
      error: "Invalid credentials. Authentication failed.",
      code: "INVALID_CREDENTIALS"
    });
    return;
  }
  const session = createSession({
    name: userName,
    email: cleanEmail,
    role: userRole,
    portalType: targetMode
  });
  res.json({
    success: true,
    token: session.token,
    user: {
      name: session.name,
      email: session.email,
      role: session.role === "admin" ? "Executive Administrator" : "Authorized Enterprise Client",
      portalType: session.portalType,
      sessionStarted: (/* @__PURE__ */ new Date()).toLocaleTimeString()
    }
  });
});
apiRouter.get("/auth/session", (req, res) => {
  const token = extractAuthToken(req);
  if (!token) {
    res.status(401).json({ authenticated: false, message: "No session token provided." });
    return;
  }
  const session = getSession(token);
  if (!session) {
    res.status(401).json({ authenticated: false, message: "Session expired or invalid." });
    return;
  }
  res.json({
    authenticated: true,
    user: {
      name: session.name,
      email: session.email,
      role: session.role === "admin" ? "Executive Administrator" : "Authorized Enterprise Client",
      portalType: session.portalType,
      sessionStarted: new Date(session.createdAt).toLocaleTimeString()
    }
  });
});
apiRouter.post("/auth/logout", (req, res) => {
  const token = extractAuthToken(req);
  if (token) {
    revokeSession(token);
  }
  res.json({ success: true, message: "Logged out successfully." });
});
apiRouter.get("/health", async (_req, res) => {
  res.setHeader("Cache-Control", "no-store");
  const dbStatus = await getDatabaseStatus();
  res.json({
    status: "healthy",
    system: "ORBIT-I Production Engine",
    uptimeTarget: "99.9% Availability Target Architecture",
    database: {
      engine: dbStatus.engine,
      connected: dbStatus.isMysqlConnected,
      lastCheck: (/* @__PURE__ */ new Date()).toISOString()
    },
    cloudPlatformReady: true,
    serverTimestamp: (/* @__PURE__ */ new Date()).toISOString()
  });
});
apiRouter.get("/database/status", optionalAuth, async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  const status = await getDatabaseStatus();
  if (req.user && req.user.role === "admin") {
    res.json(status);
    return;
  }
  res.json({
    isMysqlConnected: status.isMysqlConnected,
    engine: status.engine,
    cloudPlatformReady: true,
    tableCounts: status.tableCounts,
    timestamp: status.timestamp
  });
});
apiRouter.get("/database/export-sql", requireAuth(["admin"]), (_req, res) => {
  const sqlPath = path2.resolve(__dirname2, "database.sql");
  if (fs2.existsSync(sqlPath)) {
    res.setHeader("Content-Type", "application/sql");
    res.setHeader("Content-Disposition", 'attachment; filename="orbit_i_production_database.sql"');
    res.sendFile(sqlPath);
  } else {
    res.status(404).json({ error: "database.sql file not found" });
  }
});
apiRouter.get("/company", async (_req, res) => {
  try {
    const company = await getCompanyInfo();
    res.json(company);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve company information." });
  }
});
apiRouter.put("/company", requireAuth(["admin"]), async (req, res) => {
  try {
    const sanitizedBody = {
      ...req.body,
      name: sanitizeString(req.body.name),
      legalName: sanitizeString(req.body.legalName),
      tagline: sanitizeString(req.body.tagline),
      founder: sanitizeString(req.body.founder),
      summary: sanitizeString(req.body.summary),
      email: sanitizeString(req.body.email),
      phone: sanitizeString(req.body.phone),
      location: sanitizeString(req.body.location),
      website: sanitizeString(req.body.website)
    };
    const updated = await updateCompanyInfo(sanitizedBody);
    res.json({ success: true, company: updated });
  } catch (err) {
    res.status(500).json({ error: "Failed to update company information." });
  }
});
apiRouter.get("/team", async (_req, res) => {
  try {
    const team = await getTeamMembers();
    res.json(team);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve team members." });
  }
});
apiRouter.post("/team", requireAuth(["admin"]), async (req, res) => {
  try {
    const { name, role, department, bio } = req.body;
    if (!name || !role || !department) {
      res.status(400).json({ error: "Name, role, and department are required." });
      return;
    }
    const cleanMember = {
      ...req.body,
      name: sanitizeString(name),
      role: sanitizeString(role),
      department: sanitizeString(department),
      bio: sanitizeString(bio || ""),
      email: sanitizeString(req.body.email || "")
    };
    const created = await addTeamMember(cleanMember);
    res.status(201).json({ success: true, member: created });
  } catch (err) {
    res.status(500).json({ error: "Failed to create team member." });
  }
});
apiRouter.put("/team/:id", requireAuth(["admin"]), async (req, res) => {
  try {
    const cleanId = sanitizeString(req.params.id);
    const cleanBody = { ...req.body };
    if (cleanBody.name) cleanBody.name = sanitizeString(cleanBody.name);
    if (cleanBody.role) cleanBody.role = sanitizeString(cleanBody.role);
    if (cleanBody.department) cleanBody.department = sanitizeString(cleanBody.department);
    if (cleanBody.bio) cleanBody.bio = sanitizeString(cleanBody.bio);
    const updated = await updateTeamMember(cleanId, cleanBody);
    if (!updated) {
      res.status(404).json({ error: "Team member not found" });
      return;
    }
    res.json({ success: true, member: updated });
  } catch (err) {
    res.status(500).json({ error: "Failed to update team member." });
  }
});
apiRouter.delete("/team/:id", requireAuth(["admin"]), async (req, res) => {
  try {
    const cleanId = sanitizeString(req.params.id);
    const deleted = await deleteTeamMember(cleanId);
    if (!deleted) {
      res.status(404).json({ error: "Team member not found" });
      return;
    }
    res.json({ success: true, message: "Team member deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete team member." });
  }
});
apiRouter.get("/services", async (_req, res) => {
  try {
    const services = await getServices();
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve services." });
  }
});
apiRouter.get("/services/:slug", async (req, res) => {
  try {
    const cleanSlug = sanitizeString(req.params.slug);
    const services = await getServices();
    const service = services.find((s) => s.slug === cleanSlug || s.id === cleanSlug);
    if (!service) {
      res.status(404).json({ error: "Service not found in verified registry" });
      return;
    }
    res.json(service);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve service." });
  }
});
apiRouter.post("/services", requireAuth(["admin"]), async (req, res) => {
  try {
    const { title, summary, description } = req.body;
    if (!title || !description) {
      res.status(400).json({ error: "Title and description are required." });
      return;
    }
    const cleanService = {
      ...req.body,
      title: sanitizeString(title),
      summary: sanitizeString(summary || ""),
      description: sanitizeString(description)
    };
    const created = await addService(cleanService);
    res.status(201).json({ success: true, service: created });
  } catch (err) {
    res.status(500).json({ error: "Failed to create service." });
  }
});
apiRouter.put("/services/:id", requireAuth(["admin"]), async (req, res) => {
  try {
    const cleanId = sanitizeString(req.params.id);
    const updated = await updateService(cleanId, req.body);
    if (!updated) {
      res.status(404).json({ error: "Service not found" });
      return;
    }
    res.json({ success: true, service: updated });
  } catch (err) {
    res.status(500).json({ error: "Failed to update service." });
  }
});
apiRouter.delete("/services/:id", requireAuth(["admin"]), async (req, res) => {
  try {
    const cleanId = sanitizeString(req.params.id);
    const deleted = await deleteService(cleanId);
    if (!deleted) {
      res.status(404).json({ error: "Service not found" });
      return;
    }
    res.json({ success: true, message: "Service deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete service." });
  }
});
apiRouter.get("/certificates", async (_req, res) => {
  try {
    const certs = await getCertificates();
    res.json(certs);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve certificates." });
  }
});
apiRouter.get("/certificates/verify", async (req, res) => {
  const certId = sanitizeString(req.query.id || "");
  if (!certId) {
    res.status(400).json({ error: "Certificate ID is required for verification." });
    return;
  }
  const cert = await getCertificateById(certId);
  if (!cert) {
    res.status(404).json({
      verified: false,
      message: `No authentic ORBIT-I certificate record matching ID: ${certId}`
    });
    return;
  }
  res.json({
    verified: true,
    certificate: cert,
    verifiedAt: (/* @__PURE__ */ new Date()).toISOString()
  });
});
apiRouter.get("/certificates/verify/*", async (req, res) => {
  const rawId = req.params[0] || "";
  const certId = sanitizeString(decodeURIComponent(rawId));
  const cert = await getCertificateById(certId);
  if (!cert) {
    res.status(404).json({
      verified: false,
      message: `No authentic ORBIT-I certificate record matching ID: ${certId}`
    });
    return;
  }
  res.json({
    verified: true,
    certificate: cert,
    verifiedAt: (/* @__PURE__ */ new Date()).toISOString()
  });
});
apiRouter.post("/certificates", requireAuth(["admin"]), async (req, res) => {
  try {
    const { fullName, email, role } = req.body;
    if (!fullName || !email || !role) {
      res.status(400).json({ error: "Full name, email, and role are required." });
      return;
    }
    const cleanCert = {
      ...req.body,
      fullName: sanitizeString(fullName),
      email: sanitizeString(email),
      role: sanitizeString(role),
      department: sanitizeString(req.body.department || ""),
      remarks: sanitizeString(req.body.remarks || "")
    };
    const created = await addCertificate(cleanCert);
    res.status(201).json({ success: true, certificate: created });
  } catch (err) {
    res.status(500).json({ error: "Failed to create certificate." });
  }
});
apiRouter.put("/certificates/:id", requireAuth(["admin"]), async (req, res) => {
  try {
    const cleanId = sanitizeString(req.params.id);
    const updated = await updateCertificate(cleanId, req.body);
    if (!updated) {
      res.status(404).json({ error: "Certificate not found" });
      return;
    }
    res.json({ success: true, certificate: updated });
  } catch (err) {
    res.status(500).json({ error: "Failed to update certificate." });
  }
});
apiRouter.delete("/certificates/:id", requireAuth(["admin"]), async (req, res) => {
  try {
    const cleanId = sanitizeString(req.params.id);
    const deleted = await deleteCertificate(cleanId);
    if (!deleted) {
      res.status(404).json({ error: "Certificate not found" });
      return;
    }
    res.json({ success: true, message: "Certificate removed successfully." });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete certificate." });
  }
});
apiRouter.get("/contact", requireAuth(["admin"]), async (_req, res) => {
  try {
    const inquiries = await getInquiries();
    res.json(inquiries);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve inquiries." });
  }
});
apiRouter.post("/contact", contactRateLimiter, async (req, res) => {
  const { name, email, phone, company, serviceRequired, budgetRange, timeline, message } = req.body;
  if (!name || !email || !message) {
    res.status(400).json({ error: "Missing required fields: name, email, and message are mandatory." });
    return;
  }
  const cleanName = sanitizeString(name).slice(0, 100);
  const cleanEmail = sanitizeString(email).slice(0, 120);
  const cleanMessage = sanitizeString(message).slice(0, 2e3);
  if (!isValidEmail(cleanEmail)) {
    res.status(400).json({ error: "Invalid email address format." });
    return;
  }
  if (cleanName.length < 2) {
    res.status(400).json({ error: "Name must be at least 2 characters long." });
    return;
  }
  if (cleanMessage.length < 10) {
    res.status(400).json({ error: "Message must be at least 10 characters long." });
    return;
  }
  try {
    const newInquiry = await addInquiry({
      name: cleanName,
      email: cleanEmail,
      phone: sanitizeString(phone || "").slice(0, 30),
      company: sanitizeString(company || "").slice(0, 100),
      serviceRequired: sanitizeString(serviceRequired || "General Consultation").slice(0, 100),
      budgetRange: sanitizeString(budgetRange || "Flexible").slice(0, 50),
      timeline: sanitizeString(timeline || "Standard").slice(0, 50),
      message: cleanMessage
    });
    res.status(201).json({
      success: true,
      message: "Your inquiry has been securely logged in the ORBIT-I enterprise intake system.",
      referenceId: newInquiry.id
    });
  } catch (err) {
    res.status(500).json({ error: "Internal system error processing inquiry." });
  }
});
apiRouter.patch("/contact/:id/status", requireAuth(["admin"]), async (req, res) => {
  try {
    const cleanId = sanitizeString(req.params.id);
    const cleanStatus = sanitizeString(req.body.status || "In Review");
    await updateInquiryStatus(cleanId, cleanStatus);
    res.json({ success: true, message: "Status updated." });
  } catch (err) {
    res.status(500).json({ error: "Failed to update status." });
  }
});
apiRouter.delete("/contact/:id", requireAuth(["admin"]), async (req, res) => {
  try {
    const cleanId = sanitizeString(req.params.id);
    await deleteInquiry(cleanId);
    res.json({ success: true, message: "Inquiry deleted." });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete inquiry." });
  }
});
apiRouter.post("/upload", optionalAuth, async (req, res) => {
  try {
    const { filename, base64Data, contentType, altText, tags } = req.body;
    if (!base64Data) {
      res.status(400).json({ error: "base64Data is required for file upload." });
      return;
    }
    const uploadsDir = path2.resolve(__dirname2, "public", "uploads");
    if (!fs2.existsSync(uploadsDir)) {
      fs2.mkdirSync(uploadsDir, { recursive: true });
    }
    const cleanExt = (filename?.split(".").pop() || "png").toLowerCase().replace(/[^a-z0-9]/g, "");
    const safeName = `orbit_media_${Date.now()}_${Math.random().toString(36).slice(2, 8)}.${cleanExt}`;
    const filePath = path2.join(uploadsDir, safeName);
    const base64Pure = base64Data.replace(/^data:image\/[a-zA-Z0-9.+_-]+;base64,/, "");
    const buffer = Buffer.from(base64Pure, "base64");
    fs2.writeFileSync(filePath, buffer);
    const publicUrl = `/uploads/${safeName}`;
    const sizeKB = (buffer.length / 1024).toFixed(1);
    const assetName = filename ? filename.replace(/\.[^/.]+$/, "") : `Asset ${(/* @__PURE__ */ new Date()).toLocaleDateString()}`;
    const assetRecord = {
      name: sanitizeString(assetName),
      url: publicUrl,
      type: contentType || `image/${cleanExt}`,
      size: `${sizeKB} KB`,
      altText: sanitizeString(altText || assetName.replace(/[-_]/g, " ")),
      tags: Array.isArray(tags) ? tags : ["Upload", "Media"]
    };
    try {
      await addMediaAsset(assetRecord);
    } catch (e) {
      console.warn("Media asset local record save notice:", e);
    }
    res.json({
      success: true,
      url: publicUrl,
      name: assetRecord.name,
      size: assetRecord.size,
      asset: assetRecord
    });
  } catch (err) {
    console.error("File upload error:", err);
    res.status(500).json({ error: "Failed to process file upload." });
  }
});
apiRouter.get("/media", async (_req, res) => {
  try {
    const media = await getMediaAssets();
    res.json(media);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve media assets." });
  }
});
apiRouter.post("/media", requireAuth(["admin"]), async (req, res) => {
  try {
    const { name, url } = req.body;
    if (!name || !url) {
      res.status(400).json({ error: "Name and URL are required." });
      return;
    }
    const cleanAsset = {
      ...req.body,
      name: sanitizeString(name),
      url: sanitizeString(url),
      altText: sanitizeString(req.body.altText || "")
    };
    const created = await addMediaAsset(cleanAsset);
    res.status(201).json({ success: true, asset: created });
  } catch (err) {
    res.status(500).json({ error: "Failed to create media asset." });
  }
});
apiRouter.delete("/media/:id", requireAuth(["admin"]), async (req, res) => {
  try {
    const cleanId = sanitizeString(req.params.id);
    await deleteMediaAsset(cleanId);
    res.json({ success: true, message: "Media asset deleted." });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete media asset." });
  }
});
apiRouter.get("/articles", optionalAuth, async (req, res) => {
  try {
    const isAdmin = req.user?.role === "admin";
    const articles = await getArticles(isAdmin);
    const { category, tag, search } = req.query;
    let filtered = [...articles];
    if (category && typeof category === "string") {
      const normCat = category.toLowerCase().trim();
      filtered = filtered.filter((a) => a.category.toLowerCase() === normCat);
    }
    if (tag && typeof tag === "string") {
      const normTag = tag.toLowerCase().trim();
      filtered = filtered.filter(
        (a) => a.tags.some((t) => t.toLowerCase() === normTag)
      );
    }
    if (search && typeof search === "string") {
      const q = search.toLowerCase().trim();
      filtered = filtered.filter(
        (a) => a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q) || a.tags.some((t) => t.toLowerCase().includes(q)) || a.author.toLowerCase().includes(q)
      );
    }
    res.json(filtered);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve articles." });
  }
});
apiRouter.get("/articles/:slug", async (req, res) => {
  try {
    const cleanSlug = sanitizeString(req.params.slug);
    const article = await getArticleBySlug(cleanSlug);
    if (!article) {
      res.status(404).json({ error: "Article not found." });
      return;
    }
    res.json(article);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve article." });
  }
});
apiRouter.post("/articles", requireAuth(["admin"]), async (req, res) => {
  try {
    const { title, excerpt, content } = req.body;
    if (!title || !content) {
      res.status(400).json({ error: "Title and content are required for publishing." });
      return;
    }
    const cleanArticle = {
      ...req.body,
      title: sanitizeString(title),
      slug: sanitizeString(req.body.slug || ""),
      category: sanitizeString(req.body.category || "Software Engineering"),
      author: sanitizeString(req.body.author || "Abdul Samad Rind (Founder & CEO)"),
      excerpt: sanitizeString(excerpt || ""),
      featuredImage: sanitizeString(req.body.featuredImage || ""),
      imageAlt: sanitizeString(req.body.imageAlt || ""),
      metaTitle: sanitizeString(req.body.metaTitle || ""),
      metaDescription: sanitizeString(req.body.metaDescription || ""),
      canonicalUrl: sanitizeString(req.body.canonicalUrl || "")
    };
    const created = await addArticle(cleanArticle);
    res.status(201).json({ success: true, article: created });
  } catch (err) {
    res.status(500).json({ error: "Failed to create article." });
  }
});
apiRouter.put("/articles/:id", requireAuth(["admin"]), async (req, res) => {
  try {
    const cleanId = sanitizeString(req.params.id);
    const updated = await updateArticle(cleanId, req.body);
    if (!updated) {
      res.status(404).json({ error: "Article not found." });
      return;
    }
    res.json({ success: true, article: updated });
  } catch (err) {
    res.status(500).json({ error: "Failed to update article." });
  }
});
apiRouter.delete("/articles/:id", requireAuth(["admin"]), async (req, res) => {
  try {
    const cleanId = sanitizeString(req.params.id);
    const deleted = await deleteArticle(cleanId);
    if (!deleted) {
      res.status(404).json({ error: "Article not found." });
      return;
    }
    res.json({ success: true, message: "Article removed successfully." });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete article." });
  }
});
apiRouter.get("/departments", (_req, res) => {
  res.json(DEPARTMENTS_DATA);
});
apiRouter.get("/teams", (_req, res) => {
  res.json(TEAMS_DATA);
});
apiRouter.get("/users", (_req, res) => {
  res.json(INITIAL_USERS);
});
apiRouter.get("/client/projects", (_req, res) => {
  res.json(CLIENT_PROJECTS);
});
app.use("/api", apiRouter);
async function startServer() {
  await initDatabase();
  const hasDist = fs2.existsSync(path2.resolve(__dirname2, "dist"));
  const isProd = process.env.NODE_ENV === "production" || !process.env.NODE_ENV;
  if (hasDist && isProd) {
    app.use(express.static(path2.resolve(__dirname2, "dist")));
    app.get("*", (_req, res) => {
      res.sendFile(path2.resolve(__dirname2, "dist", "index.html"));
    });
  } else {
    try {
      const { createServer } = await import("vite");
      const vite = await createServer({
        server: { middlewareMode: true },
        appType: "spa"
      });
      app.use(vite.middlewares);
    } catch (e) {
      if (hasDist) {
        app.use(express.static(path2.resolve(__dirname2, "dist")));
        app.get("*", (_req, res) => {
          res.sendFile(path2.resolve(__dirname2, "dist", "index.html"));
        });
      }
    }
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`================================================================`);
    console.log(`\u{1F6E1}\uFE0F  ORBIT-I Production Engine listening on http://0.0.0.0:${PORT}`);
    console.log(`\u{1F512} Security Hardened: RBAC + Rate Limiting + CSP + Anti-Injection`);
    console.log(`================================================================`);
  });
}
startServer();
