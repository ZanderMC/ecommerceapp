import Link from "next/link";
import { UserPerfil } from "./UserPerfil";

export function Header(){

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
    <a href="/ShoppingCart" className ="relative">
    🛒 
    <span id="cart-count" className ="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
        0
    </span>
    </a>
       <UserPerfil/>
    </div>
</header> 
    )
}