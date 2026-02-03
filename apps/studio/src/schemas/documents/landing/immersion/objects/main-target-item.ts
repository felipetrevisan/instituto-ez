import { PackageIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'immersion.main-target.item',
  title: 'Main Target — Item - Immersion',
  icon: PackageIcon,
  type: 'object',
  fields: [
    defineField({ name: 'text', type: 'localizedString' }),
    defineField({ name: 'icon', type: 'lucide-icon' }),
  ],
  preview: {
    select: {
      title: 'text.pt',
    },
    prepare({ title }) {
      return { title: title || 'Item' }
    },
  },
})
