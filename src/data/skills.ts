import type { SkillGroup } from "@/types/portfolio";

/**
 * Source of truth: docs/Career-Profile.txt (section 11) plus verified
 * project/client work. Only technologies backed by genuine completed work.
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
    label: "AI / ML",
    skills: [
      "LLM API integration",
      "RAG pipelines",
      "embeddings & retrieval",
      "prompt engineering",
      "LangChain",
    ],
  },
  {
    label: "Frontend",
    skills: ["React", "TypeScript"],
  },
];
