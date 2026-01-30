import { DownloadIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'download_link',
  title: 'Download',
  icon: DownloadIcon,
  type: 'object',
  fields: [
    defineField({
      name: 'disabled',
      title: 'Is Button Disabled?',
      type: 'boolean',
      initialValue: false,
      validation: (Rule) =>
        Rule.custom((field, context) => {
          if (context?.document?.show_button && !field) {
            return 'This field must not be empty.'
          }
          return true
        }).warning(),
    }),
    defineField({
      name: 'label',
      title: 'Button Label',
      type: 'localizedString',
      validation: (Rule) => Rule.required().warning('This field must not be empty.'),
    }),
    defineField({
      name: 'url',
      title: 'Button URL',
      type: 'localizedUrl',
    }),
  ],
})
