import { Badge } from '@/shared/components/ui/badge'
import calculateKDA from '@/shared/lib/utils/calculateKDA'
import calculateCSPerMinutes from '@/shared/lib/utils/calculateCSPerMinutes'
import formatSecondsToMinutes from '@/shared/lib/utils/formatSecondsToMinutes'
import { MatchInfo, Participant } from '@/features/searching-user/utils/apiGetMatch'

interface ChampionAndKDAProps {
  player: Participant
  match: MatchInfo
}

export default function ChampionAndKDA({ player, match }: ChampionAndKDAProps) {
  const totalCS = player.totalMinionsKilled + player.neutralMinionsKilled

  return (
    <div className="flex">
      <div className="flex items-center mr-4 relative">
        <div className="relative flex items-center justify-center w-12 h-12 rounded-full overflow-hidden">
          <img src={`${import.meta.env.VITE_RIOT_ICON_URL}/v1/champion-icons/${player.championId}.png`}
               alt={player.championName} className="w-full h-full aspect-square scale-110" />
        </div>
        <span
          className="absolute -bottom-1 -right-1 text-xs bg-black text-white rounded-full p-1">{player.champLevel}</span>
      </div>

      <div className="flex flex-col justify-center flex-1">
        <div className="flex items-center mb-1">
          <span className="font-bold text-md">{player.kills}</span>
          <span className="mx-1 text-gray-500">/</span>
          <span className="font-bold text-md text-red-500">{player.deaths}</span>
          <span className="mx-1 text-gray-500">/</span>
          <span className="font-bold text-md">{player.assists}</span>
          <Badge variant="outline" className="ml-2">
            {calculateKDA(player.kills, player.assists, player.deaths)} KDA
          </Badge>
        </div>
        <div className="flex text-xs text-gray-500">
          <span>CS {totalCS} ({calculateCSPerMinutes(totalCS, match.info.gameDuration)}/분)</span>
          <span className="mx-2">•</span>
          <span>{formatSecondsToMinutes(match.info.gameDuration)}</span>
        </div>
      </div>
    </div>
  )
}