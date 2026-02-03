import { PackageIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'immersion.next-class.item',
  title: 'Next Class — Item - Immersion',
  icon: PackageIcon,
  type: 'object',
  fields: [
    defineField({ name: 'title', type: 'localizedString' }),
    defineField({ name: 'icon', type: 'lucide-icon' }),
  ],
  preview: {
    select: {
      title: 'title.pt',
    },
    prepare({ title }) {
      return { title: title || 'Item' }
    },
  },
})
