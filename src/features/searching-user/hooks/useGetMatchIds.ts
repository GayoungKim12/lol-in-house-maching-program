import { useQuery } from '@tanstack/react-query'
import apiGetMatchIds from '@/features/searching-user/utils/apiGetMatchIds'
import useGetRiotAccount from '@/features/searching-user/hooks/useGetRiotAccount'
import { useLocation } from 'react-router-dom'

export default function useGetMatchIds() {
  const { data: riotAccount } = useGetRiotAccount()
  const location = useLocation()
  const hash = location.hash
  const isPublicGamePage = location.pathname.includes('/public')
  const page = Number(hash.split('#')[1] ?? 1)

  return useQuery({
    queryKey: ['matchIds', { riotAccount, page, isPublicGamePage }],
    queryFn: async () => {
      if (!riotAccount) return []

      if (isPublicGamePage) {
        return await apiGetMatchIds(riotAccount.puuid, (page - 1) * 10)
      } else {
        return []
      }
    },
    enabled: !!riotAccount,
  })
}