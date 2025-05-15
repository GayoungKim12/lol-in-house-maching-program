import { supabase } from '@/shared/lib/supabase/supabaseClient'
import handleAPIError from '@/shared/lib/utils/handleAPIError'

export default async function apiRegisterCustomMatchPlayers(matchId: string, players: string[]) {
  const formattedPlayers = players.map(player => ({
    match_id: matchId,
    puuid: player,
  }))

  const { error } = await supabase.from('custom_match_player')
    .upsert(formattedPlayers)

  if (error) {
    handleAPIError('SUPABASE_INSERT_MATCH_FAILED')
  }
}