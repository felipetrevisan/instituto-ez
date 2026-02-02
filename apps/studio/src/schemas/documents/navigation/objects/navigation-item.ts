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
