import handleAPIError from '@/shared/lib/utils/handleAPIError'
import riotKrApi from '@/shared/lib/axios/riotKrApi'

export interface Summoner {
  id: string
  accountId: string
  puuid: string
  profileIconId: number
  revisionDate: number
  summonerLevel: number
}

export default async function apiGetSummoner(puuid: string) {
  try {
    const { data } = await riotKrApi.get<Summoner>(`/lol/summoner/v4/summoners/by-puuid/${puuid}`)

    return data
  } catch {
    handleAPIError({
      title: '소환사 정보 오류',
      description: '소환사 정보를 가져오는 데 실패했습니다. 잠시 후 다시 시도해주세요.',
    })
  }
}