import { annotations, decorators, styles } from '@ez/studio/config/decorators'

const config = [
  {
    type: 'block',
    styles,
    marks: {
      decorators,
      annotations,
    },
  },
  {
    type: 'buttonLink',
  },
  {
    type: 'image',
  },
  {
    type: 'title',
  },
  {
    type: 'accordion',
  },
  {
    type: 'alert',
  },
  {
    type: 'tabsWidget',
  },
  {
    type: 'divider',
  },
  {
    type: 'testimonialWidget',
  },
  {
    type: 'list',
  },
  {
    type: 'cardsWidget',
  },
]

export default config
