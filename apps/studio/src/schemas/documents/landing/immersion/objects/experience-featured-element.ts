import { i18n } from '@ez/studio/schemas/objects/locale/locales'
import { ImageIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'immersion.experience.featuredElement',
  title: 'Experience — Featured Element - Immersion',
  icon: ImageIcon,
  type: 'object',
  fields: [
    defineField({ name: 'element', type: 'immersion.experience.elements' }),
    defineField({ name: 'image', type: 'image' }),
  ],
  preview: {
    select: {
      title: 'element.title',
    },
    prepare({ title }) {
      const localized = Array.isArray(title) ? title.find((item) => item?.lang === i18n.base) : null
      return {
        title: localized?.value || title || 'Sem título',
      }
    },
  },
})
