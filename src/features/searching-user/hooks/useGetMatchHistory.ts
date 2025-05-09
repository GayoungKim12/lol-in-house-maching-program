import apiGetMatch, { MatchInfo } from '@/features/searching-user/utils/apiGetMatch'
import { useQuery } from '@tanstack/react-query'
import useGetMatchIds from '@/features/searching-user/hooks/useGetMatchIds'

export default function useGetMatchHistory() {
  const { data: matchIds } = useGetMatchIds()

  return useQuery({
    queryKey: ['matchHistory', { matchIds }],
    queryFn: async () => {
      if (!matchIds) return []

      const matchPromises = matchIds.map((id) => apiGetMatch(id))
      const matchResults = await Promise.allSettled(matchPromises)

      return matchResults.filter((result): result is PromiseFulfilledResult<MatchInfo> => result.status === 'fulfilled').map((result) => result.value)
    },
    enabled: !!matchIds,
  })

}