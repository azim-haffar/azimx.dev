"use client";

import { useState } from "react";
import { ArrowRight, Database, Radio, PackageCheck, RotateCcw } from "lucide-react";

const stages = [
  { title: "Ready for an order", action: "Accept an order with Kafka offline", order: "No order", event: "No event", stock: 10, broker: "Offline", text: "Kafka is unavailable. PostgreSQL remains available. Accept a one-unit order to explore the recovery path." },
  { title: "Accepted. Waiting durably.", action: "Restore Kafka", order: "PLACED", event: "PENDING", stock: 10, broker: "Offline", text: "The order and outbox event are saved together in PostgreSQL. Inventory has not been processed, so stock is unchanged." },
  { title: "Recovered. Processed once.", action: "Replay the event", order: "CONFIRMED", event: "PUBLISHED", stock: 9, broker: "Online", text: "After Kafka returns, publication and consumption can complete. One unit is deducted. Confirmation and the published mark are separate boundaries; this view shows their settled state." },
  { title: "Replayed. Stock unchanged.", action: "Replay again", order: "CONFIRMED", event: "PUBLISHED", stock: 9, broker: "Online", text: "The consumer sees a terminal order state and skips this inventory transition. Replaying this event leaves stock at nine; this is not a general exactly-once guarantee." },
];

export function OrderRecoveryLab() {
  const [active, setActive] = useState(0);
  const [replays, setReplays] = useState(0);
  const [inspected, setInspected] = useState(0);
  const stationNotes = [
    "PostgreSQL stores the order and outbox event in one transaction. Kafka can be offline while this durable write succeeds.",
    "The publisher retries pending events. Kafka acknowledgement and the outbox published mark are separate from consumer completion.",
    "The consumer locks the order, checks its terminal state, then locks the product. A replay of this confirmed order skips the stock transition.",
  ];
  const stage = stages[active];
  function advance() {
    if (active >= 2) setReplays((count) => count + 1);
    setActive((current) => Math.min(current + 1, stages.length - 1));
  }
  return <section id="recovery-lab" className="recovery-lab my-12 scroll-mt-28 rounded-2xl border border-border p-5 sm:p-8" aria-labelledby="recovery-title">
    <p className="eyebrow text-blue">Try the recovery story</p>
    <h2 id="recovery-title" className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">What if Kafka goes offline?</h2>
    <p className="mt-3 text-sm leading-7 text-fg-muted">Illustrative simulation · no backend connection. Starting stock of 10 is an example, not a measurement.</p>
    <ol className="recovery-progress my-6 grid grid-cols-2 gap-2 sm:grid-cols-4" aria-label="Recovery sequence">
      {["Ready", "Pending", "Recovered", "Replayed"].map((label, index) => <li key={label} aria-current={active === index ? "step" : undefined} className={index <= active ? "is-reached" : ""}><span className="font-mono text-xs">0{index + 1}</span><span>{label}</span></li>)}
    </ol>
    <div className="recovery-board mb-6 rounded-xl border border-border bg-bg p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-2"><p className="font-mono text-xs text-fg-muted">ONE ORDER / ONE UNIT</p><span className={`recovery-broker ${active < 2 ? "is-offline" : ""}`}>Kafka {stage.broker.toLowerCase()}</span></div>
      <div className="recovery-stations mt-5">
        {[{ title: "Save", subtitle: "Order + outbox", icon: Database }, { title: "Deliver", subtitle: "Kafka broker", icon: Radio }, { title: "Apply", subtitle: "Inventory guard", icon: PackageCheck }].map(({ title, subtitle, icon: Icon }, index) => <button key={title} type="button" aria-pressed={inspected === index} aria-controls="station-explanation" onClick={() => setInspected(index)} className={`recovery-station ${inspected === index ? "is-inspected" : ""}`}><Icon size={22} aria-hidden="true" /><span className="mt-3 block text-sm font-medium">{title}</span><span className="mt-1 block text-xs text-fg-muted">{subtitle}</span></button>)}
        {active > 0 && <span key={`${active}-${replays}`} className={`recovery-packet ${active === 1 ? "is-waiting" : "is-delivered"}`} aria-hidden="true">{active === 1 ? "EVENT WAITING" : active === 3 ? "REPLAY SKIPPED" : "EVENT DELIVERED"}</span>}
      </div>
      <p id="station-explanation" aria-live="polite" className="mt-4 min-h-20 text-sm leading-7 text-fg-muted">{stationNotes[inspected]}</p>
      <div className="mt-4 border-t border-border pt-4"><div className="flex items-center justify-between gap-2 text-xs"><span className="text-fg-muted">Inventory shelf</span><span className="font-mono text-accent">{stage.stock} / 10 units</span></div><div className="recovery-shelf mt-3" aria-hidden="true">{Array.from({ length: 10 }, (_, index) => <span key={index} className={index >= stage.stock ? "is-used" : ""} />)}</div><p className="mt-3 text-xs text-fg-muted">{active < 2 ? "No deduction while the event waits." : active === 2 ? "One order processed. One unit deducted." : `Replay ${replays}: terminal-order guard keeps stock at 9.`}</p></div>
    </div>
    <div aria-live="polite" aria-atomic="true">
      <div className="grid gap-3 sm:grid-cols-3">
        {[{ label: "Order / PostgreSQL", value: stage.order, icon: Database }, { label: "Outbox / Kafka " + stage.broker.toLowerCase(), value: stage.event, icon: Radio }, { label: "Available stock", value: String(stage.stock), icon: PackageCheck }].map(({ label, value, icon: Icon }) => <div key={label.split(" /")[0]} className="recovery-metric rounded-xl border border-border bg-bg p-4"><Icon className="h-5 w-5 text-blue" aria-hidden="true" /><p className="mt-3 text-xs text-fg-muted">{label}</p><p key={value} className="recovery-value mt-2 break-words font-mono text-xl font-medium text-accent">{value}</p></div>)}
      </div>
      <div className="mt-5 min-h-40"><h3 className="text-lg font-semibold">{stage.title}</h3><p className="mt-2 text-sm leading-7 text-fg-muted">{stage.text}</p><p className="mt-2 font-mono text-xs text-blue">Step {active + 1} of 4 · Replay attempts: {replays}</p></div>
    </div>
    <div className="mt-4 flex flex-wrap gap-3">
      <button type="button" onClick={advance} className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-bg">{stage.action}<ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" /></button>
      <button type="button" onClick={() => { setActive(0); setReplays(0); setInspected(0); }} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-border px-4 py-3 text-sm"><RotateCcw className="h-4 w-4" aria-hidden="true" />Reset</button>
    </div>
    <p className="mt-5 border-t border-border pt-4 text-xs leading-6 text-fg-muted">Measured locally on 6 October: three pending orders recovered, stock moved from 27 to 24, and replay left it at 24. This explanation does not rerun that experiment. <a href="#verification" className="text-blue underline underline-offset-4">Read the case-study verification</a>.</p>
  </section>;
}
