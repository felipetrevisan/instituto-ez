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
import type { Navigation, NavigationItemURL } from '@ez/web/types/site'
import { getLocalizedLink } from '@ez/web/utils/get-localized-link'
import { scrollToId } from '@ez/web/utils/scroll-to-id'
import { motion } from 'motion/react'
import Link from 'next/link'
import { useLocale } from 'next-intl'

type NavigationProps = {
  navigation?: Navigation
}

const MenuItemMotion = motion(NavigationMenuItem)

export const LandingPageDesktopNavigation = ({ navigation }: NavigationProps) => {
  const locale = useLocale()
  const { isMenuActive } = useApp()

  const navigateToHash = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    url: NavigationItemURL,
  ) => {
    e.preventDefault()
    scrollToId(url.link.toString().replace('#', ''))
  }

  return (
    <NavigationMenu className="hidden lg:flex">
      <NavigationMenuList>
        <MotionHighlight
          className="flex flex-row bg-transparent text-accent"
          containerClassName="flex justify-center items-center"
          controlledItems
          hover
          mode="parent"
        >
          {navigation?.items?.map(({ id, label, url }) => (
            <MenuItemMotion data-value={id} key={id}>
              <MotionHighlightItem activeClassName="border-b-primary text-accent p-4">
                <Link
                  className='relative flex flex-col rounded-xl bg-transparent p-4 text-accent text-xl outline-none transition-all hover:bg-accent/10 hover:text-accent focus:bg-transparent focus:text-accent focus-visible:outline-1 focus-visible:ring-[3px] focus-visible:ring-ring/50 data-[active=true]:p-4 data-[active=true]:text-accent lg:gap-1 lg:text-sm! [&_svg:not([class*="size-"])]:size-4'
                  data-active={isMenuActive(url.link?.[locale]?.current)}
                  data-slot="navigation-menu-link"
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
              </MotionHighlightItem>
            </MenuItemMotion>
          ))}
        </MotionHighlight>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
