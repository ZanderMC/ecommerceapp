 
import { createClient } from "@/lib/supabase/server";
import { Product } from "@/app/components/ProductGrid";

type ProductTab = "todo" | "ofertas" | "favoritos";

export async function GetProducts(activeTab: ProductTab = "todo"): Promise<{
    products: Product[];
    message: string;
}> {
    const supabase = await createClient();
    let productQuery = supabase.from("product").select("*");

    if (activeTab === "ofertas") {
        productQuery = productQuery.eq("is_discounted", true);
    }

    if (activeTab === "favoritos") {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return { products: [], message: "Inicia sesión para ver tus productos favoritos." };
        }

        const { data: favorites, error: favoritesError } = await supabase
            .from("favorite")
            .select("product_id")
            .eq("profile_id", user.id);

        if (favoritesError) {
            return { products: [], message: `No se pudieron cargar tus favoritos: ${favoritesError.message}` };
        }

        const productIds = favorites?.map((favorite) => favorite.product_id) ?? [];

        if (productIds.length === 0) {
            return { products: [], message: "Aún no tienes productos favoritos." };
        }

        productQuery = productQuery.in("id", productIds);
    }

    const { data: products, error } = await productQuery;

    if (error) {
        return { products: [], message: `Error al consultar los productos: ${error.message}` };
    }

    return {
        products: (products ?? []) as Product[],
        message: activeTab === "ofertas"
            ? "No hay productos en oferta en este momento."
            : "No hay productos para mostrar.",
    };
}
