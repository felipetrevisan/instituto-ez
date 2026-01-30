'use client'

import { useDeviceType } from '@ez/shared/hooks/use-media-query'
import { ChevronLeftIcon, DownloadIcon } from '@ez/shared/icons'
import BlobButton from '@ez/shared/ui/animated/button/blob-button'
import { IconButton } from '@ez/shared/ui/animated/button/icon-button'
import { urlForImage } from '@ez/web/config/image'
import { useStickyBar } from '@ez/web/hooks/use-sticky-bar'
import type { Ebook } from '@ez/web/types/ebook'
import { getLocalizedLink } from '@ez/web/utils/get-localized-link'
import { AnimatePresence, motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { AnimatedButton } from './_button'

const DownloadIconMotion = motion(DownloadIcon)
const ChevronLeftIconMotion = motion(ChevronLeftIcon)

export default function StickyHeader({ title, image, download }: Ebook) {
  const locale = useLocale()
  const { isMobile } = useDeviceType()
  const showSticky = useStickyBar(500, 100)

  const t = useTranslations('Ebooks')

  return (
    <AnimatePresence>
      {showSticky && (
        <motion.div
          animate={{ y: 0, opacity: 1 }}
          className="fixed top-[env(safe-area-inset-top,0px)] right-0 left-0 z-50 flex items-center justify-between bg-white/90 p-4 shadow-md backdrop-blur-xl"
          exit={{ y: -80, opacity: 0 }}
          initial={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.3, type: 'spring', stiffness: 300, damping: 20 }}
        >
          <div className="flex w-full items-center justify-between gap-5 md:container">
            <Link className="h-full md:w-[10vw]" href={getLocalizedLink(locale, '/ebooks')}>
              {!isMobile ? (
                <AnimatedButton
                  animateMaps={{
                    width: { initial: 48, hovered: 260 },
                    paddingLeft: { initial: 20, hovered: 16 },
                    scale: { initial: 1, hovered: 1.1 },
                  }}
                  className="fill-[var(--primary)] text-[var(--primary)]"
                  icon={<ChevronLeftIconMotion />}
                  label={t('backButton')}
                />
              ) : (
                <IconButton
                  className="bg-white fill-[var(--primary)] text-[var(--primary)]"
                  icon={ChevronLeftIcon}
                  theme="custom"
                />
              )}
            </Link>
            <div className="flex items-center justify-center md:max-w-[70vw]">
              {!isMobile && image?.[locale].large && (
                <div className="relative size-10">
                  <Image
                    alt={t('bookCoverAlt')}
                    className="object-cover"
                    fill
                    priority
                    src={urlForImage(image?.[locale].large.asset)
                      .width(64)
                      .height(64)
                      .format('webp')
                      .quality(80)
                      .url()}
                  />
                </div>
              )}
              <h1 className="text-center font-bold font-questrial text-[var(--primary)] text-xl">
                {title?.[locale]}
              </h1>
            </div>
            {!download?.disabled && (
              <Link href={download?.url?.[locale] ?? '/'} target="_blank">
                {!isMobile ? (
                  <BlobButton
                    className="w-full max-w-[250px]"
                    numOfBlobs={4}
                    rounded="2xl"
                    sticky
                    theme="custom"
                    variant="default"
                  >
                    <DownloadIconMotion /> {download?.label?.[locale]}
                  </BlobButton>
                ) : (
                  <IconButton
                    className="bg-white fill-[var(--primary)] text-[var(--primary)]"
                    icon={DownloadIcon}
                    theme="custom"
                  />
                )}
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
