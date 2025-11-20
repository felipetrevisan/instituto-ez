import { LinkIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'is_home',
      title: 'Is Home?',
      description: 'Select if the menu item should redirect to home',
      type: 'boolean',
      initialValue: false,
      validation: (Rule) => Rule.required().warning('This field must not be empty.'),
    }),
    defineField({
      name: 'link_type',
      title: 'Link Type',
      type: 'string',
      initialValue: 'INTERNAL',
      options: {
        list: [
          { title: 'Page', value: 'INTERNAL' },
          { title: 'Landing Page', value: 'LANDING' },
          { title: 'External Link', value: 'EXTERNAL' },
          { title: 'Hash', value: 'HASH' },
        ],
        layout: 'radio',
      },
      hidden: ({ parent }) => parent?.is_home,
      validation: (Rule) =>
        Rule.custom((field, context) =>
          !context?.document?.is_home && !field ? 'This field must not be empty.' : true,
        ).warning(),
    }),
    defineField({
      name: 'internal_link',
      title: 'Internal Link',
      description: 'Select a page to navigate',
      type: 'reference',
      to: [{ type: 'page' }],
      options: {
        filter: () => {
          // if (document?.link_type === 'INTERNAL') {
          //   return { filter: 'type == "page"' }
          // }
          // if (document?.link_type === 'LANDING') {
          //   return { filter: 'type == "landing"' }
          // }
          return { filter: 'enabled == true' }
        },
      },
      hidden: ({ parent }) =>
        (parent?.link_type !== 'INTERNAL' && parent?.link_type !== 'LANDING') || parent?.is_home,
      validation: (Rule) =>
        Rule.custom((field, context) => {
          const isHome = context?.document?.is_home
          const linkType = context?.document?.link_type
          if (!isHome && (linkType === 'INTERNAL' || linkType === 'LANDING') && !field) {
            return 'This field must not be empty.'
          }
          return true
        }).warning(),
    }),
    defineField({
      name: 'external_url',
      title: 'External Link',
      description: 'Enter the URL',
      type: 'url',
      hidden: ({ parent }) => parent?.link_type !== 'EXTERNAL' || parent?.is_home,
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
        }).warning('This field must be a valid url.'),
    }),
    defineField({
      name: 'hash_id',
      title: 'Hash ID',
      type: 'string',
      hidden: ({ parent }) => parent?.link_type !== 'HASH' || parent?.is_home,
      validation: (Rule) =>
        Rule.custom((field, context) => {
          const linkType = context?.document?.link_type
          if (linkType === 'HASH' && !field) {
            return 'This field must not be empty.'
          }
          return true
        }).warning(),
    }),
  ],
})
