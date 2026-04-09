import { randomUUID } from "crypto";
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
      .select("id,season_id,current_status")
      .eq("id", id)
      .single();

    if (leadError || !lead) {
      return NextResponse.json({ error: "Lead not found." }, { status: 404 });
    }

    const inviteToken = randomUUID();

    const { error: insertError } = await supabase
      .from("application_forms")
      .insert({
        season_id: lead.season_id,
        tryout_submission_id: lead.id,
        status: "invited",
        invite_token: inviteToken,
      });

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    const { error: updateError } = await supabase
      .from("tryout_submissions")
      .update({
        current_status: "application_invited",
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    return NextResponse.json({
      ok: true,
      inviteToken,
      message: "Application invite created successfully.",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to create application invite." },
      { status: 400 }
    );
  }
}
