import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Project } from "@/types/portfolio";

export function FlagshipProject({ project }: { project: Project }) {
  return <article className="flagship-project">
    <div className="flagship-copy">
      <p className="eyebrow">01 / Featured engineering story</p>
      <p className="flagship-name">{project.title} <span>Deployed demo</span></p>
      <h3>One seat left.<br /><span>Two people booking.</span></h3>
      <p className="flagship-description">I built a reservation system to explore what happens when requests compete, holds expire, and clients retry—with a deployed demo and reproducible engineering evidence.</p>
      <div className="flagship-actions">
        {project.liveDemo.href && <a className="flagship-primary" href={project.liveDemo.href} target="_blank" rel="noopener noreferrer">Try the demo<ArrowUpRight size={17} aria-hidden="true" /></a>}
        <Link href={project.caseStudyHref}>Engineering story<ArrowRight size={17} aria-hidden="true" /></Link>
      </div>
      <p className="flagship-scope">Synthetic shared accounts · Free backend may take a minute or more to wake · No personal information</p>
    </div>
    <figure className="flagship-preview">
      <Link href={project.caseStudyHref} aria-label="Explore SeatLedger’s interface and engineering story">
        {project.imageSrc && <Image src={project.imageSrc} alt={project.imageAlt ?? "SeatLedger event reservation interface"} width={project.imageWidth ?? 1440} height={project.imageHeight ?? 1100} sizes="(min-width: 1280px) 560px, (min-width: 900px) 50vw, 90vw" />}
        <span className="flagship-preview-label">Actual product capture <ArrowUpRight size={15} aria-hidden="true" /></span>
      </Link>
      <figcaption>Public event browsing, free registration, and organizer analytics. A portfolio demo; real-user release remains incomplete.</figcaption>
    </figure>
    <ol className="flagship-decisions" aria-label="Three SeatLedger engineering decisions">
      <li><span>01 / Protect capacity</span><p>Serialize reservation changes at the event.</p></li>
      <li><span>02 / Handle retries</span><p>Persist idempotent outcomes with lifecycle changes.</p></li>
      <li><span>03 / Explain the numbers</span><p>Build replayable analytics apart from live inventory.</p></li>
    </ol>
    <details className="flagship-evidence"><summary>Verification and demo limitations</summary><p>{project.verification}</p><p>{project.limitations}</p><Link href={project.caseStudyHref + "#verification"}>Inspect verification scope<ArrowRight size={15} aria-hidden="true" /></Link></details>
  </article>;
}
