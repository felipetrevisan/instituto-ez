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
  highlightClassName = 'flex flex-row border-b-2 border-b-primary dark:border-b-accent bg-transparent text-primary dark:text-accent',
  linkClassName = 'hover:after:animation-pulse after:-bottom-1 after:-translate-x-1/2 relative flex flex-col rounded-xl bg-transparent p-4 text-primary dark:text-accent text-xl outline-none transition-all after:absolute after:left-1/2 after:h-[2px] after:w-0 after:rounded-xl after:bg-transparent after:transition-all hover:text-primary dark:hover:text-accent hover:after:w-full hover:after:shadow-xl focus:bg-transparent focus:text-primary dark:focus:text-accent focus-visible:outline-1 focus-visible:ring-[3px] focus-visible:ring-ring/50 data-[active=true]:border-b-primary data-[active=true]:p-4 data-[active=true]:text-primary dark:data-[active=true]:text-accent lg:gap-1 lg:text-sm! [&_svg:not([class*="size-"])]:size-4',
  activeClassName = 'border-b-primary dark:border-b-accent text-primary dark:text-accent p-4',
  additionalContent,
}: BaseDesktopNavigationProps) {
  const locale = useLocale()
  const { isMenuActive } = useApp()

  return (
    <Fragment>
      <NavigationMenu className="hidden lg:flex">
        <NavigationMenuList>
          <MotionHighlight
            className={highlightClassName}
            containerClassName="flex justify-center items-center"
            controlledItems
            hover
            mode="parent"
          >
            {navigation?.items?.map(({ id, label, url }) => (
              <MenuItemMotion data-value={id} key={id}>
                <MotionHighlightItem activeClassName={activeClassName}>
                  <Link
                    className={linkClassName}
                    data-active={isMenuActive(url.link?.[locale]?.current)}
                    data-slot="navigation-menu-link"
                    href={getLocalizedLink(
                      locale,
                      url.link?.[locale]?.current ?? url.link,
                      url.type === 'EXTERNAL',
                      url.type === 'HASH',
                    )}
                    onClick={url.type === 'HASH' ? (e) => navigateToHash(e, url) : undefined}
                    rel={url.isExternal ? 'noopener noreferrer' : undefined}
                    target={url.isExternal ? '_blank' : undefined}
                  >
                    {label?.[locale]}
                  </Link>
                </MotionHighlightItem>
              </MenuItemMotion>
            ))}
          </MotionHighlight>
        </NavigationMenuList>
      </NavigationMenu>
      {additionalContent}
    </Fragment>
  )
}
