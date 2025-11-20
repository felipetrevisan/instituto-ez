'use client'

import { urlForImage } from '@ez/web/config/image'
import { useSite } from '@ez/web/hooks/use-site'
import Image from 'next/image'
import { useLocale } from 'next-intl'
import { Skeleton } from './skeleton'

export function About() {
  const { data, isLoading } = useSite()
  const locale = useLocale()

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="grid h-[900px] w-full grid-cols-1 gap-4 md:h-[500px] md:grid-cols-2 lg:h-[600px] lg:grid-cols-none lg:[grid-template-areas:'left_left_right_right'] xl:[grid-template-areas:'left_right_right_right']">
        {isLoading && <Skeleton className="lg:[grid-area:left]" />}
        {!isLoading && data && (
          <div className="relative w-full overflow-hidden rounded-2xl bg-[#fff4e5] lg:[grid-area:left]">
            <Image
              alt=""
              blurDataURL={data?.hero?.[0].background.metadata.lqip}
              className="h-full w-full overflow-hidden rounded-2xl object-cover"
              fill
              placeholder="blur"
              priority
              src={urlForImage(data.hero?.[0].background.asset).format('webp').quality(80).url()}
            />
          </div>
        )}
        {isLoading && <Skeleton className="lg:[grid-area:right]" />}
        {!isLoading && data && (
          <div className="relative w-full rounded-2xl lg:[grid-area:right]">
            <Image
              alt=""
              blurDataURL={data?.hero?.[1].background.metadata.lqip}
              className="h-full w-full overflow-hidden rounded-2xl object-cover"
              fill
              placeholder="blur"
              priority
              src={urlForImage(data.hero?.[1].background.asset).format('webp').quality(80).url()}
            />
            <div className="-top-16 absolute right-1/2 flex h-max max-h-full w-[320px] translate-x-1/2 flex-col gap-2 rounded-2xl border-4 border-secondary border-x-0 bg-white/80 p-8 text-secondary backdrop-blur-lg md:w-[280px] md:bg-white md:backdrop-blur-none lg:left-20 lg:translate-x-0 dark:bg-accent/80 dark:md:bg-accent">
              <h2 className="font-bold text-xl">{data.hero?.[1].title?.[locale]}</h2>
              <p className="font-light">{data.hero?.[1].description?.[locale]}</p>
            </div>
          </div>
        )}
      </div>
      <div className="mb-14 grid h-[900px] w-full grid-cols-1 gap-4 md:h-[500px] md:grid-cols-2 lg:h-[600px] lg:grid-cols-none lg:[grid-template-areas:'left_left_left_right_right_right']">
        {isLoading && <Skeleton className="lg:[grid-area:left]" />}
        {!isLoading && data && (
          <div className="relative w-full rounded-2xl lg:[grid-area:left]">
            <Image
              alt=""
              blurDataURL={data.hero?.[3].background.metadata.lqip}
              className="h-full w-full overflow-hidden rounded-2xl object-cover"
              fill
              placeholder="blur"
              priority
              src={urlForImage(data.hero?.[3].background.asset).format('webp').quality(80).url()}
            />
            <div className="md:-bottom-16 absolute right-1/2 bottom-12 flex h-max max-h-full w-[320px] translate-x-1/2 flex-col gap-2 rounded-2xl border-4 border-secondary border-x-0 bg-white/80 p-8 text-secondary backdrop-blur-lg md:w-[280px] md:bg-white md:backdrop-blur-none lg:right-10 lg:translate-x-0 xl:right-20 dark:bg-accent/80 dark:md:bg-accent">
              <h2 className="font-bold text-xl">{data?.hero?.[3].title?.[locale]}</h2>
              <p className="font-light">{data.hero?.[3].description?.[locale]}</p>
            </div>
          </div>
        )}
        {isLoading && <Skeleton className="lg:[grid-area:right]" />}
        {!isLoading && data && (
          <div className="relative w-full rounded-2xl lg:[grid-area:right]">
            <Image
              alt=""
              blurDataURL={data.hero?.[2].background.metadata.lqip}
              className="h-full w-full overflow-hidden rounded-2xl object-cover"
              fill
              placeholder="blur"
              priority
              src={urlForImage(data.hero?.[1].background.asset).format('webp').quality(80).url()}
            />
            <div className="md:-bottom-16 lg:-top-28 absolute right-1/2 bottom-12 flex h-max max-h-full w-[320px] translate-x-1/2 flex-col gap-2 rounded-2xl border-4 border-secondary border-x-0 bg-white/80 p-8 text-secondary backdrop-blur-lg md:w-[280px] md:bg-white md:backdrop-blur-none lg:right-[100px] lg:translate-x-0 xl:right-72 dark:bg-accent/80 dark:md:bg-accent">
              <h2 className="font-bold text-xl">{data?.hero?.[2].title?.[locale]}</h2>
              <p className="font-light">{data.hero?.[2].description?.[locale]}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
