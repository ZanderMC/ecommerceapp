"use client";

import { useCallback, useState } from "react";
import { ProductGrid, Product } from "./ProductGrid";
import { SearchBar } from "./SearchBar";

type CatalogTabsProps = {
  allProducts: Product[];
  offers: Product[];
  favorites: Product[];
  offersMessage: string;
  favoritesMessage: string;
};

const tabs = [
  { id: "todo", label: "Todo" },
  { id: "ofertas", label: "Ofertas" },
  { id: "favoritos", label: "Favoritos" },
] as const;

export function CatalogTabs({
  allProducts,
  offers,
  favorites,
  offersMessage,
  favoritesMessage,
}: CatalogTabsProps) {
  const [activeTab, setActiveTab] =
    useState<(typeof tabs)[number]["id"]>("todo");
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  const content = {
    todo: { products: allProducts, emptyMessage: "No hay productos para mostrar." },
    ofertas: { products: offers, emptyMessage: offersMessage },
    favoritos: { products: favorites, emptyMessage: favoritesMessage },
  };
  const activeContent = content[activeTab];

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <div className="  mb-8 flex flex-wrap items-center justify-center gap-2" role="tablist">
        {tabs.map((tab, index) => (
          <div className="flex items-center" key={tab.id}>
            {index > 0 && <div className="mx-1 hidden h-6 w-px bg-gray-300 sm:mx-3 sm:block" />}
            <button
              aria-selected={activeTab === tab.id}
              className={`px-4 py-3 text-sm font-medium transition-colors duration-200 sm:px-6 sm:text-base ${
                activeTab === tab.id
                  ? "text-gray-900 underline underline-offset-8"
                  : "text-gray-700 hover:text-gray-900"
              }`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              type="button"
            >
              {tab.label}
            </button>
          </div>
        ))}
      </div>
      <ProductGrid
        emptyMessage={activeContent.emptyMessage}
        isFavoritesView={activeTab === "favoritos"}
        products={activeContent.products}
        searchTerm={searchTerm}
      />
    </>
  );
}
