"use client";

import { useState } from "react";
import { ArrowRight, Check, Database, Radio, PackageCheck } from "lucide-react";

const steps = [
  { title: "Accept an order", label: "REST API", icon: ArrowRight, body: "The Spring Boot API accepts the order request. This is the entry point to the asynchronous processing flow.", decision: "Keep the request path separate from inventory processing." },
  { title: "Persist together", label: "PostgreSQL", icon: Database, body: "The order and its outbox event are written in the same database transaction. A failed transaction does not leave only one of them committed.", decision: "Use a transactional outbox to bridge database writes and event publishing." },
  { title: "Publish the event", label: "Kafka", icon: Radio, body: "The outbox poller waits for Kafka acknowledgement before marking an event published. Retrying delivery can still produce duplicates.", decision: "Publication acknowledgement does not guarantee exactly-once processing." },
  { title: "Process inventory", label: "Row locking", icon: PackageCheck, body: "The consumer locks the order and skips terminal states before locking the product row and checking stock. Client cancellation takes the same order lock; broader concurrency stress testing remains useful.", decision: "Combine an order-state guard with consistent order and product locking." },
];

export function OrderFlowWalkthrough() {
  const [active, setActive] = useState(0);
  const step = steps[active];
  return <section className="walkthrough my-12 rounded-2xl border border-border p-5 sm:p-8" aria-labelledby="walkthrough-title">
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div><p className="eyebrow text-blue">Interactive architecture</p><h2 id="walkthrough-title" className="mt-2 text-2xl font-semibold tracking-tight">Follow an order through the system.</h2></div>
      <span className="rounded-full border border-border px-3 py-1 font-mono text-[10px] text-fg-subtle">Explanation · no backend connection</span>
    </div>
    <div className="my-7 grid grid-cols-2 gap-3 sm:grid-cols-4" aria-label="Architecture steps">
      {steps.map((item, index) => <button key={item.title} type="button" aria-pressed={active === index} aria-controls="order-step-detail" onClick={() => setActive(index)} className={`flow-step rounded-xl border p-4 text-left ${active === index ? "flow-step-active" : "border-border"}`}>
        <item.icon className="mb-4 h-5 w-5" aria-hidden="true" /><span className="block font-mono text-[10px] text-fg-subtle">0{index + 1} / {item.label}</span><span className="mt-2 block text-sm font-medium">{item.title}</span>
      </button>)}
    </div>
    <div id="order-step-detail" aria-live="polite" aria-atomic="true" className="min-h-48 rounded-xl bg-bg p-5 sm:p-6">
      <p className="font-mono text-xs text-accent">STEP 0{active + 1} / 04</p><h3 className="mt-2 text-xl font-semibold">{step.title}</h3><p className="mt-3 text-sm leading-7 text-fg-muted">{step.body}</p><p className="mt-4 flex items-start gap-2 text-sm text-blue"><Check className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />{step.decision}</p>
    </div>
    <div className="mt-5 flex items-center justify-between gap-4"><p className="text-xs text-fg-subtle">Select a step to inspect the decision.</p><button type="button" onClick={() => setActive((active + 1) % steps.length)} className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-accent">{active === 3 ? "Start again" : "Next step"}<ArrowRight className="h-4 w-4" aria-hidden="true" /></button></div>
  </section>;
}
