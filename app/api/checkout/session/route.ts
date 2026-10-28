import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@/lib/supabase/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "");

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get("session_id");

  if (!sessionId || !sessionId.startsWith("cs_")) {
    return NextResponse.json({ error: "Sesión de checkout inválida." }, { status: 400 });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Debes iniciar sesión." }, { status: 401 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.metadata?.user_id !== user.id) {
      return NextResponse.json({ error: "No tienes acceso a esta transacción." }, { status: 403 });
    }

    const orderId = Number(session.metadata?.order_id);

    if (!Number.isSafeInteger(orderId) || orderId <= 0) {
      return NextResponse.json(
        { error: "La sesión no contiene una orden válida." },
        { status: 502 },
      );
    }

    const status =
      session.payment_status !== "unpaid" && session.status === "complete"
        ? "paid"
        : "pending";

    return NextResponse.json({
      sessionId: session.id,
      orderId,
      amount: (session.amount_total ?? 0) / 100,
      currency: session.currency ?? "pen",
      status,
      paymentStatus: session.payment_status,
      paidAt: status === "paid" ? new Date().toISOString() : null,
      customerEmail: session.customer_details?.email ?? null,
    });
  } catch (error) {
    console.error("Error al recuperar la sesión de Checkout:", error);
    return NextResponse.json(
      { error: "No se pudo consultar la transacción." },
      { status: 500 },
    );
  }
}
