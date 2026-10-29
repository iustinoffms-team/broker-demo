import Link from "next/link";
import { credits, type CalculatorKind } from "@/content/credits";
import { consultants } from "@/content/consultants";
import { BrokerCard } from "./BrokerCard";
import { CreditCalculator } from "./CreditCalculator";
import { CheckIcon } from "./Icons";

export function CreditPageView({ kind }: { kind: CalculatorKind }) {
  const c = credits[kind];
  return (
    <>
      <section className="bg-section">
        <div className="container-x py-8 md:py-12">
          <nav aria-label="Breadcrumb" className="text-sm text-muted">
            <Link href="/">Acasă</Link> <span aria-hidden="true">/</span> <span aria-current="page">{c.name}</span>
          </nav>
          <h1 className="m-0 mt-3 text-[32px] font-extrabold leading-tight tracking-[-0.03em] md:text-[44px]">{c.title}</h1>
          <p className="m-0 mt-3 max-w-[680px] text-lg leading-relaxed text-muted">{c.intro}</p>
          <div className="mt-8">
            <CreditCalculator kind={kind} />
          </div>
        </div>
      </section>

      <section className="container-x grid gap-6 py-14 md:grid-cols-2 md:py-16">
        <div className="card p-6 md:p-8">
          <h2 className="m-0 text-2xl font-extrabold">Ce îți trebuie</h2>
          <ul className="m-0 mt-4 flex list-none flex-col gap-3 p-0">
            {c.needs.map((n) => (
              <li key={n} className="flex gap-3 text-[17px] leading-snug"><CheckIcon className="mt-0.5 size-5 shrink-0 text-success" />{n}</li>
            ))}
          </ul>
        </div>
        <div className="card p-6 md:p-8">
          <h2 className="m-0 text-2xl font-extrabold">Ce facem noi</h2>
          <ul className="m-0 mt-4 flex list-none flex-col gap-3 p-0">
            {c.weDo.map((n) => (
              <li key={n} className="flex gap-3 text-[17px] leading-snug"><CheckIcon className="mt-0.5 size-5 shrink-0 text-success" />{n}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-x pb-14 md:pb-16">
        <h2 className="h2">Cu cine vei vorbi</h2>
        <div className="mt-6"><BrokerCard c={consultants[0]} /></div>
      </section>

      {c.crossSell && (
        <section className="container-x pb-16">
          <div className="flex flex-col gap-3 rounded-2xl bg-petrol-50 p-6 md:flex-row md:items-center md:justify-between md:p-8">
            <div>
              <h2 className="m-0 text-2xl font-extrabold">{c.crossSell.title}</h2>
              <p className="m-0 mt-2 text-[17px] text-muted">{c.crossSell.text}</p>
            </div>
            <Link href={c.crossSell.href} className="shrink-0 text-lg font-bold">{c.crossSell.link}</Link>
          </div>
        </section>
      )}
    </>
  );
}
