"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

type Listener = () => void;
const listeners = new Set<Listener>();

function getSnapshot() {
  return document.documentElement.classList.contains("dark");
}

function getServerSnapshot() {
  return false;
}

function subscribe(listener: Listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function setDark(next: boolean) {
  document.documentElement.classList.toggle("dark", next);
  try {
    localStorage.setItem("theme", next ? "dark" : "light");
  } catch {
    // ignore storage errors (private browsing, disabled storage, etc.)
  }
  listeners.forEach((listener) => listener());
}

export function ThemeToggle() {
  const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <button
      type="button"
      onClick={() => setDark(!isDark)}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-fg-muted transition-colors duration-150 hover:bg-surface hover:text-fg"
    >
      {isDark ? (
        <Sun className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Moon className="h-4 w-4" aria-hidden="true" />
      )}
    </button>
  );
}
