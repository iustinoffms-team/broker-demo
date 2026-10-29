// Conținutul de aici va deveni seed-ul pentru Payload CMS în versiunea finală.
// Textele dintre [paranteze] sunt de completat de broker.

export const site = {
  name: "CreditClar",
  tagline: "Broker de credite autorizat ANPC",
  city: "[Oraș]",
  phone: "[07xx xxx xxx]",
  phoneHref: "tel:+40700000000",
  whatsapp: "https://wa.me/40700000000",
  email: "[contact@domeniu.ro]",
  banksCount: "[10]",
  rating: "[4,9]",
  reviewsCount: "[120]",
  hours: "de luni până vineri, între 9:00 și 18:00",
  callbackPromise: "Te sunăm în maximum 2 ore lucrătoare",
  company: {
    legalName: "[SC NUME FIRMĂ SRL]",
    cui: "[ ]",
    address: "[Adresa sediului]",
    anpcRegistry: "[ ]",
  },
};

export const isDemo = process.env.NEXT_PUBLIC_SITE_MODE !== "production";

export const nav = [
  { href: "/credit-ipotecar/", label: "Credit ipotecar" },
  { href: "/refinantare/", label: "Refinanțare" },
  { href: "/nevoi-personale/", label: "Nevoi personale" },
  { href: "/noua-casa/", label: "Noua Casă" },
  { href: "/ghid/", label: "Ghid" },
];
