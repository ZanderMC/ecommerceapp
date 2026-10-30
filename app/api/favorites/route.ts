import { createClient } from "@/lib/supabase/server";

function getProductId(value: unknown): number | null {
  const productId = Number(value);
  return Number.isInteger(productId) && productId > 0 ? productId : null;
}

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return Response.json({ error: "Inicia sesión para gestionar tus favoritos." }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("favorite")
    .select("product_id")
    .eq("profile_id", user.id);

  if (error) {
    console.error("Error al consultar favoritos:", error);
    return Response.json({ error: "No se pudieron cargar tus favoritos." }, { status: 500 });
  }

  return Response.json({ productIds: (data ?? []).map(({ product_id }) => String(product_id)) });
}

export async function POST(request: Request) {
  return updateFavorite(request, "add");
}

export async function DELETE(request: Request) {
  return updateFavorite(request, "remove");
}

async function updateFavorite(request: Request, action: "add" | "remove") {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return Response.json({ error: "Inicia sesión para gestionar tus favoritos." }, { status: 401 });
  }

  let body: { productId?: unknown };
  try {
    body = (await request.json()) as { productId?: unknown };
  } catch {
    return Response.json({ error: "La solicitud no es válida." }, { status: 400 });
  }

  const productId = getProductId(body.productId);
  if (productId === null) {
    return Response.json({ error: "El producto no es válido." }, { status: 400 });
  }

  let error;
  if (action === "add") {
    const { data: existingFavorite, error: lookupError } = await supabase
      .from("favorite")
      .select("id")
      .eq("profile_id", user.id)
      .eq("product_id", productId)
      .maybeSingle();

    if (lookupError) {
      error = lookupError;
    } else if (!existingFavorite) {
      const result = await supabase
        .from("favorite")
        .insert({ profile_id: user.id, product_id: productId });
      error = result.error;
    }
  } else {
    const result = await supabase
      .from("favorite")
      .delete()
      .eq("profile_id", user.id)
      .eq("product_id", productId);
    error = result.error;
  }

  if (error) {
    console.error(`Error al ${action === "add" ? "agregar" : "quitar"} favorito:`, error);
    return Response.json({ error: "No se pudo actualizar tu favorito." }, { status: 500 });
  }

  return Response.json({ isFavorite: action === "add" });
}
