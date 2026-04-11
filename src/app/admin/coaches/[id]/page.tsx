import Link from "next/link";
import CoachDetailClient from "../../../../components/admin/CoachDetailClient";
import { createServerSupabase } from "../../../../lib/supabase/server";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function CoachDetailPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = createServerSupabase();

  const { data: coach, error } = await supabase
    .from("coach_profiles")
    .select(`
      id,
      first_name,
      last_name,
      title,
      email,
      phone,
      is_active
    `)
    .eq("id", id)
    .single();

  if (error || !coach) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <Link
          href="/admin/coaches"
          className="text-[#60a5fa] transition hover:text-[#34d399]"
        >
          ← Back to coaches
        </Link>
        <p className="mt-6 text-red-400">Coach not found.</p>
      </section>
    );
  }

  const [{ data: headTeams, error: headError }, { data: assistantTeams, error: assistantError }] =
    await Promise.all([
      supabase
        .from("teams")
        .select(`
          id,
          team_name,
          display_name,
          tier,
          is_active,
          programs (
            id,
            name,
            age_group
          ),
          team_memberships (
            id
          )
        `)
        .eq("head_coach_profile_id", id)
        .order("display_name", { ascending: true }),
      supabase
        .from("teams")
        .select(`
          id,
          team_name,
          display_name,
          tier,
          is_active,
          programs (
            id,
            name,
            age_group
          ),
          team_memberships (
            id
          )
        `)
        .eq("assistant_coach_profile_id", id)
        .order("display_name", { ascending: true }),
    ]);

  if (headError || assistantError) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <Link
          href="/admin/coaches"
          className="text-[#60a5fa] transition hover:text-[#34d399]"
        >
          ← Back to coaches
        </Link>
        <p className="mt-6 text-red-400">
          Failed to load coach assignments.
        </p>
      </section>
    );
  }

  const normalizeTeam = (team: {
    id: string;
    team_name: string | null;
    display_name: string | null;
    tier: string | null;
    is_active: boolean | null;
    programs: { id: string; name: string; age_group: string | null }[] | { id: string; name: string; age_group: string | null } | null;
    team_memberships: { id: string }[] | null;
  }) => {
    const program = Array.isArray(team.programs) ? team.programs[0] : team.programs;
    const memberships = Array.isArray(team.team_memberships) ? team.team_memberships : [];

    return {
      id: team.id,
      team_name: team.team_name || null,
      display_name: team.display_name || null,
      tier: team.tier || null,
      is_active: !!team.is_active,
      program_name: program?.name || null,
      program_age_group: program?.age_group || null,
      assigned_player_count: memberships.length,
    };
  };

  return (
    <CoachDetailClient
      coach={{
        id: coach.id,
        first_name: coach.first_name,
        last_name: coach.last_name,
        title: coach.title || null,
        email: coach.email || null,
        phone: coach.phone || null,
        is_active: !!coach.is_active,
      }}
      headTeams={(headTeams ?? []).map(normalizeTeam)}
      assistantTeams={(assistantTeams ?? []).map(normalizeTeam)}
    />
  );
}
