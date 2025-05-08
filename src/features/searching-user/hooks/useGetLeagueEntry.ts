import { useQuery } from '@tanstack/react-query'
import apiGetLeagueEntry from '@/features/searching-user/utils/apiGetLeagueEntry'
import useGetSummoner from '@/features/searching-user/hooks/useGetSummoner'

export default function useGetLeagueEntry() {
  const { data: summoner } = useGetSummoner()

  return useQuery({
    queryKey: ['leagueEntry', { summoner }],
    queryFn: async () => {
      if (summoner && 'id' in summoner) {
        return await apiGetLeagueEntry(summoner.id)
      }
    },
    enabled: !!summoner,
  })
}