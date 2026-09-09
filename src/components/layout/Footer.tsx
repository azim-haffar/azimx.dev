import { siteConfig, socialLinks } from "@/data/site";
import { GitHubIcon, LinkedInIcon } from "@/components/icons/BrandIcons";

const socialIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  GitHub: GitHubIcon,
  LinkedIn: LinkedInIcon,
};

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-4 px-6 sm:flex-row sm:justify-between sm:px-8 lg:px-10">
        <p className="font-mono text-xs text-fg-subtle">
          © {year} {siteConfig.name}
        </p>

        <div className="flex items-center gap-2">
          {socialLinks.map((social) => {
            const Icon = socialIcons[social.label];
            if (!social.href) {
              return (
                <span
                  key={social.label}
                  className="inline-flex h-8 w-8 cursor-not-allowed items-center justify-center rounded-full text-fg-subtle opacity-40"
                  aria-disabled="true"
                  title={`${social.label} link coming soon`}
                >
                  {Icon ? <Icon className="h-3.5 w-3.5" /> : social.label}
                </span>
              );
            }
            return (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full text-fg-muted transition-colors duration-150 hover:bg-surface hover:text-fg"
              >
                {Icon ? <Icon className="h-3.5 w-3.5" /> : social.label}
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
