'use client'

import { MotionHighlight, MotionHighlightItem } from '@ez/shared/ui/animated/effects/motion-highlight'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@ez/shared/ui/navigation-menu'
import { useApp } from '@ez/web/hooks/use-app'
import type { Navigation } from '@ez/web/types/site'
import { getLocalizedLink } from '@ez/web/utils/get-localized-link'
import { motion } from 'framer-motion'

type NavigationProps = {
  navigation?: Navigation
}

const MenuItemMotion = motion(NavigationMenuItem)

export const MobileNavigation = ({ navigation }: NavigationProps) => {
  const { isMenuActive } = useApp()


  return (
    <NavigationMenu className="mx-auto flex w-full lg:hidden lg:items-start" orientation="vertical">
      <NavigationMenuList className="items-end">
        <MotionHighlight
          controlledItems
          hover
          className="flex flex-col border-b-2 border-b-primary bg-transparent text-primary"
          mode="parent"
          containerClassName="flex flex-col justify-center items-center"
        >
          {navigation?.items?.map(({ id, label, url }) => (
            <MenuItemMotion key={id} data-value={id}>
              <MotionHighlightItem activeClassName="border-b-primary text-primary p-4">
                <NavigationMenuLink
                  data-active={isMenuActive(url.link)}
                  href={getLocalizedLink(
                    url.isHome || !url.link ? '/' : (url.link ?? url.externalUrl),
                    url.type === 'EXTERNAL',
                  )}
                  target={!url.link && url.externalUrl ? '_blank' : undefined}
                  className='hover:after:animation-pulse after:-bottom-1 after:-translate-x-1/2 relative after:absolute after:left-1/2 after:h-[2px] after:w-0 after:rounded-xl after:bg-primary-foreground after:transition-all hover:after:w-full hover:after:shadow-xl'
                >
                  {label}
                </NavigationMenuLink>
              </MotionHighlightItem>
            </MenuItemMotion>
          ))}
        </MotionHighlight>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
