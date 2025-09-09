import { cn } from '@ez/studio/lib/utils'
import { createPortableComponents } from '@ez/studio/portable'
import { PortableText, type PortableTextBlock } from '@portabletext/react'
import { Card, Stack } from '@sanity/ui'
import { useId } from 'react'
import type { BlockProps, PortableTextObject } from 'sanity'

type ListItemContent = {
  content: PortableTextBlock[]
}

const ListPreviewComponent = (props: BlockProps) => {
  const { renderDefault, value } = props

  const valueRaw = value as PortableTextObject
  const items = (valueRaw.items as ListItemContent[]) || []
  const bullet_type = (valueRaw.bullet_type as 'none' | 'icon' | 'emoji') || 'none'
  const emoji = (valueRaw.emoji as string) || ''
  const divider = valueRaw.divider as boolean

  const id = useId()

  return (
    <Card padding={[2, 2, 3]} scheme="dark" tone="primary">
      <Stack space={4}>
        {renderDefault({ ...props })}
        <Card padding={[4, 5, 6]}>
          <Stack space={4}>
            <ul
              className={cn('flex flex-col gap-2 [&>li]:py-2', {
                'divide-y divide-primary/30': divider,
                'list-disc': bullet_type === 'none',
              })}
            >
              {items?.map((item) => (
                <li
                  className={cn({
                    'flex flex-row items-center gap-2': bullet_type !== 'none',
                  })}
                  key={id}
                >
                  {bullet_type !== 'none' && <div>{emoji && <span>{emoji}</span>}</div>}
                  <div>
                    <PortableText components={createPortableComponents()} value={item.content} />
                  </div>
                </li>
              ))}
            </ul>
          </Stack>
        </Card>
      </Stack>
    </Card>
  )
}

export default ListPreviewComponent
