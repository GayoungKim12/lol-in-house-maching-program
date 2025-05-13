import { MatchInfo } from '@/features/searching-user/utils/apiGetMatch'
import { Card } from '@/shared/components/ui/card'
import { Link } from 'react-router-dom'
import useGetRiotAccount from '@/features/searching-user/hooks/useGetRiotAccount'
import { MouseEvent, useState } from 'react'
import MatchDetail from './MatchDetail'
import { Icon } from '@/shared/components/icon'
import GameInfo from '@/features/searching-user/ui/GameInfo'
import ChampionAndKDA from '@/features/searching-user/ui/ChampionAndKDA'
import ItemList from '@/features/searching-user/ui/ItemList'
import { Team } from '@/shared/lib/config/gameOptions'

interface MatchHistoryItemProps {
  match: MatchInfo;
}

/**
 * 매치 히스토리 아이템 컴포넌트
 */
export default function MatchHistoryItem({ match }: MatchHistoryItemProps) {
  const { data: riotAccount } = useGetRiotAccount()
  const [isOpen, setIsOpen] = useState(false) // 상세 정보 토글 상태

  const blueTeam = match.info.participants.filter((p) => p.teamId === Team.BLUE)
  const redTeam = match.info.participants.filter((p) => p.teamId === Team.RED)

  const teams = [{
    label: '블루팀',
    players: blueTeam,
  }, {
    label: '레드팀',
    players: redTeam,
  }]

  // 현재 사용자 정보 찾기
  const player = match.info.participants.find((p) => p.puuid === riotAccount?.puuid)
  const handleClick = (e: MouseEvent) => {
    e.preventDefault() // Link 이동 방지
    setIsOpen((prev) => !prev)
  }

  if (!player) return null

  return (
    <div>
      <Link to={`/match/${match.metadata.matchId}`} className="block no-underline text-current">
        <Card
          className={`relative flex justify-between items-end mb-2 px-4 py-3 border-l-4 ${player.win ? 'border-l-blue-500' : 'border-l-red-500'} hover:shadow-md transition-shadow overflow-x-auto`}>
          <div className="flex min-w-80">
            <GameInfo player={player} match={match} />
            <div className="ml-2">
              <ChampionAndKDA player={player} match={match} />

              <ItemList player={player} match={match} />
            </div>
          </div>

          <div className="flex items-end md:w-full">
            <div className="hidden md:flex ml-2 w-full">
              {teams.map(team => (
                <ul className="flex flex-col gap-0.5 mr-4">
                  {team.players.map(player => (
                    <li className="flex text-xs truncate">
                      <div className="w-4 h-4 rounded-sm overflow-hidden mr-2">
                        <img src={`${import.meta.env.VITE_RIOT_ICON_URL}/v1/champion-icons/${player.championId}.png`}
                             alt={player.championName} className="w-full h-full aspect-square scale-110" />
                      </div>
                      <span className="max-w-32 truncate">
                      {player.riotIdGameName + '#' + player.riotIdTagline}
                      </span>
                    </li>
                  ))}
                </ul>
              ))}
            </div>

            <button className="inline-flex items-center justify-center w-8 h-8 text-gray-500 hover:text-black"
                    onClick={handleClick}
                    aria-label={isOpen ? '상세 닫기' : '상세 보기'}
            >
              <Icon name="ChevronDown" className={`w-5 h-5 ${isOpen && 'rotate-180'} transition`} />
            </button>
          </div>

        </Card>
      </Link>

      {/* 상세 정보 영역 */}
      {isOpen && <MatchDetail match={match} />}
    </div>
  )
}
