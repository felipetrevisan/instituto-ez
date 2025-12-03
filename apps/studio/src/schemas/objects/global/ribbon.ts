import { TagsIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'ribbon',
  title: 'Ribbon',
  type: 'object',
  icon: TagsIcon,
  fields: [
    defineField({
      name: 'show_ribbon',
      title: 'Show Ribbon?',
      type: 'boolean',
      initialValue: false,
      validation: (Rule) => Rule.required().warning('This field must not be empty.'),
    }),
    defineField({
      name: 'ribbon_text',
      title: 'Ribbon Label',
      type: 'localizedString',
      hidden: ({ parent }) => !parent?.show_ribbon,
      validation: (Rule) =>
        Rule.custom((field, context) => {
          if (context?.document?.show_ribbon && !field) {
            return 'This field must not be empty.'
          }
          return true
        }).warning(),
    }),
  ],
})
