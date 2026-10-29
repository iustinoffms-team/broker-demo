import { site } from "./site";
import type { CreditType } from "@/lib/lead";

export type CalculatorKind = "ipotecar" | "refinantare" | "nevoi-personale" | "noua-casa";

export interface Range {
  min: number;
  max: number;
  step: number;
  default: number;
}

export interface CreditPage {
  slug: CalculatorKind;
  leadType: CreditType;
  name: string;
  short: string;
  cta: string;
  title: string;
  intro: string;
  needs: string[];
  crossSell?: { title: string; text: string; href: string; link: string };
}

// Plaje pentru slidere. Dobânzile implicite sunt doar orientative; în final se editează din /admin.
export const ranges = {
  ipotecar: {
    suma: { min: 50000, max: 1500000, step: 5000, default: 300000 },
    ani: { min: 5, max: 35, step: 1, default: 30 },
    dob: { min: 3, max: 10, step: 0.05, default: 5.5 },
    venit: { min: 2000, max: 40000, step: 250, default: 8000 },
    rate: { min: 0, max: 10000, step: 50, default: 0 },
  },
  "nevoi-personale": {
    suma: { min: 5000, max: 250000, step: 1000, default: 50000 },
    ani: { min: 1, max: 10, step: 1, default: 5 },
    dob: { min: 5, max: 20, step: 0.05, default: 9.5 },
  },
  refinantare: {
    sold: { min: 20000, max: 1500000, step: 5000, default: 250000 },
    ani: { min: 1, max: 35, step: 1, default: 25 },
    dobActuala: { min: 3, max: 15, step: 0.05, default: 8 },
    dobNoua: { min: 3, max: 15, step: 0.05, default: 5.5 },
  },
  "noua-casa": {
    pret: { min: 100000, max: 1000000, step: 5000, default: 400000 },
    avans: { min: 5, max: 30, step: 1, default: 5 },
    ani: { min: 5, max: 30, step: 1, default: 30 },
    dob: { min: 3, max: 10, step: 0.05, default: 5.5 },
  },
} satisfies Record<CalculatorKind, Record<string, Range>>;

const weDo = [
  `Comparăm ofertele de la ${site.banksCount} bănci`,
  "Negociem dobânda și asigurările",
  "Pregătim dosarul și te însoțim la semnare",
];

export const credits: Record<CalculatorKind, CreditPage & { weDo: string[] }> = {
  ipotecar: {
    slug: "ipotecar",
    leadType: "Credit ipotecar",
    name: "Credit ipotecar",
    short: "Pentru prima casă sau pentru o locuință mai mare. Avans de la 15%.",
    cta: "Calculează rata →",
    title: "Calculator credit ipotecar",
    intro: `Mută sliderele și vezi rata pe loc. Când ești gata, îți aducem ofertele reale de la ${site.banksCount} bănci, gratuit.`,
    needs: [
      "Avans de minimum 15% din prețul locuinței",
      "Venit stabil, dovedit cu adeverință sau extrase",
      "Carte de identitate valabilă",
    ],
    weDo,
    crossSell: {
      title: "Ai avans de doar 5%?",
      text: "Programul Noua Casă îți permite să cumperi prima locuință cu avans de 5%, cu garanția statului.",
      href: "/noua-casa/",
      link: "Află dacă te încadrezi →",
    },
  },
  refinantare: {
    slug: "refinantare",
    leadType: "Refinanțare",
    name: "Refinanțare",
    short: "Mută creditul la o bancă cu dobândă mai mică și plătește mai puțin în fiecare lună.",
    cta: "Vezi cât economisești →",
    title: "Calculator refinanțare",
    intro: "Spune-ne cât mai ai de plătit și la ce dobândă. Îți arătăm cât ai economisi lunar și pe toată perioada.",
    needs: [
      "Contractul de credit actual și graficul de rambursare",
      "Fără întârzieri la plată în ultimele luni",
      "Venit stabil, dovedit cu adeverință sau extrase",
    ],
    weDo,
    crossSell: {
      title: "Vrei și bani în plus?",
      text: "La refinanțare poți cere uneori și o sumă suplimentară, de exemplu pentru renovare.",
      href: "/nevoi-personale/",
      link: "Vezi creditul de nevoi personale →",
    },
  },
  "nevoi-personale": {
    slug: "nevoi-personale",
    leadType: "Nevoi personale",
    name: "Nevoi personale",
    short: "Bani pentru renovare, mașină sau orice proiect, fără ipotecă.",
    cta: "Calculează rata →",
    title: "Calculator credit de nevoi personale",
    intro: "Alege suma și perioada. Îți arătăm rata estimată, apoi căutăm banca cu cel mai mic DAE pentru tine.",
    needs: [
      "Carte de identitate valabilă",
      "Venit net dovedit, de obicei din ultimele 3–6 luni",
      "Istoric bun la Biroul de Credit",
    ],
    weDo,
    crossSell: {
      title: "Ai deja mai multe credite?",
      text: "Le putem aduna într-unul singur, cu o rată mai mică.",
      href: "/refinantare/",
      link: "Vezi refinanțarea →",
    },
  },
  "noua-casa": {
    slug: "noua-casa",
    leadType: "Noua Casă",
    name: "Noua Casă",
    short: "Prima locuință cu avans de doar 5%, cu garanția statului.",
    cta: "Verifică eligibilitatea →",
    title: "Calculator Noua Casă",
    intro: "Pune prețul locuinței și vezi cât ar fi avansul și rata. Îți verificăm gratuit dacă te încadrezi în program.",
    needs: [
      "Să fie prima ta locuință (nu deții una în proprietate)",
      "Avans de minimum 5% din prețul locuinței",
      "Prețul locuinței în plafonul programului, valabil la data cererii",
    ],
    weDo,
    crossSell: {
      title: "Ai avans de 15% sau mai mult?",
      text: "Un credit ipotecar clasic poate avea uneori o dobândă mai bună.",
      href: "/credit-ipotecar/",
      link: "Compară cu creditul ipotecar →",
    },
  },
};

export const creditList = [credits.ipotecar, credits.refinantare, credits["nevoi-personale"], credits["noua-casa"]];

export const creditHref: Record<CalculatorKind, string> = {
  ipotecar: "/credit-ipotecar/",
  refinantare: "/refinantare/",
  "nevoi-personale": "/nevoi-personale/",
  "noua-casa": "/noua-casa/",
};
