'use client'

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@ez/shared/ui/navigation-menu'
import { useApp } from '@ez/web/hooks/use-app'
import type { Navigation } from '@ez/web/types/site'
import { getLocalizedLink } from '@ez/web/utils/get-localized-link'
import { AnimatePresence, motion } from 'motion/react'
import { useLocale } from 'next-intl'

type NavigationProps = {
  navigation?: Navigation
}

export const MobileNavigation = ({ navigation }: NavigationProps) => {
  const locale = useLocale()
  const { isMenuActive } = useApp()

  return (
    <NavigationMenu className="mx-auto flex w-full flex-col lg:hidden" orientation="vertical">
      <NavigationMenuList className="flex flex-col">
        <AnimatePresence>
          {navigation?.items?.map(({ id, label, url }) => (
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              initial={{ opacity: 0, y: -10 }}
              key={id}
              transition={{ duration: 0.2 }}
            >
              <NavigationMenuItem>
                <NavigationMenuLink
                  className="block px-4 py-4 font-medium text-lg text-primary transition-colors hover:text-primary/80"
                  data-active={isMenuActive(url.link?.[locale].current)}
                  href={getLocalizedLink(
                    locale,
                    url.isHome || !url.link?.[locale].current
                      ? '/'
                      : (url.link?.[locale].current ?? url.externalUrl),
                    url.type === 'EXTERNAL',
                  )}
                  target={!url.link?.[locale].current && url.externalUrl ? '_blank' : undefined}
                >
                  {label?.[locale]}
                </NavigationMenuLink>
              </NavigationMenuItem>
            </motion.div>
          ))}
        </AnimatePresence>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
