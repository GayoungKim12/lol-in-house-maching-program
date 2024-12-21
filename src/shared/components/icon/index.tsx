import * as Icons from 'lucide-react'
import { LucideIcon } from 'lucide-react'
import { ComponentPropsWithoutRef } from 'react'

type IconName = keyof typeof Icons;

interface IconProps extends ComponentPropsWithoutRef<LucideIcon> {
  name: IconName;
}

function Icon({ name, ...props }: IconProps) {
  const IconComponent = Icons[name] as LucideIcon

  return <IconComponent {...props} />
}

export { Icon }
export type { IconName }