import type { Metadata } from "next";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Politica de confidențialitate" };

export default function Page() {
  const c = site.company;
  return (
    <article className="container-x max-w-[760px] py-12 md:py-16">
      <h1 className="m-0 text-[36px] font-extrabold tracking-[-0.03em]">Politica de confidențialitate</h1>
      <p className="m-0 mt-4 rounded-[10px] bg-section p-4 text-sm font-semibold text-muted">
        Text provizoriu pentru demo. Varianta finală se redactează împreună cu un jurist, conform GDPR.
      </p>
      <div className="mt-8 flex flex-col gap-6 text-[17px] leading-[1.7] text-muted">
        <section>
          <h2 className="m-0 mb-2 text-2xl font-extrabold text-ink">Cine prelucrează datele</h2>
          <p className="m-0">{c.legalName}, CUI {c.cui}, {c.address}, înregistrat în Registrul intermediarilor de credit ANPC, nr. {c.anpcRegistry}.</p>
        </section>
        <section>
          <h2 className="m-0 mb-2 text-2xl font-extrabold text-ink">Ce date colectăm</h2>
          <p className="m-0">Numele, prenumele, telefonul și/sau adresa de email, tipul de credit dorit și, dacă ai folosit un calculator, valorile introduse.</p>
        </section>
        <section>
          <h2 className="m-0 mb-2 text-2xl font-extrabold text-ink">De ce le folosim</h2>
          <p className="m-0">Doar ca să te contactăm în legătură cu cererea ta. Nu trimitem datele către bănci fără acordul tău explicit.</p>
        </section>
        <section id="termeni">
          <h2 className="m-0 mb-2 text-2xl font-extrabold text-ink">Termeni și condiții</h2>
          <p className="m-0">Calculele de pe site sunt estimări orientative și nu reprezintă oferte ferme de creditare.</p>
        </section>
        <section id="cookies">
          <h2 className="m-0 mb-2 text-2xl font-extrabold text-ink">Cookies</h2>
          <p className="m-0">Demo-ul nu folosește cookies de urmărire.</p>
        </section>
      </div>
    </article>
  );
}
