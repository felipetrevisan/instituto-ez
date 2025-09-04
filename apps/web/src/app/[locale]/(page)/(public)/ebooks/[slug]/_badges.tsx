'use client'

import { Badge } from '@ez/shared/types/ebook'
import { BadgeButton } from '@ez/shared/ui/animated/badge'
import { BadgeStarButton } from '@ez/shared/ui/animated/badge-star'
import type { Ebook } from '@ez/web/types/ebook'
import { motion } from 'motion/react'
import { DynamicIcon } from 'lucide-react/dynamic'

export default function Badges({ data }: { data: Ebook }) {
  const { badges } = data

  const BadgeChip = ({
    type,
    value,
    text,
    icon,
    prefix,
    suffix,
    index,
  }: Badge & { index: number }) => {
    const Icon = icon ? <DynamicIcon name={icon} size={24} /> : undefined

    return (
      <motion.div
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.2, duration: 0.4, ease: 'easeOut' }}
      >
        {type === 'star' && <BadgeStarButton numberOfStars={value} />}
        {type === 'number' && value && (
          <BadgeButton
            value={value}
            icon={Icon}
            prefix={prefix ?? undefined}
            suffix={suffix ?? undefined}
            formatted
          />
        )}
        {type === 'string' && text && (
          <BadgeButton
            value={text}
            icon={Icon}
            prefix={prefix ?? undefined}
            suffix={suffix ?? undefined}
          />
        )}
      </motion.div>
    )
  }

  return (
    <div className="mt-4 mb-6 flex flex-row gap-4">
      {badges.map((badge, i) => (
        <BadgeChip {...badge} index={i} key={i} />
      ))}
    </div>
  )
}
