"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import Link from "next/link";
import { CREDIT_TYPES, contactIssues, leadSchema, type CreditType } from "@/lib/lead";
import { isDemo } from "@/content/site";

export interface SummaryRow {
  label: string;
  value: string;
}

export const LEAD_STORAGE_KEY = "lead-demo";

interface Props {
  defaultType?: CreditType;
  /** Când formularul vine dintr-un calculator, tipul e fix și rezumatul pleacă odată cu cererea. */
  summary?: SummaryRow[];
  submitLabel?: string;
}

type Errors = Partial<Record<"nume" | "prenume" | "telefon" | "email" | "tipCredit" | "acord", string>>;

export function LeadForm({ defaultType = "Nu știu încă", summary, submitLabel = "Trimite cererea" }: Props) {
  const router = useRouter();
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    // Honeypot: câmp ascuns pe care doar boții îl completează.
    if (fd.get("website")) return;
    const parsed = leadSchema.safeParse({
      nume: fd.get("nume"),
      prenume: fd.get("prenume"),
      telefon: fd.get("telefon") ?? "",
      email: fd.get("email") ?? "",
      tipCredit: summary ? defaultType : fd.get("tipCredit"),
      acord: fd.get("acord") === "on",
    });
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const k = issue.path[0] as keyof Errors;
        if (!next[k]) next[k] = issue.message;
      }
      for (const i of contactIssues(String(fd.get("telefon") ?? "").trim(), String(fd.get("email") ?? "").trim())) {
        if (!next[i.path]) next[i.path] = i.message;
      }
      setErrors(next);
      const first = (["nume", "prenume", "telefon", "email", "acord"] as const).find((k) => next[k]);
      if (first) (e.currentTarget.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }
    setErrors({});
    setSending(true);
    // În demo nu trimitem nimic: păstrăm doar prenumele și calculul pentru pagina de mulțumire.
    try {
      sessionStorage.setItem(
        LEAD_STORAGE_KEY,
        JSON.stringify({ prenume: parsed.data.prenume, tipCredit: parsed.data.tipCredit, summary: summary ?? [] }),
      );
    } catch {}
    router.push("/multumim/");
  }

  const field = (name: keyof Errors) => ({
    name,
    id: `f-${name}`,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `e-${name}` : undefined,
  });
  const err = (name: keyof Errors) =>
    errors[name] ? (
      <p id={`e-${name}`} role="alert" className="m-0 rounded-[10px] bg-error-bg px-3.5 py-2.5 text-sm font-semibold text-error">
        {errors[name]}
      </p>
    ) : null;

  return (
    <form noValidate onSubmit={onSubmit} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm font-semibold">
          Nume
          <input className="input" autoComplete="family-name" {...field("nume")} />
          {err("nume")}
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-semibold">
          Prenume
          <input className="input" autoComplete="given-name" {...field("prenume")} />
          {err("prenume")}
        </label>
      </div>
      <label className="flex flex-col gap-1.5 text-sm font-semibold">
        Telefon
        <input className="input" type="tel" inputMode="tel" autoComplete="tel" placeholder="07xx xxx xxx" {...field("telefon")} />
        {err("telefon")}
      </label>
      <label className="flex flex-col gap-1.5 text-sm font-semibold">
        <span>
          Email <span className="font-normal text-subtle">(opțional dacă ai lăsat telefonul)</span>
        </span>
        <input className="input" type="email" autoComplete="email" {...field("email")} />
        {err("email")}
      </label>
      {!summary && (
        <label className="flex flex-col gap-1.5 text-sm font-semibold">
          Ce credit te interesează
          <select className="input" defaultValue={defaultType} {...field("tipCredit")}>
            {CREDIT_TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
      )}
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label>
          Website <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <label className="flex items-start gap-3 text-[15px] leading-snug">
        <input type="checkbox" className="mt-0.5 size-6 shrink-0 accent-petrol" {...field("acord")} />
        <span>
          Sunt de acord să fiu contactat și am citit <Link href="/confidentialitate/">politica de confidențialitate</Link>.
        </span>
      </label>
      {err("acord")}
      <button type="submit" disabled={sending} className="btn btn-primary w-full text-lg">
        {sending ? "Se trimite…" : submitLabel}
      </button>
      <p className="m-0 text-center text-sm text-subtle">
        Nu trimitem datele tale către bănci fără acordul tău.
        {isDemo && " În demo, cererea nu este trimisă."}
      </p>
    </form>
  );
}
