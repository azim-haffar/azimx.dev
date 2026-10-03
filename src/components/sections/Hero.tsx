import { ArrowDown, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { resumeUrl } from "@/data/site";
import { MotionBackground } from "@/components/ui/MotionBackground";

export function Hero() {
  return (
    <section id="top" className="hero-section relative isolate scroll-mt-28 overflow-hidden pt-32 sm:pt-40">
      <MotionBackground />
      <Container className="relative pb-16 sm:pb-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
          <div className="animate-fade-up">
            <p className="eyebrow">Azim Haffar / Software Engineering Student</p>
            <h1 className="mt-6 text-5xl font-semibold leading-[1.06] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
              Backend thinking.<br /><span className="text-accent">Practical software.</span>
            </h1>
            <p className="mt-7 max-w-lg text-lg leading-relaxed text-fg-muted sm:text-xl">
              I build with Java and Python, from event-driven backends to applied AI tools. My experience includes a backend internship at Trendyol and paid Python/LLM development for Kvote.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="#projects">Explore my work <ArrowDown className="h-4 w-4" aria-hidden="true" /></Button>
              {resumeUrl && <Button href={resumeUrl} variant="secondary">View résumé <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Button>}
            </div>
            <p className="mt-6 max-w-lg text-sm leading-relaxed text-fg-subtle">Full-time internships from 17 January 2027 · 4–12 months · Open to relocation</p>
          </div>
          <div className="system-panel animate-fade-up rounded-2xl border border-border p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4 border-b border-border pb-5">
              <span className="eyebrow">Inside OrderFlow</span>
              <span className="font-mono text-xs text-blue">01 / Selected work</span>
            </div>
            <p className="mt-6 text-xl font-medium tracking-tight">From request to order event.</p>
            <p className="mt-2 text-sm leading-relaxed text-fg-muted">A closer look at the backend decisions behind an order-processing demonstration.</p>
            <ol className="mt-7 space-y-4">
              {[
                ["01", "Accept the request", "Spring Boot · REST API"],
                ["02", "Persist order + event together", "PostgreSQL · Transactional outbox"],
                ["03", "Publish, then process inventory", "Kafka · Database row locking"],
              ].map(([number, title, detail]) => (
                <li key={number} className="flex items-start gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border font-mono text-xs text-blue">{number}</span>
                  <div><p className="text-sm font-medium">{title}</p><p className="mt-1 text-xs text-fg-subtle">{detail}</p></div>
                </li>
              ))}
            </ol>
            <Link href="/projects/orderflow" className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-accent">Read the engineering notes <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
          </div>
        </div>
        <div className="mt-14 grid gap-5 border-t border-border pt-6 font-mono text-xs text-fg-subtle sm:grid-cols-3">
          <p><span className="text-fg">Backend</span> / Java · Spring Boot · Python</p>
          <p><span className="text-fg">Engineering</span> / APIs · Events · Integration tests</p>
          <p><span className="text-fg">Applied AI</span> / LLM workflows · Validation</p>
        </div>
      </Container>
    </section>
  );
}
