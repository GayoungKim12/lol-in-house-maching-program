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
import MatchPlayer from '@/features/searching-user/ui/MatchPlayers'
import { Button } from '@/shared/components/ui/button'

interface MatchHistoryItemProps {
  match: MatchInfo;
}

/**
 * 매치 히스토리 아이템 컴포넌트
 */
export default function MatchHistoryItem({ match }: MatchHistoryItemProps) {
  const { data: riotAccount } = useGetRiotAccount()
  const [isOpen, setIsOpen] = useState(false) // 상세 정보 토글 상태
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
          className={`relative flex justify-between items-start mb-2 p-3 border-l-4 ${player.win ? 'border-l-blue-500' : 'border-l-red-500'} hover:shadow-md transition-shadow overflow-x-auto`}>
          <div className="flex min-w-92">
            <GameInfo player={player} match={match} />
            <div>
              <ChampionAndKDA player={player} match={match} />

              <ItemList player={player} match={match} />
            </div>
          </div>

          <div className="flex items-end justify-between md:w-full">
            <MatchPlayer match={match} />

            <Button variant="icon" size="icon" onClick={handleClick}
                    aria-label={isOpen ? '상세 닫기' : '상세 보기'}
            >
              <Icon name="ChevronDown" className={`w-5 h-5 ${isOpen && 'rotate-180'} transition`} />
            </Button>
          </div>

        </Card>
      </Link>

      {/* 상세 정보 영역 */}
      {isOpen && <MatchDetail match={match} />}
    </div>
  )
}
