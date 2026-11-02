


export function Footer() {

    return (
        <footer className="mt-auto w-full px-5 py-16 text-center sm:px-8 sm:py-24">
            <div className="flex justify-center gap-5">
                <a href="">IG</a>
                <a href="">FB</a>
            </div>
            <p className="mt-6 text-sm">Regístrate para recibir ofertas y actualizaciones</p>

            <div className="mt-5">
                <form className="mx-auto mt-5 flex w-full max-w-md flex-col gap-2 sm:flex-row">
                    <input className="min-w-0 flex-1 border border-black/20 px-4 py-3" type="email" placeholder="Ingresa tu email" required />
                    <button className="bg-black px-5 py-3 text-white" type="submit">Enviar</button>
                </form>
            </div>

            <p className="mt-12 text-xs text-black/60">Hecho por Michael Bravo 🚀</p>
        </footer>
    )
}