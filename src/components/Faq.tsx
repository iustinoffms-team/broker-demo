export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="flex flex-col divide-y divide-line rounded-2xl border border-line bg-white">
      {items.map((f) => (
        <details key={f.q} className="group px-5 md:px-6">
          <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-4 text-lg font-bold [&::-webkit-details-marker]:hidden">
            {f.q}
            <span aria-hidden="true" className="text-2xl text-petrol transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="m-0 pb-5 text-[17px] leading-relaxed text-muted">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
