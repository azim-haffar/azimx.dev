import type { ExperienceEntry } from "@/types/portfolio";

/**
 * Source: Career Master Profile, sections 8–9, read 2 October 2026.
 * Experience is user-reported; Trendyol production releases are unverified.
 */
export const experience: ExperienceEntry[] = [
  {
    organization: "Kvote 2 Hjælperen",
    role: "Freelance Software Developer",
    employmentType: "Freelance",
    location: "Remote",
    period: "Feb 2026 – Apr 2026",
    summary: [
      "Delivered a paid Python/LLM study tool that generated practice questions using students' study materials as context.",
      "Implemented a separate LLM evaluation step to review relevance, grounding, clarity, and answerability against the source material.",
      "Added application-level checks for required fields and response structure, with rejection or regeneration of questions that failed checks.",
    ],
    technologies: ["Python", "LLM API Integration"],
  },
  {
    organization: "Trendyol",
    role: "Backend Engineering Intern",
    employmentType: "Internship",
    location: "Istanbul, Türkiye · Onsite",
    period: "Jun 2025 – Sep 2025",
    summary: [
      "Built and demonstrated a Coupon Usage Tracker microservice with Spring Boot, PostgreSQL persistence, and REST endpoints for recording usage, looking up user usage, and checking coupon exhaustion.",
      "Wrote unit and integration tests using Testcontainers, documented the service, and packaged it with Docker.",
      "Contributed API changes, validation, bug fixes, and tests within existing backend services, and presented engineering decisions to the team.",
    ],
    technologies: ["Java", "Spring Boot", "PostgreSQL", "JUnit", "Testcontainers", "Docker"],
  },
];
