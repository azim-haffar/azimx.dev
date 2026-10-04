"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function PortfolioMotion() {
  const pathname = usePathname();
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(".project-card, main section:not(#top), .case-header");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.06 });
    elements.forEach(element => {
      // Content stays visible without JavaScript and when already on screen.
      if (element.getBoundingClientRect().top > window.innerHeight) element.classList.add("reveal-ready");
      observer.observe(element);
    });
    return () => {
      observer.disconnect();
      elements.forEach(element => element.classList.remove("reveal-ready", "is-visible"));
    };
  }, [pathname]);
  return null;
}
