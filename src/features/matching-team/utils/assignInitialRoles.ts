import { TeamEnum } from '@/shared/types/teamRole'

export default function assignInitialRoles(blueTeamPlayers: string[], redTeamPlayers: string[]) {
  return {
    [TeamEnum.BLUE]: blueTeamPlayers.map((player: string, idx: number) => ({ player, role: idx })),
    [TeamEnum.RED]: redTeamPlayers.map((player: string, idx: number) => ({ player, role: idx })),
  }
}