import { ArrowDown, ArrowUpRight, Braces, Database, Radio } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { resumeUrl } from "@/data/site";

export function Hero() {
  return <section id="top" className="journal-hero">
    <Container>
      <div className="hero-edition"><span>ENGINEERING / SELECTED WORK</span><span>Java · Python · A little curiosity</span></div>
      <p className="hero-greeting">Hello, I’m Azim <span aria-hidden="true">↗</span></p>
      <h1>Backend thinking.<br /><span className="hero-gradient">Practical software.</span></h1>
      <div className="hero-introduction"><p>I build with Java and Python, from event-driven backends to applied AI tools. My experience includes a backend internship at Trendyol and paid Python/LLM development for Kvote.</p><div className="hero-actions"><Button href="#projects">Explore my work <ArrowDown size={16} aria-hidden="true" /></Button>{resumeUrl && <Button href={resumeUrl} variant="secondary">View résumé <ArrowUpRight size={16} aria-hidden="true" /></Button>}</div></div>
      <div className="hero-bottom"><p><span className="availability-dot" aria-hidden="true" />Full-time internships from <strong>17 January 2027</strong><span className="block mt-1">4–12 months · Open to relocation</span></p><Link href="/projects/orderflow#recovery-lab" className="hero-flow"><span className="hero-flow-diagram" aria-hidden="true"><Braces size={18} /><span /><Database size={18} /><span /><Radio size={18} /></span><span>What happens when Kafka stops?<ArrowUpRight size={14} aria-hidden="true" /></span></Link></div>
    </Container>
  </section>;
}
