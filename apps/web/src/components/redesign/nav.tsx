'use client'

import type {
  RedesignLayoutContent,
  RedesignNavIcon,
  RedesignNavSubLink,
} from '@ez/web/content/redesign/types'
import { Link } from '@ez/web/i18n/redesign-navigation'
import {
  BarChart3,
  BookOpen,
  Brain,
  Building2,
  ChevronDown,
  HeartHandshake,
  Menu,
  Monitor,
  Moon,
  Sun,
  Video,
  X,
} from 'lucide-react'
import Image from 'next/image'
import { useLocale } from 'next-intl'
import { useTheme } from 'next-themes'
import { type ComponentType, useEffect, useState } from 'react'

const LOCALES = [
  { code: 'pt', label: 'PT' },
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' },
] as const

const NAV_ICONS: Record<RedesignNavIcon, ComponentType<{ className?: string }>> = {
  brain: Brain,
  'heart-handshake': HeartHandshake,
  'bar-chart': BarChart3,
  building: Building2,
  video: Video,
  'book-open': BookOpen,
}

function NavSubRow({ item, onNavigate }: { item: RedesignNavSubLink; onNavigate?: () => void }) {
  const Icon = NAV_ICONS[item.icon]
  const inner = (
    <>
      <span className="rdg-nav-row-icon flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--rdg-copper)]/20 bg-[var(--rdg-copper)]/10 text-[var(--rdg-copper)]">
        <Icon className="h-5 w-5" />
      </span>
      <span className="min-w-0">
        <span className="flex items-center gap-2">
          <span className="font-semibold text-[var(--rdg-on-surface)] text-sm">{item.label}</span>
          {!item.href && (
            <span className="rdg-label rounded-full bg-[var(--rdg-outline-ghost)] px-2 py-0.5 text-[9px] text-[var(--rdg-on-surface-variant)]/70">
              Em breve
            </span>
          )}
        </span>
        <span className="block text-[var(--rdg-on-surface-variant)] text-xs leading-snug">
          {item.description}
        </span>
      </span>
    </>
  )

  if (!item.href) {
    return (
      <span
        aria-disabled
        className="rdg-nav-row flex cursor-not-allowed items-start gap-3 rounded-xl p-3 opacity-50"
      >
        {inner}
      </span>
    )
  }

  return (
    <Link
      className="rdg-nav-row flex items-start gap-3 rounded-xl p-3"
      href={item.href}
      onClick={onNavigate}
    >
      {inner}
    </Link>
  )
}

function RedesignThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return <span aria-hidden className={`${className ?? ''} h-5 w-5`} />

  const current = theme === 'system' ? systemTheme : theme
  const nextTheme = theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light'
  const Icon = theme === 'system' ? Monitor : current === 'light' ? Sun : Moon

  return (
    <button
      aria-label="Alternar tema"
      className={`${className ?? ''} cursor-pointer text-[var(--rdg-on-surface-variant)] transition-colors hover:text-[var(--rdg-copper)]`}
      onClick={() => setTheme(nextTheme)}
      type="button"
    >
      <Icon className="h-5 w-5" />
    </button>
  )
}

export function RedesignNav({ content }: { content: RedesignLayoutContent['nav'] }) {
  const [open, setOpen] = useState(false)
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null)
  const locale = useLocale()

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <nav className="fixed top-0 z-50 w-full border-[var(--rdg-outline-ghost)] border-b bg-[var(--rdg-bg)]/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link className="flex items-center" href="/redesign" onClick={() => setOpen(false)}>
          <Image
            alt="Instituto EZ"
            className="h-8 w-auto"
            height={32}
            src="/assets/logo.png"
            width={32}
          />
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {content.entries.map((entry) =>
            entry.kind === 'link' ? (
              <Link
                className="rdg-nav-link text-[var(--rdg-on-surface-variant)] text-sm transition-colors hover:text-[var(--rdg-copper)]"
                href={entry.href}
                key={entry.label}
              >
                {entry.label}
              </Link>
            ) : (
              <div className="group relative" key={entry.label}>
                <button
                  className="rdg-nav-link flex cursor-pointer items-center gap-1.5 text-[var(--rdg-on-surface-variant)] text-sm transition-colors group-hover:text-[var(--rdg-copper)]"
                  type="button"
                >
                  {entry.label}
                  <ChevronDown className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-180" />
                </button>
                <div className="-translate-x-1/2 pointer-events-none absolute top-full left-1/2 w-80 translate-y-2 pt-3 opacity-0 transition-all duration-300 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="rdg-glass flex flex-col gap-1 rounded-2xl p-2">
                    {entry.items.map((item) => (
                      <NavSubRow item={item} key={item.label} />
                    ))}
                  </div>
                </div>
              </div>
            ),
          )}
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-2 lg:flex">
            {LOCALES.map(({ code, label }) => (
              <Link
                className={`rdg-label text-xs transition-colors ${
                  locale === code
                    ? 'text-[var(--rdg-copper)]'
                    : 'text-[var(--rdg-on-surface-variant)]/50 hover:text-[var(--rdg-copper)]'
                }`}
                href="/redesign"
                key={code}
                locale={code}
              >
                {label}
              </Link>
            ))}
          </div>
          <RedesignThemeToggle className="hidden lg:block" />
          <button
            className="rdg-btn rdg-btn-primary hidden px-6 py-2 text-sm lg:inline-flex"
            type="button"
          >
            {content.cta}
          </button>
          <button
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            className="cursor-pointer text-[var(--rdg-on-surface)] lg:hidden"
            onClick={() => setOpen((value) => !value)}
            type="button"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="flex max-h-[calc(100vh-73px)] flex-col overflow-y-auto border-[var(--rdg-outline-ghost)] border-t bg-[var(--rdg-bg)] px-6 py-6 lg:hidden">
          <div className="flex flex-col gap-1">
            {content.entries.map((entry) => {
              if (entry.kind === 'link') {
                return (
                  <Link
                    className="rounded-xl px-3 py-3 text-[var(--rdg-on-surface)] text-lg transition-colors hover:bg-[var(--rdg-scrim)] hover:text-[var(--rdg-copper)]"
                    href={entry.href}
                    key={entry.label}
                    onClick={() => setOpen(false)}
                  >
                    {entry.label}
                  </Link>
                )
              }

              const isGroupOpen = openMobileGroup === entry.label
              return (
                <div key={entry.label}>
                  <button
                    className="flex w-full cursor-pointer items-center justify-between rounded-xl px-3 py-3 text-[var(--rdg-on-surface)] text-lg"
                    onClick={() =>
                      setOpenMobileGroup((current) =>
                        current === entry.label ? null : entry.label,
                      )
                    }
                    type="button"
                  >
                    {entry.label}
                    <ChevronDown
                      className={`h-5 w-5 text-[var(--rdg-on-surface-variant)] transition-transform duration-300 ${isGroupOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${isGroupOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                  >
                    <div className="overflow-hidden">
                      <div className="flex flex-col gap-1 py-1 pl-2">
                        {entry.items.map((item) => (
                          <NavSubRow
                            item={item}
                            key={item.label}
                            onNavigate={() => setOpen(false)}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-6 flex items-center justify-between border-[var(--rdg-outline-ghost)] border-t px-3 pt-6">
            <div className="flex items-center gap-4">
              {LOCALES.map(({ code, label }) => (
                <Link
                  className={`rdg-label text-xs ${
                    locale === code
                      ? 'text-[var(--rdg-copper)]'
                      : 'text-[var(--rdg-on-surface-variant)]/50'
                  }`}
                  href="/redesign"
                  key={code}
                  locale={code}
                  onClick={() => setOpen(false)}
                >
                  {label}
                </Link>
              ))}
            </div>
            <RedesignThemeToggle />
          </div>

          <button
            className="rdg-btn rdg-btn-primary mt-6 w-full px-6 py-3 text-sm"
            onClick={() => setOpen(false)}
            type="button"
          >
            {content.cta}
          </button>
        </div>
      )}
    </nav>
  )
}
