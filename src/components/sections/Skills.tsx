import { Container } from "@/components/ui/Container";

const groups = [
  { title: "Applied AI & ML", items: "Python · PyTorch · LLM API integration · Evaluation workflows · Response validation" },
  { title: "Backend & data", items: "Java · Spring Boot · FastAPI · PostgreSQL · Kafka · Redis" },
  { title: "Delivery & interfaces", items: "React · TypeScript · Docker · GitHub Actions · JUnit · Testcontainers" },
];
export function Skills() {
  return <section id="skills" className="r-section r-toolkit"><Container>
    <div className="r-section-heading"><div><p className="r-eyebrow">Technical toolkit</p><h2>Tools connected to the work.</h2></div><p>Hands-on technologies from my professional experience and projects. Their scope is described in the case studies.</p></div>
    <div className="r-skill-grid">{groups.map(group => <div key={group.title}><h3>{group.title}</h3><p>{group.items}</p></div>)}</div>
  </Container></section>;
}
