'use client'

import { PageType } from '@ez/shared/types/global'
import { useApp } from '@ez/web/hooks/use-app'
import type { Page } from '@ez/web/types/page'
import { useLocale } from 'next-intl'
import { useEffect } from 'react'
import { SectionContent } from './_section'

export function Content({ data, slug }: { data: Page; slug: string }) {
  const { setPageType, isNormalPage } = useApp()
  const locale = useLocale()

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (isNormalPage()) return

    setPageType(PageType.page)
  }, [])

  return (
    <>
      {data?.sections.map((section) => (
        <section
          data-hash={`${slug}-${section.hash?.[locale]}`}
          id={section.hash?.[locale]}
          key={section.hash?.[locale]}
        >
          <SectionContent {...section} slug={slug} />
        </section>
      ))}
    </>
  )
}
