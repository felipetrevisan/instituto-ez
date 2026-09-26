'use client'

import { mainNav } from '@ez/web/content/site'
import { useSiteSettings } from '@ez/web/hooks/use-site-settings'
import { cn } from '@ez/web/lib/utils'
import { ChevronDown, Menu, X } from 'lucide-react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'motion/react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { ContactButton } from './contact'
import { LocalLink, useBarePathname } from './local-link'

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

function Brand() {
  const site = useSiteSettings()
  return (
    <LocalLink
      aria-label={`${site.name} — Home`}
      className="group flex items-center gap-3"
      href="/"
    >
      <span className="relative grid size-10 place-items-center overflow-hidden rounded-full ring-1 ring-white/15 transition group-hover:ring-[color:var(--accent)]">
        <Image
          alt=""
          className="size-full object-cover"
          height={40}
          priority
          src={site.logo}
          unoptimized
          width={40}
        />
      </span>
      <span className="flex flex-col leading-none">
        <span className="ez-display font-semibold text-[15px] text-white tracking-tight">
          {site.name}
        </span>
        <span className="mt-1 text-[10px] text-white/50 uppercase tracking-[0.22em]">
          {site.slogan}
        </span>
      </span>
    </LocalLink>
  )
}

export function Header() {
  const pathname = useBarePathname()
  const [open, setOpen] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY, scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })

  useMotionValueEvent(scrollY, 'change', (value) => {
    const previous = scrollY.getPrevious() ?? 0
    setScrolled(value > 24)
    setHidden(value > 320 && value > previous && !mobileOpen)
  })

  // biome-ignore lint/correctness/useExhaustiveDependencies: fecha menus ao trocar de rota
  useEffect(() => {
    setMobileOpen(false)
    setOpen(null)
  }, [pathname])

  useEffect(() => {
    document.documentElement.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <>
      <motion.header
        animate={{ y: hidden ? -120 : 0 }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4"
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className={cn(
            'relative mx-auto flex max-w-[1400px] items-center justify-between gap-4 rounded-full border px-3 py-2 pl-3 transition-all duration-500 sm:px-4',
            scrolled
              ? 'border-white/10 bg-[#070b1a]/70 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.9)] backdrop-blur-xl'
              : 'border-transparent bg-transparent',
          )}
        >
          <Brand />

          <nav
            aria-label="Principal"
            className="hidden xl:block"
            onMouseLeave={() => setOpen(null)}
          >
            <ul className="flex items-center gap-0.5">
              {mainNav.map((item) => {
                const active =
                  isActive(pathname, item.href) ||
                  item.children?.some((c) => isActive(pathname, c.href.split('#')[0]))
                return (
                  <li
                    className="relative"
                    key={item.label}
                    onMouseEnter={() => setOpen(item.children ? item.label : null)}
                  >
                    {item.children ? (
                      <button
                        aria-expanded={open === item.label}
                        className={cn(
                          'flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-2 text-[13px] transition',
                          active ? 'text-white' : 'text-white/65 hover:text-white',
                        )}
                        onClick={() => setOpen(open === item.label ? null : item.label)}
                        onFocus={() => setOpen(item.label)}
                        type="button"
                      >
                        {item.label}
                        {item.comingSoon && (
                          <span className="rounded-full bg-[color:var(--accent)]/15 px-1.5 py-0.5 font-semibold text-[9px] text-[color:var(--accent)] uppercase tracking-wider">
                            Em breve
                          </span>
                        )}
                        <ChevronDown
                          aria-hidden
                          className={cn(
                            'size-3.5 transition-transform',
                            open === item.label && 'rotate-180',
                          )}
                        />
                      </button>
                    ) : (
                      <LocalLink
                        className={cn(
                          'block whitespace-nowrap rounded-full px-2.5 py-2 text-[13px] transition',
                          active ? 'text-white' : 'text-white/65 hover:text-white',
                        )}
                        href={item.href}
                      >
                        {item.label}
                      </LocalLink>
                    )}
                    {active && (
                      <motion.span
                        className="-bottom-0.5 absolute inset-x-3 h-px bg-gradient-to-r from-transparent via-[color:var(--accent)] to-transparent"
                        layoutId="nav-active"
                      />
                    )}

                    <AnimatePresence>
                      {open === item.label && item.children && (
                        <motion.div
                          animate={{ opacity: 1, rotateX: 0, y: 0 }}
                          className="-translate-x-1/2 absolute top-full left-1/2 w-72 pt-3"
                          exit={{ opacity: 0, rotateX: -18, y: -6 }}
                          initial={{ opacity: 0, rotateX: -24, y: -8 }}
                          style={{ transformOrigin: 'top center', transformPerspective: 900 }}
                          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <div className="ez-glass ez-glass-strong ez-border-glow relative overflow-hidden rounded-3xl p-2">
                            <LocalLink
                              className="flex items-center justify-between rounded-2xl px-4 py-3 font-medium text-sm text-white hover:bg-white/5"
                              href={item.href}
                            >
                              {item.label}
                              <span className="text-[color:var(--accent)] text-xs">
                                Ver página →
                              </span>
                            </LocalLink>
                            <div className="my-1 h-px bg-white/5" />
                            {item.children.map((child, index) => (
                              <motion.div
                                animate={{ opacity: 1, x: 0 }}
                                initial={{ opacity: 0, x: -8 }}
                                key={child.href}
                                transition={{ delay: 0.04 * index }}
                              >
                                <LocalLink
                                  className="block rounded-2xl px-4 py-2.5 text-sm text-white/65 transition hover:bg-white/5 hover:text-white"
                                  href={child.href}
                                >
                                  {child.label}
                                </LocalLink>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <ContactButton
              className="!min-h-10 !px-5 !py-2 hidden text-sm sm:inline-flex"
              subject="Contato pelo site"
            >
              Contato
            </ContactButton>
            <button
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
              className="grid size-11 place-items-center rounded-full border border-white/15 bg-white/5 text-white xl:hidden"
              onClick={() => setMobileOpen((value) => !value)}
              type="button"
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>

          <motion.span
            aria-hidden
            className="absolute inset-x-8 bottom-0 h-px origin-left bg-gradient-to-r from-[color:var(--accent)] to-[color:var(--accent-2)]"
            style={{ scaleX: progress, opacity: scrolled ? 0.8 : 0 }}
          />
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            animate={{ opacity: 1 }}
            className="ez-theme fixed inset-0 z-40 overflow-y-auto bg-[#03050d]/92 px-6 pt-28 pb-12 backdrop-blur-2xl xl:hidden"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
          >
            <nav aria-label="Menu móvel" className="mx-auto max-w-lg" style={{ perspective: 900 }}>
              <ul className="flex flex-col gap-1">
                {mainNav.map((item, index) => (
                  <motion.li
                    animate={{ opacity: 1, rotateX: 0, y: 0 }}
                    className="border-white/5 border-b py-3"
                    exit={{ opacity: 0, rotateX: 40, y: -10 }}
                    initial={{ opacity: 0, rotateX: -60, y: 30 }}
                    key={item.label}
                    style={{ transformOrigin: 'top' }}
                    transition={{ delay: 0.05 * index, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <LocalLink
                      className={cn(
                        'ez-display flex items-baseline gap-3 text-3xl',
                        isActive(pathname, item.href) ? 'text-[color:var(--accent)]' : 'text-white',
                      )}
                      href={item.href}
                    >
                      <span className="font-mono text-white/30 text-xs">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      {item.label}
                      {item.comingSoon && <span className="ez-chip">Em breve</span>}
                    </LocalLink>
                    {item.children && (
                      <div className="mt-2 flex flex-wrap gap-2 pl-8">
                        {item.children.map((child) => (
                          <LocalLink
                            className="rounded-full border border-white/10 px-3 py-1 text-white/60 text-xs hover:text-white"
                            href={child.href}
                            key={child.href}
                          >
                            {child.label}
                          </LocalLink>
                        ))}
                      </div>
                    )}
                  </motion.li>
                ))}
              </ul>
              <div className="mt-8">
                <ContactButton className="w-full" subject="Contato pelo site">
                  Falar com o Instituto
                </ContactButton>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
