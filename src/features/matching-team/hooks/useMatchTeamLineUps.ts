import { useState } from 'react'
import { TeamEnum, TeamLineUps } from '@/shared/types/teamRole'
import usePairsStore from '@/features/matching-team/stores/usePairsStore'
import changeLineUps from '@/features/matching-team/utils/changeLineUps'
import matchTeams from '@/features/matching-team/utils/matchTeams'
import matchInitialLineUps from '@/features/matching-team/utils/matchInitialLineUps'
import useFixedLinesStore from '@/features/matching-team/stores/useFixedLinesStore'

export default function useMatchTeamLineUps() {
  const { pairs, setPairs, resetPairs } = usePairsStore()
  const { fixedLines } = useFixedLinesStore()

  const [isMatched, setIsMatched] = useState(false)
  const [teamLineUps, setTeamLineUps] = useState<TeamLineUps>({
    [TeamEnum.BLUE]: [], [TeamEnum.RED]: [],
  })

  const handlePlayerChange = (pairIndex: number, player: 'player1' | 'player2', value: string) => {
    if (!pairs) return
    
    const newPairs = [...pairs]
    newPairs[pairIndex][player] = value
    setPairs(newPairs)
  }

  const handleChangeLines = () => {
    setTeamLineUps(changeLineUps(teamLineUps, fixedLines))
  }

  const handleSwapTeams = () => {
    setTeamLineUps(prev => ({
      [TeamEnum.BLUE]: prev[TeamEnum.RED],
      [TeamEnum.RED]: prev[TeamEnum.BLUE],
    }))
  }

  const matchTeamLineUps = () => {
    if (!pairs) return

    const isAllFilled = pairs.every(pair => pair.player1.trim() !== '' && pair.player2.trim() !== '')

    if (!isAllFilled) {
      alert('모든 맞밸 플레이어를 입력해주세요!')
      return
    }

    const { blueTeam, redTeam } = matchTeams(pairs)

    setTeamLineUps(changeLineUps(matchInitialLineUps(blueTeam, redTeam), fixedLines))
    setIsMatched(true)
  }

  const resetAll = () => {
    resetPairs()
    setTeamLineUps({ [TeamEnum.BLUE]: [], [TeamEnum.RED]: [] })
    setIsMatched(false)
  }

  const resetTeams = () => {
    setTeamLineUps({ [TeamEnum.BLUE]: [], [TeamEnum.RED]: [] })
    setIsMatched(false)
  }

  return {
    isMatched,
    teamLineUps,
    handlePlayerChange,
    handleChangeLines,
    handleSwapTeams,
    matchTeamLineUps,
    resetAll,
    resetTeams,
  }
}