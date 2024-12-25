import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { Button } from '@/shared/components/ui/button'
import useMatchTeamLineUps from '@/features/matching-team/hooks/useMatchTeamLineUps'
import MatchBoard from '@/features/matching-team/ui/MatchBoard'
import TeamLineup from '@/features/matching-team/ui/TeamLineup'
import MatchTeamButton from '@/features/matching-team/ui/MatchTeamButton'
import { Icon } from '@/shared/components/icon'
import useFixedLinesStore from '@/features/matching-team/stores/useFixedLinesStore'
import usePairsStore from '@/features/matching-team/stores/usePairsStore'

export default function TeamMatchingPage() {
  const { pairs } = usePairsStore()
  const { fixedLines, setFixedLines } = useFixedLinesStore()
  const {
    isMatched, teamLineUps, handlePlayerChange, handleChangeLines, matchTeamLineUps, resetAll,
  } = useMatchTeamLineUps()

  const isAllFixedLines = fixedLines.length === 5

  const handleChangeFixedLines = () => {
    setFixedLines(isAllFixedLines ? [] : [0, 1, 2, 3, 4])
  }

  return (
    <Card className="flex flex-col w-full max-w-2xl mx-auto p-6 gap-6">
      <CardHeader className="flex-row items-center justify-between p-0">
        <span className="w-10"></span>
        <CardTitle className="text-center">팀 매칭</CardTitle>
        <Button variant="icon" size="icon" onClick={handleChangeFixedLines} className="margin-0">
          {isAllFixedLines ?
            <Icon name="Pin" size={22} strokeWidth={'1.5'} className="text-slate-800" /> :
            <Icon name="PinOff" size={22} strokeWidth={'1.5'} className="text-slate-400" />}
        </Button>
      </CardHeader>
      <CardContent className="p-0 w-full">
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
                <Button onClick={handleChangeLines} variant="outline" className="w-40">
                  라인 바꾸기
                </Button>
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