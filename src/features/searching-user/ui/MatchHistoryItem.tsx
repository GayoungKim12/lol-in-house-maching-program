import { MatchInfo } from '@/features/searching-user/utils/apiGetMatch'
import { Card } from '@/shared/components/ui/card'
import { Badge } from '@/shared/components/ui/badge'
import { Link } from 'react-router-dom'
import useGetRiotAccount from '@/features/searching-user/hooks/useGetRiotAccount'
import koreanDayjs from '@/shared/lib/config/koreanDayjs'

interface MatchHistoryItemProps {
  match: MatchInfo;
}

/**
 * 매치 히스토리 아이템 컴포넌트
 */
export default function MatchHistoryItem({ match }: MatchHistoryItemProps) {
  const { data: riotAccount } = useGetRiotAccount()

  // 현재 사용자 정보 찾기
  const player = match.info.participants.find((p) => p.puuid === riotAccount?.puuid)

  if (!player) return null

  // 게임 시간 계산
  const minutes = Math.floor(match.info.gameDuration / 60)
  const seconds = match.info.gameDuration % 60

  // KDA 계산
  const kda = player.deaths === 0 ? 'Perfect' : ((player.kills + player.assists) / player.deaths).toFixed(2)

  // CS 계산
  const totalCS = player.totalMinionsKilled + player.neutralMinionsKilled
  const csPerMin = (totalCS / (match.info.gameDuration / 60)).toFixed(1)

  // 게임 생성 시간
  const gameDate = new Date(match.info.gameCreation)

  return (
    <Link to={`/match/${match.metadata.matchId}`} className="block no-underline text-current">
      <Card
        className={`flex p-3 mb-2 border-l-4 ${player.win ? 'border-l-blue-500' : 'border-l-red-500'} hover:shadow-md transition-shadow`}>
        <div className="flex flex-col items-center justify-center w-16 mr-3">
          <Badge variant={player.win ? 'victory' : 'destructive'} className="mb-1">
            {player.win ? '승리' : '패배'}
          </Badge>
          <span className="text-xs text-gray-500">{match.info.gameMode}</span>
          <span className="text-xs text-gray-500">{koreanDayjs(gameDate).format('MM/DD')}</span>
        </div>

        <div className="flex items-center mr-3">
          <div className="relative">
            <img
              src={`${import.meta.env.VITE_RIOT_ICON_URL}/v1/champion-icons/${player.championId}.png`}
              alt={player.championName}
              className="w-12 h-12 rounded-full"
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
              {kda} KDA
            </Badge>
          </div>

          <div className="flex text-xs text-gray-500">
            <span>
              CS {totalCS} ({csPerMin}/분)
            </span>
            <span className="mx-2">•</span>
            <span>
              {minutes}분 {seconds}초
            </span>
          </div>
        </div>

        <div className="flex flex-wrap w-28 gap-1 items-center justify-end">
          {[player.item0, player.item1, player.item2, player.item3, player.item4, player.item5, player.item6]
            .filter((item) => item !== 0)
            .map((item, index) => (
              <img
                key={index}
                src={`${import.meta.env.VITE_DDRAGON_ITEM_URL}/${item}.png`}
                alt={`아이템 ${item}`}
                className="w-6 h-6 rounded"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none'
                }}
              />
            ))}
        </div>
      </Card>
    </Link>
  )
}
