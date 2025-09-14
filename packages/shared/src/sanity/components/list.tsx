import { cn } from '@ez/shared/lib/utils'
import {
  PortableText,
  type PortableTextBlock,
  type PortableTextComponents,
} from '@portabletext/react'
import { DynamicIcon, type IconName } from 'lucide-react/dynamic'

export type ListType = {
  items: ListItemContent[]
  bullet_type: 'none' | 'icon' | 'emoji'
  icon?: IconName
  emoji?: string
  divider: boolean
}

export type ListItemContent = {
  content: PortableTextBlock[]
}

type ListComponentProps = {
  value: ListType
  portableComponentsOverrides?: Partial<PortableTextComponents>
}

const ListComponent = ({ value, portableComponentsOverrides }: ListComponentProps) => {
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
          className={cn({
            'flex flex-row items-center gap-2': bullet_type !== 'none',
          })}
          // biome-ignore lint/suspicious/noArrayIndexKey: using index as key is safe here
          key={index}
        >
          {bullet_type !== 'none' && (
            <div>
              {Icon}
              {emoji && <span>{emoji}</span>}
            </div>
          )}
          <div>
            <PortableText components={portableComponentsOverrides} value={item.content} />
          </div>
        </li>
      ))}
    </ul>
  )
}

export { ListComponent }
