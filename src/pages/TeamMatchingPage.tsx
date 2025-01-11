import { Card } from '@/shared/components/ui/card'
import useMatchTeamLineUps from '@/features/matching-team/hooks/useMatchTeamLineUps'
import TeamMatchingCardHeader from '@/features/matching-team/ui/TeamMatchingCardHeader'
import TeamMatchingCardContent from '@/features/matching-team/ui/team-maching-card-content'
import LoadPlayerModal from '@/features/matching-team/ui/LoadPlayerModal'

export default function TeamMatchingPage() {
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
      <LoadPlayerModal />

      <TeamMatchingCardHeader isMatched={isMatched}
                              handleSwapTeams={handleSwapTeams}
                              resetAll={resetAll}
                              resetTeams={resetTeams} />

      <TeamMatchingCardContent isMatched={isMatched} teamLineUps={teamLineUps}
                               handleChangeLines={handleChangeLines}
                               handlePlayerChange={handlePlayerChange}
                               matchTeamLineUps={matchTeamLineUps} />
    </Card>
  )
}