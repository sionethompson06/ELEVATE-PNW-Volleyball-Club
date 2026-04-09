import { NextResponse } from "next/server";
import { createServerSupabase } from "../../../../../../lib/supabase/server";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = createServerSupabase();

    const { data: lead, error: leadError } = await supabase
      .from("tryout_submissions")
      .select("*")
      .eq("id", id)
      .single();

    if (leadError || !lead) {
      return NextResponse.json({ error: "Lead not found." }, { status: 404 });
    }

    if (lead.converted_family_id || lead.converted_player_id) {
      return NextResponse.json(
        { error: "Lead has already been converted." },
        { status: 400 }
      );
    }

    const { data: activeSeason, error: seasonError } = await supabase
      .from("seasons")
      .select("id")
      .eq("is_active", true)
      .single();

    if (seasonError || !activeSeason) {
      return NextResponse.json(
        { error: "No active season found." },
        { status: 500 }
      );
    }

    const familyName =
      lead.player_last_name && String(lead.player_last_name).trim().length > 0
        ? `${lead.player_last_name} Family`
        : "Family";

    const { data: family, error: familyError } = await supabase
      .from("families")
      .insert({
        season_id: activeSeason.id,
        family_name: familyName,
        primary_parent_name: lead.parent_primary_name,
        primary_parent_email: lead.parent_primary_email,
        primary_parent_phone: lead.parent_primary_phone,
      })
      .select("id")
      .single();

    if (familyError || !family) {
      return NextResponse.json(
        { error: familyError?.message || "Unable to create family." },
        { status: 500 }
      );
    }

    const { data: player, error: playerError } = await supabase
      .from("players")
      .insert({
        family_id: family.id,
        season_id: activeSeason.id,
        first_name: lead.player_first_name,
        last_name: lead.player_last_name,
        birthdate: lead.player_birthdate || null,
        age_group: lead.age_group || null,
        grad_year: lead.grad_year || null,
        school: lead.school || null,
        primary_position: lead.primary_position || null,
        secondary_position: lead.secondary_position || null,
        accepted_at:
          lead.current_status === "accepted" ? new Date().toISOString() : null,
      })
      .select("id")
      .single();

    if (playerError || !player) {
      return NextResponse.json(
        { error: playerError?.message || "Unable to create player." },
        { status: 500 }
      );
    }

    const { error: leadUpdateError } = await supabase
      .from("tryout_submissions")
      .update({
        converted_family_id: family.id,
        converted_player_id: player.id,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (leadUpdateError) {
      return NextResponse.json(
        { error: leadUpdateError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      familyId: family.id,
      playerId: player.id,
      message: "Lead converted successfully.",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to convert lead." },
      { status: 400 }
    );
  }
}
