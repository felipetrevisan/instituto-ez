'use client'

import { useApp } from '@ez/web/hooks/use-app'
import type { Navigation, NavigationItemURL } from '@ez/web/types/site'
import { getLocalizedLink } from '@ez/web/utils/get-localized-link'
import { navigateToHash } from '@ez/web/utils/scroll-to-id'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import type { ReactNode } from 'react'

type BaseMobileNavigationProps = {
  navigation?: Navigation
  /**
   * Classes CSS customizadas para o nav
   */
  navClassName?: string
  /**
   * Classes CSS customizadas para os links
   */
  linkClassName?: string
  /**
   * Componente adicional renderizado após os links (ex: botão de contato)
   */
  additionalContent?: ReactNode
}

export function BaseMobileNavigation({
  navigation,
  navClassName = 'fixed top-[80px] z-90 w-full divide-y divide-primary/5 border-border/40 border-t bg-background/90 backdrop-blur-2xl',
  linkClassName = 'w-full px-4 py-3 text-center font-medium text-base text-foreground/80 transition-colors hover:bg-accent/10 hover:text-accent',
  additionalContent,
}: BaseMobileNavigationProps) {
  const locale = useLocale()
  const { isMenuActive, setIsMenuOpen } = useApp()

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, url: NavigationItemURL) => {
    setIsMenuOpen(false)
    if (url.type === 'HASH') {
      navigateToHash(e, url)
    }
  }

  return (
    <nav className={navClassName}>
      {navigation?.items?.map(({ id, label, url }) => (
        <div className="flex w-full" key={id}>
          <Link
            className={linkClassName}
            data-active={isMenuActive(url.link?.[locale]?.current)}
            href={getLocalizedLink(
              locale,
              url.link?.[locale]?.current ?? url.link,
              url.type === 'EXTERNAL',
              url.type === 'HASH',
            )}
            onClick={(e) => handleLinkClick(e, url)}
            rel={url.isExternal ? 'noopener noreferrer' : undefined}
            target={url.isExternal ? '_blank' : undefined}
          >
            {label?.[locale]}
          </Link>
        </div>
      ))}
      {additionalContent}
    </nav>
  )
}
