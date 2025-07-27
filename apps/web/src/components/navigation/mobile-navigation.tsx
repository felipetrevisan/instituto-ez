'use client'

import { MotionHighlight, MotionHighlightItem } from '@ez/shared/ui/animated/motion-highlight'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@ez/shared/ui/navigation-menu'
import { useApp } from '@ez/web/hooks/use-app'
import type { Navigation } from '@ez/web/types/site'
import { motion } from 'framer-motion'

type NavigationProps = {
  navigation?: Navigation
}

const MenuItemMotion = motion(NavigationMenuItem)

export const MobileNavigation = ({ navigation }: NavigationProps) => {
  const { isMenuActive } = useApp()

  return (
    <NavigationMenu className="w-full flex mx-auto lg:hidden lg:items-start" orientation="vertical">
      <NavigationMenuList className="items-end">
        <MotionHighlight
          controlledItems
          hover
          className="flex flex-col border-b-primary border-b-2 bg-transparent text-primary"
          mode="parent"
          containerClassName="flex flex-col justify-center items-center"
        >
          {navigation?.items?.map(({ id, label, url }) => (
            <MenuItemMotion key={id} data-value={id}>
              <MotionHighlightItem activeClassName="border-b-primary text-primary p-4">
                <NavigationMenuLink
                  data-active={isMenuActive(url.link)}
                  href={url.isHome || !url.link ? '/' : (url.link ?? url.externalUrl)}
                  target={!url.link && url.externalUrl ? '_blank' : undefined}
                  className="relative hover:after:w-full hover:after:animation-pulse hover:after:shadow-xl after:absolute after:w-0 after:bg-primary-foreground after:left-1/2 after:-bottom-1 after:h-[2px] after:rounded-xl after:-translate-x-1/2 after:transition-all"
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
