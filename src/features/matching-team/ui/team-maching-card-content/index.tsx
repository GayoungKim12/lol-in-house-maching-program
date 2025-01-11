import PlayersSettingBoard from '@/features/matching-team/ui/team-maching-card-content/PlayersSettingBoard'
import TeamLineUpsBoard from '@/features/matching-team/ui/team-maching-card-content/TeamLineUpsBoard'
import TeamMatchingButton from '@/features/matching-team/ui/team-maching-card-content/TeamMatchingButton'
import { Button } from '@/shared/components/ui/button'
import { Icon } from '@/shared/components/icon'
import { CardContent } from '@/shared/components/ui/card'
import { TeamLineUps } from '@/shared/types/teamRole'
import usePairsStore from '@/features/matching-team/stores/usePairsStore'

interface TeamMatchingCardContentProps {
  isMatched: boolean
  teamLineUps: TeamLineUps
  handleChangeLines: () => void
  handlePlayerChange: (pairIndex: number, player: 'player1' | 'player2', value: string) => void
  matchTeamLineUps: () => void
}

export default function TeamMatchingCardContent({
  isMatched,
  teamLineUps,
  handleChangeLines,
  handlePlayerChange,
  matchTeamLineUps,
}: TeamMatchingCardContentProps) {
  const { pairs } = usePairsStore()

  const matchTeamAndSavePlayers = () => {
    matchTeamLineUps()
    localStorage.setItem('players', JSON.stringify(pairs))
  }

  return (
    <CardContent className="p-0 w-full">
      <div className="space-y-6">

        {!isMatched ? (
          <PlayersSettingBoard pairs={pairs} handlePlayerChange={handlePlayerChange} />
        ) : (
          <TeamLineUpsBoard teamLineUps={teamLineUps} />
        )}

        <div className="flex justify-center gap-4">
          {!isMatched ? (
            <TeamMatchingButton onClick={matchTeamAndSavePlayers} />
          ) : (
            <>
              <Button onClick={handleChangeLines} className="w-36" variant="outline">
                <Icon name="ArrowUpDown" size={16} />
                라인 바꾸기
              </Button>
              <Button onClick={matchTeamLineUps} className="w-36">
                <Icon name="Shuffle" size={16} />
                팀 매칭하기
              </Button>
            </>
          )}
        </div>
      </div>
    </CardContent>
  )
}