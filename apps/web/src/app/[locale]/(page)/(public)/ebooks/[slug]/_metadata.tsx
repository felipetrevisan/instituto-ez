import { FaIcons } from '@ez/shared/icons'
import { cn } from '@ez/shared/lib/utils'
import { CountingNumber } from '@ez/shared/ui/animated/counter'
import { Magnetic } from '@ez/shared/ui/animated/effects/magnetic'
import { RollingText } from '@ez/shared/ui/animated/text/rolling'
import { Card, CardContent } from '@ez/shared/ui/card'
import { urlForImage } from '@ez/web/config/image'
import type { Ebook, Media } from '@ez/web/types/ebook'
import Image from 'next/image'

export function Metadata({ data }: { data: Ebook }) {
  const { metadata, id } = data

  const getIcon = (media: Media) => {
    const IconComponent =
      media.type === 'icon' && media.icon?.name
        ? FaIcons[media.icon.name as keyof typeof FaIcons]
        : null

    const ImageComponent =
      media.type === 'image' && media.image ? (
        <Image
          src={urlForImage(media.image.asset).width(24).height(24).auto('format').quality(80).url()}
          alt=""
          width={24}
          height={24}
        />
      ) : null

    return IconComponent ? <IconComponent /> : ImageComponent
  }

  return (
    <>
      {metadata?.length > 0 && (
        <section className="container flex flex-wrap justify-center gap-10 bg-white px-6 py-12">
          {metadata?.map((meta, index) => (
            <Magnetic
              key={`${id}_${
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                index
              }`}
              strength={0.25}
            >
              <Card
                variant="custom"
                theme="custom"
                className={cn(
                  'hover:-translate-y-1 h-[180px] w-[200px] bg-gradient-to-br from-[var(--primary-c)]/40 to-[var(--secondary-c)]/40 p-0.5 shadow-[var(--primary-c)]/50 shadow-sm outline-none backdrop-blur-md transition-all duration-300 hover:shadow-xl',
                )}
                rounded="2xl"
              >
                <CardContent className="relative flex h-full items-center justify-center rounded-3xl bg-white px-6 py-0">
                  <div className="flex flex-col items-center justify-center">
                    {meta.media.type !== 'none' && (
                      <div className="-top-7 absolute order-1 size-14 rounded-full bg-white shadow-md [&_svg]:size-8">
                        <div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 stroke-[1.5] text-[var(--primary-c)]">
                          {getIcon(meta.media)}
                        </div>
                      </div>
                    )}
                    <div className="flex flex-col">
                      <dt className="mb-2 flex min-h-[72px] flex-col items-center justify-center gap-2">
                        {meta.prefix && (
                          <span className="font-medium text-[var(--primary-c)] text-sm opacity-70">
                            {meta.prefix}
                          </span>
                        )}
                        {meta.type === 'string' && (
                          <span className="font-bold text-3xl text-[var(--primary-c)]">
                            {meta.value}
                          </span>
                        )}
                        {meta.type === 'number' && Number(meta.value) > 0 && (
                          <span className="font-bold text-3xl text-[var(--primary-c)]">
                            <CountingNumber number={meta.value ?? 0} decimalSeparator="," inView />
                          </span>
                        )}
                        {meta.suffix && (
                          <span className="font-medium text-[var(--primary-c)] text-sm opacity-70">
                            {meta.suffix}
                          </span>
                        )}
                      </dt>
                      <dd className="text-center font-bold text-[var(--primary-c)]">
                        <RollingText text={meta.title} />
                      </dd>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Magnetic>
          ))}
        </section>
      )}
    </>
  )
}
