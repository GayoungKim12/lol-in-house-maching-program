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
    return handleAPIError({
      errorMessage: '소환사를 찾을 수 없습니다.',
      errorCode: 404,
    })
  }
}