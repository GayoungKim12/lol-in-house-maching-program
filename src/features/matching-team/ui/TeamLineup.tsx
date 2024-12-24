import { RoleEnum, TeamEnum, TeamLineUps } from '@/shared/types/teamRole'

export default function TeamLineup({ teamLineUps }: { teamLineUps: TeamLineUps }) {
  return (
    <div className="grid grid-cols-2 gap-8">
      {Object.values(TeamEnum).map((team) => (
        <div key={team} className="space-y-2">
          <h3
            className={`text-lg font-bold ${team === TeamEnum.BLUE ? `text-blue-600` : `text-red-600`}`}>{team.toUpperCase()}</h3>
          {teamLineUps[team].map((player, index) => (<div key={index} className="relative">
            <div
              className={`p-2 rounded flex justify-between items-center ${team === TeamEnum.BLUE ? `bg-blue-100` : `bg-red-100`}`}>
              <span className="font-medium w-12">{RoleEnum[player.role]}</span>
              <span>{player.player}</span>
            </div>
          </div>))}
        </div>
      ))}
    </div>
  )
}