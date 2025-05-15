import { supabase } from '@/shared/lib/supabase/supabaseClient'
import handleAPIError from '@/shared/lib/utils/handleAPIError'

export default async function apiGetCustomMatchIds(puuid: string): Promise<string[] | undefined> {
  try {
    const { data } = await supabase.from('custom_match_player')
      .select('match_id')
      .eq('puuid', puuid)

    return data?.map(({ match_id }) => match_id)
  } catch {
    handleAPIError('NOT_FOUND_MATCH_HISTORY')
  }
}