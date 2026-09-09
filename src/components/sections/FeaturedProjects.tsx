import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { projects } from "@/data/projects";

export function FeaturedProjects() {
  const featured = projects.filter((p) => p.featured);

  return (
    <section
      id="projects"
      className="scroll-mt-24 bg-bg-subtle py-24 sm:py-32"
    >
      <Container>
        <SectionHeading
          eyebrow="Work"
          title="Featured projects"
          description="Projects I've built and can speak to in depth — architecture, trade-offs, and what I'd do differently."
        />

        <div className="mt-16 flex flex-col gap-24 sm:mt-20 sm:gap-32">
          {featured.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}
