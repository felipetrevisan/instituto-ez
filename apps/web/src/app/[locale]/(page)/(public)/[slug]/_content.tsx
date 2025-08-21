'use client'

import { PageType } from '@ez/shared/types/global'
import { useApp } from '@ez/web/hooks/use-app'
import type { Page } from '@ez/web/types/page'
import { useEffect } from 'react'
import { SectionContent } from './_section'

export function Content({ data, slug }: { data: Page; slug: string }) {
  const { setPageType, isNormalPage } = useApp()

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (isNormalPage()) return

    setPageType(PageType.page)
  }, [])

  return (
    <>
      {data?.sections.map((section) => (
        <section key={section.hash} id={section.hash} data-hash={`${slug}-${section.hash}`}>
          <SectionContent {...section} slug={slug} />
        </section>
      ))}
    </>
  )
}
