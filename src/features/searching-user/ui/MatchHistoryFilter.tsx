import { Badge } from '@/shared/components/ui/badge'
import { Button } from '@/shared/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover'
import { useState } from 'react'
import { Icon } from '@/shared/components/icon'
import { GameMode, gameOptions } from '@/shared/lib/config/gameOptions'

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
    gameMode: GameMode.ALL,
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
      gameMode: GameMode.ALL,
      result: 'ALL',
    }
    setFilter(defaultFilter)
    onFilterChange(defaultFilter)
  }

  // 활성화된 필터 수 계산
  const activeFilterCount = Object.values(filter).filter((value) => !(value === 'ALL' || value === GameMode.ALL)).length

  return (
    <div className="flex justify-between items-center">
      <div className="font-semibold text-lg">최근 전적</div>

      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="relative flex items-center gap-1">
            <Icon name="Filter" className="h-4 w-4" />
            필터
            {activeFilterCount > 0 && (
              <Badge className="absolute -top-2 -right-2 ml-1 h-5 w-5 p-0 flex items-center justify-center">
                {activeFilterCount}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-80">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-medium">필터 설정</h4>
            {activeFilterCount > 0 && (
              <Button variant="ghost" size="sm" onClick={resetFilter} className="h-7 px-2">
                <Icon name="X" className="h-3 w-3 mr-0.5" />
                초기화
              </Button>
            )}
          </div>

          <div className="space-y-4">
            {gameOptions.map(({ label, options, value }) => (
              <div key={value}>
                <div className="text-sm font-medium mb-2">{label}</div>
                <div className="flex flex-wrap gap-2">
                  {options.map((mode) => (
                    <Badge
                      key={mode.value}
                      variant={filter[value] === mode.value ? 'default' : 'outline'}
                      className="cursor-pointer"
                      onClick={() => handleFilterChange(value, mode.value as (GameMode | GameResult))}
                    >
                      {mode.label}
                      {filter[value] === mode.value && (
                        <Icon name="Check" className="ml-1 h-3 w-3" />
                      )}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
