import { cn } from '@ez/shared/lib/utils'
import { createPortableComponents } from '@ez/shared/sanity/portable'
import type { SanityAsset } from '@ez/shared/types/assets'
import type { Theme, Variant } from '@ez/shared/types/global'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@ez/shared/ui/tabs'
import {
  PortableText,
  type PortableTextBlock,
  type PortableTextComponents,
} from '@portabletext/react'
import type { SanityImageSource } from '@sanity/asset-utils'
import type { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder'
import { DynamicIcon, type IconName } from 'lucide-react/dynamic'
import { motion } from 'motion/react'
import { useState } from 'react'

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
  icon?: IconName
  image?: SanityAsset
}

type TabsComponentProps = {
  value: TabsType
  portableComponentsOverrides?: Partial<PortableTextComponents>
  imageBuilder: (assets: SanityImageSource) => ImageUrlBuilder
  ImageComponent: React.ElementType
}

const TabsComponent = ({
  value,
  portableComponentsOverrides,
  imageBuilder,
  ImageComponent,
}: TabsComponentProps) => {
  if (!value.tabs) return null

  const { tabs, theme, variant } = value
  // biome-ignore lint/correctness/useHookAtTopLevel: useState is intentionally called here for SSR compatibility
  const [activeTab, setActiveTab] = useState(tabs[0].id.current)

  const getIcon = (tab: TabItem) => {
    const Icon =
      tab.prefix === 'icon' && tab.icon ? <DynamicIcon name={tab.icon} size={24} /> : null

    const Image =
      tab.prefix === 'image' && tab.image ? (
        <ImageComponent
          alt=""
          className="rounded-full object-cover"
          fill
          height={24}
          priority
          src={imageBuilder(tab.image.asset).url()}
          width={24}
        />
      ) : null

    return Icon ?? Image
  }

  const icon = (tab: TabItem) => getIcon(tab)

  return (
    <Tabs className="w-full" defaultValue={tabs[0].id.current} onValueChange={setActiveTab}>
      <TabsList theme={theme} variant={variant}>
        {tabs.map((tab) => {
          const isActive = tab.id.current === activeTab

          return (
            <TabsTrigger
              className={cn(
                'relative z-10 flex items-center rounded-full font-bold font-oswald transition-all duration-300',
              )}
              key={`tab_${tab.id.current}`}
              theme={theme}
              value={tab.id.current}
              variant={variant}
            >
              <motion.div
                animate={{ scale: isActive ? 1.2 : 1 }}
                className="flex items-center gap-3"
                initial={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {icon && (
                  <motion.div
                    animate={{
                      scale: isActive ? 1.2 : 1,
                      rotate: isActive ? 0 : -2,
                    }}
                    initial={false}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    {icon(tab)}
                  </motion.div>
                )}
                {tab.title}
              </motion.div>
            </TabsTrigger>
          )
        })}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={`tab_content_${tab.id.current}`} value={tab.id.current}>
          <PortableText
            components={createPortableComponents(portableComponentsOverrides)}
            value={tab.content}
          />
        </TabsContent>
      ))}
    </Tabs>
  )
}

export { TabsComponent }
