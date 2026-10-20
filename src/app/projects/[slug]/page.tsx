import { EngineeringStory } from "@/components/ui/EngineeringStory";
import { WorkMarker } from "@/components/ui/WorkMarker";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { projects } from "@/data/projects";
import { TrainingPlayground } from "@/components/ui/TrainingPlayground";
import { OrderFlowWalkthrough } from "@/components/ui/OrderFlowWalkthrough";

function sectionAnchor(title: string) { return title === "Demo" ? "demo" : title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }

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
  const ready = projects.filter(item => item.caseStudyReady);
  const nextProject = ready[(ready.findIndex(item => item.slug === slug) + 1) % ready.length];
  return (
    <article className="journal-case pt-32 pb-20 sm:pt-40">
      <Container className="max-w-4xl">
        <Link href="/#projects" className="inline-flex items-center gap-2 py-2 text-sm text-fg-muted"><ArrowLeft className="h-4 w-4" aria-hidden="true" />Back to projects</Link>
        <div className="case-header">
        <p className="eyebrow mt-8">{project.focus} / Engineering notes</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight sm:text-6xl">{project.title}</h1>
        <p className="mt-5 max-w-2xl text-xl leading-relaxed text-fg-muted">{project.description}</p>
        {project.liveDemo.href && <a href={project.liveDemo.href} target="_blank" rel="noopener noreferrer" className="mt-6 mr-6 inline-flex items-center gap-2 py-2 font-medium text-accent">{project.liveDemo.label} <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a>}
        {project.github.href && <a href={project.github.href} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 py-2 font-medium text-accent">{project.github.label === "Code (private)" ? "Private repository (access required)" : "Inspect the repository"} <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a>}
        <p className="case-tech-line">{project.technologies.join(" / ")}</p>
        <p id="verification" className="scroll-mt-28 mt-4 font-mono text-xs leading-relaxed text-fg-subtle">{project.verification}</p>
        </div>
        {project.evidenceHref && <a href={project.evidenceHref} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 py-2 text-sm font-medium text-blue">Published verification record <ArrowUpRight size={14} aria-hidden="true" /></a>}
        <nav aria-label="Case study contents" className="case-contents my-8 rounded-xl border border-border p-4"><p className="font-mono text-xs uppercase tracking-widest text-fg-subtle">Inside this case study</p><div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">{project.caseStudy.map((section,index)=><a key={section.title} href={`#${sectionAnchor(section.title)}`} className="inline-flex min-h-11 items-center gap-2 text-sm text-fg-muted hover:text-accent"><span className="font-mono text-xs text-blue">{String(index+1).padStart(2,"0")}</span>{section.title.startsWith("One decision") ? "Key decision" : section.title}</a>)}</div></nav>
        {project.imageSrc && <figure className="my-10"><a href={project.imageSrc} target="_blank" rel="noopener noreferrer" aria-label={`Open full-size ${project.title} screenshot`} className="block overflow-hidden rounded-xl border border-border bg-surface"><Image src={project.imageSrc} alt={project.imageAlt ?? project.title} width={project.imageWidth ?? 1440} height={project.imageHeight ?? 1000} sizes="(min-width: 1024px) 850px, 100vw" className="h-auto w-full" /></a><figcaption className="mt-3 text-sm leading-6 text-fg-muted">{project.imageCaption} <span className="text-fg-subtle">Select the image for the full-size capture.</span></figcaption></figure>}
        <EngineeringStory slug={project.slug} />
        {project.slug === "orderflow" && <OrderFlowWalkthrough />}
        {project.slug === "ml-training-inspector" && <TrainingPlayground />}
        {project.architecture && <figure className="my-10 rounded-xl border border-border bg-surface p-4 sm:p-6">
          {/* eslint-disable-next-line @next/next/no-img-element -- full vector architecture diagram */}
          <img src={project.architecture.imageSrc} alt={project.architecture.imageAlt} className="h-auto w-full" />
          <figcaption className="mt-4 text-sm leading-relaxed text-fg-muted">{project.architecture.caption}</figcaption>
        </figure>}
        <div className="mt-10 space-y-9">
          {project.caseStudy.map((section, index) => <section key={section.title} id={sectionAnchor(section.title)} className={`case-story-section scroll-mt-28 border-t border-border pt-7 ${section.title.startsWith("One decision") ? "case-decision" : ""}`}><h2 className="text-xl font-semibold tracking-tight sm:text-2xl"><WorkMarker number={index + 1} label={section.title} /></h2><p className="mt-3 text-base leading-8 text-fg-muted">{section.body}</p></section>)}
        </div>
        {nextProject && <Link href={nextProject.caseStudyHref} className="case-next"><span className="eyebrow">Keep exploring / Next case study</span><span>{nextProject.title}<ArrowUpRight size={24} aria-hidden="true" /></span></Link>}
        <Link href="/#contact" className="mt-12 inline-flex items-center gap-2 font-medium text-accent">Get in touch <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
      </Container>
    </article>
  );
}
