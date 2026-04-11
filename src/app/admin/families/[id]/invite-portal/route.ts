import { NextResponse } from "next/server";
import { createServerSupabase } from "../../../../../../lib/supabase/server";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = createServerSupabase();

  const [{ data: family, error: familyError }, { data: players, error: playersError }] =
    await Promise.all([
      supabase
        .from("families")
        .select("id, family_name, primary_parent_email")
        .eq("id", id)
        .single(),
      supabase
        .from("players")
        .select("id, first_name, last_name, portal_enabled")
        .eq("family_id", id),
    ]);

  if (familyError || !family) {
    return NextResponse.json(
      { error: "Family not found." },
      { status: 404 }
    );
  }

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

  const enabledCount = players.filter((player) => player.portal_enabled).length;

  return NextResponse.json({
    message: family.primary_parent_email
      ? `Portal invitation recorded for ${family.primary_parent_email}.`
      : "Portal invitation recorded for this family.",
    familyId: family.id,
    familyName: family.family_name,
    primaryParentEmail: family.primary_parent_email || null,
    linkedPlayers: players.map((player) => ({
      id: player.id,
      name: `${player.first_name} ${player.last_name}`,
      portalEnabled: !!player.portal_enabled,
    })),
    enabledCount,
    invitedCount: players.length,
  });
}