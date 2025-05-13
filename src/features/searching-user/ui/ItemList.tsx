import getItemNames from '@/features/searching-user/utils/getItemNames'
import useGetItemInfo from '@/entities/item/hooks/useGetItemInfo'
import { MatchInfo } from '@/features/searching-user/utils/apiGetMatch'

interface ItemListProps {
  player: Participant
  match: MatchInfo
}

export default function ItemList({ player, match }: ItemListProps) {
  const { data: itemInfo } = useGetItemInfo()

  return (
    <div className="flex flex-wrap gap-1 items-center justify-start mt-3 ml-1">
      {getItemNames(itemInfo ?? new Map([]), player).map((item, index) => {
        return item ? (
          <img key={`${match.metadata.matchId}-${item}`}
               src={`${import.meta.env.VITE_RIOT_ICON_URL}/assets/items/icons2d/${item}.png`}
               alt={`아이템 ${item}`}
               className="w-7 h-7 rounded" />
        ) : (
          <div key={index} className="w-7 h-7 rounded bg-gray-200" />
        )
      })}
    </div>
  )
}
