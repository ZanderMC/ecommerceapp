import Link from "next/link";
import { UserPerfil } from "./UserPerfil";
import { CartIcon } from "./CartIcon";

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
    <CartIcon />
       <UserPerfil/>
    </div>
</header> 
    )
}