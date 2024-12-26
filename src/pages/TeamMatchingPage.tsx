import { Card, CardContent } from '@/shared/components/ui/card'
import { Button } from '@/shared/components/ui/button'
import useMatchTeamLineUps from '@/features/matching-team/hooks/useMatchTeamLineUps'
import PlayersSettingBoard from '@/features/matching-team/ui/PlayersSettingBoard'
import TeamLineUpsBoard from '@/features/matching-team/ui/TeamLineUpsBoard'
import TeamMatchingButton from '@/features/matching-team/ui/TeamMatchingButton'
import usePairsStore from '@/features/matching-team/stores/usePairsStore'
import TeamMatchingCardHeader from '@/features/matching-team/ui/TeamMatchingCardHeader'
import { Icon } from '@/shared/components/icon'

export default function TeamMatchingPage() {
  const { pairs } = usePairsStore()

  const {
    isMatched,
    teamLineUps,
    handlePlayerChange,
    handleChangeLines,
    handleSwapTeams,
    matchTeamLineUps,
    resetAll,
    resetTeams,
  } = useMatchTeamLineUps()

  return (
    <Card className="flex flex-col w-full max-w-2xl mx-auto p-6 gap-6">
      <TeamMatchingCardHeader isMatched={isMatched}
                              handleSwapTeams={handleSwapTeams} resetAll={resetAll} resetTeams={resetTeams} />

      <CardContent className="p-0 w-full">
        <div className="space-y-6">

          {!isMatched ? (
            <PlayersSettingBoard pairs={pairs} handlePlayerChange={handlePlayerChange} />
          ) : (
            <TeamLineUpsBoard teamLineUps={teamLineUps} />
          )}

          <div className="flex justify-center gap-4">
            {!isMatched ? (
              <TeamMatchingButton onClick={matchTeamLineUps} />
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
    </Card>
  )
}