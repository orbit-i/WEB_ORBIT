-- ================================================================
-- ORBIT-I Private Limited — Enterprise MySQL Database Schema
-- Production Ready for Linux Enterprise Servers (MySQL 5.7+ / 8.0+ / MariaDB)
-- Character Set: utf8mb4 / utf8mb4_unicode_ci
-- ================================================================

SET FOREIGN_KEY_CHECKS = 0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

-- --------------------------------------------------------
-- Table: company_info
-- --------------------------------------------------------
DROP TABLE IF EXISTS `company_info`;
CREATE TABLE `company_info` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL DEFAULT 'ORBIT-I',
  `legal_name` VARCHAR(150) NOT NULL DEFAULT 'ORBIT-I Private Limited',
  `tagline` VARCHAR(255) NOT NULL DEFAULT 'Engineering software that stays in orbit around your business.',
  `founder` VARCHAR(100) NOT NULL DEFAULT 'Abdul Samad Rind',
  `co_founders` TEXT,
  `logo_url` VARCHAR(255) NOT NULL DEFAULT '/orbit-circular-logo.png',
  `summary` TEXT NOT NULL,
  `email` VARCHAR(120) NOT NULL DEFAULT 'contactus@orbit-i.tech',
  `phone` VARCHAR(50) NOT NULL DEFAULT '+92 3190375751',
  `location` VARCHAR(150) NOT NULL DEFAULT 'Nawabshah, Sindh, Pakistan',
  `website` VARCHAR(200) NOT NULL DEFAULT 'https://orbit-i.tech/',
  `social_links` TEXT,
  `established` VARCHAR(10) NOT NULL DEFAULT '2024',
  `registration_type` VARCHAR(100) NOT NULL DEFAULT 'Private Limited Company',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `company_info` (`id`, `name`, `legal_name`, `tagline`, `founder`, `co_founders`, `logo_url`, `summary`, `email`, `phone`, `location`, `website`, `social_links`, `established`, `registration_type`) VALUES
(1, 'ORBIT-I', 'ORBIT-I Private Limited', 'Engineering software that stays in orbit around your business.', 'Abdul Samad Rind', '["Maria Almani", "Muhammad Muneeb Ur Rahman Shahzad"]', '/orbit-circular-logo.png', 'ORBIT-I Private Limited builds custom software, cloud platforms, and digital systems for businesses that require dependable, long-term engineering.', 'contactus@orbit-i.tech', '+92 3190375751', 'Nawabshah, Sindh, Pakistan', 'https://orbit-i.tech/', '{"linkedin":"https://www.linkedin.com/company/orbit-i-private-limited/","whatsapp":"https://whatsapp.com/channel/0029Vb8I4kvJJhzUXqEnB50J","facebook":"https://www.facebook.com/orbitiprivatelimited","instagram":"https://www.instagram.com/orbiti_private_limited?utm_source=qr&stkn=ZnE1c25zdG96Y3Zp","tiktok":"https://www.tiktok.com/@orbitiprivatelimited"}', '2024', 'Private Limited Company');

-- --------------------------------------------------------
-- Table: team_members
-- --------------------------------------------------------
DROP TABLE IF EXISTS `team_members`;
CREATE TABLE `team_members` (
  `id` VARCHAR(64) NOT NULL,
  `name` VARCHAR(120) NOT NULL,
  `role` VARCHAR(100) NOT NULL,
  `tier` ENUM('leadership', 'team') NOT NULL DEFAULT 'team',
  `department` VARCHAR(120) NOT NULL,
  `bio` TEXT NOT NULL,
  `avatar` VARCHAR(255) DEFAULT NULL,
  `initials` VARCHAR(10) NOT NULL,
  `email` VARCHAR(120) NOT NULL DEFAULT 'contactus@orbit-i.tech',
  `linkedin` VARCHAR(255) DEFAULT NULL,
  `portfolio` VARCHAR(255) DEFAULT NULL,
  `whatsapp` VARCHAR(50) DEFAULT NULL,
  `skills` TEXT,
  `display_order` INT NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `team_members` (`id`, `name`, `role`, `tier`, `department`, `bio`, `avatar`, `initials`, `email`, `linkedin`, `portfolio`, `whatsapp`, `skills`, `display_order`) VALUES
('tm-1', 'Abdul Samad Rind', 'Founder & CEO', 'leadership', 'Executive Leadership', 'Founder and Chief Executive Officer steering ORBIT-I Private Limited. Focused on high-performance enterprise systems, sustainable technology architecture, and digital engineering partnerships across Pakistan and international markets.', '/Abdul Samad.jpeg', 'AS', 'contactus@orbit-i.tech', 'https://www.linkedin.com/company/orbit-i-private-limited/', 'https://orbit-i.tech', '+92 3190375751', '["Enterprise Systems", "Strategic Governance", "Cloud Architecture"]', 1),
('tm-2', 'Maria Almani', 'Co-Founder & COO', 'leadership', 'Operations & Strategy', 'Co-Founder and Chief Operating Officer overseeing client operations, sprint delivery management, team coordination, and strategic business growth for ORBIT-I engagements.', NULL, 'MA', 'contactus@orbit-i.tech', 'https://www.linkedin.com/company/orbit-i-private-limited/', 'https://orbit-i.tech', '+92 3190375751', '["Operations Management", "Agile Delivery", "Strategic Scaling"]', 2),
('tm-3', 'Muhammad Muneeb Ur Rahman Shahzad', 'Co-Founder & CTO', 'leadership', 'Engineering & Technology', 'Co-Founder and Chief Technology Officer orchestrating technical architecture, cloud scalability, secure relational database design, and software engineering standards.', NULL, 'MS', 'contactus@orbit-i.tech', 'https://www.linkedin.com/company/orbit-i-private-limited/', 'https://orbit-i.tech', '+92 3190375751', '["Core Systems", "Scalable Databases", "DevOps & Infrastructure"]', 3),
('tm-4', 'Hassan Ansar', 'Web Developer', 'team', 'Web Engineering', 'Frontend and full-stack web developer specializing in modern React, responsive client interfaces, high-performance web applications, and state architecture.', NULL, 'HA', 'contactus@orbit-i.tech', 'https://www.linkedin.com/company/orbit-i-private-limited/', 'https://orbit-i.tech', '+92 3190375751', '["React / Next.js", "TypeScript", "Tailwind CSS"]', 4),
('tm-5', 'Waleed Ahmed', 'Digital Marketing Expert', 'team', 'Marketing & Growth', 'Digital marketing strategist driving search engine visibility, brand communication, client acquisition funnels, and enterprise outreach for ORBIT-I digital platforms.', NULL, 'WA', 'contactus@orbit-i.tech', 'https://www.linkedin.com/company/orbit-i-private-limited/', 'https://orbit-i.tech', '+92 3190375751', '["Technical SEO", "Search Console", "Growth Funnels"]', 5),
('tm-6', 'Rashid Ali Channa', 'AI / ML Engineer', 'team', 'Artificial Intelligence & Research', 'Machine learning engineer designing predictive algorithms, computer vision pipelines, natural language processing models, and intelligent automated workflows.', NULL, 'RC', 'contactus@orbit-i.tech', 'https://www.linkedin.com/company/orbit-i-private-limited/', 'https://orbit-i.tech', '+92 3190375751', '["LLM Orchestration", "PyTorch / Python", "Vector Databases"]', 6),
('tm-7', 'Laiba', 'Backend Developer', 'team', 'Backend & Systems', 'Backend solutions engineer focusing on robust RESTful APIs, microservices architectures, data persistence, and secure authentication pipelines.', NULL, 'LB', 'contactus@orbit-i.tech', 'https://www.linkedin.com/company/orbit-i-private-limited/', 'https://orbit-i.tech', '+92 3190375751', '["RESTful APIs", "Node.js", "PostgreSQL"]', 7),
('tm-8', 'Abdul Rehman', '.NET Developer', 'team', 'Enterprise .NET Systems', 'Enterprise .NET developer with expertise in C#, ASP.NET Core, Microsoft server environments, SQL database optimizations, and high-concurrency transactional pipelines.', NULL, 'AR', 'contactus@orbit-i.tech', 'https://www.linkedin.com/company/orbit-i-private-limited/', 'https://orbit-i.tech', '+92 3190375751', '["C# / .NET Core", "SQL Server", "Enterprise Microservices"]', 8),
('tm-9', 'Chander Parkash', 'Database Administrator', 'team', 'Database Systems & Architecture', 'Database Administrator specializing in enterprise SQL relational architectures, PostgreSQL and MySQL optimization, high-availability clustering, data migration, and backup integrity.', NULL, 'CP', 'contactus@orbit-i.tech', 'https://www.linkedin.com/company/orbit-i-private-limited/', 'https://orbit-i.tech', '+92 3190375751', '["PostgreSQL / MySQL", "Database Clustering", "Query Optimization"]', 9),
('tm-10', 'Hamnah', 'UI / UX Designer', 'team', 'Product & Design Systems', 'Product designer crafting elegant design systems, intuitive user workflows, responsive mobile wireframes, high-fidelity prototypes, and accessible visual user interfaces.', NULL, 'HN', 'contactus@orbit-i.tech', 'https://www.linkedin.com/company/orbit-i-private-limited/', 'https://orbit-i.tech', '+92 3190375751', '["Figma / Prototyping", "Design Systems", "Responsive UI/UX"]', 10);

-- --------------------------------------------------------
-- Table: services
-- --------------------------------------------------------
DROP TABLE IF EXISTS `services`;
CREATE TABLE `services` (
  `id` VARCHAR(64) NOT NULL,
  `title` VARCHAR(150) NOT NULL,
  `slug` VARCHAR(150) NOT NULL UNIQUE,
  `summary` VARCHAR(255) NOT NULL,
  `description` TEXT NOT NULL,
  `benefits` TEXT,
  `technologies` TEXT,
  `process_steps` TEXT,
  `icon_name` VARCHAR(50) NOT NULL DEFAULT 'Code2',
  `display_order` INT NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `services` (`id`, `title`, `slug`, `summary`, `description`, `benefits`, `technologies`, `process_steps`, `icon_name`, `display_order`) VALUES
('srv-1', 'Web Application Development', 'web-application-development', 'Fast, secure, and maintainable enterprise web applications built on modern frameworks.', 'We design and build full-stack web applications end-to-end — from interactive design systems to high-throughput REST APIs and production deployments that your internal team can easily maintain and extend.', '["Strict type-safety across client and server layers", "Modular design systems that accelerate feature velocity", "Sub-second initial load times with built-in performance budgets", "Automated testing pipelines with continuous integration"]', '["React", "TypeScript", "Node.js", "MySQL", "TailwindCSS", "Vite"]', '[{"title":"01. Technical Discovery","description":"Requirements mapping, architectural trade-offs, and data modeling."},{"title":"02. System Architecture","description":"Component wireframes, API contracts, and database schema specification."},{"title":"03. Sprint-Based Build","description":"Bi-weekly sprint demos with end-to-end visibility and continuous integration."},{"title":"04. Production Deployment","description":"Security audit, load testing, automated backups, and 30-day post-launch warranty."}]', 'Code2', 1),
('srv-2', 'Mobile Application Development', 'mobile-application-development', 'High-performance cross-platform apps for iOS and Android from a unified codebase.', 'We engineer native-feeling mobile applications that operate smoothly on both iOS and Android, sharing reliable backend services and secure authentication with your web infrastructure.', '["Single maintainable codebase for iOS and Android", "Offline-first synchronization with secure local storage", "Optimized 60fps animations and native hardware integration", "Turnkey App Store and Google Play compliance & deployment"]', '["React Native", "TypeScript", "Expo", "TailwindCSS", "REST APIs"]', '[{"title":"01. Device & UX Scoping","description":"Defining target platforms, gesture flows, and offline constraints."},{"title":"02. Interactive Prototype","description":"Testing user journeys on actual physical devices before coding."},{"title":"03. Iterative Engineering","description":"Incremental feature delivery with automated weekly test builds."},{"title":"04. App Store Submission","description":"Store asset preparation, metadata optimization, and approval handling."}]', 'Smartphone', 2),
('srv-3', 'Custom Software Solutions', 'custom-software-solutions', 'Tailor-made internal business platforms that automate complex organizational workflows.', 'When commercial off-the-shelf software restricts your operations, we build purpose-fit tools: custom ERPs, internal portals, billing systems, and automated data pipelines designed around your unique workflow.', '["Exact alignment with existing business processes", "Zero recurring per-seat SaaS licensing costs", "Complete intellectual property and source code ownership", "Seamless integration with your legacy ERPs and third-party APIs"]', '["Node.js", "TypeScript", "MySQL", "Docker", "Redis", "Express"]', '[{"title":"01. Workflow Audit","description":"Deep-dive into operational bottlenecks and manual spreadsheet tasks."},{"title":"02. Solution Design","description":"Database modeling and role-based permissions matrix."},{"title":"03. Module Delivery","description":"Delivering functional modules in phases to prevent operational disruption."},{"title":"04. Team Handover","description":"Comprehensive technical documentation and internal staff onboarding."}]', 'Wrench', 3),
('srv-4', 'UI/UX Design Systems', 'ui-ux-design', 'Human-centered interfaces engineered for cognitive clarity and high task completion rates.', 'Our UI/UX design practice combines behavioral psychology, accessibility standards, and clean design tokens. We build interactive prototypes and scalable design systems that developers can implement without friction.', '["WCAG AA/AAA accessible color palettes and typography scales", "Comprehensive Figma component libraries and design tokens", "Reduced user drop-off and friction across complex workflows", "Seamless handoff with pixel-accurate CSS specifications"]', '["Figma", "Design Tokens", "TailwindCSS", "CSS Architecture"]', '[{"title":"01. User Research","description":"Task analysis, user personas, and information architecture mapping."},{"title":"02. Wireframing","description":"Low-fidelity layout validation focusing on hierarchy and eye tracking."},{"title":"03. Visual Systems","description":"High-fidelity UI screens, micro-interactions, and responsive design."},{"title":"04. Design Token Handoff","description":"Direct token export to CSS variables for frictionless dev implementation."}]', 'PenTool', 4),
('srv-5', 'Cloud & DevOps Engineering', 'cloud-devops', 'Resilient cloud infrastructure, automated CI/CD pipelines, and zero-downtime deployments.', 'We configure cloud environments, containerized deployments, automated database backups, and health monitoring so your production systems remain online, fast, and secure under peak traffic.', '["Automated zero-downtime CI/CD deployment pipelines", "Isolated staging and production environments", "Automated daily offsite MySQL database backups", "Real-time uptime monitoring and incident alerting"]', '["Docker", "Linux", "AWS Cloud", "Cloudflare", "GitHub Actions", "Nginx"]', '[{"title":"01. Infrastructure Audit","description":"Security review of server configs, SSL, and network architecture."},{"title":"02. Architecture Blueprint","description":"Right-sized infrastructure plan designed for cost efficiency."},{"title":"03. Pipeline Automation","description":"Configuring automated builds, linting, tests, and deployments."},{"title":"04. Runbook Transfer","description":"Disaster recovery protocols and system access provided to client."}]', 'Cloud', 5),
('srv-6', 'Enterprise API & Integrations', 'enterprise-integrations', 'Secure payment gateways, banking APIs, ERP connectors, and webhooks architecture.', 'Connect your core platform with critical third-party ecosystems: payment processing, ERPs, accounting software, SMS/Email notification rails, and webhooks with guaranteed delivery and idempotency.', '["Idempotent webhook handlers preventing duplicate transactions", "Enterprise-grade cryptographic signature verification", "High-throughput rate limiting and anti-abuse safeguards", "Structured audit logging for full regulatory compliance"]', '["Node.js", "TypeScript", "REST", "Webhooks", "JWT", "Stripe", "Banking Rails"]', '[{"title":"01. API Contract Design","description":"OpenAPI/Swagger documentation and schema validation."},{"title":"02. Security Implementation","description":"HMAC verification, rate-limiting, and encryption in transit."},{"title":"03. Sandbox Testing","description":"Simulated failure states, network timeouts, and reconciliation testing."},{"title":"04. Go-Live Verification","description":"Live transaction verification and monitoring dashboards."}]', 'Server', 6);

-- --------------------------------------------------------
-- Table: certificates
-- --------------------------------------------------------
DROP TABLE IF EXISTS `certificates`;
CREATE TABLE `certificates` (
  `certificate_id` VARCHAR(64) NOT NULL,
  `full_name` VARCHAR(120) NOT NULL,
  `email` VARCHAR(120) NOT NULL,
  `phone` VARCHAR(50) DEFAULT NULL,
  `department` VARCHAR(120) NOT NULL,
  `role` VARCHAR(120) NOT NULL,
  `start_date` DATE NOT NULL,
  `end_date` DATE NOT NULL,
  `duration` VARCHAR(50) NOT NULL DEFAULT '3 Months',
  `completion_status` ENUM('completed', 'in_progress') NOT NULL DEFAULT 'completed',
  `certificate_status` ENUM('valid', 'revoked') NOT NULL DEFAULT 'valid',
  `grade_performance` VARCHAR(50) NOT NULL DEFAULT 'Distinction (A+)',
  `verification_code` VARCHAR(64) NOT NULL,
  `issue_date` DATE NOT NULL,
  `remarks` TEXT,
  `is_authentic` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`certificate_id`),
  UNIQUE KEY `idx_ver_code` (`verification_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `certificates` (`certificate_id`, `full_name`, `email`, `phone`, `department`, `role`, `start_date`, `end_date`, `duration`, `completion_status`, `certificate_status`, `grade_performance`, `verification_code`, `issue_date`, `remarks`, `is_authentic`) VALUES
('ORBIT-I/INT/2026/01', 'Muhammad Zeeshan', 'zeeshan.dev@gmail.com', '+92 300 1234567', 'Full Stack Development', 'Full Stack Engineering Intern', '2026-01-01', '2026-03-25', '3 Months', 'completed', 'valid', 'Distinction (A+)', 'ORB-SEC-7890-VLD-2026', '2026-03-25', 'Demonstrated outstanding architectural skills in React, Node.js, and cloud deployment pipelines.', 1),
('ORBIT-I/INT/2026/02', 'Ayesha Khan', 'ayesha.ai@gmail.com', '+92 301 7654321', 'Artificial Intelligence & Data', 'AI / ML Research Intern', '2026-01-01', '2026-03-25', '3 Months', 'completed', 'valid', 'Grade A', 'ORB-SEC-7891-VLD-2026', '2026-03-25', 'Successfully trained and evaluated NLP model pipelines with high precision.', 1),
('ORBIT-I/INT/2026/03', 'Hamza Farooq', 'hamza.uiux@gmail.com', '+92 312 9876543', 'UI/UX & Product Design', 'Product Design Intern', '2026-02-01', '2026-04-30', '3 Months', 'in_progress', 'valid', 'In Progress (A)', 'ORB-SEC-7892-PRG-2026', '2026-02-01', 'Currently working on enterprise corporate design systems and accessibility audit.', 1);

-- --------------------------------------------------------
-- Table: inquiries (Contact form submissions)
-- --------------------------------------------------------
DROP TABLE IF EXISTS `inquiries`;
CREATE TABLE `inquiries` (
  `id` VARCHAR(64) NOT NULL,
  `name` VARCHAR(120) NOT NULL,
  `email` VARCHAR(120) NOT NULL,
  `phone` VARCHAR(50) DEFAULT NULL,
  `company` VARCHAR(120) DEFAULT NULL,
  `service_required` VARCHAR(120) NOT NULL DEFAULT 'General Consultation',
  `budget_range` VARCHAR(60) NOT NULL DEFAULT 'Flexible',
  `timeline` VARCHAR(60) NOT NULL DEFAULT 'Standard',
  `message` TEXT NOT NULL,
  `status` ENUM('New', 'In Review', 'Contacted', 'Archived') NOT NULL DEFAULT 'New',
  `submitted_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table: media_assets
-- --------------------------------------------------------
DROP TABLE IF EXISTS `media_assets`;
CREATE TABLE `media_assets` (
  `id` VARCHAR(64) NOT NULL,
  `name` VARCHAR(150) NOT NULL,
  `url` VARCHAR(255) NOT NULL,
  `type` VARCHAR(50) NOT NULL DEFAULT 'image/jpeg',
  `size` VARCHAR(50) NOT NULL DEFAULT '64 KB',
  `alt_text` VARCHAR(255) NOT NULL,
  `tags` TEXT,
  `uploaded_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `media_assets` (`id`, `name`, `url`, `type`, `size`, `alt_text`, `tags`) VALUES
('med-1', 'Abdul Samad Rind — Founder & CEO Official Picture', '/Abdul Samad.jpeg', 'image/jpeg', '66 KB', 'Abdul Samad Rind, Founder & CEO of ORBIT-I Private Limited', '["Leadership", "CEO", "Founder", "Abdul Samad", "Executive"]'),
('med-2', 'ORBIT-I Official Circular Space Logo', '/orbit-circular-logo.png', 'image/png', '64 KB', 'ORBIT-I Private Limited official circular space brand emblem', '["Logo", "Brand", "Circular", "Space", "Emblem"]'),
('med-3', 'ORBIT-I Favicon', '/orbit-favicon.png', 'image/png', '16 KB', 'ORBIT-I favicon browser icon', '["Favicon", "Icon", "Browser"]'),
('med-4', 'ORBIT-I Official Brand Header Logo', '/orbit-i-logo.png', 'image/png', '650 KB', 'ORBIT-I Private Limited primary high-resolution emblem', '["Logo", "Brand", "Header", "HighRes"]');

-- --------------------------------------------------------
-- Table: articles (Content Writing & Technical Blog Engine)
-- --------------------------------------------------------
DROP TABLE IF EXISTS `articles`;
CREATE TABLE `articles` (
  `id` VARCHAR(64) NOT NULL,
  `slug` VARCHAR(150) NOT NULL UNIQUE,
  `title` VARCHAR(255) NOT NULL,
  `category` VARCHAR(100) NOT NULL DEFAULT 'Software Engineering',
  `author` VARCHAR(150) NOT NULL DEFAULT 'Abdul Samad Rind (Founder & CEO)',
  `published_date` VARCHAR(50) NOT NULL,
  `read_time` VARCHAR(50) NOT NULL DEFAULT '5 min read',
  `tags` TEXT,
  `excerpt` TEXT NOT NULL,
  `content` LONGTEXT NOT NULL,
  `status` ENUM('published', 'draft') NOT NULL DEFAULT 'published',
  `featured_image` VARCHAR(255) DEFAULT NULL,
  `image_alt` VARCHAR(255) DEFAULT NULL,
  `meta_title` VARCHAR(255) DEFAULT NULL,
  `meta_description` TEXT,
  `focus_keywords` TEXT,
  `canonical_url` VARCHAR(255) DEFAULT NULL,
  `last_modified` VARCHAR(50) DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_slug` (`slug`),
  INDEX `idx_category` (`category`),
  INDEX `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `articles` (`id`, `slug`, `title`, `category`, `author`, `published_date`, `read_time`, `tags`, `excerpt`, `content`, `status`, `featured_image`, `image_alt`, `meta_title`, `meta_description`, `focus_keywords`, `canonical_url`) VALUES
('art-1', 'architecting-high-concurrency-microservices-2026', 'Architecting High-Concurrency Microservices for Modern Pakistani Enterprises', 'Software Architecture', 'Muhammad Muneeb Ur Rahman Shahzad (Co-Founder & CTO)', '2026-09-15', '6 min read', '["Microservices", "Distributed Systems", "MySQL", "Node.js", "High Concurrency", "Architecture"]', 'A deep technical dive into zero-downtime database migrations, connection pooling, and latency reduction for regional e-commerce and logistics platforms.', '<h2>1. Strategic Architecture Overview</h2>\n<p>Building resilient enterprise systems across Pakistan requires disciplined engineering decisions. In this briefing, ORBIT-I examines how we design distributed systems to handle high transactional volume without cascade failure.</p>\n<h3>Key Architectural Pillars</h3>\n<ul class=\"list-disc pl-5 my-4 space-y-1\">\n  <li><strong>Non-blocking I/O Event Loops:</strong> Leveraging Node.js and Go microservices for sub-15ms request handling.</li>\n  <li><strong>Prepared Relational Statements:</strong> MySQL connection pool reuse with zero memory leaks.</li>\n  <li><strong>Idempotent API Contracts:</strong> Enforcing cryptographic tokens for monetary and database operations.</li>\n</ul>\n<blockquote class=\"border-l-4 border-black pl-4 py-2 italic my-4 text-gray-800 bg-gray-50 rounded-r-lg\">\n  \"Resilience is not merely handling expected peak load; it is recovering gracefully when network latency spikes unpredictably across regional telecom lines.\"\n</blockquote>\n<h2>2. Database Connection Pooling Benchmarks</h2>\n<p>Optimizing relational pooling on Linux Cloud environments reduced p99 query latency from 145ms down to 18ms under 5,000 active concurrent simulated sockets.</p>', 'published', '/orbit-circular-logo.png', 'ORBIT-I Microservices Architecture Diagram', 'High-Concurrency Microservices Architecture | ORBIT-I Technical Insights', 'Learn how ORBIT-I architectures resilient, high-concurrency microservices, connection pooling, and low-latency APIs for modern Pakistani enterprises.', '["microservices pakistan", "high concurrency architecture", "relational database scaling"]', 'https://orbit-i.tech/blog/architecting-high-concurrency-microservices-2026'),

('art-2', 'strict-type-safety-full-stack-web-applications', 'Why Strict Type-Safety is the Foundation of Long-Term Software Maintainability', 'Web & Mobile Engineering', 'Abdul Samad Rind (Founder & CEO)', '2026-08-20', '5 min read', '["TypeScript", "Type Safety", "Clean Code", "Web Development", "React", "Node.js"]', 'How end-to-end TypeScript validation from API contracts to UI components eliminates over 80% of runtime production errors.', '<h2>1. The Cost of Runtime Type Errors</h2>\n<p>In custom software engineering, runtime errors in production directly translate to customer dissatisfaction and operational downtime. At ORBIT-I Private Limited, every system enforces strict compiler gates.</p>\n<h3>Shared DTOs & Schema Contracts</h3>\n<p>By sharing TypeScript interfaces between server route handlers and client React components, data contract changes are caught at compile-time rather than during production checkout or user onboarding.</p>\n<blockquote class=\"border-l-4 border-black pl-4 py-2 italic my-4 text-gray-800 bg-gray-50 rounded-r-lg\">\n  \"If the code compiles with zero warnings under strict mode, you have pre-emptively solved dozens of production regressions before a single customer clicks your portal.\"\n</blockquote>', 'published', '/Abdul Samad.jpeg', 'Abdul Samad Rind on TypeScript Engineering', 'Strict Type-Safety in Full-Stack Web Applications | ORBIT-I Tech', 'Discover how strict TypeScript contracts across frontend and backend layers eliminate production bugs and accelerate engineering sprint velocity.', '["typescript web development", "full stack type safety", "software maintainability"]', 'https://orbit-i.tech/blog/strict-type-safety-full-stack-web-applications'),

('art-3', 'llm-orchestration-enterprise-automation-pakistan', 'Enterprise AI & LLM Orchestration: Transforming Business Workflows with Precision', 'Artificial Intelligence & ML', 'Rashid Ali Channa (AI / ML Engineer)', '2026-09-28', '7 min read', '["AI", "Machine Learning", "LLMs", "Vector Databases", "LangChain", "Python"]', 'Deploying private Retrieval-Augmented Generation (RAG) pipelines, semantic embeddings, and automated business agents without corporate data leakage.', '<h2>1. The Next Evolution of Enterprise Automation</h2>\n<p>Enterprises generate petabytes of proprietary manuals, contracts, and ticketing history. ORBIT-I designs private RAG pipelines that index your documents inside vector stores, allowing intelligent conversational search with verifiable source citations.</p>\n<h3>Security and Data Sovereignty</h3>\n<p>Proprietary enterprise documents never train public foundation models. We implement isolated embedding stores with strict role-based access control.</p>', 'published', '/orbit-i-logo.png', 'Enterprise AI & LLM Pipelines', 'Enterprise LLM Orchestration & AI Workflows | ORBIT-I AI Research', 'Guide to building private RAG systems, local LLM orchestration, and vector retrieval pipelines for automated enterprise operations.', '["enterprise ai pakistan", "llm orchestration", "rag pipelines", "vector search"]', 'https://orbit-i.tech/blog/llm-orchestration-enterprise-automation-pakistan');

-- --------------------------------------------------------
-- Table: site_settings
-- --------------------------------------------------------
DROP TABLE IF EXISTS `site_settings`;
CREATE TABLE `site_settings` (
  `setting_key` VARCHAR(64) NOT NULL,
  `setting_value` LONGTEXT NOT NULL,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`setting_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;

