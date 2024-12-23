import { Pair, RoleEnum } from '@/shared/types/teamRole'
import { Input } from '@/shared/components/ui/input'
import { ChangeEvent } from 'react'

interface MatchBoardProps {
  pairs: Pair[]
  handlePlayerChange: (pairIndex: number, player: 'player1' | 'player2', value: string) => void
}

const ROLES = Object.values(RoleEnum)

export default function MatchBoard({ pairs, handlePlayerChange }: MatchBoardProps) {
  return (
    <div className="space-y-4">
      {pairs.map((pair, index) => (
        <div key={index} className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <span className="w-12">{ROLES[index]}</span>
            <Input
              value={pair.player1}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handlePlayerChange(index, 'player1', e.target.value)}
              placeholder={`${ROLES[index]} 1`}
              className="flex-1"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="w-6">VS</span>
            <Input
              value={pair.player2}
              onChange={(e) => handlePlayerChange(index, 'player2', e.target.value)}
              placeholder={`${ROLES[index]} 2`}
              className="flex-1"
            />
          </div>
        </div>
      ))}
    </div>
  )
}