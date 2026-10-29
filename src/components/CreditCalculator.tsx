"use client";

import { useState, type ReactNode } from "react";
import { credits, ranges, type CalculatorKind } from "@/content/credits";
import { site } from "@/content/site";
import { calculCuAvans, calculRata, calculRefinantare, capacitateImprumut } from "@/lib/calc";
import { fmt, fmtAni, fmtLei, fmtProcent } from "@/lib/format";
import { LeadForm, type SummaryRow } from "./LeadForm";
import { Slider } from "./Slider";
import { WhatsAppIcon } from "./Icons";

interface View {
  inputs: ReactNode;
  main: { label: string; value: string };
  rows: SummaryRow[];
  summary: SummaryRow[];
}

function useNums<T extends Record<string, { default: number }>>(r: T) {
  const init = Object.fromEntries(Object.entries(r).map(([k, v]) => [k, v.default])) as Record<keyof T, number>;
  const [s, setS] = useState(init);
  const set = (k: keyof T) => (v: number) => setS((p) => ({ ...p, [k]: v }));
  return [s, set] as const;
}

function IpotecarView(): View {
  const r = ranges.ipotecar;
  const [s, set] = useNums(r);
  const [tab, setTab] = useState<"rata" | "max">("rata");
  const res = calculRata(s.suma, s.ani, s.dob);
  const cap = capacitateImprumut(s.venit, s.rate, s.ani, s.dob);
  const common = (
    <>
      <Slider label="Perioada" range={r.ani} value={s.ani} onChange={set("ani")} display={fmtAni(s.ani)} minLabel="5 ani" maxLabel="35 ani" />
      <Slider label="Dobânda anuală estimată" range={r.dob} value={s.dob} onChange={set("dob")} display={`${fmtProcent(s.dob)}%`} minLabel="3%" maxLabel="10%" />
    </>
  );
  const tabs = (
    <div role="tablist" aria-label="Tip calcul" className="grid grid-cols-2 gap-1 rounded-xl bg-section p-1">
      {(["rata", "max"] as const).map((t) => (
        <button
          key={t}
          role="tab"
          type="button"
          aria-selected={tab === t}
          onClick={() => setTab(t)}
          className={`min-h-11 rounded-[10px] font-bold ${tab === t ? "bg-white text-petrol shadow-sm" : "text-muted"}`}
        >
          {t === "rata" ? "Rata lunară" : "Cât pot împrumuta"}
        </button>
      ))}
    </div>
  );
  if (tab === "rata") {
    return {
      inputs: (
        <>
          {tabs}
          <Slider label="Suma împrumutată" range={r.suma} value={s.suma} onChange={set("suma")} display={fmtLei(s.suma)} minLabel="50.000" maxLabel="1.500.000" />
          {common}
        </>
      ),
      main: { label: "Rata ta lunară estimată", value: fmtLei(res.rata) },
      rows: [
        { label: "Total de plată", value: fmtLei(res.total) },
        { label: "Din care dobândă", value: fmtLei(res.dobandaTotala) },
        { label: "Venit net minim recomandat", value: fmtLei(res.venitMinim) },
      ],
      summary: [
        { label: "Credit", value: "Ipotecar" },
        { label: "Suma", value: fmtLei(s.suma) },
        { label: "Perioada", value: fmtAni(s.ani) },
        { label: "Rata estimată", value: fmtLei(res.rata) },
      ],
    };
  }
  return {
    inputs: (
      <>
        {tabs}
        <Slider label="Venitul net lunar al familiei" range={r.venit} value={s.venit} onChange={set("venit")} display={fmtLei(s.venit)} minLabel="2.000" maxLabel="40.000" />
        <Slider label="Rate pe care le plătești deja" range={r.rate} value={s.rate} onChange={set("rate")} display={fmtLei(s.rate)} minLabel="0" maxLabel="10.000" />
        {common}
      </>
    ),
    main: { label: "Poți împrumuta aproximativ", value: fmtLei(cap.sumaMaxima) },
    rows: [
      { label: "Rata maximă (40% din venit)", value: fmtLei(cap.rataMaxima) },
      { label: "Perioada", value: fmtAni(s.ani) },
    ],
    summary: [
      { label: "Credit", value: "Ipotecar" },
      { label: "Venit net", value: fmtLei(s.venit) },
      { label: "Poate împrumuta", value: fmtLei(cap.sumaMaxima) },
      { label: "Perioada", value: fmtAni(s.ani) },
    ],
  };
}

function NevoiPersonaleView(): View {
  const r = ranges["nevoi-personale"];
  const [s, set] = useNums(r);
  const res = calculRata(s.suma, s.ani, s.dob);
  return {
    inputs: (
      <>
        <Slider label="Suma dorită" range={r.suma} value={s.suma} onChange={set("suma")} display={fmtLei(s.suma)} minLabel="5.000" maxLabel="250.000" />
        <Slider label="Perioada" range={r.ani} value={s.ani} onChange={set("ani")} display={fmtAni(s.ani)} minLabel="1 an" maxLabel="10 ani" />
        <Slider label="Dobânda anuală estimată" range={r.dob} value={s.dob} onChange={set("dob")} display={`${fmtProcent(s.dob)}%`} minLabel="5%" maxLabel="20%" />
      </>
    ),
    main: { label: "Rata ta lunară estimată", value: fmtLei(res.rata) },
    rows: [
      { label: "Total de plată", value: fmtLei(res.total) },
      { label: "Din care dobândă", value: fmtLei(res.dobandaTotala) },
      { label: "Venit net minim recomandat", value: fmtLei(res.venitMinim) },
    ],
    summary: [
      { label: "Credit", value: "Nevoi personale" },
      { label: "Suma", value: fmtLei(s.suma) },
      { label: "Perioada", value: fmtAni(s.ani) },
      { label: "Rata estimată", value: fmtLei(res.rata) },
    ],
  };
}

function RefinantareView(): View {
  const r = ranges.refinantare;
  const [s, set] = useNums(r);
  const res = calculRefinantare(s.sold, s.ani, s.dobActuala, s.dobNoua);
  const castig = res.economieLunara > 0;
  return {
    inputs: (
      <>
        <Slider label="Cât mai ai de plătit (sold)" range={r.sold} value={s.sold} onChange={set("sold")} display={fmtLei(s.sold)} minLabel="20.000" maxLabel="1.500.000" />
        <Slider label="Ani rămași" range={r.ani} value={s.ani} onChange={set("ani")} display={fmtAni(s.ani)} minLabel="1 an" maxLabel="35 ani" />
        <Slider label="Dobânda ta actuală" range={r.dobActuala} value={s.dobActuala} onChange={set("dobActuala")} display={`${fmtProcent(s.dobActuala)}%`} minLabel="3%" maxLabel="15%" />
        <Slider label="Dobânda nouă estimată" range={r.dobNoua} value={s.dobNoua} onChange={set("dobNoua")} display={`${fmtProcent(s.dobNoua)}%`} minLabel="3%" maxLabel="15%" />
      </>
    ),
    main: {
      label: castig ? "Economisești lunar aproximativ" : "Cu aceste dobânzi nu economisești",
      value: fmtLei(Math.max(0, res.economieLunara)),
    },
    rows: [
      { label: "Rata actuală", value: fmtLei(res.rataActuala) },
      { label: "Rata nouă estimată", value: fmtLei(res.rataNoua) },
      { label: "Economie pe toată perioada", value: fmtLei(Math.max(0, res.economieTotala)) },
    ],
    summary: [
      { label: "Credit", value: "Refinanțare" },
      { label: "Sold", value: fmtLei(s.sold) },
      { label: "Dobânda actuală", value: `${fmtProcent(s.dobActuala)}%` },
      { label: "Economie lunară", value: fmtLei(Math.max(0, res.economieLunara)) },
    ],
  };
}

function NouaCasaView(): View {
  const r = ranges["noua-casa"];
  const [s, set] = useNums(r);
  const res = calculCuAvans(s.pret, s.avans, s.ani, s.dob);
  return {
    inputs: (
      <>
        <Slider label="Prețul locuinței" range={r.pret} value={s.pret} onChange={set("pret")} display={fmtLei(s.pret)} minLabel="100.000" maxLabel="1.000.000" />
        <Slider label="Avans" range={r.avans} value={s.avans} onChange={set("avans")} display={`${s.avans}%`} minLabel="5%" maxLabel="30%" />
        <Slider label="Perioada" range={r.ani} value={s.ani} onChange={set("ani")} display={fmtAni(s.ani)} minLabel="5 ani" maxLabel="30 de ani" />
        <Slider label="Dobânda anuală estimată" range={r.dob} value={s.dob} onChange={set("dob")} display={`${fmtProcent(s.dob)}%`} minLabel="3%" maxLabel="10%" />
      </>
    ),
    main: { label: "Rata ta lunară estimată", value: fmtLei(res.rata) },
    rows: [
      { label: "Avansul tău", value: fmtLei(res.avans) },
      { label: "Suma împrumutată", value: fmtLei(res.credit) },
    ],
    summary: [
      { label: "Credit", value: "Noua Casă" },
      { label: "Preț locuință", value: fmtLei(s.pret) },
      { label: "Avans", value: `${s.avans}% (${fmtLei(res.avans)})` },
      { label: "Rata estimată", value: fmtLei(res.rata) },
    ],
  };
}

const views: Record<CalculatorKind, () => View> = {
  ipotecar: IpotecarView,
  "nevoi-personale": NevoiPersonaleView,
  refinantare: RefinantareView,
  "noua-casa": NouaCasaView,
};

export function CreditCalculator({ kind }: { kind: CalculatorKind }) {
  const v = views[kind]();
  const [step, setStep] = useState<"calc" | "form">("calc");
  const credit = credits[kind];
  const waText = encodeURIComponent(
    `Bună ziua! Am făcut un calcul pe site:\n${v.summary.map((r) => `${r.label}: ${r.value}`).join("\n")}`,
  );

  if (step === "form") {
    return (
      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <div className="card p-6 md:p-8">
          <p className="eyebrow">Pasul 2 din 2</p>
          <h2 className="m-0 mt-2 text-[28px] font-extrabold tracking-[-0.02em]">Unde te putem contacta?</h2>
          <p className="m-0 mb-6 mt-2 text-muted">Te sunăm în maximum 2 ore lucrătoare, de luni până vineri, 9:00–18:00.</p>
          <LeadForm defaultType={credit.leadType} summary={v.summary} />
          <button type="button" onClick={() => setStep("calc")} className="mt-4 min-h-11 font-bold text-petrol">
            ← Înapoi la calculator
          </button>
        </div>
        <aside className="card h-fit bg-section p-6">
          <p className="m-0 font-bold">Calculul tău, trimis odată cu cererea</p>
          <dl className="m-0 mt-4 flex flex-col gap-3">
            {v.summary.map((r) => (
              <div key={r.label} className="flex justify-between gap-4 border-b border-line pb-3 last:border-0">
                <dt className="text-muted">{r.label}</dt>
                <dd className="tabular m-0 font-bold">{r.value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_420px]">
      <div className="card flex flex-col gap-6 p-6 md:p-8">{v.inputs}</div>
      <div className="flex flex-col gap-4 rounded-2xl bg-petrol p-6 text-white md:p-8">
        <p className="m-0 font-semibold text-white/80">{v.main.label}</p>
        <p className="tabular m-0 text-[44px] font-extrabold leading-none tracking-[-0.02em]" aria-live="polite">
          {v.main.value}
        </p>
        <dl className="m-0 flex flex-col gap-2 border-t border-white/20 pt-4">
          {v.rows.map((r) => (
            <div key={r.label} className="flex justify-between gap-4">
              <dt className="text-white/80">{r.label}</dt>
              <dd className="tabular m-0 font-bold">{r.value}</dd>
            </div>
          ))}
        </dl>
        <div className="rounded-xl bg-white/10 p-4 text-[15px] leading-snug">
          <strong>Un broker poate scădea rata.</strong> Comparăm {site.banksCount} bănci și negociem dobânda pentru profilul tău.
        </div>
        <button type="button" onClick={() => setStep("form")} className="btn btn-primary w-full text-lg">
          Vreau oferte reale de la bănci
        </button>
        <a href={`${site.whatsapp}?text=${waText}`} target="_blank" rel="noopener" className="inline-flex items-center justify-center gap-2 font-bold text-white hover:text-white">
          <WhatsAppIcon className="size-4" /> sau trimite calculul pe WhatsApp
        </a>
        <p className="m-0 text-[13px] leading-snug text-white/75">
          Estimare orientativă, nu o ofertă fermă. DAE și costul total diferă de la o bancă la alta.
        </p>
      </div>
    </div>
  );
}
