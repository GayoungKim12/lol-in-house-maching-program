import { Badge } from '@/shared/components/ui/badge'
import calculateKDA from '@/shared/lib/utils/calculateKDA'
import calculateCSPerMinutes from '@/shared/lib/utils/calculateCSPerMinutes'
import formatSecondsToMinutes from '@/shared/lib/utils/formatSecondsToMinutes'
import { MatchInfo, Participant } from '@/features/searching-user/utils/apiGetMatch'
import { runes } from '@/shared/lib/config/runes'
import { summonerSpells } from '@/shared/lib/config/spells'
import getGameMode from '@/shared/lib/utils/getGameMode'

interface ChampionAndKDAProps {
  player: Participant
  match: MatchInfo
}

export default function ChampionAndKDA({ player, match }: ChampionAndKDAProps) {
  const totalCS = player.totalMinionsKilled + player.neutralMinionsKilled
  const playerRunes = player.perks.styles.map(({ description, selections, style }) => {
    return description === 'primaryStyle' ? [style, selections[0].perk] : [style]
  })
  const playerSpells = [player.summoner1Id, player.summoner2Id]
  const isArena = getGameMode(match.info.queueId) === '아레나'

  return (
    <div className="flex items-center">
      <div className="flex items-center mr-3 relative">
        <div className="relative flex items-center justify-center w-12 h-12 rounded-full overflow-hidden">
          <img src={`${import.meta.env.VITE_RIOT_ICON_URL}/v1/champion-icons/${player.championId}.png`}
               alt={player.championName} className="w-full h-full aspect-square scale-110" />
        </div>
        <span
          className="absolute -bottom-1 -right-1 text-xs bg-black text-white rounded-full p-1">{player.champLevel}</span>
      </div>

      {!isArena && (
        <>
          <div className="flex flex-col gap-0.5 mr-1">
            {playerSpells.map((spell, index) => {
              const foundSpell = summonerSpells.get(spell)

              return (
                <div key={index}
                     className="relative flex items-center justify-center w-6 h-6 rounded-sm overflow-hidden">
                  <img src={`${import.meta.env.VITE_RIOT_ICON_URL}/data/spells/icons2d/summoner${foundSpell?.slug}.png`}
                       alt={`${spell}`} className="w-full h-full aspect-square scale-110" />
                </div>
              )
            })}
          </div>

          <div className="flex flex-col gap-0.5 mr-2">
            {playerRunes.map(([rune, subRune], index) => {
              const foundRune = runes.find(each => each.value === rune)
              const foundSubRune = foundRune?.subRunes.find(each => each.value === subRune)
              const foundSubRuneSlug = (foundSubRune?.slug || '').toLocaleLowerCase()
              const src = index === 0 ? `${foundRune?.slug}/${foundSubRuneSlug}/${foundSubRuneSlug}` : `${foundRune?.imgValue}_${foundRune?.labelEn}`

              return (
                <div key={index}
                     className="relative flex items-center justify-center w-6 h-6 rounded-full overflow-hidden">
                  <img src={`${import.meta.env.VITE_RIOT_ICON_URL}/v1/perk-images/styles/${src}.png`}
                       alt={foundRune?.label || ''} className="w-full h-full aspect-square scale-110" />
                </div>
              )
            })}
          </div>
        </>
      )}


      <div className="flex flex-col justify-center flex-1">
        <div className="flex items-center mb-1">
          <span className="font-bold text-md">{player.kills}</span>
          <span className="mx-1 text-gray-500">/</span>
          <span className="font-bold text-md text-red-500">{player.deaths}</span>
          <span className="mx-1 text-gray-500">/</span>
          <span className="font-bold text-md">{player.assists}</span>
          <Badge variant="outline" className="ml-2">
            {calculateKDA(player.kills, player.assists, player.deaths)} KDA
          </Badge>
        </div>
        <div className="flex text-xs text-gray-500">
          <span>CS {totalCS} ({calculateCSPerMinutes(totalCS, match.info.gameDuration)}/분)</span>
          <span className="mx-2">•</span>
          <span>{formatSecondsToMinutes(match.info.gameDuration)}</span>
        </div>
      </div>
    </div>
  )
}