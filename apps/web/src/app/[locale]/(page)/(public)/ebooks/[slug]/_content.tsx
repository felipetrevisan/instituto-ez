'use client'

import { PageType } from '@ez/shared/types/global'
import { useApp } from '@ez/web/hooks/use-app'
import type { Ebook } from '@ez/web/types/ebook'
import { useEffect } from 'react'
import { Header } from './_header'
import { Index } from './_index'
import { Metadata } from './_metadata'
import { Overview } from './_overview'
import { Question } from './_question'

type CSSVariables = {
  [key: `--${string}`]: string
}

export function Content({ data }: { data: Ebook }) {
  const { setPageType, isLandingPage } = useApp()
  const { theme } = data

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (isLandingPage()) return

    setPageType(PageType.landing)
  }, [])

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

  return (
    <div className="flex w-full flex-col items-center justify-center space-y-14" style={style}>
      <div className="relative flex w-screen flex-col items-center justify-center">
        <Header data={data} />
        <Metadata data={data} />
        <Index data={data} />
        <Overview data={data} />
        <Question data={data} />
      </div>
    </div>
  )
}
