"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { UserPerfil } from "./UserPerfil";
import { CartIcon } from "./CartIcon";

export function Header(){
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      <header className="relative z-20 w-full px-5 py-5 sm:px-8 sm:py-7 lg:px-15 lg:pt-15">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <button
            aria-expanded={isMenuOpen}
            aria-label="Abrir menú"
            className="flex h-10 w-10 items-center justify-center text-xl lg:hidden"
            onClick={() => setIsMenuOpen((open) => !open)}
            type="button"
          >
            {isMenuOpen ? "×" : "☰"}
          </button>
          <nav className="hidden items-center gap-5 text-sm sm:gap-6 lg:flex">
            <Link href="/">Inicio</Link>
            <Link href="/About">Acerca de</Link>
            <Link href="/Contact">Contacto</Link>
          </nav>
          <h1 className="text-center text-2xl sm:text-3xl lg:absolute lg:left-1/2 lg:-translate-x-1/2">
            <Link href="/">Zandev</Link>
          </h1>
          <div className="ml-auto flex items-center justify-end gap-3 text-sm sm:gap-4">
            <a className="hidden sm:inline" href="">IG</a>
            <a className="hidden sm:inline" href="">FB</a>
            <CartIcon />
            <UserPerfil isLoggedIn={isLoggedIn} onLogout={handleLogout}/>
          </div>
        </div>
        {isMenuOpen && (
          <nav className="mt-4 flex flex-col gap-4 border-t border-black/10 pt-4 text-sm lg:hidden">
            <Link href="/" onClick={() => setIsMenuOpen(false)}>Inicio</Link>
            <Link href="/About" onClick={() => setIsMenuOpen(false)}>Acerca de</Link>
            <Link href="/Contact" onClick={() => setIsMenuOpen(false)}>Contacto</Link>
          </nav>
        )}
      </header>
    )
}