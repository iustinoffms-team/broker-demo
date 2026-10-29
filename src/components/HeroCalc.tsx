"use client";

import Link from "next/link";
import { useState } from "react";
import { creditHref, ranges } from "@/content/credits";
import { calculRata } from "@/lib/calc";
import { fmt, fmtAni, fmtLei, fmtProcent } from "@/lib/format";
import { Slider } from "./Slider";

const tabs = [
  { key: "ipotecar", label: "Ipotecar", suma: ranges.ipotecar.suma, ani: ranges.ipotecar.ani, dob: ranges.ipotecar.dob.default },
  { key: "nevoi-personale", label: "Nevoi personale", suma: ranges["nevoi-personale"].suma, ani: ranges["nevoi-personale"].ani, dob: ranges["nevoi-personale"].dob.default },
  { key: "refinantare", label: "Refinanțare", suma: ranges.refinantare.sold, ani: ranges.refinantare.ani, dob: ranges.refinantare.dobNoua.default },
] as const;

export function HeroCalc() {
  const [i, setI] = useState(0);
  const t = tabs[i];
  const [suma, setSuma] = useState<number>(t.suma.default);
  const [ani, setAni] = useState<number>(t.ani.default);
  const res = calculRata(suma, ani, t.dob);

  function pick(n: number) {
    setI(n);
    setSuma(tabs[n].suma.default);
    setAni(tabs[n].ani.default);
  }

  return (
    <div className="card flex flex-col gap-5 p-6 shadow-[0_12px_40px_rgba(15,27,45,0.08)] md:p-7">
      <p className="m-0 text-lg font-extrabold">Calculează rapid rata</p>
      <div role="tablist" aria-label="Tip credit" className="grid grid-cols-3 gap-1 rounded-xl bg-section p-1">
        {tabs.map((x, n) => (
          <button
            key={x.key}
            role="tab"
            type="button"
            aria-selected={i === n}
            onClick={() => pick(n)}
            className={`min-h-11 rounded-[10px] px-1 text-sm font-bold ${i === n ? "bg-white text-petrol shadow-sm" : "text-muted"}`}
          >
            {x.label}
          </button>
        ))}
      </div>
      <Slider label="Suma dorită" range={t.suma} value={suma} onChange={setSuma} display={fmtLei(suma)} minLabel={fmt(t.suma.min)} maxLabel={fmt(t.suma.max)} />
      <Slider label="Perioada" range={t.ani} value={ani} onChange={setAni} display={fmtAni(ani)} minLabel={fmtAni(t.ani.min)} maxLabel={fmtAni(t.ani.max)} />
      <div className="rounded-xl bg-petrol-50 p-4">
        <p className="m-0 text-sm font-semibold text-muted">Rata lunară estimată, la o dobândă de {fmtProcent(t.dob)}%</p>
        <p className="tabular m-0 mt-1 text-[40px] font-extrabold leading-tight text-petrol" aria-live="polite">
          {fmtLei(res.rata)}
        </p>
        <p className="tabular m-0 text-sm text-muted">Total de plată: aprox. {fmtLei(res.total)}</p>
      </div>
      <Link href={creditHref[t.key]} className="btn btn-primary w-full text-lg">
        Vreau oferte reale de la bănci
      </Link>
      <p className="m-0 text-[13px] leading-snug text-subtle">
        Estimare orientativă, nu o ofertă fermă. DAE și costul total diferă de la o bancă la alta.
      </p>
    </div>
  );
}
