import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-x flex flex-col items-start gap-4 py-24">
      <h1 className="m-0 text-4xl font-extrabold">Pagina nu există</h1>
      <p className="m-0 text-lg text-muted">Poate a fost mutată. Te ajutăm să găsești ce cauți.</p>
      <Link href="/" className="btn btn-primary">Înapoi la pagina principală</Link>
    </section>
  );
}
