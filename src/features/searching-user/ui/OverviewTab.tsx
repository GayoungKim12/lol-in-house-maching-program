import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import StatsCard from '@/features/searching-user/ui/StatsCard'
import { TabsContent } from '@/shared/components/ui/tabs'
import {
  calculateAverageCSPerMin,
  calculateAverageGold,
  calculateAverageKDA,
  calculateAverageKillParticipation,
  calculateWinLossStats,
} from '@/features/searching-user/utils/calculateMatchStats'
import useGetRiotAccount from '@/features/searching-user/hooks/useGetRiotAccount'
import { MatchInfo } from '@/features/searching-user/utils/apiGetMatch'

interface OverviewTabProps {
  matches: MatchInfo[]
}

export default function OverviewTab({ matches }: OverviewTabProps) {
  const { data: riotAccount } = useGetRiotAccount()

  const winLossData = calculateWinLossStats(matches, riotAccount?.puuid ?? '')
  const averageKDA = calculateAverageKDA(matches, riotAccount?.puuid ?? '').toFixed(2)
  const averageCSPerMin = calculateAverageCSPerMin(matches, riotAccount?.puuid ?? '').toFixed(1)
  const averageKillParticipation = calculateAverageKillParticipation(matches, riotAccount?.puuid ?? '').toFixed(0)
  const averageGold = (calculateAverageGold(matches, riotAccount?.puuid ?? '') / 1000).toFixed(0)

  return (
    <TabsContent value="overview">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 승패 그래프 */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium mb-2">승/패 비율</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={winLossData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {winLossData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}게임`, '게임 수']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 매치 통계 요약 */}
        <div className="bg-gray-50 p-4 rounded-lg space-y-4">
          <h3 className="text-sm font-medium">통계 요약</h3>
          <div className="grid grid-cols-2 gap-3">
            <StatsCard title="평균 KDA" value={averageKDA} />
            <StatsCard title="평균 CS/분" value={averageCSPerMin} />
            <StatsCard title="평균 킬 관여" value={`${averageKillParticipation}%`} />
            <StatsCard title="평균 골드 획득" value={`${averageGold}K`} />
          </div>
        </div>
      </div>
    </TabsContent>
  )
}