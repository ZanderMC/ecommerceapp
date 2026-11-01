import Link from "next/link";
import { LogOut } from "@/server/auth-action";
import { createClient } from "@/lib/supabase/server";
import { UserPerfil } from "./UserPerfil";
import { CartIcon } from "./CartIcon";

export async function Header(){
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

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
       <UserPerfil isLoggedIn={Boolean(user)} logoutAction={LogOut}/>
    </div>
</header> 
    )
}