import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles } from "@/content/articles";

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = articles.find((x) => x.slug === slug);
  return a ? { title: a.title, description: a.excerpt } : {};
}

export default async function Article({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = articles.find((x) => x.slug === slug);
  if (!a) notFound();
  return (
    <article className="container-x max-w-[760px] py-12 md:py-16">
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <Link href="/">Acasă</Link> / <Link href="/ghid/">Ghid</Link>
      </nav>
      <h1 className="m-0 mt-3 text-[32px] font-extrabold leading-tight tracking-[-0.03em] md:text-[42px]">{a.title}</h1>
      <p className="m-0 mt-2 text-sm font-semibold text-subtle">{a.readMinutes} minute de citit</p>
      <div className="mt-8 flex flex-col gap-5 text-[18px] leading-[1.7]">
        {a.body.map((b, i) => (
          <div key={i}>
            {b.heading && <h2 className="m-0 mb-2 text-2xl font-extrabold">{b.heading}</h2>}
            <p className="m-0 text-muted">{b.text}</p>
          </div>
        ))}
      </div>
      <div className="mt-10 flex flex-col gap-3 rounded-2xl bg-petrol-50 p-6">
        <p className="m-0 text-xl font-extrabold">Vrei să vezi ofertele reale?</p>
        <p className="m-0 text-muted">Îți comparăm gratuit ofertele de la mai multe bănci și îți explicăm diferențele.</p>
        <Link href="/#formular" className="btn btn-primary w-fit">Cere o ofertă gratuită</Link>
      </div>
    </article>
  );
}
