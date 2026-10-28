import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createServiceClient } from "@/lib/supabase/service";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "");

export async function POST(request: NextRequest) {
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret || !process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: "Webhook de Stripe no configurado." }, { status: 500 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      await request.text(),
      signature,
      webhookSecret,
    );
  } catch (error) {
    console.error("Firma de webhook Stripe inválida:", error);
    return NextResponse.json({ error: "Firma inválida." }, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const orderId = session.metadata?.order_id;

  if (
    !orderId ||
    (event.type !== "checkout.session.completed" &&
      event.type !== "checkout.session.async_payment_succeeded" &&
      event.type !== "checkout.session.async_payment_failed")
  ) {
    return NextResponse.json({ received: true });
  }

  const supabase = createServiceClient();
  const status =
    event.type === "checkout.session.async_payment_failed"
      ? "failed"
      : session.payment_status !== "unpaid"
        ? "paid"
        : "pending";

  const { error } = await supabase
    .from("payment")
    .update({
      status,
      stripe_payment_intent_id:
        typeof session.payment_intent === "string" ? session.payment_intent : null,
      ...(status === "paid" ? { paid_at: new Date().toISOString() } : {}),
    })
    .eq("order_id", Number(orderId))
    .eq("stripe_checkout_session_id", session.id);

  if (error) {
    console.error("Error al actualizar el pago desde webhook:", error);
    return NextResponse.json({ error: "No se pudo actualizar el pago." }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
