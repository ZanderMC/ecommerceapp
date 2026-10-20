"use client";

import { useState } from "react";

export function QuantitySelector() {
  const [quantity, setQuantity] = useState(1);

  function decreaseQuantity() {
    setQuantity((currentQuantity) => Math.max(1, currentQuantity - 1));
  }

  function increaseQuantity() {
    setQuantity((currentQuantity) => currentQuantity + 1);
  }

  function updateQuantity(value: string) {
    const parsedValue = Number.parseInt(value, 10);
    setQuantity(Number.isNaN(parsedValue) ? 1 : Math.max(1, parsedValue));
  }

  return (
    <div className="flex w-fit items-center border border-black">
      <button
        aria-label="Disminuir cantidad"
        className="flex h-11 w-10 items-center justify-center text-xl hover:bg-gray-100"
        onClick={decreaseQuantity}
        type="button"
      >
        -
      </button>
      <input
        aria-label="Cantidad"
        className="h-11 w-12 border-x border-black text-center outline-none"
        id="quantity"
        min="1"
        name="quantity"
        onChange={(event) => updateQuantity(event.target.value)}
        type="number"
        value={quantity}
      />
      <button
        aria-label="Aumentar cantidad"
        className="flex h-11 w-10 items-center justify-center text-xl hover:bg-gray-100"
        onClick={increaseQuantity}
        type="button"
      >
        +
      </button>
    </div>
  );
}
