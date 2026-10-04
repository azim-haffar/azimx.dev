"use client";
import { useEffect, useState } from "react";

export function MotionBackground() {
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    document.documentElement.dataset.motionPaused = String(paused);
    return () => { delete document.documentElement.dataset.motionPaused; };
  }, [paused]);
  return <>
    <div className={`hero-atmosphere ${paused ? "motion-paused" : ""}`} aria-hidden="true"><div /></div>
    <button type="button" aria-pressed={paused} onClick={() => setPaused(!paused)} className="motion-control absolute right-6 top-24 z-10 rounded-full border border-border px-3 py-2 font-mono text-[11px] text-fg-subtle sm:right-8">
      {paused ? "Resume ambient motion" : "Pause ambient motion"}
    </button>
  </>;
}
