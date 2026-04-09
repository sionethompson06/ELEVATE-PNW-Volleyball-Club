import { NextResponse } from "next/server";
import { createServerSupabase } from "../../../../../lib/supabase/server";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const supabase = createServerSupabase();

    const patch: Record<string, unknown> = {};

    if (typeof body.current_status === "string") {
      patch.current_status = body.current_status;
    }

    if (typeof body.decision_status === "string") {
      patch.decision_status = body.decision_status;
    }

    if ("tryout_date" in body) {
      patch.tryout_date = body.tryout_date || null;
    }

    if (typeof body.evaluation_complete === "boolean") {
      patch.evaluation_complete = body.evaluation_complete;
    }

    if (typeof body.admin_notes === "string") {
      patch.admin_notes = body.admin_notes;
    }

    patch.updated_at = new Date().toISOString();

    const { data, error } = await supabase
      .from("tryout_submissions")
      .update(patch)
      .eq("id", id)
      .select("id,current_status,decision_status,tryout_date,evaluation_complete,admin_notes,updated_at")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, lead: data });
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to update lead." },
      { status: 400 }
    );
  }
}
