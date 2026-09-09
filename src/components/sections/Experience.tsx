import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { experience } from "@/data/experience";

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-24 py-20 sm:py-24">
      <Container>
        <SectionHeading eyebrow="Experience" title="Professional experience" />

        <div className="mt-12 flex flex-col divide-y divide-border">
          {experience.map((entry) => (
            <div
              key={entry.organization}
              className="flex flex-col gap-3 py-8 first:pt-0 sm:flex-row sm:items-start sm:justify-between sm:gap-8"
            >
              <div className="sm:flex-1">
                <h3 className="text-xl font-semibold tracking-tight text-fg">
                  {entry.role}
                </h3>
                <p className="mt-1 text-sm text-fg-muted">
                  {entry.organization} · {entry.employmentType}
                </p>
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
              <p className="shrink-0 font-mono text-xs text-fg-subtle sm:pt-1">
                {entry.period}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
