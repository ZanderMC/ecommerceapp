"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

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
  isFavoritesView?: boolean;
};

export function ProductGrid({
  products,
  searchTerm,
  emptyMessage,
  isFavoritesView = false,
}: ProductGridProps) {
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(
    () => new Set(isFavoritesView ? products.map((product) => String(product.id)) : []),
  );
  const [favoritesLoaded, setFavoritesLoaded] = useState(!isFavoritesView);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    fetch("/api/favorites")
      .then(async (response) => {
        if (!response.ok) return null;
        return (await response.json()) as { productIds?: string[] };
      })
      .then((data) => {
        if (!active) return;
        if (data?.productIds) setFavoriteIds(new Set(data.productIds));
        setFavoritesLoaded(true);
      })
      .catch(() => {
        if (active) setFavoritesLoaded(true);
      });

    return () => {
      active = false;
    };
  }, []);

  const filteredProducts = useMemo(
    () =>
      products.filter(
        (product) =>
          (!isFavoritesView || (favoritesLoaded && favoriteIds.has(String(product.id)))) &&
          (product.name ?? "").toLowerCase().includes(searchTerm),
      ),
    [favoriteIds, favoritesLoaded, isFavoritesView, products, searchTerm],
  );

  async function toggleFavorite(event: React.MouseEvent<HTMLButtonElement>, productId: string) {
    event.preventDefault();
    event.stopPropagation();
    const isFavorite = favoriteIds.has(productId);
    setUpdatingId(productId);

    try {
      const response = await fetch("/api/favorites", {
        method: isFavorite ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });

      if (response.status === 401) {
        toast.error("Inicia sesión para agregar productos a favoritos.");
        return;
      }
      if (!response.ok) {
        toast.error("No se pudo actualizar tu favorito.");
        return;
      }

      setFavoriteIds((current) => {
        const next = new Set(current);
        if (isFavorite) next.delete(productId);
        else next.add(productId);
        return next;
      });
      toast.success(
        isFavorite
          ? "Producto quitado de favoritos."
          : "Producto añadido a favoritos.",
      );
    } finally {
      setUpdatingId(null);
    }
  }

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
    <div className="grid h-auto w-full grid-cols-2 gap-x-3 gap-y-8 pb-8 sm:gap-6 lg:grid-cols-4">
      {filteredProducts.map((product) => (
        <Link
          className="w-full"
          href={`/Product/${product.id}/`}
          key={product.id}
        >
          <div className="relative aspect-[3/4] w-full">
            {product.image_url ? (
              <img
                alt={product.name ?? "Producto"}
                className="h-full w-full object-cover"
                src={product.image_url}
              />
            ) : (
              <span>Imagen no disponible</span>
            )}
            <button
              aria-label={
                favoriteIds.has(String(product.id))
                  ? `Quitar ${product.name ?? "producto"} de favoritos`
                  : `Agregar ${product.name ?? "producto"} a favoritos`
              }
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-2xl shadow transition-transform cursor-pointer disabled:opacity-50"
              disabled={updatingId === String(product.id)}
              onClick={(event) => toggleFavorite(event, String(product.id))}
              type="button"
            >
              <span aria-hidden="true" className={favoriteIds.has(String(product.id)) ? "text-red-500" : "text-gray-700"}>
                {favoriteIds.has(String(product.id)) ? "♥" : "♡"}
              </span>
            </button>
          </div>
          <div className="px-1 pt-3 sm:px-2">
            <h2 className="text-base font-medium sm:text-xl">
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
