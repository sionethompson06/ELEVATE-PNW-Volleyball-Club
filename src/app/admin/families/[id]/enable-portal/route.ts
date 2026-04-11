import { NextResponse } from "next/server";
import { createServerSupabase } from "../../../../../../lib/supabase/server";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = createServerSupabase();

  const { data: players, error: playersError } = await supabase
    .from("players")
    .select("id, portal_enabled")
    .eq("family_id", id);

  if (playersError) {
    return NextResponse.json(
      { error: "Unable to load family players." },
      { status: 500 }
    );
  }

  if (!players || players.length === 0) {
    return NextResponse.json(
      { error: "No linked players found for this family." },
      { status: 404 }
    );
  }

  const playerIdsToEnable = players
    .filter((player) => !player.portal_enabled)
    .map((player) => player.id);

  if (playerIdsToEnable.length === 0) {
    return NextResponse.json({
      message: "Portal is already enabled for all linked players.",
      updatedCount: 0,
    });
  }

  const { error: updateError } = await supabase
    .from("players")
    .update({ portal_enabled: true })
    .in("id", playerIdsToEnable);

  if (updateError) {
    return NextResponse.json(
      { error: "Unable to enable portal for linked players." },
      { status: 500 }
    );
  }

  return NextResponse.json({
    message: `Portal enabled for ${playerIdsToEnable.length} linked player${playerIdsToEnable.length === 1 ? "" : "s"}.`,
    updatedCount: playerIdsToEnable.length,
  });
}