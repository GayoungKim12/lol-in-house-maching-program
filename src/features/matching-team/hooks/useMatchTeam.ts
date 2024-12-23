import { useState } from 'react'
import { RoleEnum, TeamRoles } from '@/shared/types/teamRole'
import usePairsStore from '@/features/matching-team/stores/usePairsStore'

export default function useMatchTeam() {
  const ROLES = Object.values(RoleEnum)
  const { pairs, setPairs } = usePairsStore()
  const [isMatched, setIsMatched] = useState(false)
  const [teamRoles, setTeamRoles] = useState<TeamRoles>({
    team1: [], team2: [],
  })

  const handlePlayerChange = (pairIndex: number, player: 'player1' | 'player2', value: string) => {
    const newPairs = [...pairs]
    newPairs[pairIndex][player] = value
    setPairs(newPairs)
  }

  const assignInitialRoles = (team1Players: string[], team2Players: string[]) => {
    return {
      team1: team1Players.map((player: string, idx: number) => ({
        player, role: ROLES[idx],
      })), team2: team2Players.map((player: string, idx: number) => ({
        player, role: ROLES[idx],
      })),
    }
  }

  const matchTeams = (type: 'fixed' | 'random') => {
    const isAllFilled = pairs.every(pair => pair.player1.trim() !== '' && pair.player2.trim() !== '')

    if (!isAllFilled) {
      alert('모든 맞밸 플레이어를 입력해주세요!')
      return
    }

    const team1: string[] = []
    const team2: string[] = []

    pairs.forEach(pair => {
      if (Math.random() < 0.5) {
        team1.push(pair.player1)
        team2.push(pair.player2)
      } else {
        team1.push(pair.player2)
        team2.push(pair.player1)
      }
    })

    if (type === 'random') {
      changeLines(assignInitialRoles(team1, team2))
    } else {
      setTeamRoles(assignInitialRoles(team1, team2))
    }
    setIsMatched(true)
  }

  const changeLines = (teamRoles: TeamRoles) => {
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
    const shuffledTeam1Players = shuffleArray(teamRoles.team1.map(p => p.player))
    const shuffledTeam2Players = shuffleArray(teamRoles.team2.map(p => p.player))

    // 섞인 플레이어들에게 라인 할당
    const newTeamRoles = {
      team1: shuffledTeam1Players.map((player, idx) => ({
        player, role: ROLES[idx],
      })), team2: shuffledTeam2Players.map((player, idx) => ({
        player, role: ROLES[idx],
      })),
    }

    setTeamRoles(newTeamRoles)
  }

  const resetAll = () => {
    setTeamRoles({ team1: [], team2: [] })
    setIsMatched(false)
  }

  return { pairs, isMatched, teamRoles, handlePlayerChange, matchTeams, changeLines, resetAll }
}