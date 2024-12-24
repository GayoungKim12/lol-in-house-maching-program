import { TeamEnum, TeamLineUps } from '@/shared/types/teamRole'

export default function changeLineUps(teamLineUps: TeamLineUps) {
  // 각 팀의 플레이어를 무작위로 섞기
  const shuffleArray = (array: string[]) => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  // 각 팀의 현재 플레이어들을 가져와서 섞기
  const shuffledBlueTeamPlayers = shuffleArray(teamLineUps[TeamEnum.BLUE].map(p => p.player))
  const shuffledRedTeamPlayers = shuffleArray(teamLineUps[TeamEnum.RED].map(p => p.player))

  // 섞인 플레이어들에게 라인 할당
  return {
    [TeamEnum.BLUE]: shuffledBlueTeamPlayers.map((player, idx) => ({ player, role: idx })),
    [TeamEnum.RED]: shuffledRedTeamPlayers.map((player, idx) => ({ player, role: idx })),
  }
}