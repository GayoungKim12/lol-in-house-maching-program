import riotAsiaApi from '@/shared/lib/axios/riotAsiaApi'
import handleAPIError from '@/shared/lib/utils/handleAPIError'

export interface RiotAccount {
  puuid: string
  gameName: string
  tagLine: string
}

export default async function apiGetRiotAccount(gameName: string, tagLine: string) {
  try {
    const { data } = await riotAsiaApi.get<RiotAccount>(`/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}`)

    return data
  } catch {
    handleAPIError({
      title: '소환사 정보 오류',
      description: '소환사 정보를 가져오는 데 실패했습니다. 잠시 후 다시 시도해주세요.',
    })
  }
}