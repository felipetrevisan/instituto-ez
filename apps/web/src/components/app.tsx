'use client'

import { useShared } from '@ez/shared/hooks/use-shared'
import { MailIcon } from '@ez/shared/icons'
import { cn } from '@ez/shared/lib/utils'
import { getImageUrlBuilder } from '@ez/shared/sanity/image'
import { IconButton } from '@ez/shared/ui/animated/button/icon-button'
import { Dialog } from '@ez/shared/ui/dialog'
import * as Navbar from '@ez/web/components/ui/navbar'
import { menuListVariants, sidebarVariants } from '@ez/web/config/animation'
import { env } from '@ez/web/config/env'
import { urlForImage } from '@ez/web/config/image'
import { useApp } from '@ez/web/hooks/use-app'
import { useDimensions } from '@ez/web/hooks/use-dimension'
import { useIsMobile } from '@ez/web/hooks/use-mobile'
import { useSite } from '@ez/web/hooks/use-site'
import type { Site } from '@ez/web/types/site'
import { motion, useAnimation, useMotionValueEvent, useScroll, useTransform } from 'motion/react'
import Link from 'next/link'
import { Fragment, useEffect, useRef, useState } from 'react'
import { ContactFormDialog } from './contact-form-dialog'
import { Logo } from './logo'
import { DesktopNavigation } from './navigation/desktop-navigation'
import { MobileNavigation } from './navigation/mobile-navigation'

const MotionMobileNavigation = motion(MobileNavigation)

type HeaderProps = {
  data: Site
} & React.ComponentProps<'div'>

function Header({ className, data }: HeaderProps) {
  const [currentScrollY, setCurrentScrollY] = useState(0)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const { height } = useDimensions(containerRef)
  const { isMenuOpen, isNormalPage } = useApp()
  const { scrollY } = useScroll()
  const isMobile = useIsMobile(640)

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

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  return (
    <motion.header
      className={cn(
        'h-20 w-full bg-transparent backdrop-blur-md transition-colors duration-500',
        {
          'bg-white/90 shadow-md backdrop-blur-3xl': currentScrollY > 80,
          'backdrop-blur-none': currentScrollY < 80,
          'fixed top-0 z-90': isNormalPage(),
        },
        className,
      )}
      {...(isMenuOpen && { 'data-menu-open': true })}
    >
      <Navbar.Root
        sticky={isNormalPage()}
        style={{
          paddingTop: paddingHeaderY,
          paddingBottom: paddingHeaderY,
        }}
      >
        <Fragment>
          <Navbar.Brand>
            <Logo
              src={data?.logo && urlForImage(data.logo?.asset).format('webp').quality(80).url()}
            />
          </Navbar.Brand>
          <motion.div animate={isMenuOpen ? 'open' : 'closed'} custom={height} ref={containerRef}>
            {isMobile && (
              <>
                <Navbar.Toggle />
                <motion.div
                  className="fixed top-0 right-0 z-90 h-screen w-[300px] bg-slate-200/90 backdrop-blur-3xl lg:hidden"
                  variants={sidebarVariants}
                  initial="closed"
                  animate={isMenuOpen ? 'open' : 'closed'}
                >
                  <MotionMobileNavigation
                    navigation={data?.primaryNavigation}
                    variants={menuListVariants}
                    animate={isMenuOpen ? 'open' : 'closed'}
                  />
                </motion.div>
              </>
            )}

            {!isMobile && <DesktopNavigation navigation={data?.primaryNavigation} />}
          </motion.div>
        </Fragment>
      </Navbar.Root>
    </motion.header>
  )
}

function Content({ className, children }: React.ComponentProps<'div'>) {
  const { isMenuOpen, isNormalPage } = useApp()
  const { isContactDialogOpen } = useShared()

  return (
    <motion.main
      className={cn(
        'container relative flex h-full max-w-8xl flex-col items-center justify-center',
        {
          'before:absolute before:z-50 before:h-full before:w-full before:bg-white/50 before:backdrop-blur-xl':
            isMenuOpen,
          'mt-24': isNormalPage(),
          'mt-4': !isNormalPage(),
        },
        className,
      )}
    >
      {children}
      <Dialog open={isContactDialogOpen}>{isContactDialogOpen && <ContactFormDialog />}</Dialog>
    </motion.main>
  )
}

function Footer({ className }: React.ComponentProps<'div'>) {
  const { setIsContactDialogOpen } = useShared()
  const { isLandingPage } = useApp()
  const { data } = useSite()

  const { urlForImage } = getImageUrlBuilder({
    projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  })

  return (
    <footer
      className={cn('relative mt-24 flex w-full select-none flex-col items-center p-5', className)}
    >
      {!isLandingPage() && (
        <div className="fixed right-10 bottom-4 z-50 flex flex-row items-center gap-4">
          <IconButton
            icon={MailIcon}
            onClick={() => setIsContactDialogOpen(true)}
            size="lg"
            theme="secondary"
            whileHover={{ scale: 1.4 }}
            whileTap={{ scale: 1.4 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          />
        </div>
      )}
      <div className="container flex w-full flex-row items-center justify-center gap-4">
        <div className="flex flex-col items-center justify-center gap-4">
          <Logo
            src={data?.logo && urlForImage(data.logo?.asset).format('webp').quality(80).url()}
            showSlogan={false}
            linkable={false}
          />
          <p className="text-center text-primary text-opacity-75">
            © {new Date().getFullYear()} - Todos os direitos reservados
          </p>
        </div>
      </div>
    </footer>
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
        <Link href={href} passHref aria-disabled={disabled} className={className} {...props}>
          {children}
        </Link>
      )}
      {!href && <div className={className}>{children}</div>}
    </>
  )
}

export { Header, Content, Footer, PageHeader, ButtonLink }
