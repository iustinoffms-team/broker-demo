import Link from "next/link";
import { nav, site } from "@/content/site";
import { PhoneIcon } from "./Icons";

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-white/95 backdrop-blur">
      <div className="container-x flex h-16 items-center justify-between gap-4 md:h-[72px]">
        <Link href="/" className="text-[22px] font-extrabold tracking-[-0.02em] text-ink no-underline hover:text-ink">
          {site.name}
        </Link>
        <nav aria-label="Principal" className="hidden items-center gap-6 lg:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="text-[15px] font-semibold text-ink no-underline hover:text-petrol">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-4 lg:flex">
          <a href={site.phoneHref} className="inline-flex items-center gap-2 font-bold no-underline">
            <PhoneIcon className="size-4" />
            {site.phone}
          </a>
          <Link href="/#formular" className="btn btn-primary">
            Cere o ofertă gratuită
          </Link>
        </div>
        <details className="group relative lg:hidden">
          <summary className="flex size-12 cursor-pointer list-none items-center justify-center rounded-[10px] border border-line [&::-webkit-details-marker]:hidden">
            <span className="sr-only">Meniu</span>
            <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </summary>
          <nav aria-label="Mobil" className="absolute right-0 top-14 flex w-64 flex-col rounded-2xl border border-line bg-white p-2 shadow-lg">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-lg px-4 py-3 font-semibold text-ink no-underline hover:bg-section">
                {item.label}
              </Link>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}
