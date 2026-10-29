import type { Metadata, Viewport } from "next";
import "./globals.css";
import { DemoBanner } from "@/components/DemoBanner";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileBar } from "@/components/MobileBar";
import { isDemo, site } from "@/content/site";

export const metadata: Metadata = {
  title: { default: `${site.name} · Broker de credite, gratuit pentru tine`, template: `%s · ${site.name}` },
  description: "Comparăm ofertele de credit de la mai multe bănci, negociem dobânda și ne ocupăm de acte. Consultanța este gratuită.",
  robots: isDemo ? { index: false, follow: false } : undefined,
};

export const viewport: Viewport = { themeColor: "#0E4D64" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
        />
      </head>
      <body>
        <a href="#continut" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:p-3">
          Sari la conținut
        </a>
        <DemoBanner />
        <Header />
        <main id="continut">{children}</main>
        <Footer />
        <MobileBar />
      </body>
    </html>
  );
}
