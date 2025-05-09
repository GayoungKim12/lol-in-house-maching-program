import { useEffect, useState } from 'react'
import UserProfile from '@/features/searching-user/ui/UserProfile'
import UserProfileSkeleton from '@/features/searching-user/ui/UserProfileSkeleton'
import SearchGuide from '@/features/searching-user/ui/SearchGuide'
import SearchBar from '@/features/searching-user/ui/SearchBar'
import useGetRiotAccount from '@/features/searching-user/hooks/useGetRiotAccount'
import useUserStore from '@/features/searching-user/store/useUserStore'

export default function SearchContainer() {
  const [searchValue, setSearchValue] = useState('')
  const { data: riotAccount, isLoading } = useGetRiotAccount(searchValue)
  const { setUser } = useUserStore()

  useEffect(() => {
    if (riotAccount) {
      setUser(riotAccount)
    }
  }, [riotAccount, setUser])

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4">
      <SearchBar isLoading={isLoading} setSearchValue={setSearchValue} />

      {/* 검색 결과 로딩 상태 */}
      {isLoading && (
        <UserProfileSkeleton />
      )}

      {/* 검색 결과 표시 */}
      {riotAccount && !isLoading && (
        <UserProfile />
      )}

      {/* 검색 가이드 */}
      {!searchValue && !isLoading && (
        <SearchGuide />
      )}
    </div>
  )
}
