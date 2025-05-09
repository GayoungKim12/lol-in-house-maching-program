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
    handleAPIError('NOT_FOUND_SUMMONER')
  }
}