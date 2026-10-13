export function WorkMarker({ number, label }: { number: number; label: string }) {
  return <span className="work-marker"><span className="work-marker-number" aria-hidden="true">{String(number).padStart(2, "0")}</span><span className="work-marker-connector" aria-hidden="true" /><span className="min-w-0">{label}</span></span>;
}
