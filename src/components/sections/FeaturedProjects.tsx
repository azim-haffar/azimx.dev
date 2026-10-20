import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { FlagshipProject } from "@/components/ui/FlagshipProject";
import { projects } from "@/data/projects";

export function FeaturedProjects() {
  const featured = projects.filter(project => project.featured);
  const flagship = featured.find(project => project.slug === "seatledger");
  const supporting = featured.filter(project => project !== flagship);
  return <section id="projects" className="journal-section"><Container>
    <SectionHeading eyebrow="01 / Selected work" title="The interface is only the beginning." description="Explore the product, follow a decision, then inspect the evidence." />
    {flagship && <FlagshipProject project={flagship} />}
    <div className="supporting-work-heading"><h3>More ways I investigate software.</h3><p>Recovery, useful feedback, and a view inside training.</p></div>
    <div className="project-gallery supporting-projects">{supporting.map((project,index) => <ProjectCard key={project.slug} project={project} index={index + 1} />)}</div>
  </Container></section>;
}
