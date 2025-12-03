import { i18n } from '@ez/studio/schemas/objects/locale/locales'
import { BlockContentIcon, CogIcon, HashIcon } from '@sanity/icons'
import { ViewIcon } from 'lucide-react'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'landingPage',
  title: 'Landing Page',
  type: 'document',
  icon: ViewIcon,
  groups: [
    { name: 'content', title: 'Content', icon: BlockContentIcon },
    { name: 'seo', title: 'SEO', icon: HashIcon },
    { name: 'settings', title: 'Settings', icon: CogIcon },
  ],
  fields: [
    defineField({
      name: 'key',
      title: 'Landing Key',
      type: 'string',
      group: 'settings',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: 'Mathematizer', value: 'mathematizer' },
          { title: 'For Business', value: 'for-business' },
          { title: 'Mentoring', value: 'mentoring' },
          { title: 'About', value: 'about' },
        ],
        layout: 'radio',
      },
    }),

    defineField({
      name: 'page',
      title: 'Page',
      type: 'seo',
      group: 'seo',
    }),

    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      group: 'content',
      of: [
        { type: 'section.hero' },

        // MATHEMATIZER
        { type: 'mathematizer.benefits' },
        { type: 'mathematizer.mathematizer' },
        { type: 'mathematizer.whatis' },
        { type: 'mathematizer.whycompanyneed' },
        { type: 'mathematizer.cta' },

        // FOR BUSINESS
        { type: 'forbusiness.diagnostic' },
        { type: 'forbusiness.consulting' },
        { type: 'forbusiness.courses' },
        { type: 'forbusiness.lectures' },
        { type: 'forbusiness.testimonial' },
        { type: 'forbusiness.cta' },

        // MENTORING
        { type: 'mentoring.expectedresults' },
        { type: 'mentoring.methodsstep' },
        { type: 'mentoring.intro' },
        { type: 'mentoring.targetaudience' },
        { type: 'mentoring.cta' },

         // ABOUT
         { type: 'about.intro' },
         { type: 'about.services' },
         { type: 'about.whychoose' },
      ],
    }),
  ],

  preview: {
    select: {
      title: `page.title.${i18n.base}`,
      key: 'key',
    },
    prepare({ title, key }) {
      return {
        title,
        subtitle: key,
      }
    },
  },
})
