import { ExperienceShell } from '@ez/web/components/experience/shell'
import { SiteSettingsProvider } from '@ez/web/hooks/use-site-settings'
import { getSiteSettings } from '@ez/web/server/catalog'
import type { ReactNode } from 'react'

export const revalidate = 300

export default async function ExperienceLayout({ children }: { children: ReactNode }) {
  const settings = await getSiteSettings()

  return (
    <SiteSettingsProvider value={settings}>
      <ExperienceShell>{children}</ExperienceShell>
    </SiteSettingsProvider>
  )
}
