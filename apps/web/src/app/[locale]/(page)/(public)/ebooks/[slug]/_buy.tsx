'use client'

import { DownloadIcon } from '@ez/shared/icons'
import BlobButton from '@ez/shared/ui/animated/button/blob-button'
import { Title } from '@ez/shared/ui/title'
import { urlForImage } from '@ez/web/config/image'
import type { Ebook } from '@ez/web/types/ebook'
import { motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import PriceBubble from './_price-bubble'

const MotionTitle = motion(Title)

const DownloadIconMotion = motion(DownloadIcon)

export default function BuySection({ data }: { data: Ebook }) {
  const { download, price, image } = data

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="grid h-full grid-cols-1 gap-8 lg:grid-cols-4">
        <div className="flex h-full w-full flex-col lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <MotionTitle
              size="2xl"
              className="relative text-center font-bold font-questrial text-[var(--primary-c)] lg:text-left"
            >
              Garanta já seu eBook
            </MotionTitle>
          </motion.div>
          <div className="relative h-[300px] w-full md:w-[500px]">
            <Image
              src={
                image.footer?.asset
                  ? urlForImage(image.footer.asset).format('webp').quality(80).url()
                  : '/assets/images/buy-ebook.png'
              }
              fill
              alt=""
              className="object-contain"
            />
          </div>
          {!download?.disabled && (
            <Link href={download?.url ?? '/'} target="_blank">
              <BlobButton
                numOfBlobs={8}
                size="3xl"
                variant="default"
                theme="custom"
                rounded="full"
                fullWidth
                sticky
              >
                <DownloadIconMotion /> {download?.label || 'Baixe Agora'}
              </BlobButton>
            </Link>
          )}
        </div>
        <div className="flex h-full w-full justify-end gap-4 lg:col-span-2">
          <PriceBubble price={price} />
        </div>
      </div>
    </div>
  )
}
