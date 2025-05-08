import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { Badge } from '@/shared/components/ui/badge'
import getTierColor from '@/shared/lib/utils/getTierColor'
import useGetLeagueEntry from '@/features/searching-user/hooks/useGetLeagueEntry'
import useGetSummoner from '@/features/searching-user/hooks/useGetSummoner'
import useUserStore from '@/features/searching-user/store/useUserStore'

export default function UserProfile() {
  const { gameName, tagLine } = useUserStore()
  const { data: summoner } = useGetSummoner()
  const { data: leagueEntry } = useGetLeagueEntry()

  if (!(summoner && leagueEntry && 'puuid' in summoner && leagueEntry instanceof Array)) return null

  return (
    <Card className="flex flex-row px-7 items-center min-h-44">
      <div className="relative w-32 bottom-1">
        <img
          src={`${import.meta.env.VITE_RIOT_PROFILE_ICON_URL}/${summoner.profileIconId}.jpg`}
          alt="프로필 아이콘"
          className="w-full rounded-2xl"
        />
        <Badge className="absolute left-1/2 -translate-x-1/2 z-10 -translate-y-1/2 bg-black">
          {summoner.summonerLevel}
        </Badge>
      </div>
      <div className="flex flex-col justify-start h-full">
        <CardHeader className="flex flex-row items-center space-y-0 pb-3">
          <CardTitle>
            {gameName}
            <span className="ml-1 text-lg text-gray-500 text font-medium">#{tagLine}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-7 pl-7">
          {/* 소환사 랭크 정보 */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium">랭크 정보</h3>
            {leagueEntry.length > 0 ? (
              <div className="flex flex-wrap gap-3">
                {leagueEntry.map((entry, index) => (
                  <div key={index} className="flex flex-col">
                  <span className="text-xs text-gray-500">
                    {entry.queueType === 'RANKED_SOLO_5x5' ? '솔로랭크' : entry.queueType === 'RANKED_FLEX_SR' ? '자유랭크' : entry.queueType}
                  </span>
                    <Badge className={`${getTierColor(entry.tier)} mt-1`}>
                      {entry.tier ? `${entry.tier} ${entry.rank} (${entry.leaguePoints}LP)` : '배치 전'}
                    </Badge>
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
      </div>
    </Card>
  )
}