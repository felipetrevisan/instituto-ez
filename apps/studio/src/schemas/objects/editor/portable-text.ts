import config from '@ez/studio/config/editor'
import { defineType } from 'sanity'

export default defineType({
  name: 'portableText',
  title: 'Portable Text',
  type: 'array',
  of: config,
})
