'use client'

import { useShared } from '@ez/shared/hooks/use-shared'
import { Button } from '@ez/shared/ui'
import { useApp } from '@ez/web/hooks/use-app'
import type { Navigation, NavigationItemURL } from '@ez/web/types/site'
import { getLocalizedLink } from '@ez/web/utils/get-localized-link'
import { scrollToId } from '@ez/web/utils/scroll-to-id'
import Link from 'next/link'
import { useLocale } from 'next-intl'

type NavigationProps = {
  navigation?: Navigation
}

export const LandingPageMathematizerMobileNavigation = ({ navigation }: NavigationProps) => {
  const locale = useLocale()
  const { isMenuActive } = useApp()
  const { setIsContactDialogOpen } = useShared()

  const navigateToHash = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    url: NavigationItemURL,
  ) => {
    e.preventDefault()
    scrollToId(url.link.toString().replace('#', ''))
  }

  return (
    <nav className="fixed top-[80px] z-90 w-full divide-y divide-primary/5 border-border/40 border-t bg-background/90 backdrop-blur-2xl">
      {navigation?.items?.map(({ id, label, url }) => (
        <div className="flex w-full" key={id}>
          <Link
            className="w-full px-4 py-3 text-center font-medium text-base text-foreground/80 transition-colors hover:bg-accent/10 hover:text-accent"
            data-active={isMenuActive(url.link?.[locale]?.current)}
            href={getLocalizedLink(
              locale,
              url.link?.[locale]?.current ?? url.link,
              url.type === 'EXTERNAL',
              url.type === 'HASH',
            )}
            onClick={url.type === 'HASH' ? (e) => navigateToHash(e, url) : undefined}
            target={url.isExternal ? '_blank' : undefined}
          >
            {label?.[locale]}
          </Link>
        </div>
      ))}
      <Button
        base="mathematizer"
        className="mt-2 flex justify-self-center"
        onClick={() => setIsContactDialogOpen(true)}
        rounded="lg"
        theme="background"
      >
        Solicitar Diagnóstico
      </Button>
    </nav>
  )
}
