import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { projects } from "@/data/projects";
import { OrderFlowWalkthrough } from "@/components/ui/OrderFlowWalkthrough";

export function generateStaticParams() {
  return projects.filter(p => p.caseStudyReady).map(p => ({ slug: p.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find(p => p.slug === slug && p.caseStudyReady);
  return project ? { title: `${project.title} — Engineering notes`, description: project.description, alternates: { canonical: project.caseStudyHref } } : {};
}
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find(p => p.slug === slug);
  if (!project?.caseStudyReady || !project.caseStudy) notFound();
  return (
    <article className="pt-32 pb-20 sm:pt-40">
      <Container className="max-w-4xl">
        <Link href="/#projects" className="inline-flex items-center gap-2 py-2 text-sm text-fg-muted"><ArrowLeft className="h-4 w-4" aria-hidden="true" />Back to projects</Link>
        <div className="case-header">
        <p className="eyebrow mt-8">{project.focus} / Engineering notes</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight sm:text-6xl">{project.title}</h1>
        <p className="mt-5 max-w-2xl text-xl leading-relaxed text-fg-muted">{project.description}</p>
        {project.github.href && <a href={project.github.href} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 py-2 font-medium text-accent">Inspect the repository <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a>}
        <p className="mt-4 font-mono text-xs leading-relaxed text-fg-subtle">{project.verification}</p>
        </div>
        {project.evidenceHref && <a href={project.evidenceHref} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 py-2 text-sm font-medium text-blue">Published verification record <ArrowUpRight size={14} aria-hidden="true" /></a>}
        {project.imageSrc && <figure className="my-10"><a href={project.imageSrc} target="_blank" rel="noopener noreferrer" aria-label={`Open full-size ${project.title} screenshot`} className="block overflow-hidden rounded-xl border border-border bg-surface"><Image src={project.imageSrc} alt={project.imageAlt ?? project.title} width={project.imageWidth ?? 1440} height={project.imageHeight ?? 1000} sizes="(min-width: 1024px) 850px, 100vw" className="h-auto w-full" /></a><figcaption className="mt-3 text-sm leading-6 text-fg-muted">{project.imageCaption} <span className="text-fg-subtle">Select the image for the full-size capture.</span></figcaption></figure>}
        {project.slug === "orderflow" && <OrderFlowWalkthrough />}
        {project.architecture && <figure className="my-10 rounded-xl border border-border bg-surface p-4 sm:p-6">
          {/* eslint-disable-next-line @next/next/no-img-element -- full vector architecture diagram */}
          <img src={project.architecture.imageSrc} alt={project.architecture.imageAlt} className="h-auto w-full" />
          <figcaption className="mt-4 text-sm leading-relaxed text-fg-muted">{project.architecture.caption}</figcaption>
        </figure>}
        <div className="mt-10 space-y-9">
          {project.caseStudy.map(section => <section key={section.title} id={section.title === "Demo" ? "demo" : undefined} className="scroll-mt-28 border-t border-border pt-7"><h2 className="text-2xl font-semibold tracking-tight">{section.title}</h2><p className="mt-3 text-base leading-8 text-fg-muted">{section.body}</p></section>)}
        </div>
        <Link href="/#contact" className="mt-12 inline-flex items-center gap-2 font-medium text-accent">Get in touch <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
      </Container>
    </article>
  );
}
