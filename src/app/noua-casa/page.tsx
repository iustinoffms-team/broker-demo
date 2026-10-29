import type { Metadata } from "next";
import { CreditPageView } from "@/components/CreditPageView";
import { credits } from "@/content/credits";

export const metadata: Metadata = { title: "Noua Casă: calculator și oferte", description: credits["noua-casa"].intro };

export default function Page() {
  return <CreditPageView kind="noua-casa" />;
}
