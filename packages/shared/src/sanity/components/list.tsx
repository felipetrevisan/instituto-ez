import { cn } from '@ez/shared/lib/utils'
import { createPortableComponents } from '@ez/shared/sanity/portable'
import { PortableText, type PortableTextBlock } from '@portabletext/react'
import * as Icons from 'react-icons/fa'

type ListType = {
  items: ListItemContent[]
  bullet_type: 'none' | 'icon' | 'emoji'
  icon?: { name: keyof typeof Icons }
  emoji?: string
  divider: boolean
}

export type ListItemContent = {
  content: PortableTextBlock[]
}

const ListComponent = ({ value }: { value: ListType }) => {
  const { items, bullet_type, icon, emoji, divider } = value

  if (!items || !items.length) return null

  const IconComponent = bullet_type === 'icon' && icon?.name ? Icons[icon.name] : null

  return (
    <ul
      className={cn('flex flex-col gap-2 [&>li]:py-2', {
        'divide-y divide-primary/30': divider,
        'list-disc': bullet_type === 'none',
      })}
    >
      {items?.map((item, index: number) => (
        <li
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          key={index}
          className={cn({
            'flex flex-row gap-2 items-center': bullet_type !== 'none',
          })}
        >
          {bullet_type !== 'none' && (
            <div>
              {IconComponent && <IconComponent />}
              {emoji && <span>{emoji}</span>}
            </div>
          )}
          <div>
            <PortableText value={item.content} components={createPortableComponents()} />
          </div>
        </li>
      ))}
    </ul>
  )
}

export { ListComponent }
