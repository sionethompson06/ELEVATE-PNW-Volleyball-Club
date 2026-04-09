import { NextResponse } from "next/server";
import { createServerSupabase } from "../../../../../../lib/supabase/server";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { teamId } = body;

    if (!teamId) {
      return NextResponse.json({ error: "Team is required." }, { status: 400 });
    }

    const supabase = createServerSupabase();

    const { data: player, error: playerError } = await supabase
      .from("players")
      .select("id,season_id,current_team_id")
      .eq("id", id)
      .single();

    if (playerError || !player) {
      return NextResponse.json({ error: "Player not found." }, { status: 404 });
    }

    const { data: team, error: teamError } = await supabase
      .from("teams")
      .select("id,season_id")
      .eq("id", teamId)
      .single();

    if (teamError || !team) {
      return NextResponse.json({ error: "Team not found." }, { status: 404 });
    }

    if (player.season_id !== team.season_id) {
      return NextResponse.json(
        { error: "Player and team must belong to the same season." },
        { status: 400 }
      );
    }

    const now = new Date().toISOString();

    const { error: playerUpdateError } = await supabase
      .from("players")
      .update({
        current_team_id: teamId,
        team_assigned_at: now,
        updated_at: now,
      })
      .eq("id", id);

    if (playerUpdateError) {
      return NextResponse.json({ error: playerUpdateError.message }, { status: 500 });
    }

    const { data: existingMembership } = await supabase
      .from("team_memberships")
      .select("id")
      .eq("player_id", id)
      .eq("team_id", teamId)
      .maybeSingle();

    if (!existingMembership) {
      const { error: membershipError } = await supabase
        .from("team_memberships")
        .insert({
          season_id: player.season_id,
          player_id: id,
          team_id: teamId,
          status: "assigned",
          assigned_at: now,
        });

      if (membershipError) {
        return NextResponse.json({ error: membershipError.message }, { status: 500 });
      }
    }

    return NextResponse.json({
      ok: true,
      message: "Player assigned to team successfully.",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to assign player to team." },
      { status: 400 }
    );
  }
}
