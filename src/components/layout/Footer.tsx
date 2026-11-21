import Link from "next/link";
import { siteConfig } from "@/data/site";
export function Footer(){return <footer className="journal-footer"><p>© {new Date().getFullYear()} {siteConfig.name}</p><p>Applied AI. Grounded in engineering.</p><Link href="/#top">Back to top ↑</Link></footer>}
