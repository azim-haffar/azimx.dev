import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ProfileImage } from "@/components/ui/ProfileImage";
import { resumeUrl, socialLinks } from "@/data/site";
import { GitHubIcon, LinkedInIcon } from "@/components/icons/BrandIcons";

// Draft positioning copy — grounded in docs/Career-Profile.txt (sections 11 & 12).
// Revisit wording once more project/experience content is finalized.
export function Hero() {
  const github = socialLinks.find((s) => s.label === "GitHub");
  const linkedin = socialLinks.find((s) => s.label === "LinkedIn");

  return (
    <section id="top" className="scroll-mt-28 pt-32 sm:pt-40 lg:pt-48">
      <Container className="grid gap-16 pb-20 sm:pb-24 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-12 lg:pb-32">
        <div className="animate-fade-up">
          <span className="glass-control inline-flex items-center rounded-full px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-widest text-fg-muted">
            Software Engineering Student
          </span>
          <h1 className="mt-6 text-6xl font-semibold leading-[0.98] tracking-tight text-fg sm:text-7xl lg:text-8xl">
            Azim
            <br />
            Haffar
          </h1>
          <p className="mt-8 max-w-md text-xl leading-snug text-fg-muted sm:text-2xl">
            Backend engineering in Java and Python, with growing DevOps/cloud
            capability.
          </p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-fg-subtle">
            Currently seeking paid technical internships in Europe, focused on
            DevOps/Cloud, Backend Engineering, and ML/AI.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Button href={resumeUrl ?? undefined} isPlaceholder={!resumeUrl}>
              Resume
            </Button>
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

        <div className="flex justify-center lg:justify-end">
          <ProfileImage />
        </div>
      </Container>
    </section>
  );
}
