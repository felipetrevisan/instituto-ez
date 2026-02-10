import { i18n } from '@ez/studio/schemas/objects/locale/locales'
import { MarkerIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'services.benefits.items',
  title: 'Benefits — Items - Services',
  icon: MarkerIcon,
  type: 'object',
  fields: [
    defineField({ name: 'title', type: 'localizedString' }),
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
