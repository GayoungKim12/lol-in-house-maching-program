import { Outlet } from 'react-router-dom'
import { SidebarProvider } from '@/shared/components/ui/sidebar'
import AppSidebar from '@/widgets/sidebar/ui/AppSidebar'
import Header from '@/widgets/header/ui/Header'

export default function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full">
        <Header />
        <main className="w-full h-full p-10">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  )
}