import { Pair } from '@/shared/types/teamRole'

export default function matchTeam(pairs: Pair[]) {
  const blueTeam: string[] = []
  const redTeam: string[] = []

  pairs.forEach(pair => {
    if (Math.random() < 0.5) {
      blueTeam.push(pair.player1)
      redTeam.push(pair.player2)
    } else {
      blueTeam.push(pair.player2)
      redTeam.push(pair.player1)
    }
  })

  return { blueTeam, redTeam }
}

