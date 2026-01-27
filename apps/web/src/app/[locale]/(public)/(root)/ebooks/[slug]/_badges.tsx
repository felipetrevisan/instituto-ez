'use client'

import { BadgeButton } from '@ez/shared/ui/animated/badge'
import { BadgeStarButton } from '@ez/shared/ui/animated/badge-star'
import type { Badge, Ebook } from '@ez/web/types/ebook'
import { DynamicIcon } from 'lucide-react/dynamic'
import { motion } from 'motion/react'
import { useLocale } from 'next-intl'

export default function Badges({ data }: { data: Ebook }) {
  const { badges } = data
  const locale = useLocale()

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
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 20 }}
        transition={{ delay: index * 0.2, duration: 0.4, ease: 'easeOut' }}
      >
        {type === 'star' && <BadgeStarButton numberOfStars={value} />}
        {type === 'number' && value && (
          <BadgeButton
            formatted
            icon={Icon}
            prefix={prefix?.[locale] ?? undefined}
            suffix={suffix?.[locale] ?? undefined}
            value={value}
          />
        )}
        {type === 'string' && text?.[locale] && (
          <BadgeButton
            icon={Icon}
            prefix={prefix?.[locale] ?? undefined}
            suffix={suffix?.[locale] ?? undefined}
            value={text?.[locale]}
          />
        )}
      </motion.div>
    )
  }

  return (
    <div className="mt-4 mb-6 flex flex-row flex-wrap justify-center gap-4 md:justify-start">
      {badges.map((badge, i) => (
        <BadgeChip {...badge} index={i} key={badge._key} />
      ))}
    </div>
  )
}
