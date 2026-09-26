import { AuthProvider } from '@ez/web/components/admin/auth'
import { SiteSettingsProvider } from '@ez/web/hooks/use-site-settings'
import { getSiteSettings } from '@ez/web/server/catalog'
import { DEFAULT_FAVICON } from '@ez/web/types/site'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import type { ReactNode } from 'react'
import { Toaster } from 'sonner'
import './admin.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const { name, favicon } = await getSiteSettings()
  return {
    title: { template: `%s | Admin ${name}`, default: `Admin | ${name}` },
    robots: { index: false, follow: false },
    icons: { icon: favicon || DEFAULT_FAVICON },
  }
}

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const settings = await getSiteSettings()

  return (
    <html className={inter.variable} lang="pt-BR">
      <body className="min-h-screen bg-[#070a14] font-[family-name:var(--font-inter)] text-white antialiased">
        <SiteSettingsProvider value={settings}>
          <AuthProvider>{children}</AuthProvider>
        </SiteSettingsProvider>
        <Toaster position="top-right" richColors theme="dark" />
      </body>
    </html>
  )
}
