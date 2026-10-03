import type { Project } from "@/types/portfolio";

// Entry order controls the showcase. Source checked 3 October 2026; runtime limits are explicit.
export const projects: Project[] = [
  {
    slug: "orderflow", title: "OrderFlow", focus: "Event-driven backend",
    description: "I built an order-processing demonstration to explore asynchronous messaging, database transactions, and inventory updates with Java and Spring Boot.",
    technologies: ["Java", "Spring Boot", "Kafka", "PostgreSQL", "Redis", "Testcontainers"],
    capabilities: ["Transactional outbox", "Inventory row locking", "Integration test suite"],
    limitations: "Duplicate delivery and cancellation races need further hardening. No public hosted demo.",
    status: "in-progress", featured: true,
    github: { href: "https://github.com/azim-haffar/OrderFlow", label: "GitHub" },
    liveDemo: { href: null, label: "Live demo" }, caseStudyHref: "/projects/orderflow", caseStudyReady: true,
    imageSrc: "/projects/overview.png", imageAlt: "OrderFlow dashboard with order activity and infrastructure status", imageFit: "contain",
    architecture: {
      imageSrc: "/projects/orderflow-architecture.svg",
      imageAlt: "OrderFlow request, PostgreSQL transactional outbox, Kafka, inventory consumer and Redis cache architecture",
      caption: "Orders and outbox events are written in one database transaction. A poller publishes pending events to Kafka, and an inventory consumer locks the product row before updating stock.",
    },
    caseStudy: [
      { title: "The problem", body: "An order request can finish before inventory processing does. I built this demonstration to explore how an API, database, and message broker coordinate that workflow, and what happens when those boundaries fail." },
      { title: "My contribution", body: "This is my personal project. The repository brings together a Spring Boot API, a React dashboard, persistence, messaging, caching, Docker Compose configuration, and integration tests. These notes describe the current implementation rather than production use or measured scale." },
      { title: "A transaction before a message", body: "OrderService saves the order and an outbox event in the same database transaction. OutboxPoller checks pending events, waits for Kafka acknowledgement, and then marks them published. Failed sends remain pending for a later poll. This separates the database commit from broker availability." },
      { title: "Inventory and caching", body: "The consumer acquires a pessimistic lock on the product row before checking and decrementing stock. Redis caches product data, and successful inventory processing evicts the relevant cache entry. Row locking protects the stock update, but it does not by itself solve duplicate event handling." },
      { title: "Tests and verification", body: "The repository includes five integration tests: product listing, product lookup, missing-product handling, order confirmation with stock reduction, and insufficient-stock cancellation. They configure real PostgreSQL, Kafka, and Redis containers. Source was inspected on 3 October 2026; the suite was not rerun for this portfolio review because Docker and Maven were unavailable in the review environment." },
      { title: "Known limits and next decisions", body: "The current consumer has no processed-event guard, so duplicate delivery can decrement inventory again. Client cancellation and consumer processing also need coordinated order-state locking. A crash after Kafka acknowledgement but before marking an event published can cause redelivery. The next useful work is idempotent consumption and reproducible duplicate-delivery, cancellation-race, and recovery tests. No throughput or production-readiness claim is made." },
    ],
  },
  {
    slug: "hirelens", title: "HireLens", focus: "Full-stack / Applied AI",
    description: "I built a CV analysis application with a FastAPI backend and React interface, connecting document parsing and LLM-generated feedback to a Supabase-backed workflow.",
    technologies: ["Python", "FastAPI", "React", "JavaScript", "Supabase", "Groq"],
    capabilities: ["CV document parsing", "Job-match analysis", "Five-language interface"],
    limitations: "LLM feedback needs human review. Hosted end-to-end behavior and scoring quality have not been verified in this review.",
    status: "in-progress", featured: true,
    github: { href: "https://github.com/azim-haffar/HireLens", label: "GitHub" },
    liveDemo: { href: null, label: "Live demo" }, caseStudyHref: "/projects/hirelens", caseStudyReady: false,
    imageSrc: "/projects/hirelens.png", imageAlt: "HireLens landing page introducing its CV analysis tools", imageFit: "contain", imageAspect: "16/9",
  },
  {
    slug: "ml-training-inspector", title: "ML Training Inspector", focus: "ML tooling / Real-time systems",
    description: "I built a browser dashboard for inspecting PyTorch training, using FastAPI and WebSockets to stream loss, accuracy, and gradient information to React charts.",
    technologies: ["Python", "PyTorch", "FastAPI", "WebSockets", "React", "JavaScript"],
    capabilities: ["Live training metrics", "Per-class accuracy", "Manual stop + checkpoint saving"],
    limitations: "Anomaly signals are threshold heuristics. Training results and checkpoint resume are not verified; the backend assumes a single worker.",
    status: "in-progress", featured: true,
    github: { href: "https://github.com/azim-haffar/ml-training-inspector", label: "GitHub" },
    liveDemo: { href: null, label: "Live demo" }, caseStudyHref: "/projects/ml-training-inspector", caseStudyReady: false,
  },
];
