import { SearchBar } from "./SearchBar";


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
        <section className="w-auto h-auto bg-orange-300 grid grid-cols-4 py-10 gap-8 ">
        <article className=" bg-red-400 w-full h-[70vh]">
        </article>
        <article className=" bg-red-400 w-full h-[70vh]">
        </article>
        <article className=" bg-red-400 w-full h-[70vh]">
        </article>
        <article className=" bg-red-400 w-full h-[70vh]">
        </article>
        <article className=" bg-red-400 w-full h-[70vh]">
        </article>

        </section>
       </section>
    )
}

 