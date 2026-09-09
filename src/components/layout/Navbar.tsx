"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { navLinks, resumeUrl, socialLinks } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { GitHubIcon, LinkedInIcon } from "@/components/icons/BrandIcons";

const socialIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  GitHub: GitHubIcon,
  LinkedIn: LinkedInIcon,
};

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // Open state: focus the first menu link, lock page scroll, and make the
  // rest of the page (main content + footer) inert so keyboard/assistive-tech
  // navigation can't reach content that's visually obscured behind the menu.
  useEffect(() => {
    const main = document.querySelector("main");
    const footer = document.querySelector("footer");

    if (isOpen) {
      firstLinkRef.current?.focus();
      document.body.style.overflow = "hidden";
      main?.setAttribute("inert", "");
      footer?.setAttribute("inert", "");
    } else {
      document.body.style.overflow = "";
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
    }

    return () => {
      document.body.style.overflow = "";
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
    };
  }, [isOpen]);

  // Escape closes the menu and returns focus to the trigger; Tab/Shift+Tab
  // is trapped within the header (nav bar + open menu panel) so focus can't
  // leave the visible floating nav while the menu is open.
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (!isOpen) return;

      if (event.key === "Escape") {
        setIsOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key === "Tab") {
        const container = headerRef.current;
        if (!container) return;
        const focusable = Array.from(
          container.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
        ).filter((el) => el.offsetParent !== null);
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return (
    <header
      ref={headerRef}
      className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-6 sm:pt-4"
    >
      <div className="pointer-events-auto w-full sm:max-w-4xl">
        <nav
          aria-label="Primary"
          className="glass-surface flex h-14 w-full items-center justify-between gap-2 rounded-[1.4rem] px-4 sm:h-16 sm:rounded-full sm:px-3 sm:pl-6"
        >
          <Link
            href="#top"
            className="shrink-0 font-mono text-sm font-semibold tracking-tight text-fg"
          >
            azimx.dev
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-3 py-2 text-sm text-fg-muted transition-colors duration-150 hover:text-fg"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-2 md:flex">
            {socialLinks.map((social) => {
              const Icon = socialIcons[social.label];
              if (!social.href) {
                return (
                  <span
                    key={social.label}
                    className="inline-flex h-9 w-9 cursor-not-allowed items-center justify-center rounded-full text-fg-subtle opacity-40"
                    aria-disabled="true"
                    title={`${social.label} link coming soon`}
                  >
                    {Icon ? <Icon className="h-4 w-4" /> : social.label}
                  </span>
                );
              }
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full text-fg-muted transition-colors duration-150 hover:bg-surface hover:text-fg"
                >
                  {Icon ? <Icon className="h-4 w-4" /> : social.label}
                </a>
              );
            })}
            <ThemeToggle />
            <Button
              href={resumeUrl ?? undefined}
              isPlaceholder={!resumeUrl}
              variant="secondary"
              className="ml-1"
            >
              Resume
            </Button>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setIsOpen((open) => !open)}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              className="glass-control inline-flex h-9 w-9 items-center justify-center rounded-full text-fg"
            >
              {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>

        {isOpen ? (
          <div
            id="mobile-menu"
            className="glass-panel mt-2 rounded-[1.4rem] px-5 py-5 md:hidden"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  ref={index === 0 ? firstLinkRef : undefined}
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg px-3 py-3 text-base text-fg-muted transition-colors duration-150 hover:bg-surface hover:text-fg"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-3 border-t border-border pt-4">
              {socialLinks.map((social) => {
                const Icon = socialIcons[social.label];
                if (!social.href) {
                  return (
                    <span
                      key={social.label}
                      className="inline-flex h-9 w-9 cursor-not-allowed items-center justify-center rounded-full text-fg-subtle opacity-40"
                      aria-disabled="true"
                    >
                      {Icon ? <Icon className="h-4 w-4" /> : social.label}
                    </span>
                  );
                }
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full text-fg-muted transition-colors duration-150 hover:bg-surface hover:text-fg"
                  >
                    {Icon ? <Icon className="h-4 w-4" /> : social.label}
                  </a>
                );
              })}
              <Button
                href={resumeUrl ?? undefined}
                isPlaceholder={!resumeUrl}
                variant="secondary"
                className="ml-auto"
              >
                Resume
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
