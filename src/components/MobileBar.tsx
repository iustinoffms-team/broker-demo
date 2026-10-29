import Link from "next/link";
import { site } from "@/content/site";
import { PhoneIcon, WhatsAppIcon } from "./Icons";

/** Pe mobil: bara de jos și butonul WhatsApp rămân fixe la derulare. */
export function MobileBar() {
  return (
    <>
      <a
        href={site.whatsapp}
        target="_blank"
        rel="noopener"
        aria-label="Scrie-ne pe WhatsApp"
        className="fixed bottom-24 right-4 z-40 flex size-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg hover:text-white lg:bottom-6 lg:right-6"
      >
        <WhatsAppIcon className="size-7" />
      </a>
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-3 border-t border-line bg-white p-3 lg:hidden">
        <a href={site.phoneHref} className="btn btn-outline">
          <PhoneIcon className="size-4" /> Sună acum
        </a>
        <Link href="/#formular" className="btn btn-primary">
          Cere ofertă
        </Link>
      </div>
    </>
  );
}
