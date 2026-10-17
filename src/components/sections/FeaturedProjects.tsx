import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { projects } from "@/data/projects";
export function FeaturedProjects(){return <section id="projects" className="journal-section"><Container><SectionHeading eyebrow="01 / Selected work" title="Built to be understood." description="Three engineering stories. The problem, the decisions, the evidence—and the parts still being worked on." /><div className="project-gallery">{projects.filter(project=>project.featured).map((project,index)=><ProjectCard key={project.slug} project={project} index={index} />)}</div></Container></section>}
