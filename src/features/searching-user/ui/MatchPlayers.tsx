import { Team } from '@/shared/lib/config/gameOptions'
import { MatchInfo } from '@/features/searching-user/utils/apiGetMatch'
import getGameMode from '@/shared/lib/utils/getGameMode'

interface MatchPlayerProps {
  match: MatchInfo
}

export default function MatchPlayer({ match }: MatchPlayerProps) {
  const isArena = getGameMode(match.info.queueId) === '아레나'
  const blueTeam = match.info.participants.filter((p) => p.teamId === Team.BLUE)
  const redTeam = match.info.participants.filter((p) => p.teamId === Team.RED)

  const teams = [{
    label: '블루팀',
    players: !isArena ? blueTeam : match.info.participants.filter((_, index) => index < 5),
  }, {
    label: '레드팀',
    players: !isArena ? redTeam : match.info.participants.filter((_, index) => index >= 5 && index < 10),
  }]

  return (
    <div className="hidden md:flex ml-2">
      {teams.map(team => (
        <ul className="flex flex-col gap-0.5 mr-2" key={team.label}>
          {team.players.map(player => (
            <li className="flex w-32 text-xs truncate" key={player.puuid}>
              <div className="w-4 h-4 rounded-sm overflow-hidden mr-2">
                <img src={`${import.meta.env.VITE_RIOT_ICON_URL}/v1/champion-icons/${player.championId}.png`}
                     alt={player.championName} className="w-full h-full aspect-square scale-110" />
              </div>
              <span className="max-w-24 truncate">
                {player.riotIdGameName + '#' + player.riotIdTagline}
              </span>
            </li>
          ))}
        </ul>
      ))}
    </div>
  )
}