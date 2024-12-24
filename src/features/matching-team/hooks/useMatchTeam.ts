import { useState } from 'react'
import { Pair, TeamEnum, TeamLineUps } from '@/shared/types/teamRole'
import usePairsStore from '@/features/matching-team/stores/usePairsStore'
import changeLines from '@/features/matching-team/utils/changeLines'

export default function useMatchTeam() {
  const { pairs, setPairs } = usePairsStore()
  const [isMatched, setIsMatched] = useState(false)
  const [teamLineUps, setTeamLineUps] = useState<TeamLineUps>({
    [TeamEnum.BLUE]: [], [TeamEnum.RED]: [],
  })

  const handlePlayerChange = (pairIndex: number, player: 'player1' | 'player2', value: string) => {
    const newPairs = [...pairs]
    newPairs[pairIndex][player] = value
    setPairs(newPairs)
  }

  const assignInitialRoles = (blueTeamPlayers: string[], redTeamPlayers: string[]) => {
    return {
      [TeamEnum.BLUE]: blueTeamPlayers.map((player: string, idx: number) => ({ player, role: idx })),
      [TeamEnum.RED]: redTeamPlayers.map((player: string, idx: number) => ({ player, role: idx })),
    }
  }

  const matchTeam = (pairs: Pair[]) => {
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

  const matchTeamLineUps = () => {
    const isAllFilled = pairs.every(pair => pair.player1.trim() !== '' && pair.player2.trim() !== '')

    if (!isAllFilled) {
      alert('모든 맞밸 플레이어를 입력해주세요!')
      return
    }

    const { blueTeam, redTeam } = matchTeam(pairs)

    setTeamLineUps(changeLines(assignInitialRoles(blueTeam, redTeam)))
    setIsMatched(true)
  }

  const resetAll = () => {
    setTeamLineUps({ [TeamEnum.BLUE]: [], [TeamEnum.RED]: [] })
    setIsMatched(false)
  }

  return { pairs, isMatched, teamLineUps, setTeamLineUps, handlePlayerChange, matchTeamLineUps, changeLines, resetAll }
}