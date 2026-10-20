import { CatalogTabs } from "./CatalogTabs";
import { GetProducts } from "../../utils/page";

export async function Catalog(){
    const [allProducts, offers, favorites] = await Promise.all([
        GetProducts("todo"),
        GetProducts("ofertas"),
        GetProducts("favoritos"),
    ]);

    return(
       <section className="w-screen h-screen px-[4rem] "     >
    <hr className="border-t border-gray-300 mb-10"/>   
              <main>
                  <CatalogTabs
                      allProducts={allProducts.products}
                      offers={offers.products}
                      favorites={favorites.products}
                      offersMessage={offers.message}
                      favoritesMessage={favorites.message}
                  />
              </main>
        </section>
       
    )
}

  