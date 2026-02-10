import { BlockContentIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

const pillarThemeOptions = [
  { title: 'Coral', value: 'coral' },
  { title: 'Violet', value: 'violet' },
  { title: 'Cyan', value: 'cyan' },
  { title: 'Amber', value: 'amber' },
  { title: 'Emerald', value: 'emerald' },
  { title: 'Primary', value: 'primary' },
]

export default defineType({
  name: 'masterclassDetailPillars',
  title: 'Masterclass Pillars',
  icon: BlockContentIcon,
  type: 'object',
  fields: [
    defineField({
      name: 'badge',
      title: 'Badge',
      type: 'string',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'portableText',
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'portableText',
    }),
    defineField({
      name: 'items',
      title: 'Pillars',
      type: 'array',
      of: [
        {
          name: 'pillar',
          title: 'Pillar',
          type: 'object',
          fields: [
            defineField({
              name: 'number',
              title: 'Number',
              type: 'string',
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'subtitle',
              title: 'Subtitle',
              type: 'string',
            }),
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
            }),
            defineField({
              name: 'heading',
              title: 'Slide Heading',
              type: 'portableText',
            }),
            defineField({
              name: 'body',
              title: 'Slide Body',
              type: 'portableText',
            }),
            defineField({
              name: 'cta',
              title: 'Slide CTA',
              type: 'button',
            }),
            defineField({
              name: 'icon',
              title: 'Card Icon',
              type: 'lucide-icon',
            }),
            defineField({
              name: 'theme',
              title: 'Color Theme',
              type: 'string',
              options: {
                list: pillarThemeOptions,
                layout: 'dropdown',
              },
              initialValue: 'primary',
            }),
            defineField({
              name: 'core',
              title: 'Core',
              type: 'object',
              fields: [
                defineField({
                  name: 'icon',
                  title: 'Icon',
                  type: 'lucide-icon',
                }),
                defineField({
                  name: 'label',
                  title: 'Label',
                  type: 'string',
                }),
              ],
            }),
            defineField({
              name: 'orbitItems',
              title: 'Orbit Items',
              type: 'array',
              of: [
                {
                  name: 'orbitItem',
                  title: 'Orbit Item',
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'icon',
                      title: 'Icon',
                      type: 'lucide-icon',
                    }),
                    defineField({
                      name: 'label',
                      title: 'Label',
                      type: 'string',
                    }),
                  ],
                },
              ],
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'number',
            },
            prepare({ title, subtitle }) {
              return {
                title: title ?? 'Pillar',
                subtitle,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'cta',
      title: 'Bottom CTA',
      type: 'button',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Pillars' }
    },
  },
})
