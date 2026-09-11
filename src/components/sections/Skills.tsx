import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { skillGroups } from "@/data/skills";

// Purely visual — gives each skill category a distinct, low-key identity
// color so the grid reads as varied rather than one flat block. Doesn't
// affect content; falls back to the default accent for any unlisted group.
const groupAccent: Record<string, string> = {
  Backend: "var(--color-accent)",
  "Cloud & DevOps": "var(--color-accent-amber)",
  "Data / Messaging": "var(--color-accent-blue)",
  Testing: "var(--color-accent-violet)",
  "AI / ML": "var(--color-accent-cyan)",
  Frontend: "var(--color-accent-rose)",
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
