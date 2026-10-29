"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { isDemo, site } from "@/content/site";
import { CheckIcon, WhatsAppIcon } from "./Icons";
import { LEAD_STORAGE_KEY, type SummaryRow } from "./LeadForm";

export function ThankYou() {
  const [data, setData] = useState<{ prenume?: string; summary: SummaryRow[] }>({ summary: [] });
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(LEAD_STORAGE_KEY);
      if (raw) setData(JSON.parse(raw));
    } catch {}
  }, []);

  return (
    <section className="container-x max-w-[720px] py-16 md:py-24">
      <span className="flex size-16 items-center justify-center rounded-full bg-success text-white">
        <CheckIcon className="size-8" />
      </span>
      <h1 className="m-0 mt-6 text-[32px] font-extrabold tracking-[-0.03em] md:text-[42px]">
        Mulțumim{data.prenume ? `, ${data.prenume}` : ""}! Am primit cererea.
      </h1>
      <p className="m-0 mt-4 text-lg leading-relaxed text-muted">
        Un consultant te sună în maximum 2 ore lucrătoare. Ca să fie mai rapid, pregătește cartea de identitate și o idee despre venitul net.
      </p>
      {isDemo && (
        <p className="m-0 mt-4 rounded-[10px] bg-section p-4 text-sm font-semibold text-muted">
          În demo, cererea nu este trimisă. În versiunea finală, datele și calculul ajung pe emailul brokerului.
        </p>
      )}
      {data.summary.length > 0 && (
        <dl className="card m-0 mt-6 flex flex-col gap-3 p-6">
          {data.summary.map((r) => (
            <div key={r.label} className="flex justify-between gap-4">
              <dt className="text-muted">{r.label}</dt>
              <dd className="tabular m-0 font-bold">{r.value}</dd>
            </div>
          ))}
        </dl>
      )}
      <div className="mt-8 flex flex-wrap gap-3">
        <a href={site.whatsapp} target="_blank" rel="noopener" className="btn btn-whatsapp">
          <WhatsAppIcon /> Scrie-ne pe WhatsApp
        </a>
        <Link href="/#calculator" className="btn btn-outline">Fă un calcul nou</Link>
      </div>
    </section>
  );
}
