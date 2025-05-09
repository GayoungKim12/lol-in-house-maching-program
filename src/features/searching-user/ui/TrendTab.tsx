import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { TabsContent } from '@/shared/components/ui/tabs'
import { calculateCSTrend, calculateKDATrend } from '@/features/searching-user/utils/calculateMatchStats'
import useGetRiotAccount from '@/features/searching-user/hooks/useGetRiotAccount'
import { MatchInfo } from '@/features/searching-user/utils/apiGetMatch'

interface TrendTabProps {
  matches: MatchInfo[]
}

export default function TrendTab({ matches }: TrendTabProps) {
  const { data: riotAccount } = useGetRiotAccount()

  const kdaTrendData = calculateKDATrend(matches, riotAccount?.puuid ?? '')
  const csTrendData = calculateCSTrend(matches, riotAccount?.puuid ?? '')

  return (
    <TabsContent value="trends">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* KDA 추이 */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium mb-2">KDA 추이</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={kdaTrendData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="game" />
                <YAxis yAxisId="left" orientation="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="kills" name="킬" fill="#4f46e5" />
                <Bar yAxisId="left" dataKey="deaths" name="데스" fill="#ef4444" />
                <Bar yAxisId="left" dataKey="assists" name="어시스트" fill="#10b981" />
                <Bar yAxisId="right" dataKey="kda" name="KDA" fill="#f59e0b" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CS 추이 */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium mb-2">CS 추이</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={csTrendData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="game" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="totalCS" name="총 CS" fill="#4f46e5" />
                <Bar dataKey="csPerMin" name="분당 CS" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </TabsContent>
  )
}