import { Sidebar } from '@/widgets/sidebar/types/menuItems.types'

export const menuItems: Sidebar[] = [
  {
    subheading: 'MATCHING',
    menuItems: [{
      icon: 'Shuffle',
      label: 'Random',
      to: '/matching/random-line',
    }, {
      icon: 'Pin',
      label: 'Fixed',
      to: '/matching/fixed-line',
    }],

  },
]