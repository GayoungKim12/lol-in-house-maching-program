import { useQuery } from '@tanstack/react-query'
import apiGetRiotAccount from '@/features/searching-user/utils/apiGetRiotAccount'
import handleAPIError from '@/shared/lib/utils/handleAPIError'

export default function useGetRiotAccount(searchValue: string) {
  return useQuery({
    queryKey: ['riotAccount', { searchValue }],
    queryFn: async () => {
      const parts = searchValue.split('#')
      if (parts.length !== 2) {
        handleAPIError('INVALID_FORMAT_RIOT_ACCOUNT')
      }

      const [gameName, tagLine] = parts
      if (!gameName || !tagLine) {
        handleAPIError('INVALID_FORMAT_RIOT_ACCOUNT_EMPTY')
      }

      return await apiGetRiotAccount(gameName, tagLine)
    },
    enabled: !!searchValue,
  })
}