"use client";

import { useEffect, useState } from "react";
import { Play, Pause, RotateCcw, ArrowRight } from "lucide-react";

// Recorded synthetic CPU observations; playback timing is illustrative.
const epochs = [
  { epoch: 1, trainLoss: 1.17077, validationLoss: 2.18514, trainAccuracy: 63.75, validationAccuracy: 20 },
  { epoch: 2, trainLoss: 0.06278, validationLoss: 2.07824, trainAccuracy: 100, validationAccuracy: 10 },
];

export function TrainingPlayground() {
  const [visible, setVisible] = useState(0);
  const [selected, setSelected] = useState(1);
  const [running, setRunning] = useState(false);
  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(() => {
      const next = visible + 1;
      setVisible(next);
      setSelected(next);
      if (next === epochs.length) setRunning(false);
    }, 1800);
    return () => window.clearTimeout(timer);
  }, [running, visible]);
  function start() {
    if (visible === epochs.length) { setVisible(0); setSelected(1); }
    setRunning(true);
  }
  function step() {
    setRunning(false);
    const next = Math.min(visible + 1, epochs.length);
    setVisible(next);
    setSelected(next);
  }
  const current = visible ? epochs[selected - 1] : null;
  const status = running ? "Playing" : visible === epochs.length ? "Playback complete" : visible ? "Paused" : "Ready";
  return <section id="training-playground" className="training-playground my-12 scroll-mt-28 rounded-2xl border border-border p-5 sm:p-8" aria-labelledby="training-playground-title">
    <div className="flex flex-wrap items-center justify-between gap-3"><p className="eyebrow text-blue">Explore a training run</p><span className="rounded-full border border-border px-3 py-1 font-mono text-xs text-fg-muted">Recorded data · simulated playback</span></div>
    <h2 id="training-playground-title" className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">Lower loss. Better model?</h2>
    <p className="mt-3 max-w-2xl text-sm leading-7 text-fg-muted">Play two recorded epochs from the seeded synthetic CPU demo. Pause and compare training with validation. No model runs in your browser; playback timing is illustrative.</p>
    <div className="mt-6 flex flex-wrap gap-3">
      <button type="button" onClick={running ? () => setRunning(false) : start} className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-bg">{running ? <Pause size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" />}{running ? "Pause playback" : visible === epochs.length ? "Play again" : visible ? "Continue playback" : "Start playback"}</button>
      <button type="button" onClick={step} disabled={visible === epochs.length} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-border px-4 py-3 text-sm disabled:opacity-40">Next epoch<ArrowRight size={16} aria-hidden="true" /></button>
      <button type="button" onClick={() => { setRunning(false); setVisible(0); setSelected(1); }} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-border px-4 py-3 text-sm"><RotateCcw size={16} aria-hidden="true" />Reset</button>
    </div>
    <div className="mt-5 flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-fg-muted" role="status">{status} · {visible} / 2 epochs revealed<span>Seed 42 · SimpleCNN · CPU</span></div>
    <div className="mt-3 h-1 overflow-hidden rounded-full bg-border" aria-hidden="true"><div className="h-full bg-accent" style={{ width: `${visible * 50}%` }} /></div>
    <div className="mt-6 rounded-xl border border-border bg-bg p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3"><h3 className="text-sm font-medium">Training vs. validation loss</h3><div className="flex gap-4 text-xs"><span className="text-accent">● Training</span><span className="text-blue">● Validation</span></div></div>
      <svg viewBox="0 0 420 180" className="mt-4 w-full" role="img" aria-label={visible ? `Loss comparison for ${visible} recorded epochs. Exact values appear below.` : "Loss chart awaiting playback. Start playback or select Next epoch."}>
        {[0,1,2].map(value => <g key={value}><line x1="40" x2="400" y1={150-value*55} y2={150-value*55} stroke="var(--color-border)" /><text x="5" y={154-value*55} fill="var(--color-fg-muted)" fontSize="12">{value}</text></g>)}
        {visible === 2 && <><line x1="90" y1={150-epochs[0].trainLoss*55} x2="350" y2={150-epochs[1].trainLoss*55} stroke="var(--color-accent)" strokeWidth="3" /><line x1="90" y1={150-epochs[0].validationLoss*55} x2="350" y2={150-epochs[1].validationLoss*55} stroke="var(--color-blue)" strokeWidth="3" strokeDasharray="6 4" /></>}
        {epochs.slice(0,visible).map((epoch,index) => <g key={epoch.epoch}><circle cx={90+index*260} cy={150-epoch.trainLoss*55} r="5" fill="var(--color-accent)" /><circle cx={90+index*260} cy={150-epoch.validationLoss*55} r="5" fill="var(--color-blue)" /><text x={65+index*260} y="175" fill="var(--color-fg-muted)" fontSize="12">Epoch {epoch.epoch}</text></g>)}
      </svg>
      <div className="mt-3 flex flex-wrap gap-2" aria-label="Inspect a recorded epoch">{epochs.slice(0,visible).map(epoch => <button key={epoch.epoch} type="button" aria-pressed={selected === epoch.epoch} onClick={() => { setRunning(false); setSelected(epoch.epoch); }} className={`min-h-11 rounded-lg border px-4 text-sm ${selected === epoch.epoch ? "border-accent text-accent" : "border-border text-fg-muted"}`}>Inspect epoch {epoch.epoch}</button>)}</div>
      <div className="mt-4 min-h-28" aria-live="polite" aria-atomic="true">{current ? <><p className="text-sm font-medium">Epoch {current.epoch}</p><dl className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-4">{[["Train loss",current.trainLoss.toFixed(5)],["Validation loss",current.validationLoss.toFixed(5)],["Train accuracy",`${current.trainAccuracy}%`],["Validation accuracy",`${current.validationAccuracy}%`]].map(([label,value]) => <div key={label}><dt className="text-xs text-fg-muted">{label}</dt><dd className="mt-1 font-mono text-sm text-fg">{value}</dd></div>)}</dl></> : <p className="text-sm leading-7 text-fg-muted">Start playback or advance one epoch at a time. Exact metrics will appear here.</p>}</div>
    </div>
    <div className="mt-5 border-l-2 border-blue pl-4"><p className="text-sm font-medium">The useful question is what happens outside training.</p><p className="mt-2 text-sm leading-7 text-fg-muted">In this short synthetic run, training accuracy reaches 100% while validation accuracy falls to 10%. These observations verify the reporting pipeline, not model quality. Short-run BatchNorm evaluation differs considerably from training behavior; two epochs do not establish generalization.</p></div>
    <p className="mt-5 text-xs leading-6 text-fg-muted">Source: 4 October 2026 verification · 160 training / 80 validation synthetic examples. Playback pause controls this explanation only; it does not demonstrate backend checkpoint resume. <a href="#verification" className="text-blue underline underline-offset-4">Read project verification</a>.</p>
  </section>;
}
