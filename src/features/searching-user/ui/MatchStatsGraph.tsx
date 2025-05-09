import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card'
import useGetMatchHistory from '@/features/searching-user/hooks/useGetMatchHistory'
import MatchStatsTabs from '@/features/searching-user/ui/MatchStatsTabs'

/**
 * 매치 통계를 그래프로 시각화하는 컴포넌트
 */
export default function MatchStatsGraph() {
  const { matches } = useGetMatchHistory()

  if (!matches?.length) {
    return null
  }

  return (
    <Card className="mt-4">
      <CardHeader className="pt-4">
        <CardTitle className="text-lg">게임 통계</CardTitle>
      </CardHeader>
      <CardContent>
        <MatchStatsTabs matches={matches} />
      </CardContent>
    </Card>
  )
}




