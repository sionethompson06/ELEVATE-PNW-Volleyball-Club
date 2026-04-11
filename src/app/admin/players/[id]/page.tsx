import Link from "next/link";
import PlayerDetailClient from "../../../../components/admin/PlayerDetailClient";
import { createServerSupabase } from "../../../../lib/supabase/server";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function PlayerDetailPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = createServerSupabase();

  const { data: player, error } = await supabase
    .from("players")
    .select(`
      id,
      first_name,
      last_name,
      age_group,
      school,
      primary_position,
      secondary_position,
      registration_status,
      payment_status,
      portal_enabled,
      current_team_id,
      created_at,
      families (
        id,
        family_name,
        primary_parent_name,
        primary_parent_email,
        primary_parent_phone,
        account_status
      )
    `)
    .eq("id", id)
    .single();

  if (error || !player) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <Link
          href="/admin/players"
          className="text-[#60a5fa] transition hover:text-[#34d399]"
        >
          ← Back to players
        </Link>
        <p className="mt-6 text-red-400">Player not found.</p>
      </section>
    );
  }

  const family = Array.isArray(player.families) ? player.families[0] : player.families;

  let teamName: string | null = null;
  let teamId: string | null = player.current_team_id || null;

  if (player.current_team_id) {
    const { data: team } = await supabase
      .from("teams")
      .select("id, team_name, display_name")
      .eq("id", player.current_team_id)
      .single();

    if (team) {
      teamId = team.id;
      teamName = team.display_name || team.team_name;
    }
  }

  return (
    <PlayerDetailClient
      player={{
        id: player.id,
        first_name: player.first_name,
        last_name: player.last_name,
        age_group: player.age_group || null,
        school: player.school || null,
        primary_position: player.primary_position || null,
        secondary_position: player.secondary_position || null,
        registration_status: player.registration_status || null,
        payment_status: player.payment_status || null,
        portal_enabled: !!player.portal_enabled,
        created_at: player.created_at || null,
        current_team_id: teamId,
        current_team_name: teamName,
      }}
      family={{
        id: family?.id || null,
        family_name: family?.family_name || null,
        primary_parent_name: family?.primary_parent_name || null,
        primary_parent_email: family?.primary_parent_email || null,
        primary_parent_phone: family?.primary_parent_phone || null,
        account_status: family?.account_status || null,
      }}
    />
  );
}
