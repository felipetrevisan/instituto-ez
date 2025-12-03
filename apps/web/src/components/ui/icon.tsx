'use client'

import { fixIconName } from '@ez/web/utils/fix-icon-name'
import { DynamicIcon, type IconName } from 'lucide-react/dynamic'

export function Icon({
  className,
  strokeWidth,
  name,
}: {
  className?: string
  name: string
  strokeWidth?: number
}) {
  return (
    <DynamicIcon
      className={className}
      name={fixIconName(name) as IconName}
      strokeWidth={strokeWidth}
    />
  )
}
