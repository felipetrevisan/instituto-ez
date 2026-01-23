'use client'

import { cn } from '@ez/shared/lib/utils'
import { Magnetic } from '@ez/shared/ui/animated/effects/magnetic'
import { CountingNumber } from '@ez/shared/ui/animated/text/counter'
import { HighlightText } from '@ez/shared/ui/animated/text/highlight'
import { Card, CardContent } from '@ez/shared/ui/card'
import { urlForImage } from '@ez/web/config/image'
import type { Ebook, Media } from '@ez/web/types/ebook'
import { DynamicIcon } from 'lucide-react/dynamic'
import Image from 'next/image'
import { useLocale } from 'next-intl'

export function Metadata({ data }: { data: Ebook }) {
  const { metadata } = data
  const locale = useLocale()

  const getIcon = (media: Media) => {
    const Icon =
      media.type === 'icon' && media.icon ? <DynamicIcon name={media.icon} size={24} /> : null

    const ImageComponent =
      media.type === 'image' && media.image ? (
        <Image
          alt=""
          height={24}
          src={urlForImage(media.image.asset).width(24).height(24).format('webp').quality(80).url()}
          width={24}
        />
      ) : null

    return Icon ?? ImageComponent
  }

  return (
    <div>
      {metadata?.length > 0 && (
        <section className="grid grid-cols-2 gap-x-2 gap-y-10 bg-white py-12 md:container md:gap-10 md:px-6 md:[grid-template-columns:repeat(auto-fit,minmax(200px,1fr))]">
          {metadata?.map((meta) => (
            <Magnetic key={`metadata_${meta._key}`} strength={0.25}>
              <Card
                className={cn(
                  'hover:-translate-y-1 h-[180px] w-[200px] bg-gradient-to-br from-[var(--primary)]/40 to-[var(--secondary)]/40 p-0.5 shadow-[var(--primary)]/50 shadow-sm outline-none backdrop-blur-md transition-all duration-300 hover:shadow-xl',
                )}
                rounded="2xl"
                theme="custom"
                variant="custom"
              >
                <CardContent className="relative flex h-full items-center justify-center rounded-3xl bg-white px-6 py-0">
                  <div className="flex flex-col items-center justify-center">
                    {meta.media.type !== 'none' && (
                      <div className="-top-7 absolute order-1 size-14 rounded-full bg-white shadow-md [&_svg]:size-8">
                        <div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 stroke-[1.5] text-[var(--primary)]">
                          {getIcon(meta.media)}
                        </div>
                      </div>
                    )}
                    <div className="flex flex-col">
                      <dt className="mb-2 flex min-h-[72px] flex-col items-center justify-center gap-2">
                        {meta.prefix?.[locale] && (
                          <span className="font-medium text-[var(--primary)] text-sm opacity-70">
                            {meta.prefix?.[locale]}
                          </span>
                        )}
                        {meta.type === 'string' && (
                          <HighlightText
                            className="from-[var(--primary)] to-[var(--secondary)] text-center font-bold text-3xl text-white"
                            text={meta.text?.[locale] || '-'}
                          />
                        )}
                        {meta.type === 'number' && Number(meta.value) > 0 && (
                          <span className="font-bold text-3xl text-[var(--primary)]">
                            <CountingNumber decimalSeparator="," inView number={meta.value ?? 0} />
                          </span>
                        )}
                        {meta.suffix?.[locale] && (
                          <span className="font-medium text-[var(--primary)] text-sm opacity-70">
                            {meta.suffix?.[locale]}
                          </span>
                        )}
                      </dt>
                      <dd className="text-center font-bold text-[var(--primary)]">
                        {meta.title?.[locale]}
                      </dd>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Magnetic>
          ))}
        </section>
      )}
    </div>
  )
}
