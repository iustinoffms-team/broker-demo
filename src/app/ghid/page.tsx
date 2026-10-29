import type { Metadata } from "next";
import Link from "next/link";
import { articles } from "@/content/articles";

export const metadata: Metadata = { title: "Ghid credite", description: "Explicații pe înțeles despre credite, DAE, acte și refinanțare." };

export default function Ghid() {
  return (
    <section className="container-x py-12 md:py-16">
      <h1 className="m-0 text-[36px] font-extrabold tracking-[-0.03em] md:text-[44px]">Ghid credite</h1>
      <p className="m-0 mt-3 max-w-[640px] text-lg text-muted">Explicații scurte, pe înțeles, ca să iei decizia corectă.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {articles.map((a) => (
          <Link key={a.slug} href={`/ghid/${a.slug}/`} className="card group flex flex-col gap-3 p-6 text-ink no-underline hover:text-ink hover:shadow-md">
            <span className="text-sm font-semibold text-subtle">{a.readMinutes} minute de citit</span>
            <h2 className="m-0 text-xl font-extrabold leading-snug">{a.title}</h2>
            <p className="m-0 flex-1 leading-relaxed text-muted">{a.excerpt}</p>
            <span className="font-bold text-petrol group-hover:underline">Citește →</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
