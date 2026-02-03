'use client'

import { DownloadIcon } from '@ez/shared/icons'
import BlobButton from '@ez/shared/ui/animated/button/blob-button'
import { Title } from '@ez/shared/ui/title'
import { urlForImage } from '@ez/web/config/image'
import type { Ebook } from '@ez/web/types/ebook'
import { motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import PriceBubble from './_price-bubble'

const MotionTitle = motion(Title)
const DownloadIconMotion = motion(DownloadIcon)

export default function BuySection({ data }: { data: Ebook }) {
  const { download, price, image, theme } = data
  const locale = useLocale()

  const t = useTranslations('Ebooks')

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="grid h-full grid-cols-1 gap-8 lg:grid-cols-4">
        <div className="flex h-full w-full flex-col lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <MotionTitle
              className="relative text-center font-bold font-questrial text-[var(--primary)] lg:text-left"
              size="2xl"
            >
              {t('reserveYourEbook')}
            </MotionTitle>
          </motion.div>
          <div className="relative h-[300px] w-full md:w-[500px]">
            <Image
              alt=""
              className="object-contain"
              fill
              src={
                image?.[locale]?.footer?.asset
                  ? urlForImage(image?.[locale]?.footer.asset).format('webp').quality(80).url()
                  : '/assets/images/buy-ebook.png'
              }
            />
          </div>
          {!download?.disabled && download?.url?.[locale] && (
            <Link href={download?.url?.[locale] ?? '/'} rel="noopener noreferrer" target="_blank">
              <BlobButton
                fullWidth
                numOfBlobs={8}
                rounded="full"
                size="3xl"
                sticky
                theme="custom"
                variant="default"
              >
                <DownloadIconMotion /> {download?.label?.[locale]}
              </BlobButton>
            </Link>
          )}
        </div>
        <div className="flex h-full w-full justify-center gap-4 md:justify-end lg:col-span-2">
          <PriceBubble price={price} theme={theme} />
        </div>
      </div>
    </div>
  )
}
