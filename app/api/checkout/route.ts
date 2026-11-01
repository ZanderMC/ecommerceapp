import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getStripeClient } from "@/lib/stripe";

type CartItemInput = {
  id: string | number;
  quantity: number;
  size?: string;
};

function getAppUrl(request: NextRequest) {
  const configuredUrl = process.env.NEXT_PUBLIC_APP_URL;

  if (configuredUrl?.startsWith("http://") || configuredUrl?.startsWith("https://")) {
    return configuredUrl.replace(/\/$/, "");
  }

  return request.nextUrl.origin;
}

export async function POST(request: NextRequest) {
  let stripe: ReturnType<typeof getStripeClient>;

  try {
    stripe = getStripeClient();
  } catch {
    return NextResponse.json(
      { error: "Stripe no está configurado en el servidor." },
      { status: 500 },
    );
  }

  let body: { items?: CartItemInput[] };

  try {
    body = (await request.json()) as { items?: CartItemInput[] };
  } catch {
    return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 });
  }

  if (!Array.isArray(body.items) || body.items.length === 0) {
    return NextResponse.json({ error: "El carrito está vacío." }, { status: 400 });
  }

  const items = body.items.map((item) => ({
    id: String(item.id),
    quantity: Number(item.quantity),
    size: typeof item.size === "string" ? item.size : undefined,
  }));

  if (
    items.some(
      (item) =>
        !item.id ||
        !Number.isInteger(item.quantity) ||
        item.quantity < 1 ||
        item.quantity > 99,
    )
  ) {
    return NextResponse.json({ error: "Los artículos del carrito no son válidos." }, { status: 400 });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { error: "Debes iniciar sesión para finalizar la compra." },
      { status: 401 },
    );
  }

  const productIds = [...new Set(items.map((item) => item.id))];
  const { data: products, error: productsError } = await supabase
    .from("product")
    .select("id, name, description, price, image_url, sizes")
    .in("id", productIds);

  if (productsError) {
    console.error("Error al consultar productos para Checkout:", productsError);
    return NextResponse.json({ error: "No se pudieron validar los productos." }, { status: 500 });
  }

  const productsById = new Map((products ?? []).map((product) => [String(product.id), product]));

  if (productsById.size !== productIds.length) {
    return NextResponse.json(
      { error: "Uno o más productos ya no están disponibles." },
      { status: 400 },
    );
  }

  const orderItems = items.map((item) => {
    const product = productsById.get(item.id)!;
    return {
      product_id: product.id,
      quantity: item.quantity,
      unit_price: Number(product.price),
      product,
      size: item.size,
    };
  });

  if (orderItems.some((item) => !Number.isFinite(item.unit_price) || item.unit_price < 0)) {
    return NextResponse.json(
      { error: "Uno o más productos tienen un precio inválido." },
      { status: 500 },
    );
  }

  const amount = orderItems.reduce(
    (total, item) => total + item.unit_price * item.quantity,
    0,
  );

  if (amount <= 0) {
    return NextResponse.json({ error: "El importe de la compra no es válido." }, { status: 400 });
  }

  const { data: order, error: orderError } = await supabase
    .from("customer_order")
    .insert({ profile_id: user.id })
    .select("id")
    .single();

  if (orderError || !order) {
    console.error("Error al crear la orden:", orderError);
    return NextResponse.json({ error: "No se pudo crear la orden." }, { status: 500 });
  }

  const { error: orderItemsError } = await supabase.from("order_item").insert(
    orderItems.map((item) => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      unit_price: item.unit_price,
    })),
  );

  if (orderItemsError) {
    console.error("Error al crear los artículos de la orden:", orderItemsError);
    return NextResponse.json({ error: "No se pudo crear la orden." }, { status: 500 });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: orderItems.map((item) => ({
      price_data: {
        currency: "pen",
        product_data: {
          name: item.product.name,
          ...(item.product.description ? { description: item.product.description } : {}),
          ...(item.product.image_url ? { images: [item.product.image_url] } : {}),
        },
        unit_amount: Math.round(item.unit_price * 100),
      },
      quantity: item.quantity,
    })),
    metadata: {
      order_id: String(order.id),
      profile_id: user.id,
    },
    success_url: `${getAppUrl(request)}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${getAppUrl(request)}/checkout/cancelled`,
    integration_identifier: `ecommerce_checkout_${crypto.randomUUID().replace(/-/g, "").slice(0, 8)}`,
  });

  const { error: paymentError } = await supabase.from("payment").insert({
    order_id: order.id,
    stripe_checkout_session_id: session.id,
    amount,
    currency: "pen",
    status: "pending",
  });

  if (paymentError) {
    console.error("Error al registrar el pago:", paymentError);
    return NextResponse.json({ error: "No se pudo registrar el pago." }, { status: 500 });
  }

  return NextResponse.json({ url: session.url });
}
