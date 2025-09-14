'use client'

import { useMediaQuery } from '@ez/shared/hooks/use-media-query'
import { ChevronLeftIcon, DownloadIcon } from '@ez/shared/icons'
import BlobButton from '@ez/shared/ui/animated/button/blob-button'
import { IconButton } from '@ez/shared/ui/animated/button/icon-button'
import { WritingText } from '@ez/shared/ui/animated/text/writting'
import { urlForImage } from '@ez/web/config/image'
import type { Ebook } from '@ez/web/types/ebook'
import { getLocalizedLink } from '@ez/web/utils/get-localized-link'
import { motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import Badges from './_badges'
import { AnimatedButton } from './_button'
import StickyHeader from './_sticky-header'

const DownloadIconMotion = motion(DownloadIcon)
const ChevronLeftIconMotion = motion(ChevronLeftIcon)

export function Header({ data }: { data: Ebook }) {
  const locale = useLocale()
  const isMobile = useMediaQuery()

  const t = useTranslations('Ebooks')

  const { title, description, image, download } = data

  return (
    <>
      <header className="relative flex w-screen flex-col items-center justify-center overflow-hidden bg-[auto,cover] bg-ebooks bg-gradient-to-br from-[var(--primary-c)] via-[var(--secondary-c)] to-[var(--tertiary-c)]/40 pb-12 text-white md:h-[700px] md:px-6 md:py-12">
        <Link className="container my-8 w-full" href={getLocalizedLink(locale, '/ebooks')}>
          {!isMobile ? (
            <AnimatedButton
              animateMaps={{
                width: { initial: 48, hovered: 260 },
                paddingLeft: { initial: 20, hovered: 16 },
                scale: { initial: 1, hovered: 1.1 },
              }}
              className="mb-10 fill-[var(--primary-c)] text-[var(--primary-c)] after:absolute after:inset-0 after:animate-pulse after:rounded-xl after:bg-white/20 after:blur md:absolute md:mb-0"
              icon={<ChevronLeftIconMotion />}
              label={t('backButton')}
            />
          ) : (
            <IconButton
              className="bg-white fill-[var(--primary-c)] text-[var(--primary-c)]"
              icon={ChevronLeftIcon}
              theme="custom"
            />
          )}
        </Link>
        <div className="container mx-auto flex flex-col items-center justify-between gap-10 md:flex-row">
          {isMobile && image?.[locale].large && (
            <motion.div
              animate={{ scale: 1, opacity: 1 }}
              className="relative z-10 mt-10 size-[400px] overflow-hidden rounded-xl md:mt-0 md:size-[400px]"
              initial={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Image
                alt="Book Cover"
                className="object-cover"
                fill
                priority
                src={urlForImage(image?.[locale].large.asset).format('webp').quality(80).url()}
              />
            </motion.div>
          )}
          <motion.div
            animate={{ opacity: 1, x: 0 }}
            className="relative z-10 flex min-h-[200px] max-w-xl flex-col"
            initial={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {isMobile ? (
              <h1 className="mt-10 text-center font-extrabold text-2xl leading-tight drop-shadow-md">
                {title?.[locale]}
              </h1>
            ) : (
              <WritingText
                asChild="h1"
                className="font-extrabold text-2xl leading-tight drop-shadow-md"
                text={title?.[locale] as string}
              />
            )}
            <Badges data={data} />
            <div className="flex flex-col">
              {isMobile ? (
                <span className="mb-6 max-w-prose text-justify font-semibold text-lg text-white/90 leading-relaxed">
                  {description?.[locale]}
                </span>
              ) : (
                <motion.h1
                  animate={{ opacity: 1, x: 0 }}
                  className="mb-6 max-w-prose text-justify font-semibold text-lg text-white/90 leading-relaxed"
                  initial={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  {description?.[locale]}
                </motion.h1>
              )}
              {!download?.disabled && (
                <Link href={download?.url ?? '/'} target="_blank">
                  <BlobButton
                    className="w-full md:w-max"
                    rounded="full"
                    size={isMobile ? 'xl' : '2xl'}
                    theme="custom"
                  >
                    <DownloadIconMotion /> {download?.label?.[locale]}
                  </BlobButton>
                </Link>
              )}
            </div>
          </motion.div>
          {!isMobile && image?.[locale].large && (
            <motion.div
              animate={{ scale: 1, opacity: 1 }}
              className="relative z-10 mt-10 size-[550px] overflow-hidden rounded-xl md:mt-0 md:size-[400px] lg:size-[600px]"
              initial={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Image
                alt="Book Cover"
                className="object-cover"
                fill
                priority
                src={urlForImage(image?.[locale].large.asset).format('webp').quality(80).url()}
              />
            </motion.div>
          )}
        </div>
        <div className="absolute bottom-0 left-0 hidden w-full rotate-180 md:block">
          {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
          <svg
            className="relative block h-77 w-[calc(157%+1.3px)]"
            preserveAspectRatio="none"
            viewBox="0 0 1200 120"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="fill-white"
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            />
          </svg>
        </div>
      </header>
      <StickyHeader {...data} />
    </>
  )
}
