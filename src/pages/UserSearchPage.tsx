import SearchContainer from '@/features/searching-user/ui/SearchContainer'
import UserProfile from '@/features/searching-user/ui/UserProfile'
import MatchStatsGraph from '@/features/searching-user/ui/MatchStatsGraph'
import MatchHistory from '@/features/searching-user/ui/MatchHistory'

export default function UserSearchPage() {
  return (
    <div className="w-full max-w-3xl mx-auto space-y-4">
      <SearchContainer />

      <div className="flex flex-col space-y-4">
        <UserProfile />

        <MatchStatsGraph />

        <MatchHistory />
      </div>
    </div>
  )
}