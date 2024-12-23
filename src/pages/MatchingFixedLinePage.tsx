import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { Button } from '@/shared/components/ui/button'
import { Shuffle } from 'lucide-react'
import useMatchTeam from '@/features/matching-team/hooks/useMatchTeam'
import MatchBoard from '@/features/matching-team/ui/MatchBoard'
import TeamLineup from '@/features/matching-team/ui/TeamLineup'

export default function MatchingFixedLinePage() {
  const { pairs, isMatched, teamRoles, handlePlayerChange, matchTeams, resetAll } = useMatchTeam()

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
            <TeamLineup teamRoles={teamRoles} />
          )}

          <div className="flex justify-center gap-4">
            {!isMatched ? (
              <Button onClick={() => matchTeams('fixed')} className="w-40">
                <Shuffle className="mr-2 h-4 w-4" />
                팀 매칭하기
              </Button>
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