import { i18n } from '@ez/studio/schemas/objects/locale/locales'
import { PackageIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'about.intro.items',
  title: 'Intro — Items - About',
  icon: PackageIcon,
  type: 'object',
  fields: [
    defineField({ name: 'title', type: 'localizedArray' }),
    defineField({ name: 'description', type: 'localizedArray' }),
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
