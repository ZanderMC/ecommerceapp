"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  CART_UPDATED_EVENT,
  CartItem,
  formatPrice,
  getCart,
  saveCart,
} from "@/lib/cart";
import { Header } from "@/app/components/Header";

export default function ShoppingCartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");

  useEffect(() => {
    const updateCart = () => setCart(getCart());
    updateCart();
    window.addEventListener(CART_UPDATED_EVENT, updateCart);

    return () => window.removeEventListener(CART_UPDATED_EVENT, updateCart);
  }, []);

  function updateItem(item: CartItem, quantity: number) {
    const updatedCart = cart
      .map((cartItem) =>
        cartItem.id === item.id && cartItem.size === item.size
          ? { ...cartItem, quantity }
          : cartItem,
      )
      .filter((cartItem) => cartItem.quantity > 0);

    setCart(updatedCart);
    saveCart(updatedCart);
  }

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  async function handleCheckout() {
    setIsCheckingOut(true);
    setCheckoutError("");

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart.map(({ id, quantity, size }) => ({ id, quantity, size })),
        }),
      });
      const result = (await response.json()) as { url?: string; error?: string };

      if (!response.ok || !result.url) {
        throw new Error(result.error ?? "No se pudo iniciar el checkout.");
      }

      window.location.assign(result.url);
    } catch (error) {
      setCheckoutError(
        error instanceof Error ? error.message : "No se pudo iniciar el checkout.",
      );
      setIsCheckingOut(false);
    }
  }

  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-5xl px-6 py-12">
      <h1 className="mb-10 text-4xl font-semibold">Tu carrito</h1>

      {cart.length === 0 ? (
        <section>
          <p className="mb-6">Tu carrito está vacío.</p>
          <Link href="/" className="inline-block bg-black px-5 py-3 text-white">
            Seguir comprando
          </Link>
        </section>
      ) : (
        <div className="grid gap-10 lg:grid-cols-[1fr_280px]">
          <section className="space-y-6">
            {cart.map((item) => (
              <article
                className="flex gap-4 border-b border-black/10 pb-6"
                key={`${item.id}-${item.size ?? ""}`}
              >
                {item.image_url && (
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="h-28 w-24 object-cover"
                  />
                )}
                <div className="flex flex-1 flex-col gap-2">
                  <h2 className="font-semibold">{item.name}</h2>
                  {item.size && <p className="text-sm text-black/60">Talla: {item.size}</p>}
                  <p>{formatPrice(item.price)}</p>
                  <div className="flex items-center gap-3">
                    <label htmlFor={`quantity-${item.id}-${item.size ?? ""}`}>Cantidad</label>
                    <input
                      id={`quantity-${item.id}-${item.size ?? ""}`}
                      className="w-16 border border-black px-2 py-1"
                      min="1"
                      onChange={(event) =>
                        updateItem(item, Number.parseInt(event.target.value, 10) || 0)
                      }
                      type="number"
                      value={item.quantity}
                    />
                    <button
                      className="text-sm underline"
                      onClick={() => updateItem(item, 0)}
                      type="button"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
                <p className="font-semibold">{formatPrice(item.price * item.quantity)}</p>
              </article>
            ))}
          </section>

          <aside className="h-fit border border-black/10 p-6">
            <h2 className="mb-4 text-xl font-semibold">Resumen</h2>
            <div className="mb-6 flex justify-between border-t border-black/10 pt-4 font-semibold">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
            <button
              className="w-full bg-black px-4 py-3 text-white"
              disabled={isCheckingOut}
              onClick={handleCheckout}
              type="button"
            >
              {isCheckingOut ? "Redirigiendo..." : "Finalizar compra"}
            </button>
            {checkoutError && (
              <p className="mt-3 text-sm text-red-700" role="alert">
                {checkoutError}
              </p>
            )}
          </aside>
        </div>
      )}
      </main>
    </>
  );
}
