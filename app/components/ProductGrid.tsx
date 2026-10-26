"use client";

import Link from "next/link";

export type Product = {
  id: string | number;
  image_url?: string | null;
  name?: string | null;
  price?: number | string | null;
};

type ProductGridProps = {
  products: Product[];
  searchTerm: string;
  emptyMessage: string;
};

export function ProductGrid({  products,  searchTerm,  emptyMessage,}: ProductGridProps) {
  
  const filteredProducts = products.filter((product) =>
    (product.name ?? "").toLowerCase().includes(searchTerm),
  );

  if (filteredProducts.length === 0) {
    return (
      <p>
        {searchTerm
          ? "No encontramos productos que coincidan con tu búsqueda."
          : emptyMessage}
      </p>
    );
  }

  return (
    <div className="grid h-auto w-full grid-cols-1 gap-8 pb-[2rem] sm:grid-cols-2 lg:grid-cols-4">
      {filteredProducts.map((product) => (
        <Link
          className="w-full"
          href={`/Product/${product.id}/`}
          key={product.id}
        >
          <div className="h-[60vh] w-full">
            {product.image_url ? (
              <img
                alt={product.name ?? "Producto"}
                className="h-full w-full object-cover"
                src={product.image_url}
              />
            ) : (
              <span>Imagen no disponible</span>
            )}
          </div>
          <div className="px-4 pt-3">
            <h2 className="text-[1.5rem] font-medium">
              {product.name || "Nombre del producto"}
            </h2>
            <span className="text-xs font-light">
              {product.price ? `${product.price} SOLES` : "Precio no disponible"}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
