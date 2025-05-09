import SearchContainer from '@/features/searching-user/ui/SearchContainer'
import UserProfile from '@/features/searching-user/ui/UserProfile'
import MatchStatsGraph from '@/features/match-history/ui/MatchStatsGraph'

export default function UserSearchPage() {
  return (
    <div className="w-full max-w-3xl mx-auto space-y-4">
      <SearchContainer />

      <div className="flex flex-col space-y-4">
        <UserProfile />

        <MatchStatsGraph />
      </div>
    </div>
  )
}