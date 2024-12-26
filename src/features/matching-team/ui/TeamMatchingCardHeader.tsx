import { CardHeader, CardTitle } from '@/shared/components/ui/card'
import { Button } from '@/shared/components/ui/button'
import { Icon } from '@/shared/components/icon'
import useFixedLinesStore from '@/features/matching-team/stores/useFixedLinesStore'

interface TeamMatchingCardHeaderProps {
  isMatched: boolean
  handleSwapTeams: () => void
  resetAll: () => void
  resetTeams: () => void
}

export default function TeamMatchingCardHeader({
  isMatched,
  handleSwapTeams,
  resetAll,
  resetTeams,
}: TeamMatchingCardHeaderProps) {
  const { fixedLines, setFixedLines } = useFixedLinesStore()

  const isAllFixedLines = fixedLines.length === 5

  const handleChangeFixedLines = () => {
    setFixedLines(isAllFixedLines ? [] : [0, 1, 2, 3, 4])
  }

  return (
    <CardHeader className="flex-row items-center justify-between p-0">

      {!isMatched ? (
        <Button variant="icon" size="icon" onClick={resetAll}>
          <Icon name="RotateCcw" size={22} strokeWidth={'1.5'} className="text-slate-800" />
        </Button>
      ) : (
        <Button variant="icon" size="icon" onClick={resetTeams}>
          <Icon name="ArrowLeft" size={22} strokeWidth={'1.5'} className="text-slate-800" />
        </Button>
      )}


      <CardTitle className="text-center">
        {!isMatched ? '팀 매칭' : '팀 라인업'}
      </CardTitle>

      {!isMatched ? (
        <Button variant="icon" size="icon" onClick={handleChangeFixedLines}>
          {isAllFixedLines ?
            <Icon name="Pin" size={22} strokeWidth={'1.5'} className="text-slate-800" /> :
            <Icon name="PinOff" size={22} strokeWidth={'1.5'} className="text-slate-400" />}
        </Button>
      ) : (
        <Button variant="icon" size="icon" onClick={handleSwapTeams}>
          <Icon name="ArrowRightLeft" size={22} strokeWidth={'1.5'} className="text-slate-800" />
        </Button>
      )}

    </CardHeader>
  )
}