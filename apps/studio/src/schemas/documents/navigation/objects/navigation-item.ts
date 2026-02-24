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
      name: 'has_submenu',
      title: 'Has Submenu?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'navigation_label',
      title: 'Navigation Label',
      type: 'localizedString',
      validation: (Rule) => Rule.required().warning(),
    }),
    defineField({
      name: 'coming_soon',
      title: 'Coming Soon?',
      description: 'When enabled, this item is shown as unavailable with an "Em breve" ribbon.',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'submenu_items',
      title: 'Submenu Items',
      type: 'array',
      of: [{ type: 'navigationItem' }],
      hidden: ({ parent }) => !parent?.has_submenu,
    }),
    defineField({
      name: 'navigation_item_url',
      title: 'Navigation Item',
      type: 'link',
      hidden: ({ parent }) =>
        !!parent?.has_submenu &&
        Array.isArray(parent?.submenu_items) &&
        parent.submenu_items.length > 0,
      validation: (Rule) =>
        Rule.custom((field, context) => {
          const hasSubmenuItems =
            Array.isArray(context?.parent?.submenu_items) && context.parent.submenu_items.length > 0
          if (!hasSubmenuItems && field === undefined) {
            return 'This field must not be empty.'
          }
          return true
        }).warning(),
    }),
  ],
  preview: {
    select: {
      title: `navigation_label`,
    },
    prepare({ title }) {
      const localized = Array.isArray(title) ? title.find((item) => item?.lang === i18n.base) : null
      return {
        title: localized?.value || title || 'Sem título',
      }
    },
  },
})
