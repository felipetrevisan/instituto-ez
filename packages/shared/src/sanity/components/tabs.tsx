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
import { motion } from 'motion/react'
import { useState } from 'react'
import { DynamicIcon, type IconName } from 'lucide-react/dynamic'

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
}

const TabsComponent = ({
  value,
  portableComponentsOverrides,
  imageBuilder,
}: TabsComponentProps) => {
  if (!value.tabs) return null

  const { tabs, theme, variant } = value
  const [activeTab, setActiveTab] = useState(tabs[0].id.current)

  const getIcon = (tab: TabItem) => {
    const Icon =
      tab.prefix === 'icon' && tab.icon ? <DynamicIcon name={tab.icon} size={24} /> : null

    const ImageComponent =
      tab.prefix === 'image' && tab.image ? (
        <img
          src={imageBuilder(tab.image.asset).url()}
          alt=""
          width={24}
          height={24}
          className="rounded-full"
        />
      ) : null

    return Icon ?? ImageComponent
  }

  const icon = (tab: TabItem) => getIcon(tab)

  return (
    <Tabs defaultValue={tabs[0].id.current} onValueChange={setActiveTab} className="w-full">
      <TabsList theme={theme} variant={variant}>
        {tabs.map((tab) => {
          const isActive = tab.id.current === activeTab

          return (
            <TabsTrigger
              key={`tab_${tab.id.current}`}
              value={tab.id.current}
              className={cn(
                'relative z-10 flex items-center rounded-full font-bold font-oswald transition-all duration-300',
              )}
              theme={theme}
              variant={variant}
            >
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: isActive ? 1.2 : 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="flex items-center gap-3"
              >
                {icon && (
                  <motion.div
                    initial={false}
                    animate={{
                      scale: isActive ? 1.2 : 1,
                      rotate: isActive ? 0 : -2,
                    }}
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
            value={tab.content}
            components={createPortableComponents(portableComponentsOverrides)}
          />
        </TabsContent>
      ))}
    </Tabs>
  )
}

export { TabsComponent }
