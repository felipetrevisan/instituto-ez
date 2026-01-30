'use client'

import { fixIconName } from '@ez/web/utils/fix-icon-name'
import { DynamicIcon, type IconName } from 'lucide-react/dynamic'
import { motion } from 'motion/react'

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
    <motion.span
      animate={{ opacity: 1, scale: 1 }}
      className="inline-flex"
      initial={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <DynamicIcon
        className={className}
        name={fixIconName(name) as IconName}
        strokeWidth={strokeWidth}
      />
    </motion.span>
  )
}
