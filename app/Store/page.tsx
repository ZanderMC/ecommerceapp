import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";

export default function Store() {
    return (
        <main>
            <h1>Conexión con Supabase</h1>

            <Suspense
                fallback={<p>Cargando datos de Supabase...</p>}
            >
                <StoreData />
            </Suspense>
        </main>
    );
}

async function StoreData() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("test")
        .select("*");

    if (error) {
        return (
            <p>
                Error al consultar la tabla test: {error.message}
            </p>
        );
    }

    const row = data?.[0];

    return (
        <>
            <p>
                La consulta a la tabla test se completó correctamente.
            </p>

            {row ? (
                <pre>{JSON.stringify(row, null, 2)}</pre>
            ) : (
                <p>La tabla test no contiene filas.</p>
            )}
        </>
    );
}