import { useParams } from 'react-router-dom'
import MatchDetail from '@/features/match-detail/ui/MatchDetail'

/**
 * 매치 상세 정보 페이지
 * 매치 ID를 URL 파라미터로 받아 해당 매치의 상세 정보를 표시합니다.
 */
export default function MatchDetailPage() {
  const { matchId } = useParams<{ matchId: string }>()

  return (
    <div className="container mx-auto p-4">
      {matchId ? (
        <MatchDetail matchId={matchId} />
      ) : (
        <div className="text-red-500">매치 ID를 찾을 수 없습니다.</div>
      )}
    </div>
  )
}
