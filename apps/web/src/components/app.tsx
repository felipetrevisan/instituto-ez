'use client'

import { useDeviceType } from '@ez/shared/hooks/use-media-query'
import { useShared } from '@ez/shared/hooks/use-shared'
import { MailIcon } from '@ez/shared/icons'
import { cn } from '@ez/shared/lib/utils'
import { getImageUrlBuilder } from '@ez/shared/sanity/image'
import { IconButton } from '@ez/shared/ui/animated/button/icon-button'
import { Dialog } from '@ez/shared/ui/dialog'

import { FooterNavigation } from '@ez/web/components/navigation/footer/footer'
import { HeaderNavigation } from '@ez/web/components/navigation/header/header'
import { NavigationRenderer } from '@ez/web/components/navigation/navigation-renderer'
import * as Navbar from '@ez/web/components/ui/navbar'
import { menuListVariants, sidebarVariants } from '@ez/web/config/animation'
import { env } from '@ez/web/config/env'
import { urlForImage } from '@ez/web/config/image'
import { useApp } from '@ez/web/hooks/use-app'
import { useBodyOverflow } from '@ez/web/hooks/use-body-overflow'
import { useDimensions } from '@ez/web/hooks/use-dimension'
import { useLandingConfig } from '@ez/web/hooks/use-landing-config'
import { useSite } from '@ez/web/hooks/use-site'
import type { Navigation, Site } from '@ez/web/types/site'
import { Mail, MapPin, Monitor, Moon, Phone, Sun } from 'lucide-react'
import {
  type HTMLMotionProps,
  motion,
  useAnimation,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'motion/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import { Fragment, useEffect, useRef, useState } from 'react'
import { ContactFormDialog } from './contact-form-dialog'
import { Logo } from './logo'
import { MainDesktopNavigation as HeaderDesktopNavigation } from './navigation/header/desktop-navigation'
import { MainMobileNavigation as HeaderMobileNavigation } from './navigation/header/mobile-navigation'

type HeaderProps = {
  data?: Site
  theme: 'default' | 'landing'
  pageKey?: string
  DesktopNavComponent?: React.ComponentType<{ navigation?: Navigation }>
  MobileNavComponent?: React.ComponentType<{ navigation?: Navigation }>
  HeaderComponent?: React.ComponentType<
    HTMLMotionProps<'header'> & { theme: 'default' | 'landing'; currentScrollY?: number }
  >
  customNavigation?: Navigation
} & React.ComponentProps<'div'>

function Header({
  className,
  data,
  theme,
  pageKey,
  customNavigation,
  DesktopNavComponent = HeaderDesktopNavigation,
  MobileNavComponent = HeaderMobileNavigation,
  HeaderComponent = HeaderNavigation,
}: HeaderProps) {
  const { isNormalPage, isLandingPage, isMenuOpen } = useApp()
  const router = useRouter()
  const [currentScrollY, setCurrentScrollY] = useState(0)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const { height } = useDimensions(containerRef)
  const { scrollY } = useScroll()
  const { isDesktop, isTablet, isMobile } = useDeviceType()
  const landing = useLandingConfig(pageKey)

  useBodyOverflow(isMenuOpen)

  const handleChange = (lang: string) => {
    router.push(`/${lang}`)
  }

  const scrollYRange = [0, 100, 100]

  const paddingHeaderY = useTransform(scrollY, scrollYRange, ['1.2rem', '1rem', '1rem'])

  const controls = useAnimation()
  const delta = useRef(0)
  const lastScrollY = useRef(0)

  useMotionValueEvent(scrollY, 'change', (val) => {
    const diff = Math.abs(val - lastScrollY.current)

    if (val >= lastScrollY.current) {
      delta.current = delta.current >= 10 ? 10 : delta.current + diff
    } else {
      delta.current = delta.current <= -10 ? -10 : delta.current - diff
    }

    if (delta.current >= 10 && val > 200) {
      controls.start('hidden')
    } else if (delta.current <= -10 || val < 200) {
      controls.start('visible')
    }

    lastScrollY.current = val
    setCurrentScrollY(val)
  })

  if (landing?.layout?.hideHeader) return null

  const DesktopNavigation = landing?.navigation?.header?.desktop ?? DesktopNavComponent
  const MobileNavigation = landing?.navigation?.header?.mobile ?? MobileNavComponent
  const MotionMobileNavigation = motion(MobileNavigation)

  return (
    <Fragment>
      <HeaderComponent className={className} currentScrollY={currentScrollY} theme={theme}>
        <Navbar.Root
          sticky={isNormalPage()}
          style={{
            paddingTop: paddingHeaderY,
            paddingBottom: paddingHeaderY,
          }}
          theme={theme}
        >
          <Navbar.Brand theme={theme}>
            <Logo
              src={data?.logo && urlForImage(data.logo?.asset).format('webp').quality(80).url()}
            />
          </Navbar.Brand>
          {isDesktop && data?.navigation?.header && (
            <NavigationRenderer
              Component={DesktopNavigation}
              navigation={customNavigation ?? data?.navigation.header}
            />
          )}
          <div className="flex flex-row items-center justify-center gap-2">
            {(isNormalPage() || isLandingPage()) && <ThemeToggle />}
            {!isDesktop && (isTablet || isMobile) && <Navbar.Toggle />}
            <Navbar.SelectLocale onChange={handleChange} />
          </div>
        </Navbar.Root>
      </HeaderComponent>
      <motion.div
        animate={isMenuOpen ? 'open' : 'closed'}
        className="flex gap-10"
        custom={height}
        initial="closed"
        ref={containerRef}
        variants={sidebarVariants}
      >
        {!isDesktop && (isTablet || isMobile) && (
          <MotionMobileNavigation
            animate={isMenuOpen ? 'open' : 'closed'}
            initial="closed"
            navigation={customNavigation ?? data?.navigation?.header}
            variants={menuListVariants}
          />
        )}
      </motion.div>
    </Fragment>
  )
}

function Content({ className, children }: React.ComponentProps<'div'>) {
  const { isNormalPage } = useApp()
  const { isContactDialogOpen } = useShared()
  const { data } = useSite()
  const t = useTranslations('DialogContact')

  return (
    <motion.main
      className={cn(
        'container relative flex h-full max-w-8xl flex-col items-center justify-center',
        {
          'mt-24': isNormalPage(),
        },
        className,
      )}
    >
      {children}
      {data && (
        <Dialog open={isContactDialogOpen}>
          <ContactFormDialog
            formRef={data.contact.form._ref}
            sendButtonLabel={t('sendButton')}
            title={t('title')}
          />
        </Dialog>
      )}
    </motion.main>
  )
}

type FooterNavProps = {
  navigation?: Navigation
}

type FooterProps = {
  theme: 'default' | 'landing'
  pageKey?: string
  data: Site
  DesktopNavComponent?: React.ComponentType<FooterNavProps>
  FooterComponent?: React.ComponentType<
    HTMLMotionProps<'footer'> & { theme: 'default' | 'landing' }
  >

  customNavigation?: Navigation
} & React.ComponentProps<'footer'>

function Footer({
  theme,
  pageKey,
  data,
  customNavigation,
  DesktopNavComponent,
  FooterComponent = FooterNavigation,
}: FooterProps) {
  const { setIsContactDialogOpen } = useShared()
  const locale = useLocale()
  const t = useTranslations('Global')

  const landing = useLandingConfig(pageKey)

  if (landing?.layout?.hideFooter) return null

  const { urlForImage } = getImageUrlBuilder({
    projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  })

  const DesktopNavigation = landing?.navigation?.footer?.desktop ?? DesktopNavComponent

  return (
    <FooterComponent theme={theme}>
      <div className="fixed right-10 bottom-4 z-50 flex flex-row items-center gap-4">
        <IconButton
          icon={MailIcon}
          onClick={() => setIsContactDialogOpen(true)}
          size="lg"
          theme="secondary"
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          whileHover={{ scale: 1.4 }}
          whileTap={{ scale: 1.4 }}
        />
      </div>
      <div className="container">
        <div className="grid justify-center gap-12 md:grid-cols-3">
          <div className="flex flex-col items-center gap-4">
            <Logo
              fill
              linkable={false}
              showSlogan={false}
              src={data?.logo && urlForImage(data.logo?.asset).format('webp').quality(80).url()}
            />
            <h3 className="mb-4 font-bold text-2xl">{data?.title[locale]}</h3>
            <p className="text-footer-foreground/80 text-sm leading-relaxed">
              {data?.description?.[locale]}
            </p>
          </div>

          <div className="flex flex-col items-center justify-center md:items-start">
            <h4 className="mb-4 font-semibold text-lg">Serviços</h4>
            {data?.navigation?.footer && (
              <NavigationRenderer
                Component={DesktopNavigation}
                navigation={customNavigation ?? data?.navigation.footer}
              />
            )}
          </div>

          <div className="flex flex-col items-center justify-center md:items-start">
            <h4 className="mb-4 font-semibold text-lg">Contato</h4>
            <ul className="space-y-3 text-footer-foreground/80 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="size-4 flex-shrink-0" />
                <a
                  className="transition-colors hover:text-accent"
                  href="mailto:contato@institutoez.com.br"
                >
                  {data?.contact.email}
                </a>
              </li>
              {data.contact.phone && (
                <li className="flex items-center gap-2">
                  <Phone className="size-4 flex-shrink-0" />
                  <span>{data.contact.phone}</span>
                </li>
              )}
              {data.contact.location && (
                <li className="flex items-start gap-2">
                  <MapPin className="mt-0.5 size-4 flex-shrink-0" />
                  <span>{data.contact.location}</span>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-primary-foreground/20 border-t pt-8 text-center text-footer-foreground/60 text-sm">
          <p>
            &copy; {new Date().getFullYear()} {data?.title[locale]}. {t('copyright')}
          </p>
        </div>
      </div>
    </FooterComponent>
  )
}

function PageHeader({
  className,
  children,
  ...props
}: React.ComponentProps<'div'> & {
  background?: string
}) {
  return (
    <div
      className={cn('flex w-full flex-col items-center justify-center font-oswald', className)}
      {...props}
    >
      {children}
    </div>
  )
}

function ButtonLink({
  className,
  children,
  href,
  disabled,
  ...props
}: React.ComponentProps<typeof Link> & {
  disabled?: boolean
}) {
  return (
    <>
      {href && (
        <Link aria-disabled={disabled} className={className} href={href} passHref {...props}>
          {children}
        </Link>
      )}
      {!href && <div className={className}>{children}</div>}
    </>
  )
}

function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  const current = theme === 'system' ? systemTheme : theme
  const nextTheme = theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light'
  const icon = theme === 'system' ? Monitor : current === 'light' ? Sun : Moon

  return (
    <IconButton
      aria-label="Toggle theme"
      className="flex items-center justify-center bg-transparent p-2 text-foreground hover:bg-background hover:text-foreground"
      icon={icon}
      onClick={() => setTheme(nextTheme)}
    />
  )
}

export { Header, Content, Footer, PageHeader, ButtonLink, ThemeToggle }
