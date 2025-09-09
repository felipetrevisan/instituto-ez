'use client'

import {
  MotionHighlight,
  MotionHighlightItem,
} from '@ez/shared/ui/animated/effects/motion-highlight'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@ez/shared/ui/navigation-menu'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@ez/shared/ui/select'
import { useApp } from '@ez/web/hooks/use-app'
import type { Navigation } from '@ez/web/types/site'
import { getLocalizedLink } from '@ez/web/utils/get-localized-link'
import { motion } from 'motion/react'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'

type NavigationProps = {
  navigation?: Navigation
}

const MenuItemMotion = motion(NavigationMenuItem)

export const MobileNavigation = ({ navigation }: NavigationProps) => {
  const locale = useLocale()
  const { isMenuActive } = useApp()

  const t = useTranslations('Languages')

  const handleChange = (lang: string) => {
    redirect(`/${lang}`)
  }

  return (
    <NavigationMenu className="mx-auto flex w-full lg:hidden lg:items-start" orientation="vertical">
      <NavigationMenuList>
        <NavigationMenuItem>
          <Select defaultValue={locale} onValueChange={handleChange}>
            <SelectTrigger className="max-w-max p-2">
              <SelectValue placeholder={t('placeholder')} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="pt">
                  <Image
                    alt=""
                    className="size-8"
                    height={32}
                    src="/assets/images/flags/brazil.png"
                    width={32}
                  />
                </SelectItem>
                <SelectItem value="en">
                  <Image
                    alt=""
                    className="size-8"
                    height={32}
                    src="/assets/images/flags/usa.png"
                    width={32}
                  />
                </SelectItem>
                <SelectItem value="es">
                  <Image
                    alt=""
                    className="size-8"
                    height={32}
                    src="/assets/images/flags/euro.png"
                    width={32}
                  />
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </NavigationMenuItem>
      </NavigationMenuList>
      <NavigationMenuList className="items-end">
        <MotionHighlight
          className="flex flex-col border-b-2 border-b-primary bg-transparent text-primary"
          containerClassName="flex flex-col justify-center items-center"
          controlledItems
          hover
          mode="parent"
        >
          {navigation?.items?.map(({ id, label, url }) => (
            <MenuItemMotion data-value={id} key={id}>
              <MotionHighlightItem activeClassName="border-b-primary text-primary p-4">
                <NavigationMenuLink
                  className="hover:after:animation-pulse after:-bottom-1 after:-translate-x-1/2 relative after:absolute after:left-1/2 after:h-[2px] after:w-0 after:rounded-xl after:bg-primary-foreground after:transition-all hover:after:w-full hover:after:shadow-xl"
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
              </MotionHighlightItem>
            </MenuItemMotion>
          ))}
        </MotionHighlight>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
