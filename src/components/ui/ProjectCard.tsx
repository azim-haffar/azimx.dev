import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { GitHubIcon } from "@/components/icons/BrandIcons";
import type { Project } from "@/types/portfolio";

export function ProjectCard({project,index}:{project:Project;index:number}) {
  const isLead=index===0;
  return <article className={`project-card journal-project ${isLead?"journal-project-lead":""}`}>
    <div className="project-chapter"><span className="project-number">0{index+1}</span><span>{project.focus}</span><ArrowUpRight size={16} aria-hidden="true" /></div>
    <Link href={project.caseStudyHref} className="project-media" aria-label={`Read the ${project.title} case study`}>{project.imageSrc && <Image src={project.imageSrc} alt={project.imageAlt ?? `${project.title} interface`} fill sizes={isLead ? "(min-width: 1200px) 900px, 90vw" : "(min-width: 1200px) 420px, (min-width: 700px) 44vw, 90vw"} className={project.imageFit==="cover"?"object-cover":"object-contain"} style={{objectPosition:project.imagePosition??"center"}} />}<span className="project-media-open" aria-hidden="true">Explore project <ArrowUpRight size={15} /></span></Link>
    <p className="project-image-note">{project.slug==="seatledger"?"Deployed portfolio demo · synthetic data":project.slug==="hirelens"?"Offline fixture · synthetic CV":project.slug==="ml-training-inspector"?"Measured synthetic CPU demo":"Local order-processing dashboard"}</p>
    <div className="project-story"><div><h3><Link href={project.caseStudyHref}>{project.title}</Link></h3><p className="project-summary">{project.description}</p></div><ul className="project-proof">{project.capabilities?.map(item=><li key={item}><span aria-hidden="true">↗</span>{item}</li>)}</ul></div>
    {project.limitations && <p className="project-limits"><span>Scope & limits</span>{project.limitations}</p>}
    <p className="project-stack">{project.technologies.join(" / ")}</p>
    <div className="project-actions">{project.liveDemo.href && <a href={project.liveDemo.href} target="_blank" rel="noopener noreferrer">{project.liveDemo.label}<ArrowUpRight size={14} aria-hidden="true" /></a>}{project.caseStudyReady && <Link href={project.caseStudyHref} className="project-primary-link">Case study<ArrowRight size={15} aria-hidden="true" /></Link>}{project.demoGuideHref && <Link href={project.demoGuideHref}>Demo guide<ArrowUpRight size={14} aria-hidden="true" /></Link>}{project.github.href && <a href={project.github.href} target="_blank" rel="noopener noreferrer"><GitHubIcon className="h-4 w-4" />{project.github.label}</a>}</div>
    {project.slug==="orderflow" && <Link href="/projects/orderflow#recovery-lab" className="project-explore-link">Try outage & recovery<ArrowRight size={14} aria-hidden="true" /></Link>}{project.slug==="ml-training-inspector" && <Link href="/projects/ml-training-inspector#training-playground" className="project-explore-link">Explore the training run<ArrowRight size={14} aria-hidden="true" /></Link>}
  </article>;
}
