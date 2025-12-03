'use client'

import { useDeviceType } from '@ez/shared/hooks/use-media-query'
import { cn } from '@ez/shared/lib/utils'
import { createPortableComponents } from '@ez/shared/sanity/portable'
import { urlForImage } from '@ez/web/config/image'
import type { Author } from '@ez/web/types/ebook'
import { PortableText } from '@portabletext/react'
import { motion } from 'motion/react'
import Image from 'next/image'
import { useLocale } from 'next-intl'

type Props = {
  index: number
  author: Author
}

export function AuthorCard({ author: { photo, name, content }, index }: Props) {
  const locale = useLocale()
  const { isMobile } = useDeviceType()
  const isEven = index % 2 === 0

  const flipPhoto = (flip: boolean) => {
    const image = photo?.asset ? urlForImage(photo?.asset).format('webp').quality(80) : null

    if (isMobile) return image

    return image ? (flip ? image.flipHorizontal() : image) : null
  }

  const photoAuthor = flipPhoto(!isEven)

  return (
    <section
      className={cn(
        'relative mt-80 flex w-full flex-col justify-start p-1 md:mt-20 md:flex-row md:p-0',
      )}
    >
      <div className="relative flex max-w-4xl items-center gap-6 rounded-3xl border border-[var(--tertiary-c)] bg-white p-6 shadow-[5px_5px_0_0_color-mix(in_srgb,_var(--tertiary-c)_50%,_transparent)]">
        <div
          className={cn(
            '-top-[200px] -translate-x-1/2 absolute left-1/2 h-80 w-80 flex-shrink-0 overflow-visible rounded-full bg-gradient-to-br from-white to-white/50 shadow-[5px_5px_0_0_color-mix(in_srgb,_var(--tertiary-c)_50%,_transparent)] backdrop-blur-2xl md:top-0 md:left-0 md:translate-x-0 md:rounded-none md:bg-none md:shadow-none md:backdrop-blur-none',
            {
              'md:-left-[130px] md:right-0': isEven,
              'md:right-[30px] md:left-auto': !isEven,
            },
          )}
        >
          {photoAuthor && (
            <motion.div
              animate={{ y: 0, scale: 1 }}
              className={cn(
                '-left-[10%] md:-top-[168px] -bottom-3 absolute h-120 translate-x-[7%] overflow-hidden md:w-120',
              )}
              initial={{ y: 20, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 100, damping: 10 }}
            >
              <Image
                alt={name}
                className="rounded-full object-cover"
                height={500}
                src={photoAuthor.url()}
                width={500}
              />
            </motion.div>
          )}
        </div>
        <div className="flex-1 text-justify text-[var(--tertiary-c)] text-sm leading-snug">
          <div
            className={cn('mt-[120px] md:mt-0', {
              'md:ml-[220px]': isEven,
              'md:mr-[220px]': !isEven,
            })}
          >
            <PortableText components={createPortableComponents()} value={content?.[locale]} />
          </div>
        </div>
      </div>
    </section>
  )
}
