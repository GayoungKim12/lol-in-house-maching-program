import { Button } from '@/shared/components/ui/button'
import { Link } from 'react-router-dom'
import { Icon } from '@/shared/components/icon'

export default function MainPage() {
  return (
    <div className="flex flex-col justify-center items-center gap-12 w-full h-full pb-32">
      <div className="flex flex-col justify-center items-center gap-6">
        <h2 className="font-bold text-7xl">Welcome! ●'◡'●</h2>
        <div className="flex flex-col justify-center items-center font-medium text-xl flex-wrap">
          <p>You can match teams to play a custom game of LoL with your friends</p>
        </div>
      </div>
      <div className="flex justify-center items-center gap-3">
        <Button size="lg" asChild>
          <Link to={'/matching-team'}>
            GET STARTED
            <Icon name="ChevronRight" />
          </Link>
        </Button>
      </div>
    </div>
  )
}