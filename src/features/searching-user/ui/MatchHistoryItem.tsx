import { MatchInfo } from '@/features/searching-user/utils/apiGetMatch'
import { Card } from '@/shared/components/ui/card'
import { Badge } from '@/shared/components/ui/badge'
import { Link } from 'react-router-dom'
import useGetRiotAccount from '@/features/searching-user/hooks/useGetRiotAccount'
import koreanDayjs from '@/shared/lib/config/koreanDayjs'
import formatSecondsToMinutes from '@/shared/lib/utils/formatSecondsToMinutes'
import calculateKDA from '@/shared/lib/utils/calculateKDA'
import useGetItemInfo from '@/entities/item/hooks/useGetItemInfo'
import getItemNames from '@/features/searching-user/utils/getItemNames'
import calculateCSPerMinutes from '@/shared/lib/utils/calculateCSPerMinutes'

interface MatchHistoryItemProps {
  match: MatchInfo;
}

/**
 * 매치 히스토리 아이템 컴포넌트
 */
export default function MatchHistoryItem({ match }: MatchHistoryItemProps) {
  const { data: riotAccount } = useGetRiotAccount()
  const { data: itemInfo } = useGetItemInfo()

  // 현재 사용자 정보 찾기
  const player = match.info.participants.find((p) => p.puuid === riotAccount?.puuid)
  const totalCS = player ? player.totalMinionsKilled + player.neutralMinionsKilled : 0

  if (!player) return null

  return (
    <Link to={`/match/${match.metadata.matchId}`} className="block no-underline text-current">
      <Card
        className={`flex p-3 mb-2 border-l-4 ${player.win ? 'border-l-blue-500' : 'border-l-red-500'} hover:shadow-md transition-shadow`}>
        <div className="flex flex-col items-center justify-center w-16 mr-1">
          <Badge variant={player.win ? 'victory' : 'destructive'} className="mb-1">
            {player.win ? '승리' : '패배'}
          </Badge>
          <span className="text-xs text-gray-500">
            {match.info.gameMode}
          </span>
          <span className="text-xs text-gray-500">
            {koreanDayjs(new Date(match.info.gameCreation)).format('MM/DD')}
          </span>
        </div>

        <div className="flex items-center mr-4">
          <div className="relative w-12 h-12">
            <img
              src={`${import.meta.env.VITE_RIOT_ICON_URL}/v1/champion-icons/${player.championId}.png`}
              alt={player.championName}
              className="w-full h-full rounded-full aspect-square"
            />
            <span className="absolute -bottom-1 -right-1 text-xs bg-black text-white rounded-full p-1">
              {player.champLevel}
            </span>
          </div>
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
            <span>
              CS {totalCS} ({calculateCSPerMinutes(totalCS, match.info.gameDuration)}/분)
            </span>
            <span className="mx-2">•</span>
            <span>
              {formatSecondsToMinutes(match.info.gameDuration)}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap w-28 gap-1 items-center justify-start">
          {getItemNames(itemInfo ?? new Map([]), player).map((item, index) => {
            return item ? (
              <img
                key={`${match.metadata.matchId}-${item}`}
                src={`${import.meta.env.VITE_RIOT_ICON_URL}/assets/items/icons2d/${item}.png`}
                alt={`아이템 ${item}`}
                className="w-6 h-6 rounded"
              />
            ) : (
              <div key={index} className="w-6 h-6 rounded bg-gray-200" />
            )
          })}
        </div>
      </Card>
    </Link>
  )
}
