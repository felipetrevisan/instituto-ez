'use client'

import {
  MotionHighlight,
  MotionHighlightItem,
} from '@ez/shared/ui/animated/effects/motion-highlight'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@ez/shared/ui/navigation-menu'
import { FadeIn } from '@ez/web/components/ui/fade-in'
import { useApp } from '@ez/web/hooks/use-app'
import type { Navigation } from '@ez/web/types/site'
import { getLocalizedLink } from '@ez/web/utils/get-localized-link'
import { navigateToHash } from '@ez/web/utils/scroll-to-id'
import { motion } from 'motion/react'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { Fragment, type ReactNode } from 'react'

type BaseDesktopNavigationProps = {
  navigation?: Navigation
  /**
   * Classes CSS customizadas para o MotionHighlight
   */
  highlightClassName?: string
  /**
   * Classes CSS customizadas para os links
   */
  linkClassName?: string
  /**
   * Classes CSS customizadas para o item ativo
   */
  activeClassName?: string
  /**
   * Componente adicional renderizado após a navegação (ex: botão de contato)
   */
  additionalContent?: ReactNode
}

const MenuItemMotion = motion(NavigationMenuItem)

export function BaseDesktopNavigation({
  navigation,
  highlightClassName = 'flex flex-col border-b-2 border-b-primary-foreground bg-transparent text-primary-foreground',
  linkClassName = 'relative flex flex-col rounded-xl bg-transparent p-4 text-center outline-none transition-all after:absolute after:-bottom-1 after:left-1/2 after:h-[2px] after:w-0 after:-translate-x-1/2 after:rounded-xl after:bg-transparent after:transition-all hover:after:animation-pulse hover:after:w-full hover:after:shadow-xl focus:bg-transparent focus-visible:outline-1 focus-visible:ring-[3px] focus-visible:ring-ring/50 data-[active=true]:border-b-primary-foreground data-[active=true]:p-4 lg:gap-1 lg:text-left lg:text-sm! [&_svg:not([class*="size-"])]:size-4',
  activeClassName = 'border-b-primary-foreground p-4',
  additionalContent,
}: BaseDesktopNavigationProps) {
  const locale = useLocale()
  const { isMenuActive } = useApp()

  return (
    <Fragment>
      <FadeIn>
        <NavigationMenu className="flex h-auto flex-col" orientation="vertical">
          <NavigationMenuList>
            <MotionHighlight
              className={highlightClassName}
              containerClassName="grid grid-cols-1 lg:grid-cols-2 justify-center items-start lg:-ml-4"
              controlledItems
              hover
              mode="parent"
            >
              {navigation?.items?.map(({ id, label, url }) => (
                <MenuItemMotion data-value={id} key={id}>
                  <MotionHighlightItem activeClassName={activeClassName}>
                    {url ? (
                      <Link
                        className={linkClassName}
                        data-active={isMenuActive(
                          getLocalizedLink(
                            locale,
                            url.link?.[locale]?.current ?? url.link,
                            url.type === 'EXTERNAL',
                            url.type === 'HASH',
                          ),
                        )}
                        data-slot="navigation-menu-link"
                        href={getLocalizedLink(
                          locale,
                          url.link?.[locale]?.current ?? url.link,
                          url.type === 'EXTERNAL',
                          url.type === 'HASH',
                        )}
                        onClick={url.type === 'HASH' ? (e) => navigateToHash(e, url) : undefined}
                        rel={url.isExternal ? 'noopener noreferrer' : undefined}
                        style={{ color: 'var(--footer-link-color, var(--footer-foreground))' }}
                        target={url.isExternal ? '_blank' : undefined}
                      >
                        {label?.[locale]}
                      </Link>
                    ) : (
                      <span
                        className={linkClassName}
                        style={{ color: 'var(--footer-link-color, var(--footer-foreground))' }}
                      >
                        {label?.[locale]}
                      </span>
                    )}
                  </MotionHighlightItem>
                </MenuItemMotion>
              ))}
            </MotionHighlight>
          </NavigationMenuList>
        </NavigationMenu>
      </FadeIn>
      {additionalContent && <FadeIn delay={0.05}>{additionalContent}</FadeIn>}
    </Fragment>
  )
}
