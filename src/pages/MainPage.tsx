import { Button } from '@/shared/components/ui/button'
import { Link } from 'react-router-dom'

export default function MainPage() {
  return (
    <div className="flex flex-col mt-36 items-center gap-10 w-full h-full p-10">
      <div className="flex flex-col justify-center items-center gap-6">
        <h2 className="font-bold text-6xl">Welcome! ●'◡'●</h2>
        <div className="flex flex-col justify-center items-center gap-3 font-medium text-xl flex-wrap">
          <p></p>
          <p>You can choose between Random Line and Fixed Line.</p>
        </div>
      </div>
      <div className="flex justify-center items-center gap-3">
        <Button variant="outline" asChild>
          <Link to={'/matching/random-line'}>라인 랜덤</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to={'/matching/fixed-line'}>라인 고정</Link>
        </Button>
      </div>
    </div>
  )
}