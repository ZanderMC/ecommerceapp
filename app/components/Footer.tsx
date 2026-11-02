


export function Footer() {

    return (
        <footer className="h-auto w-full px-5 py-16 text-center sm:px-8 sm:pt-32">
            <div>
                IG
                FB
            </div>
            <span>Registrate para tener mas ofertas ya ctualisaciones</span>

            <div>
                <form className="mx-auto mt-5 flex w-full max-w-md flex-col gap-2 sm:flex-row">
                    <input className="min-w-0 flex-1 border border-black/20 px-4 py-3" type="email" placeholder="Ingresa tu email" required />
                    <button className="bg-black px-5 py-3 text-white" type="submit">Enviar</button>
                </form>
            </div>

            <span>Hecho por zandev</span>
        </footer>
    )
}