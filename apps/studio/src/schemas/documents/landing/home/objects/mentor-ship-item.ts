import { i18n } from '@ez/studio/schemas/objects/locale/locales'
import { MarkerIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'home.mentorship.items',
  title: 'Mentor Ship — Items - Home',
  icon: MarkerIcon,
  type: 'object',
  fields: [
    defineField({ name: 'title', type: 'localizedString' }),
    defineField({ name: 'description', type: 'localizedString' }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'lucide-icon',
    }),
  ],
  preview: {
    select: {
      title: `title`,
    },
    prepare({ title }) {
      const localized = Array.isArray(title) ? title.find((item) => item?.lang === i18n.base) : null
      return {
        title: localized?.value || title || 'Sem título',
      }
    },
  },
})
