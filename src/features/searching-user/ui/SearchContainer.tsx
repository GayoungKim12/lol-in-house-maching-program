import SearchGuide from '@/features/searching-user/ui/SearchGuide'
import SearchBar from '@/features/searching-user/ui/SearchBar'
import useGetRiotAccount from '@/features/searching-user/hooks/useGetRiotAccount'

export default function SearchContainer() {
  const { data: riotAccount, isLoading } = useGetRiotAccount()

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4">
      <SearchBar isLoading={isLoading} />

      {/* 검색 가이드 */}
      {!riotAccount && !isLoading && (
        <SearchGuide />
      )}
    </div>
  )
}
