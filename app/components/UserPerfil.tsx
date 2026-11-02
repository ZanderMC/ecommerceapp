'use client'

import Link from "next/link"
import { useState } from "react"

type UserPerfilProps = {
    isLoggedIn: boolean
    onLogout: () => Promise<void>
}

export function UserPerfil({ isLoggedIn, onLogout }: UserPerfilProps){
 
    const [isOpen , setIsOpen] = useState(false)
     
    return(
        <section className="relative">
        <button onClick={()=>{setIsOpen(!isOpen)}} className="size-6 rounded-full bg-[url('/userperfil.webp')] bg-cover bg-center">
          
        </button>
        
        {isOpen && <article  className="absolute right-0 top-9 z-30 flex min-w-32 cursor-pointer flex-col gap-2 rounded border border-gray-400 bg-white p-3 shadow-sm">
            {isLoggedIn ? (
                <button
                    type="button"
                    onClick={onLogout}
                    className="px-3 py-2 bg-black text-white text-[12px] cursor-pointer"
                >
                    Logout
                </button>
                
            ) : (
                <>
                    <Link href={'/Register'}  className=" px-3 py-2 bg-black text-white text-[12px] cursor-pointer ">Register</Link>
                    <Link href={"/Login"} className=" px-3 py-2 bg-black text-white text-[12px] cursor-pointer ">Log in</Link>
                </>
            )}
        </article>}
        </section>
    )
}