import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { Button } from '@/shared/components/ui/button'
import useMatchTeam from '@/features/matching-team/hooks/useMatchTeam'
import MatchBoard from '@/features/matching-team/ui/MatchBoard'
import TeamLineup from '@/features/matching-team/ui/TeamLineup'
import MatchTeamButton from '@/features/matching-team/ui/MatchTeamButton'
import changeLineUps from '@/features/matching-team/utils/changeLineUps'

export default function TeamMatchingPage() {
  const {
    pairs, isMatched, teamLineUps, setTeamLineUps, handlePlayerChange, matchTeamLineUps, resetAll,
  } = useMatchTeam()

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">팀 매칭</CardTitle>
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
              <MatchTeamButton onClick={() => matchTeamLineUps()} />
            ) : (
              <div className="flex gap-4">
                <Button onClick={() => setTeamLineUps(changeLineUps(teamLineUps))} variant="outline" className="w-40"
                >
                  라인 바꾸기
                </Button>
                <Button onClick={resetAll} variant="ghost" className="w-40"
                >
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