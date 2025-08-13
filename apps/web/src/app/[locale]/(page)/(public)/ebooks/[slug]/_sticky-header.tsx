import { ChevronLeftIcon, DownloadIcon } from '@ez/shared/icons'
import { LiquidButton } from '@ez/shared/ui/animated/button/liquid-button'
import { urlForImage } from '@ez/web/config/image'
import { useStickyBar } from '@ez/web/hooks/use-sticky-bar'
import type { Ebook } from '@ez/web/types/ebook'
import { getLocalizedLink } from '@ez/web/utils/get-localized-link'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatedButton } from './_button'

const DownloadIconMotion = motion(DownloadIcon)
const ChevronLeftIconMotion = motion(ChevronLeftIcon)

export default function StickyHeader({ title, image }: Ebook) {
  const showSticky = useStickyBar(400, 100)

  return (
    <AnimatePresence>
      {showSticky && (
        <motion.div
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.3, type: 'spring', stiffness: 300, damping: 20 }}
          className="fixed top-20 right-0 left-0 z-50 flex items-center justify-between bg-white p-4 shadow-md backdrop-blur-xl"
        >
          <div className="flex items-center justify-between gap-5">
            <Link href={getLocalizedLink('/ebooks')} className="w-[10vw]">
              <AnimatedButton
                label="Voltar para o Catálogo"
                icon={<ChevronLeftIconMotion />}
                animateMaps={{
                  width: { initial: 48, hovered: 260 },
                  paddingLeft: { initial: 20, hovered: 16 },
                  scale: { initial: 1, hovered: 1.1 },
                }}
                className="relative fill-[var(--primary-c)] text-[var(--primary-c)] after:absolute after:inset-0 after:animate-pulse after:rounded-xl after:bg-white/20"
              />
            </Link>
            <h1 className='font- relative flex w-[70vw] justify-center font-semibold text-2xl text-[var(--primary-c)]'>
              <Image
                src={urlForImage(image.large.asset).url()}
                alt="Book Cover"
                fill
                className="object-cover"
                priority
              />
              {title}
            </h1>
            <LiquidButton className="fill-[var(--primary-c)] text-[var(--primary-c)]">
              <DownloadIconMotion /> Baixe Agora
            </LiquidButton>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
