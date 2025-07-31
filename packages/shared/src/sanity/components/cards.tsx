import { cn } from '@ez/shared/lib/utils'
import { createPortableComponents } from '@ez/shared/sanity/portable'
import type { SanityAsset } from '@ez/shared/types/assets'
import type { Theme } from '@ez/shared/types/global'
import {
  PortableText,
  type PortableTextBlock,
  type PortableTextComponents,
} from '@portabletext/react'
import type { SanityImageSource } from '@sanity/asset-utils'
import type { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder'
import { motion } from 'framer-motion'

export type CardsType = {
  cards: CardItem[]
  theme: keyof typeof Theme
}

type CardItem = {
  title: string
  content: PortableTextBlock[]
  image: SanityAsset
}

type TabsComponentProps = {
  value: CardsType
  portableComponentsOverrides?: Partial<PortableTextComponents>
  imageBuilder: (assets: SanityImageSource) => ImageUrlBuilder
  ImageComponent: React.ElementType
}

const CardsComponent = ({
  value,
  portableComponentsOverrides,
  imageBuilder,
  ImageComponent,
}: TabsComponentProps) => {
  if (!value.cards) return null

  const { cards, theme } = value

  return (
    <>
      {cards.map((card, index) => (
        <motion.div
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          key={`card-${index}`}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          whileHover={{ scale: 1.05, transition: { duration: 0.3, ease: 'circInOut' } }}
          className={cn(
            'w-full relative group rounded-3xl p-[3px] bg-gradient-to-r shadow-lg transition-shadow',
            {
              'from-primary via-secondary to-primary/40 hover:shadow-primary/30':
                theme === 'default',
              'from-secondary via-tertiary to-secondary/40 hover:shadow-secondary/30':
                theme === 'secondary',
              'from-tertiary via-primary to-tertiary/40 hover:shadow-tertiary/30':
                theme === 'tertiary',
            },
          )}
        >
          <div className="flex flex-col md:flex-row items-stretch bg-white rounded-[calc(1.5rem-3px)] overflow-hidden min-h-[200px]">
            <div className="relative w-full md:w-1/3 h-64 md:h-auto">
              <ImageComponent
                src={imageBuilder(card.image.asset).url()}
                alt=""
                fill
                className="object-cover"
              />
            </div>
            <div className="w-full md:w-2/3 p-6 flex flex-col justify-between">
              <div>
                <h3
                  className={cn('text-2xl font-bold mb-2 flex items-center gap-2', {
                    'text-primary': theme === 'default',
                    'text-secondary': theme === 'secondary',
                    'text-tertiary': theme === 'tertiary',
                  })}
                >
                  {card.title}
                </h3>
                <PortableText
                  value={card.content}
                  components={createPortableComponents(portableComponentsOverrides)}
                />
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </>
  )
}

export { CardsComponent }
