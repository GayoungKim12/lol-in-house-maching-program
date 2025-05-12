import riotAsiaApi from '@/shared/lib/axios/riotAsiaApi'
import handleAPIError from '@/shared/lib/utils/handleAPIError'

/**
 * 소환사의 최근 매치 ID 목록을 가져오는 함수
 * @param puuid 소환사의 PUUID
 * @param start 가져올 매치 ID의 시작 인덱스 (기본값: 0)
 * @param count 가져올 매치 수 (기본값: 10)
 * @returns 매치 ID 배열
 */
export default async function apiGetMatchIds(puuid: string, start: number = 0, count: number = 10) {
  try {
    const { data } = await riotAsiaApi.get<string[]>(`/lol/match/v5/matches/by-puuid/${puuid}/ids`, {
      params: {
        start,
        count,
      },
    })
    return data
  } catch {
    handleAPIError('NOT_FOUND_MATCH_HISTORY')
  }
}
