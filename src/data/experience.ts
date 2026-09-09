import type { ExperienceEntry } from "@/types/portfolio";

/**
 * Source of truth: docs/Career-Profile.txt (section 17).
 * Kvote 2 Hjælperen is the only confirmed professional experience.
 * Exact employment dates are not confirmed — placeholder period is used
 * rather than an invented date range.
 */
export const experience: ExperienceEntry[] = [
  {
    organization: "Kvote 2 Hjælperen",
    role: "Freelance Software Developer",
    employmentType: "Freelance",
    period: "Dates to be confirmed", // PLACEHOLDER — do not replace with a guessed range
    summary: [
      "Delivered production software involving LLM API integration and prompt/inference workflows.",
      "Responsible for architecture, implementation, and delivery.",
    ],
    technologies: ["Python", "LLM API Integration"],
  },
];
