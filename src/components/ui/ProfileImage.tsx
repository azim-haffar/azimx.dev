import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { User } from "lucide-react";

const RELATIVE_PATH = "images/profile.webp";

function profileImageExists() {
  try {
    return fs.existsSync(path.join(process.cwd(), "public", RELATIVE_PATH));
  } catch {
    return false;
  }
}

export function ProfileImage() {
  const hasImage = profileImageExists();

  return (
    <div
      className="relative aspect-4/5 w-full max-w-75 overflow-hidden rounded-[2.25rem] sm:max-w-85"
      style={{
        boxShadow:
          "0 24px 64px -28px color-mix(in oklab, var(--color-fg) 35%, transparent)",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 100% at 50% 0%, var(--color-surface), var(--color-bg-subtle))",
        }}
      />
      {hasImage ? (
        <Image
          src={`/${RELATIVE_PATH}`}
          alt="Portrait of Azim Haffar"
          fill
          sizes="(min-width: 640px) 340px, 300px"
          className="relative object-cover"
          priority
        />
      ) : (
        <div className="relative flex h-full w-full flex-col items-center justify-center gap-3 text-fg-subtle">
          <User className="h-14 w-14" strokeWidth={1.1} aria-hidden="true" />
          <span className="font-mono text-[11px] uppercase tracking-widest">
            Photo placeholder
          </span>
        </div>
      )}
      <div
        className="pointer-events-none absolute inset-0 rounded-[2.25rem]"
        style={{
          boxShadow:
            "inset 0 1px 0 color-mix(in oklab, white 25%, transparent), inset 0 0 0 1px color-mix(in oklab, var(--color-fg) 6%, transparent)",
        }}
      />
    </div>
  );
}
