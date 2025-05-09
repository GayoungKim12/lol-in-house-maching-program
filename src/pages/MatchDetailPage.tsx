import { useParams } from "react-router-dom";
import MatchDetail from "@/features/match-detail/ui/MatchDetail";

/**
 * 매치 상세 정보 페이지
 * 매치 ID를 URL 파라미터로 받아 해당 매치의 상세 정보를 표시합니다.
 */
export default function MatchDetailPage() {
  const { matchId } = useParams<{ matchId: string }>();

  if (!matchId) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-red-100 text-red-700 p-4 rounded-md">유효하지 않은 매치 ID입니다.</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <MatchDetail matchId={matchId} />
    </div>
  );
}
