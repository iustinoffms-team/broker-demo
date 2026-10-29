import { z } from "zod";

export const CREDIT_TYPES = [
  "Credit ipotecar",
  "Refinanțare",
  "Nevoi personale",
  "Noua Casă",
  "Nu știu încă",
] as const;

export function normalizePhone(tel: string): string {
  return tel.replace(/[\s.()-]/g, "");
}

export const PHONE_RE = /^(\+40|0)7\d{8}$/;

const baseSchema = z.object({
  nume: z.string().trim().min(2, "Scrie numele tău.").max(60),
  prenume: z.string().trim().min(2, "Scrie prenumele tău.").max(60),
  telefon: z.string().trim().max(20).optional().default(""),
  email: z.string().trim().max(120).optional().default(""),
  tipCredit: z.enum(CREDIT_TYPES),
  acord: z.literal(true, { errorMap: () => ({ message: "Avem nevoie de acordul tău ca să te contactăm." }) }),
});

/** Telefon sau email, cel puțin unul, și valide. Separat ca să ruleze chiar dacă alte câmpuri au erori. */
export function contactIssues(telefon: string, email: string): { path: "telefon" | "email"; message: string }[] {
  const tel = normalizePhone(telefon);
  const out: { path: "telefon" | "email"; message: string }[] = [];
  if (!tel && !email) return [{ path: "telefon", message: "Lasă-ne un telefon sau o adresă de email." }];
  if (tel && !PHONE_RE.test(tel)) out.push({ path: "telefon", message: "Lasă-ne un număr de telefon valid (07xx xxx xxx)." });
  if (email && !z.string().email().safeParse(email).success) out.push({ path: "email", message: "Adresa de email nu pare corectă." });
  return out;
}

export const leadSchema = baseSchema.superRefine((v, ctx) => {
  for (const i of contactIssues(v.telefon, v.email)) ctx.addIssue({ code: "custom", path: [i.path], message: i.message });
});

export type Lead = z.infer<typeof leadSchema>;
export type CreditType = (typeof CREDIT_TYPES)[number];
