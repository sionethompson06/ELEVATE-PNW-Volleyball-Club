import { NextResponse } from "next/server";
import { createServerSupabase } from "../../../../lib/supabase/server";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;
    const body = await req.json();

    const supabase = createServerSupabase();

    const { data: application, error: appError } = await supabase
      .from("application_forms")
      .select("id,tryout_submission_id,status")
      .eq("invite_token", token)
      .single();

    if (appError || !application) {
      return NextResponse.json({ error: "Application invite not found." }, { status: 404 });
    }

    const now = new Date().toISOString();

    const { error: appUpdateError } = await supabase
      .from("application_forms")
      .update({
        status: "complete",
        started_at: application.status === "invited" ? now : undefined,
        completed_at: now,
        updated_at: now,
      })
      .eq("id", application.id);

    if (appUpdateError) {
      return NextResponse.json({ error: appUpdateError.message }, { status: 500 });
    }

    const applicationSummary = [
      `Application submitted by family`,
      `Emergency Contact Name: ${body.emergencyContactName || ""}`,
      `Emergency Contact Phone: ${body.emergencyContactPhone || ""}`,
      `Medical Notes: ${body.medicalNotes || ""}`,
      `Handbook Acknowledged: ${body.handbookAcknowledged ? "Yes" : "No"}`,
      `Waiver Acknowledged: ${body.waiverAcknowledged ? "Yes" : "No"}`,
      `Payment Agreement Acknowledged: ${body.paymentAgreementAcknowledged ? "Yes" : "No"}`,
    ].join("\n");

    const { error: leadUpdateError } = await supabase
      .from("tryout_submissions")
      .update({
        current_status: "application_complete",
        admin_notes: applicationSummary,
        updated_at: now,
      })
      .eq("id", application.tryout_submission_id);

    if (leadUpdateError) {
      return NextResponse.json({ error: leadUpdateError.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, message: "Application submitted successfully." });
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to submit application." },
      { status: 400 }
    );
  }
}
