'use client'

import { cn, getLink } from '@ez/shared/lib/utils'
import { createPortableComponents } from '@ez/shared/sanity/portable'
import { Button } from '@ez/shared/ui/button'
import { ButtonLink } from '@ez/web/components/app'
import { urlForImage } from '@ez/web/config/image'
import type { CompanyService } from '@ez/web/types/company-service'
import { getLocalizedLink } from '@ez/web/utils/get-localized-link'
import { PortableText } from '@portabletext/react'
import { useLocale } from 'next-intl'
import { Parallax } from 'react-parallax'

type Props = {
  index: number
  item: CompanyService
}

export function CompanyServiceCard({ item: { button, background, content, title }, index }: Props) {
  const locale = useLocale()
  const link = getLink(button)
  const isEven = index % 2 === 0

  return (
    <div
      className={cn(
        'relative grid min-h-[500px] w-full [&:not(:last-child)]:mb-10',
        'lg:grid-cols-12',
      )}
    >
      <Parallax
        bgImage={urlForImage(background.asset).format('webp').quality(80).url()}
        className={cn(
          'h-[360px] w-full overflow-hidden rounded-xl',
          isEven
            ? 'lg:col-span-7 lg:col-start-1 lg:row-start-1'
            : 'lg:col-span-7 lg:col-start-6 lg:row-start-1',
        )}
      />
      <div
        className={cn(
          '-mt-60 md:-mt-32 z-10 mx-auto w-11/12 rounded-xl bg-card/50 shadow-lg backdrop-blur-lg',
          'lg:mt-0 lg:self-center',
          isEven
            ? 'lg:col-span-8 lg:col-start-4 lg:row-start-1'
            : 'lg:col-span-8 lg:col-start-1 lg:row-start-1',
        )}
      >
        <div className="relative flex h-full w-full flex-col items-start justify-start gap-10 p-10 text-secondary">
          <h3 className="text-center font-bold font-oswald text-2xl lg:text-left">{title}</h3>
          <div className="flex min-h-60 flex-col justify-between gap-10 font-light font-questrial text-lg leading-7">
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
