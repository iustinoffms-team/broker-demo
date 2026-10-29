import type { Metadata } from "next";
import { ThankYou } from "@/components/ThankYou";

export const metadata: Metadata = { title: "Mulțumim", robots: { index: false } };

export default function Page() {
  return <ThankYou />;
}
