import { Badge } from '@/shared/components/ui/badge'
import { Button } from '@/shared/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover'
import { Check, Filter, X } from 'lucide-react'
import { useState } from 'react'
import { gameModes } from '@/shared/lib/config/gameModes'
import { gameResults } from '@/shared/lib/config/gameResults'

export type GameMode = 'ALL' | 'CLASSIC' | 'ARAM' | 'URF' | 'OTHER';
export type GameResult = 'ALL' | 'WIN' | 'LOSE';

export interface MatchFilter {
  gameMode: GameMode;
  result: GameResult;
}

interface MatchHistoryFilterProps {
  onFilterChange: (filter: MatchFilter) => void;
}

/**
 * 매치 히스토리 필터링 컴포넌트
 */
export default function MatchHistoryFilter({ onFilterChange }: MatchHistoryFilterProps) {
  const [filter, setFilter] = useState<MatchFilter>({
    gameMode: 'ALL',
    result: 'ALL',
  })
  const [isOpen, setIsOpen] = useState(false)

  // 필터 변경 처리
  const handleFilterChange = (key: keyof MatchFilter, value: GameMode | GameResult) => {
    const newFilter = {
      ...filter,
      [key]: value,
    }
    setFilter(newFilter as MatchFilter)
    onFilterChange(newFilter as MatchFilter)
  }

  // 필터 초기화
  const resetFilter = () => {
    const defaultFilter: MatchFilter = {
      gameMode: 'ALL',
      result: 'ALL',
    }
    setFilter(defaultFilter)
    onFilterChange(defaultFilter)
  }

  // 활성화된 필터 수 계산
  const activeFilterCount = Object.values(filter).filter((value) => value !== 'ALL').length

  return (
    <div className="mb-4 flex justify-between items-center">
      <div className="font-medium">최근 전적</div>

      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Filter className="h-4 w-4" />
            필터
            {activeFilterCount > 0 &&
              <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center">{activeFilterCount}</Badge>}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-80">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-medium">필터 설정</h4>
            {activeFilterCount > 0 && (
              <Button variant="ghost" size="sm" onClick={resetFilter} className="h-7 px-2">
                <X className="h-3 w-3 mr-1" />
                초기화
              </Button>
            )}
          </div>

          <div className="space-y-4">
            {/* 게임 모드 필터 */}
            <div>
              <div className="text-sm font-medium mb-2">게임 모드</div>
              <div className="flex flex-wrap gap-2">
                {gameModes.map((mode) => (
                  <Badge
                    key={mode.value}
                    variant={filter.gameMode === mode.value ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => handleFilterChange('gameMode', mode.value as GameMode)}
                  >
                    {mode.label}
                    {filter.gameMode === mode.value && <Check className="ml-1 h-3 w-3" />}
                  </Badge>
                ))}
              </div>
            </div>

            {/* 게임 결과 필터 */}
            <div>
              <div className="text-sm font-medium mb-2">게임 결과</div>
              <div className="flex gap-2">
                {gameResults.map((result) => (
                  <Badge
                    key={result.value}
                    variant={filter.result === result.value ? 'default' : 'outline'}
                    className={`cursor-pointer ${result.value === 'WIN' ? (filter.result === result.value ? '' : 'hover:bg-blue-100') :
                      result.value === 'LOSE' ? (filter.result === result.value ? '' : 'hover:bg-red-100') : ''}`}
                    onClick={() => handleFilterChange('result', result.value as GameResult)}
                  >
                    {result.label}
                    {filter.result === result.value && <Check className="ml-1 h-3 w-3" />}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <Button className="w-full mt-4" onClick={() => setIsOpen(false)}>
            닫기
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  )
}
