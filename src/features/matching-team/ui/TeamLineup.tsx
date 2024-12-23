import { TeamRoles } from '@/shared/types/teamRole'

export default function TeamLineup({ teamRoles }: { teamRoles: TeamRoles }) {
  return (
    <div className="grid grid-cols-2 gap-8">
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-blue-600">Blue</h3>
        {teamRoles.team1.map((player, index) => (<div key={index} className="relative">
          <div className="p-2 bg-blue-100 rounded flex justify-between items-center">
            <span className="font-medium w-12">{player.role}</span>
            <span>{player.player}</span>
          </div>
        </div>))}
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-red-600">Red</h3>
        {teamRoles.team2.map((player, index) => (<div key={index} className="relative">
          <div className="p-2 bg-red-100 rounded flex justify-between items-center">
            <span className="font-medium w-12">{player.role}</span>
            <span>{player.player}</span>
          </div>
        </div>))}
      </div>
    </div>
  )
}