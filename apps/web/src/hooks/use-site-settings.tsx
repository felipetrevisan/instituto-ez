'use client'

import { defaultSiteSettings, phoneHref, type SiteSettings } from '@ez/web/types/site'
import { createContext, type ReactNode, useContext, useMemo } from 'react'

type SiteSettingsValue = SiteSettings & { contact: SiteSettings['contact'] & { phoneHref: string } }

const SiteSettingsContext = createContext<SiteSettingsValue | null>(null)

/** Disponibiliza para os componentes cliente os dados do site vindos do painel. */
export function SiteSettingsProvider({
  value,
  children,
}: {
  value: SiteSettings
  children: ReactNode
}) {
  const enriched = useMemo(
    () => ({ ...value, contact: { ...value.contact, phoneHref: phoneHref(value.contact.phone) } }),
    [value],
  )
  return <SiteSettingsContext.Provider value={enriched}>{children}</SiteSettingsContext.Provider>
}

export function useSiteSettings(): SiteSettingsValue {
  const context = useContext(SiteSettingsContext)
  if (context) return context
  return {
    ...defaultSiteSettings,
    contact: {
      ...defaultSiteSettings.contact,
      phoneHref: phoneHref(defaultSiteSettings.contact.phone),
    },
  }
}
