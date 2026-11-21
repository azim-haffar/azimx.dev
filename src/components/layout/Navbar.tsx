"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { resumeUrl } from "@/data/site";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const nav = useRef<HTMLElement>(null);
  const pathname = usePathname();
  useEffect(() => {
    if (!open) return;
    const main = document.querySelector("main"), footer = document.querySelector("footer");
    const previousOverflow = document.body.style.overflow;
    main?.setAttribute("inert", ""); footer?.setAttribute("inert", "");
    document.body.style.overflow = "hidden";
    nav.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    function keydown(event: KeyboardEvent) {
      if (event.key === "Escape") { setOpen(false); trigger.current?.focus(); }
      if (event.key === "Tab") {
        const links = [...(nav.current?.querySelectorAll<HTMLElement>("a,button") ?? [])];
        if (event.shiftKey && document.activeElement === links[0]) { event.preventDefault(); trigger.current?.focus(); }
        else if (!event.shiftKey && document.activeElement === links.at(-1)) { event.preventDefault(); trigger.current?.focus(); }
        else if (document.activeElement === trigger.current) { event.preventDefault(); (event.shiftKey ? links.at(-1) : links[0])?.focus(); }
      }
    }
    const desktop = window.matchMedia("(min-width: 800px)");
    const resize = () => { if (desktop.matches) setOpen(false); };
    document.addEventListener("keydown", keydown); desktop.addEventListener("change", resize);
    return () => { main?.removeAttribute("inert"); footer?.removeAttribute("inert"); document.body.style.overflow = previousOverflow; document.removeEventListener("keydown", keydown); desktop.removeEventListener("change", resize); };
  }, [open]);
  const links = [{ label: "Work", href: "/#projects" }, { label: "Experience", href: "/#experience" }, ...(resumeUrl ? [{ label: "Résumé", href: resumeUrl }] : []), { label: "Contact", href: "/#contact" }];
  return <header className="r-header"><div className="r-header-inner">
    <Link href="/#top" className="r-brand" onClick={() => setOpen(false)}>Azim Haffar<span aria-hidden="true">.</span></Link>
    <div className="r-header-controls"><ThemeToggle /><button ref={trigger} type="button" className="r-menu-toggle" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen(value => !value)}>{open ? <X size={21} /> : <Menu size={21} />}</button></div>
    <nav ref={nav} id="primary-navigation" aria-label="Primary" className={open ? "r-nav is-open" : "r-nav"}>{links.map(link => <Link key={link.label} href={link.href} aria-current={pathname !== "/" && link.href === pathname ? "page" : undefined} onClick={() => setOpen(false)}>{link.label}</Link>)}</nav>
  </div></header>;
}
