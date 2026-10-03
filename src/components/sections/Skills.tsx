import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { skillGroups } from "@/data/skills";

// Category highlights follow the portfolio's emerald and blue palette.
const groupAccent: Record<string, string> = {
  Backend: "var(--color-accent)",
  "Cloud & DevOps": "var(--color-blue)",
  "Data / Messaging": "var(--color-blue)",
  Testing: "var(--color-accent)",
  "Applied AI & ML tooling": "var(--color-accent)",
  Frontend: "var(--color-blue)",
};

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 bg-bg-subtle py-16 sm:py-20">
      <Container>
        <SectionHeading eyebrow="Skills" title="Technical skills" />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => {
            const accent = groupAccent[group.label] ?? "var(--color-accent)";
            return (
              <div
                key={group.label}
                className="glass-card rounded-[20px] p-5"
                style={{ borderTop: `2px solid ${accent}` }}
              >
                <h3 className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-fg-subtle">
                  <span
                    className="h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: accent }}
                    aria-hidden="true"
                  />
                  {group.label}
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <Badge key={skill}>{skill}</Badge>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
