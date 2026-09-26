'use client'

import { useSiteSettings } from '@ez/web/hooks/use-site-settings'
import { cn } from '@ez/web/lib/utils'
import {
  BookOpen,
  Building2,
  CreditCard,
  ExternalLink,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquareQuote,
  X,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { type ReactNode, useEffect, useState } from 'react'
import { useAuth } from './auth'
import { Spinner } from './ui'

const nav = [
  { href: '/admin', label: 'Painel', icon: LayoutDashboard },
  { href: '/admin/ebooks', label: 'Ebooks', icon: BookOpen },
  { href: '/admin/depoimentos', label: 'Depoimentos', icon: MessageSquareQuote },
  { href: '/admin/pagamentos', label: 'Pagamentos', icon: CreditCard },
  { href: '/admin/site', label: 'Site e contato', icon: Building2 },
]

function isActive(pathname: string, href: string) {
  return href === '/admin' ? pathname === href : pathname.startsWith(href)
}

/** Garante sessão de administrador; caso contrário envia para o login. */
export function AdminGuard({ children }: { children: ReactNode }) {
  const { isAdmin, loading, configured } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && (!configured || !isAdmin)) router.replace('/admin/login')
  }, [loading, isAdmin, configured, router])

  if (loading || !isAdmin) {
    return (
      <div className="grid min-h-screen place-items-center">
        <Spinner label="Verificando acesso…" />
      </div>
    )
  }
  return children
}

function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname() ?? ''
  const { user, signOut } = useAuth()
  const site = useSiteSettings()

  return (
    <div className="flex h-full flex-col">
      <Link className="flex items-center gap-3 px-2" href="/admin" onClick={onNavigate}>
        <Image
          alt=""
          className="rounded-full ring-1 ring-white/15"
          height={36}
          src={site.logo}
          unoptimized
          width={36}
        />
        <span className="leading-tight">
          <span className="block font-semibold text-sm text-white">{site.name}</span>
          <span className="block text-[11px] text-white/45 uppercase tracking-[0.18em]">Admin</span>
        </span>
      </Link>

      <nav aria-label="Painel" className="mt-8 flex flex-col gap-1">
        {nav.map(({ href, label, icon: Icon }) => (
          <Link
            aria-current={isActive(pathname, href) ? 'page' : undefined}
            className={cn(
              'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition',
              isActive(pathname, href)
                ? 'bg-[#f2b544]/12 text-[#f6c566]'
                : 'text-white/65 hover:bg-white/[0.05] hover:text-white',
            )}
            href={href}
            key={href}
            onClick={onNavigate}
          >
            <Icon aria-hidden className="size-4.5" />
            {label}
          </Link>
        ))}
        <a
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/65 transition hover:bg-white/[0.05] hover:text-white"
          href="/"
          rel="noopener"
          target="_blank"
        >
          <ExternalLink aria-hidden className="size-4.5" />
          Ver site
        </a>
      </nav>

      <div className="mt-auto border-white/[0.07] border-t pt-4">
        <p className="truncate px-3 text-white/45 text-xs">{user?.email}</p>
        <button
          className="mt-2 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/65 transition hover:bg-white/[0.05] hover:text-white"
          onClick={signOut}
          type="button"
        >
          <LogOut aria-hidden className="size-4.5" />
          Sair
        </button>
      </div>
    </div>
  )
}

export function AdminShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const site = useSiteSettings()

  // biome-ignore lint/correctness/useExhaustiveDependencies: fecha o menu ao trocar de página
  useEffect(() => setOpen(false), [pathname])

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[260px_1fr]">
      <aside className="sticky top-0 hidden h-screen border-white/[0.07] border-r bg-[#080c18] p-5 lg:block">
        <Sidebar />
      </aside>

      <header className="sticky top-0 z-30 flex items-center justify-between border-white/[0.07] border-b bg-[#070a14]/90 px-4 py-3 backdrop-blur lg:hidden">
        <span className="font-semibold text-sm text-white">{site.name} · Admin</span>
        <button
          aria-expanded={open}
          aria-label="Abrir menu"
          className="grid size-10 place-items-center rounded-xl border border-white/10 text-white"
          onClick={() => setOpen(true)}
          type="button"
        >
          <Menu className="size-5" />
        </button>
      </header>

      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            aria-label="Fechar menu"
            className="absolute inset-0 bg-black/60"
            onClick={() => setOpen(false)}
            type="button"
          />
          <aside className="relative h-full w-72 bg-[#080c18] p-5">
            <button
              aria-label="Fechar menu"
              className="absolute top-4 right-4 grid size-9 place-items-center rounded-xl text-white/70"
              onClick={() => setOpen(false)}
              type="button"
            >
              <X className="size-5" />
            </button>
            <Sidebar onNavigate={() => setOpen(false)} />
          </aside>
        </div>
      )}

      <main className="min-w-0 px-4 py-8 sm:px-8 lg:px-10 lg:py-10">
        <div className="mx-auto max-w-6xl">{children}</div>
      </main>
    </div>
  )
}
