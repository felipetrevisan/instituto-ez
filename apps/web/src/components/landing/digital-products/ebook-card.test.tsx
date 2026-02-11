import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

vi.mock('next-intl', () => ({
  useLocale: () => 'pt',
  useTranslations: () => (key: string) => key,
}))

vi.mock('@ez/web/config/image', () => ({
  urlForImage: () => ({
    auto: () => ({
      quality: () => ({
        url: () => 'https://example.com/test.jpg',
      }),
    }),
  }),
}))

vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}))

vi.mock('next/image', () => ({
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img {...props} />,
}))

import type { Ebook } from '@ez/web/types/ebook'
import { EbookCard } from './ebook-card'

describe('EbookCard', () => {
  it('renders without a link when slug is missing', () => {
    const ebook = {
      slug: undefined,
      image: {},
      description: {},
    } as unknown as Ebook

    render(<EbookCard ebook={ebook} index={0} />)

    expect(screen.queryByRole('link')).toBeNull()
    expect(screen.getByRole('button', { name: 'learnMoreEbook' })).toBeInTheDocument()
  })
})
