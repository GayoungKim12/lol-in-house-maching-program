import { Icon } from '@/shared/components/icon'
import { Button } from '@/shared/components/ui/button'

export default function TeamMatchingButton({ onClick }: { onClick: () => void }) {
  return (
    <Button onClick={onClick} className="w-40">
      <Icon name="Shuffle" className="mr-2 h-4 w-4" />
      팀 매칭하기
    </Button>
  )
}