'use client'

import { MotionHighlight, MotionHighlightItem } from '@ez/shared/ui/animated/effects/motion-highlight'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@ez/shared/ui/navigation-menu'
import { Skeleton } from '@ez/shared/ui/skeleton'
import { useApp } from '@ez/web/hooks/use-app'
import type { Navigation } from '@ez/web/types/site'
import { getLocalizedLink } from '@ez/web/utils/get-localized-link'
import { motion } from 'framer-motion'
import { useLocale } from 'next-intl'
import Link from 'next/link'

type NavigationProps = {
  navigation?: Navigation
}

const MenuItemMotion = motion(NavigationMenuItem)

export const DesktopNavigation = ({ navigation }: NavigationProps) => {
  const { isMenuActive } = useApp()
  const locale = useLocale();

  return (
    <NavigationMenu className="hidden lg:flex">
      <NavigationMenuList>
        <MotionHighlight
          controlledItems
          hover
          className="flex flex-row border-b-2 border-b-primary bg-transparent text-primary"
          mode="parent"
          containerClassName="flex justify-center items-center"
        >
          {navigation?.items?.map(({ id, label, url }) => (
            <MenuItemMotion key={id} data-value={id}>
              <MotionHighlightItem activeClassName="border-b-primary text-primary p-4">
                <Link
                  data-active={isMenuActive(url.link)}
                  href={getLocalizedLink(url.isHome || !url.link ? '/' : (url.link ?? url.externalUrl), url.type === 'EXTERNAL')}
                  target={!url.link && url.externalUrl ? '_blank' : undefined}
                  className='hover:after:animation-pulse after:-bottom-1 after:-translate-x-1/2 relative flex flex-col rounded-xl bg-transparent p-4 text-primary text-xl outline-none transition-all after:absolute after:left-1/2 after:h-[2px] after:w-0 after:rounded-xl after:bg-primary-foreground after:transition-all hover:text-primary hover:after:w-full hover:after:shadow-xl focus:bg-transparent focus:text-primary focus-visible:outline-1 focus-visible:ring-[3px] focus-visible:ring-ring/50 data-[active=true]:border-b-primary data-[active=true]:p-4 data-[active=true]:text-primary lg:gap-1 lg:text-sm! [&_svg:not([class*="size-"])]:size-4'
                  data-slot="navigation-menu-link"
                  locale={locale}
                >
                  {label}
                </Link>
              </MotionHighlightItem>
            </MenuItemMotion>
          ))}
        </MotionHighlight>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export const DesktopNavigationSkeleton = () => {
  return (
    <div className="hidden lg:flex">
      <div className="flex flex-row gap-4">
        <Skeleton className="h-10 w-1/3" />
        <Skeleton className="h-10 w-1/3" />
        <Skeleton className="h-10 w-1/3" />
        <Skeleton className="h-10 w-1/3" />
        <Skeleton className="h-10 w-1/3" />
        <Skeleton className="h-10 w-1/3" />
      </div>
    </div>
  )
}
