import { cn } from '@ez/shared/lib/utils'
import { createPortableComponents } from '@ez/shared/sanity/portable'
import { PortableText, type PortableTextBlock } from '@portabletext/react'
import { DynamicIcon, type IconName } from 'lucide-react/dynamic'

type ListType = {
  items: ListItemContent[]
  bullet_type: 'none' | 'icon' | 'emoji'
  icon?: IconName
  emoji?: string
  divider: boolean
}

export type ListItemContent = {
  content: PortableTextBlock[]
}

const ListComponent = ({ value }: { value: ListType }) => {
  const { items, bullet_type, icon, emoji, divider } = value

  if (!items || !items.length) return null

  const Icon = bullet_type === 'icon' && icon ? <DynamicIcon name={icon} size={24} /> : null

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
              {Icon}
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
