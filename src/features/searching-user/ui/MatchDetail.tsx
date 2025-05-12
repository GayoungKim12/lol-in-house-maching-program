import { MatchInfo } from '@/features/searching-user/utils/apiGetMatch'
import { Card } from '@/shared/components/ui/card'
import { Badge } from '@/shared/components/ui/badge'
import calculateKDA from '@/shared/lib/utils/calculateKDA'

/**
 * 매치 상세 정보 컴포넌트
 * 매치 히스토리 아이템 클릭 시 나타나는 상세 정보를 표시
 */
export default function MatchDetail({ match }: { match: MatchInfo }) {
  // 두 팀으로 참가자 분리
  const blueTeam = match.info.participants.filter((p) => p.teamId === 100)
  const redTeam = match.info.participants.filter((p) => p.teamId === 200)

  return (
    <Card className="border-t-0 rounded-t-none p-3 pt-6 -mt-4 mb-2">
      <h3 className="text-sm font-bold mb-2">블루팀</h3>
      <div className="mb-4">
        <ul className="space-y-2">
          {blueTeam.map((player) => (
            <li key={player.puuid} className="flex items-center text-xs">
              <div className="w-6 h-6 mr-2">
                <img src={`${import.meta.env.VITE_RIOT_ICON_URL}/v1/champion-icons/${player.championId}.png`}
                     alt={player.championName} className="w-full h-full rounded-full" />
              </div>
              <span className="w-24 truncate">{player.summonerName}</span>
              <div className="flex items-center ml-2">
                <span>{player.kills}</span>
                <span className="mx-1 text-gray-500">/</span>
                <span className="text-red-500">{player.deaths}</span>
                <span className="mx-1 text-gray-500">/</span>
                <span>{player.assists}</span>
                <Badge variant="outline" className="ml-2 text-xs h-5">
                  {calculateKDA(player.kills, player.assists, player.deaths)} KDA
                </Badge>
                <span className="ml-2 text-gray-500">{player.totalDamageDealtToChampions.toLocaleString()} 딜량</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <h3 className="text-sm font-bold mb-2">레드팀</h3>
      <div>
        <ul className="space-y-2">
          {redTeam.map((player) => (
            <li key={player.puuid} className="flex items-center text-xs">
              <div className="w-6 h-6 mr-2">
                <img src={`${import.meta.env.VITE_RIOT_ICON_URL}/v1/champion-icons/${player.championId}.png`}
                     alt={player.championName} className="w-full h-full rounded-full" />
              </div>
              <span className="w-24 truncate">{player.summonerName}</span>
              <div className="flex items-center ml-2">
                <span>{player.kills}</span>
                <span className="mx-1 text-gray-500">/</span>
                <span className="text-red-500">{player.deaths}</span>
                <span className="mx-1 text-gray-500">/</span>
                <span>{player.assists}</span>
                <Badge variant="outline" className="ml-2 text-xs h-5">
                  {calculateKDA(player.kills, player.assists, player.deaths)} KDA
                </Badge>
                <span className="ml-2 text-gray-500">{player.totalDamageDealtToChampions.toLocaleString()} 딜량</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  )
}
