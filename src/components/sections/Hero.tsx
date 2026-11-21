import { AIExplorer } from "@/components/ui/AIExplorer";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { resumeUrl } from "@/data/site";

export function Hero() {
  return <section id="top" className="r-hero"><Container><div>
    <p className="r-eyebrow">Software Engineering student · Mersin, Türkiye</p>
    <h1>Azim Haffar<span>Applied AI &amp; ML Systems<br /><em>Backend Engineering</em></span></h1>
    <p className="r-hero-description">Paid Python/LLM development for Kvote and a backend engineering internship at Trendyol. I build AI workflows, evaluate their limits, and make the systems behind them reliable.</p>
    <p className="r-availability"><span aria-hidden="true" />Available for internships from 17 January 2027 · Open to relocation</p>
    <div className="r-actions"><Link href="#projects" className="r-button">View projects<ArrowRight size={16} aria-hidden="true" /></Link>{resumeUrl && <Link href={resumeUrl} className="r-button r-button-secondary">View résumé<ArrowUpRight size={16} aria-hidden="true" /></Link>}</div>
    </div><AIExplorer />
  </Container></section>;
}
