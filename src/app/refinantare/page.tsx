import type { Metadata } from "next";
import { CreditPageView } from "@/components/CreditPageView";
import { credits } from "@/content/credits";

export const metadata: Metadata = { title: "Refinanțare: calculator și oferte", description: credits["refinantare"].intro };

export default function Page() {
  return <CreditPageView kind="refinantare" />;
}
