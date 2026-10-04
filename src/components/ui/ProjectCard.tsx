import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { GitHubIcon } from "@/components/icons/BrandIcons";
import type { Project } from "@/types/portfolio";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className={`project-card grid gap-7 rounded-2xl border border-border p-5 md:grid-cols-[0.85fr_1.15fr] md:gap-10 sm:p-8 ${index === 0 ? "project-featured" : ""}`}>
      <div>
        {project.imageSrc ? (
          <div className="relative aspect-16/9 overflow-hidden rounded-xl border border-border bg-surface">
            <Image src={project.imageSrc} alt={project.imageAlt ?? `${project.title} interface`} fill sizes="(min-width: 768px) 40vw, 100vw" className="object-contain" />
          </div>
        ) : (
          <div className="metric-visual flex aspect-16/9 flex-col justify-center rounded-xl border border-border px-8" role="img" aria-label="Illustrative training curves, not measured results">
            <p className="font-mono text-xs text-blue">TRAIN / OBSERVE / INSPECT</p>
            <svg viewBox="0 0 320 90" className="mt-5 w-full" fill="none"><path d="M0 5 L25 25 L45 18 L65 44 L90 37 L115 59 L140 52 L170 69 L200 66 L230 78 L260 74 L290 80 L320 79" stroke="var(--color-accent)" strokeWidth="3" /><path d="M0 15 L30 35 L60 29 L90 50 L120 43 L150 60 L180 51 L210 63 L240 56 L270 64 L320 60" stroke="var(--color-blue)" strokeWidth="2" strokeDasharray="5 5" /></svg>
            <p className="mt-4 font-mono text-[10px] text-fg-subtle">Illustrative curves · not measured results</p>
          </div>
        )}
      </div>
      <div>
        <p className="eyebrow">{String(index + 1).padStart(2, "0")} / {project.focus}</p>
        <h3 className="mt-3 text-3xl font-semibold tracking-tight">{project.title}</h3>
        <p className="mt-3 text-base leading-relaxed text-fg-muted">{project.description}</p>
        <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-fg-muted">
          {project.capabilities?.map((item) => <li key={item} className="flex items-center gap-2"><span className="h-1 w-1 rounded-full bg-accent" aria-hidden="true" />{item}</li>)}
        </ul>
        {project.limitations && <p className="mt-4 text-xs leading-relaxed text-fg-subtle"><span className="font-medium text-fg-muted">Current limits:</span> {project.limitations}</p>}
        <p className="mt-4 font-mono text-xs leading-relaxed text-blue">{project.technologies.join(" / ")}</p>
        <div className="mt-6 flex flex-wrap items-center gap-5">
          {project.github.href && <a href={project.github.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 py-2 text-sm font-medium"><GitHubIcon className="h-4 w-4" aria-hidden="true" />View code <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a>}
          {project.caseStudyReady && <Link href={project.caseStudyHref} className="inline-flex items-center gap-2 py-2 text-sm font-medium text-accent">Engineering notes <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>}
          {project.liveDemo.href && <a href={project.liveDemo.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 py-2 text-sm font-medium text-accent">Live demo <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a>}
        </div>
      </div>
    </article>
  );
}
