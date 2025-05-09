import { useEffect, useState } from 'react'
import UserProfile from '@/features/searching-user/ui/UserProfile'
import UserProfileSkeleton from '@/features/searching-user/ui/UserProfileSkeleton'
import SearchGuide from '@/features/searching-user/ui/SearchGuide'
import ErrorAlert from '@/features/searching-user/ui/ErrorAlert'
import SearchBar from '@/features/searching-user/ui/SearchBar'
import useGetRiotAccount from '@/features/searching-user/hooks/useGetRiotAccount'
import useUserStore from '@/features/searching-user/store/useUserStore'

/**
 * 소환사 검색 컴포넌트
 * 사용자가 'gameName#tagLine' 형식으로 입력하면 라이엇 API를 통해 소환사 정보를 조회합니다.
 */
export default function SearchContainer() {
  const [searchValue, setSearchValue] = useState('')
  const { data: riotAccount, isLoading, error, isError } = useGetRiotAccount(searchValue)
  const { setUser } = useUserStore()

  useEffect(() => {
    if (riotAccount) {
      setUser(riotAccount)
    }
  }, [riotAccount, setUser])

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4">
      <SearchBar isLoading={isLoading} setSearchValue={setSearchValue} />

      {/* 에러 메시지 */}
      {isError && (
        <ErrorAlert error={error} />
      )}

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
