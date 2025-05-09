import { useQuery } from '@tanstack/react-query'
import apiGetRiotAccount from '@/features/searching-user/utils/apiGetRiotAccount'
import handleAPIError from '@/shared/lib/utils/handleAPIError'

export default function useGetRiotAccount(searchValue: string) {
  return useQuery({
    queryKey: ['riotAccount', { searchValue }],
    queryFn: async () => {
      const parts = searchValue.split('#')
      if (parts.length !== 2) {
        handleAPIError('Riot ID는 gameName#tagLine 형식이어야 합니다.')
      }

      const [gameName, tagLine] = parts
      if (!gameName || !tagLine) {
        handleAPIError('gameName과 tagLine은 비어있을 수 없습니다.')
      }

      return await apiGetRiotAccount(gameName, tagLine)
    },
    enabled: !!searchValue,
  })
}