import Link from "next/link";
import { site } from "@/content/site";

export function Footer() {
  const c = site.company;
  return (
    <footer className="border-t border-line bg-section pb-28 pt-12 lg:pb-12">
      <div className="container-x flex flex-col gap-6 md:flex-row md:justify-between">
        <div className="flex flex-col gap-2 text-sm text-muted">
          <p className="m-0 text-lg font-extrabold text-ink">{site.name}</p>
          <p className="m-0">
            {c.legalName} · CUI {c.cui} · {c.address}
          </p>
          <p className="m-0">Înregistrat în Registrul intermediarilor de credit ANPC, nr. {c.anpcRegistry}</p>
        </div>
        <ul className="m-0 flex list-none flex-wrap gap-x-6 gap-y-2 p-0 text-sm font-semibold">
          <li><Link href="/confidentialitate/">Politica de confidențialitate</Link></li>
          <li><Link href="/confidentialitate/#termeni">Termeni și condiții</Link></li>
          <li><Link href="/confidentialitate/#cookies">Cookies</Link></li>
          <li><a href="https://anpc.ro/ce-este-sal/" rel="noopener" target="_blank">ANPC SAL</a></li>
          <li><a href="https://ec.europa.eu/consumers/odr" rel="noopener" target="_blank">Soluționarea online a litigiilor</a></li>
        </ul>
      </div>
    </footer>
  );
}
