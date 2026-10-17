export function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return <div className="chapter-heading"><p className="chapter-label"><span aria-hidden="true" />{eyebrow}</p><div className="chapter-heading-body"><h2>{title}</h2>{description && <p>{description}</p>}</div></div>;
}
