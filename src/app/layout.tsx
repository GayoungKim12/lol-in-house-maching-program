import { Outlet } from 'react-router-dom'
import { SidebarProvider, SidebarTrigger } from '@/shared/components/ui/sidebar'
import AppSidebar from '@/widgets/sidebar/ui/AppSidebar'

export default function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  )
}