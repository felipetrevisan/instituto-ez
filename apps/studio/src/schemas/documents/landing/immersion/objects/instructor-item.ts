import { i18n } from '@ez/studio/schemas/objects/locale/locales'
import { PackageIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'immersion.instructor.items',
  title: 'Instructor — Items - Immersion',
  icon: PackageIcon,
  type: 'object',
  fields: [
    defineField({ name: 'title', type: 'localizedString' }),
    defineField({ name: 'subtitle', type: 'localizedString' }),
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
