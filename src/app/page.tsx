import Link from "next/link";
import { BrokerCard } from "@/components/BrokerCard";
import { Faq } from "@/components/Faq";
import { HeroCalc } from "@/components/HeroCalc";
import { CheckIcon, WhatsAppIcon } from "@/components/Icons";
import { LeadForm } from "@/components/LeadForm";
import { consultants } from "@/content/consultants";
import { creditHref, creditList } from "@/content/credits";
import { faqs } from "@/content/faqs";
import { banks, comparison, hero, reviews, steps } from "@/content/home";
import { site } from "@/content/site";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="bg-section">
        <div className="container-x grid items-center gap-10 py-10 md:py-16 lg:grid-cols-[1fr_460px]">
          <div className="flex flex-col gap-5">
            <p className="eyebrow">{hero.eyebrow}</p>
            <h1 className="m-0 text-[36px] font-extrabold leading-[1.1] tracking-[-0.03em] md:text-[52px]">{hero.title}</h1>
            <p className="m-0 max-w-[560px] text-lg leading-relaxed text-muted">{hero.lead}</p>
            <div className="flex flex-wrap gap-3">
              <a href="#calculator" className="btn btn-primary lg:hidden">Calculează rata</a>
              <a href={site.whatsapp} target="_blank" rel="noopener" className="btn btn-outline">
                <WhatsAppIcon /> Scrie-ne pe WhatsApp
              </a>
            </div>
            <ul className="m-0 flex list-none flex-col gap-2 p-0 sm:flex-row sm:flex-wrap sm:gap-x-6">
              {hero.bullets.map((b) => (
                <li key={b} className="flex items-center gap-2 font-semibold">
                  <CheckIcon className="size-5 text-success" /> {b}
                </li>
              ))}
            </ul>
          </div>
          <div id="calculator" className="scroll-mt-24">
            <HeroCalc />
          </div>
        </div>
      </section>

      {/* Bănci și recenzii */}
      <section className="border-b border-line">
        <div className="container-x flex flex-col items-center gap-5 py-8 lg:flex-row lg:justify-between">
          <p className="m-0 font-semibold text-muted">Lucrăm cu {site.banksCount} bănci din România</p>
          <ul className="m-0 flex list-none flex-wrap justify-center gap-3 p-0">
            {banks.map((b, i) => (
              <li key={i} className="flex h-10 w-28 items-center justify-center rounded-lg bg-section text-xs font-semibold text-subtle">{b}</li>
            ))}
          </ul>
          <p className="m-0 font-bold">
            <span className="text-amber-dark" aria-hidden="true">★★★★★</span> {site.rating} din {site.reviewsCount} recenzii Google
          </p>
        </div>
      </section>

      {/* Tipuri de credit */}
      <section className="container-x py-14 md:py-20">
        <h2 className="h2">Ce credit cauți?</h2>
        <p className="m-0 mt-3 max-w-[640px] text-lg text-muted">
          Alege tipul de credit și vezi în câteva secunde cât ar fi rata. Apoi îți aducem ofertele reale.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {creditList.map((c) => (
            <Link
              key={c.slug}
              href={creditHref[c.slug]}
              id={c.slug}
              className="card group flex flex-col gap-3 p-6 text-ink no-underline transition-shadow hover:text-ink hover:shadow-md"
            >
              <h3 className="m-0 text-xl font-extrabold">{c.name}</h3>
              <p className="m-0 flex-1 leading-relaxed text-muted">{c.short}</p>
              <span className="font-bold text-petrol group-hover:underline">{c.cta}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Pași */}
      <section className="bg-section">
        <div className="container-x py-14 md:py-20">
          <h2 className="h2">Trei pași până la credit</h2>
          <ol className="m-0 mt-8 grid list-none gap-4 p-0 md:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.title} className="card flex flex-col gap-3 p-6">
                <span className="flex size-10 items-center justify-center rounded-full bg-petrol text-lg font-extrabold text-white">{i + 1}</span>
                <h3 className="m-0 text-xl font-extrabold">{s.title}</h3>
                <p className="m-0 leading-relaxed text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Broker vs bancă */}
      <section className="container-x py-14 md:py-20">
        <h2 className="h2">{comparison.title}</h2>
        <p className="m-0 mt-3 max-w-[640px] text-lg text-muted">{comparison.lead}</p>
        <div className="mt-8 overflow-hidden rounded-2xl border border-line">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-section">
                <th scope="col" className="p-4"><span className="sr-only">Criteriu</span></th>
                <th scope="col" className="p-4 font-bold text-muted">Direct la bancă</th>
                <th scope="col" className="p-4 font-extrabold text-petrol">Prin {site.name}</th>
              </tr>
            </thead>
            <tbody>
              {comparison.rows.map((r) => (
                <tr key={r.label} className="border-t border-line">
                  <th scope="row" className="p-4 font-semibold">{r.label}</th>
                  <td className="p-4 text-muted">{r.bank}</td>
                  <td className="p-4 font-bold">
                    <span className="inline-flex items-center gap-2"><CheckIcon className="size-4 text-success" />{r.broker}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Brokerul */}
      <section id="broker" className="bg-section">
        <div className="container-x py-14 md:py-20">
          <h2 className="h2">Cu cine vei vorbi</h2>
          <div className="mt-8 grid gap-4">
            {consultants.map((c) => (
              <BrokerCard key={c.name} c={c} />
            ))}
          </div>
        </div>
      </section>

      {/* Recenzii */}
      <section className="container-x py-14 md:py-20">
        <h2 className="h2">Ce spun clienții</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {reviews.map((r, i) => (
            <figure key={i} className="card m-0 flex flex-col gap-4 p-6">
              <span className="text-amber-dark" aria-label="5 stele">★★★★★</span>
              <blockquote className="m-0 flex-1 text-lg leading-relaxed">„{r.text}”</blockquote>
              <figcaption className="text-sm font-semibold text-muted">{r.author} · {r.credit}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-section">
        <div className="container-x max-w-[880px] py-14 md:py-20">
          <h2 className="h2">Întrebări frecvente</h2>
          <div className="mt-8"><Faq items={faqs} /></div>
        </div>
      </section>

      {/* Formular */}
      <section id="formular" className="scroll-mt-20 bg-petrol text-white">
        <div className="container-x grid gap-10 py-14 md:py-20 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <h2 className="h2">Află ce credit poți obține. Te sunăm noi.</h2>
            <p className="m-0 text-lg leading-relaxed text-white/85">
              Lasă-ne numele și telefonul. Un consultant te sună în maximum 2 ore lucrătoare, {site.hours}.
            </p>
            <a href={site.whatsapp} target="_blank" rel="noopener" className="inline-flex items-center gap-2 font-bold text-white underline hover:text-white">
              <WhatsAppIcon /> Preferi WhatsApp? Scrie-ne aici
            </a>
          </div>
          <div className="card p-6 text-ink md:p-8">
            <LeadForm />
          </div>
        </div>
      </section>
    </>
  );
}
