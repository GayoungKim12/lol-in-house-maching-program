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
    handleAPIError('NOT_FOUND_SUMMONER')
  }
}