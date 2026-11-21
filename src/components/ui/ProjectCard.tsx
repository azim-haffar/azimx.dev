import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import type { Project } from "@/types/portfolio";

const presentation: Record<string, { line: string; scope: string }> = {
  skina: { line: "Built deterministic basket selection and a gated explanation boundary; verified with fictional fixtures and a frozen evaluation that preserves misses.", scope: "Local fictional retailer prototype · Mocked shopper explanations" },
  "ml-training-inspector": { line: "Connected PyTorch training to a live dashboard; checked a seeded CPU run against its charts and checkpoint metrics.", scope: "Local synthetic CPU demo · 15 backend + 2 frontend tests" },
  seatledger: { line: "Built reservation lifecycle, recovery and analytics; recorded verification covers 265 backend, 56 analytics and 28 browser tests.", scope: "Hosted synthetic demo · Cold starts · Booking may be closed" },
  motiontrace: { line: "Compared classical and learned MRI target tracking; retained the finding that causal ZNCC outperformed the learned candidate.", scope: "Research workbench · Text only · No clinical validation" },
  hirelens: { line: "Built a CV analysis workflow separating deterministic scores from generated advice; verified synthetic journeys and Linux CI.", scope: "Offline demo · Final local revision unpublished" },
  orderflow: { line: "Built an outbox-based order workflow; verified Kafka recovery and stock-safe replay with 17 backend tests.", scope: "Local recovery demo · Final revision unpublished" },
};

export function ProjectCard({ project }: { project: Project; index?: number }) {
  const content = presentation[project.slug];
  return <article className="r-project">
    <div className="r-project-media">{project.imageSrc ? <Image src={project.imageSrc} alt={project.imageAlt ?? project.title} fill sizes="(min-width: 1100px) 340px, (min-width: 700px) 44vw, 90vw" className="object-cover object-top" /> : <div className="r-research-preview" aria-label="Text-only research presentation"><span>Classical ↔ Learned</span><strong>Compare.<br />Measure.<br />Keep the finding.</strong><span>No research imagery published</span></div>}</div>
    <div className="r-project-content"><p className="r-eyebrow">{project.focus?.split(" / ")[0]}</p><h3>{project.title}</h3><p>{content?.line ?? project.description}</p><p className="r-project-scope">{content?.scope ?? project.statusNote}</p>
      <div className="r-project-actions"><Link href={project.caseStudyHref} className="r-case-link">Case study<ArrowRight size={15} aria-hidden="true" /></Link>
      {project.github.href && <a href={project.github.href} target="_blank" rel="noopener noreferrer">Code<ArrowUpRight size={14} aria-hidden="true" /></a>}
      {project.liveDemo.href && <a href={project.liveDemo.href} target="_blank" rel="noopener noreferrer">Demo<ArrowUpRight size={14} aria-hidden="true" /></a>}</div>
    </div>
  </article>;
}
