import { cn } from '@ez/shared/lib/utils'
import type { SanityAsset } from '@ez/shared/types/assets'
import type { Theme } from '@ez/shared/types/global'
import {
  PortableText,
  type PortableTextBlock,
  type PortableTextComponents,
} from '@portabletext/react'
import type { SanityImageSource } from '@sanity/asset-utils'
import type { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder'
import { motion } from 'motion/react'

export type CardsType = {
  cards: CardItem[]
  theme: keyof typeof Theme
}

type CardItem = {
  title: string
  content: PortableTextBlock[]
  image: SanityAsset
}

type CardsComponentProps = {
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
}: CardsComponentProps) => {
  if (!value.cards) return null

  const { cards, theme } = value

  return (
    <div className="flex flex-col gap-8">
      {cards.map((card, index) => (
        <motion.div
          className={cn(
            'group relative w-full rounded-3xl bg-gradient-to-r p-[3px] shadow-lg transition-shadow',
            {
              'from-primary via-secondary to-primary/40 hover:shadow-primary/30':
                theme === 'default',
              'from-secondary via-tertiary to-secondary/40 hover:shadow-secondary/30':
                theme === 'secondary',
              'from-tertiary via-primary to-tertiary/40 hover:shadow-tertiary/30':
                theme === 'tertiary',
            },
          )}
          initial={{ opacity: 0, y: 40 }}
          // biome-ignore lint/suspicious/noArrayIndexKey: is safe use index here
          key={`card-${index}`}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05, transition: { duration: 0.3, ease: 'circInOut' } }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <div className="flex min-h-[200px] flex-col items-stretch overflow-hidden rounded-[calc(1.5rem-3px)] bg-white md:flex-row">
            <div className="relative h-auto w-full md:h-auto md:w-1/3">
              <ImageComponent
                alt=""
                className="object-cover"
                fill
                priority
                src={imageBuilder(card.image.asset).url()}
              />
            </div>
            <div className="flex w-full flex-col justify-between p-6 md:w-2/3">
              <h3
                className={cn('mb-2 flex items-center gap-2 font-bold text-2xl', {
                  'text-primary': theme === 'default',
                  'text-secondary': theme === 'secondary',
                  'text-tertiary': theme === 'tertiary',
                })}
              >
                {card.title}
              </h3>
              <div className="flex flex-col gap-4">
                <PortableText components={portableComponentsOverrides} value={card.content} />
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export { CardsComponent }
