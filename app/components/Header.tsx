"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { UserPerfil } from "./UserPerfil";
import { CartIcon } from "./CartIcon";

export function Header(){
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        let active = true;

        fetch("/api/auth/session", { cache: "no-store" })
            .then(async (response) => {
                if (!response.ok) return;
                const data = (await response.json()) as { isLoggedIn?: boolean };
                if (active) setIsLoggedIn(Boolean(data.isLoggedIn));
            })
            .catch(() => {
                if (active) setIsLoggedIn(false);
            });

        return () => {
            active = false;
        };
    }, []);

    async function handleLogout() {
        const response = await fetch("/api/auth/session", {
            method: "POST",
        });

        if (!response.ok) {
            console.error("Error al cerrar sesión.");
            return;
        }

        setIsLoggedIn(false);
    }

    return(
       <header className ="h-auto grid grid-cols-3 w-full   items-center justify-between px-15 pt-15  ">
    <nav className ="flex text-[1rem] gap-4">
       
     
        <Link href="/">Inicio</Link>
        <Link href="/About">Acerca de</Link>
        <Link href="/Contact">Contacto</Link>
        
    </nav>
    <h1 className ="text-3xl text-center">
     <a href="">Zandev</a>
    </h1>
    <div className ="flex gap-4 justify-end">
    <a href="">IG</a>
    <a href="">FB</a>
    <CartIcon />
       <UserPerfil isLoggedIn={isLoggedIn} onLogout={handleLogout}/>
    </div>
</header> 
    )
}