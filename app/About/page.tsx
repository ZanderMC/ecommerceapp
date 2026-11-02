
import { Header } from "../components/Header";

export default function About() {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-16 sm:px-10 lg:px-12 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <section className="flex flex-col justify-start mt-10">
            <h1 className="text-4xl font-medium tracking-tight text-slate-950 sm:text-5xl">
              Sobre Nosotros
            </h1>
            <p className="mt-8 max-w-xl text-base leading-7 text-slate-900">
              Somos una tienda de moda creada para quienes buscan prendas
              versátiles, cómodas y con personalidad. Seleccionamos cada
              producto pensando en la calidad, el diseño y en las piezas que
              realmente quieres llevar todos los días.
            </p>
            <p className="mt-6 max-w-xl text-base leading-7 text-slate-900">
              Creemos que comprar ropa debería ser una experiencia sencilla,
              clara y agradable. Por eso cuidamos cada detalle, desde la
              selección de nuestras colecciones hasta la forma en que
              preparamos cada pedido.
            </p>
          </section>

          <section className="border-t border-slate-300 pt-8 lg:mt-4">
            <h2 className="text-2xl font-medium tracking-tight text-slate-950">
              Lo que nos representa
            </h2>
            <div className="mt-8 space-y-8">
              <div>
                <h3 className="text-base font-medium text-slate-950">
                  Diseño para todos los días
                </h3>
                <p className="mt-2 text-base leading-7 text-slate-700">
                  Prendas fáciles de combinar que se adaptan a tu estilo y a
                  tu ritmo.
                </p>
              </div>
              <div>
                <h3 className="text-base font-medium text-slate-950">
                  Selección consciente
                </h3>
                <p className="mt-2 text-base leading-7 text-slate-700">
                  Apostamos por piezas bien hechas y por una colección
                  cuidada, sin compras innecesarias.
                </p>
              </div>
              <div>
                <h3 className="text-base font-medium text-slate-950">
                  Atención cercana
                </h3>
                <p className="mt-2 text-base leading-7 text-slate-700">
                  Estamos disponibles para ayudarte antes, durante y después
                  de tu compra.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}