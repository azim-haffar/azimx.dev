import type { Project } from "@/types/portfolio";

/**
 * Source of truth: docs/Career-Profile.txt (sections 11 & 14).
 * Only technologies and facts confirmed there are listed. GitHub/live links
 * are placeholders (null) until confirmed — do not invent URLs.
 */
export const projects: Project[] = [
  {
    slug: "orderflow",
    title: "OrderFlow",
    description:
      "An event-driven, distributed order-processing backend built around asynchronous messaging, persistence, and integration testing.",
    technologies: [
      "Java 21",
      "Spring Boot",
      "Kafka",
      "PostgreSQL",
      "Redis",
      "Docker",
      "Testcontainers",
    ],
    status: "completed",
    github: { href: null, label: "GitHub" },
    liveDemo: { href: null, label: "Live Demo" },
    caseStudyHref: "/projects/orderflow",
    featured: true,
  },
  {
    slug: "hirelens",
    title: "HireLens",
    description:
      "A full-stack AI recruitment application combining document ingestion, retrieval-augmented generation, and LLM integrations behind a FastAPI backend.",
    technologies: [
      "Python",
      "FastAPI",
      "React",
      "RAG",
      "LLM Integrations",
      "Docker",
      "Supabase",
      "CI/CD",
    ],
    status: "completed",
    statusNote: "Deployed infrastructure",
    github: { href: null, label: "GitHub" },
    liveDemo: { href: null, label: "Live Demo" },
    caseStudyHref: "/projects/hirelens",
    featured: true,
  },
  {
    slug: "ml-training-inspector",
    title: "ML Training Inspector",
    description:
      "Placeholder — detailed write-up in progress. Full description and technology list to be confirmed.",
    technologies: [],
    status: "placeholder",
    github: { href: null, label: "GitHub" },
    liveDemo: { href: null, label: "Live Demo" },
    caseStudyHref: "/projects/ml-training-inspector",
    featured: true,
  },
];
