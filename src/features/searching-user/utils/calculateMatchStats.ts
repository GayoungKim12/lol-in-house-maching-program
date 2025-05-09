import { MatchInfo } from '@/features/searching-user/utils/apiGetMatch'

// 승패 통계 계산
export function calculateWinLossStats(matches: MatchInfo[], puuid: string) {
  const wins = matches.filter((match) => {
    const player = match.info.participants.find((p) => p.puuid === puuid)
    return player?.win
  }).length

  const losses = matches.length - wins

  return [
    { name: '승리', value: wins, color: '#4f46e5' },
    { name: '패배', value: losses, color: '#ef4444' },
  ]
}

// 챔피언별 통계 계산
export function calculateChampionStats(matches: MatchInfo[], puuid: string) {
  const champStats: { [key: string]: { wins: number; losses: number; games: number } } = {}

  matches.forEach((match) => {
    const player = match.info.participants.find((p) => p.puuid === puuid)
    if (!player) return

    const champName = player.championName

    if (!champStats[champName]) {
      champStats[champName] = { wins: 0, losses: 0, games: 0 }
    }

    champStats[champName].games += 1

    if (player.win) {
      champStats[champName].wins += 1
    } else {
      champStats[champName].losses += 1
    }
  })

  // 결과를 배열로 변환하고 승률 계산
  return Object.entries(champStats)
    .map(([name, stats]) => ({
      name,
      wins: stats.wins,
      losses: stats.losses,
      winRate: Math.round((stats.wins / stats.games) * 100),
    }))
    .sort((a, b) => b.wins - a.wins) // 승리 수 기준으로 정렬
}

// KDA 추이 계산
export function calculateKDATrend(matches: MatchInfo[], puuid: string) {
  // 최근 5경기부터 보여주기 위해 역순으로 정렬
  return matches
    .slice(0, 5)
    .map((match, index) => {
      const player = match.info.participants.find((p) => p.puuid === puuid)
      if (!player) return null

      const kda = player.deaths === 0 ? player.kills + player.assists : parseFloat(((player.kills + player.assists) / player.deaths).toFixed(2))

      return {
        game: `게임 ${index + 1}`,
        kills: player.kills,
        deaths: player.deaths,
        assists: player.assists,
        kda,
      }
    })
    .filter(Boolean)
    .reverse() // 최근 게임이 오른쪽에 오도록 다시 뒤집기
}

// CS 추이 계산
export function calculateCSTrend(matches: MatchInfo[], puuid: string) {
  // 최근 5경기부터 보여주기 위해 역순으로 정렬
  return matches
    .slice(0, 5)
    .map((match, index) => {
      const player = match.info.participants.find((p) => p.puuid === puuid)
      if (!player) return null

      const totalCS = player.totalMinionsKilled + player.neutralMinionsKilled
      const gameMinutes = match.info.gameDuration / 60
      const csPerMin = parseFloat((totalCS / gameMinutes).toFixed(1))

      return {
        game: `게임 ${index + 1}`,
        totalCS,
        csPerMin,
      }
    })
    .filter(Boolean)
    .reverse() // 최근 게임이 오른쪽에 오도록 다시 뒤집기
}

// 평균 KDA 계산
export function calculateAverageKDA(matches: MatchInfo[], puuid: string) {
  let totalKDA = 0
  let validMatches = 0

  matches.forEach((match) => {
    const player = match.info.participants.find((p) => p.puuid === puuid)
    if (!player) return

    const kda = player.deaths === 0 ? player.kills + player.assists : (player.kills + player.assists) / player.deaths

    totalKDA += kda
    validMatches++
  })

  return validMatches > 0 ? totalKDA / validMatches : 0
}

// 평균 CS/분 계산
export function calculateAverageCSPerMin(matches: MatchInfo[], puuid: string) {
  let totalCSPerMin = 0
  let validMatches = 0

  matches.forEach((match) => {
    const player = match.info.participants.find((p) => p.puuid === puuid)
    if (!player) return

    const totalCS = player.totalMinionsKilled + player.neutralMinionsKilled
    const gameMinutes = match.info.gameDuration / 60
    const csPerMin = totalCS / gameMinutes

    totalCSPerMin += csPerMin
    validMatches++
  })

  return validMatches > 0 ? totalCSPerMin / validMatches : 0
}

// 평균 킬 관여율 계산
export function calculateAverageKillParticipation(matches: MatchInfo[], puuid: string) {
  let totalKP = 0
  let validMatches = 0

  matches.forEach((match) => {
    const player = match.info.participants.find((p) => p.puuid === puuid)
    if (!player) return

    // 플레이어의 팀 구분
    const teamId = player.teamId

    // 팀의 총 킬 수 계산
    const teamKills = match.info.participants.filter((p) => p.teamId === teamId).reduce((sum, p) => sum + p.kills, 0)

    if (teamKills === 0) return // 팀 킬이 0인 경우 계산에서 제외

    // 킬 관여율 계산 (플레이어의 킬 + 어시스트) / 팀 전체 킬
    const killParticipation = ((player.kills + player.assists) / teamKills) * 100

    totalKP += killParticipation
    validMatches++
  })

  return validMatches > 0 ? totalKP / validMatches : 0
}

// 평균 골드 획득량 계산
export function calculateAverageGold(matches: MatchInfo[], puuid: string) {
  let totalGold = 0
  let validMatches = 0

  matches.forEach((match) => {
    const player = match.info.participants.find((p) => p.puuid === puuid)
    if (!player) return

    totalGold += player.goldEarned
    validMatches++
  })

  return validMatches > 0 ? totalGold / validMatches : 0
}

