import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <main className="w-full">
      <Outlet />
    </main>
  )
}