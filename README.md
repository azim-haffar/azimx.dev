<div align="center">

# azimx.dev

### Personal Software Engineering Portfolio

**Backend Engineering · Distributed Systems · Cloud-Oriented Development · Applied AI**

<p>
  <a href="https://azimx.dev">
    <img src="https://img.shields.io/badge/Live_Portfolio-2563EB?style=for-the-badge&logo=vercel&logoColor=white" />
  </a>
  <a href="https://github.com/azim-haffar">
    <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" />
  </a>
  <a href="https://www.linkedin.com/in/azim-haffar/">
    <img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" />
  </a>
</p>

<p>
  <img src="https://img.shields.io/badge/Next.js-16-000000?style=flat-square&logo=nextdotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=111827" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" />
</p>

</div>

---

<div align="center">

<img src="public/images/og-cover.png" width="90%" alt="Azim Haffar portfolio preview" />

</div>

---

## Overview

**azimx.dev** is my personal software engineering portfolio.

It is designed to present concrete engineering evidence rather than just a list of technologies: projects, professional experience, technical decisions, skills, and the systems I have built.

The site currently highlights my work across:

- **Backend engineering**
- **Distributed systems**
- **Java / Spring Boot**
- **Python / FastAPI**
- **Applied AI / LLM integration**
- **Docker and CI/CD**
- **Cloud-oriented development**

The portfolio is also where I maintain a public overview of my experience and technical work while applying for software engineering internships in Europe.

---

## 🚀 Featured Work

<table>
<tr>
<td width="50%" valign="top">

### ⚡ OrderFlow

**Event-Driven Order Processing System**

Backend-focused distributed system built around asynchronous Kafka messaging, PostgreSQL persistence, Redis caching, containerization, and integration testing.

**Engineering topics**

- Apache Kafka
- Transactional outbox
- Pessimistic locking
- PostgreSQL
- Redis
- Testcontainers
- Docker Compose
- RFC 7807

<a href="https://github.com/azim-haffar/OrderFlow">
  <img src="https://img.shields.io/badge/View_Project-181717?style=for-the-badge&logo=github&logoColor=white" />
</a>

</td>

<td width="50%" valign="top">

### 🤖 HireLens

**Full-Stack AI Recruitment Platform**

AI-powered application combining document processing, recruitment workflows, LLM integration, and a FastAPI / React architecture.

**Engineering topics**

- FastAPI
- React / TypeScript
- LLM APIs
- RAG
- Supabase
- Docker
- GitHub Actions
- Authentication

<a href="https://github.com/azim-haffar/HireLens">
  <img src="https://img.shields.io/badge/View_Project-181717?style=for-the-badge&logo=github&logoColor=white" />
</a>

</td>
</tr>
</table>

---

## 💼 Professional Experience

### Kvote 2 Hjælperen — Freelance Software Developer

**Remote · Feb 2026 – Apr 2026**

- Built and shipped a Python tool integrating **LLM APIs** with dynamic prompt-generation workflows for a paying client.
- Designed inference workflows using prompt chaining and evaluation logic.
- Owned **requirements, architecture, implementation, testing, and delivery**.

The portfolio deliberately separates **professional work** from personal projects rather than presenting everything under one generic project section.

---

## 🧭 Portfolio Structure

The site is organized around the information a technical recruiter or engineer is likely to care about first.

```text
Projects
   │
   ▼
Professional Experience
   │
   ▼
Technical Skills
   │
   ▼
About
   │
   ▼
Contact
```

Primary navigation includes:

```text
Work · Experience · Skills · About · Contact
```

---

## 🛠️ Tech Stack

<div align="center">

### Framework

<img src="https://skillicons.dev/icons?i=nextjs,react" />

<br>

`Next.js 16` · `React 19`

<br><br>

### Language

<img src="https://skillicons.dev/icons?i=typescript" />

<br>

`TypeScript 5`

<br><br>

### Styling

<img src="https://skillicons.dev/icons?i=tailwind" />

<br>

`Tailwind CSS 4`

<br><br>

### Tooling

`ESLint` · `PostCSS` · `Lucide React`

</div>

---

## 🏗️ Architecture

The portfolio uses the **Next.js App Router** and keeps presentation components separate from portfolio content.

```text
Browser
   │
   ▼
Next.js
   │
   ├── App Router
   │
   ├── React Components
   │
   └── Portfolio Data
            │
            ├── Projects
            ├── Experience
            ├── Skills
            └── Site Configuration
```

Content such as projects and professional experience is defined separately from the UI so it can be updated without embedding large amounts of career data directly inside page components.

---

## 📁 Project Structure

```text
azimx.dev/
│
├── public/
│   ├── images/
│   │   └── og-cover.png
│   │
│   ├── projects/
│   └── Azim_Haffar_CV_Backend.pdf
│
├── src/
│   ├── app/
│   │   └── Next.js App Router
│   │
│   ├── components/
│   │   └── Reusable UI components
│   │
│   ├── data/
│   │   ├── experience.ts
│   │   ├── projects.ts
│   │   ├── site.ts
│   │   └── skills.ts
│   │
│   └── types/
│       └── Portfolio TypeScript types
│
├── package.json
├── next.config.ts
├── tsconfig.json
├── postcss.config.mjs
└── eslint.config.mjs
```

---

## 🧩 Content Architecture

Portfolio content is kept in dedicated TypeScript data files.

### Projects

```text
src/data/projects.ts
```

Contains project descriptions, technologies, GitHub links, images, architecture information, and project visibility state.

### Experience

```text
src/data/experience.ts
```

Contains verified professional experience.

### Site Configuration

```text
src/data/site.ts
```

Contains:

```text
Name
Domain
SEO description
Navigation
Contact details
Resume
Social links
```

### Skills

```text
src/data/skills.ts
```

Keeps technical skills separate from component implementation.

---

## ⚙️ Local Development

### Requirements

- Node.js
- npm

Clone the repository:

```bash
git clone https://github.com/azim-haffar/azimx.dev.git
cd azimx.dev
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## 🧪 Available Scripts

### Development

```bash
npm run dev
```

Runs the Next.js development server.

### Production Build

```bash
npm run build
```

Creates an optimized production build.

### Production Server

```bash
npm run start
```

Runs the production build.

### Lint

```bash
npm run lint
```

Runs ESLint across the project.

---

## 🎯 Design Principles

### Evidence over aesthetics

The site is intentionally built around concrete work:

```text
Projects
+
Professional Experience
+
Technical Decisions
+
Actual Technologies Used
```

Visual design supports the content rather than replacing it.

### Projects first

Engineering projects are one of the strongest pieces of evidence in my current profile, so they receive prominent placement.

### Honest technical positioning

The portfolio distinguishes between technologies I have actually used and technologies I am currently learning.

For example, cloud and DevOps capabilities are presented conservatively until dedicated infrastructure work provides stronger evidence.

### Maintainable content

Portfolio information is stored in structured TypeScript data files rather than being duplicated throughout page components.

---

## 🌍 Current Focus

My current technical direction is:

```text
Backend Engineering
        │
        ▼
Distributed Systems
        │
        ▼
Cloud / DevOps
```

My strongest current evidence is in **backend software engineering**, while I continue building deeper infrastructure and cloud experience.

---

## 📄 Resume

The repository includes my backend-focused CV:

<a href="public/Azim_Haffar_CV_Backend.pdf">
  <img src="https://img.shields.io/badge/View_Backend_CV-334155?style=for-the-badge&logo=readthedocs&logoColor=white" />
</a>

---

## 🌐 Live Site

<div align="center">

### azimx.dev

<a href="https://azimx.dev">
  <img src="https://img.shields.io/badge/Open_Portfolio-2563EB?style=for-the-badge&logo=vercel&logoColor=white" />
</a>

</div>

---

<div align="center">

## Built by Azim Haffar

**Software Engineering · Backend Systems · Cloud-Oriented Development**

<a href="https://azimx.dev">
  <img src="https://img.shields.io/badge/Portfolio-111827?style=for-the-badge&logo=vercel&logoColor=white" />
</a>

<a href="https://github.com/azim-haffar">
  <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" />
</a>

<a href="https://www.linkedin.com/in/azim-haffar/">
  <img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" />
</a>

</div>
