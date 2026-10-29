import { isDemo } from "@/content/site";

export function DemoBanner() {
  if (!isDemo) return null;
  return (
    <div role="note" className="bg-ink px-4 py-2 text-center text-sm font-semibold text-white">
      Versiune demo pentru prezentare. Textele dintre [paranteze] se completează la lansare, iar formularele nu trimit date.
    </div>
  );
}
