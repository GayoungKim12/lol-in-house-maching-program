import { Icon } from '@/shared/components/icon'
import { Button } from '@/shared/components/ui/button'

export default function TeamMatchingButton({ onClick }: { onClick: () => void }) {
  return (
    <Button onClick={onClick} className="w-36">
      <Icon name="Shuffle" size={16} />
      팀 매칭하기
    </Button>
  )
}