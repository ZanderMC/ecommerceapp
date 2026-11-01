'use client'

import Link from "next/link"
import { useState } from "react"

type UserPerfilProps = {
    isLoggedIn: boolean
    logoutAction: () => Promise<void>
}

export function UserPerfil({ isLoggedIn, logoutAction }: UserPerfilProps){
 
    const [isOpen , setIsOpen] = useState(false)
     
    return(
        <section className="relative">
        <button onClick={()=>{setIsOpen(!isOpen)}} className="bg-green-300 rounded-full size-6   ">
          
        </button>
        
        {isOpen && <article  className=" cursor-pointer absolute z-10  -bottom-27 -left-19 bg-white  rounded border-gray-400 border-1 border-solid p-4 flex flex-col gap-2 c">
            {isLoggedIn ? (
                <form action={logoutAction}>
                    <button type="submit" className="px-3 py-2 bg-black text-white text-[12px] cursor-pointer">
                        Cerrar sesión
                    </button>
                </form>
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