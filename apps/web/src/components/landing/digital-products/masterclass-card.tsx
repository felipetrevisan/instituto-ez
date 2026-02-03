'use client'

import { Button } from '@ez/shared/ui'
import { urlForImage } from '@ez/web/config/image'
import type { Masterclass } from '@ez/web/types/masterclass'
import { Clock, Play, Users, Video } from 'lucide-react'
import { motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'

export const MasterclassCard = ({
  masterclass,
  index,
}: {
  masterclass: Masterclass
  index: number
}) => {
  const locale = useLocale()
  const t = useTranslations('DigitalProducts')
  const title = masterclass.card?.title?.[locale] ?? masterclass.title?.[locale]
  const description =
    masterclass.card?.description?.[locale] ?? masterclass.seo?.description?.[locale]
  const badge = masterclass.card?.badge?.[locale] ?? t('badgeVideoClass')
  const imageAsset = masterclass.card?.image?.asset
  const slug = masterclass.slug?.[locale]?.current
  const href = slug ? `/${locale}/masterclass/${slug}` : '#'
  const durationLabel = masterclass.duration
    ? t('durationContent', { duration: masterclass.duration })
    : null

  return (
    <motion.div
      className="group"
      initial={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <Link href={href}>
        <div className="group hover:-translate-y-2 relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 transition-all duration-300 hover:border-cyan/30">
          {/* Video Preview with Image */}
          <div className="relative aspect-video overflow-hidden">
            {imageAsset ? (
              <Image
                alt={title ?? ''}
                className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                fill
                src={urlForImage(imageAsset).auto('format').quality(80).url()}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                <Video className="size-20 text-gray-400" />
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex size-16 items-center justify-center rounded-full border-2 border-cyan bg-cyan/20 transition-all duration-300 group-hover:scale-110 group-hover:bg-cyan/30">
                <Play className="ml-1 size-6 text-cyan" />
              </div>
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute top-4 left-4 rounded-full bg-purple-500/90 px-3 py-1 font-semibold text-white text-xs">
                {badge}
              </div>
            </div>
          </div>

          <div className="flex h-[180px] flex-col p-6">
            {description && <p className="mb-4 flex-grow text-gray-300 text-sm">{description}</p>}

            {durationLabel && (
              <div className="mb-4 flex items-center gap-4 text-gray-500 text-xs">
                <span className="flex items-center gap-1">
                  <Clock className="size-3.5" />
                  {durationLabel}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="size-3.5" />
                  {t('lifetimeAccess')}
                </span>
              </div>
            )}

            <Button
              base="ebook"
              className="w-full border-cyan/30 text-cyan hover:bg-cyan/10"
              rounded="full"
              size="sm"
              theme="catalog"
              variant="outline"
            >
              {t('learnMoreMasterclass')}
            </Button>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
