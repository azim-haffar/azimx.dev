import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { projects } from "@/data/projects";

const featuredSlugs = ["ml-training-inspector", "skina", "seatledger"];

export function FeaturedProjects() {
  const find = (slug: string) => projects.find(project => project.slug === slug)!;
  return <section id="projects" className="r-section"><Container>
    <div className="r-section-heading"><div><p className="r-eyebrow">Selected work</p><h2>AI tools. Measured behavior.<br />Reliable systems.</h2></div><p>Three starting points into my work. Each case study explains my contribution, the evidence and its limits.</p></div>
    <div className="r-project-grid">{featuredSlugs.map(slug => <ProjectCard key={slug} project={find(slug)} />)}</div>
    <details className="r-more-heading"><summary className="min-h-11 cursor-pointer">All projects</summary>
      <ul className="r-project-index">
        {projects.filter(project => !featuredSlugs.includes(project.slug)).map(project => (
          <li key={project.slug}>
            <Link href={project.caseStudyHref}>Read the {project.title} case study <ArrowRight size={16} aria-hidden="true" /></Link>
          </li>
        ))}
      </ul>
    </details>
  </Container></section>;
}
