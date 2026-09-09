import type { SkillGroup } from "@/types/portfolio";

/**
 * Source of truth: docs/Career-Profile.txt (section 11).
 * Only technologies explicitly listed there are included.
 */
export const skillGroups: SkillGroup[] = [
  {
    label: "Backend",
    skills: [
      "Java 21",
      "Spring Boot",
      "Spring Data JPA",
      "Hibernate",
      "REST APIs",
      "PostgreSQL",
      "Kafka",
      "Redis",
      "Python",
      "FastAPI",
    ],
  },
  {
    label: "DevOps / Cloud",
    skills: ["Git", "GitHub", "Docker", "GitHub Actions", "CI/CD", "Linux", "AWS (basics)"],
  },
  {
    label: "Testing",
    skills: ["JUnit", "Mockito", "Testcontainers"],
  },
  {
    label: "Frontend",
    skills: ["React", "TypeScript"],
  },
  {
    label: "AI / Data",
    skills: ["LLM Integrations", "RAG", "Embeddings / Retrieval"],
  },
];
