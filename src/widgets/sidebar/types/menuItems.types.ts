import { IconName } from '@/shared/components/icon'

export type MenuItem = {
  icon: IconName
  label: string
  to: string
  subItems?: {
    label: string
    to: string
  }[]
}

export type Sidebar = {
  subheading: string
  menuItems: MenuItem[]
}

