import { supabase } from '@/shared/lib/supabase/supabaseClient'
import handleAPIError from '@/shared/lib/utils/handleAPIError'

export default async function apiRegisterCustomMatchId(matchId: string) {
  const { error } = await supabase.from('custom_match')
    .upsert({
      match_id: matchId,
    })

  if (error) {
    handleAPIError('NOT_FOUND_MATCH_HISTORY')
  }
}