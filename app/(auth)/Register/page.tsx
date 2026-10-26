import Link from "next/link";

import { signup } from "@/server/auth-action";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6 py-12 text-black">
      <section className="grid w-full max-w-4xl overflow-hidden bg-white lg:grid-cols-2">
        <div className="hidden min-h-[560px] flex-col justify-between p-10 text-black lg:flex">
          <div className="flex items-center justify-between">
            <span className="text-xl font-black tracking-[-0.12em]">ZANDEV</span>
            <Link href="/" className="text-sm text-white/60 transition hover:text-white">
              Volver al inicio
            </Link>
          </div>
          <div>
            <p className="max-w-xs text-4xl font-semibold leading-tight">
              Encuentra lo
              <br />
              esencial.
            </p>
            <p className="mt-5 max-w-xs text-sm leading-6 text-white/50">
              Crea una cuenta y disfruta una experiencia de compra sencilla.
            </p>
          </div>
        </div>

        <div className="flex items-center px-6 py-16 sm:px-12">
          <div className="w-full max-w-sm">
            <div className="mb-10">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-black/50">
                Zandev Store
              </p>
              <h1 className="text-3xl font-semibold tracking-tight">Crea tu cuenta</h1>
              <p className="mt-3 text-sm leading-6 text-black/50">
                Regístrate con tu correo y contraseña para comenzar.
              </p>
            </div>

            <form action={signup} className="space-y-5">
              <div>
                <label htmlFor="register-email" className="mb-2 block text-sm font-medium">
                  Correo electrónico
                </label>
                <input
                  id="register-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="tu@correo.com"
                  className="w-full bg-black/[0.06] px-4 py-3 text-sm outline-none transition placeholder:text-black/30 focus:bg-black/[0.1]"
                />
              </div>

              <div>
                <label htmlFor="register-password" className="mb-2 block text-sm font-medium">
                  Contraseña
                </label>
                <input
                  id="register-password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  minLength={6}
                  required
                  placeholder="Mínimo 6 caracteres"
                  className="w-full bg-black/[0.06] px-4 py-3 text-sm outline-none transition placeholder:text-black/30 focus:bg-black/[0.1]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
              >
                Crear cuenta
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-black/50">
              ¿Ya tienes una cuenta?{" "}
              <Link href="/Login" className="font-semibold text-black hover:underline">
                Inicia sesión
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
