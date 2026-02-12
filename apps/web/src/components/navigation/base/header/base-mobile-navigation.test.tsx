import { LinkType } from '@ez/shared/types/global'
import type { Navigation } from '@ez/web/types/site'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type React from 'react'
import { describe, expect, it, vi } from 'vitest'
import { BaseMobileNavigation } from './base-mobile-navigation'

vi.mock('next-intl', () => ({
  useLocale: () => 'pt',
}))

vi.mock('@ez/web/hooks/use-app', () => ({
  useApp: () => ({
    isMenuActive: () => false,
    setIsMenuOpen: vi.fn(),
  }),
}))

vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}))

describe('BaseMobileNavigation', () => {
  it('builds submenu hash links based on parent url', async () => {
    const navigation: Navigation = {
      items: [
        {
          id: 'services',
          label: { pt: 'Serviços' },
          url: {
            isHome: false,
            link: { pt: { current: 'servicos' } },
            type: LinkType.INTERNAL,
          },
          submenuItems: [
            {
              id: 'faq',
              label: { pt: 'FAQ' },
              url: {
                isHome: false,
                link: { pt: { current: 'faq' } },
                type: LinkType.HASH,
              },
            },
          ],
        },
      ],
    }

    render(<BaseMobileNavigation navigation={navigation} />)

    const trigger = screen.getByRole('button', { name: 'Serviços' })
    await userEvent.click(trigger)

    const submenuLink = await screen.findByRole('link', { name: 'FAQ' })
    expect(submenuLink).toHaveAttribute('href', '/pt/servicos#faq')
  })
})
