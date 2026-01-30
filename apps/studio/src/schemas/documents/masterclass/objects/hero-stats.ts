import { i18n } from '@ez/studio/schemas/objects/locale/locales'
import { PackageIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'masterclass.hero.stats',
  title: 'Hero — Stats - Masterclass',
  icon: PackageIcon,
  type: 'object',
  fields: [
    defineField({ name: 'value', type: 'localizedString' }),
    defineField({ name: 'title', type: 'localizedString' }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'lucide-icon',
    }),
  ],
  preview: {
    select: {
      title: `title.${i18n.base}`,
    },
    prepare({ title }) {
      return {
        title,
      }
    },
  },
})
