const stories: Record<string, { question: string; steps: { label: string; detail: string }[]; observation: string; boundary: string }> = {
  seatledger: {
    question: "Where does the last seat get decided?",
    steps: [{ label: "Lock the event", detail: "Serialize lifecycle changes before inspecting capacity." }, { label: "Check time & state", detail: "Sample database time after the lock; enforce strict expiry." }, { label: "Commit together", detail: "Persist the transition, facts, outbox work and retry outcome." }],
    observation: "Concurrency, expiry, replay and rollback behavior are covered by the recorded backend verification.",
    boundary: "A diagram of the implementation—not a live request or a production-scale guarantee."
  },
  orderflow: {
    question: "What survives a broker outage?",
    steps: [{ label: "Accept durably", detail: "Write the order and outbox together in PostgreSQL." }, { label: "Wait & publish", detail: "Pending work can be published after Kafka recovers." }, { label: "Guard the transition", detail: "Lock the order and skip terminal state before changing stock." }],
    observation: "In the recorded local exercise, three orders recovered; stock moved from 27 to 24 and replay left it at 24.",
    boundary: "One controlled local scenario. Delivery remains at least once."
  },
  hirelens: {
    question: "Can feedback stay consistent across a complete journey?",
    steps: [{ label: "Establish the score", detail: "Keep deterministic scoring separate from generated advice." }, { label: "Validate feedback", detail: "Check response structure and exercise failure and retry paths." }, { label: "Keep the context", detail: "Carry the result through tracking, history and deletion." }],
    observation: "The recorded offline journey exercises upload, analysis, feedback, tracking and deletion using synthetic inputs.",
    boundary: "Mocked providers and authentication. This does not establish live model quality."
  },
  "ml-training-inspector": {
    question: "How do you make a training loop understandable?",
    steps: [{ label: "Measure training", detail: "Collect loss, accuracy, gradients and run state." }, { label: "Bound delivery", detail: "Use per-client queues for live WebSocket feedback." }, { label: "Make state visible", detail: "Distinguish completed, stopped and error outcomes." }],
    observation: "The recorded two-epoch synthetic CPU run matched the dashboard charts and epoch table.",
    boundary: "Synthetic results demonstrate the pipeline. Checkpoint resume is unavailable."
  }
};

export function EngineeringStory({ slug }: { slug: string }) {
  const story = stories[slug];
  if (!story) return null;
  return <section className="engineering-story" aria-labelledby="engineering-story-title">
    <p className="eyebrow">The decision, at a glance</p>
    <h2 id="engineering-story-title">{story.question}</h2>
    <ol className="engineering-path">{story.steps.map((step, index) => <li key={step.label}><span className="engineering-node">{String(index + 1).padStart(2, "0")}</span><h3>{step.label}</h3><p>{step.detail}</p></li>)}</ol>
    <div className="engineering-observation"><span>Recorded evidence</span><p>{story.observation}</p><a href="#verification">Read the verification scope ↗</a></div>
    <p className="engineering-boundary">{story.boundary}</p>
  </section>;
}
