import { RoleEnum, TeamEnum, TeamLineUps } from '@/shared/types/teamRole'

export default function changeLineUps(teamLineUps: TeamLineUps, fixedLines: RoleEnum[]) {
  const shuffleArray = (array: string[]) => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  const assignPlayersToRoles = (team: TeamEnum) => {
    const currentPlayers = teamLineUps[team].map(p => p.player)
    const movablePlayers = currentPlayers.filter((_, idx) => !fixedLines.includes(idx))

    // Shuffle only movable players
    const shuffledMovablePlayers = shuffleArray(movablePlayers)

    // Create final array with fixed players in their positions
    return currentPlayers.map((_, idx) => {
      if (fixedLines.includes(idx)) {
        // Keep fixed player at original position
        return {
          player: currentPlayers[idx],
          role: idx,
        }
      } else {
        // Assign shuffled player to non-fixed position
        const movableIdx = currentPlayers.slice(0, idx)
          .filter((_, i) => !fixedLines.includes(i)).length
        return {
          player: shuffledMovablePlayers[movableIdx],
          role: idx,
        }
      }
    })
  }

  return {
    [TeamEnum.BLUE]: assignPlayersToRoles(TeamEnum.BLUE),
    [TeamEnum.RED]: assignPlayersToRoles(TeamEnum.RED),
  }
}