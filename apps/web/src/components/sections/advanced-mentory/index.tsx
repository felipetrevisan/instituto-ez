'use client'

import { getLink } from '@ez/shared/lib/utils'
import { createPortableComponents } from '@ez/shared/sanity/portable'
import { Skeleton } from '@ez/shared/ui'
import { Button } from '@ez/shared/ui/button'
import { ButtonLink } from '@ez/web/components/app'
import { urlForImage } from '@ez/web/config/image'
import { useAdvancedMentory } from '@ez/web/hooks/use-advanced-mentory'
import { getLocalizedLink } from '@ez/web/utils/get-localized-link'
import { PortableText } from '@portabletext/react'
import { useLocale } from 'next-intl'
import { Parallax } from 'react-parallax'

export function AdvancedMentory() {
  const locale = useLocale()
  const { data, isLoading } = useAdvancedMentory()

  if (isLoading || !data) return <Skeleton />

  const link = getLink(data?.button, locale)

  return (
    <>
      <div className="relative flex h-full w-full flex-col items-center gap-10 bg-muted p-40">
        <div className="absolute top-0 left-0 z-10 w-full overflow-hidden">
          {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="relative h-[85px] w-[calc(141%+1.3px)]"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
              className="fill-background"
            />
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
              className="fill-background"
            />
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              className="fill-background"
            />
          </svg>
        </div>
        <Parallax
          bgImage={urlForImage(data?.background.asset).format('webp').quality(80).url()}
          strength={-200}
          className="flex h-[300px] max-h-[300px] w-[calc(100vw-10%)] justify-center overflow-hidden rounded-lg xl:h-[400px] xl:max-h-[400px] xl:w-3/4"
        />
        <div className="-m-40 z-10 mb-4 flex h-full w-[calc(100vw-20%)] justify-center rounded-lg bg-white/90 backdrop-blur-lg xl:w-3/5">
          <div className="relative flex w-full flex-col items-center justify-start gap-10 overflow-hidden p-10 text-secondary">
            {data?.ribbon.show && (
              <div className="-rotate-45 absolute top-[32px] left-[-35px] w-[170px] transform animate-pulse bg-red-800 py-1 text-center font-semibold text-white uppercase">
                {data?.ribbon.text?.[locale]}
              </div>
            )}
            <div className="flex flex-col items-start justify-start">
              <h3 className="text-center font-bold font-oswald text-2xl md:text-3xl lg:text-left">
                {data?.title?.[locale]}
              </h3>
            </div>
            <div className="text-justify font-light font-questrial text-md leading-7 md:text-lg">
              <PortableText
                value={data?.content?.[locale]}
                components={createPortableComponents()}
              />
            </div>
          </div>
        </div>
        {data?.button.visible && link && (
          <ButtonLink
            href={getLocalizedLink(locale, link)}
            disabled={data?.button.disabled}
            className="flex w-[calc(100vw-20%)] justify-center xl:w-3/5"
          >
            <Button
              variant="default"
              theme="tertiary"
              rounded="xl"
              size="2xl"
              className="w-full font-bold uppercase"
              disabled={data?.button.disabled}
            >
              {data?.button.label?.[locale]}
            </Button>
          </ButtonLink>
        )}
      </div>
      <div className="absolute bottom-0 left-0 w-full rotate-180 overflow-hidden">
        {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative h-[85px] w-[calc(141%+1.3px)]"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            className="fill-background"
          />
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            className="fill-background"
          />
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            className="fill-background"
          />
        </svg>
      </div>
    </>
  )
}
