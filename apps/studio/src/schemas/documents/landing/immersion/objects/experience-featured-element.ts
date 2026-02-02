import { i18n } from '@ez/studio/schemas/objects/locale/locales'
import { PackageIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'immersion.experience.featuredElement',
  title: 'Experience — Featured Element - Immersion',
  icon: PackageIcon,
  type: 'object',
  fields: [
    defineField({ name: 'element', type: 'immersion.experience.elements' }),
    defineField({ name: 'image', type: 'image' }),
  ],
  preview: {
    select: {
      title: `element.title.${i18n.base}`,
    },
    prepare({ title }) {
      return {
        title,
      }
    },
  },
})
