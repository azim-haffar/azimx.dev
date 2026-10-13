import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

import { experience } from "@/data/experience";
import { GraduationCap, BriefcaseBusiness, Sparkles, Workflow } from "lucide-react";

export function About() {
  return (
    <section id="about" className="scroll-mt-24 py-16 sm:py-20">
      <Container className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div>
        <SectionHeading
          eyebrow="About"
          title="About & education"
          description="I’m a Software Engineering student based in Mersin, Türkiye. My strongest experience is in backend development, with applied AI work alongside it. I’m looking for an internship where I can contribute, learn from a team, and deepen my engineering judgment."
        />
        <div className="mt-7 flex items-start gap-4 border-t border-border pt-6">
          <div className="identity-monogram shrink-0" aria-hidden="true">
            <svg viewBox="0 0 80 80" width="72" height="72" fill="none">
              <rect x="1" y="1" width="78" height="78" rx="20" fill="var(--color-bg-subtle)" stroke="var(--color-border)" />
              <path d="M12 24H24V12M56 68V56H68" stroke="var(--color-blue)" strokeWidth="2" strokeLinecap="round" />
              <path d="M17 51L27 28L37 51M21 43H33M45 28V51M63 28V51M45 39H63" stroke="var(--color-accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="65" cy="15" r="3" fill="var(--color-blue)" />
            </svg>
          </div>
          <div className="min-w-0"><p className="font-mono text-xs uppercase tracking-widest text-blue">What draws me in</p><p className="mt-3 text-sm leading-7 text-fg-muted">I enjoy tracing what happens behind an interface, especially when something fails or behaves unexpectedly. I like building tools that make those hidden processes easier to understand—from order recovery to live training feedback.</p></div>
        </div>
        </div>

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
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div><p className="eyebrow text-blue">A short journey</p><h3 className="mt-3 text-xl font-semibold tracking-tight">Learning. Building. Looking closer.</h3></div>
            <a href="#projects" className="inline-flex min-h-11 items-center text-sm font-medium text-accent underline underline-offset-4">Explore what I’m building</a>
          </div>
          <ol className="personal-journey mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" aria-label="Studies, professional experience and current work">
            <li className="journey-milestone">
              <span className="journey-marker"><GraduationCap size={20} aria-hidden="true" /></span>
              <p className="mt-4 font-mono text-xs text-blue">Foundation / ongoing</p>
              <h4 className="mt-2 text-base font-medium">Software engineering</h4>
              <p className="mt-2 text-sm leading-7 text-fg-muted">English-taught studies at OSTİM Technical University, alongside hands-on project work.</p>
              <p className="mt-3 text-xs leading-6 text-fg-subtle">Expected graduation · August 2027</p>
            </li>
            {[...experience].reverse().map((entry) => <li key={entry.organization} className="journey-milestone">
              <span className="journey-marker">{entry.organization === "Trendyol" ? <BriefcaseBusiness size={20} aria-hidden="true" /> : <Sparkles size={20} aria-hidden="true" />}</span>
              <p className="mt-4 font-mono text-xs text-blue">{entry.period}</p>
              <h4 className="mt-2 text-base font-medium">{entry.organization === "Trendyol" ? "Backend internship" : "Paid applied AI work"}</h4>
              <p className="mt-2 text-sm leading-7 text-fg-muted">{entry.organization === "Trendyol" ? "Built and demonstrated a Spring Boot service, wrote integration tests, and discussed engineering decisions with the team." : "Delivered a Python/LLM study tool, with source-grounded questions and a separate evaluation step."}</p>
              <p className="mt-3 text-xs leading-6 text-fg-subtle">{entry.organization}</p>
            </li>)}
            <li className="journey-milestone">
              <span className="journey-marker"><Workflow size={20} aria-hidden="true" /></span>
              <p className="mt-4 font-mono text-xs text-blue">Now / project focus</p>
              <h4 className="mt-2 text-base font-medium">Making behavior visible</h4>
              <p className="mt-2 text-sm leading-7 text-fg-muted">Exploring reliable event processing, useful AI feedback, and live training metrics through my projects.</p>
              <p className="mt-3 text-xs leading-6 text-fg-subtle">OrderFlow · HireLens · ML Training Inspector</p>
            </li>
          </ol>
          <div className="mt-7 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border p-4"><p className="text-sm text-fg-muted"><span className="font-medium text-fg">Play lab</span> / An original pipeline-building experiment.</p><Link href="/play-lab" className="inline-flex min-h-11 items-center text-sm font-medium text-accent underline underline-offset-4">Build, test, explore →</Link></div>
        </div>
      </Container>
    </section>
  );
}
