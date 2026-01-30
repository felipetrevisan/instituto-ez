import { BlockContentIcon, CogIcon, HashIcon, ImagesIcon, PlayIcon } from '@sanity/icons'
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list'
import { defineField, defineType } from 'sanity'
import { i18n } from '../../objects/locale/locales'

export default defineType({
  name: 'masterclass',
  title: 'Masterclasses',
  icon: PlayIcon,
  type: 'document',
  orderings: [orderRankOrdering],
  groups: [
    { name: 'content', title: 'Content', icon: BlockContentIcon },
    { name: 'seo', title: 'SEO', icon: HashIcon },
    { name: 'settings', title: 'Settings', icon: CogIcon },
    { name: 'listing', title: 'Listing', icon: ImagesIcon },
  ],
  fields: [
    orderRankField({ type: 'masterclass' }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localizedString',
      group: 'content',
      validation: (Rule) => Rule.required().warning('This field must not be empty.'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'localizedSlug',
      group: 'content',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().warning('This field must not be empty.'),
    }),
    defineField({
      name: 'templateId',
      title: 'Template ID',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required().warning('This field must not be empty.'),
    }),
    defineField({
      name: 'enabled',
      title: 'Enabled?',
      type: 'boolean',
      initialValue: true,
      group: 'settings',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      initialValue: 'draft',
      group: 'settings',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Upcoming', value: 'upcoming' },
          { title: 'Live', value: 'live' },
          { title: 'Ended', value: 'ended' },
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'startAt',
      title: 'Start Date',
      type: 'datetime',
      group: 'settings',
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      group: 'settings',
    }),
    defineField({
      name: 'timezone',
      title: 'Timezone',
      type: 'string',
      group: 'settings',
    }),
    defineField({
      name: 'location',
      title: 'Location / Link',
      type: 'string',
      group: 'settings',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),
    defineField({
      name: 'card',
      title: 'Card',
      type: 'object',
      group: 'listing',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'localizedString',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'localizedString',
        }),
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
          options: { hotspot: true },
        }),
        defineField({
          name: 'badge',
          title: 'Badge',
          type: 'localizedString',
        }),
      ],
    }),
    // defineField({
    //   name: 'sections',
    //   title: 'Sections',
    //   type: 'array',
    //   group: 'content',
    //   of: [
    //     { type: 'masterclass.hero' },
    //     { type: 'masterclass.forWho' },
    //     { type: 'masterclass.problem' },
    //     { type: 'masterclass.transformation' },
    //     { type: 'masterclass.content' },
    //     { type: 'masterclass.format' },
    //     { type: 'masterclass.expert' },
    //     { type: 'masterclass.finalCta' },
    //   ],
    //   validation: (Rule) => Rule.required().min(1).warning('Add at least one section.'),
    // }),
  ],
  preview: {
    select: {
      title: `title.${i18n.base}`,
      media: 'card.image',
    },
    prepare({ title, media }) {
      return {
        title,
        media,
      }
    },
  },
})
