

export function SearchBar(){

    return(
         <div className="fadeIn h-auto w-[20rem] mx-auto py-2 px-6 rounded-2xl border-2 border-gray-300 bg-white flex items-center justify-between mb-16">
            <input
            type="text"
            placeholder="¿Qué estás buscando?"
            className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
            </svg>
        </div>
    )
}


   