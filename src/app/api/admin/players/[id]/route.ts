import { NextResponse } from "next/server";
import { createServerSupabase } from "../../../../../lib/supabase/server";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const supabase = createServerSupabase();

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const updatePayload: Record<string, unknown> = {};

  if (typeof body.registration_status === "string") {
    updatePayload.registration_status = body.registration_status;
  }

  if (typeof body.payment_status === "string") {
    updatePayload.payment_status = body.payment_status;
  }

  if (typeof body.portal_enabled === "boolean") {
    updatePayload.portal_enabled = body.portal_enabled;
  }

  if (Object.keys(updatePayload).length === 0) {
    return NextResponse.json(
      { error: "No valid player fields provided for update." },
      { status: 400 }
    );
  }

  const { error } = await supabase
    .from("players")
    .update(updatePayload)
    .eq("id", id);

  if (error) {
    return NextResponse.json(
      { error: `Failed to update player: ${error.message}` },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    message: "Player updated successfully.",
  });
}
