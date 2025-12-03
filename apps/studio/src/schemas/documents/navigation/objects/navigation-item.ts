import { MenuIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'
import { i18n } from '../../../objects/locale/locales'

export default defineType({
  name: 'navigationItem',
  title: 'Navigation Item',
  type: 'object',
  icon: MenuIcon,
  fields: [
    defineField({
      name: 'navigation_label',
      title: 'Navigation Label',
      type: 'localizedString',
      validation: (Rule) => Rule.required().warning(),
    }),
    defineField({
      name: 'has_submenu',
      title: 'Has Submenu?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'submenu_columns',
      title: 'Number of Submenu Columns',
      type: 'number',
      initialValue: 1,
      options: {
        list: [
          { title: '1 Column', value: 1 },
          { title: '2 Columns', value: 2 },
          { title: '3 Columns', value: 3 },
        ],
        layout: 'radio',
      },
      hidden: ({ parent }) => !parent?.has_submenu,
      validation: (Rule) =>
        Rule.custom((field, context) =>
          context?.document?.has_submenu && field === undefined
            ? 'This field must not be empty.'
            : true,
        ).warning(),
    }),
    defineField({
      name: 'navigation_submenu_items',
      title: 'Navigation Submenu',
      type: 'array',
      of: [{ type: 'navigationSubmenuItem' }],
      hidden: ({ parent }) => !parent?.has_submenu,
    }),
    defineField({
      name: 'navigation_item_url',
      title: 'Navigation Item',
      type: 'link',
      hidden: ({ parent }) => parent?.has_submenu,
      validation: (Rule) =>
        Rule.custom((field, context) =>
          !context?.document?.navigation_submenu_items && field === undefined
            ? 'This field must not be empty.'
            : true,
        ).warning(),
    }),
  ],
  preview: {
    select: {
      title: `navigation_label.${i18n.base}`,
    },
    prepare({ title }) {
      return {
        title,
      }
    },
  },
})
