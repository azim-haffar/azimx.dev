"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X, MapPin, FileDown } from "lucide-react";
import { navLinks, resumeUrl, socialLinks } from "@/data/site";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { GitHubIcon, LinkedInIcon } from "@/components/icons/BrandIcons";

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("#top");
  const header = useRef<HTMLElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const sections = [...document.querySelectorAll<HTMLElement>("main section[id]")];
    function update() {
      const current = sections.filter(section => section.getBoundingClientRect().top <= 180).at(-1);
      setActive(current ? `#${current.id}` : "#top");
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;
    const main = document.querySelector("main");
    const footer = document.querySelector("footer");
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    main?.setAttribute("inert", ""); footer?.setAttribute("inert", "");
    firstLink.current?.focus();
    function keydown(event: KeyboardEvent) {
      if (event.key === "Escape") { setIsOpen(false); trigger.current?.focus(); }
      if (event.key !== "Tab") return;
      const nodes = [...(header.current?.querySelectorAll<HTMLElement>("a[href],button:not([disabled])") ?? [])].filter(node => node.offsetParent !== null);
      const first = nodes[0], last = nodes.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    }
    const desktop = window.matchMedia("(min-width: 1200px)");
    const resize = () => { if (desktop.matches) setIsOpen(false); };
    desktop.addEventListener("change", resize);
    document.addEventListener("keydown", keydown);
    return () => {
      document.body.style.overflow = previousOverflow;
      main?.removeAttribute("inert"); footer?.removeAttribute("inert");
      document.removeEventListener("keydown", keydown);
      desktop.removeEventListener("change", resize);
    };
  }, [isOpen]);

  function close() { setIsOpen(false); }
  return <header ref={header} className="portfolio-header">
    <div className="mobile-bar"><Link href="/#top" onClick={close} className="mobile-brand"><span className="brand-square" aria-hidden="true">ah.</span>Azim Haffar<span className="text-accent">/</span></Link><div className="flex items-center gap-2"><ThemeToggle /><button ref={trigger} type="button" onClick={() => setIsOpen(open => !open)} className="header-menu-button" aria-expanded={isOpen} aria-controls="portfolio-navigation" aria-label={isOpen ? "Close menu" : "Open menu"}>{isOpen ? <X size={20} /> : <Menu size={20} />}</button></div></div>
    <div id="portfolio-navigation" className={`identity-rail ${isOpen ? "is-open" : ""}`}>
      <div className="rail-top"><Link href="/#top" onClick={close} className="rail-domain">azimx.dev <ArrowUpRight size={14} aria-hidden="true" /></Link><ThemeToggle /></div>
      <Link href="/#about" onClick={close} className="rail-identity"><div className="identity-art" aria-hidden="true"><span className="identity-art-corner" /><span className="identity-art-initials">ah<span>.</span></span><span className="identity-art-caption">CURIOUS BY DEFAULT</span><span className="identity-art-orbit" /></div><span className="rail-name">Azim Haffar</span></Link>
      <p className="rail-role">Software Engineering Student<br /><span>Backend / Applied AI</span></p>
      <p className="rail-location"><MapPin size={13} aria-hidden="true" />Mersin, Türkiye</p>
      <nav aria-label="Primary" className="rail-nav">{navLinks.map((link,index) => <Link key={link.href} href={`/${link.href}`} ref={index === 0 ? firstLink : undefined} onClick={close} aria-current={pathname === "/" && active === link.href ? "location" : undefined}><span className="rail-nav-index" aria-hidden="true">0{index+1}</span>{link.label}<span className="rail-nav-dot" aria-hidden="true" /></Link>)}<Link href="/learning-gallery" onClick={close} aria-current={pathname === "/learning-gallery" ? "page" : undefined}><span className="rail-nav-index" aria-hidden="true">↗</span>Learning gallery<span className="rail-experiment">3D</span></Link></nav>
      <div className="rail-bottom"><p className="rail-availability"><span aria-hidden="true" />Internships from 17 Jan 2027</p>{resumeUrl && <Link href={resumeUrl} onClick={close} className="rail-resume">View résumé<FileDown size={16} aria-hidden="true" /></Link>}<div className="rail-socials">{socialLinks.filter(link=>link.href).map(link => <a key={link.label} href={link.href!} target="_blank" rel="noopener noreferrer" aria-label={link.label}>{link.label === "GitHub" ? <GitHubIcon className="h-4 w-4" /> : <LinkedInIcon className="h-4 w-4" />}{link.label}</a>)}</div></div>
    </div>
  </header>;
}
