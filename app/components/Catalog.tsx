import { Suspense } from "react";
import { SearchBar } from "./SearchBar";
import { GetAllProducts } from "../../utils/page";


export function Catalog(){
    return(
       <section className="w-screen h-screen    px-[4rem] "     >
        <div className="flex justify-center items-center mb-8">
        <button className="tab-button px-6 py-3 font-medium text-gray-700 hover:text-gray-900 focus:outline-none transition-colors duration-200 active" data-tab="todo">
            Todo
        </button>
        <div className="w-px h-6 bg-gray-300 mx-4"></div>
        <button className="tab-button px-6 py-3 font-medium text-gray-700 hover:text-gray-900 focus:outline-none transition-colors duration-200" data-tab="ofertas">
            Ofertas
        </button>
        <div className="w-px h-6 bg-gray-300 mx-4"></div>
        <button className="tab-button px-6 py-3 font-medium text-gray-700 hover:text-gray-900 focus:outline-none transition-colors duration-200" data-tab="favoritos">
            Favoritos
        </button>
        
    </div>
    
    <hr className="border-t border-gray-300 mb-10"/>   

        <SearchBar/>
      
              <main>
                  <h1>Conexión con Supabase</h1>
      
                  <Suspense
                      fallback={<p>Cargando datos de Supabase...</p>}
                  >
                      <GetAllProducts />
                  </Suspense>
              </main>
         

        </section>
       
    )
}

  