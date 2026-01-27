'use client'

import { cn } from '@ez/shared/lib/utils'
import { Button } from '@ez/shared/ui'
import { urlForImage } from '@ez/web/config/image'
import { type Ebook, isWebinar } from '@ez/web/types/ebook'
import { ArrowRight, BookOpen, Video } from 'lucide-react'
import { motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import { useLocale } from 'next-intl'

export const EbookCard = ({ ebook, index }: { ebook: Ebook; index: number }) => {
  const locale = useLocale()

  return (
    <motion.div
      className="group"
      initial={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <Link href={`/${locale}/ebooks/${ebook.slug?.[locale].current}`}>
        <div className="hover:-translate-y-2 relative overflow-hidden rounded-2xl border border-gray-200/50 bg-gradient-to-br shadow-md transition-all duration-300 hover:shadow-xl dark:border-background">
          <div className="absolute top-4 left-4 z-10">
            <span
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-semibold text-xs',
                {
                  'bg-purple-500/90 text-white': isWebinar(ebook),
                  'bg-navy/90 text-white dark:bg-accent': !isWebinar(ebook),
                },
              )}
            >
              {ebook.type === 'WEBINAR' ? (
                <Video className="size-3.5" />
              ) : (
                <BookOpen className="size-3.5" />
              )}
              {ebook.type === 'WEBINAR' ? 'Webinário' : 'eBook'}
            </span>
          </div>

          <div className="relative aspect-[3/4] overflow-hidden bg-white/50 dark:bg-background/50">
            {ebook.image?.[locale].large ? (
              <Image
                alt=""
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                fill
                src={urlForImage(ebook.image?.[locale].large.asset)
                  .auto('format')
                  .quality(80)
                  .url()}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-background dark:to-background/40">
                {isWebinar(ebook) ? (
                  <Video className="size-20 text-gray-400" />
                ) : (
                  <BookOpen className="size-20 text-gray-400" />
                )}
              </div>
            )}

            <div className="absolute inset-0 bg-navy/0 transition-all duration-300 group-hover:bg-navy/20" />
          </div>

          <div className="flex h-[240px] flex-col bg-white p-5 dark:bg-background/50">
            {ebook.description?.[locale] && (
              <p className="mb-4 line-clamp-3 flex-grow text-gray-600 text-sm">
                {ebook.description[locale]}
              </p>
            )}

            <Button
              base="ebook"
              className="group/btn w-full"
              rounded="full"
              theme="catalog"
              variant="ghost"
            >
              Saiba mais
              <ArrowRight className="size-4 transition-transform group-hover/btn:translate-x-1" />
            </Button>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
