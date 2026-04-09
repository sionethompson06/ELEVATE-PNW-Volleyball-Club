import { NextResponse } from "next/server";
import { createServerSupabase } from "../../../../../../lib/supabase/server";

function normalizeRole(value: unknown): "head" | "assistant" | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim().toLowerCase();
  if (trimmed === "head") return "head";
  if (trimmed === "assistant") return "assistant";
  return null;
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const coachProfileId = String(body.coachProfileId || "").trim();
    const role = normalizeRole(body.role);

    if (!coachProfileId) {
      return NextResponse.json({ error: "Coach is required." }, { status: 400 });
    }

    if (!role) {
      return NextResponse.json({ error: "Valid role is required." }, { status: 400 });
    }

    const supabase = createServerSupabase();

    const { data: coach, error: coachError } = await supabase
      .from("coach_profiles")
      .select("id")
      .eq("id", coachProfileId)
      .single();

    if (coachError || !coach) {
      return NextResponse.json({ error: "Coach not found." }, { status: 404 });
    }

    const { data: team, error: teamError } = await supabase
      .from("teams")
      .select("id")
      .eq("id", id)
      .single();

    if (teamError || !team) {
      return NextResponse.json({ error: "Team not found." }, { status: 404 });
    }

    const patch: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
    };

    if (role === "head") patch.head_coach_profile_id = coachProfileId;
    if (role === "assistant") patch.assistant_coach_profile_id = coachProfileId;

    const { error: updateError } = await supabase
      .from("teams")
      .update(patch)
      .eq("id", id);

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    return NextResponse.json({
      ok: true,
      message: role === "head"
        ? "Head coach assigned successfully."
        : "Assistant coach assigned successfully.",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to assign coach." },
      { status: 400 }
    );
  }
}
