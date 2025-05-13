import { Badge } from '@/shared/components/ui/badge'
import getGameMode from '@/shared/lib/utils/getGameMode'
import { Separator } from '@/shared/components/ui/separator'
import koreanDayjs from '@/shared/lib/config/koreanDayjs'
import { MatchInfo, Participant } from '@/features/searching-user/utils/apiGetMatch'

interface GameInfoProps {
  player: Participant
  match: MatchInfo
}

export default function GameInfo({ player, match }: GameInfoProps) {
  return (
    <div className="flex flex-col items-start justify-center w-14 mr-2">
      <Badge variant={player.win ? 'victory' : 'destructive'} className="mb-5">
        {player.win ? '승리' : '패배'}
      </Badge>
      <span className="text-xs text-gray-700 mt-1 font-semibold truncate w-14 mb-1">
        {getGameMode(match.info.queueId)}
      </span>
      <Separator />
      <span className="text-xs text-gray-500 mt-1">
        {koreanDayjs(new Date(match.info.gameCreation)).format('YY.MM.DD')}
      </span>
    </div>
  )
}