'use client'

import { Content } from '@ez/web/app/[locale]/(public)/(root)/[slug]/_content'
import { ScrollToHash } from '@ez/web/components/scroll-to-hash'
import type { Page } from '@ez/web/types/page'

export default function NormalPage({ data, slug }: { data: Page; slug: string }) {
  return (
    <div className="flex w-full max-w-7xl flex-col items-center justify-center space-y-14">
      <div className="relative flex w-screen flex-col items-center justify-center gap-20">
        <ScrollToHash />
        <Content data={data} slug={slug} />
      </div>
    </div>
  )
}
