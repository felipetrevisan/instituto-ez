import { site } from '@ez/web/content/site'
import { z } from 'zod'

/** Dados do site editáveis pelo painel (Admin → Site e contato). */
export const siteSettingsSchema = z.object({
  name: z.string().trim().min(1, 'Informe o nome do site'),
  slogan: z.string().trim(),
  description: z.string().trim(),
  logo: z.string().min(1, 'Envie o logo'),
  /** Vazio = usa o ícone padrão (/favicon.ico). */
  favicon: z.string(),
  contact: z.object({
    email: z.string().trim().email('E-mail inválido'),
    phone: z.string().trim(),
    location: z.string().trim(),
  }),
})

export type SiteSettings = z.infer<typeof siteSettingsSchema>

export const defaultSiteSettings: SiteSettings = {
  name: site.name,
  slogan: site.slogan,
  description: site.description,
  logo: site.logo,
  favicon: '',
  contact: {
    email: site.contact.email,
    phone: site.contact.phone,
    location: site.contact.location,
  },
}

export const DEFAULT_FAVICON = '/favicon.ico'

/** Converte "(11) 99920-1723" em "tel:+5511999201723" (sem "+", assume Brasil). */
export function phoneHref(phone: string) {
  const digits = phone.replace(/\D/g, '')
  if (!digits) return ''
  const international = phone.trim().startsWith('+') ? digits : `55${digits}`
  return `tel:+${international}`
}

/** Mescla o que veio do banco com os padrões, ignorando campos inválidos. */
export function parseSiteSettings(data: unknown): SiteSettings {
  const raw = (data ?? {}) as Partial<SiteSettings>
  const merged = {
    ...defaultSiteSettings,
    ...raw,
    contact: { ...defaultSiteSettings.contact, ...raw.contact },
  }
  const parsed = siteSettingsSchema.safeParse(merged)
  return parsed.success ? parsed.data : defaultSiteSettings
}
