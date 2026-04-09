import { NextResponse } from "next/server";
import { createServerSupabase } from "../../../../lib/supabase/server";

const allowedTiers = ["Silver", "Gold", "Nationals"] as const;

function normalizeTier(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  const match = allowedTiers.find(
    (tier) => tier.toLowerCase() === trimmed.toLowerCase()
  );
  return match ?? null;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const supabase = createServerSupabase();

    const { data: activeSeason, error: seasonError } = await supabase
      .from("seasons")
      .select("id")
      .eq("is_active", true)
      .single();

    if (seasonError || !activeSeason) {
      return NextResponse.json({ error: "No active season found." }, { status: 500 });
    }

    const { programId, rosterLimit } = body;
    const tier = normalizeTier(body.tier);

    if (!programId || !tier) {
      return NextResponse.json(
        { error: "Program and a valid tier are required." },
        { status: 400 }
      );
    }

    const { data: program, error: programError } = await supabase
      .from("programs")
      .select("id,name,age_group")
      .eq("id", programId)
      .single();

    if (programError || !program) {
      return NextResponse.json({ error: "Program not found." }, { status: 404 });
    }

    const displayName = `${program.age_group} ${tier}`;

    const { data: existing } = await supabase
      .from("teams")
      .select("id")
      .eq("program_id", programId)
      .eq("tier", tier)
      .maybeSingle();

    if (existing) {
      return NextResponse.json(
        { error: `${displayName} already exists.` },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("teams")
      .insert({
        season_id: activeSeason.id,
        program_id: programId,
        team_name: displayName,
        display_name: displayName,
        tier,
        roster_limit: rosterLimit ? Number(rosterLimit) : null,
        is_active: true,
      })
      .select("id,team_name,display_name,tier")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, team: data });
  } catch (error) {
    return NextResponse.json({ error: "Unable to create team." }, { status: 400 });
  }
}
