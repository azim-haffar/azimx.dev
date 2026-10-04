"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Braces } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { skillGroups } from "@/data/skills";

const logos: Record<string, string> = {
  "Java 21": "java", "Spring Boot": "spring", "Spring Data JPA": "spring",
  Python: "python", FastAPI: "fastapi", Docker: "docker", "Docker Compose": "docker",
  PostgreSQL: "postgresql", Redis: "redis", "Apache Kafka": "apachekafka",
  PyTorch: "pytorch", React: "react",
};
const context: Record<string, { text: string; href: string; label: string }> = {
  Backend: { text: "APIs and application logic across my internship and personal projects.", href: "/#experience", label: "Experience" },
  "Cloud & DevOps": { text: "Packaging, local dependencies, and development workflows. AWS is foundational.", href: "/#projects", label: "Projects" },
  "Data / Messaging": { text: "Persistence, asynchronous messaging, and caching across my projects.", href: "/projects/orderflow", label: "OrderFlow notes" },
  Testing: { text: "Unit and integration testing, including container-backed dependencies.", href: "/#experience", label: "Experience" },
  "Applied AI & ML tooling": { text: "LLM evaluation and response checks, alongside training visualization tooling.", href: "/#projects", label: "Projects" },
  Frontend: { text: "Project interfaces built with React and JavaScript; TypeScript in this portfolio.", href: "/#projects", label: "Projects" },
};

export function Skills() {
  const [selected, setSelected] = useState<{ skill: string; group: string } | null>(null);
  const detail = selected ? context[selected.group] : null;
  return (
    <section id="skills" className="scroll-mt-24 py-12 sm:py-16">
      <Container>
        <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Technical toolkit</h2>
          <p className="text-xs text-fg-subtle">Select a tool to explore its area of work.</p>
        </div>
        <div className="clean-toolkit interactive-toolkit rounded-xl border border-border bg-bg px-4 sm:px-6">
          <dl>
            {skillGroups.map((group) => (
              <div key={group.label} className={`clean-toolkit-row ${selected?.group === group.label ? "toolkit-row-selected" : ""}`}>
                <dt className="text-xs font-medium text-fg">{group.label}</dt>
                <dd>
                  <ul className="flex flex-wrap gap-x-2 gap-y-1">
                    {group.skills.map(skill => <li key={skill}>
                      <button type="button" aria-pressed={selected?.skill === skill} aria-controls="toolkit-context" onClick={() => setSelected(selected?.skill === skill ? null : { skill, group: group.label })} className={`toolkit-skill ${selected?.skill === skill ? "toolkit-skill-selected" : ""}`}>
                        {logos[skill] ? <Image src={`/skills/${logos[skill]}.svg`} width={16} height={16} alt="" className="toolkit-mini-logo" /> : <Braces className="h-3.5 w-3.5 shrink-0 text-fg-subtle" aria-hidden="true" />}
                        <span>{skill}</span>
                      </button>
                    </li>)}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
          <div id="toolkit-context" aria-live="polite" aria-atomic="true" className="toolkit-context border-t border-border py-3">
            {selected && detail ? <div key={selected.skill} className="toolkit-context-enter flex flex-wrap items-center gap-x-3 gap-y-1 text-xs leading-5"><span className="font-medium text-accent">{selected.skill}</span><span className="text-fg-muted">{detail.text}</span><Link href={detail.href} className="inline-flex items-center gap-1 font-medium text-blue">{detail.label}<ArrowUpRight size={12} aria-hidden="true" /></Link><button type="button" onClick={() => setSelected(null)} className="ml-auto rounded px-1 text-fg-subtle">Clear</button></div> : <p className="text-xs leading-5 text-fg-subtle">Backend first. Applied AI alongside it. Hover or select a tool.</p>}
          </div>
        </div>
      </Container>
    </section>
  );
}
