import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function About() {
  return (
    <section id="about" className="scroll-mt-24 py-16 sm:py-20">
      <Container className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <SectionHeading
          eyebrow="About"
          title="About & education"
          description="I’m a Software Engineering student based in Mersin, Türkiye. My strongest experience is in backend development, with applied AI work alongside it. I’m looking for an internship where I can contribute, learn from a team, and deepen my engineering judgment."
        />

        <div className="border-t border-border pt-6 lg:pt-0 lg:border-t-0 lg:pl-16 lg:border-l">
          <p className="font-mono text-xs uppercase tracking-widest text-fg-subtle">
            Education
          </p>
          <h3 className="mt-3 text-xl font-semibold tracking-tight text-fg">
            B.Sc. Software Engineering
          </h3>
          <p className="mt-1 text-sm text-fg-muted">
            OSTİM Technical University, Türkiye — English-taught program
          </p>
          <p className="mt-5 text-sm text-fg-muted">
            Expected graduation:{" "}
            <span className="font-medium text-fg">August 2027</span>
          </p>
          <p className="mt-3 text-sm text-fg-muted">
            Languages: English C1 · German B1 (Goethe-certified) · Turkish
            Native · Arabic Native
          </p>
        </div>
      </Container>
    </section>
  );
}
