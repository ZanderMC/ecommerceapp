import Link from 'next/link'

type ErrorPageProps = {
  searchParams: Promise<{ message?: string }>
}

//export const instant = false

export default async function ErrorPage({ searchParams }: ErrorPageProps) {
  const { message } = await searchParams

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6 py-12 text-black">
      <section className="w-full max-w-md bg-black p-8 text-white">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
          Zandev Store
        </p>
        <h1 className="text-3xl font-semibold">No se pudo completar la acción</h1>
        <p className="mt-4 text-sm leading-6 text-white/65">
          {message ?? 'Ocurrió un error inesperado. Inténtalo nuevamente.'}
        </p>
        <div className="mt-8 flex gap-5 text-sm">
          <Link href="/Register" className="underline underline-offset-4">
            Volver a registrarme
          </Link>
          <Link href="/Login" className="text-white/65 underline underline-offset-4">
            Ir a iniciar sesión
          </Link>
        </div>
      </section>
    </main>
  )
}
