import Link from "next/link";

export const instant = false;

export default function CheckoutCancelledPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-xl items-center px-5 py-8 sm:px-6 sm:py-12">
      <section className="w-full border border-black/10 p-5 sm:p-8">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-black/50">
          Zandev Store
        </p>
        <h1 className="text-2xl font-semibold sm:text-3xl">Pago cancelado</h1>
        <p className="mt-4">
          No se realizó ningún cobro. Tus productos siguen en el carrito.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
          <Link href="/ShoppingCart" className="bg-black px-5 py-3 text-center text-white">
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
