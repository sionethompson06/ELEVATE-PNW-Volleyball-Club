import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { createServerSupabase } from "../../../lib/supabase/server";
import { tryoutInterestSchema } from "../../../lib/validations/tryout-interest";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = tryoutInterestSchema.parse(body);

    const supabase = createServerSupabase();

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

    const { data, error } = await supabase
      .from("tryout_submissions")
      .insert({
        season_id: activeSeason.id,
        current_status: "interest",
        player_first_name: parsed.playerFirstName,
        player_last_name: parsed.playerLastName,
        player_birthdate: parsed.playerBirthdate || null,
        age_group: parsed.ageGroup,
        grad_year: parsed.gradYear ?? null,
        school: parsed.school || null,
        primary_position: parsed.primaryPosition || null,
        secondary_position: parsed.secondaryPosition || null,
        experience_level: parsed.experienceLevel || null,
        previous_club: parsed.previousClub || null,
        parent_primary_name: parsed.parentPrimaryName,
        parent_primary_email: parsed.parentPrimaryEmail,
        parent_primary_phone: parsed.parentPrimaryPhone,
        notes_from_family: parsed.notesFromFamily || null,
      })
      .select("id,current_status,submitted_at")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, submission: data }, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: "Validation failed.",
          details: error.flatten(),
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error: "Invalid request payload.",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 400 }
    );
  }
}
