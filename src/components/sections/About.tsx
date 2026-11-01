import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { experience } from "@/data/experience";

export function About() {
  return <section id="about" className="journal-section"><Container>
    <SectionHeading eyebrow="04 / About" title="Curious about what happens underneath." />
    <div className="about-compact">
      <div className="about-copy"><p>I’m Azim, a Software Engineering student based in Mersin, Türkiye. Backend development is my foundation, with paid applied AI work alongside it.</p><p>I enjoy tracing what happens behind an interface—especially when something fails. I build tools that make those hidden processes easier to understand.</p><Link className="personal-story-link" href="/projects/orderflow#recovery-lab">Explore that curiosity<ArrowUpRight size={16} aria-hidden="true" /></Link></div>
      <div className="education-compact"><p className="eyebrow">Education</p><h3>B.Sc. Software Engineering</h3><p>OSTİM Technical University · English-taught<br />Expected graduation August 2027</p><dl><div><dt>English</dt><dd>C1</dd></div><div><dt>German</dt><dd>B1 · Goethe speaking module</dd></div><div><dt>Turkish / Arabic</dt><dd>Native</dd></div></dl></div>
    </div>
    <div className="about-bottom"><details className="journey-detail"><summary>My journey so far</summary><ol className="journey-strip" aria-label="Personal journey"><li><span>Ongoing</span><p>Software engineering studies</p></li>{[...experience].reverse().map(entry => <li key={entry.organization}><span>{entry.period}</span><p>{entry.organization === "Trendyol" ? "Trendyol internship" : "Paid Kvote development"}</p></li>)}<li><span>Now</span><p>Reliable systems & useful feedback</p></li></ol></details><Link className="learning-inline" href="/learning-gallery">A room for learning<span>Explore certificates in 3D</span><ArrowUpRight size={18} aria-hidden="true" /></Link></div>
  </Container></section>;
}
