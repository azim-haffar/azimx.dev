import { AIExplorer } from "@/components/ui/AIExplorer";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { resumeUrl } from "@/data/site";

export function Hero() {
  return <section id="top" className="r-hero"><Container><div>
    <p className="r-eyebrow">Software Engineering student · Mersin, Türkiye</p>
    <h1>Azim Haffar<span>Applied AI &amp; ML Systems<br /><em>Backend Engineering</em></span></h1>
    <p className="r-hero-description">Paid Python/LLM development for Kvote · Backend engineering internship at Trendyol.</p>
    <p className="r-availability"><span aria-hidden="true" />Available for internships from 17 January 2027 · Open to relocation</p>
    <div className="r-actions">{resumeUrl && <Link href={resumeUrl} className="r-button">View résumé<ArrowUpRight size={16} aria-hidden="true" /></Link>}</div>
    <nav aria-label="Featured case studies" className="r-actions">
      <Link href="/projects/ml-training-inspector" className="r-button r-button-secondary">ML engineering<ArrowRight size={16} aria-hidden="true" /></Link>
      <Link href="/projects/skina" className="r-button r-button-secondary">Applied AI<ArrowRight size={16} aria-hidden="true" /></Link>
      <Link href="/projects/seatledger" className="r-button r-button-secondary">Backend &amp; data<ArrowRight size={16} aria-hidden="true" /></Link>
    </nav>
    </div><AIExplorer />
  </Container></section>;
}
