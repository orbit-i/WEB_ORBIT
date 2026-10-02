import mysql, { Pool } from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  COMPANY_INFO,
  VERIFIED_SERVICES,
  INITIAL_USERS,
  VERIFIED_CERTIFICATES,
} from '../src/data/orbitData.js';
import { TeamMember, ServiceDetail, VerifiedCertificate, CompanyInfo, ContentArticle } from '../src/types/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const LOCAL_CACHE_PATH = path.resolve(__dirname, 'orbit_local_storage.json');

// Initial Authentic Team Members (100% Original Data)
export const INITIAL_TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'tm-1',
    name: 'Abdul Samad Rind',
    role: 'Founder & CEO',
    tier: 'leadership',
    department: 'Executive Leadership',
    bio: 'Founder and Chief Executive Officer steering ORBIT-I Private Limited. Focused on high-performance enterprise systems, sustainable technology architecture, and digital engineering partnerships across Pakistan and international markets.',
    avatar: '/Abdul Samad.jpeg',
    initials: 'AS',
    email: 'contactus@orbit-i.tech',
    linkedin: 'https://www.linkedin.com/company/orbit-i-private-limited/',
    portfolio: 'https://orbit-i.tech',
    whatsapp: '+92 3190375751',
    skills: ['Enterprise Systems', 'Strategic Governance', 'Cloud Architecture'],
    displayOrder: 1,
  },
  {
    id: 'tm-2',
    name: 'Maria Almani',
    role: 'Co-Founder & COO',
    tier: 'leadership',
    department: 'Operations & Strategy',
    bio: 'Co-Founder and Chief Operating Officer overseeing client operations, sprint delivery management, team coordination, and strategic business growth for ORBIT-I engagements.',
    avatar: '',
    initials: 'MA',
    email: 'contactus@orbit-i.tech',
    linkedin: 'https://www.linkedin.com/company/orbit-i-private-limited/',
    portfolio: 'https://orbit-i.tech',
    whatsapp: '+92 3190375751',
    skills: ['Operations Management', 'Agile Delivery', 'Strategic Scaling'],
    displayOrder: 2,
  },
  {
    id: 'tm-3',
    name: 'Muhammad Muneeb Ur Rahman Shahzad',
    role: 'Co-Founder & CTO',
    tier: 'leadership',
    department: 'Engineering & Technology',
    bio: 'Co-Founder and Chief Technology Officer orchestrating technical architecture, cloud scalability, secure relational database design, and software engineering standards.',
    avatar: '',
    initials: 'MS',
    email: 'contactus@orbit-i.tech',
    linkedin: 'https://www.linkedin.com/company/orbit-i-private-limited/',
    portfolio: 'https://orbit-i.tech',
    whatsapp: '+92 3190375751',
    skills: ['Core Systems', 'Scalable Databases', 'DevOps & Infrastructure'],
    displayOrder: 3,
  },
  {
    id: 'tm-4',
    name: 'Hassan Ansar',
    role: 'Web Developer',
    tier: 'team',
    department: 'Web Engineering',
    bio: 'Frontend and full-stack web developer specializing in modern React, responsive client interfaces, high-performance web applications, and state architecture.',
    avatar: '',
    initials: 'HA',
    email: 'contactus@orbit-i.tech',
    linkedin: 'https://www.linkedin.com/company/orbit-i-private-limited/',
    portfolio: 'https://orbit-i.tech',
    whatsapp: '+92 3190375751',
    skills: ['React / Next.js', 'TypeScript', 'Tailwind CSS'],
    displayOrder: 4,
  },
  {
    id: 'tm-5',
    name: 'Waleed Ahmed',
    role: 'Digital Marketing Expert',
    tier: 'team',
    department: 'Marketing & Growth',
    bio: 'Digital marketing strategist driving search engine visibility, brand communication, client acquisition funnels, and enterprise outreach for ORBIT-I digital platforms.',
    avatar: '',
    initials: 'WA',
    email: 'contactus@orbit-i.tech',
    linkedin: 'https://www.linkedin.com/company/orbit-i-private-limited/',
    portfolio: 'https://orbit-i.tech',
    whatsapp: '+92 3190375751',
    skills: ['Technical SEO', 'Search Console', 'Growth Funnels'],
    displayOrder: 5,
  },
  {
    id: 'tm-6',
    name: 'Rashid Ali Channa',
    role: 'AI / ML Engineer',
    tier: 'team',
    department: 'Artificial Intelligence & Research',
    bio: 'Machine learning engineer designing predictive algorithms, computer vision pipelines, natural language processing models, and intelligent automated workflows.',
    avatar: '',
    initials: 'RC',
    email: 'contactus@orbit-i.tech',
    linkedin: 'https://www.linkedin.com/company/orbit-i-private-limited/',
    portfolio: 'https://orbit-i.tech',
    whatsapp: '+92 3190375751',
    skills: ['LLM Orchestration', 'PyTorch / Python', 'Vector Databases'],
    displayOrder: 6,
  },
  {
    id: 'tm-7',
    name: 'Laiba',
    role: 'Backend Developer',
    tier: 'team',
    department: 'Backend & Systems',
    bio: 'Backend solutions engineer focusing on robust RESTful APIs, microservices architectures, data persistence, and secure authentication pipelines.',
    avatar: '',
    initials: 'LB',
    email: 'contactus@orbit-i.tech',
    linkedin: 'https://www.linkedin.com/company/orbit-i-private-limited/',
    portfolio: 'https://orbit-i.tech',
    whatsapp: '+92 3190375751',
    skills: ['RESTful APIs', 'Node.js', 'PostgreSQL'],
    displayOrder: 7,
  },
  {
    id: 'tm-8',
    name: 'Abdul Rehman',
    role: '.NET Developer',
    tier: 'team',
    department: 'Enterprise .NET Systems',
    bio: 'Enterprise .NET developer with expertise in C#, ASP.NET Core, Microsoft server environments, SQL database optimizations, and high-concurrency transactional pipelines.',
    avatar: '',
    initials: 'AR',
    email: 'contactus@orbit-i.tech',
    linkedin: 'https://www.linkedin.com/company/orbit-i-private-limited/',
    portfolio: 'https://orbit-i.tech',
    whatsapp: '+92 3190375751',
    skills: ['C# / .NET Core', 'SQL Server', 'Enterprise Microservices'],
    displayOrder: 8,
  },
  {
    id: 'tm-9',
    name: 'Chander Parkash',
    role: 'Database Administrator',
    tier: 'team',
    department: 'Database Systems & Architecture',
    bio: 'Database Administrator specializing in enterprise SQL relational architectures, PostgreSQL and MySQL optimization, high-availability clustering, data migration, and backup integrity.',
    avatar: '',
    initials: 'CP',
    email: 'contactus@orbit-i.tech',
    linkedin: 'https://www.linkedin.com/company/orbit-i-private-limited/',
    portfolio: 'https://orbit-i.tech',
    whatsapp: '+92 3190375751',
    skills: ['PostgreSQL / MySQL', 'Database Clustering', 'Query Optimization'],
    displayOrder: 9,
  },
  {
    id: 'tm-10',
    name: 'Hamnah',
    role: 'UI / UX Designer',
    tier: 'team',
    department: 'Product & Design Systems',
    bio: 'Product designer crafting elegant design systems, intuitive user workflows, responsive mobile wireframes, high-fidelity prototypes, and accessible visual user interfaces.',
    avatar: '',
    initials: 'HN',
    email: 'contactus@orbit-i.tech',
    linkedin: 'https://www.linkedin.com/company/orbit-i-private-limited/',
    portfolio: 'https://orbit-i.tech',
    whatsapp: '+92 3190375751',
    skills: ['Figma / Prototyping', 'Design Systems', 'Responsive UI/UX'],
    displayOrder: 10,
  },
];

// Initial Media Assets
export const INITIAL_MEDIA_ASSETS = [
  {
    id: 'med-1',
    name: 'Abdul Samad Rind — Founder & CEO Official Picture',
    url: '/Abdul Samad.jpeg',
    type: 'image/jpeg',
    size: '66 KB',
    altText: 'Abdul Samad Rind, Founder & CEO of ORBIT-I Private Limited',
    tags: ['Leadership', 'CEO', 'Founder', 'Abdul Samad', 'Executive'],
    uploadedAt: '2026-09-30',
  },
  {
    id: 'med-2',
    name: 'ORBIT-I Official Circular Space Logo',
    url: '/orbit-circular-logo.png',
    type: 'image/png',
    size: '64 KB',
    altText: 'ORBIT-I Private Limited official circular space brand emblem',
    tags: ['Logo', 'Brand', 'Circular', 'Space', 'Emblem'],
    uploadedAt: '2026-09-30',
  },
  {
    id: 'med-3',
    name: 'ORBIT-I Favicon',
    url: '/orbit-favicon.png',
    type: 'image/png',
    size: '16 KB',
    altText: 'ORBIT-I favicon browser icon',
    tags: ['Favicon', 'Icon', 'Browser'],
    uploadedAt: '2026-09-30',
  },
  {
    id: 'med-4',
    name: 'ORBIT-I Official Brand Header Logo',
    url: '/orbit-i-logo.png',
    type: 'image/png',
    size: '650 KB',
    altText: 'ORBIT-I Private Limited primary high-resolution emblem',
    tags: ['Logo', 'Brand', 'Header', 'HighRes'],
    uploadedAt: '2026-09-30',
  },
];

// Initial Verified Technical Articles (Full Categories, Tags, SEO & Content)
export const INITIAL_ARTICLES: ContentArticle[] = [
  {
    id: 'art-1',
    slug: 'architecting-high-concurrency-microservices-2026',
    title: 'Architecting High-Concurrency Microservices for Modern Pakistani Enterprises',
    category: 'Software Architecture',
    author: 'Muhammad Muneeb Ur Rahman Shahzad (Co-Founder & CTO)',
    publishedDate: '2026-09-15',
    readTime: '6 min read',
    tags: ['Microservices', 'Distributed Systems', 'MySQL', 'Node.js', 'High Concurrency', 'Architecture'],
    excerpt:
      'A deep technical dive into zero-downtime database migrations, connection pooling, and latency reduction for regional e-commerce and logistics platforms.',
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
    status: 'published',
    featuredImage: '/orbit-circular-logo.png',
    imageAlt: 'ORBIT-I Microservices Architecture Diagram',
    metaTitle: 'High-Concurrency Microservices Architecture | ORBIT-I Technical Insights',
    metaDescription:
      'Learn how ORBIT-I architectures resilient, high-concurrency microservices, connection pooling, and low-latency APIs for modern Pakistani enterprises.',
    focusKeywords: ['microservices pakistan', 'high concurrency architecture', 'relational database scaling'],
    canonicalUrl: 'https://orbit-i.tech/blog/architecting-high-concurrency-microservices-2026',
  },
  {
    id: 'art-2',
    slug: 'strict-type-safety-full-stack-web-applications',
    title: 'Why Strict Type-Safety is the Foundation of Long-Term Software Maintainability',
    category: 'Web & Mobile Engineering',
    author: 'Abdul Samad Rind (Founder & CEO)',
    publishedDate: '2026-08-20',
    readTime: '5 min read',
    tags: ['TypeScript', 'Type Safety', 'Clean Code', 'Web Development', 'React', 'Node.js'],
    excerpt:
      'How end-to-end TypeScript validation from API contracts to UI components eliminates over 80% of runtime production errors.',
    content: `<h2>1. The Cost of Runtime Type Errors</h2>
<p>In custom software engineering, runtime errors in production directly translate to customer dissatisfaction and operational downtime. At ORBIT-I Private Limited, every system enforces strict compiler gates.</p>
<h3>Shared DTOs & Schema Contracts</h3>
<p>By sharing TypeScript interfaces between server route handlers and client React components, data contract changes are caught at compile-time rather than during production checkout or user onboarding.</p>
<blockquote class="border-l-4 border-black pl-4 py-2 italic my-4 text-gray-800 bg-gray-50 rounded-r-lg">
  "If the code compiles with zero warnings under strict mode, you have pre-emptively solved dozens of production regressions before a single customer clicks your portal."
</blockquote>`,
    status: 'published',
    featuredImage: '/Abdul Samad.jpeg',
    imageAlt: 'Abdul Samad Rind on TypeScript Engineering',
    metaTitle: 'Strict Type-Safety in Full-Stack Web Applications | ORBIT-I Tech',
    metaDescription:
      'Discover how strict TypeScript contracts across frontend and backend layers eliminate production bugs and accelerate engineering sprint velocity.',
    focusKeywords: ['typescript web development', 'full stack type safety', 'software maintainability'],
    canonicalUrl: 'https://orbit-i.tech/blog/strict-type-safety-full-stack-web-applications',
  },
  {
    id: 'art-3',
    slug: 'llm-orchestration-enterprise-automation-pakistan',
    title: 'Enterprise AI & LLM Orchestration: Transforming Business Workflows with Precision',
    category: 'Artificial Intelligence & ML',
    author: 'Rashid Ali Channa (AI / ML Engineer)',
    publishedDate: '2026-09-28',
    readTime: '7 min read',
    tags: ['AI', 'Machine Learning', 'LLMs', 'Vector Databases', 'LangChain', 'Python'],
    excerpt:
      'Deploying private Retrieval-Augmented Generation (RAG) pipelines, semantic embeddings, and automated business agents without corporate data leakage.',
    content: `<h2>1. The Next Evolution of Enterprise Automation</h2>
<p>Enterprises generate petabytes of proprietary manuals, contracts, and ticketing history. ORBIT-I designs private RAG pipelines that index your documents inside vector stores, allowing intelligent conversational search with verifiable source citations.</p>
<h3>Security and Data Sovereignty</h3>
<p>Proprietary enterprise documents never train public foundation models. We implement isolated embedding stores with strict role-based access control.</p>`,
    status: 'published',
    featuredImage: '/orbit-i-logo.png',
    imageAlt: 'Enterprise AI & LLM Pipelines',
    metaTitle: 'Enterprise LLM Orchestration & AI Workflows | ORBIT-I AI Research',
    metaDescription:
      'Guide to building private RAG systems, local LLM orchestration, and vector retrieval pipelines for automated enterprise operations.',
    focusKeywords: ['enterprise ai pakistan', 'llm orchestration', 'rag pipelines', 'vector search'],
    canonicalUrl: 'https://orbit-i.tech/blog/llm-orchestration-enterprise-automation-pakistan',
  },
];

// In-Memory store for graceful local fallback
interface LocalStoreState {
  company: CompanyInfo;
  services: ServiceDetail[];
  team: TeamMember[];
  certificates: Record<string, VerifiedCertificate>;
  inquiries: Array<any>;
  media: Array<any>;
  settings: Record<string, any>;
  articles: ContentArticle[];
}

let memoryStore: LocalStoreState = {
  company: { ...COMPANY_INFO },
  services: [...VERIFIED_SERVICES],
  team: [...INITIAL_TEAM_MEMBERS],
  certificates: { ...VERIFIED_CERTIFICATES },
  inquiries: [],
  media: [...INITIAL_MEDIA_ASSETS],
  settings: {},
  articles: [...INITIAL_ARTICLES],
};

// Load saved local cache if present
function loadLocalCache() {
  try {
    if (fs.existsSync(LOCAL_CACHE_PATH)) {
      const data = JSON.parse(fs.readFileSync(LOCAL_CACHE_PATH, 'utf-8'));
      if (data && typeof data === 'object') {
        memoryStore = { ...memoryStore, ...data };
      }
    }
  } catch (err) {
    console.warn('[STORAGE] Note: Could not read local storage cache, using defaults.');
  }
}

function saveLocalCache() {
  try {
    fs.writeFileSync(LOCAL_CACHE_PATH, JSON.stringify(memoryStore, null, 2), 'utf-8');
  } catch (err) {
    console.warn('[STORAGE] Note: Could not write local storage cache.', err);
  }
}

loadLocalCache();

// Database connection state
let pool: Pool | null = null;
let isMysqlConnected = false;
let dbErrorMessage: string | null = null;

export async function initDatabase(): Promise<{ success: boolean; isMysql: boolean; message: string }> {
  const host = process.env.DB_HOST || 'localhost';
  const port = parseInt(process.env.DB_PORT || '3306', 10);
  const user = process.env.DB_USER || 'root';
  const password = process.env.DB_PASSWORD || '';
  const database = process.env.DB_NAME || 'orbit_i_db';
  const connectionLimit = parseInt(process.env.DB_CONNECTION_LIMIT || '10', 10);

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
      connectTimeout: 5000,
    });

    // Test connectivity
    const connection = await pool.getConnection();
    await connection.ping();
    connection.release();

    isMysqlConnected = true;
    dbErrorMessage = null;
    console.log(`[ORBIT-I DATABASE] ✅ Connected to MySQL successfully at ${host}:${port}/${database}`);

    // Auto-create and seed tables
    await autoMigrateTables();

    return {
      success: true,
      isMysql: true,
      message: `MySQL connected on ${host}:${port}/${database}`,
    };
  } catch (err: any) {
    isMysqlConnected = false;
    dbErrorMessage = err.message;
    console.log(
      `[ORBIT-I DATABASE] ℹ️ MySQL not active at ${host}:${port} (${err.message}). Seamlessly running in Local Memory/File Fallback Mode.`
    );
    console.log(
      `[ORBIT-I DATABASE] 💡 Hostinger tip: Enter your Hostinger MySQL DB_HOST, DB_USER, DB_PASSWORD, DB_NAME in .env to connect Hostinger MySQL.`
    );
    return {
      success: true,
      isMysql: false,
      message: `Running in Local Persistent Fallback Mode: ${err.message}`,
    };
  }
}

// Auto-migration for Hostinger MySQL
async function autoMigrateTables() {
  if (!pool || !isMysqlConnected) return;

  try {
    // 1. company_info
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

    // 2. team_members
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

    // 3. services
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

    // 4. certificates
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

    // 5. inquiries
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

    // 6. media_assets
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

    // 7. site_settings
    await pool.query(`
      CREATE TABLE IF NOT EXISTS \`site_settings\` (
        \`setting_key\` VARCHAR(64) NOT NULL,
        \`setting_value\` LONGTEXT NOT NULL,
        \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (\`setting_key\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 8. articles (Content Writing & Technical Blog Engine)
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

    // Check if team_members has data, if not seed it!
    const [teamRows]: any = await pool.query(`SELECT COUNT(*) as count FROM \`team_members\``);
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
            tm.displayOrder || 0,
          ]
        );
      }
      console.log(`[ORBIT-I DATABASE] 🚀 Auto-seeded team_members table in MySQL.`);
    }

    // Check services
    const [srvRows]: any = await pool.query(`SELECT COUNT(*) as count FROM \`services\``);
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
            order++,
          ]
        );
      }
      console.log(`[ORBIT-I DATABASE] 🚀 Auto-seeded services table in MySQL.`);
    }

    // Check certificates
    const [certRows]: any = await pool.query(`SELECT COUNT(*) as count FROM \`certificates\``);
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
            cert.isAuthentic ? 1 : 0,
          ]
        );
      }
      console.log(`[ORBIT-I DATABASE] 🚀 Auto-seeded certificates table in MySQL.`);
    }

    // Check articles
    const [artRows]: any = await pool.query(`SELECT COUNT(*) as count FROM \`articles\``);
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
            a.status || 'published',
            a.featuredImage || null,
            a.imageAlt || null,
            a.metaTitle || null,
            a.metaDescription || null,
            JSON.stringify(a.focusKeywords || []),
            a.canonicalUrl || null,
          ]
        );
      }
      console.log(`[ORBIT-I DATABASE] 🚀 Auto-seeded articles table in MySQL.`);
    }
  } catch (err: any) {
    console.error(`[ORBIT-I DATABASE] Error in auto-migration:`, err.message);
  }
}

// ----------------------------------------------------------------------
// DATA ACCESS LAYER: CRUD API FOR ALL ENTITIES
// ----------------------------------------------------------------------

// 1. COMPANY INFO
export async function getCompanyInfo(): Promise<CompanyInfo> {
  if (isMysqlConnected && pool) {
    try {
      const [rows]: any = await pool.query('SELECT * FROM `company_info` LIMIT 1');
      if (rows && rows.length > 0) {
        const r = rows[0];
        return {
          name: r.name,
          legalName: r.legal_name,
          tagline: r.tagline,
          founder: r.founder,
          coFounders: typeof r.co_founders === 'string' ? JSON.parse(r.co_founders) : r.co_founders || [],
          logoUrl: r.logo_url,
          summary: r.summary,
          email: r.email,
          phone: r.phone,
          location: r.location,
          website: r.website,
          socialLinks: typeof r.social_links === 'string' ? JSON.parse(r.social_links) : r.social_links || {},
          established: r.established,
          registrationType: r.registration_type,
        };
      }
    } catch (err) {
      console.error('MySQL getCompanyInfo error:', err);
    }
  }
  return memoryStore.company;
}

export async function updateCompanyInfo(data: Partial<CompanyInfo>): Promise<CompanyInfo> {
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
          JSON.stringify(memoryStore.company.socialLinks),
        ]
      );
    } catch (err) {
      console.error('MySQL updateCompanyInfo error:', err);
    }
  }
  return memoryStore.company;
}

// 2. TEAM MEMBERS (CRUD)
export async function getTeamMembers(): Promise<TeamMember[]> {
  if (isMysqlConnected && pool) {
    try {
      const [rows]: any = await pool.query('SELECT * FROM `team_members` ORDER BY `display_order` ASC, `created_at` ASC');
      if (rows && rows.length > 0) {
        return rows.map((r: any) => ({
          id: r.id,
          name: r.name,
          role: r.role,
          tier: r.tier,
          department: r.department,
          bio: r.bio,
          avatar: r.avatar || '',
          initials: r.initials,
          email: r.email,
          linkedin: r.linkedin || '',
          portfolio: r.portfolio || '',
          whatsapp: r.whatsapp || '',
          skills: typeof r.skills === 'string' ? JSON.parse(r.skills || '[]') : r.skills || [],
          displayOrder: r.display_order,
        }));
      }
    } catch (err) {
      console.error('MySQL getTeamMembers error:', err);
    }
  }
  return memoryStore.team;
}

export async function addTeamMember(member: TeamMember): Promise<TeamMember> {
  const newMember: TeamMember = {
    ...member,
    id: member.id || `tm-${Date.now()}`,
    initials:
      member.initials ||
      member.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase(),
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
          newMember.displayOrder || memoryStore.team.length,
        ]
      );
    } catch (err) {
      console.error('MySQL addTeamMember error:', err);
    }
  }

  return newMember;
}

export async function updateTeamMember(id: string, updates: Partial<TeamMember>): Promise<TeamMember | null> {
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
          id,
        ]
      );
    } catch (err) {
      console.error('MySQL updateTeamMember error:', err);
    }
  }

  return updated;
}

export async function deleteTeamMember(id: string): Promise<boolean> {
  const index = memoryStore.team.findIndex((m) => m.id === id);
  if (index === -1) return false;

  memoryStore.team.splice(index, 1);
  saveLocalCache();

  if (isMysqlConnected && pool) {
    try {
      await pool.query('DELETE FROM `team_members` WHERE `id` = ?', [id]);
    } catch (err) {
      console.error('MySQL deleteTeamMember error:', err);
    }
  }

  return true;
}

// 3. SERVICES (CRUD)
export async function getServices(): Promise<ServiceDetail[]> {
  if (isMysqlConnected && pool) {
    try {
      const [rows]: any = await pool.query('SELECT * FROM `services` ORDER BY `display_order` ASC');
      if (rows && rows.length > 0) {
        return rows.map((r: any) => ({
          id: r.id,
          title: r.title,
          slug: r.slug,
          summary: r.summary,
          description: r.description,
          benefits: typeof r.benefits === 'string' ? JSON.parse(r.benefits || '[]') : r.benefits || [],
          technologies: typeof r.technologies === 'string' ? JSON.parse(r.technologies || '[]') : r.technologies || [],
          processSteps: typeof r.process_steps === 'string' ? JSON.parse(r.process_steps || '[]') : r.process_steps || [],
          iconName: r.icon_name,
        }));
      }
    } catch (err) {
      console.error('MySQL getServices error:', err);
    }
  }
  return memoryStore.services;
}

export async function addService(service: ServiceDetail): Promise<ServiceDetail> {
  const newService: ServiceDetail = {
    ...service,
    id: service.id || `srv-${Date.now()}`,
    slug:
      service.slug ||
      service.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, ''),
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
          newService.iconName || 'Code2',
          memoryStore.services.length,
        ]
      );
    } catch (err) {
      console.error('MySQL addService error:', err);
    }
  }

  return newService;
}

export async function updateService(id: string, updates: Partial<ServiceDetail>): Promise<ServiceDetail | null> {
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
          updated.iconName || 'Code2',
          id,
        ]
      );
    } catch (err) {
      console.error('MySQL updateService error:', err);
    }
  }

  return updated;
}

export async function deleteService(id: string): Promise<boolean> {
  const index = memoryStore.services.findIndex((s) => s.id === id);
  if (index === -1) return false;

  memoryStore.services.splice(index, 1);
  saveLocalCache();

  if (isMysqlConnected && pool) {
    try {
      await pool.query('DELETE FROM `services` WHERE `id` = ?', [id]);
    } catch (err) {
      console.error('MySQL deleteService error:', err);
    }
  }

  return true;
}

// 4. CERTIFICATES & VERIFICATION (CRUD)
export async function getCertificates(): Promise<VerifiedCertificate[]> {
  if (isMysqlConnected && pool) {
    try {
      const [rows]: any = await pool.query('SELECT * FROM `certificates` ORDER BY `created_at` DESC');
      if (rows && rows.length > 0) {
        return rows.map((r: any) => ({
          certificateId: r.certificate_id,
          fullName: r.full_name,
          email: r.email,
          phone: r.phone || '',
          department: r.department,
          role: r.role,
          startDate: r.start_date instanceof Date ? r.start_date.toISOString().split('T')[0] : String(r.start_date),
          endDate: r.end_date instanceof Date ? r.end_date.toISOString().split('T')[0] : String(r.end_date),
          duration: r.duration,
          completionStatus: r.completion_status,
          certificateStatus: r.certificate_status,
          gradePerformance: r.grade_performance,
          verificationCode: r.verification_code,
          issueDate: r.issue_date instanceof Date ? r.issue_date.toISOString().split('T')[0] : String(r.issue_date),
          remarks: r.remarks || '',
          isAuthentic: Boolean(r.is_authentic),
        }));
      }
    } catch (err) {
      console.error('MySQL getCertificates error:', err);
    }
  }
  return Object.values(memoryStore.certificates);
}

export async function getCertificateById(id: string): Promise<VerifiedCertificate | null> {
  const normId = id.trim().toUpperCase();

  if (isMysqlConnected && pool) {
    try {
      const [rows]: any = await pool.query(
        'SELECT * FROM `certificates` WHERE UPPER(`certificate_id`) = ? OR UPPER(`verification_code`) = ? LIMIT 1',
        [normId, normId]
      );
      if (rows && rows.length > 0) {
        const r = rows[0];
        return {
          certificateId: r.certificate_id,
          fullName: r.full_name,
          email: r.email,
          phone: r.phone || '',
          department: r.department,
          role: r.role,
          startDate: r.start_date instanceof Date ? r.start_date.toISOString().split('T')[0] : String(r.start_date),
          endDate: r.end_date instanceof Date ? r.end_date.toISOString().split('T')[0] : String(r.end_date),
          duration: r.duration,
          completionStatus: r.completion_status,
          certificateStatus: r.certificate_status,
          gradePerformance: r.grade_performance,
          verificationCode: r.verification_code,
          issueDate: r.issue_date instanceof Date ? r.issue_date.toISOString().split('T')[0] : String(r.issue_date),
          remarks: r.remarks || '',
          isAuthentic: Boolean(r.is_authentic),
        };
      }
    } catch (err) {
      console.error('MySQL getCertificateById error:', err);
    }
  }

  // Memory search
  for (const cert of Object.values(memoryStore.certificates)) {
    if (
      cert.certificateId.toUpperCase() === normId ||
      cert.verificationCode.toUpperCase() === normId
    ) {
      return cert;
    }
  }
  return null;
}

export async function addCertificate(cert: VerifiedCertificate): Promise<VerifiedCertificate> {
  const certificateId = cert.certificateId || `ORBIT-I/INT/2026/${String(Date.now()).slice(-2)}`;
  const newCert: VerifiedCertificate = {
    ...cert,
    certificateId,
    verificationCode: cert.verificationCode || `ORB-SEC-${Math.floor(1000 + Math.random() * 9000)}-VLD-2026`,
    isAuthentic: true,
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
          newCert.isAuthentic ? 1 : 0,
        ]
      );
    } catch (err) {
      console.error('MySQL addCertificate error:', err);
    }
  }

  return newCert;
}

export async function updateCertificate(id: string, updates: Partial<VerifiedCertificate>): Promise<VerifiedCertificate | null> {
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
          id,
        ]
      );
    } catch (err) {
      console.error('MySQL updateCertificate error:', err);
    }
  }

  return updated;
}

export async function deleteCertificate(id: string): Promise<boolean> {
  if (!memoryStore.certificates[id]) return false;

  delete memoryStore.certificates[id];
  saveLocalCache();

  if (isMysqlConnected && pool) {
    try {
      await pool.query('DELETE FROM `certificates` WHERE `certificate_id` = ?', [id]);
    } catch (err) {
      console.error('MySQL deleteCertificate error:', err);
    }
  }

  return true;
}

// 5. CONTACT INQUIRIES (CRUD)
export async function getInquiries(): Promise<any[]> {
  if (isMysqlConnected && pool) {
    try {
      const [rows]: any = await pool.query('SELECT * FROM `inquiries` ORDER BY `submitted_at` DESC');
      if (rows) return rows;
    } catch (err) {
      console.error('MySQL getInquiries error:', err);
    }
  }
  return memoryStore.inquiries;
}

export async function addInquiry(inquiry: any): Promise<any> {
  const newInq = {
    id: inquiry.id || `inq-${Date.now()}`,
    name: inquiry.name,
    email: inquiry.email,
    phone: inquiry.phone || '',
    company: inquiry.company || '',
    serviceRequired: inquiry.serviceRequired || 'General Consultation',
    budgetRange: inquiry.budgetRange || 'Flexible',
    timeline: inquiry.timeline || 'Standard',
    message: inquiry.message,
    status: 'New',
    submittedAt: new Date().toISOString(),
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
          newInq.status,
        ]
      );
    } catch (err) {
      console.error('MySQL addInquiry error:', err);
    }
  }

  return newInq;
}

export async function updateInquiryStatus(id: string, status: string): Promise<boolean> {
  const inq = memoryStore.inquiries.find((i) => i.id === id);
  if (inq) {
    inq.status = status;
    saveLocalCache();
  }

  if (isMysqlConnected && pool) {
    try {
      await pool.query('UPDATE `inquiries` SET `status` = ? WHERE `id` = ?', [status, id]);
    } catch (err) {
      console.error('MySQL updateInquiryStatus error:', err);
    }
  }

  return true;
}

export async function deleteInquiry(id: string): Promise<boolean> {
  const idx = memoryStore.inquiries.findIndex((i) => i.id === id);
  if (idx !== -1) {
    memoryStore.inquiries.splice(idx, 1);
    saveLocalCache();
  }

  if (isMysqlConnected && pool) {
    try {
      await pool.query('DELETE FROM `inquiries` WHERE `id` = ?', [id]);
    } catch (err) {
      console.error('MySQL deleteInquiry error:', err);
    }
  }

  return true;
}

// 6. MEDIA ASSETS (CRUD)
export async function getMediaAssets(): Promise<any[]> {
  if (isMysqlConnected && pool) {
    try {
      const [rows]: any = await pool.query('SELECT * FROM `media_assets` ORDER BY `uploaded_at` DESC');
      if (rows && rows.length > 0) {
        return rows.map((r: any) => ({
          id: r.id,
          name: r.name,
          url: r.url,
          type: r.type,
          size: r.size,
          altText: r.alt_text,
          tags: typeof r.tags === 'string' ? JSON.parse(r.tags || '[]') : r.tags || [],
          uploadedAt: r.uploaded_at instanceof Date ? r.uploaded_at.toISOString().split('T')[0] : String(r.uploaded_at),
        }));
      }
    } catch (err) {
      console.error('MySQL getMediaAssets error:', err);
    }
  }
  return memoryStore.media;
}

export async function addMediaAsset(asset: any): Promise<any> {
  const newAsset = {
    id: asset.id || `med-${Date.now()}`,
    name: asset.name,
    url: asset.url,
    type: asset.type || 'image/jpeg',
    size: asset.size || '50 KB',
    altText: asset.altText || asset.name,
    tags: asset.tags || ['General'],
    uploadedAt: new Date().toISOString().split('T')[0],
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
          JSON.stringify(newAsset.tags),
        ]
      );
    } catch (err) {
      console.error('MySQL addMediaAsset error:', err);
    }
  }

  return newAsset;
}

export async function deleteMediaAsset(id: string): Promise<boolean> {
  const idx = memoryStore.media.findIndex((m) => m.id === id);
  if (idx !== -1) {
    memoryStore.media.splice(idx, 1);
    saveLocalCache();
  }

  if (isMysqlConnected && pool) {
    try {
      await pool.query('DELETE FROM `media_assets` WHERE `id` = ?', [id]);
    } catch (err) {
      console.error('MySQL deleteMediaAsset error:', err);
    }
  }

  return true;
}

// 7. ARTICLES & TECHNICAL BLOGS (CRUD)
export async function getArticles(includeDrafts = false): Promise<ContentArticle[]> {
  if (isMysqlConnected && pool) {
    try {
      const query = includeDrafts
        ? 'SELECT * FROM `articles` ORDER BY `created_at` DESC'
        : "SELECT * FROM `articles` WHERE `status` = 'published' ORDER BY `created_at` DESC";
      const [rows]: any = await pool.query(query);
      if (rows && rows.length > 0) {
        return rows.map((r: any) => ({
          id: r.id,
          slug: r.slug,
          title: r.title,
          category: r.category,
          author: r.author,
          publishedDate: r.published_date,
          readTime: r.read_time,
          tags: typeof r.tags === 'string' ? JSON.parse(r.tags || '[]') : r.tags || [],
          excerpt: r.excerpt,
          content: r.content,
          status: r.status,
          featuredImage: r.featured_image || '',
          imageAlt: r.image_alt || '',
          metaTitle: r.meta_title || '',
          metaDescription: r.meta_description || '',
          focusKeywords: typeof r.focus_keywords === 'string' ? JSON.parse(r.focus_keywords || '[]') : r.focus_keywords || [],
          canonicalUrl: r.canonical_url || '',
          lastModified: r.last_modified || '',
        }));
      }
    } catch (err) {
      console.error('MySQL getArticles error:', err);
    }
  }
  return includeDrafts ? memoryStore.articles : memoryStore.articles.filter((a) => a.status === 'published');
}

export async function getArticleBySlug(slug: string): Promise<ContentArticle | null> {
  const normSlug = slug.trim().toLowerCase();
  if (isMysqlConnected && pool) {
    try {
      const [rows]: any = await pool.query(
        'SELECT * FROM `articles` WHERE LOWER(`slug`) = ? OR LOWER(`id`) = ? LIMIT 1',
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
          tags: typeof r.tags === 'string' ? JSON.parse(r.tags || '[]') : r.tags || [],
          excerpt: r.excerpt,
          content: r.content,
          status: r.status,
          featuredImage: r.featured_image || '',
          imageAlt: r.image_alt || '',
          metaTitle: r.meta_title || '',
          metaDescription: r.meta_description || '',
          focusKeywords: typeof r.focus_keywords === 'string' ? JSON.parse(r.focus_keywords || '[]') : r.focus_keywords || [],
          canonicalUrl: r.canonical_url || '',
          lastModified: r.last_modified || '',
        };
      }
    } catch (err) {
      console.error('MySQL getArticleBySlug error:', err);
    }
  }
  return memoryStore.articles.find((a) => a.slug.toLowerCase() === normSlug || a.id.toLowerCase() === normSlug) || null;
}

export async function addArticle(article: ContentArticle): Promise<ContentArticle> {
  const newArticle: ContentArticle = {
    ...article,
    id: article.id || `art-${Date.now()}`,
    slug:
      article.slug ||
      article.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, ''),
    publishedDate: article.publishedDate || new Date().toISOString().split('T')[0],
    readTime: article.readTime || '5 min read',
    status: article.status || 'published',
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
          newArticle.lastModified || new Date().toISOString().split('T')[0],
        ]
      );
    } catch (err) {
      console.error('MySQL addArticle error:', err);
    }
  }

  return newArticle;
}

export async function updateArticle(id: string, updates: Partial<ContentArticle>): Promise<ContentArticle | null> {
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
          new Date().toISOString().split('T')[0],
          updated.id,
        ]
      );
    } catch (err) {
      console.error('MySQL updateArticle error:', err);
    }
  }

  return updated;
}

export async function deleteArticle(id: string): Promise<boolean> {
  const index = memoryStore.articles.findIndex((a) => a.id === id || a.slug === id);
  if (index === -1) return false;

  const actualId = memoryStore.articles[index].id;
  memoryStore.articles.splice(index, 1);
  saveLocalCache();

  if (isMysqlConnected && pool) {
    try {
      await pool.query('DELETE FROM `articles` WHERE `id` = ?', [actualId]);
    } catch (err) {
      console.error('MySQL deleteArticle error:', err);
    }
  }

  return true;
}

// 8. TELEMETRY & SYSTEM HEALTH
export async function getDatabaseStatus() {
  const host = process.env.DB_HOST || 'localhost';
  const port = process.env.DB_PORT || '3306';
  const database = process.env.DB_NAME || 'orbit_i_db';
  const user = process.env.DB_USER || 'root';

  let tableCounts: Record<string, number> = {
    team_members: memoryStore.team.length,
    services: memoryStore.services.length,
    certificates: Object.keys(memoryStore.certificates).length,
    inquiries: memoryStore.inquiries.length,
    media_assets: memoryStore.media.length,
    articles: memoryStore.articles.length,
  };

  if (isMysqlConnected && pool) {
    try {
      const [t]: any = await pool.query('SELECT COUNT(*) as c FROM `team_members`');
      const [s]: any = await pool.query('SELECT COUNT(*) as c FROM `services`');
      const [c]: any = await pool.query('SELECT COUNT(*) as c FROM `certificates`');
      const [i]: any = await pool.query('SELECT COUNT(*) as c FROM `inquiries`');
      const [m]: any = await pool.query('SELECT COUNT(*) as c FROM `media_assets`');
      const [a]: any = await pool.query('SELECT COUNT(*) as c FROM `articles`');

      tableCounts = {
        team_members: t[0]?.c || 0,
        services: s[0]?.c || 0,
        certificates: c[0]?.c || 0,
        inquiries: i[0]?.c || 0,
        media_assets: m[0]?.c || 0,
        articles: a[0]?.c || 0,
      };
    } catch (e) {}
  }

  return {
    isMysqlConnected,
    engine: isMysqlConnected ? 'MySQL 8.0 / InnoDB (Hostinger Native)' : 'Local File/Memory Fallback (Active)',
    host,
    port,
    database,
    user,
    hostingerPlatformReady: true,
    dbErrorMessage,
    tableCounts,
    timestamp: new Date().toISOString(),
  };
}
