import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, ImageOff } from "lucide-react";
import type { Project } from "@/types/portfolio";
import { Badge } from "./Badge";
import { GitHubIcon } from "@/components/icons/BrandIcons";

const statusLabel: Record<Project["status"], string> = {
  completed: "Completed",
  "in-progress": "In Progress",
  placeholder: "Details Pending",
};

function StatusChip({ status }: { status: Project["status"] }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 font-mono text-[11px] text-fg-subtle">
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          status === "completed" ? "bg-fg" : "bg-fg-subtle"
        }`}
        aria-hidden="true"
      />
      {statusLabel[status]}
    </span>
  );
}

function ProjectPill({
  href,
  icon,
  label,
}: {
  href: string | null;
  icon: React.ReactNode;
  label: string;
}) {
  const classes =
    "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium";

  if (!href) {
    return (
      <span
        className={`${classes} glass-control cursor-not-allowed text-fg-subtle opacity-50`}
        aria-disabled="true"
        title={`${label} coming soon`}
      >
        {icon}
        {label}
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${classes} glass-control text-fg`}
      aria-label={`${label}: ${href}`}
    >
      {icon}
      {label}
    </a>
  );
}

function MediaPlaceholder({ wide }: { wide?: boolean }) {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-4xl bg-surface ${
        wide ? "aspect-21/9" : "aspect-4/3"
      }`}
    >
      <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-fg-subtle">
        <ImageOff className="h-8 w-8" strokeWidth={1.1} aria-hidden="true" />
        <span className="font-mono text-[11px] uppercase tracking-widest">
          Screenshot pending
        </span>
      </div>
    </div>
  );
}

function Media({ project, wide }: { project: Project; wide?: boolean }) {
  if (!project.imageSrc) return <MediaPlaceholder wide={wide} />;
  return (
    <div
      className={`relative w-full overflow-hidden rounded-4xl bg-surface ${
        wide ? "aspect-21/9" : "aspect-4/3"
      }`}
    >
      <Image
        src={project.imageSrc}
        alt={project.imageAlt ?? `${project.title} screenshot`}
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover"
      />
    </div>
  );
}

function ActionsRow({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <ProjectPill
        href={project.github.href}
        icon={<GitHubIcon className="h-4 w-4" aria-hidden="true" />}
        label="Code"
      />
      <ProjectPill
        href={project.liveDemo.href}
        icon={<ArrowUpRight className="h-4 w-4" aria-hidden="true" />}
        label="Demo"
      />
      <Link
        href={project.caseStudyHref}
        className="glass-control-solid ml-auto inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium sm:ml-0"
      >
        Case study
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </div>
  );
}

const numeral = (n: number) => String(n + 1).padStart(2, "0");

/**
 * Editorial project showcase. index 0 gets the largest "hero" treatment,
 * placeholder-status projects collapse to a quiet single block, and the
 * remaining projects alternate a media/text split.
 */
export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const isPlaceholder = project.status === "placeholder";
  const isHero = index === 0 && !isPlaceholder;
  const reverse = index % 2 === 1;

  if (isPlaceholder) {
    return (
      <article className="rounded-4xl border border-border bg-bg-subtle px-8 py-14 text-center sm:px-16">
        <p className="font-mono text-xs text-fg-subtle">{numeral(index)}</p>
        <div className="mt-4 flex items-center justify-center gap-3">
          <h3 className="text-2xl font-semibold text-fg">{project.title}</h3>
          <StatusChip status={project.status} />
        </div>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-fg-muted">
          {project.description}
        </p>
        <Link
          href={project.caseStudyHref}
          className="glass-control mt-8 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-fg"
        >
          Case study
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </article>
    );
  }

  if (isHero) {
    return (
      <article className="flex flex-col gap-8">
        <Media project={project} wide />
        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          <div>
            <div className="flex items-center gap-3">
              <p className="font-mono text-xs text-fg-subtle">{numeral(index)}</p>
              <StatusChip status={project.status} />
            </div>
            <h3 className="mt-3 text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
              {project.title}
            </h3>
            <p className="mt-4 max-w-md text-base leading-relaxed text-fg-muted">
              {project.description}
            </p>
            {project.statusNote ? (
              <p className="mt-3 font-mono text-xs text-fg-subtle">
                {project.statusNote}
              </p>
            ) : null}
          </div>
          <div className="flex flex-col justify-between gap-6">
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <Badge key={tech}>{tech}</Badge>
              ))}
            </div>
            <ActionsRow project={project} />
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-14">
      <div className={reverse ? "lg:order-2" : ""}>
        <Media project={project} />
      </div>
      <div className={reverse ? "lg:order-1" : ""}>
        <div className="flex items-center gap-3">
          <p className="font-mono text-xs text-fg-subtle">{numeral(index)}</p>
          <StatusChip status={project.status} />
        </div>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
          {project.title}
        </h3>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-fg-muted">
          {project.description}
        </p>
        {project.statusNote ? (
          <p className="mt-3 font-mono text-xs text-fg-subtle">{project.statusNote}</p>
        ) : null}
        <div className="mt-5 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>
        <div className="mt-6">
          <ActionsRow project={project} />
        </div>
      </div>
    </article>
  );
}
