"use client";

import { useState } from "react";
import { ArrowDown, ArrowUp, Plus, X, RotateCcw, Play } from "lucide-react";
import { modules, inspectPipeline, type ModuleId } from "./play-lab-model";

export function PipelinePlayLab() {
  const [pipeline,setPipeline] = useState<ModuleId[]>([]);
  const [offline,setOffline] = useState(false);
  const [phase,setPhase] = useState<"idle"|"pending"|"done">("idle");
  const [replays,setReplays] = useState(0);
  const [message,setMessage] = useState("Choose a module to start building. You can reorder it afterward.");
  function edit(next: ModuleId[]) { setPipeline(next); setPhase("idle"); setReplays(0); setMessage("Pipeline changed. Run the sample to test this arrangement."); }
  function move(index: number, direction: number) { const next=[...pipeline]; [next[index],next[index+direction]]=[next[index+direction],next[index]]; edit(next); }
  function run() {
    const problem=inspectPipeline(pipeline);
    if(problem) {setMessage(problem);return;}
    if(offline && phase === "done") {setMessage("The order is already confirmed. Kafka is offline, so a replay cannot be delivered yet; the previous stock deduction remains. Bring the broker online to replay.");return;}
    if(offline) {setPhase("pending");setMessage("Saved, but not delivered. Your event is waiting durably; inventory stays at 5. Bring the broker online and run the sample again.");return;}
    if(phase === "done") {setReplays(count=>count+1);setMessage("Duplicate event detected. The terminal-order guard skips the inventory change. Stock stays at 4.");return;}
    setPhase("done");setMessage(phase === "pending" ? "Recovered! The saved event is delivered and one unit is deducted. Replay it to test the guard." : "Connected! Your sample reached inventory and deducted one unit. Try an outage or replay the event.");
  }
  return <div className="play-builder mt-8 rounded-2xl border border-border bg-bg-subtle p-5 sm:p-8">
    <div className="flex flex-wrap items-center justify-between gap-3"><h2 className="text-xl font-semibold">Build a path for one order.</h2><span className="font-mono text-xs text-blue">4 modules · 1 sample · no timer</span></div>
    <p className="mt-3 text-sm leading-7 text-fg-muted">Choose modules, arrange their order, then run your sample. Try saving before delivery. Can your pipeline handle an unavailable broker and a repeated event?</p>
    <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" aria-label="Available modules">{[...modules].reverse().map(module => <button key={module.id} type="button" disabled={pipeline.includes(module.id)} onClick={()=>edit([...pipeline,module.id])} className="play-module rounded-xl border border-border bg-bg p-4 text-left disabled:opacity-40"><span className="flex items-center justify-between gap-2 font-medium">{module.name}<Plus size={16} aria-hidden="true" /></span><span className="mt-2 block text-xs leading-6 text-fg-muted">{module.hint}</span><span className="mt-2 block font-mono text-[10px] text-blue">{pipeline.includes(module.id)?"ADDED":"ADD MODULE"}</span></button>)}</div>
    <div className="mt-6 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
      <div><h3 className="text-sm font-medium">Your pipeline</h3><ol className="mt-3 space-y-2">{pipeline.length ? pipeline.map((id,index)=><li key={id} className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border bg-bg p-3"><span className="min-w-0 text-sm"><span className="mr-3 font-mono text-xs text-blue">0{index+1}</span>{modules.find(module=>module.id===id)?.name}</span><div className="flex shrink-0 gap-1"><button type="button" aria-label={`Move ${id} earlier`} disabled={index===0} onClick={()=>move(index,-1)} className="play-icon"><ArrowUp size={16} aria-hidden="true" /></button><button type="button" aria-label={`Move ${id} later`} disabled={index===pipeline.length-1} onClick={()=>move(index,1)} className="play-icon"><ArrowDown size={16} aria-hidden="true" /></button><button type="button" aria-label={`Remove ${id}`} onClick={()=>edit(pipeline.filter(item=>item!==id))} className="play-icon"><X size={16} aria-hidden="true" /></button></div></li>):<li className="rounded-xl border border-dashed border-border p-6 text-sm leading-7 text-fg-muted">Your canvas is empty. Pick a module above—there’s no penalty for trying a different order.</li>}</ol></div>
      <div className="rounded-xl border border-border bg-bg p-4"><h3 className="text-sm font-medium">Test bench</h3><label className="mt-3 flex min-h-11 cursor-pointer items-center gap-3 text-sm"><input type="checkbox" checked={offline} onChange={event=>setOffline(event.target.checked)} className="h-5 w-5 accent-accent" />Broker unavailable</label><p className="mt-3 font-mono text-xs text-blue">{offline?"BROKER OFFLINE":"BROKER ONLINE"}</p><div className="mt-4 flex gap-2" aria-hidden="true">{Array.from({length:5},(_,index)=><span key={index} className={`play-stock ${phase==="done"&&index===4?"is-used":""}`} />)}</div><p className="mt-2 text-sm text-fg-muted">Stock: {phase==="done"?4:5} / 5 · Replay attempts: {replays}</p><p className="mt-3 text-xs leading-6 text-fg-muted">Editing modules resets this sample. Changing broker availability preserves its state.</p></div>
    </div>
    <div className="mt-6 flex flex-wrap gap-3"><button type="button" onClick={run} className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-bg"><Play size={16} aria-hidden="true" />{phase==="done"?"Replay sample":"Run sample"}</button><button type="button" onClick={()=>{edit([]);setOffline(false);setMessage("Fresh canvas. Choose a module to start again.");}} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-border px-4 py-3 text-sm"><RotateCcw size={16} aria-hidden="true" />Start over</button></div>
    <p role="status" className="mt-4 min-h-24 rounded-xl border border-border bg-bg p-4 text-sm leading-7 text-fg-muted">{message}</p>
  </div>;
}
