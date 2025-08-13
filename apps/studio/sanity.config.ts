import { dataset, projectId } from '@ez/studio/config/env'
import { schema } from '@ez/studio/schemas'
import structure from '@ez/studio/structures'
import { contactFormPlugin } from '@multidots/sanity-plugin-contact-form'
//import { theme } from 'https://themer.sanity.build/api/hues?default=49197f;600&primary=3f156e;600&transparent=4b395f;600&positive=43d675;300&caution=fbd024;200&lightest=fcfcfd&darkest=110d16';
import { colorInput } from '@sanity/color-input'
import { languageFilter } from '@sanity/language-filter'
import { visionTool } from '@sanity/vision'
import { type PluginOptions, defineConfig } from 'sanity'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'
import { iconPicker } from 'sanity-plugin-icon-picker'

import { structureTool } from 'sanity/structure'

import './styles/globals.css'

if (!projectId || !dataset) {
  throw new Error('Missing SANITY_PROJECT_ID or SANITY_DATASET in your environment')
}

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema,
  title: 'EZ Studio',
  //theme,
  studio: {
    components: {
      toolMenu: (props) => {
        const { tools, renderDefault } = props
        const structureTool = tools.find(({ name }) => name === 'structure')
        const otherTools = tools.filter(({ name }) => name !== 'structure')

        if (!structureTool) {
          return renderDefault(props)
        }

        return props.renderDefault({
          ...props,
          tools: [structureTool, ...otherTools],
        })
      },
    },
  },
  plugins: [
    structureTool({
      structure,
    }),
    // Add an image asset source for Unsplash
    unsplashImageAsset(),
    iconPicker(),
    colorInput(),
    contactFormPlugin(),
    languageFilter({
      supportedLanguages: [
        { id: 'en', title: 'English' },
        { id: 'es', title: 'Spanish' },
        { id: 'pt', title: 'Portuguese' },
        //...
      ],
      defaultLanguages: ['pt'],
      documentTypes: ['page'],
      filterField: (enclosingType, member, selectedLanguageIds) =>
        !enclosingType.name.startsWith('locale') || selectedLanguageIds.includes(member.name),
    }),
    // Vision lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    process.env.NODE_ENV === 'development' && visionTool({ defaultApiVersion: '2024-03-17' }),
  ].filter(Boolean) as PluginOptions[],
})
