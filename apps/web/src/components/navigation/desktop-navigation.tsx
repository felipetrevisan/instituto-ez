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
import { motion } from 'motion/react'
import Link from 'next/link'
import { useLocale } from 'next-intl'

type NavigationProps = {
  navigation?: Navigation
}

const MenuItemMotion = motion(NavigationMenuItem)

export const DesktopNavigation = ({ navigation }: NavigationProps) => {
  const locale = useLocale()
  const { isMenuActive } = useApp()

  return (
    <NavigationMenu className="hidden lg:flex">
      <NavigationMenuList>
        <MotionHighlight
          className="flex flex-row border-b-2 border-b-primary bg-transparent text-primary"
          containerClassName="flex justify-center items-center"
          controlledItems
          hover
          mode="parent"
        >
          {navigation?.items?.map(({ id, label, url }) => (
            <MenuItemMotion data-value={id} key={id}>
              <MotionHighlightItem activeClassName="border-b-primary text-primary p-4">
                <Link
                  className='hover:after:animation-pulse after:-bottom-1 after:-translate-x-1/2 relative flex flex-col rounded-xl bg-transparent p-4 text-primary text-xl outline-none transition-all after:absolute after:left-1/2 after:h-[2px] after:w-0 after:rounded-xl after:bg-primary-foreground after:transition-all hover:text-primary hover:after:w-full hover:after:shadow-xl focus:bg-transparent focus:text-primary focus-visible:outline-1 focus-visible:ring-[3px] focus-visible:ring-ring/50 data-[active=true]:border-b-primary data-[active=true]:p-4 data-[active=true]:text-primary lg:gap-1 lg:text-sm! [&_svg:not([class*="size-"])]:size-4'
                  data-active={isMenuActive(url.link?.[locale]?.current)}
                  data-slot="navigation-menu-link"
                  href={getLocalizedLink(
                    locale,
                    url.isHome || !url.link?.[locale]?.current
                      ? '/'
                      : (url.link?.[locale]?.current ?? url.externalUrl),
                    url.type === 'EXTERNAL',
                  )}
                  target={!url.link?.[locale]?.current && url.externalUrl ? '_blank' : undefined}
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
