const lei = new Intl.NumberFormat("ro-RO", { maximumFractionDigits: 0 });

/** 300000 -> "300.000" (format românesc, fără zecimale). */
export function fmt(n: number): string {
  return lei.format(Math.round(n));
}

export function fmtLei(n: number): string {
  return `${fmt(n)} lei`;
}

/** 5.5 -> "5,50" */
export function fmtProcent(n: number): string {
  return n.toFixed(2).replace(".", ",");
}

/** Românește: 1 an, 5 ani, 30 de ani. */
export function fmtAni(ani: number): string {
  if (ani === 1) return "1 an";
  return ani % 100 >= 20 || ani % 100 === 0 ? `${ani} de ani` : `${ani} ani`;
}
