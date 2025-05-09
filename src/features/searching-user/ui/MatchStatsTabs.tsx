import { Tabs, TabsList, TabsTrigger } from '@/shared/components/ui/tabs'
import { MatchInfo } from '@/features/searching-user/utils/apiGetMatch'
import OverViewTab from '@/features/searching-user/ui/OverviewTab'
import ChampionTab from '@/features/searching-user/ui/ChampionTab'
import TrendTab from '@/features/searching-user/ui/TrendTab'

interface MatchStatsTabsProps {
  matches: MatchInfo[]
}

export default function MatchStatsTabs({ matches }: MatchStatsTabsProps) {
  return (
    <Tabs defaultValue="overview">
      <TabsList className="mb-4">
        <TabsTrigger value="overview">개요</TabsTrigger>
        <TabsTrigger value="champions">챔피언</TabsTrigger>
        <TabsTrigger value="trends">추이</TabsTrigger>
      </TabsList>

      <OverViewTab matches={matches} />

      <ChampionTab matches={matches} />

      <TrendTab matches={matches} />
    </Tabs>
  )
}