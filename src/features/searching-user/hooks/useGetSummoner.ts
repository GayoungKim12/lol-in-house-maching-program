import { useQuery } from '@tanstack/react-query'
import useUserStore from '@/features/searching-user/store/useUserStore'
import apiGetSummoner from '@/features/searching-user/utils/apiGetSummoner'

export default function useGetSummoner() {
  const { puuid } = useUserStore()

  return useQuery({
    queryKey: ['summoner', { puuid }],
    queryFn: async () => {
      return await apiGetSummoner(puuid)
    },
    enabled: !!puuid,
  })
}