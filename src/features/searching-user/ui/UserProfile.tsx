import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { Badge } from '@/shared/components/ui/badge'
import { SummonerProfile } from '@/features/searching-user/hooks/useGetSearchedUsers'
import getTierColor from '@/shared/lib/utils/getTierColor'

interface UserProfileProps {
  searchedUser: SummonerProfile
}

export default function UserProfile({ searchedUser }: UserProfileProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>
          {searchedUser.account.gameName}#{searchedUser.account.tagLine}
        </CardTitle>
        <div className="text-sm text-gray-500">레벨: {searchedUser.summonerLevel || '정보 없음'}</div>
      </CardHeader>
      <CardContent>
        {/* 소환사 랭크 정보 */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium">랭크 정보</h3>
          {searchedUser.leagueEntries && searchedUser.leagueEntries.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {searchedUser.leagueEntries.map((entry, index) => (
                <div key={index} className="flex flex-col">
                      <span
                        className="text-xs text-gray-500">{entry.queueType === 'RANKED_SOLO_5x5' ? '솔로랭크' : entry.queueType === 'RANKED_FLEX_SR' ? '자유랭크' : entry.queueType}</span>
                  <Badge
                    className={`${getTierColor(entry.tier)} mt-1`}>{entry.tier ? `${entry.tier} ${entry.rank} (${entry.leaguePoints}LP)` : '배치 전'}</Badge>
                  <span className="text-xs mt-1">
                        {entry.wins}승 {entry.losses}패 ({Math.round((entry.wins / (entry.wins + entry.losses)) * 100)}%)
                      </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-sm text-gray-500">랭크 정보가 없습니다.</div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}