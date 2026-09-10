import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function About() {
  return (
    <section id="about" className="scroll-mt-24 py-16 sm:py-20">
      <Container className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <SectionHeading
          eyebrow="About"
          title="About & education"
          description="Software Engineering student based in Mersin, Türkiye, focused on backend development and building toward DevOps/cloud and ML/AI. Open to relocating for a paid European internship."
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
            <span className="font-medium text-fg">February 2028</span>
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
