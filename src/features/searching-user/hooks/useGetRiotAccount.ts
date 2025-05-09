import { useQuery } from '@tanstack/react-query'
import apiGetRiotAccount from '@/features/searching-user/utils/apiGetRiotAccount'
import handleAPIError from '@/shared/lib/utils/handleAPIError'

export default function useGetRiotAccount(searchValue: string) {
  return useQuery({
    queryKey: ['riotAccount', { searchValue }],
    queryFn: async () => {
      const parts = searchValue.split('#')
      if (parts.length !== 2) {
        handleAPIError({
          title: '잘못된 형식',
          description: '게임 아이디는 게임명과 태그라인을 #으로 구분하여 입력해주세요.',
        })
      }

      const [gameName, tagLine] = parts
      if (!gameName || !tagLine) {
        handleAPIError({
          title: '잘못된 형식',
          description: '게임명과 태그라인을 모두 입력해주세요.',
        })
      }

      return await apiGetRiotAccount(gameName, tagLine)
    },
    enabled: !!searchValue,
  })
}