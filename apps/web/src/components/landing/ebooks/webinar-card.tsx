'use client'

import { Button } from '@ez/shared/ui'
import { urlForImage } from '@ez/web/config/image'
import type { Ebook } from '@ez/web/types/ebook'
import { Clock, Play, Users, Video } from 'lucide-react'
import { motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import { useLocale } from 'next-intl'

export const WebinarCard = ({ ebook, index }: { ebook: Ebook; index: number }) => {
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
        <div className="group hover:-translate-y-2 relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 transition-all duration-300 hover:border-cyan/30">
          <div className="relative aspect-video overflow-hidden">
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
            <div className="absolute top-4 left-4 rounded-full bg-purple-500/90 px-3 py-1 font-semibold text-white text-xs">
              Vídeo Aula
            </div>
          </div>

          <div className="flex h-[180px] flex-col p-6">
            <p className="mb-4 flex-grow text-gray-300 text-sm">{ebook.description?.[locale]}</p>

            {/* Meta Info */}
            <div className="mb-4 flex items-center gap-4 text-gray-500 text-xs">
              <span className="flex items-center gap-1">
                <Clock className="size-3.5" />
                2h de conteúdo
              </span>
              <span className="flex items-center gap-1">
                <Users className="size-3.5" />
                Acesso vitalício
              </span>
            </div>

            <Button className="w-full border-cyan/30 text-cyan hover:bg-cyan/10" variant="outline">
              Saber mais
            </Button>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
