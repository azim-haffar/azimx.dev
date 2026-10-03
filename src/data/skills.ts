import type { SkillGroup } from "@/types/portfolio";

/**
 * Career Master Profile and source inspection, 3 October 2026.
 * Public emphasis follows professional assignments and inspected projects.
 */
export const skillGroups: SkillGroup[] = [
  {
    label: "Backend",
    skills: [
      "Java 21",
      "Spring Boot",
      "Spring Data JPA",
      "Hibernate",
      "REST API design",
      "Python",
      "FastAPI",
    ],
  },
  {
    label: "Cloud & DevOps",
    skills: [
      "Docker",
      "Docker Compose",
      "GitHub Actions",
      "CI/CD pipelines",
      "Linux",
      "Git",
      "AWS (fundamentals)",
    ],
  },
  {
    label: "Data / Messaging",
    skills: ["PostgreSQL", "Redis", "Apache Kafka", "Supabase"],
  },
  {
    label: "Testing",
    skills: ["JUnit", "Mockito", "Testcontainers", "integration testing"],
  },
  {
    label: "Applied AI & ML tooling",
    skills: [
      "LLM API integration",
      "LLM evaluation workflows",
      "Response validation",
      "PyTorch",
      "Training visualization",
    ],
  },
  {
    label: "Frontend",
    skills: ["React", "JavaScript", "TypeScript (portfolio)"],
  },
];
