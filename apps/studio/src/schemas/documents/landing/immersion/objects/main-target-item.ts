import { i18n } from '@ez/studio/schemas/objects/locale/locales'
import { MarkerIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'immersion.main-target.item',
  title: 'Main Target — Item - Immersion',
  icon: MarkerIcon,
  type: 'object',
  fields: [
    defineField({ name: 'text', type: 'localizedString' }),
    defineField({ name: 'icon', type: 'lucide-icon' }),
  ],
  preview: {
    select: {
      title: 'text',
    },
    prepare({ title }) {
      const localized = Array.isArray(title) ? title.find((item) => item?.lang === i18n.base) : null
      return { title: localized?.value || title || 'Item' }
    },
  },
})
