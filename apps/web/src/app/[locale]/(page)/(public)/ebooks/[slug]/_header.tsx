import { ChevronLeftIcon, DownloadIcon } from '@ez/shared/icons'
import { LiquidButton } from '@ez/shared/ui/animated/button/liquid-button'
import { TypingText } from '@ez/shared/ui/animated/text/typing'
import { urlForImage } from '@ez/web/config/image'
import type { Ebook } from '@ez/web/types/ebook'
import { getLocalizedLink } from '@ez/web/utils/get-localized-link'
import { motion } from 'motion/react'
import { useLocale } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatedButton } from './_button'
import StickyHeader from './_sticky-header'

const DownloadIconMotion = motion(DownloadIcon)
const ChevronLeftIconMotion = motion(ChevronLeftIcon)

export function Header({ data }: { data: Ebook }) {
  const locale = useLocale()
  const { title, description, image } = data

  return (
    <>
      <header className="relative flex w-screen flex-col items-center justify-center overflow-hidden bg-[auto,cover] bg-ebooks bg-gradient-to-br from-[var(--primary-c)]/90 to-[var(--secondary-c)]/90 px-6 py-12 text-white md:h-[600px]">
        <Link href={getLocalizedLink(locale, '/ebooks')} className="absolute top-4 right-4 w-full">
          <AnimatedButton
            label="Voltar para o Catálogo"
            icon={<ChevronLeftIconMotion />}
            animateMaps={{
              width: { initial: 48, hovered: 260 },
              paddingLeft: { initial: 20, hovered: 16 },
              scale: { initial: 1, hovered: 1.1 },
            }}
            className="mb-10 fill-[var(--primary-c)] text-[var(--primary-c)] after:absolute after:inset-0 after:animate-pulse after:rounded-xl after:bg-white/20 after:blur md:absolute md:mb-0"
          />
        </Link>
        <div className="container mx-auto flex flex-col items-center justify-between gap-10 md:flex-row">
          <motion.div
            className="relative z-10 flex min-h-[200px] max-w-xl flex-col"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <TypingText
              asChild="h1"
              text={title as string}
              className="mt-20 mb-6 font-extrabold text-3xl leading-tight drop-shadow-md md:text-4xl"
            />
            <div className="flex flex-col gap-4">
              <TypingText
                text={description as string}
                cursor
                duration={1.1}
                holdDelay={1}
                className="mb-6 max-w-prose font-semibold text-lg text-white/90 leading-relaxed md:text-justify"
              />
              <LiquidButton
                variant="outline"
                theme="custom"
                size="2xl"
                rounded="2xl"
                //className="fill-[var(--primary-c)] text-[var(--primary-c)]"
                className="w-full max-w-[250px]"
              >
                <DownloadIconMotion /> Baixe Agora
              </LiquidButton>
            </div>
          </motion.div>
          <motion.div
            className="relative z-10 mt-10 size-[550px] overflow-hidden rounded-xl md:mt-0"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Image
              src={urlForImage(image.large.asset).auto('format').quality(80).url()}
              alt="Book Cover"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 hidden w-full rotate-180 md:block">
          {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="relative block h-77 w-[calc(157%+1.3px)]"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="fill-white"
            />
          </svg>
        </div>
      </header>
      <StickyHeader {...data} />
    </>
  )
}
