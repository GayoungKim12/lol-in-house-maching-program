import { useMutation } from '@tanstack/react-query'
import apiGetMatch from '@/features/searching-user/utils/apiGetMatch'
import handleAPIError from '@/shared/lib/utils/handleAPIError'
import apiRegisterCustomMatchId from '@/features/register-custom-match/utils/apiRegisterCustomMatchId'
import apiRegisterCustomMatchPlayers from '@/features/register-custom-match/utils/apiRegisterCustomMatchPlayers'

export default function useRegisterCustomMatch() {
  return useMutation({
    mutationFn: async (matchId: string) => {
      const match = await apiGetMatch(matchId)

      if (!match) {
        handleAPIError('NOT_FOUND_MATCH_ID')
        return
      }

      const players = match.metadata.participants

      void apiRegisterCustomMatchId(matchId)
      void apiRegisterCustomMatchPlayers(matchId, players)
    },
  })
}