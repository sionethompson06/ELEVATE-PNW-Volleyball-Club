import { NextResponse } from "next/server";
import { createServerSupabase } from "../../../../../lib/supabase/server";

const allowedTiers = ["Silver", "Gold", "Nationals"];

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const supabase = createServerSupabase();

    const { tier, rosterLimit, isActive } = body;

    const { data: existingTeam, error: teamError } = await supabase
      .from("teams")
      .select(`
        id,
        program_id,
        team_name,
        display_name,
        tier,
        programs (
          id,
          age_group
        )
      `)
      .eq("id", id)
      .single();

    if (teamError || !existingTeam) {
      return NextResponse.json({ error: "Team not found." }, { status: 404 });
    }

    let nextTier = existingTeam.tier || tier || null;
    if (tier) {
      if (!allowedTiers.includes(tier)) {
        return NextResponse.json({ error: "Invalid team tier." }, { status: 400 });
      }
      nextTier = tier;
    }

    const program = Array.isArray(existingTeam.programs)
      ? existingTeam.programs[0]
      : existingTeam.programs;

    const nextDisplayName =
      program?.age_group && nextTier ? `${program.age_group} ${nextTier}` : existingTeam.team_name;

    const patch: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
      display_name: nextDisplayName,
      team_name: nextDisplayName,
      tier: nextTier,
    };

    if ("rosterLimit" in body) {
      patch.roster_limit = rosterLimit ? Number(rosterLimit) : null;
    }

    if ("isActive" in body) {
      patch.is_active = Boolean(isActive);
    }

    const { data, error } = await supabase
      .from("teams")
      .update(patch)
      .eq("id", id)
      .select("id, team_name, display_name, tier, roster_limit, is_active")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, team: data });
  } catch (error) {
    return NextResponse.json({ error: "Unable to update team." }, { status: 400 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = createServerSupabase();

    const { count, error: membershipError } = await supabase
      .from("team_memberships")
      .select("id", { count: "exact", head: true })
      .eq("team_id", id);

    if (membershipError) {
      return NextResponse.json({ error: membershipError.message }, { status: 500 });
    }

    if ((count || 0) > 0) {
      return NextResponse.json(
        { error: "Cannot delete a team with assigned players." },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("teams")
      .delete()
      .eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, message: "Team deleted successfully." });
  } catch (error) {
    return NextResponse.json({ error: "Unable to delete team." }, { status: 400 });
  }
}
