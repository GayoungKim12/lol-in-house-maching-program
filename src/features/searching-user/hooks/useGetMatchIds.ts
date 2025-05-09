import { useQuery } from '@tanstack/react-query'
import apiGetMatchIds from '@/features/searching-user/utils/apiGetMatchIds'
import useGetRiotAccount from '@/features/searching-user/hooks/useGetRiotAccount'

export default function useGetMatchIds() {
  const { data: riotAccount } = useGetRiotAccount()

  return useQuery({
    queryKey: ['matchIds', { riotAccount }],
    queryFn: async () => {
      if (!riotAccount) return []

      return await apiGetMatchIds(riotAccount.puuid)
    },
    enabled: !!riotAccount,
  })
}