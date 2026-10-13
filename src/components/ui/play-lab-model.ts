export const modules = [
  { id: "accept", name: "Accept", hint: "Receive a sample request." },
  { id: "store", name: "Store", hint: "Keep the request and event together." },
  { id: "deliver", name: "Deliver", hint: "Carry the event to a consumer." },
  { id: "guard", name: "Apply safely", hint: "Check the order before changing inventory." },
] as const;
export type ModuleId = typeof modules[number]["id"];
export function inspectPipeline(pipeline: ModuleId[]) {
  if (pipeline.length !== modules.length) return `Add all four modules. ${modules.length - pipeline.length} still missing.`;
  const mismatch = pipeline.findIndex((id,index) => id !== modules[index].id);
  if (mismatch !== -1) return `Look at position ${mismatch + 1}. ${mismatch === 0 ? "A request must enter before anything can process it." : mismatch === 1 ? "Save the event before attempting delivery, so an outage does not lose accepted work." : "Deliver the event before the consumer can apply its guard."}`;
  return null;
}
