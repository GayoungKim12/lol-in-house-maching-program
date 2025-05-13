import { gameModes } from '@/shared/lib/config/gameOptions'

export default function getGameMode(queueId: number) {
  if (queueId > 700 && queueId < 800) {
    return '특별 모드'
  }

  return gameModes.find(each => each.value === queueId)?.label || '특별 모드'
}