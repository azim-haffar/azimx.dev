"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChartNoAxesCombined, FlaskConical, ScanLine } from "lucide-react";

const tracks = [
  {
    name: "Training", icon: ChartNoAxesCombined, title: "ML Training Inspector",
    steps: ["Seed a CPU run", "Stream metrics", "Inspect the checkpoint"],
    evidence: "A recorded synthetic PyTorch run matched the dashboard charts and epoch table.",
    scope: "The run verifies the metrics pipeline. Checkpoint resume is unavailable.",
    href: "/projects/ml-training-inspector#training-playground", action: "Explore the recorded run",
  },
  {
    name: "LLM workflows", icon: FlaskConical, title: "Skina",
    steps: ["Review constraints", "Select deterministically", "Explain the selection"],
    evidence: "Fictional fixtures and a frozen evaluation exercise the workflow and preserve misses.",
    scope: "The local shopper interface uses mocked explanations. The gated adapter cannot change the basket.",
    href: "/projects/skina", action: "Read the Skina case study",
  },
  {
    name: "Model evaluation", icon: ScanLine, title: "MotionTrace",
    steps: ["Start from an annotation", "Compare trackers", "Report the result"],
    evidence: "Causal ZNCC outperformed the learned candidate on Dice and centroid error in five of six evaluation patients.",
    scope: "A small descriptive comparison on exposed evaluation data. No clinical validation.",
    href: "/projects/motiontrace", action: "Read the comparison",
  },
];

export function AIExplorer() {
  const [selected, select] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const track = tracks[selected];

  return <section className="ai-explorer" aria-labelledby="explorer-title">
    <h2 id="explorer-title">Project workflows</h2>
    <div className="ai-controls" role="group" aria-label="Choose a project workflow">
      {tracks.map(({ name, icon: Icon }, index) => (
        <button key={name} type="button" aria-pressed={selected === index} aria-controls="ai-evidence" onClick={() => { if (selected !== index) { select(index); setHasInteracted(true); } }}>
          <Icon size={17} aria-hidden="true" />{name}
        </button>
      ))}
    </div>
    <div id="ai-evidence">
      <div aria-live="polite">
        <h3>{track.title}</h3>
        <ol key={track.name} className="ai-pipeline" data-animate={hasInteracted}>{track.steps.map(step => <li key={step}>{step}</li>)}</ol>
        <p>{track.evidence}</p>
        <p className="ai-scope">{track.scope}</p>
      </div>
      <Link href={track.href}>{track.action}<ArrowRight size={16} aria-hidden="true" /></Link>
    </div>
  </section>;
}
