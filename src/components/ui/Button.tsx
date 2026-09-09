import type { AnchorHTMLAttributes, ReactNode } from "react";
import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "ghost";

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-40";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "glass-control-solid",
  secondary: "glass-control text-fg",
  ghost: "text-fg transition-colors duration-150 hover:bg-surface",
};

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant;
  children: ReactNode;
  href?: string;
  /** When true, renders a visually-styled disabled state for unavailable links (e.g. missing resume). */
  isPlaceholder?: boolean;
}

export function Button({
  variant = "primary",
  children,
  href,
  isPlaceholder = false,
  className = "",
  ...props
}: ButtonProps) {
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (isPlaceholder || !href) {
    return (
      <span
        className={`${classes} cursor-not-allowed opacity-50`}
        aria-disabled="true"
        title="Not available yet"
      >
        {children}
      </span>
    );
  }

  const isExternal = href.startsWith("http");

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}
