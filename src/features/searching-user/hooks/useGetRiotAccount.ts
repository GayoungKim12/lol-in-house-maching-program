import { useQuery } from '@tanstack/react-query'
import apiGetRiotAccount from '@/features/searching-user/utils/apiGetRiotAccount'
import useUserStore from '@/features/searching-user/store/useUserStore'
import handleAPIError from '@/shared/lib/utils/handleAPIError'

export default function useGetRiotAccount(searchValue: string) {
  const { setUser } = useUserStore()

  return useQuery({
    queryKey: ['riotAccount', { searchValue }],
    queryFn: async () => {
      const parts = searchValue.split('#')
      if (parts.length !== 2) {
        return handleAPIError({
          errorCode: 400,
          errorMessage: 'Riot ID는 gameName#tagLine 형식이어야 합니다.',
        })
      }

      const [gameName, tagLine] = parts
      if (!gameName || !tagLine) {
        return handleAPIError({
          errorCode: 400,
          errorMessage: 'gameName과 tagLine은 비어있을 수 없습니다.',
        })
      }

      const data = await apiGetRiotAccount(gameName, tagLine)

      if ('puuid' in data) {
        setUser(data)
      }

      return data
    },
    enabled: !!searchValue,
  })
}