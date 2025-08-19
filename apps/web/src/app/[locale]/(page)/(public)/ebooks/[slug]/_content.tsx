'use client'

import type { Ebook } from '@ez/web/types/ebook'
import { Header } from './_header'
import { Index } from './_index'
import { Metadata } from './_metadata'
import { Overview } from './_overview'
import { Question } from './_question'

type CSSVariables = {
  [key: `--${string}`]: string
}

export function Content({ data }: { data: Ebook }) {
  const { theme } = data

  const style: React.CSSProperties & CSSVariables = {
    '--primary-c': `${theme?.primary?.hex ?? 'var(--primary)'}`,
    '--secondary-c': `${theme?.secondary?.hex ?? 'var(--secondary)'}`,
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
