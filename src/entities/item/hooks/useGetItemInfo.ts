import { useQuery } from '@tanstack/react-query'
import apiGetItems, { Item } from '@/entities/item/utils/apiGetItems'

export default function useGetItemInfo() {
  return useQuery({
    queryKey: ['itemInfo'],
    queryFn: async () => {
      const data = await apiGetItems()

      if (!data) return

      const mappedData = new Map<number, Item>([])
      for (const item of data) {
        mappedData.set(item.id, item)
      }

      return mappedData
    },
    placeholderData: undefined,
    enabled: true,
    staleTime: 1000 * 60 * 60 * 24,
  })
}