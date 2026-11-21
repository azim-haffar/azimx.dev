import { Container } from "@/components/ui/Container";
import { experience } from "@/data/experience";

export function Experience() {
  return <section id="experience" className="r-experience"><Container>
    <h2 className="r-eyebrow">Professional experience</h2>
    <div className="r-experience-grid">{experience.map(entry => <article key={entry.organization}>
      <div className="r-experience-title"><h3>{entry.organization}</h3><span>{entry.period}</span></div>
      <p className="r-role">{entry.role} · {entry.location}</p>
      <p>{entry.organization === "Trendyol" ? "Built and demonstrated a Spring Boot coupon-usage service, with PostgreSQL persistence and container-backed tests." : "Delivered a paid Python/LLM study tool with a separate evaluation step and response validation."}</p>
      <details><summary>Contribution details</summary><ul>{entry.summary.map(line => <li key={line}>{line}</li>)}</ul></details>
    </article>)}</div>
  </Container></section>;
}
