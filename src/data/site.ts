import type { NavLink, SocialLink } from "@/types/portfolio";

/**
 * Central site configuration. Anything marked PLACEHOLDER should be
 * replaced with confirmed, factual information before launch.
 */
export const siteConfig = {
  name: "Azim Haffar",
  domain: "azimx.dev",
  url: "https://azimx.dev",
  title: "Azim Haffar — Software Engineering Student",
  description:
    "Software Engineering student building backend systems and growing DevOps/cloud capabilities. Seeking paid technical internships in Europe.",
  // PLACEHOLDER — confirm the public-facing contact email before launch.
  email: "PLACEHOLDER_EMAIL@example.com",
  emailIsPlaceholder: true,
};

export const navLinks: NavLink[] = [
  { label: "Work", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

// PLACEHOLDER — replace with the real resume file/link.
export const resumeUrl: string | null = null;

export const socialLinks: SocialLink[] = [
  {
    label: "GitHub",
    href: null, // PLACEHOLDER — add GitHub profile URL
    isPlaceholder: true,
  },
  {
    label: "LinkedIn",
    href: null, // PLACEHOLDER — add LinkedIn profile URL
    isPlaceholder: true,
  },
];
