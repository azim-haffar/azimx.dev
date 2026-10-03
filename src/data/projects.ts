import type { Project } from "@/types/portfolio";

// Entry order controls the showcase. Source checked 3 October 2026; runtime limits are explicit.
export const projects: Project[] = [
  {
    slug: "orderflow", title: "OrderFlow", focus: "Event-driven backend",
    description: "I built an order-processing demonstration to explore asynchronous messaging, database transactions, and inventory updates with Java and Spring Boot.",
    technologies: ["Java", "Spring Boot", "Kafka", "PostgreSQL", "Redis", "Testcontainers"],
    capabilities: ["Transactional outbox", "Duplicate-delivery guard", "10 passing CI tests"],
    limitations: "Single outbox publisher; no authentication or load benchmarks. No public hosted demo.",
    status: "in-progress", featured: true,
    github: { href: "https://github.com/azim-haffar/OrderFlow", label: "GitHub" },
    liveDemo: { href: null, label: "Live demo" }, caseStudyHref: "/projects/orderflow", caseStudyReady: true,
    imageSrc: "/projects/overview.png", imageAlt: "OrderFlow dashboard with order activity and infrastructure status", imageFit: "contain",
    architecture: {
      imageSrc: "/projects/orderflow-architecture.svg",
      imageAlt: "OrderFlow request, PostgreSQL transactional outbox, Kafka, inventory consumer and Redis cache architecture",
      caption: "Orders and outbox events are written in one database transaction. A poller publishes pending events to Kafka. The consumer locks the order, skips terminal states, then locks the product before updating stock.",
    },
    caseStudy: [
      { title: "The problem", body: "An order request can finish before inventory processing does. I built this demonstration to explore how an API, database, and message broker coordinate that workflow, and what happens when those boundaries fail." },
      { title: "My contribution", body: "This is my personal project. The repository brings together a Spring Boot API, a React dashboard, persistence, messaging, caching, Docker Compose configuration, and integration tests. These notes describe the current implementation rather than production use or measured scale." },
      { title: "A transaction before a message", body: "OrderService saves the order and an outbox event in the same database transaction. OutboxPoller checks pending events, waits for Kafka acknowledgement, and then marks them published. Failed sends remain pending for a later poll. This separates the database commit from broker availability." },
      { title: "Inventory and caching", body: "The consumer locks the order and processes only PLACED orders, then acquires a pessimistic product lock before checking and decrementing stock. Concurrent duplicate events therefore cannot deduct stock twice for this workflow. Client cancellation takes the same order lock. Redis caches product data, and successful inventory processing evicts the relevant cache entry; cache eviction is not atomic with the database commit." },
      { title: "Tests and verification", body: "GitHub CI passed 10 Java tests with no failures, errors, or skipped tests: six integration tests using real PostgreSQL, Kafka, and Redis containers, plus four service regression tests. Coverage includes concurrent duplicate delivery, cancellation before processing, missing products, and insufficient stock. This verifies those cases, not general production readiness or measured scale." },
      { title: "Known limits and next decisions", body: "A crash after Kafka acknowledgement but before marking an event published can cause redelivery; the terminal-state guard handles duplicates for this order workflow. Delivery remains at least once. The publisher assumes one instance, and there is no authentication, dead-letter recovery, or measured load benchmark. Multi-instance coordination, cancellation-versus-processing stress tests, and cache consistency remain useful next work." },
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
