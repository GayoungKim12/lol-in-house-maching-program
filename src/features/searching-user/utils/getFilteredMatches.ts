import { MatchInfo } from '@/features/searching-user/utils/apiGetMatch'
import { MatchFilter } from '@/features/searching-user/ui/MatchHistoryFilter'

export default function getFilteredMatches(matches: MatchInfo[], filter: MatchFilter, puuid: string) {
  return matches.filter((match) => {
    // 유저 정보(현재 유저가 이겼는지 졌는지 확인하기 위함)
    const player = match.info.participants.find((p) => p.puuid === puuid)

    if (!player) return false

    // 게임 모드 필터
    if (filter.gameMode !== 'ALL') {
      if (filter.gameMode === 'CLASSIC' && match.info.gameMode !== 'CLASSIC') {
        return false
      } else if (filter.gameMode === 'ARAM' && match.info.gameMode !== 'ARAM') {
        return false
      } else if (filter.gameMode === 'URF' && !match.info.gameMode.includes('URF')) {
        return false
      } else if (filter.gameMode === 'OTHER' && (match.info.gameMode === 'CLASSIC' || match.info.gameMode === 'ARAM' || match.info.gameMode.includes('URF'))) {
        return false
      }
    }

    // 게임 결과 필터
    if (filter.result !== 'ALL') {
      if (filter.result === 'WIN' && !player.win) {
        return false
      } else if (filter.result === 'LOSE' && player.win) {
        return false
      }
    }

    return true
  })
}