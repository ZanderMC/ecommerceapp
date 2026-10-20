

import { Header } from "../components/Header";

export default function Contact() {
  return (
    <>
      <Header />
      <main className="mx-auto grid w-full max-w-6xl flex-1 gap-12 px-6 py-16 sm:px-10 lg:grid-cols-2 lg:gap-20 lg:px-12 lg:py-24">
        <section className="flex flex-col justify-center">
          <h1 className="text-4xl font-medium tracking-tight text-slate-950 sm:text-5xl">
            Contáctanos
          </h1>
          <p className="mt-8 max-w-xl text-base leading-7 text-slate-900">
            ¿Tienes alguna pregunta sobre nuestros productos, tu pedido o los
            envíos? Escríbenos y nuestro equipo te responderá lo antes posible.
            Queremos ayudarte a encontrar tus prendas favoritas y ofrecerte
            una experiencia de compra sencilla y segura.
          </p>
          <p className="mt-6 text-base text-slate-900">
            Atendemos de lunes a viernes, de 9:00 a 18:00 h.
          </p>
        </section>

        <form className="space-y-6" action="#" method="post">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label
                className="mb-2 block text-sm text-slate-950"
                htmlFor="nombre"
              >
                Nombre <span className="text-slate-500">(obligatorio)</span>
              </label>
              <input
                className="h-13 w-full border border-slate-500 bg-white px-3 text-base outline-none transition focus:border-slate-950 focus:ring-1 focus:ring-slate-950"
                id="nombre"
                name="nombre"
                required
                type="text"
              />
            </div>
            <div>
              <label
                className="mb-2 block text-sm text-slate-950"
                htmlFor="apellido"
              >
                Apellido <span className="text-slate-500">(obligatorio)</span>
              </label>
              <input
                className="h-13 w-full border border-slate-500 bg-white px-3 text-base outline-none transition focus:border-slate-950 focus:ring-1 focus:ring-slate-950"
                id="apellido"
                name="apellido"
                required
                type="text"
              />
            </div>
          </div>

          <div>
            <label
              className="mb-2 block text-sm text-slate-950"
              htmlFor="correo"
            >
              Correo electrónico{" "}
              <span className="text-slate-500">(obligatorio)</span>
            </label>
            <input
              className="h-13 w-full border border-slate-500 bg-white px-3 text-base outline-none transition focus:border-slate-950 focus:ring-1 focus:ring-slate-950"
              id="correo"
              name="correo"
              required
              type="email"
            />
          </div>

          <div>
            <label
              className="mb-2 block text-sm text-slate-950"
              htmlFor="asunto"
            >
              Asunto <span className="text-slate-500">(obligatorio)</span>
            </label>
            <input
              className="h-13 w-full border border-slate-500 bg-white px-3 text-base outline-none transition focus:border-slate-950 focus:ring-1 focus:ring-slate-950"
              id="asunto"
              name="asunto"
              required
              type="text"
            />
          </div>

          <div>
            <label
              className="mb-2 block text-sm text-slate-950"
              htmlFor="mensaje"
            >
              Mensaje <span className="text-slate-500">(obligatorio)</span>
            </label>
            <textarea
              className="min-h-32 w-full resize-y border border-slate-500 bg-white px-3 py-2 text-base outline-none transition focus:border-slate-950 focus:ring-1 focus:ring-slate-950"
              id="mensaje"
              name="mensaje"
              required
            />
          </div>

          <button
            className="bg-black px-8 py-4 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
            type="submit"
          >
            Enviar
          </button>
        </form>
      </main>
    </>
  );
}