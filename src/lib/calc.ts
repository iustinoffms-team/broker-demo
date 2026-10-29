// Funcții pure pentru calculatoare. Rezultatele sunt estimări orientative.

/** Rata lunară pentru un credit cu rate egale (anuități). */
export function rataLunara(principal: number, ani: number, dobandaAnuala: number): number {
  const n = Math.round(ani * 12);
  if (principal <= 0 || n <= 0) return 0;
  const r = dobandaAnuala / 100 / 12;
  if (r === 0) return principal / n;
  return (principal * r) / (1 - Math.pow(1 + r, -n));
}

export interface RezultatRata {
  rata: number;
  total: number;
  dobandaTotala: number;
  /** Venitul net minim la care rata nu depășește gradul de îndatorare. */
  venitMinim: number;
}

/** Gradul maxim de îndatorare folosit în estimări (40% din venitul net). */
export const GRAD_INDATORARE = 0.4;

export function calculRata(principal: number, ani: number, dobandaAnuala: number): RezultatRata {
  const rata = rataLunara(principal, ani, dobandaAnuala);
  const total = rata * Math.round(ani * 12);
  return {
    rata,
    total,
    dobandaTotala: Math.max(0, total - principal),
    venitMinim: rata / GRAD_INDATORARE,
  };
}

export interface RezultatCapacitate {
  rataMaxima: number;
  sumaMaxima: number;
}

/** Cât poate împrumuta cineva, din venitul net și ratele pe care le plătește deja. */
export function capacitateImprumut(
  venitNet: number,
  rateExistente: number,
  ani: number,
  dobandaAnuala: number,
): RezultatCapacitate {
  const rataMaxima = Math.max(0, venitNet * GRAD_INDATORARE - rateExistente);
  const n = Math.round(ani * 12);
  if (rataMaxima === 0 || n <= 0) return { rataMaxima, sumaMaxima: 0 };
  const r = dobandaAnuala / 100 / 12;
  const sumaMaxima = r === 0 ? rataMaxima * n : (rataMaxima * (1 - Math.pow(1 + r, -n))) / r;
  return { rataMaxima, sumaMaxima };
}

export interface RezultatRefinantare {
  rataActuala: number;
  rataNoua: number;
  economieLunara: number;
  economieTotala: number;
}

/** Compară rata pentru soldul rămas la dobânda actuală cu cea la o dobândă nouă, pe aceeași perioadă. */
export function calculRefinantare(
  sold: number,
  aniRamasi: number,
  dobandaActuala: number,
  dobandaNoua: number,
): RezultatRefinantare {
  const rataActuala = rataLunara(sold, aniRamasi, dobandaActuala);
  const rataNoua = rataLunara(sold, aniRamasi, dobandaNoua);
  const economieLunara = rataActuala - rataNoua;
  return {
    rataActuala,
    rataNoua,
    economieLunara,
    economieTotala: economieLunara * Math.round(aniRamasi * 12),
  };
}

export interface RezultatAvans {
  avans: number;
  credit: number;
  rata: number;
}

/** Credit pentru o locuință cu avans procentual (ex. Noua Casă, 5%). */
export function calculCuAvans(
  pretLocuinta: number,
  avansProcent: number,
  ani: number,
  dobandaAnuala: number,
): RezultatAvans {
  const avans = (pretLocuinta * avansProcent) / 100;
  const credit = Math.max(0, pretLocuinta - avans);
  return { avans, credit, rata: rataLunara(credit, ani, dobandaAnuala) };
}
