import { MatchInfo } from '@/features/searching-user/utils/apiGetMatch'
import { MatchFilter } from '@/features/searching-user/ui/MatchHistoryFilter'
import { GameMode } from '@/shared/lib/config/gameOptions'

export default function getFilteredMatches(matches: MatchInfo[], filter: MatchFilter, puuid: string) {
  return matches.filter((match) => {
    // 유저 정보(현재 유저가 이겼는지 졌는지 확인하기 위함)
    const player = match.info.participants.find((p) => p.puuid === puuid)

    if (!player) return false

    // 게임 모드 필터
    if (filter.gameMode !== GameMode.ALL) {
      if (filter.gameMode === match.info.queueId) {
        return true
      }

      if (filter.gameMode === GameMode.SPECIAL_MODE) {
        return match.info.queueId > 700 && match.info.queueId < 800
      }

      return false
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