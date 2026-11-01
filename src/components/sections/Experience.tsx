import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { experience } from "@/data/experience";

export function Experience() {
  return <section id="experience" className="journal-section"><Container>
    <SectionHeading eyebrow="02 / Experience" title="Built with teams. Delivered for clients." />
    <div className="experience-grid">{experience.map(entry => <article className="experience-card" key={entry.organization}>
      <div className="experience-heading"><span className="company-monogram" aria-hidden="true">{entry.organization === "Trendyol" ? "t." : "k."}</span><div><h3>{entry.organization}</h3><p>{entry.role}</p></div></div>
      <p className="experience-meta">{entry.period} · {entry.location}</p>
      <p className="experience-summary">{entry.organization === "Trendyol" ? "Built and demonstrated a Spring Boot coupon-usage service, with PostgreSQL persistence and container-backed testing." : "Delivered a paid Python/LLM study tool with a separate evaluation step and response validation."}</p>
      <details className="experience-detail"><summary>Contributions & technologies</summary><ul>{entry.summary.map(line => <li key={line}>{line}</li>)}</ul><p>{entry.technologies.join(" · ")}</p></details>
    </article>)}</div>
  </Container></section>;
}
