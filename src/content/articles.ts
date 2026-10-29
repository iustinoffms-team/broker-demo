export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  readMinutes: number;
  /** Paragrafe simple; în final vor fi rich text din Payload. */
  body: { heading?: string; text: string }[];
}

export const articles: Article[] = [
  {
    slug: "ce-este-dae",
    title: "Ce este DAE și de ce contează mai mult decât dobânda",
    excerpt: "Dobânda e doar o parte din cost. DAE adună tot ce plătești și e cifra corectă pentru a compara ofertele.",
    readMinutes: 4,
    body: [
      {
        text: "Când compari două credite, prima cifră pe care o vezi este dobânda. Dar dobânda nu spune tot. Băncile adaugă comisioane, asigurări obligatorii și alte costuri care pot schimba mult suma pe care o plătești în final.",
      },
      {
        heading: "Ce include DAE",
        text: "Dobânda anuală efectivă (DAE) adună dobânda, comisioanele de analiză și administrare, asigurările cerute de bancă și alte costuri obligatorii, exprimate ca procent pe an. Este calculată după aceeași formulă la toate băncile, tocmai ca să poți compara corect.",
      },
      {
        heading: "Un exemplu simplu",
        text: "O ofertă cu dobândă de 5,2% și asigurări scumpe poate avea un DAE mai mare decât o ofertă cu dobândă de 5,5% și costuri mici. Dacă te uiți doar la dobândă, alegi greșit.",
      },
      {
        heading: "Ce facem noi",
        text: "Când îți aducem ofertele, ți le punem una lângă alta după DAE și după costul total, în lei. Așa vezi exact cât te costă fiecare credit, fără surprize.",
      },
    ],
  },
  {
    slug: "acte-credit-ipotecar",
    title: "Ce acte îți trebuie pentru un credit ipotecar",
    excerpt: "Lista de bază, pe scurt, ca să știi ce să pregătești înainte de prima discuție cu banca.",
    readMinutes: 3,
    body: [
      { text: "Fiecare bancă are lista ei, dar actele de bază sunt aproape aceleași peste tot." },
      { heading: "Pentru tine", text: "Carte de identitate valabilă și, dacă e cazul, certificatul de căsătorie." },
      {
        heading: "Pentru venit",
        text: "Adeverința de venit de la angajator sau extrasele de cont pe ultimele luni. Pentru PFA sau venituri din străinătate, actele diferă, iar noi îți spunem exact ce cere fiecare bancă.",
      },
      { heading: "Pentru locuință", text: "Antecontractul de vânzare-cumpărare, actele de proprietate ale vânzătorului și evaluarea, pe care o comandă banca." },
    ],
  },
  {
    slug: "cand-merita-refinantarea",
    title: "Când merită să îți refinanțezi creditul",
    excerpt: "O dobândă mai mică nu înseamnă automat economie. Iată ce trebuie să verifici înainte.",
    readMinutes: 4,
    body: [
      { text: "Refinanțarea înseamnă să iei un credit nou, la altă bancă, ca să îl închizi pe cel vechi. Merită când diferența de cost acoperă comisioanele mutării." },
      { heading: "Semne că merită", text: "Dobânda ta actuală e mult peste ce oferă băncile acum, mai ai mulți ani de plătit și ai un istoric bun de plată." },
      { heading: "Ce costuri apar", text: "Evaluarea locuinței, eventuale comisioane de rambursare anticipată și taxele notariale. Le punem pe toate în calcul înainte să îți recomandăm ceva." },
    ],
  },
];
