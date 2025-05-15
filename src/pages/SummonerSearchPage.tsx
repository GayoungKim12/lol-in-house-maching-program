import SearchContainer from '@/features/searching-user/ui/SearchContainer'
import RegisterCustomMatchDialog from '@/features/register-custom-match/ui/RegisterCustomMatchDialog'
import { useLocation } from 'react-router-dom'

export default function SummonerSearchPage() {
  const location = useLocation()
  const isPublicPage = location.pathname.includes('/public')

  return (
    <>
      {!isPublicPage && (
        <div className="mb-2 w-full max-w-3xl mx-auto text-right">
          <RegisterCustomMatchDialog />
        </div>
      )}
      <div className="w-full max-w-3xl mx-auto space-y-4">
        <SearchContainer />
      </div>
    </>
  )
}