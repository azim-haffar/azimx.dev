import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

import { experience } from "@/data/experience";

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
        <div className="lg:col-span-2 border-t border-border pt-8">
          <p className="eyebrow text-blue">Learning through building</p>
          <h3 className="mt-3 text-xl font-semibold tracking-tight">From backend services to applied AI.</h3>
          <ol className="mt-6 grid gap-6 sm:grid-cols-3">
            {[...experience].reverse().map((entry, index) => <li key={entry.organization} className="border-l-2 border-accent/40 pl-4"><p className="font-mono text-xs text-blue">0{index + 1} / {entry.period}</p><p className="mt-2 font-medium">{entry.organization}</p><p className="mt-2 text-sm leading-7 text-fg-muted">{entry.organization === "Trendyol" ? "Backend services, integration tests, and engineering decisions discussed with a team." : "Paid Python/LLM development, with source-grounded question generation and response checks."}</p></li>)}
            <li className="border-l-2 border-accent/40 pl-4"><p className="font-mono text-xs text-blue">03 / Current project work</p><p className="mt-2 font-medium">Making behavior visible</p><p className="mt-2 text-sm leading-7 text-fg-muted">Order recovery, CV feedback, and live training metrics—three projects with explicit verification and limits.</p><a href="#projects" className="mt-3 inline-flex min-h-11 items-center text-sm font-medium text-accent underline underline-offset-4">Explore the projects</a></li>
          </ol>
        </div>
      </Container>
    </section>
  );
}
