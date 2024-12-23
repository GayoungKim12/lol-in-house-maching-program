import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { Button } from '@/shared/components/ui/button'
import { Shuffle } from 'lucide-react'
import useMatchTeam from '@/features/matching-team/hooks/useMatchTeam'
import MatchBoard from '@/features/matching-team/ui/MatchBoard'

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
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-blue-600">BLUE</h3>
                {teamRoles.team1.map((player, index) => (<div key={index} className="relative">
                  <div className="px-4 py-2 bg-blue-100 rounded flex justify-between items-center">
                    <span className="font-medium w-12">{player.role}</span>
                    <span>{player.player}</span>
                  </div>
                </div>))}
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-red-600">RED</h3>
                {teamRoles.team2.map((player, index) => (<div key={index} className="relative">
                  <div className="px-4 py-2 bg-red-100 rounded flex justify-between items-center">
                    <span className="font-medium w-12">{player.role}</span>
                    <span>{player.player}</span>
                  </div>
                </div>))}
              </div>
            </div>
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