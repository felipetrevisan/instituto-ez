'use client'

import { cn } from '@ez/shared/lib/utils'
import { LinkType } from '@ez/shared/types/global'
import {
  MotionHighlight,
  MotionHighlightItem,
} from '@ez/shared/ui/animated/effects/motion-highlight'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@ez/shared/ui/navigation-menu'
import { ComingSoonRibbon } from '@ez/web/components/ui/coming-soon-ribbon'
import { FadeIn } from '@ez/web/components/ui/fade-in'
import { useApp } from '@ez/web/hooks/use-app'
import type { Navigation, NavigationItem, NavigationItemURL } from '@ez/web/types/site'
import { getLocalizedLink } from '@ez/web/utils/get-localized-link'
import { navigateToHash, scrollToId } from '@ez/web/utils/scroll-to-id'
import { motion } from 'motion/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'
import type { MouseEvent, ReactNode } from 'react'

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
  linkClassName = 'relative flex flex-col rounded-xl bg-transparent p-4 text-primary dark:text-accent text-xl outline-none transition-all hover:text-primary dark:hover:text-accent focus:bg-transparent focus:text-primary dark:focus:text-accent focus-visible:outline-1 focus-visible:ring-[3px] focus-visible:ring-ring/50 data-[active=true]:text-primary dark:data-[active=true]:text-accent lg:gap-1 lg:text-sm! whitespace-nowrap [&_svg:not([class*="size-"])]:size-4',
  activeClassName = '',
  additionalContent,
}: BaseDesktopNavigationProps) {
  const locale = useLocale()
  const router = useRouter()
  const { isMenuActive } = useApp()

  const getHash = (raw?: string) => {
    if (!raw) return '#'
    return raw.startsWith('#') ? raw : `#${raw}`
  }

  const isHashLink = (url?: NavigationItemURL) => String(url?.type) === 'HASH'

  const getHref = (url?: NavigationItemURL) => {
    if (!url) return '#'
    if (isHashLink(url)) {
      return getHash(url.link?.[locale]?.current ?? url.link)
    }
    return getLocalizedLink(
      locale,
      url.link?.[locale]?.current ?? url.link,
      url.type === 'EXTERNAL',
      isHashLink(url),
    )
  }

  const getLabelText = (label?: Record<string, string>, fallback = '') =>
    label?.[locale] ?? label?.pt ?? label?.en ?? fallback

  const normalizeLabel = (value: string) => (value === 'Produtos Digitais' ? 'Ebooks' : value)

  const isDigitalGroupItem = (value: string) =>
    value === 'Masterclass' ||
    value === 'Produtos Digitais' ||
    value === 'Ebooks' ||
    value === 'Digital Products'

  const getSubmenuHref = (submenuUrl?: NavigationItemURL, parentUrl?: NavigationItemURL) => {
    if (!submenuUrl) return '#'
    if (isHashLink(submenuUrl)) {
      const hash = getHash(submenuUrl.link?.[locale]?.current ?? submenuUrl.link)
      if (!parentUrl) return hash
      const parentHref = getHref(parentUrl)
      if (
        !parentHref ||
        parentHref.startsWith('#') ||
        /^(https?:\/\/|mailto:|tel:)/i.test(parentHref)
      ) {
        return hash
      }
      return `${parentHref}${hash}`
    }
    return getHref(submenuUrl)
  }

  const handleHashClick = (
    event: MouseEvent<HTMLAnchorElement>,
    url?: NavigationItemURL,
    href?: string,
  ) => {
    if (!url) return
    if (isHashLink(url) && href?.startsWith('#')) {
      navigateToHash(event, url)
    }
  }

  const handleTriggerClick = (event: MouseEvent<HTMLButtonElement>, url?: NavigationItemURL) => {
    if (!url) return
    const href = getHref(url)
    if (!href || href === '#') return

    if (href.startsWith('#')) {
      event.preventDefault()
      scrollToId(href.replace('#', ''))
      return
    }

    if (url.type === LinkType.DIALOG) return

    if (
      url.type === LinkType.EXTERNAL ||
      url.isExternal ||
      /^(https?:\/\/|mailto:|tel:)/i.test(href)
    ) {
      event.preventDefault()
      if (url.isExternal) {
        window.open(href, '_blank', 'noopener,noreferrer')
      } else {
        window.location.href = href
      }
      return
    }

    router.push(href)
  }

  const isItemActive = (item: NavigationItem, parentUrl?: NavigationItemURL) =>
    isMenuActive(getSubmenuHref(item.url, parentUrl))

  const submenuLinkClassName =
    'block cursor-pointer rounded-lg px-3 py-2 text-sm text-foreground/80 transition-colors hover:bg-accent/10 hover:text-accent'

  const isEntryActive = (entry: NavigationItem) => {
    if (entry.submenuItems?.length) {
      return entry.submenuItems.some((item) => isItemActive(item, entry.url))
    }
    return isMenuActive(getHref(entry.url))
  }

  const activeId = navigation?.items?.find((item) => isEntryActive(item))?.id ?? null
  const items = navigation?.items ?? []
  const isGroupedDigitalNavigationItem = (item: NavigationItem) =>
    isDigitalGroupItem(getLabelText(item.label, item.id))
  const digitalItems = items.filter((item) => isDigitalGroupItem(getLabelText(item.label, item.id)))
  const hasDigitalGroup = digitalItems.length >= 2
  const digitalGroupComingSoon =
    hasDigitalGroup &&
    digitalItems.some((item) => item.comingSoon || item.submenuItems?.some((sub) => sub.comingSoon))
  const firstDigitalItemId = hasDigitalGroup ? digitalItems[0]?.id : undefined
  const digitalIndexes = items
    .map((item, index) => (isGroupedDigitalNavigationItem(item) ? index : -1))
    .filter((index) => index >= 0)
  const areDigitalItemsContiguous = digitalIndexes.every(
    (index, idx) => idx === 0 || index === digitalIndexes[idx - 1] + 1,
  )
  const firstDigitalIndex = digitalIndexes[0] ?? -1
  const lastDigitalIndex = digitalIndexes[digitalIndexes.length - 1] ?? -1

  const renderEntry = (
    { id, label, url, submenuItems, comingSoon }: NavigationItem,
    options?: { forceComingSoon?: boolean; hideComingSoonBadge?: boolean },
  ) => {
    const hasSubmenu = !!submenuItems?.length
    const itemComingSoon = options?.forceComingSoon || Boolean(comingSoon)
    const isActive = hasSubmenu
      ? submenuItems.some((item) => isItemActive(item, url))
      : isMenuActive(getHref(url))
    const rawLabel = getLabelText(label, id)
    const displayLabel = normalizeLabel(rawLabel)
    const triggerUrl = url ?? submenuItems?.[0]?.url

    return (
      <MenuItemMotion data-value={id} key={id}>
        <MotionHighlightItem activeClassName={activeClassName}>
          {hasSubmenu ? (
            <div className="relative inline-flex">
              <NavigationMenuTrigger
                className={cn(
                  `${linkClassName} h-auto flex-row items-center gap-2 bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent`,
                  itemComingSoon && 'pointer-events-none cursor-not-allowed opacity-45',
                )}
                data-active={!itemComingSoon && isActive}
                onClick={(event) => {
                  if (itemComingSoon) {
                    event.preventDefault()
                    return
                  }
                  handleTriggerClick(event, triggerUrl)
                }}
              >
                {displayLabel}
              </NavigationMenuTrigger>
              {itemComingSoon && !options?.hideComingSoonBadge && (
                <ComingSoonRibbon className="-right-2 -top-2 absolute scale-90" />
              )}
            </div>
          ) : (
            <div className="relative inline-flex">
              {itemComingSoon ? (
                <span
                  aria-disabled
                  className={cn(linkClassName, 'cursor-not-allowed opacity-45')}
                  data-slot="navigation-menu-link"
                >
                  {displayLabel}
                </span>
              ) : (
                <Link
                  className={linkClassName}
                  data-active={isActive}
                  data-slot="navigation-menu-link"
                  href={getHref(url)}
                  onClick={(event) => handleHashClick(event, url, getHref(url))}
                  rel={url?.isExternal ? 'noopener noreferrer' : undefined}
                  target={url?.isExternal ? '_blank' : undefined}
                >
                  {displayLabel}
                </Link>
              )}
              {itemComingSoon && !options?.hideComingSoonBadge && (
                <ComingSoonRibbon className="-right-2 -top-2 absolute scale-90" />
              )}
            </div>
          )}
        </MotionHighlightItem>
        {hasSubmenu && !itemComingSoon && (
          <NavigationMenuContent className="border-none bg-transparent p-2 shadow-none">
            <MotionHighlight className="rounded-lg bg-accent/10" hover>
              <ul className="min-w-[220px] space-y-1 p-2">
                {submenuItems.map((submenuItem) => (
                  <MotionHighlightItem asChild key={submenuItem.id}>
                    <li className="relative cursor-pointer">
                      {submenuItem.comingSoon ? (
                        <span
                          aria-disabled
                          className={cn(
                            submenuLinkClassName,
                            'flex cursor-not-allowed items-center justify-between gap-2 opacity-45',
                          )}
                        >
                          {normalizeLabel(getLabelText(submenuItem.label, submenuItem.id))}
                          <ComingSoonRibbon className="scale-75" />
                        </span>
                      ) : (
                        <NavigationMenuLink asChild>
                          <Link
                            className={submenuLinkClassName}
                            data-active={isMenuActive(getSubmenuHref(submenuItem.url, url))}
                            href={getSubmenuHref(submenuItem.url, url)}
                            onClick={(event) =>
                              handleHashClick(
                                event,
                                submenuItem.url,
                                getSubmenuHref(submenuItem.url, url),
                              )
                            }
                            rel={submenuItem.url?.isExternal ? 'noopener noreferrer' : undefined}
                            target={submenuItem.url?.isExternal ? '_blank' : undefined}
                          >
                            {normalizeLabel(getLabelText(submenuItem.label, submenuItem.id))}
                          </Link>
                        </NavigationMenuLink>
                      )}
                    </li>
                  </MotionHighlightItem>
                ))}
              </ul>
            </MotionHighlight>
          </NavigationMenuContent>
        )}
      </MenuItemMotion>
    )
  }

  const navigationEntries: ReactNode[] = []

  items.forEach((item, index) => {
    const isGroupedDigitalItem = isGroupedDigitalNavigationItem(item)

    if (hasDigitalGroup && areDigitalItemsContiguous && index === firstDigitalIndex) {
      const groupedItems = items
        .slice(firstDigitalIndex, lastDigitalIndex + 1)
        .filter(isGroupedDigitalNavigationItem)

      navigationEntries.push(
        <div
          className={cn(
            'relative inline-flex items-center gap-1',
            digitalGroupComingSoon && 'opacity-70',
          )}
          key="digital-products-group"
        >
          <span className="-translate-x-1/2 -top-0.5 absolute left-1/2 whitespace-nowrap font-extrabold text-[10px] text-muted-foreground uppercase tracking-[0.3em]">
            Produtos Digitais
          </span>
          {digitalGroupComingSoon && (
            <ComingSoonRibbon className="-translate-x-1/2 -bottom-4 pointer-events-none absolute left-1/2 scale-90" />
          )}
          {groupedItems.map((groupedItem) =>
            renderEntry(groupedItem, {
              forceComingSoon: digitalGroupComingSoon,
              hideComingSoonBadge: digitalGroupComingSoon,
            }),
          )}
        </div>,
      )
      return
    }

    if (
      hasDigitalGroup &&
      areDigitalItemsContiguous &&
      index > firstDigitalIndex &&
      index <= lastDigitalIndex &&
      isGroupedDigitalItem
    ) {
      return
    }

    navigationEntries.push(
      renderEntry(item, {
        forceComingSoon: digitalGroupComingSoon && isGroupedDigitalItem,
        hideComingSoonBadge:
          digitalGroupComingSoon && isGroupedDigitalItem && item.id !== firstDigitalItemId,
      }),
    )
  })

  return (
    <div className="flex items-center gap-4 lg:flex-nowrap">
      <FadeIn>
        <NavigationMenu className="hidden lg:flex" viewport={false}>
          <NavigationMenuList className="space-x-0">
            <MotionHighlight
              className={highlightClassName}
              containerClassName="flex items-center justify-center gap-x-2"
              controlledItems
              hover={!activeId}
              mode="parent"
              value={activeId}
            >
              {navigationEntries}
            </MotionHighlight>
          </NavigationMenuList>
        </NavigationMenu>
      </FadeIn>
      {additionalContent && (
        <FadeIn className="shrink-0" delay={0.05}>
          {additionalContent}
        </FadeIn>
      )}
    </div>
  )
}
