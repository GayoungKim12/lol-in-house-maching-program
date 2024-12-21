import { ChangeEvent } from 'react'
import { Input } from '@/shared/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { Button } from '@/shared/components/ui/button'
import { Shuffle } from 'lucide-react'
import useMatchTeam from '@/features/matching-team/hooks/useMatchTeam'

export default function MatchingRandomLinePage() {
  const { pairs, isMatched, teamRoles, handlePlayerChange, matchTeams, changeLines, resetAll } = useMatchTeam()

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">라인 랜덤</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {!isMatched ? (
            <div className="space-y-4">
              {pairs.map((pair, index) => (
                <div key={index} className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <span className="w-12">Pair {index + 1}</span>
                    <Input
                      value={pair.player1}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => handlePlayerChange(index, 'player1', e.target.value)}
                      placeholder="플레이어 1"
                      className="flex-1"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-6">VS</span>
                    <Input
                      value={pair.player2}
                      onChange={(e) => handlePlayerChange(index, 'player2', e.target.value)}
                      placeholder="플레이어 2"
                      className="flex-1"
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-blue-600">Blue Team</h3>
                {teamRoles.team1.map((player, index) => (<div key={index} className="relative">
                  <div className="p-2 bg-blue-100 rounded flex justify-between items-center">
                    <span className="font-medium w-12">{player.role}</span>
                    <span>{player.player}</span>
                  </div>
                </div>))}
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-red-600">Red Team</h3>
                {teamRoles.team2.map((player, index) => (<div key={index} className="relative">
                  <div className="p-2 bg-red-100 rounded flex justify-between items-center">
                    <span className="font-medium w-12">{player.role}</span>
                    <span>{player.player}</span>
                  </div>
                </div>))}
              </div>
            </div>
          )}

          <div className="flex justify-center gap-4">
            {!isMatched ? (
              <Button onClick={() => matchTeams('random')} className="w-40">
                <Shuffle className="mr-2 h-4 w-4" />
                팀 매칭하기
              </Button>
            ) : (
              <div className="flex gap-4">
                <Button onClick={() => changeLines(teamRoles)} variant="outline" className="w-40"
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