import { useEffect, useState } from 'react'
import usePairsStore from '@/features/matching-team/stores/usePairsStore'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/shared/components/ui/alert-dialog'

export default function LoadPlayerModal() {
  const { pairs, setPairs, resetPairs } = usePairsStore()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const savedPlayers = localStorage.getItem('players')

  useEffect(() => {
    if (!pairs) {
      if (savedPlayers) {
        setIsModalOpen(true)
      } else {
        resetPairs()
      }
    }
  }, [pairs, resetPairs, savedPlayers])

  const handleLoad = () => {
    if (savedPlayers) {
      setPairs(JSON.parse(savedPlayers))
    }
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    localStorage.removeItem('players')
    resetPairs()
    setIsModalOpen(false)
  }

  return (
    <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>이전 플레이어 데이터 발견</AlertDialogTitle>
          <AlertDialogDescription>
            저장된 플레이어 데이터를 불러오시겠습니까?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel}>아니오</AlertDialogCancel>
          <AlertDialogAction onClick={handleLoad}>불러오기</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}