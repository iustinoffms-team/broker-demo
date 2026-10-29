export interface Social {
  network: "facebook" | "instagram" | "linkedin" | "tiktok";
  url: string;
}

export interface Consultant {
  name: string;
  firstName: string;
  photo?: string;
  role: string;
  quote: string;
  specializations: string[];
  phone: string;
  phoneHref: string;
  whatsapp: string;
  socials: Social[];
}

export const consultants: Consultant[] = [
  {
    name: "[Nume consultant]",
    firstName: "[Nume]",
    role: "Broker de credite · [15]+ ani de experiență în bănci",
    quote:
      "Sunt [Nume] și te ajut să găsești creditul potrivit, de la prima discuție până la semnare. Mă poți suna sau îmi poți scrie pe WhatsApp oricând în timpul programului.",
    specializations: ["Credite ipotecare", "Refinanțare", "Noua Casă"],
    phone: "[07xx xxx xxx]",
    phoneHref: "tel:+40700000000",
    whatsapp: "https://wa.me/40700000000",
    socials: [
      { network: "facebook", url: "https://facebook.com/" },
      { network: "instagram", url: "https://instagram.com/" },
      { network: "linkedin", url: "https://linkedin.com/" },
      { network: "tiktok", url: "https://tiktok.com/" },
    ],
  },
];
