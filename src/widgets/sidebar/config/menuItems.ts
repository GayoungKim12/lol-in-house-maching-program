import { Sidebar } from '@/widgets/sidebar/types/menuItems.types'

export const menuItems: Sidebar[] = [{
  subheading: 'LoL',
  menuItems: [{
    icon: 'Shuffle',
    label: 'Matching Team',
    to: '/matching-team',
  }, {
    icon: 'Search',
    label: 'Summoner',
    to: '/summoner/public',
    subItems: [{
      label: 'Public',
      to: '/summoner/public',
    }, {
      label: 'Custom',
      to: '/summoner/custom',
    }],
  }],
}]