import type { NavLink, SocialLink } from "@/types/portfolio";

/**
 * Central site configuration. Anything marked PLACEHOLDER should be
 * replaced with confirmed, factual information before launch.
 */
export const siteConfig = {
  name: "Azim Haffar",
  domain: "azimx.dev",
  url: "https://azimx.dev",
  title: "Azim Haffar — Applied AI & ML Portfolio",
  description:
    "Software Engineering student focused on applied AI and ML engineering: paid Python/LLM development, evaluation workflows and ML tooling. Seeking internships from 17 January 2027.",
  email: "azim.haffar@gmail.com",
  emailIsPlaceholder: false,
};

export const navLinks: NavLink[] = [
  { label: "Work", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const resumeUrl: string | null = "/Azim_Haffar_CV.pdf";

export const socialLinks: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/azim-haffar",
    isPlaceholder: false,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/azim-haffar/",
    isPlaceholder: false,
  },
];
