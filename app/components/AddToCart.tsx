"use client";

import { useState } from "react";
import { addToCart, CartProduct } from "@/lib/cart";

type AddToCartProps = {
  product: CartProduct;
  sizes: string[];
};

export function AddToCart({ product, sizes }: AddToCartProps) {
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(sizes[0] ?? "");
  const [message, setMessage] = useState("");

  function updateQuantity(value: string) {
    const parsedValue = Number.parseInt(value, 10);
    setQuantity(Number.isNaN(parsedValue) ? 1 : Math.max(1, parsedValue));
  }

  function handleAddToCart() {
    addToCart({
      ...product,
      quantity,
      ...(size ? { size } : {}),
    });
    setMessage("Producto añadido al carrito.");
  }

  return (
    <div className="mt-4 flex flex-col gap-4">
      {sizes.length > 0 && (
        <div>
          <label htmlFor="size" className="mb-2 block font-semibold">
            Selecciona una talla:
          </label>
          <select
            id="size"
            value={size}
            onChange={(event) => setSize(event.target.value)}
            className="w-full border border-black px-2 py-3"
          >
            {sizes.map((currentSize) => (
              <option value={currentSize} key={currentSize}>
                {currentSize}
              </option>
            ))}
          </select>
        </div>
      )}

      <div>
        <label htmlFor="quantity" className="mb-2 block font-semibold">
          Cantidad:
        </label>
        <div className="flex w-fit items-center border border-black">
          <button
            aria-label="Disminuir cantidad"
            className="flex h-11 w-10 items-center justify-center text-xl hover:bg-gray-100"
            onClick={() => setQuantity((current) => Math.max(1, current - 1))}
            type="button"
          >
            -
          </button>
          <input
            aria-label="Cantidad"
            className="h-11 w-12 border-x border-black text-center outline-none"
            id="quantity"
            min="1"
            onChange={(event) => updateQuantity(event.target.value)}
            type="number"
            value={quantity}
          />
          <button
            aria-label="Aumentar cantidad"
            className="flex h-11 w-10 items-center justify-center text-xl hover:bg-gray-100"
            onClick={() => setQuantity((current) => current + 1)}
            type="button"
          >
            +
          </button>
        </div>
      </div>

      <button
        onClick={handleAddToCart}
        className="mt-2 rounded bg-black px-4 py-4 text-white transition-colors hover:bg-black/90"
        type="button"
      >
        Añadir al carrito
      </button>
      {message && <p className="text-sm text-green-700">{message}</p>}
    </div>
  );
}
