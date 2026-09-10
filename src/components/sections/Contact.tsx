import { Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { siteConfig, socialLinks } from "@/data/site";
import { GitHubIcon, LinkedInIcon } from "@/components/icons/BrandIcons";

export function Contact() {
  const github = socialLinks.find((s) => s.label === "GitHub");
  const linkedin = socialLinks.find((s) => s.label === "LinkedIn");

  return (
    <section id="contact" className="scroll-mt-24 bg-bg-subtle py-20 sm:py-24">
      <Container className="flex flex-col items-center text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-fg-subtle">
          Contact
        </p>
        <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-tight text-fg sm:text-5xl">
          Let&apos;s work together.
        </h2>
        <p className="mt-4 max-w-md text-base leading-relaxed text-fg-muted">
          Open to paid technical internships in Europe — DevOps/Cloud,
          Backend, or ML/AI.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <ContactPill
            icon={<Mail className="h-4 w-4" aria-hidden="true" />}
            label="Email"
            href={siteConfig.emailIsPlaceholder ? null : `mailto:${siteConfig.email}`}
            fallback="Coming soon"
            strong
          />
          <ContactPill
            icon={<LinkedInIcon className="h-4 w-4" aria-hidden="true" />}
            label="LinkedIn"
            href={linkedin?.href ?? null}
            fallback="Coming soon"
          />
          <ContactPill
            icon={<GitHubIcon className="h-4 w-4" aria-hidden="true" />}
            label="GitHub"
            href={github?.href ?? null}
            fallback="Coming soon"
          />
        </div>
      </Container>
    </section>
  );
}

function ContactPill({
  icon,
  label,
  href,
  fallback,
  strong = false,
}: {
  icon: React.ReactNode;
  label: string;
  href: string | null;
  fallback: string;
  strong?: boolean;
}) {
  const classes =
    "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium";

  if (!href) {
    return (
      <span
        className={`${classes} glass-control cursor-not-allowed text-fg-subtle opacity-50`}
        aria-disabled="true"
        title={`${label} coming soon`}
      >
        {icon}
        {label}
        <span className="text-fg-subtle">· {fallback}</span>
      </span>
    );
  }

  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className={strong ? `${classes} glass-control-solid` : `${classes} glass-control text-fg`}
    >
      {icon}
      {label}
    </a>
  );
}
