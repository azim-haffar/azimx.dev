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
  /** True once the case-study page has real, finished content. Until then the
   * Case Study button is hidden and the route itself returns 404. */
  caseStudyReady?: boolean;
  imageSrc?: string;
  imageAlt?: string;
  /** "cover" (default) fills the media area, cropping overflow. Use "contain"
   * when the screenshot has important UI near the edges that cover would crop. */
  imageFit?: "cover" | "contain";
  /** Overrides the split-layout media aspect ratio (default "4/3") to better
   * match the real screenshot and avoid excess letterboxing. */
  imageAspect?: "4/3" | "16/9";
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
