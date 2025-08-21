import { ChevronLeftIcon, DownloadIcon } from '@ez/shared/icons'
import { IconButton } from '@ez/shared/ui/animated/button/icon-button'
import { LiquidButton } from '@ez/shared/ui/animated/button/liquid-button'
import { urlForImage } from '@ez/web/config/image'
import { useIsMobile } from '@ez/web/hooks/use-mobile'
import { useStickyBar } from '@ez/web/hooks/use-sticky-bar'
import type { Ebook } from '@ez/web/types/ebook'
import { getLocalizedLink } from '@ez/web/utils/get-localized-link'
import { AnimatePresence, motion } from 'motion/react'
import { useLocale } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatedButton } from './_button'

const DownloadIconMotion = motion(DownloadIcon)
const ChevronLeftIconMotion = motion(ChevronLeftIcon)

export default function StickyHeader({ title, image, download }: Ebook) {
  const locale = useLocale()
  const isMobile = useIsMobile(640)
  const showSticky = useStickyBar(500, 100)

  return (
    <AnimatePresence>
      {showSticky && (
        <motion.div
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.3, type: 'spring', stiffness: 300, damping: 20 }}
          className="fixed top-0 right-0 left-0 z-50 flex items-center justify-between bg-white/90 p-4 shadow-md backdrop-blur-xl"
        >
          <div className="flex w-full items-center justify-between gap-5 md:container">
            <Link href={getLocalizedLink(locale, '/ebooks')} className="h-full md:w-[10vw]">
              {!isMobile ? (
                <AnimatedButton
                  label="Voltar para o Catálogo"
                  icon={<ChevronLeftIconMotion />}
                  animateMaps={{
                    width: { initial: 48, hovered: 260 },
                    paddingLeft: { initial: 20, hovered: 16 },
                    scale: { initial: 1, hovered: 1.1 },
                  }}
                  className="fill-[var(--primary-c)] text-[var(--primary-c)]"
                />
              ) : (
                <IconButton
                  icon={ChevronLeftIcon}
                  theme="custom"
                  className="bg-white fill-[var(--primary-c)] text-[var(--primary-c)]"
                />
              )}
            </Link>
            <div className="flex items-center justify-center md:max-w-[70vw]">
              {!isMobile && (
                <div className="relative size-10">
                  <Image
                    src={urlForImage(image.large.asset)
                      .width(64)
                      .height(64)
                      .format('webp')
                      .quality(80)
                      .url()}
                    alt="Book Cover"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}
              <h1 className="font-bold font-questrial text-[var(--primary-c)] text-xl">{title}</h1>
            </div>
            {!download.disabled && (
              <Link href={download.url} target="_blank">
                {!isMobile ? (
                  <LiquidButton
                    variant="outline"
                    theme="custom"
                    rounded="2xl"
                    className="w-full max-w-[250px]"
                    sticky
                  >
                    <DownloadIconMotion /> {download.label || 'Baixe Agora'}
                  </LiquidButton>
                ) : (
                  <IconButton
                    icon={DownloadIcon}
                    theme="custom"
                    className="bg-white fill-[var(--primary-c)] text-[var(--primary-c)]"
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
