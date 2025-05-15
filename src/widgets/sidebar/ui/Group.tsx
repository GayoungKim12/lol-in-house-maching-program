import { MenuItem } from '@/widgets/sidebar/types/menuItems.types'
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from '@/shared/components/ui/sidebar'
import { Icon } from '@/shared/components/icon'
import { Link } from 'react-router-dom'
import { Collapsible } from '@/shared/components/ui/collapsible'
import { CollapsibleContent, CollapsibleTrigger } from '@radix-ui/react-collapsible'

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
            <Collapsible key={menuItem.label} defaultOpen className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton asChild>
                    <Link to={menuItem.to}>
                      <Icon name={menuItem.icon} strokeWidth={2} />
                      {menuItem.label}
                    </Link>
                  </SidebarMenuButton>
                </CollapsibleTrigger>
              </SidebarMenuItem>
              {menuItem.subItems && (
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {menuItem.subItems.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.to}>
                        <Link to={subItem.to}>
                          {subItem.label}
                        </Link>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              )}
            </Collapsible>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}