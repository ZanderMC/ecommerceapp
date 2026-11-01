import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return NextResponse.json(
    { isLoggedIn: Boolean(user) },
    { headers: { "Cache-Control": "no-store" } },
  );
}

export async function POST() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    return NextResponse.json(
      { error: "No se pudo cerrar la sesión." },
      { status: 500 },
    );
  }

  return NextResponse.json({ isLoggedIn: false });
}
