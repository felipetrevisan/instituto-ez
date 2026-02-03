'use client'

import { useShared } from '@ez/shared/hooks/use-shared'
import { MailIcon } from '@ez/shared/icons'
import { PageType } from '@ez/shared/types/global'
import { IconButton } from '@ez/shared/ui/animated/button/icon-button'
import { useApp } from '@ez/web/hooks/use-app'
import type { Ebook } from '@ez/web/types/ebook'
import type { LandingPageSetting } from '@ez/web/types/landing-page-setting'
import type { Section, SectionKey } from '@ez/web/types/sections'
import { ChevronUpIcon } from 'lucide-react'
import { useMotionValueEvent, useScroll } from 'motion/react'
import { useLocale } from 'next-intl'
import { Fragment, useEffect, useState } from 'react'
import { getLandingPageSections } from './_sections'
import StickyHeader from './_sticky-header'

export function Content({ data, settings }: { data: Ebook; settings: LandingPageSetting }) {
  const { setPageType, isEbookPage } = useApp()
  const { setIsContactDialogOpen, setContactSubject } = useShared()
  const locale = useLocale()

  const { scrollY } = useScroll()
  const [visible, setVisible] = useState(false)

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setVisible(latest > 1000)
  })

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional non-exhaustive deps
  useEffect(() => {
    if (isEbookPage()) return

    setPageType(PageType.ebook)
  }, [])

  useEffect(() => {
    document.documentElement.classList.add('force-light')
    document.documentElement.classList.remove('dark')
    return () => {
      document.documentElement.classList.remove('force-light')
      document.documentElement.classList.add('dark')
    }
  }, [])

  const avaliableSections = getLandingPageSections(data).reduce(
    (acc, section) => {
      acc[section.key] = section
      return acc
    },
    {} as Record<string, SectionKey>,
  )

  function askAboutEbook() {
    setContactSubject(data.title?.[locale])
    setIsContactDialogOpen(true)
  }

  return (
    <div className="flex w-full flex-col items-center justify-center space-y-14">
      <StickyHeader {...data} />
      <div className="relative flex w-screen flex-col items-center justify-center">
        {settings.sections?.map(({ key, show }: Section) =>
          show ? <Fragment key={key}>{avaliableSections[key]?.component}</Fragment> : null,
        )}
      </div>
      <div className="fixed right-10 bottom-10 z-50 flex flex-row items-center gap-4">
        <IconButton
          animate={{
            opacity: visible ? 1 : 0,
            y: visible ? 0 : 20,
          }}
          icon={ChevronUpIcon}
          initial={{ opacity: 0, y: 20 }}
          onClick={scrollToTop}
          size="lg"
          theme="custom"
          transition={{ duration: 0.3, type: 'spring', stiffness: 400, damping: 10 }}
          whileHover={{ scale: 1.4 }}
          whileTap={{ scale: 1.4 }}
        />
      </div>
      <div className="fixed right-10 bottom-4 z-50 flex flex-row items-center gap-4">
        <IconButton
          icon={MailIcon}
          onClick={askAboutEbook}
          size="lg"
          theme="custom"
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          whileHover={{ scale: 1.4 }}
          whileTap={{ scale: 1.4 }}
        />
      </div>
    </div>
  )
}
