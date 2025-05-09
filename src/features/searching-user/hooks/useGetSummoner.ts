import { useQuery } from '@tanstack/react-query'
import apiGetSummoner from '@/features/searching-user/utils/apiGetSummoner'
import useGetRiotAccount from '@/features/searching-user/hooks/useGetRiotAccount'

export default function useGetSummoner() {
  const { data: riotAccount } = useGetRiotAccount()

  return useQuery({
    queryKey: ['summoner', { riotAccount }],
    queryFn: async () => {
      if (!riotAccount) return

      return await apiGetSummoner(riotAccount.puuid)
    },
    placeholderData: undefined,
    enabled: !!riotAccount,
  })
}