"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Braces, Code2, Cloud, Database, FlaskConical, ScanLine, PanelsTopLeft, Check, RotateCcw } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { skillGroups } from "@/data/skills";

const logos: Record<string, string> = {
  "Java 21": "java", "Spring Boot": "spring", "Spring Data JPA": "spring",
  Python: "python", FastAPI: "fastapi", Docker: "docker", "Docker Compose": "docker",
  PostgreSQL: "postgresql", Redis: "redis", "Apache Kafka": "apachekafka",
  PyTorch: "pytorch", React: "react", JavaScript: "javascript", "TypeScript (portfolio)": "typescript",
  Git: "git", Linux: "linux", Supabase: "supabase", "GitHub Actions": "githubactions",
};
const icons = [Code2, Cloud, Database, FlaskConical, ScanLine, PanelsTopLeft];
type Insight = { text: string; href?: string; label?: string };
const areas: Record<string, Insight> = {
  Backend: { text: "APIs and application logic across my internship and personal projects.", href: "/#experience", label: "Related experience" },
  "Cloud & DevOps": { text: "Packaging, local dependencies, and development workflows.", href: "/#projects", label: "Related projects" },
  "Data / Messaging": { text: "Persistence, messaging, and caching across my projects.", href: "/projects/orderflow", label: "OrderFlow case study" },
  Testing: { text: "Unit and integration testing, including container-backed dependencies.", href: "/projects/orderflow", label: "OrderFlow test evidence" },
  "Applied AI & ML tooling": { text: "LLM evaluation and response checks, alongside training visualization tooling.", href: "/#projects", label: "Related projects" },
  Frontend: { text: "React project interfaces, with JavaScript in the apps and TypeScript in this portfolio.", href: "/#projects", label: "Related projects" },
};
const insights: Record<string, Insight> = {
  "Java 21": { text: "OrderFlow: order and inventory logic, with 17 local passing tests across unit and integration suites.", href: "/projects/orderflow", label: "OrderFlow" },
  "Spring Boot": { text: "OrderFlow: REST endpoints, transactional persistence, and asynchronous inventory processing.", href: "/projects/orderflow", label: "OrderFlow" },
  "Spring Data JPA": { text: "OrderFlow: repository access and order-before-product locking around inventory changes.", href: "/projects/orderflow", label: "OrderFlow" },
  PostgreSQL: { text: "OrderFlow: persist orders and outbox events together, then lock rows during inventory updates.", href: "/projects/orderflow", label: "OrderFlow" },
  "Apache Kafka": { text: "OrderFlow: event processing, retry, and stock-safe replay in the local Kafka recovery experiment.", href: "/projects/orderflow", label: "Recovery story" },
  Redis: { text: "OrderFlow: product caching and eviction. Cache updates are not atomic with database commits.", href: "/projects/orderflow", label: "OrderFlow" },
  Python: { text: "HireLens and ML Training Inspector backends, plus paid Python/LLM development for Kvote.", href: "/#experience", label: "Experience" },
  FastAPI: { text: "HireLens: document-analysis endpoints. ML Training Inspector: API and WebSocket endpoints.", href: "/projects/hirelens", label: "HireLens" },
  React: { text: "Interfaces for order processing, CV analysis, and live training feedback.", href: "/projects/ml-training-inspector", label: "Training dashboard" },
  PyTorch: { text: "ML Training Inspector: a seeded synthetic CPU run, with chart values checked against epoch metrics.", href: "/projects/ml-training-inspector", label: "CPU demo" },
  Docker: { text: "OrderFlow: local application and dependencies packaged with Docker Compose.", href: "/projects/orderflow#demo", label: "Demo guide" },
  "Docker Compose": { text: "OrderFlow: reproduce the backend, frontend, PostgreSQL, Kafka, and Redis locally.", href: "/projects/orderflow#demo", label: "Demo guide" },
  Supabase: { text: "HireLens persistence. Latest offline journeys use adapters; deployed permissions remain unverified.", href: "/projects/hirelens", label: "HireLens" },
  JavaScript: { text: "HireLens: React screens and streaming behavior, with local desktop/mobile offline journeys.", href: "/projects/hirelens", label: "HireLens" },
  "TypeScript (portfolio)": { text: "This portfolio uses typed project records, React components, and Next.js pages.", href: "https://github.com/azim-haffar/azimx.dev", label: "Portfolio source" },
  "AWS (fundamentals)": { text: "Foundational knowledge. No dedicated AWS deployment case study is currently presented." },
};

export function Skills() {
  const [selected, setSelected] = useState<{ skill: string; group: string } | null>(null);
  const detail = selected ? insights[selected.skill] ?? areas[selected.group] : null;
  return <section id="skills" className="scroll-mt-24 py-12 sm:py-16">
    <Container>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div><p className="eyebrow">Skills / applied, not just listed</p><h2 className="mt-2 text-3xl font-semibold tracking-[-.04em] sm:text-4xl">Tools behind the work.</h2></div>
        <p className="max-w-xs text-sm leading-6 text-fg-subtle">Select a tool. See where it fits.</p>
      </div>
      <div className="toolkit-studio" onPointerMove={event => {
        if (event.pointerType !== "mouse") return;
        const rect = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
        event.currentTarget.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
      }}>
        <div className="toolkit-studio-bar"><span className="flex items-center gap-2"><span className="toolkit-indicator" aria-hidden="true" />ENGINEERING TOOLKIT</span><span>Backend / Applied AI</span></div>
        <dl className="toolkit-studio-list">{skillGroups.map((group,index) => {
          const Icon = icons[index];
          return <div key={group.label} className={`toolkit-studio-row ${selected?.group === group.label ? "is-active" : ""}`}>
            <dt className="toolkit-area"><span className="toolkit-area-icon"><Icon size={18} aria-hidden="true" /></span><span><span className="toolkit-area-number" aria-hidden="true">0{index+1}</span><span className="block">{group.label}</span></span></dt>
            <dd><ul className="flex flex-wrap gap-1.5">{group.skills.map(skill => <li key={skill}><button type="button" aria-pressed={selected?.skill === skill} aria-controls="toolkit-context" onClick={() => setSelected(selected?.skill === skill ? null : {skill,group:group.label})} className={`studio-tool ${selected?.skill === skill ? "is-selected" : ""}`}>
              <span className="studio-tool-icon">{logos[skill] ? <Image src={`/skills/${logos[skill]}.svg`} width={22} height={22} alt="" /> : <Braces size={17} aria-hidden="true" />}</span><span>{skill}</span>{selected?.skill === skill && <Check size={12} className="studio-selected-check" aria-hidden="true" />}
            </button></li>)}</ul></dd>
          </div>;
        })}</dl>
        <div id="toolkit-context" className="studio-insight" aria-live="polite" aria-atomic="true">
          {selected && detail ? <div key={selected.skill} className="studio-insight-enter"><div className="flex min-w-0 flex-1 flex-col gap-1"><span className="text-sm font-semibold text-accent">{selected.skill}</span><p className="text-sm leading-6 text-fg-muted">{detail.text}</p></div><div className="flex shrink-0 items-center gap-3">{detail.href && <Link href={detail.href} target={detail.href.startsWith("https") ? "_blank" : undefined} rel={detail.href.startsWith("https") ? "noopener noreferrer" : undefined} className="studio-evidence-link">{detail.label}<ArrowUpRight size={14} aria-hidden="true" /></Link>}<button type="button" onClick={() => setSelected(null)} className="studio-reset" aria-label="Clear selected tool"><RotateCcw size={15} aria-hidden="true" /></button></div></div> : <p className="text-sm leading-6 text-fg-subtle">Backend is my foundation. Explore a tool for project context and evidence.</p>}
        </div>
      </div>
    </Container>
  </section>;
}
