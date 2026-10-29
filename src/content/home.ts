import { site } from "./site";

export const hero = {
  eyebrow: `${site.tagline} · ${site.city}`,
  title: "Creditul potrivit, de la banca potrivită. Fără niciun cost pentru tine.",
  lead: `Comparăm ofertele de la ${site.banksCount} bănci, negociem dobânda și ne ocupăm de acte. Banca ne plătește pe noi, nu tu.`,
  bullets: ["Consultanță gratuită", "Te sunăm în maximum 2 ore lucrătoare", "Fără nicio obligație"],
};

export const steps = [
  { title: "Ne spui de ce ai nevoie", text: "Folosești calculatorul sau ne suni. Durează două minute." },
  { title: "Comparăm băncile pentru tine", text: "Îți aducem cele mai bune oferte și îți explicăm DAE și costul total, pe înțeles." },
  { title: "Semnezi la bancă", text: "Pregătim dosarul împreună și te însoțim până la semnare." },
];

export const comparison = {
  title: "De ce prin broker și nu direct la bancă?",
  lead: "Pentru tine costul e același: zero. Diferența e câte oferte vezi și cine se ocupă de acte.",
  rows: [
    { label: "Câte oferte vezi", bank: "Una singură", broker: `De la ${site.banksCount} bănci` },
    { label: "Dobânda", bank: "Cea standard", broker: "Negociată pentru tine" },
    { label: "Actele", bank: "Le cauți singur", broker: "Îți spunem exact ce trebuie" },
    { label: "Cât te costă", bank: "0 lei", broker: "0 lei" },
  ],
};

export const reviews = [
  { text: "[Text recenzie reală din Google]", author: "[Nume], [Oraș]", credit: "Credit ipotecar" },
  { text: "[Text recenzie reală din Google]", author: "[Nume], [Oraș]", credit: "Refinanțare" },
  { text: "[Text recenzie reală din Google]", author: "[Nume], [Oraș]", credit: "Nevoi personale" },
];

export const banks = Array.from({ length: 6 }, () => "[Logo bancă]");
