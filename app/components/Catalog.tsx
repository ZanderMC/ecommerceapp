import { CatalogTabs } from "./CatalogTabs";
import { GetProducts } from "../../utils/page";

export async function Catalog(){
    const [allProducts, offers, favorites] = await Promise.all([
        GetProducts("todo"),
        GetProducts("ofertas"),
        GetProducts("favoritos"),
    ]);

    return(
       <section className=" w-full px-5 py-8 sm:px-8 lg:px-16"     >
    {/**<hr className="border-t border-gray-300 mb-10"/>   */} 
               
                  <CatalogTabs
                      allProducts={allProducts.products}
                      offers={offers.products}
                      favorites={favorites.products}
                      offersMessage={offers.message}
                      favoritesMessage={favorites.message}
                  />
              
        </section>
       
    )
}
