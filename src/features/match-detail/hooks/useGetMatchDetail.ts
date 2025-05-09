import { useQuery } from '@tanstack/react-query'
import apiGetMatch, { MatchInfo } from '@/features/searching-user/utils/apiGetMatch'

/**
 * 매치 상세 정보를 가져오는 커스텀 훅
 * @param matchId 매치 ID
 * @returns 매치 상세 정보와 로딩 상태
 */
export default function useGetMatchDetail(matchId: string) {
  return useQuery<MatchInfo>({
    queryKey: ['match', matchId],
    queryFn: async () => {
      return await apiGetMatch(matchId)
    },
  })
}
