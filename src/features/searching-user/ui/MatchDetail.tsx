import { MatchInfo } from '@/features/searching-user/utils/apiGetMatch'
import { Card } from '@/shared/components/ui/card'
import { Badge } from '@/shared/components/ui/badge'
import calculateKDA from '@/shared/lib/utils/calculateKDA'
import { Link } from 'react-router-dom'
import { Fragment } from 'react'
import useGetItemInfo from '@/entities/item/hooks/useGetItemInfo'
import getItemNames from '@/features/searching-user/utils/getItemNames'

/**
 * 매치 상세 정보 컴포넌트
 * 매치 히스토리 아이템 클릭 시 나타나는 상세 정보를 표시
 */
export default function MatchDetail({ match }: { match: MatchInfo }) {
  const { data: itemInfo } = useGetItemInfo()
  // 두 팀으로 참가자 분리
  const blueTeam = match.info.participants.filter((p) => p.teamId === 100)
  const redTeam = match.info.participants.filter((p) => p.teamId === 200)

  const teams = [{
    label: '블루팀',
    players: blueTeam,
  }, {
    label: '레드팀',
    players: redTeam,
  }]

  return (
    <Card className="border-t-0 rounded-t-none p-3 pt-6 -mt-4 mb-2">
      {teams.map(({ label, players }) => (
        <Fragment key={label}>
          <h3 className="text-md font-bold mb-2">{label}</h3>
          <div className="mb-4">
            <ul className="space-y-2">
              {players.map((player) => {
                const playerName = player.riotIdGameName + '#' + player.riotIdTagline
                const encodedPlayerName = encodeURIComponent(playerName.trim())

                return (
                  <li key={player.puuid} className="flex items-center text-xs">
                    <div className="w-6 h-6 mr-2">
                      <img src={`${import.meta.env.VITE_RIOT_ICON_URL}/v1/champion-icons/${player.championId}.png`}
                           alt={player.championName} className="w-full h-full rounded-full" />
                    </div>
                    <Link to={`/summoner/${encodedPlayerName}`} className="w-28 truncate text-sm">{playerName}</Link>
                    <div className="flex items-center ml-2">
                      <div className="flex justify-center w-20">
                        <span className="text-sm">{player.kills}</span>
                        <span className="mx-1 text-gray-500">/</span>
                        <span className="text-sm text-red-500">{player.deaths}</span>
                        <span className="mx-1 text-gray-500">/</span>
                        <span className="text-sm">{player.assists}</span>
                      </div>
                      <Badge variant="outline" className="ml-2 text-xs h-5">
                        {calculateKDA(player.kills, player.assists, player.deaths)} KDA
                      </Badge>
                      <span className="ml-2 text-gray-500 w-40">
                        {player.totalDamageDealtToChampions.toLocaleString()} 딜량
                      </span>
                      <div className="flex w-28 gap-1 items-center justify-start mr-4">
                        {getItemNames(itemInfo ?? new Map([]), player).map((item, index) => {
                          return item ? (
                            <img key={`${match.metadata.matchId}-${item}`}
                                 src={`${import.meta.env.VITE_RIOT_ICON_URL}/assets/items/icons2d/${item}.png`}
                                 alt={`아이템 ${item}`}
                                 className="w-6 h-6 rounded" />
                          ) : (
                            <div key={index} className="w-6 h-6 rounded bg-gray-200" />
                          )
                        })}
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </Fragment>
      ))}
    </Card>
  )
}
