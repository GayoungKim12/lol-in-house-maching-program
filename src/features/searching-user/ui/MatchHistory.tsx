import { Card, CardContent, CardHeader } from '@/shared/components/ui/card'
import MatchHistoryItem from '@/features/searching-user/ui/MatchHistoryItem'
import { Skeleton } from '@/shared/components/ui/skeleton'
import MatchHistoryFilter, { MatchFilter } from '@/features/searching-user/ui/MatchHistoryFilter'
import { useState } from 'react'
import getFilteredMatches from '@/features/searching-user/utils/getFilteredMatches'
import useGetMatchHistory from '@/features/searching-user/hooks/useGetMatchHistory'
import useGetRiotAccount from '@/features/searching-user/hooks/useGetRiotAccount'
import MatchHistoryPagination from '@/features/searching-user/ui/MatchHistoryPagination'

export default function MatchHistory() {
  const { data: riotAccount } = useGetRiotAccount()
  const { data: matches, isLoading } = useGetMatchHistory()
  const [filter, setFilter] = useState<MatchFilter>({
    gameMode: 'ALL',
    result: 'ALL',
  })

  const filteredMatches = getFilteredMatches(matches ?? [], filter, riotAccount?.puuid || '')

  if (!matches) return null

  return (
    <Card className="mt-4">
      <CardHeader className="pt-4">
        <MatchHistoryFilter onFilterChange={setFilter} />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          Array(5).map((_, index) => (
            <Skeleton key={index} className="w-full h-24 mb-2" />
          ))
        ) : filteredMatches.length ? (
          <>
            <div className="mb-6">
              {filteredMatches.map((match) => (
                <MatchHistoryItem key={match.metadata.matchId} match={match} />
              ))}
            </div>
            <MatchHistoryPagination />
          </>
        ) : (
          <div className="text-center py-8 text-gray-500">
            {matches?.length ? '필터 조건에 맞는 매치 기록이 없습니다.' : '최근 매치 기록이 없습니다.'}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
