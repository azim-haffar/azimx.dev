import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.filter((project) => project.caseStudyReady).map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return { title: project.title };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project || !project.caseStudyReady) notFound();

  return (
    <section className="pt-28 pb-16 sm:pt-32 sm:pb-20">
      <Container className="max-w-3xl">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to projects
        </Link>

        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
          {project.title}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-fg-muted">
          {project.description}
        </p>

        {project.technologies.length > 0 ? (
          <div className="mt-6 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
          </div>
        ) : null}

        <div className="mt-10 rounded-2xl border border-dashed border-border-strong bg-bg-subtle p-6 text-sm text-fg-subtle">
          Full case study coming soon — architecture diagrams, technical
          decisions, and challenges will be documented here.
        </div>
      </Container>
    </section>
  );
}
