import { UserIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'immersion.instructor.items',
  title: 'Instructor — Items - Immersion',
  icon: UserIcon,
  type: 'object',
  fields: [
    defineField({ name: 'name', type: 'string' }),
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
      title: `name`,
    },
    prepare({ title }) {
      return {
        title,
      }
    },
  },
})
