import useGetMatchDetail from '@/features/match-detail/hooks/useGetMatchDetail'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { Skeleton } from '@/shared/components/ui/skeleton'
import { Badge } from '@/shared/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs'
import { Link } from 'react-router-dom'
import koreanDayjs from '@/shared/lib/config/koreanDayjs'
import { MatchInfo, Participant } from '@/features/searching-user/utils/apiGetMatch'

interface MatchDetailProps {
  matchId: string;
}

/**
 * 매치 상세 정보를 표시하는 컴포넌트
 */
export default function MatchDetail({ matchId }: MatchDetailProps) {
  const { data: match, isLoading, error } = useGetMatchDetail(matchId)

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-64" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-64 w-full" />
        </CardContent>
      </Card>
    )
  }

  if (error || !match) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">매치 정보 로딩 오류</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-red-500">매치 정보를 불러오는 중 오류가 발생했습니다. 다시 시도해주세요.</div>
        </CardContent>
      </Card>
    )
  }

  // 게임 시간 계산
  const gameDuration = {
    minutes: Math.floor(match.info.gameDuration / 60),
    seconds: match.info.gameDuration % 60,
  }

  // 게임 생성 시간
  const gameDate = koreanDayjs(match.info.gameCreation).format('YYYY년 MM월 DD일 HH:mm')

  // 블루팀과 레드팀 분리
  const blueTeam = match.info.participants.filter((p) => p.teamId === 100)
  const redTeam = match.info.participants.filter((p) => p.teamId === 200)

  // 팀별 킬 합계
  const blueTeamKills = blueTeam.reduce((sum, p) => sum + p.kills, 0)
  const redTeamKills = redTeam.reduce((sum, p) => sum + p.kills, 0)

  // 승리 팀 확인
  const blueTeamWin = blueTeam[0]?.win

  return (
    <Card className="w-full mb-8">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">매치 상세 정보</CardTitle>
          <div className="text-sm text-gray-500">{gameDate}</div>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          <Badge>{match.info.gameMode} 모드</Badge>
          <Badge variant="outline">
            {gameDuration.minutes}분 {gameDuration.seconds}초
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">개요</TabsTrigger>
            <TabsTrigger value="details">상세 정보</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="flex mb-4 text-center">
              <div className={`flex-1 p-2 rounded-l-lg ${blueTeamWin ? 'bg-blue-100' : 'bg-gray-100'}`}>
                <div className="text-lg font-bold">블루팀 {blueTeamWin ? '(승리)' : '(패배)'}</div>
                <div className="text-3xl font-bold my-2">{blueTeamKills}</div>
              </div>
              <div className="flex items-center px-4 bg-gray-200">
                <span className="text-xl font-bold">VS</span>
              </div>
              <div className={`flex-1 p-2 rounded-r-lg ${!blueTeamWin ? 'bg-red-100' : 'bg-gray-100'}`}>
                <div className="text-lg font-bold">레드팀 {!blueTeamWin ? '(승리)' : '(패배)'}</div>
                <div className="text-3xl font-bold my-2">{redTeamKills}</div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-4">
              {/* 블루팀 */}
              <div className="flex-1">
                <h3 className="font-bold text-blue-600 mb-2">블루팀</h3>
                <div className="space-y-2">
                  {blueTeam.map((player) => (
                    <PlayerRow key={player.puuid} player={player} />
                  ))}
                </div>
              </div>

              {/* 레드팀 */}
              <div className="flex-1">
                <h3 className="font-bold text-red-600 mb-2">레드팀</h3>
                <div className="space-y-2">
                  {redTeam.map((player) => (
                    <PlayerRow key={player.puuid} player={player} />
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="details">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* 블루팀 상세 */}
              <div className="flex-1">
                <h3 className="font-bold text-blue-600 mb-2">블루팀 상세 정보</h3>
                <div className="space-y-4">
                  {blueTeam.map((player) => (
                    <PlayerDetailCard key={player.puuid} player={player} />
                  ))}
                </div>
              </div>

              {/* 레드팀 상세 */}
              <div className="flex-1">
                <h3 className="font-bold text-red-600 mb-2">레드팀 상세 정보</h3>
                <div className="space-y-4">
                  {redTeam.map((player) => (
                    <PlayerDetailCard key={player.puuid} player={player} match={match} />
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

/**
 * 플레이어 간단 정보 행 컴포넌트
 */
function PlayerRow({ player }: { player: Participant }) {
  return (
    <Link to={`/user-search?username=${encodeURIComponent(player.summonerName)}`} className="block">
      <div className="flex items-center p-2 border rounded-md hover:bg-gray-50">
        <div className="relative mr-2">
          <img
            src={`${import.meta.env.VITE_DDRAGON_CHAMPION_URL}/${player.championName}.png`}
            alt={player.championName}
            className="w-10 h-10 rounded-full"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/Aatrox_0.jpg'
            }}
          />
          <Badge className="absolute -bottom-1 -right-1 text-xs">{player.champLevel}</Badge>
        </div>

        <div className="flex-1 ml-2">
          <div className="text-sm font-medium">{player.summonerName}</div>
          <div className="text-xs text-gray-500">
            {player.kills}/{player.deaths}/{player.assists}
          </div>
        </div>

        <div className="flex gap-1">
          {[player.item0, player.item1, player.item2]
            .filter((item) => item !== 0)
            .map((item, index) => (
              <img
                key={index}
                src={`${import.meta.env.VITE_DDRAGON_ITEM_URL}/${item}.png`}
                alt={`아이템 ${item}`}
                className="w-5 h-5 rounded"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none'
                }}
              />
            ))}
        </div>
      </div>
    </Link>
  )
}

/**
 * 플레이어 상세 정보 카드 컴포넌트
 */
function PlayerDetailCard({ player, match }: { player: Participant, match: MatchInfo }) {
  // KDA 계산
  const kda = player.deaths === 0 ? 'Perfect' : ((player.kills + player.assists) / player.deaths).toFixed(2)

  // CS 계산
  const totalCS = player.totalMinionsKilled + player.neutralMinionsKilled
  const gameMinutes = match.gameDuration / 60
  const csPerMin = (totalCS / gameMinutes).toFixed(1)

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center mb-3">
          <div className="relative mr-3">
            <img
              src={`${import.meta.env.VITE_DDRAGON_CHAMPION_URL}/${player.championName}.png`}
              alt={player.championName}
              className="w-14 h-14 rounded-full"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/Aatrox_0.jpg'
              }}
            />
            <Badge className="absolute -bottom-1 -right-1">{player.champLevel}</Badge>
          </div>

          <div>
            <div className="font-bold">{player.summonerName}</div>
            <div className="flex items-center mt-1">
              <span className="text-lg">{player.kills}</span>
              <span className="mx-1 text-gray-500">/</span>
              <span className="text-lg text-red-500">{player.deaths}</span>
              <span className="mx-1 text-gray-500">/</span>
              <span className="text-lg">{player.assists}</span>
              <Badge variant="outline" className="ml-2 text-xs">
                {kda} KDA
              </Badge>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm mb-3">
          <div>
            <div className="text-gray-500">CS</div>
            <div>
              {totalCS} ({csPerMin}/분)
            </div>
          </div>
          <div>
            <div className="text-gray-500">골드</div>
            <div>{(player.goldEarned / 1000).toFixed(1)}K</div>
          </div>
          <div>
            <div className="text-gray-500">딜량</div>
            <div>{(player.totalDamageDealtToChampions / 1000).toFixed(1)}K</div>
          </div>
        </div>

        <div>
          <div className="text-gray-500 text-sm mb-1">아이템</div>
          <div className="flex flex-wrap gap-1">
            {[player.item0, player.item1, player.item2, player.item3, player.item4, player.item5, player.item6]
              .filter((item) => item !== 0)
              .map((item, index) => (
                <img
                  key={index}
                  src={`${import.meta.env.VITE_DDRAGON_ITEM_URL}/${item}.png`}
                  alt={`아이템 ${item}`}
                  className="w-8 h-8 rounded"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none'
                  }}
                />
              ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
