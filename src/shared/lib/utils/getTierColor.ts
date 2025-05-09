import { tiers } from '@/shared/lib/config/tiers'

export default function getTierColor(tier?: string) {
  return tier ? tiers[tier] || 'bg-gray-500' : 'bg-gray-500'
}