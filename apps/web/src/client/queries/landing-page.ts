import { groq } from 'next-sanity'

export const landingPageSettingsQuery = groq`
  *[ _type == 'landing-page-settings' ][0] {
    "sections": sections[] {
      "key": key_section,
      "show": show_section,
    },
  }
`
