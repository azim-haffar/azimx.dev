import type { ExperienceEntry } from "@/types/portfolio";

/**
 * Source of truth: docs/Career-Profile.txt (section 17).
 * Kvote 2 Hjælperen is the only confirmed professional experience.
 */
export const experience: ExperienceEntry[] = [
  {
    organization: "Kvote 2 Hjælperen",
    role: "Freelance Software Developer",
    employmentType: "Freelance",
    location: "Remote",
    period: "Feb 2026 – Apr 2026",
    summary: [
      "Built and shipped a Python tool integrating LLM APIs with dynamic prompt-generation workflows for a paying client.",
      "Designed inference workflows using prompt chaining/evaluation logic.",
      "Owned requirements, architecture, implementation, testing, and delivery.",
    ],
    technologies: ["Python", "LLM API Integration"],
  },
];
