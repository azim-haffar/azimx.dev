import { Container } from "@/components/ui/Container";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { projects } from "@/data/projects";

export function FeaturedProjects() {
  const find = (slug: string) => projects.find(project => project.slug === slug)!;
  return <section id="projects" className="r-section"><Container>
    <div className="r-section-heading"><div><p className="r-eyebrow">Selected work</p><h2>AI tools. Measured behavior.<br />Reliable systems.</h2></div><p>Three starting points into my work. Each case study explains my contribution, the evidence and its limits.</p></div>
    <div className="r-project-grid">{["ml-training-inspector", "skina", "seatledger"].map(slug => <ProjectCard key={slug} project={find(slug)} />)}</div>
    <h3 className="r-more-heading">More engineering &amp; research</h3>
    <div className="r-project-grid">{["motiontrace", "hirelens", "orderflow"].map(slug => <ProjectCard key={slug} project={find(slug)} />)}</div>
  </Container></section>;
}
