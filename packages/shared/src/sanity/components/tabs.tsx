import { createPortableComponents } from '@ez/shared/sanity/portable'
import type { SanityAsset } from '@ez/shared/types/assets'
import type { Theme, Variant } from '@ez/shared/types/global'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@ez/shared/ui/tabs'
import { PortableText, type PortableTextBlock, type PortableTextComponents } from '@portabletext/react'
import * as Icons from 'react-icons/fa'

export type TabsType = {
  tabs: TabItem[]
  theme: keyof typeof Theme
  variant: keyof typeof Variant
}

type TabItem = {
  title: string
  id: { current: string }
  content: PortableTextBlock[]
  prefix: 'none' | 'icon' | 'image'
  icon?: { name: keyof typeof Icons }
  image?: SanityAsset
}

type TabsComponentProps = {
  value: TabsType
  portableComponentsOverrides?: Partial<PortableTextComponents>
}

const TabsComponent = ({ value, portableComponentsOverrides }: TabsComponentProps) => {
  if (!value.tabs) return null

  const { tabs, theme, variant } = value

  const getIcon = (tab: TabItem) => {
    const IconComponent =
      tab.prefix === 'icon' && tab.icon?.name ? Icons[tab.icon.name as keyof typeof Icons] : null

    const ImageComponent =
      tab.prefix === 'image' && tab.image ? (
        <span>image</span>
        // <Image
        // 	src={urlForImage(tab.image.asset).url()}
        // 	alt=""
        // 	width={24}
        // 	height={24}
        // />
      ) : null

    return IconComponent ? <IconComponent /> : ImageComponent
  }

  const icon = (tab: TabItem) => getIcon(tab)

  return (
    <Tabs defaultValue={tabs[0].id.current}>
      <TabsList theme={theme} variant={variant}>
        {tabs.map((tab) => (
          <TabsTrigger
            key={`tab_${tab.id.current}`}
            value={tab.id.current}
            theme={theme}
            variant={variant}
            className="gap-2"
          >
            {icon && <div>{icon(tab)}</div>} <span>{tab.title}</span>
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={`tab_content_${tab.id.current}`} value={tab.id.current}>
          <PortableText
            value={tab.content}
            components={createPortableComponents(portableComponentsOverrides)}
          />
        </TabsContent>
      ))}
    </Tabs>
  )
}

export { TabsComponent }
