import { NextResponse } from "next/server";
import { createServerSupabase } from "../../../../lib/supabase/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const supabase = createServerSupabase();

    const firstName = String(body.firstName || "").trim();
    const lastName = String(body.lastName || "").trim();
    const email = String(body.email || "").trim();
    const phone = String(body.phone || "").trim();
    const title = String(body.title || "").trim();
    const bio = String(body.bio || "").trim();

    if (!firstName || !lastName) {
      return NextResponse.json(
        { error: "First name and last name are required." },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("coach_profiles")
      .insert({
        first_name: firstName,
        last_name: lastName,
        email: email || null,
        phone: phone || null,
        title: title || null,
        bio: bio || null,
        is_active: true,
      })
      .select("id, first_name, last_name")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, coach: data });
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to create coach." },
      { status: 400 }
    );
  }
}
