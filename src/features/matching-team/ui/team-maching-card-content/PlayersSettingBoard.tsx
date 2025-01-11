import { Pair, RoleEnum } from '@/shared/types/teamRole'
import { Input } from '@/shared/components/ui/input'
import { ChangeEvent } from 'react'
import { Button } from '@/shared/components/ui/button'
import { Icon } from '@/shared/components/icon'
import useFixedLinesStore from '@/features/matching-team/stores/useFixedLinesStore'

interface MatchBoardProps {
  pairs: Pair[] | null
  handlePlayerChange: (pairIndex: number, player: 'player1' | 'player2', value: string) => void
}

export default function PlayersSettingBoard({ pairs, handlePlayerChange }: MatchBoardProps) {
  const { fixedLines, setFixedLines } = useFixedLinesStore()

  const handleChangeFixedLines = (selectedLine: number) => {
    if (fixedLines.includes(selectedLine)) {
      setFixedLines(fixedLines.filter(line => line !== selectedLine))
    } else {
      setFixedLines([...fixedLines, selectedLine])
    }
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      {pairs?.map((pair, index) => (
        <div key={index} className="flex items-center justify-between w-full gap-4">
          <span className="min-w-8">{RoleEnum[index]}</span>
          <div className="flex items-center gap-3 w-full">
            <Input
              value={pair.player1}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handlePlayerChange(index, 'player1', e.target.value)}
              placeholder={`${RoleEnum[index]}1`}
              className="flex-1"
            />
            <span>VS</span>
            <Input
              value={pair.player2}
              onChange={(e) => handlePlayerChange(index, 'player2', e.target.value)}
              placeholder={`${RoleEnum[index]}2`}
              className="flex-1"
            />
          </div>
          <Button variant="icon" size="icon" onClick={() => handleChangeFixedLines(index)}>
            {fixedLines.includes(index) ?
              <Icon name="Pin" size={22} strokeWidth={'1.5'} className="text-slate-800" /> :
              <Icon name="PinOff" size={22} strokeWidth={'1.5'} className="text-slate-400" />}
          </Button>
        </div>
      ))}
    </div>
  )
}