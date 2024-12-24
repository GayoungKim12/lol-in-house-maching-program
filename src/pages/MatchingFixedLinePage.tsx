import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { Button } from '@/shared/components/ui/button'
import useMatchTeam from '@/features/matching-team/hooks/useMatchTeam'
import MatchBoard from '@/features/matching-team/ui/MatchBoard'
import TeamLineup from '@/features/matching-team/ui/TeamLineup'
import MatchTeamButton from '@/features/matching-team/ui/MatchTeamButton'

export default function MatchingFixedLinePage() {
  const { pairs, isMatched, teamLineUps, handlePlayerChange, matchTeams, resetAll } = useMatchTeam()

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">라인 고정</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {!isMatched ? (
            <MatchBoard pairs={pairs} handlePlayerChange={handlePlayerChange} />
          ) : (
            <TeamLineup teamLineUps={teamLineUps} />
          )}

          <div className="flex justify-center gap-4">
            {!isMatched ? (
              <MatchTeamButton onClick={() => matchTeams('fixed')} />
            ) : (
              <div className="flex gap-4">
                <Button onClick={resetAll} variant="ghost" className="w-40">
                  처음부터
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}