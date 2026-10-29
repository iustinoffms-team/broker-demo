# CreditClar · demo

Site demo pentru un broker de credite din România. Este un export static (Next.js), gândit să stea online o zi pe Vercel, ca să-l vadă clientul.

Ce face demo-ul:

- Pagina principală, cu secțiunea „Cu cine vei vorbi” (foto, WhatsApp, telefon, Facebook, Instagram, LinkedIn, TikTok).
- Patru pagini de credit, fiecare cu calculatorul ei funcțional: ipotecar (rată și cât pot împrumuta), refinanțare, nevoi personale, Noua Casă.
- Ghid cu articole, pagina de mulțumire și politica de confidențialitate (text provizoriu).
- Formularele validează datele, dar **nu trimit nimic**: duc direct la `/multumim`.
- Banner „versiune demo”, `noindex` și `robots.txt` cu `Disallow: /`.

## Rulare locală

```bash
npm install
npm run dev        # http://localhost:3000
npm test           # testele pentru calculatoare și formular
npm run build      # export static în out/
```

## Deploy pe Vercel

1. Importă repo-ul în Vercel (framework detectat automat: Next.js).
2. Nu e nevoie de variabile de mediu: fără `NEXT_PUBLIC_SITE_MODE=production`, site-ul rulează în modul demo.
3. După prezentare, șterge proiectul din Vercel.

## Unde se schimbă textele

Tot conținutul stă în `src/content/*.ts`. Textele dintre `[paranteze]` sunt de completat de broker. În versiunea finală, aceste fișiere devin seed-ul pentru Payload CMS, iar textele se editează din `/admin`.

Formulele calculatoarelor sunt în `src/lib/calc.ts`, cu teste în `src/lib/calc.test.ts`.
