"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { formatPrice, saveCart } from "@/lib/cart";

type CheckoutResultProps = {
  sessionId: string;
};

type Transaction = {
  sessionId: string;
  orderId: number;
  amount: number;
  currency: string;
  status: "pending" | "paid" | "failed" | "refunded";
  paymentStatus: string;
  paidAt: string | null;
  customerEmail: string | null;
};

export function CheckoutResult({ sessionId }: CheckoutResultProps) {
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadTransaction() {
      try {
        const response = await fetch(
          `/api/checkout/session?session_id=${encodeURIComponent(sessionId)}`,
          { cache: "no-store" },
        );
        const result = (await response.json()) as Transaction | { error?: string };

        if (!response.ok || !("orderId" in result)) {
          throw new Error("error" in result ? result.error : "No se pudo consultar el pago.");
        }

        if (isMounted) {
          setTransaction(result);
          if (result.status === "paid" && result.paymentStatus !== "unpaid") {
            saveCart([]);
          }
        }
      } catch (loadError) {
        if (isMounted) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "No se pudo consultar el pago.",
          );
        }
      }
    }

    void loadTransaction();

    return () => {
      isMounted = false;
    };
  }, [sessionId]);

  if (error) {
    return (
      <ResultLayout title="No pudimos confirmar el pago">
        <p className="text-red-700">{error}</p>
        <Link href="/ShoppingCart" className="mt-8 inline-block underline">
          Volver al carrito
        </Link>
      </ResultLayout>
    );
  }

  if (!transaction) {
    return (
      <ResultLayout title="Verificando tu pago">
        <p>Estamos consultando los datos de tu transacción...</p>
      </ResultLayout>
    );
  }

  const isPaid = transaction.status === "paid" && transaction.paymentStatus !== "unpaid";

  return (
    <ResultLayout title={isPaid ? "¡Pago confirmado!" : "Pago en proceso"}>
      <p>{isPaid ? "Tu pedido fue registrado correctamente." : "Stripe todavía está confirmando el pago. Te notificaremos cuando cambie el estado."}</p>
      <dl className="mt-8 space-y-3 border-y border-black/10 py-5">
        <div className="flex justify-between gap-4">
          <dt>Orden</dt>
          <dd className="font-semibold">#{transaction.orderId}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt>Estado</dt>
          <dd className="font-semibold">{isPaid ? "Pagado" : "Pendiente"}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt>Total</dt>
          <dd className="font-semibold">{formatPrice(transaction.amount)}</dd>
        </div>
        {transaction.customerEmail && (
          <div className="flex justify-between gap-4">
            <dt>Correo</dt>
            <dd className="font-semibold">{transaction.customerEmail}</dd>
          </div>
        )}
      </dl>
      <Link href="/" className="mt-8 inline-block bg-black px-5 py-3 text-white">
        Volver a la tienda
      </Link>
    </ResultLayout>
  );
}

function ResultLayout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-xl items-center px-6 py-12">
      <section className="w-full border border-black/10 p-8">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-black/50">
          Zandev Store
        </p>
        <h1 className="text-3xl font-semibold">{title}</h1>
        <div className="mt-4 leading-6">{children}</div>
      </section>
    </main>
  );
}
