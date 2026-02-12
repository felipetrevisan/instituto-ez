'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@ez/shared/ui/accordion'
import { FadeIn } from '@ez/web/components/ui/fade-in'
import { menuItemVariants, menuListVariants } from '@ez/web/config/animation'
import { useApp } from '@ez/web/hooks/use-app'
import type { Navigation, NavigationItemURL } from '@ez/web/types/site'
import { getLocalizedLink } from '@ez/web/utils/get-localized-link'
import { navigateToHash } from '@ez/web/utils/scroll-to-id'
import { motion } from 'motion/react'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import type { ReactNode } from 'react'

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
    e: React.MouseEvent<HTMLAnchorElement>,
    url?: NavigationItemURL,
    href?: string,
  ) => {
    setIsMenuOpen(false)
    if (!url) return
    if (isHashLink(url) && href?.startsWith('#')) {
      navigateToHash(e, url)
    }
  }

  return (
    <motion.nav
      animate="open"
      className={navClassName}
      initial="closed"
      variants={menuListVariants}
    >
      {navigation?.items?.map(({ id, label, url, submenuItems }) => {
        const hasSubmenu = !!submenuItems?.length
        const displayLabel = normalizeLabel(getLabelText(label, id))

        if (!hasSubmenu) {
          return (
            <motion.div className="flex w-full" key={id} variants={menuItemVariants}>
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
            </motion.div>
          )
        }

        return (
          <motion.div className="flex w-full flex-col" key={id} variants={menuItemVariants}>
            <Accordion className="w-full" collapsible type="single">
              <AccordionItem
                className="mb-0 border-none shadow-none backdrop-blur-none"
                value={`mobile-nav-${id}`}
              >
                <AccordionTrigger className="justify-center px-4 py-3 text-center font-medium text-base text-foreground/80 hover:text-accent">
                  {displayLabel}
                </AccordionTrigger>
                <AccordionContent className="pb-0">
                  <div className="flex flex-col border-primary/5 border-t">
                    {submenuItems?.map((submenuItem) => (
                      <Link
                        className="w-full px-6 py-2 text-center text-foreground/70 text-sm transition-colors hover:text-accent"
                        data-active={isMenuActive(getSubmenuHref(submenuItem.url, url))}
                        href={getSubmenuHref(submenuItem.url, url)}
                        key={submenuItem.id}
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
                        {normalizeLabel(
                          getLabelText(submenuItem.label, submenuItem.id),
                        )}
                      </Link>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
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
