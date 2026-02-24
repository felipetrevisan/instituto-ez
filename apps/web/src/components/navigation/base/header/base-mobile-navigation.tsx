'use client'

import { cn } from '@ez/shared/lib/utils'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@ez/shared/ui/accordion'
import { ComingSoonRibbon } from '@ez/web/components/ui/coming-soon-ribbon'
import { FadeIn } from '@ez/web/components/ui/fade-in'
import { menuItemVariants, menuListVariants } from '@ez/web/config/animation'
import { useApp } from '@ez/web/hooks/use-app'
import type { Navigation, NavigationItem, NavigationItemURL } from '@ez/web/types/site'
import { getLocalizedLink } from '@ez/web/utils/get-localized-link'
import { navigateToHash } from '@ez/web/utils/scroll-to-id'
import { motion } from 'motion/react'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import type { MouseEvent, ReactNode } from 'react'

type BaseMobileNavigationProps = {
  navigation?: Navigation
  /**
   * Classes CSS customizadas para o nav
   */
  navClassName?: string
  /**
   * Classes CSS customizadas para os links
   */
  linkClassName?: string
  /**
   * Componente adicional renderizado após os links (ex: botão de contato)
   */
  additionalContent?: ReactNode
}

export function BaseMobileNavigation({
  navigation,
  navClassName = 'fixed top-[80px] z-90 w-full divide-y divide-primary/5 border-border/40 border-t bg-background/90 backdrop-blur-2xl',
  linkClassName = 'w-full px-4 py-3 text-center font-medium text-base text-foreground/80 transition-colors hover:bg-accent/10 hover:text-accent',
  additionalContent,
}: BaseMobileNavigationProps) {
  const locale = useLocale()
  const { isMenuActive, setIsMenuOpen } = useApp()

  const getHash = (raw?: string) => {
    if (!raw) return undefined
    return raw.startsWith('#') ? raw : `#${raw}`
  }

  const isHashLink = (url?: NavigationItemURL) => String(url?.type) === 'HASH'

  const getLinkValue = (url?: NavigationItemURL) => {
    const link = url?.link
    if (!link) return undefined
    if (typeof link === 'string') return link
    return link?.[locale]?.current
  }

  const getLabelText = (label?: Record<string, string>, fallback = '') =>
    label?.[locale] ?? label?.pt ?? label?.en ?? fallback

  const normalizeLabel = (value: string) => (value === 'Produtos Digitais' ? 'Ebooks' : value)
  const isDigitalGroupItem = (value: string) =>
    value === 'Masterclass' ||
    value === 'Produtos Digitais' ||
    value === 'Ebooks' ||
    value === 'Digital Products'

  const getHref = (url?: NavigationItemURL) => {
    const linkValue = getLinkValue(url)
    if (!url || !linkValue) return '#'
    const normalized = isHashLink(url) ? (getHash(linkValue) ?? '#') : linkValue
    return getLocalizedLink(locale, normalized, url.type === 'EXTERNAL', isHashLink(url))
  }

  const getSubmenuHref = (submenuUrl?: NavigationItemURL, parentUrl?: NavigationItemURL) => {
    if (!submenuUrl) return '#'
    if (!isHashLink(submenuUrl)) return getHref(submenuUrl)

    const parentHref = getHref(parentUrl)
    const hash = getHash(getLinkValue(submenuUrl))
    return parentHref && hash ? `${parentHref}${hash}` : (hash ?? '#')
  }

  const handleLinkClick = (
    e: MouseEvent<HTMLAnchorElement>,
    url?: NavigationItemURL,
    href?: string,
  ) => {
    setIsMenuOpen(false)
    if (!url) return
    if (isHashLink(url) && href?.startsWith('#')) {
      navigateToHash(e, url)
    }
  }

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

  return (
    <motion.nav
      animate="open"
      className={navClassName}
      initial="closed"
      variants={menuListVariants}
    >
      {items.map(({ id, label, url, submenuItems, comingSoon }: NavigationItem) => {
        const hasSubmenu = !!submenuItems?.length
        const displayLabel = normalizeLabel(getLabelText(label, id))
        const isGroupedDigitalItem = isDigitalGroupItem(displayLabel)
        const showDigitalGroupLabel =
          hasDigitalGroup &&
          areDigitalItemsContiguous &&
          isGroupedDigitalItem &&
          id === firstDigitalItemId
        const itemComingSoon =
          (digitalGroupComingSoon && isDigitalGroupItem(displayLabel)) || Boolean(comingSoon)
        const showCenteredGroupedBadge = showDigitalGroupLabel && digitalGroupComingSoon
        const showComingSoonBadge =
          itemComingSoon && (!digitalGroupComingSoon || id === firstDigitalItemId)

        if (!hasSubmenu) {
          return (
            <motion.div
              className="relative flex w-full flex-col"
              key={id}
              variants={menuItemVariants}
            >
              {showDigitalGroupLabel && (
                <div className="pt-3 pb-1 text-center">
                  <span className="font-extrabold text-[10px] text-muted-foreground uppercase tracking-[0.3em]">
                    Produtos Digitais
                  </span>
                </div>
              )}
              <div className="relative flex w-full items-center justify-center">
                {itemComingSoon ? (
                  <span
                    aria-disabled
                    className={cn(linkClassName, 'cursor-not-allowed opacity-45')}
                  >
                    {displayLabel}
                  </span>
                ) : (
                  <Link
                    className={linkClassName}
                    data-active={isMenuActive(getHref(url))}
                    href={getHref(url)}
                    onClick={(event) => handleLinkClick(event, url, getHref(url))}
                    rel={url?.isExternal ? 'noopener noreferrer' : undefined}
                    target={url?.isExternal ? '_blank' : undefined}
                  >
                    {displayLabel}
                  </Link>
                )}
                {showComingSoonBadge && !showCenteredGroupedBadge && (
                  <ComingSoonRibbon className="absolute right-4 scale-75" />
                )}
              </div>
              {showCenteredGroupedBadge && (
                <ComingSoonRibbon className="-translate-x-1/2 -bottom-3 pointer-events-none absolute left-1/2 z-10 scale-75" />
              )}
            </motion.div>
          )
        }

        return (
          <motion.div
            className="relative flex w-full flex-col"
            key={id}
            variants={menuItemVariants}
          >
            {showDigitalGroupLabel && (
              <div className="pt-3 pb-1 text-center">
                <span className="font-extrabold text-[10px] text-muted-foreground uppercase tracking-[0.3em]">
                  Produtos Digitais
                </span>
              </div>
            )}
            <Accordion className="w-full" collapsible type="single">
              <AccordionItem
                className="mb-0 border-none shadow-none backdrop-blur-none"
                value={`mobile-nav-${id}`}
              >
                <AccordionTrigger
                  className={cn(
                    'justify-center px-4 py-3 text-center font-medium text-base text-foreground/80 hover:text-accent',
                    itemComingSoon && 'pointer-events-none cursor-not-allowed opacity-45',
                  )}
                >
                  {displayLabel}
                </AccordionTrigger>
                {showComingSoonBadge && !showCenteredGroupedBadge && (
                  <div className="flex justify-center pb-2">
                    <ComingSoonRibbon className="scale-75" />
                  </div>
                )}
                <AccordionContent className="pb-0">
                  <div className="flex flex-col border-primary/5 border-t">
                    {submenuItems?.map((submenuItem) => {
                      const submenuComingSoon =
                        Boolean(submenuItem.comingSoon) ||
                        (itemComingSoon && !digitalGroupComingSoon)

                      return (
                        <div
                          className="relative flex items-center justify-center"
                          key={submenuItem.id}
                        >
                          {submenuComingSoon ? (
                            <span className="w-full cursor-not-allowed px-6 py-2 text-center text-foreground/70 text-sm opacity-45">
                              {normalizeLabel(getLabelText(submenuItem.label, submenuItem.id))}
                            </span>
                          ) : (
                            <Link
                              className="w-full px-6 py-2 text-center text-foreground/70 text-sm transition-colors hover:text-accent"
                              data-active={isMenuActive(getSubmenuHref(submenuItem.url, url))}
                              href={getSubmenuHref(submenuItem.url, url)}
                              onClick={(event) =>
                                handleLinkClick(
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
                          )}
                          {submenuComingSoon && (
                            <ComingSoonRibbon className="absolute right-2 scale-[0.65]" />
                          )}
                        </div>
                      )
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            {showCenteredGroupedBadge && (
              <ComingSoonRibbon className="-translate-x-1/2 -bottom-3 pointer-events-none absolute left-1/2 z-10 scale-75" />
            )}
          </motion.div>
        )
      })}
      {additionalContent && (
        <motion.div variants={menuItemVariants}>
          <FadeIn delay={0.1}>{additionalContent}</FadeIn>
        </motion.div>
      )}
    </motion.nav>
  )
}
