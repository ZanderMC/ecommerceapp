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
      <header className="relative z-20 w-full border-b border-black/5 px-4 py-4 sm:px-8 sm:py-7 lg:border-0 lg:px-15 lg:pt-15">
        <div className="mx-auto grid max-w-7xl grid-cols-[2.5rem_1fr_auto] items-center gap-3 lg:flex lg:justify-between lg:gap-4">
          <button
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            className="flex h-10 w-10 items-center justify-center rounded border border-black/10 text-xl lg:hidden"
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
          <nav id="mobile-navigation" className="mx-auto mt-4 flex max-w-7xl flex-col gap-1 border-t border-black/10 pt-3 text-sm lg:hidden">
            <Link className="rounded px-3 py-3 hover:bg-black/5" href="/" onClick={() => setIsMenuOpen(false)}>Inicio</Link>
            <Link className="rounded px-3 py-3 hover:bg-black/5" href="/About" onClick={() => setIsMenuOpen(false)}>Acerca de</Link>
            <Link className="rounded px-3 py-3 hover:bg-black/5" href="/Contact" onClick={() => setIsMenuOpen(false)}>Contacto</Link>
            <div className="flex gap-5 px-3 py-3 sm:hidden">
              <a href="">Instagram</a>
              <a href="">Facebook</a>
            </div>
          </nav>
        )}
      </header>
    )
}