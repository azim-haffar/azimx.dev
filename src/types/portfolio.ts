export type ProjectStatus = "completed" | "in-progress" | "placeholder";

export interface ProjectLink {
  /** Full URL, or null when not yet available — render as a placeholder. */
  href: string | null;
  label: string;
}

export interface Project {
  slug: string;
  title: string;
  /** Short, factual summary shown on the card. */
  description: string;
  technologies: string[];
  status: ProjectStatus;
  /** Short factual note, e.g. "CI/CD via GitHub Actions". Omit if not confirmed. */
  statusNote?: string;
  github: ProjectLink;
  liveDemo: ProjectLink;
  /** Case-study route, e.g. /projects/orderflow. Page may not exist yet. */
  caseStudyHref: string;
  imageSrc?: string;
  imageAlt?: string;
  featured?: boolean;
}

export interface ExperienceEntry {
  organization: string;
  role: string;
  employmentType: string;
  /** Human-readable period; use an explicit placeholder if dates are unconfirmed. */
  period: string;
  location?: string;
  summary: string[];
  technologies: string[];
}

export interface SkillGroup {
  label: string;
  skills: string[];
}

export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface SocialLink {
  label: string;
  href: string | null;
  isPlaceholder: boolean;
}
