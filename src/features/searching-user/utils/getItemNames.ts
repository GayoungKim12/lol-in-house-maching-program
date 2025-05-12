import { Item } from '@/entities/item/utils/apiGetItems'
import { Participant } from '@/features/searching-user/utils/apiGetMatch'

export default function getItemNames(itemInfo: Map<number, Item>, player: Participant) {
  const itemIds = [player.item0, player.item1, player.item2, player.item6, player.item3, player.item4, player.item5]

  return itemIds.map((itemId) => {
    const item = itemInfo.get(itemId)

    if (!item) return ''

    const itemPath = item.iconPath.split('/')
    const itemName = itemPath[itemPath.length - 1].split('.')[0]

    return itemName.toLowerCase()
  })
}