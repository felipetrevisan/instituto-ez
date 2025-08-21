'use client'

import { cn, getLink } from '@ez/shared/lib/utils'
import { createPortableComponents } from '@ez/shared/sanity/portable'
import { Button } from '@ez/shared/ui/button'
import { ButtonLink } from '@ez/web/components/app'
import { urlForImage } from '@ez/web/config/image'
import type { Lecture } from '@ez/web/types/lecture'
import { getLocalizedLink } from '@ez/web/utils/get-localized-link'
import { PortableText } from '@portabletext/react'
import { useLocale } from 'next-intl'
import { Parallax } from 'react-parallax'

type Props = {
  index: number
  item: Lecture
}

export function LectureCard({ item: { button, background, content, title }, index }: Props) {
  const locale = useLocale()
  const link = getLink(button)

  return (
    <div
      className={cn('relative flex h-full min-h-[700px] w-full justify-between lg:min-h-[500px]', {
        'flex-row-reverse': index % 2 !== 0,
      })}
    >
      <Parallax
        bgImage={urlForImage(background.asset).format('webp').quality(80).url()}
        className="flex h-[362px] w-full justify-center overflow-hidden rounded-r-lg xl:w-2/3"
      />
      <div
        className={cn(
          'absolute top-24 z-10 flex w-11/12 justify-center rounded-lg bg-card/90 shadow-lg md:w-4/5 xl:w-1/2',
          {
            'right-1/2 translate-x-1/2 xl:right-80 xl:translate-x-0': index % 2 === 0,
            '-translate-x-1/2 left-1/2 xl:left-80 xl:translate-x-0': index % 2 !== 0,
          },
        )}
      >
        <div className="relative flex h-full w-full flex-col items-start justify-start gap-10 p-10 text-secondary">
          <h3 className="clamp-[text,xl,4xl] text-center font-bold font-oswald lg:text-left">
            {title}
          </h3>
          <div className="flex min-h-40 flex-col gap-10 text-justify font-light font-questrial text-md leading-7">
            <PortableText value={content} components={createPortableComponents()} />
            {button.visible && link && (
              <ButtonLink
                href={getLocalizedLink(locale, link)}
                passHref
                className="flex w-full justify-center"
              >
                <Button
                  variant="default"
                  theme="tertiary"
                  rounded="xl"
                  size="2xl"
                  effect="pulse"
                  className="w-full font-bold uppercase"
                  disabled={button.disabled}
                >
                  {button.label}
                </Button>
              </ButtonLink>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
