import { PlugIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'button',
  title: 'Button',
  type: 'object',
  icon: PlugIcon,
  fields: [
    defineField({
      name: 'show_button',
      title: 'Show Button?',
      type: 'boolean',
      initialValue: false,
      validation: (Rule) => Rule.required().warning('This field must not be empty.'),
    }),
    defineField({
      name: 'disable_button',
      title: 'Is Disabled?',
      type: 'boolean',
      initialValue: false,
      hidden: ({ parent }) => !parent?.show_button,
      validation: (Rule) =>
        Rule.custom((field, context) => {
          if (context?.document?.show_button && !field) {
            return 'This field must not be empty.'
          }
          return true
        }).warning(),
    }),
    defineField({
      name: 'button_label',
      title: 'Button Label',
      type: 'localizedString',
      hidden: ({ parent }) => !parent?.show_button,
      validation: (Rule) =>
        Rule.custom((field, context) => {
          if (context?.document?.show_button && !field) {
            return 'This field must not be empty.'
          }
          return true
        }).warning(),
    }),
    defineField({
      name: 'button_link_type',
      title: 'Button Link Type',
      type: 'string',
      initialValue: 'INTERNAL',
      options: {
        list: [
          { title: 'Page', value: 'INTERNAL' },
          { title: 'External Link', value: 'EXTERNAL' },
        ],
        layout: 'radio',
      },
      hidden: ({ parent }) => !parent?.show_button || parent?.disable_button,
      validation: (Rule) => Rule.required().warning('This field must not be empty.'),
    }),
    defineField({
      name: 'button_internal_link',
      title: 'Button Link',
      description: 'Select a page or post to link button',
      type: 'reference',
      to: [{ type: 'page' }],
      hidden: ({ parent }) =>
        !parent?.show_button ||
        (parent?.show_button && parent?.button_link_type !== 'INTERNAL') ||
        parent?.disable_button,
      validation: (Rule) =>
        Rule.custom((field, context) =>
          context?.document?.show_button &&
          context?.document?.button_link_type === 'INTERNAL' &&
          !field
            ? 'This field must not be empty.'
            : true,
        ).warning(),
    }),
    defineField({
      name: 'button_internal_params',
      title: 'Button Link Params',
      type: 'string',
      hidden: ({ parent }) =>
        !parent?.show_button ||
        (parent?.show_button && parent?.button_link_type !== 'INTERNAL') ||
        parent?.disable_button,
    }),
    defineField({
      name: 'button_external_url',
      title: 'Button Link',
      description: 'Enter the button URL',
      type: 'url',
      hidden: ({ parent }) =>
        !parent?.show_button ||
        (parent?.show_button && parent?.button_link_type !== 'EXTERNAL') ||
        parent?.disable_button,
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
        }).warning('This field must be a valid url.'),
    }),
  ],
})
