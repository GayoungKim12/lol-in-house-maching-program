import handleAPIError from '@/shared/lib/utils/handleAPIError'
import riotKrApi from '@/shared/lib/axios/riotKrApi'

interface LeagueEntry {
  leagueId: string
  queueType: string
  tier: string
  rank: string
  summonerId: string
  puuid: string
  leaguePoints: number
  wins: number
  losses: number
  veteran: boolean
  inactive: boolean
  freshBlood: boolean
  hotStreak: boolean
}

export default async function apiGetLeagueEntry(summonerId: string) {
  try {
    const { data } = await riotKrApi.get<LeagueEntry[]>(`/lol/league/v4/entries/by-summoner/${summonerId}`)

    return data
  } catch {
    handleAPIError({
      title: '소환사 정보 오류',
      description: '소환사 정보를 가져오는 데 실패했습니다. 잠시 후 다시 시도해주세요.',
    })
  }
}