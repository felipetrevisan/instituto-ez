'use client'

import { cn, getLink } from '@ez/shared/lib/utils'
import { createPortableComponents } from '@ez/shared/sanity/portable'
import { Button } from '@ez/shared/ui/button'
import { ButtonLink } from '@ez/web/components/app'
import { urlForImage } from '@ez/web/config/image'
import type { Lecture } from '@ez/web/types/lecture'
import { PortableText } from '@portabletext/react'
import { Parallax } from 'react-parallax'

type Props = {
  index: number
  item: Lecture
}

export function LectureCard({ item: { button, background, content, title }, index }: Props) {
  const link = getLink(button)

  return (
    <div
      className={cn('relative flex justify-between w-full h-full min-h-[700px] lg:min-h-[500px]', {
        'flex-row-reverse': index % 2 !== 0,
      })}
    >
      <Parallax
        bgImage={urlForImage(background.asset).url()}
        className="flex justify-center w-full xl:w-2/3 h-[362px] overflow-hidden rounded-r-lg"
      />
      <div
        className={cn(
          'flex justify-center w-11/12 md:w-4/5 xl:w-1/2 z-10 bg-card/90 shadow-lg rounded-lg absolute top-24',
          {
            'translate-x-1/2 right-1/2 xl:translate-x-0 xl:right-80': index % 2 === 0,
            '-translate-x-1/2 left-1/2 xl:translate-x-0 xl:left-80': index % 2 !== 0,
          },
        )}
      >
        <div className="relative flex flex-col justify-start items-start w-full h-full text-secondary p-10 gap-10">
          <h3 className="clamp-[text,xl,4xl] text-center lg:text-left font-bold font-oswald">
            {title}
          </h3>
          <div className="flex flex-col font-light text-justify text-md font-questrial leading-7 gap-10 min-h-40">
            <PortableText value={content} components={createPortableComponents()} />
            {button.visible && link && (
              <ButtonLink href={link} passHref className="flex justify-center w-full">
                <Button
                  variant="default"
                  theme="tertiary"
                  rounded="xl"
                  size="2xl"
                  effect="pulse"
                  className="uppercase font-bold w-full"
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
