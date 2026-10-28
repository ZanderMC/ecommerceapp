import Link from "next/link";
import { CheckoutResult } from "../CheckoutResult";

type SuccessPageProps = {
  searchParams: Promise<{ session_id?: string }>;
};

export const instant = false;

export default async function CheckoutSuccessPage({ searchParams }: SuccessPageProps) {
  const { session_id: sessionId } = await searchParams;

  if (!sessionId) {
    return (
      <main className="mx-auto flex min-h-screen w-full max-w-xl items-center px-6 py-12">
        <section className="w-full border border-black/10 p-8">
          <h1 className="text-3xl font-semibold">Sesión de pago no encontrada</h1>
          <p className="mt-4">No recibimos el identificador de tu transacción.</p>
          <Link href="/" className="mt-8 inline-block underline">
            Volver a la tienda
          </Link>
        </section>
      </main>
    );
  }

  return <CheckoutResult sessionId={sessionId} />;
}
