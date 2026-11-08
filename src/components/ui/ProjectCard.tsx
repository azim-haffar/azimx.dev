import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import type { Project } from "@/types/portfolio";

const summaries: Record<string, string> = {
  orderflow: "Accept work during a Kafka outage, recover pending orders, and inspect stock-safe replay.",
  hirelens: "A synthetic offline journey from CV upload and feedback to tracking, history, and deletion.",
  "ml-training-inspector": "Live training feedback, checked against a reproducible synthetic PyTorch CPU run.",
};
export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return <article className="project-card journal-project compact-project">
    <Link href={project.caseStudyHref} className="project-media" aria-label={`Read the ${project.title} case study`}>
      {project.imageSrc ? <Image src={project.imageSrc} alt={project.imageAlt ?? `${project.title} interface`} fill sizes="(min-width: 1200px) 320px, (min-width: 700px) 30vw, 88px" className={project.imageFit === "cover" ? "object-cover" : "object-contain"} style={{ objectPosition: project.imagePosition ?? "center" }} /> : <span className="project-text-preview"><span>{project.focus}</span><strong>{project.title}</strong><small>Engineering case study ↗</small></span>}
    </Link>
    <div className="compact-project-body">
      <p className="project-chapter"><span className="project-number">{String(index + 1).padStart(2, "0")}</span>{project.focus}</p>
      <h3><Link href={project.caseStudyHref}>{project.title}<ArrowUpRight size={17} aria-hidden="true" /></Link></h3>
      <p className="project-summary">{summaries[project.slug] ?? project.description}</p>
      <p className="project-stack">{project.technologies.slice(0, 4).join(" · ")}</p>
    </div>
    <details className="project-evidence"><summary>Evidence & scope</summary><ul>{project.capabilities?.map(item => <li key={item}>{item}</li>)}</ul><p>{project.limitations}</p></details>
    <div className="project-actions"><Link href={project.caseStudyHref} className="project-primary-link">Case study<ArrowRight size={15} aria-hidden="true" /></Link>{project.github.href && <a href={project.github.href} target="_blank" rel="noopener noreferrer">{project.github.label}<ArrowUpRight size={14} aria-hidden="true" /></a>}
    {project.slug === "orderflow" && <Link href="/projects/orderflow#recovery-lab">Try recovery<ArrowRight size={14} aria-hidden="true" /></Link>}
    {project.slug === "ml-training-inspector" && <Link href="/projects/ml-training-inspector#training-playground">Explore run<ArrowRight size={14} aria-hidden="true" /></Link>}</div>
  </article>;
}
