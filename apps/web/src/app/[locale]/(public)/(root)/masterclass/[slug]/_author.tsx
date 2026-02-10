'use client'

import { Icon } from '@ez/web/components/ui/icon'
import { urlForImage } from '@ez/web/config/image'
import type { MasterclassAuthor } from '@ez/web/types/masterclass'
import { createPortableComponents } from '@ez/web/utils/create-portable-components'
import { PortableText } from '@portabletext/react'
import { motion } from 'motion/react'
import Image from 'next/image'

export function Author({ data }: { data: MasterclassAuthor }) {
  const heading = data?.heading
  const author = data?.author
  const highlights = data?.highlights ?? []
  const image = author?.image?.asset
    ? urlForImage(author.image.asset).format('webp').quality(80)
    : null

  return (
    <section className="relative w-screen overflow-hidden bg-muted py-20 md:py-28">
      <div className="-translate-x-1/2 pointer-events-none absolute bottom-0 left-0 size-80 translate-y-1/2 rounded-full bg-vivid-amber/5 blur-3xl" />

      <div className="container relative z-10">
        <motion.div
          className="mx-auto mb-14 max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          {data?.badge && (
            <span className="mb-4 inline-block rounded-full border border-vivid-amber/20 bg-vivid-amber/10 px-4 py-1.5 font-semibold text-sm text-vivid-amber">
              {data.badge}
            </span>
          )}
          {heading && (
            <h2 className="text-balance font-bold text-3xl md:text-4xl">
              <PortableText components={createPortableComponents()} value={heading} />
            </h2>
          )}
        </motion.div>

        <div className="mx-auto max-w-4xl">
          <motion.div
            className="mb-10 grid items-center gap-8 md:grid-cols-[auto_1fr] md:gap-12"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <div className="flex flex-col items-center">
              <div className="size-52 overflow-hidden rounded-2xl border-2 border-vivid-amber/30 bg-gradient-to-br from-vivid-amber/20 to-primary/20 md:size-64">
                {image && (
                  <Image
                    alt={author?.name ?? 'Masterclass author'}
                    className="h-full w-full object-cover object-top"
                    height={512}
                    src={image.url()}
                    width={512}
                  />
                )}
              </div>
            </div>

            <div>
              {author?.name && <h3 className="font-bold text-foreground text-xl">{author.name}</h3>}
              {author?.role && <p className="mb-4 text-muted-foreground text-sm">{author.role}</p>}
              {author?.bio && (
                <p className="text-base text-muted-foreground leading-relaxed">{author.bio}</p>
              )}
            </div>
          </motion.div>

          {highlights.length > 0 && (
            <div className="grid gap-4 sm:grid-cols-2">
              {highlights.map((item, index) => (
                <motion.div
                  className="flex items-start gap-4 rounded-xl border border-vivid-amber/30 bg-card p-4"
                  initial={{ opacity: 0, y: 15 }}
                  key={`${item.label ?? 'highlight'}-${index}`}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  viewport={{ once: true }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  <div className="flex size-10 items-center justify-center self-center rounded-lg border border-vivid-amber/20 bg-vivid-amber/10">
                    {item.icon ? (
                      <Icon className="size-5 text-vivid-amber" name={item.icon} />
                    ) : (
                      <span className="size-2.5 rounded-full bg-vivid-amber" />
                    )}
                  </div>
                  <div>
                    {item.label && (
                      <p className="font-bold text-muted-foreground text-xs uppercase tracking-wide">
                        {item.label}
                      </p>
                    )}
                    {item.text && <p className="text-base text-muted-foreground">{item.text}</p>}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
