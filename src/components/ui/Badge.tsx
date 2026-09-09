import type { ReactNode } from "react";

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md border border-border bg-surface px-2.5 py-1 font-mono text-xs text-fg-muted transition-colors duration-150 hover:bg-surface-hover hover:text-fg">
      {children}
    </span>
  );
}
