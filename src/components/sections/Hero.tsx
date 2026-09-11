import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { resumeUrl, socialLinks } from "@/data/site";
import { GitHubIcon, LinkedInIcon } from "@/components/icons/BrandIcons";

// Positioning copy — grounded in docs/Career-Profile.txt (sections 11 & 12).
export function Hero() {
  const github = socialLinks.find((s) => s.label === "GitHub");
  const linkedin = socialLinks.find((s) => s.label === "LinkedIn");

  return (
    <section id="top" className="ambient-glow scroll-mt-28 pt-24 sm:pt-32 lg:pt-40">
      <Container className="pb-16 sm:pb-20 lg:pb-24">
        <div className="animate-fade-up">
          <span className="glass-control inline-flex items-center rounded-full px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-widest text-fg-muted">
            Software Engineering Student
          </span>
          <h1 className="mt-6 text-6xl font-semibold leading-[0.98] tracking-tight text-fg sm:text-7xl lg:text-8xl">
            Azim
            <br />
            <span className="bg-gradient-to-br from-fg via-fg to-accent bg-clip-text text-transparent">
              Haffar
            </span>
          </h1>
          <p className="mt-6 max-w-md text-xl leading-snug text-fg-muted sm:text-2xl">
            Backend-focused Software Engineering student building with Java,
            Spring Boot, Python, and FastAPI, with hands-on Docker and CI/CD.
          </p>

          <p className="mt-4 inline-flex flex-wrap items-center gap-2 text-sm text-fg-subtle">
            <span
              className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
              aria-hidden="true"
            />
            Available from October 2026 · 3–12 months · Europe · Open to
            relocation
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {resumeUrl ? <Button href={resumeUrl}>Resume</Button> : null}
            <Button
              href={github?.href ?? undefined}
              isPlaceholder={!github?.href}
              variant="secondary"
            >
              <GitHubIcon className="h-4 w-4" aria-hidden="true" />
              GitHub
            </Button>
            <Button
              href={linkedin?.href ?? undefined}
              isPlaceholder={!linkedin?.href}
              variant="secondary"
            >
              <LinkedInIcon className="h-4 w-4" aria-hidden="true" />
              LinkedIn
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
