import type { Metadata } from "next";
import { CreditPageView } from "@/components/CreditPageView";
import { credits } from "@/content/credits";

export const metadata: Metadata = { title: "Credit de nevoi personale: calculator și oferte", description: credits["nevoi-personale"].intro };

export default function Page() {
  return <CreditPageView kind="nevoi-personale" />;
}
