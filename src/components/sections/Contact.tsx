import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { resumeUrl, siteConfig, socialLinks } from "@/data/site";

export function Contact() {
  return <section id="contact" className="r-section r-contact"><Container>
    <p className="r-eyebrow">Contact</p><h2>Let’s talk about the work.</h2>
    <p>Seeking applied AI, ML systems and relevant software internships from 17 January 2027. Also available for paid remote work that fits university commitments.</p>
    <div className="r-contact-links"><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}<ArrowUpRight size={17} aria-hidden="true" /></a>{socialLinks.filter(link => link.href).map(link => <a href={link.href!} target="_blank" rel="noopener noreferrer" key={link.label}>{link.label}<ArrowUpRight size={15} aria-hidden="true" /></a>)}{resumeUrl && <Link href={resumeUrl}>Résumé<ArrowUpRight size={15} aria-hidden="true" /></Link>}</div>
  </Container></section>;
}
