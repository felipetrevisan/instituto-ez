'use client'

import type { MasterclassHero } from '@ez/web/types/masterclass'
import { createPortableComponents } from '@ez/web/utils/create-portable-components'
import { PortableText } from '@portabletext/react'
import { Play } from 'lucide-react'
import { motion } from 'motion/react'

export function Hero({ data }: { data: MasterclassHero }) {
  const heading = data?.heading
  const badge = data?.badge
  const videoUrl = data?.video?.url
  const videoCaption = data?.video?.caption
  const videoDuration = data?.video?.duration

  return (
    <section className="relative min-h-screen w-screen overflow-hidden bg-gradient-to-b from-background via-background to-section-dark">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-section-dark" />
        <div className="-translate-x-1/2 -translate-y-1/2 pointer-events-none absolute top-1/2 left-1/2 size-[800px] rounded-full bg-primary/10 blur-[180px]" />
        <div className="pointer-events-none absolute bottom-0 left-1/3 size-[600px] rounded-full bg-primary/10 blur-[150px]" />
      </div>

      <div className="container relative z-10 pt-16 pb-20 md:pt-24 md:pb-28">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-4xl text-center"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          {badge && (
            <span className="mt-10 mb-6 inline-block rounded-full bg-primary/10 px-4 py-1.5 font-medium text-primary text-sm">
              {badge}
            </span>
          )}
          {heading && (
            <h1 className="mb-6 text-balance font-bold text-4xl md:text-5xl lg:text-6xl">
              <PortableText components={createPortableComponents()} value={heading} />
            </h1>
          )}
        </motion.div>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto mt-12 max-w-4xl md:mt-16"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-border/50 bg-card shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              {videoUrl ? (
                <a
                  className="group relative flex size-20 items-center justify-center rounded-full bg-primary shadow-button transition-transform hover:scale-105 md:size-24"
                  href={videoUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  <Play className="ml-1 size-8 text-primary-foreground md:size-10" />
                  <span className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
                </a>
              ) : (
                <div className="group relative flex size-20 items-center justify-center rounded-full bg-primary shadow-button md:size-24">
                  <Play className="ml-1 size-8 text-primary-foreground md:size-10" />
                </div>
              )}
            </div>
            {(videoCaption || videoDuration) && (
              <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-foreground/80 to-transparent p-4 md:p-6">
                <div className="flex items-center justify-between text-card text-sm md:text-base">
                  <p className="font-medium">{videoCaption}</p>
                  {videoDuration && (
                    <span className="rounded bg-background/60 px-2 py-1 text-muted-foreground text-xs">
                      {videoDuration}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
