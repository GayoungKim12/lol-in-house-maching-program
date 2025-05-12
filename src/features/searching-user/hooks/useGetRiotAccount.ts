import { useQuery } from '@tanstack/react-query'
import apiGetRiotAccount from '@/features/searching-user/utils/apiGetRiotAccount'
import handleAPIError from '@/shared/lib/utils/handleAPIError'
import { useParams } from 'react-router-dom'

export default function useGetRiotAccount() {
  const params = useParams()
  const { summonerName } = params

  return useQuery({
    queryKey: ['riotAccount', { summonerName }],
    queryFn: async () => {
      if (!summonerName) return

      const parts = summonerName.split('#')
      if (parts.length !== 2) {
        handleAPIError('INVALID_FORMAT_RIOT_ACCOUNT')
      }

      const [gameName, tagLine] = parts
      if (!gameName || !tagLine) {
        handleAPIError('INVALID_FORMAT_RIOT_ACCOUNT_EMPTY')
      }

      return await apiGetRiotAccount(gameName, tagLine)
    },
    placeholderData: undefined,
    enabled: !!summonerName,
  })
}