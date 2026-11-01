import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createServiceClient } from "@/lib/supabase/service";
import { getStripeClient } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature) {
    return NextResponse.json({ error: "Falta la firma de Stripe." }, { status: 400 });
  }

  if (!webhookSecret || !process.env.STRIPE_SECRET_KEY) {
    console.error(
      "Webhook de Stripe no configurado: faltan STRIPE_WEBHOOK_SECRET o STRIPE_SECRET_KEY.",
    );
    return NextResponse.json({ error: "Webhook de Stripe no configurado." }, { status: 500 });
  }

  let stripe: ReturnType<typeof getStripeClient>;

  try {
    stripe = getStripeClient();
  } catch {
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

  const supportedEvents = new Set([
    "checkout.session.completed",
    "checkout.session.async_payment_succeeded",
    "checkout.session.async_payment_failed",
    "checkout.session.expired",
  ]);

  if (!supportedEvents.has(event.type)) {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const orderId = session.metadata?.order_id;

  if (!orderId || !Number.isSafeInteger(Number(orderId))) {
    console.error("Webhook sin order_id válido:", event.id);
    return NextResponse.json({ received: true });
  }

  const status =
    event.type === "checkout.session.expired" ||
    event.type === "checkout.session.async_payment_failed"
      ? "failed"
      : session.payment_status !== "unpaid"
        ? "paid"
        : "pending";

  let supabase;

  try {
    supabase = createServiceClient();
  } catch (error) {
    console.error("No se pudo crear el cliente de servicio de Supabase:", error);
    return NextResponse.json({ error: "Supabase no está configurado para el webhook." }, { status: 500 });
  }

  const { data: currentPayment, error: paymentLookupError } = await supabase
    .from("payment")
    .select("status")
    .eq("order_id", Number(orderId))
    .eq("stripe_checkout_session_id", session.id)
    .single();

  if (paymentLookupError || !currentPayment) {
    console.error("No se encontró el pago para el webhook:", paymentLookupError);
    return NextResponse.json({ error: "Pago no encontrado." }, { status: 500 });
  }

  if (currentPayment.status === "paid" || currentPayment.status === "refunded") {
    return NextResponse.json({ received: true });
  }

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
