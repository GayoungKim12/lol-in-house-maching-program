import handleAPIError from '@/shared/lib/utils/handleAPIError'
import axios from 'axios'

export interface Item {
  id: number
  name: string
  description: string
  active: boolean
  inStore: boolean
  from: number[]
  to: number[]
  categories: string[]
  maxStacks: number
  requiredChampion: string
  requiredAlly: string
  requiredBuffCurrencyName: string
  requiredBuffCurrencyCost: string
  specialRecipe: number
  isEnchantment: boolean
  price: number
  priceTotal: number
  displayInItemSets: boolean
  iconPath: string
}

export default async function apiGetItems() {
  try {
    const { data } = await axios(`${import.meta.env.VITE_RIOT_ICON_URL}/items.json`)

    return data as Item[]
  } catch {
    handleAPIError('NOT_FOUND_ITEM_INFO')
  }
}