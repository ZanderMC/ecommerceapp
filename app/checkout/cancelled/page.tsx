import Link from "next/link";

export const instant = false;

export default function CheckoutCancelledPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-xl items-center px-6 py-12">
      <section className="w-full border border-black/10 p-8">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-black/50">
          Zandev Store
        </p>
        <h1 className="text-3xl font-semibold">Pago cancelado</h1>
        <p className="mt-4">
          No se realizó ningún cobro. Tus productos siguen en el carrito.
        </p>
        <div className="mt-8 flex gap-5">
          <Link href="/ShoppingCart" className="bg-black px-5 py-3 text-white">
            Volver al carrito
          </Link>
          <Link href="/" className="px-5 py-3 underline">
            Seguir comprando
          </Link>
        </div>
      </section>
    </main>
  );
}
