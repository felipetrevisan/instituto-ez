import { i18n } from '@ez/studio/schemas/objects/locale/locales'
import { BarChartIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'masterclass.hero.stats',
  title: 'Hero — Stats - Masterclass',
  icon: BarChartIcon,
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
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: Array.isArray(title)
          ? title.find((item) => item?.lang === i18n.base)?.value || 'Sem título'
          : title || 'Sem título',
      }
    },
  },
})
