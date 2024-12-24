import { useState } from 'react'
import { TeamEnum, TeamLineUps } from '@/shared/types/teamRole'
import usePairsStore from '@/features/matching-team/stores/usePairsStore'

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

  const matchTeams = (type: 'fixed' | 'random') => {
    const isAllFilled = pairs.every(pair => pair.player1.trim() !== '' && pair.player2.trim() !== '')

    if (!isAllFilled) {
      alert('모든 맞밸 플레이어를 입력해주세요!')
      return
    }

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

    if (type === 'random') {
      changeLines(assignInitialRoles(team1, team2))
    } else {
      setTeamRoles(assignInitialRoles(team1, team2))
    }
    setIsMatched(true)
  }

  const changeLines = (teamLineUps: TeamLineUps) => {
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

    setTeamRoles(newTeamRoles)
  }

  const resetAll = () => {
    setTeamLineUps({ [TeamEnum.BLUE]: [], [TeamEnum.RED]: [] })
    setIsMatched(false)
  }

  return { pairs, isMatched, teamLineUps, setTeamLineUps, handlePlayerChange, matchTeams, changeLines, resetAll }
}