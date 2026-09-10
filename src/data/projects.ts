import type { Project } from "@/types/portfolio";

/**
 * Source of truth: docs/Career-Profile.txt (sections 11 & 14) plus verified
 * repository URLs. GitHub links are confirmed. No live-demo URL is invented
 * for either project — the Demo action only renders once a real URL exists.
 * ML Training Inspector is hidden (not featured, case study not ready) but
 * its data entry is kept rather than deleted, so it can be re-enabled once
 * verified project details are available.
 */
export const projects: Project[] = [
  {
    slug: "orderflow",
    title: "OrderFlow",
    description:
      "An event-driven, distributed order-processing backend built around asynchronous Kafka messaging, with PostgreSQL and Redis for persistence. Runs in a fully containerized local/CI environment, with integration tests against real Kafka and PostgreSQL via Testcontainers, RFC 7807 problem-details error handling, and English/German technical documentation.",
    technologies: [
      "Java 21",
      "Spring Boot 3",
      "Kafka",
      "PostgreSQL",
      "Redis",
      "Docker",
      "Docker Compose",
      "Testcontainers",
      "JUnit",
    ],
    status: "completed",
    github: { href: "https://github.com/azim-haffar/OrderFlow", label: "GitHub" },
    liveDemo: { href: null, label: "Live Demo" },
    caseStudyHref: "/projects/orderflow",
    caseStudyReady: false,
    featured: true,
  },
  {
    slug: "hirelens",
    title: "HireLens",
    description:
      "A full-stack AI recruitment application with a FastAPI backend and a React/TypeScript frontend, combining document ingestion, embeddings/retrieval, and a RAG pipeline for structured LLM output. Includes OAuth authentication, Supabase persistence, Docker packaging, GitHub Actions deployment, and a five-language UI (English, German, Danish, Spanish, Turkish).",
    technologies: [
      "Python",
      "FastAPI",
      "React",
      "TypeScript",
      "RAG",
      "LLM Integrations",
      "Supabase",
      "Docker",
      "GitHub Actions",
      "LangChain",
    ],
    status: "completed",
    statusNote: "Deployed infrastructure",
    github: { href: "https://github.com/azim-haffar/HireLens", label: "GitHub" },
    liveDemo: { href: null, label: "Live Demo" },
    caseStudyHref: "/projects/hirelens",
    caseStudyReady: false,
    featured: true,
  },
  {
    slug: "ml-training-inspector",
    title: "ML Training Inspector",
    description:
      "Internal note: no verified description, tech stack, or links yet. Keep featured=false and caseStudyReady=false until confirmed details are provided.",
    technologies: [],
    status: "placeholder",
    github: { href: null, label: "GitHub" },
    liveDemo: { href: null, label: "Live Demo" },
    caseStudyHref: "/projects/ml-training-inspector",
    caseStudyReady: false,
    featured: false,
  },
];
