import { useQuery } from '@tanstack/react-query'
import useUserStore from '@/features/searching-user/store/useUserStore'
import apiGetLeagueEntry from '@/features/searching-user/utils/apiGetLeagueEntry'

export default function useGetLeagueEntry() {
  const { puuid } = useUserStore()

  return useQuery({
    queryKey: ['leagueEntry', { puuid }],
    queryFn: async () => {
      return await apiGetLeagueEntry(puuid)
    },
    enabled: !!puuid,
  })
}