import { SidebarTrigger } from '@/shared/components/ui/sidebar'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="h-12 flex gap-4 items-center px-4">
      <SidebarTrigger />
      <h1 className="font-bold text-xl hover:opacity-60">
        <Link to="/">
          LoL Matching
        </Link>
      </h1>
    </header>
  )
}