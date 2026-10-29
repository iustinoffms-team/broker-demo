import type { Metadata } from "next";
import { CreditPageView } from "@/components/CreditPageView";
import { credits } from "@/content/credits";

export const metadata: Metadata = { title: "Credit ipotecar: calculator și oferte", description: credits["ipotecar"].intro };

export default function Page() {
  return <CreditPageView kind="ipotecar" />;
}
