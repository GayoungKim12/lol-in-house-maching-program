import { Input } from '@/shared/components/ui/input'
import { Icon } from '@/shared/components/icon'
import { Button } from '@/shared/components/ui/button'
import { ChangeEvent, FormEvent, useState } from 'react'

interface SearchBarProps {
  isLoading: boolean
  setSearchValue: (value: string) => void
}

export default function SearchBar({ isLoading, setSearchValue }: SearchBarProps) {
  const [inputValue, setInputValue] = useState('')
  const [searchHistory, setSearchHistory] = useState<string[]>([])

  // 입력값 변경 처리
  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // 검색어 설정
    setSearchValue(inputValue.trim())

    // 검색 기록에 추가 (중복 제거)
    if (!searchHistory.includes(inputValue.trim())) {
      setSearchHistory((prev) => [inputValue.trim(), ...prev].slice(0, 5))
    }
  }

  const handleSelectHistory = (value: string) => {
    setInputValue(value)
    setSearchValue(value)
  }

  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
      <div className="relative flex-grow">
        <Input type="text" placeholder="소환사명#KR1 형식으로 입력하세요" value={inputValue} onChange={handleChangeInput}
               className="pr-10" disabled={isLoading} />
        {inputValue && (
          <button type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setInputValue('')}>
            <Icon name="X" className="h-4 w-4" />
          </button>
        )}

        {/* 검색 히스토리 드롭다운 */}
        {searchHistory.length > 0 && inputValue === '' && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-md shadow-lg z-10">
            <div className="p-2 text-xs text-gray-500 border-b">최근 검색</div>
            {searchHistory.map((item, index) => (
              <button key={index} type="button" className="w-full text-left px-3 py-2 hover:bg-gray-100"
                      onClick={() => handleSelectHistory(item)}>
                {item}
              </button>
            ))}
            {searchHistory.length > 0 && (
              <button type="button"
                      className="w-full text-center px-3 py-2 text-xs text-gray-500 hover:bg-gray-100 border-t"
                      onClick={() => setSearchHistory([])}>
                검색 기록 지우기
              </button>
            )}
          </div>
        )}
      </div>
      <Button type="submit" disabled={isLoading || !inputValue.includes('#')}>
        {isLoading ? <Icon name="Loader2" className="h-4 w-4 animate-spin" /> : <Icon name="Search" />}
      </Button>
    </form>
  )
}