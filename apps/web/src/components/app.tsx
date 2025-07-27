'use client'

import { useShared } from '@ez/shared/hooks/use-shared'
import { MailIcon } from '@ez/shared/icons'
import { cn } from '@ez/shared/lib/utils'
import { getImageUrlBuilder } from '@ez/shared/sanity/image'
import { IconButton } from '@ez/shared/ui/animated/button-icon'
import { Dialog } from '@ez/shared/ui/dialog'
import * as Navbar from '@ez/web/components/ui/navbar'
import { menuListVariants, sidebarVariants } from '@ez/web/config/animation'
import { urlForImage } from '@ez/web/config/image'
import { useApp } from '@ez/web/hooks/use-app'
import { useDimensions } from '@ez/web/hooks/use-dimension'
import { useSite } from '@ez/web/hooks/use-site'
import type { Site } from '@ez/web/types/site'
import { motion, useAnimation, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { Fragment, useEffect, useRef, useState } from 'react'
import { env } from '../config/env'
import { ContactFormDialog } from './contact-form-dialog'
import { Logo } from './logo'
import { DesktopNavigation, DesktopNavigationSkeleton } from './navigation/desktop-navigation'
import { MobileNavigation } from './navigation/mobile-navigation'

const MotionMobileNavigation = motion(MobileNavigation)

type HeaderProps = {
  data: Site
} & React.ComponentProps<'div'>

function Header({ className, data }: HeaderProps) {
  const [currentScrollY, setCurrentScrollY] = useState(0)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const { height } = useDimensions(containerRef)
  const { isMenuOpen } = useApp()
  const { scrollY } = useScroll()

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
        'fixed z-90 top-0 w-full backdrop-blur-md transition-colors duration-500 bg-transparent h-20',
        {
          'bg-white/90 backdrop-blur-3xl shadow-2xl': currentScrollY > 80,
          'backdrop-blur-none': currentScrollY < 80,
        },
        className,
      )}
      {...(isMenuOpen && { 'data-menu-open': true })}
    >
      <Navbar.Root
        sticky
        style={{
          paddingTop: paddingHeaderY,
          paddingBottom: paddingHeaderY,
        }}
      >
        <Fragment>
          <Navbar.Brand>
            <Logo src={data?.logo && urlForImage(data.logo?.asset).url()} />
          </Navbar.Brand>
          <motion.div animate={isMenuOpen ? 'open' : 'closed'} custom={height} ref={containerRef}>
            <Navbar.Toggle />
            {!data ? (
              <DesktopNavigationSkeleton />
            ) : (
              <DesktopNavigation navigation={data?.primaryNavigation} />
            )}
            <motion.div
              className="fixed z-90 top-0 right-0 w-[300px] h-screen bg-slate-200/90 backdrop-blur-3xl lg:hidden"
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
          </motion.div>
        </Fragment>
      </Navbar.Root>
    </motion.header>
  )
}

function Content({ className, children }: React.ComponentProps<'div'>) {
  const { isMenuOpen } = useApp()
  const { isContactDialogOpen } = useShared()

  return (
    <motion.main
      className={cn(
        'mt-24 container relative h-full flex items-center flex-col justify-center',
        {
          'before:backdrop-blur-xl before:absolute before:w-full before:h-full before:bg-white/50 before:z-50':
            isMenuOpen,
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
  const { data } = useSite()

  const { urlForImage } = getImageUrlBuilder({
    projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  })

  return (
    <footer
      className={cn('flex flex-col w-full select-none items-center p-5 relative mt-24', className)}
    >
      <div className="fixed bottom-4 right-10 z-50 flex flex-row items-center gap-4">
        <IconButton
          icon={MailIcon}
          onClick={() => setIsContactDialogOpen(true)}
          size="lg"
          whileHover={{ scale: 1.4 }}
          whileTap={{ scale: 1.4 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        />
      </div>
      <div className="container flex flex-row gap-4 items-center justify-center w-full">
        <div className="flex flex-col justify-center items-center gap-4">
          <Logo
            src={data?.logo && urlForImage(data.logo?.asset).url()}
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
      className={cn('w-full flex flex-col justify-center items-center font-oswald', className)}
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
