import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { calculateChampionStats } from '@/features/searching-user/utils/calculateMatchStats'
import useGetRiotAccount from '@/features/searching-user/hooks/useGetRiotAccount'
import { TabsContent } from '@radix-ui/react-tabs'
import { MatchInfo } from '@/features/searching-user/utils/apiGetMatch'

interface ChampionTabProps {
  matches: MatchInfo[]
}

export default function ChampionTab({ matches }: ChampionTabProps) {
  const { data: riotAccount } = useGetRiotAccount()

  const championStats = calculateChampionStats(matches, riotAccount?.puuid ?? '')

  return (
    <TabsContent value="champions">
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-sm font-medium mb-2">챔피언별 승률</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={championStats} margin={{ top: 20, right: 30, left: 0, bottom: 50 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip
                formatter={(value, name) => {
                  if (name === '승률') return [`${value}%`, name]
                  return [value, name]
                }}
              />
              <Legend />
              <Bar dataKey="wins" stackId="a" name="승리" fill="#4f46e5" />
              <Bar dataKey="losses" stackId="a" name="패배" fill="#ef4444" />
              <Bar dataKey="winRate" name="승률" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </TabsContent>
  )
}