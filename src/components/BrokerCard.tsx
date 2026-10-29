import type { Consultant } from "@/content/consultants";
import { PhoneIcon, SocialIcon, WhatsAppIcon, socialLabels } from "./Icons";

export function BrokerCard({ c }: { c: Consultant }) {
  return (
    <article className="card flex flex-col gap-6 p-6 md:flex-row md:items-start md:gap-8 md:p-8">
      {c.photo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={c.photo} alt={`Fotografie ${c.name}`} className="size-[120px] shrink-0 rounded-full object-cover" />
      ) : (
        <div
          role="img"
          aria-label={`Fotografie ${c.name}`}
          className="flex size-[120px] shrink-0 items-center justify-center rounded-full bg-petrol-50 text-sm font-semibold text-petrol"
        >
          [Foto broker]
        </div>
      )}
      <div className="flex flex-col gap-4">
        <div>
          <h3 className="m-0 text-2xl font-extrabold tracking-[-0.01em]">{c.name}</h3>
          <p className="m-0 mt-1 font-semibold text-muted">{c.role}</p>
        </div>
        <blockquote className="m-0 text-lg leading-relaxed text-ink">„{c.quote}”</blockquote>
        <p className="m-0 text-[15px] font-semibold text-petrol">{c.specializations.join(" · ")}</p>
        <div className="flex flex-wrap gap-3">
          <a href={c.whatsapp} target="_blank" rel="noopener" className="btn btn-whatsapp">
            <WhatsAppIcon /> Scrie-mi pe WhatsApp
          </a>
          <a href={c.phoneHref} className="btn btn-outline">
            <PhoneIcon /> Sună
          </a>
        </div>
        {c.socials.length > 0 && (
          <ul className="m-0 flex list-none gap-2 p-0">
            {c.socials.map((s) => (
              <li key={s.network}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener"
                  aria-label={`${socialLabels[s.network]}-ul lui ${c.name}`}
                  className="flex size-11 items-center justify-center rounded-full border border-line text-petrol hover:bg-petrol-50"
                >
                  <SocialIcon network={s.network} />
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
