import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { skillGroups } from "@/data/skills";

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 bg-bg-subtle py-16 sm:py-20">
      <Container>
        <SectionHeading eyebrow="Skills" title="Technical skills" />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <div key={group.label} className="glass-card rounded-[20px] p-5">
              <h3 className="font-mono text-xs uppercase tracking-widest text-fg-subtle">
                {group.label}
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <Badge key={skill}>{skill}</Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
