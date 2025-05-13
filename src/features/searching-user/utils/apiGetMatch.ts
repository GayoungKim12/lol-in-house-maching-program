import riotAsiaApi from '@/shared/lib/axios/riotAsiaApi'
import handleAPIError from '@/shared/lib/utils/handleAPIError'

export interface Participant {
  PlayerScore0: number
  PlayerScore1: number
  PlayerScore2: number
  PlayerScore3: number
  PlayerScore4: number
  PlayerScore5: number
  PlayerScore6: number
  PlayerScore7: number
  PlayerScore8: number
  PlayerScore9: number
  PlayerScore10: number
  PlayerScore11: number
  allInPings: number
  assistMePings: number
  assists: number
  baronKills: number
  basicPings: number
  bountyLevel: number
  challenges: {
    [key: string]: number | number[] | undefined
    legendaryItemUsed?: number[]
  }
  champExperience: number
  champLevel: number
  championId: number
  championName: string
  championTransform: number
  commandPings: number
  consumablesPurchased: number
  damageDealtToBuildings: number
  damageDealtToObjectives: number
  damageDealtToTurrets: number
  damageSelfMitigated: number
  dangerPings: number
  deaths: number
  detectorWardsPlaced: number
  doubleKills: number
  dragonKills: number
  eligibleForProgression: boolean
  enemyMissingPings: number
  enemyVisionPings: number
  firstBloodAssist: boolean
  firstBloodKill: boolean
  firstTowerAssist: boolean
  firstTowerKill: boolean
  gameEndedInEarlySurrender: boolean
  gameEndedInSurrender: boolean
  getBackPings: number
  goldEarned: number
  goldSpent: number
  holdPings: number
  individualPosition: string
  inhibitorKills: number
  inhibitorTakedowns: number
  inhibitorsLost: number
  item0: number
  item1: number
  item2: number
  item3: number
  item4: number
  item5: number
  item6: number
  itemsPurchased: number
  killingSprees: number
  kills: number
  lane: string
  largestCriticalStrike: number
  largestKillingSpree: number
  largestMultiKill: number
  longestTimeSpentLiving: number
  magicDamageDealt: number
  magicDamageDealtToChampions: number
  magicDamageTaken: number
  missions: {
    [key: string]: number
  }
  needVisionPings: number
  neutralMinionsKilled: number
  nexusKills: number
  nexusLost: number
  nexusTakedowns: number
  objectivesStolen: number
  objectivesStolenAssists: number
  onMyWayPings: number
  participantId: number
  pentaKills: number
  perks: {
    statPerks: {
      defense: number
      flex: number
      offense: number
    }
    styles: Array<{
      description: string
      selections: Array<{
        perk: number
        var1: number
        var2: number
        var3: number
      }>
      style: number
    }>
  }
  physicalDamageDealt: number
  physicalDamageDealtToChampions: number
  physicalDamageTaken: number
  placement: number
  playerAugment1: number
  playerAugment2: number
  playerAugment3: number
  playerAugment4: number
  playerAugment5: number
  playerAugment6: number
  playerSubteamId: number
  profileIcon: number
  pushPings: number
  puuid: string
  quadraKills: number
  retreatPings: number
  riotIdGameName: string
  riotIdTagline: string
  role: string
  sightWardsBoughtInGame: number
  spell1Casts: number
  spell2Casts: number
  spell3Casts: number
  spell4Casts: number
  subteamPlacement: number
  summoner1Casts: number
  summoner1Id: number
  summoner2Casts: number
  summoner2Id: number
  summonerId: string
  summonerLevel: number
  summonerName: string
  teamEarlySurrendered: boolean
  teamId: number
  teamPosition: string
  timeCCingOthers: number
  timePlayed: number
  totalAllyJungleMinionsKilled: number
  totalDamageDealt: number
  totalDamageDealtToChampions: number
  totalDamageShieldedOnTeammates: number
  totalDamageTaken: number
  totalEnemyJungleMinionsKilled: number
  totalHeal: number
  totalHealsOnTeammates: number
  totalMinionsKilled: number
  totalTimeCCDealt: number
  totalTimeSpentDead: number
  totalUnitsHealed: number
  tripleKills: number
  trueDamageDealt: number
  trueDamageDealtToChampions: number
  trueDamageTaken: number
  turretKills: number
  turretTakedowns: number
  turretsLost: number
  unrealKills: number
  visionClearedPings: number
  visionScore: number
  visionWardsBoughtInGame: number
  wardsKilled: number
  wardsPlaced: number
  win: boolean
}

export interface MatchInfo {
  info: {
    queueId: number;
    gameCreation: number;
    gameDuration: number;
    gameMode: string;
    participants: Participant[];
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
