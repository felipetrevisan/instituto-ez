'use client'

import { useShared } from '@ez/shared/hooks/use-shared'
import { MailIcon } from '@ez/shared/icons'
import { PageType } from '@ez/shared/types/global'
import { IconButton } from '@ez/shared/ui/animated/button/icon-button'
import { useApp } from '@ez/web/hooks/use-app'
import { useLandingPageSettings } from '@ez/web/hooks/use-landing-page-settings'
import type { Ebook } from '@ez/web/types/ebook'
import type { Section, SectionKeys } from '@ez/web/types/sections'
import { Fragment, useEffect } from 'react'
import { Header } from './_header'
import { Index } from './_index'
import { Metadata } from './_metadata'
import { Overview } from './_overview'
import { Question } from './_question'
import { getLandingPageSections } from './_sections'
import { Testimonial } from './_testimonial'

type CSSVariables = {
  [key: `--${string}`]: string
}

export function Content({
  data,
  sections,
}: { data: Ebook, sections: Section[] }) {
  const { setPageType, isLandingPage } = useApp()
  const { setIsContactDialogOpen, setContactSubject } = useShared()
  const { theme } = data

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (isLandingPage()) return

    setPageType(PageType.landing)
  }, [])

    const avaliableSections = getLandingPageSections(data).reduce(
      (acc, section) => {
        acc[section.key] = section
        return acc
      },
      {} as Record<string, SectionKeys>,
    )

  const style: React.CSSProperties & CSSVariables = {
    '--primary-c': `${theme?.primary?.hex ?? 'var(--primary)'}`,
    '--secondary-c': `${theme?.secondary?.hex ?? 'var(--secondary)'}`,
    '--tertiary-c': `${theme?.tertiary?.hex ?? 'var(--tertiary)'}`,
    '--header-button-default-text': `${theme?.button?.header?.default?.text?.hex ?? 'var(--primary-foreground)'}`,
    '--header-button-default-background': `${theme?.button?.header?.default?.background?.hex ?? 'var(--primary)'}`,
    '--header-button-hover-text': `${theme?.button?.header?.hover?.text?.hex ?? 'var(--primary)'}`,
    '--header-button-hover-background': `${theme?.button?.header?.hover?.background?.hex ?? 'var(--primary-foreground)'}`,
    '--header-sticky-button-default-text': `${theme?.button?.stickyHeader?.default?.text?.hex ?? 'var(--primary-foreground)'}`,
    '--header-sticky-button-default-background': `${theme?.button?.stickyHeader?.default?.background?.hex ?? 'var(--primary)'}`,
    '--header-sticky-button-hover-text': `${theme?.button?.stickyHeader?.hover?.text?.hex ?? 'var(--primary)'}`,
    '--header-sticky-button-hover-background': `${theme?.button?.stickyHeader?.hover?.background?.hex ?? 'var(--primary-foreground)'}`,
  }

  function askAboutEbook() {
    setContactSubject(data.title)
    setIsContactDialogOpen(true)
  }

  return (
    <div className="flex w-full flex-col items-center justify-center space-y-14" style={style}>
      <div className="relative flex w-screen flex-col items-center justify-center">
        {sections?.map(({ key, show }: Section) =>
        show ? (
          <Fragment key={key}>
            {avaliableSections[key]?.component}
          </Fragment>
        ) : null,
      )}
      </div>
      <div className="fixed right-10 bottom-4 z-50 flex flex-row items-center gap-4">
        <IconButton
          icon={MailIcon}
          onClick={askAboutEbook}
          size="lg"
          theme="custom"
          whileHover={{ scale: 1.4 }}
          whileTap={{ scale: 1.4 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        />
      </div>
    </div>
  )
}
