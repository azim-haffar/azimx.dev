import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { experience } from "@/data/experience";

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-24 bg-bg-subtle py-16 sm:py-20">
      <Container>
        <SectionHeading eyebrow="Experience" title="Professional experience" />

        <div className="mt-10 flex flex-col gap-6">
          {experience.map((entry) => (
            <div
              key={entry.organization}
              className="rounded-2xl border border-border border-l-2 border-l-accent bg-bg p-6 sm:p-8"
            >
              <h3 className="text-xl font-semibold tracking-tight text-fg">
                {entry.role}
              </h3>
              <p className="mt-1 text-sm text-fg-muted">
                {entry.organization} · {entry.location ?? entry.employmentType}
              </p>
              <p className="mt-1 font-mono text-xs text-fg-subtle">{entry.period}</p>

              <ul className="mt-5 flex flex-col gap-2">
                {entry.summary.map((line) => (
                  <li key={line} className="text-sm leading-relaxed text-fg-muted">
                    {line}
                  </li>
                ))}
              </ul>
              {entry.technologies.length > 0 ? (
                <div className="mt-5 flex flex-wrap gap-2">
                  {entry.technologies.map((tech) => (
                    <Badge key={tech}>{tech}</Badge>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
