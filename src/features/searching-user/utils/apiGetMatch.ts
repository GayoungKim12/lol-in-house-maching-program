import riotAsiaApi from '@/shared/lib/axios/riotAsiaApi'
import handleAPIError from '@/shared/lib/utils/handleAPIError'

// 매치 정보 타입 정의
export interface MatchInfo {
  info: {
    gameCreation: number;
    gameDuration: number;
    gameMode: string;
    participants: Array<{
      puuid: string;
      summonerName: string;
      championName: string;
      champLevel: number;
      kills: number;
      deaths: number;
      assists: number;
      win: boolean;
      teamId: number;
      item0: number;
      item1: number;
      item2: number;
      item3: number;
      item4: number;
      item5: number;
      item6: number;
      totalDamageDealtToChampions: number;
      goldEarned: number;
      totalMinionsKilled: number;
      neutralMinionsKilled: number;
    }>;
  };
  metadata: {
    matchId: string;
  };
}

/**
 * 매치 ID로 매치 상세 정보를 가져오는 함수
 * @param matchId 매치 ID
 * @returns 매치 상세 정보
 */
export default async function apiGetMatch(matchId: string) {
  try {
    const { data } = await riotAsiaApi.get<MatchInfo>(`/lol/match/v5/matches/${matchId}`)
    return data
  } catch {
    handleAPIError('NOT_FOUND_MATCH_HISTORY')
  }
}
