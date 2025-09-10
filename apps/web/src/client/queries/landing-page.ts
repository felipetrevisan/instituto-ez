import { groq } from 'next-sanity'

export const landingPageSettingsQuery = groq`
  *[ _type == 'landing-page-settings' ][0] {
    "sections": sections[] {
      "key": key_section,
      "show": show_section,
    },
    "seals": {
      "pt": coalesce(
        seals_image[] {
          "seal": {
            "image": seals.pt {
              "asset": asset,
              "metadata": {
                "lqip": asset->metadata.lqip,
                "dimensions": asset->metadata.dimensions
              }
            }
          }
        },
        []
      ),
      "en": coalesce(
        seals_image[] {
          "seal": {
            "image": seals.en {
              "asset": asset,
              "metadata": {
                "lqip": asset->metadata.lqip,
                "dimensions": asset->metadata.dimensions
              }
            }
          }
        },
        []
      ),
      "es": coalesce(
        seals_image[] {
          "seal": {
            "image": seals.es { 
              "asset": asset,
              "metadata": {
                "lqip": asset->metadata.lqip,
                "dimensions": asset->metadata.dimensions
              }
            }
          }
        },
        []
      ),
    }
  }
`
