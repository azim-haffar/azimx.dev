import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Play } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { resumeUrl } from "@/data/site";
import { projects } from "@/data/projects";

export function Hero() {
  const previews = ["orderflow", "seatledger", "ml-training-inspector"].map(slug => projects.find(project => project.slug === slug)!);
  return <section id="top" className="cinematic-hero" aria-labelledby="hero-title">
    <div className="hero-atmosphere" aria-hidden="true"><div className="hero-light-columns" /><div className="hero-horizon" /></div>
    <Container>
      <div className="cinematic-intro">
        <p className="hero-signature"><span aria-hidden="true" />Azim Haffar · Software Engineering</p>
        <h1 id="hero-title">Backend thinking.<br /><em>Practical software.</em></h1>
        <p className="cinematic-description">I build with Java and Python—from event-driven backends to applied AI tools. Backend internship at Trendyol. Paid Python/LLM development for Kvote.</p>
        <div className="cinematic-actions"><Link href="#projects" className="cinematic-primary">Explore my work<ArrowDown size={16} aria-hidden="true" /></Link>{resumeUrl && <Link href={resumeUrl} className="cinematic-resume">View résumé<ArrowUpRight size={16} aria-hidden="true" /></Link>}</div>
        <div className="hero-side-note hero-side-left"><span>Java / Python</span><p>Backend engineering<br />& applied AI</p></div>
        <div className="hero-side-note hero-side-right"><span>17 Jan 2027</span><p>Internships · 4–12 months<br />Open to relocation</p></div>
        <Link href="/projects/orderflow#recovery-lab" className="hero-play"><span className="hero-play-ring"><Play size={18} aria-hidden="true" /></span><span>What survives an outage?<small>Explore the illustrative simulation</small></span></Link>
      </div>
      <div className="hero-preview-deck" aria-label="Explore selected engineering projects">{previews.map((project, index) => <Link href={project.caseStudyHref} className={`hero-preview hero-preview-${index}`} key={project.slug}>
        <div className="hero-preview-heading"><span><i aria-hidden="true" />{project.title}</span><ArrowUpRight size={16} aria-hidden="true" /></div>
        <div className="hero-preview-image">{project.imageSrc && <Image src={project.imageSrc} alt={project.imageAlt ?? project.title} fill sizes="(min-width: 900px) 350px, (min-width: 600px) 30vw, 85vw" className="object-cover object-top" />}</div>
        <p>{project.slug === "seatledger" ? "Deployed synthetic reservation demo" : project.slug === "orderflow" ? "Local Kafka recovery experiment" : "Measured synthetic CPU run"}</p>
      </Link>)}</div>
    </Container>
  </section>;
}
