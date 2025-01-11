import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from '@/shared/components/ui/sidebar'
import { menuItems } from '@/widgets/sidebar/config/menuItems'
import Group from '@/widgets/sidebar/ui/Group'

export default function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        {menuItems.map(({ subheading, menuItems }) => (
          <Group key={subheading} subheading={subheading} menuItems={menuItems} />
        ))}
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}