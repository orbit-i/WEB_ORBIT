# ORBIT-I Private Limited — Enterprise Web Infrastructure

Official high-availability corporate web application, client organization workspace, and executive administration console for **ORBIT-I Private Limited** (Incorporated under the Companies Act 2017, SECP Registered Technology Firm).

---

## 🏛️ System Overview

The platform is engineered with a decoupled, high-performance architecture delivering sub-second page loads, strict type safety, role-based access control (RBAC), and total portal data isolation.

- **Client Organization Workspace**: Dedicated, authenticated portal for corporate clients to inspect sprint deliverables, project telemetry, review milestones, and access signed completion documentation.
- **Executive Administration Console**: Comprehensive management system for team operations, service catalogues, vacancy postings, corporate governance, and relational database monitoring.
- **Editorial Subsystem**: Strictly scoped workspace ("principle of least privilege") tailored exclusively for technical content writers and media asset curation.
- **Public Brand & Engineering Platform**: Verified corporate credentials, interactive career opportunities, real-time SECP registration details, and technical blog publications.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend Framework** | React 19, TypeScript (Strict Mode), Vite |
| **Styling & Design System** | TailwindCSS, Lucide SVG Icons, Custom Design Tokens |
| **Routing Architecture** | Clean HTML5 PushState Path Routing (Zero Hash `#` Fragments) |
| **Backend & APIs** | Node.js (LTS), Express, TypeScript Runtime Engine |
| **Relational Database** | MySQL 8.0 / MariaDB (Connection Pooling, Prepared Statements) |
| **Security & Hardening** | SHA-256 PBKDF2 Hashing, TLS 1.3, CSP, Rate Limiting, RBAC Enforcement |
| **Process Management** | PM2 Runtime Engine, Systemd, Reverse Proxy Ready (Nginx / Apache) |

---

## 🚀 Production Deployment

### 1. Prerequisites
- **Node.js**: v18.x, v20.x, or v22.x LTS
- **Package Manager**: npm v9+
- **Database Engine**: MySQL 5.7+ or 8.0+ / MariaDB

### 2. Environment Configuration
Copy `.env.example` to `.env` and configure your production parameters:

```bash
cp .env.example .env
```

Ensure production secrets are generated with high entropy:
```env
PORT=3000
NODE_ENV=production
APP_URL=https://orbit-i.tech

DB_HOST=localhost
DB_PORT=3306
DB_USER=your_production_user
DB_PASSWORD=your_secure_database_password
DB_NAME=orbit_production_db
```

### 3. Database Initialization
Import the production database schema and initial records into your MySQL server:

```bash
mysql -u your_production_user -p orbit_production_db < database.sql
```

### 4. Build & Launch Application

Install dependencies and compile the production client bundle:

```bash
npm install --legacy-peer-deps
npm run build
```

Run the application service using Node.js or PM2:

```bash
# Direct startup:
npm run start

# Or with PM2 process manager:
pm2 start ecosystem.config.cjs --env production
pm2 save
```

---

## 🛡️ Security Architecture & RBAC

1. **Strict Portal Separation**: Client accounts and administrative staff operate in completely isolated authentication namespaces. Staff credentials cannot access client workspaces directly, and client credentials cannot enter executive consoles.
2. **Role Hierarchy**:
   - `superadmin`: Master root governance, infrastructure controls, security lockout, and staff provisioning.
   - `admin`: Operational content, verified services, team rosters, and job listings.
   - `manager`: Project milestones, client inquiries, and delivery oversight.
   - `content_writer`: Scoped access strictly limited to Articles/Blog CMS and Media Library.
   - `seo_specialist`: Search engine optimization, structured schema, canonical indexing, sitemaps, and traffic telemetry.
   - `client`: Organization workspace privileges for authorized corporate partners.
3. **Password Lifecycle**: Independent password reset with cryptographic 6-digit verification codes and in-dashboard password change workflows.

---

## 📄 License & Proprietary Rights

&copy; 2026 **ORBIT-I Private Limited**. All rights reserved.  
Registered Office: Nawabshah, Sindh, Pakistan.  
Unauthorized duplication, decompilation, or redistribution of this software without prior written authorization from executive leadership is strictly prohibited.
