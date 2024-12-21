import { MenuItem } from '@/widgets/sidebar/types/menuItems.types'
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/shared/components/ui/sidebar'
import { Icon } from '@/shared/components/icon'
import { Link } from 'react-router-dom'

interface GroupProps {
  subheading: string;
  menuItems: MenuItem[];
}

export default function Group({ subheading, menuItems }: GroupProps) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{subheading}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {menuItems.map((menuItem: MenuItem) => (
            <SidebarMenuItem key={menuItem.to}>
              <SidebarMenuButton asChild>
                <Link to={menuItem.to}><Icon name={menuItem.icon} strokeWidth={2} />{menuItem.label}</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}