import { Divider, type dividerVariants } from '@ez/studio/components/ui/divider'
import { Card, Stack } from '@sanity/ui'
import type { VariantProps } from 'class-variance-authority'
import type { BlockProps, PortableTextObject } from 'sanity'

type DividerVariants = VariantProps<typeof dividerVariants>

const DividerPreviewComponent = (props: BlockProps) => {
  const { renderDefault, value } = props

  const valueRaw = value as PortableTextObject
  const theme = (valueRaw.theme as DividerVariants['theme']) || 'default'

  return (
    <Card padding={[2, 2, 3]} scheme="dark" tone="primary">
      <Stack space={4}>
        {renderDefault({ ...props })}
        <Card padding={[4, 5, 6]}>
          <Stack space={4}>
            <Divider theme={theme} />
          </Stack>
        </Card>
      </Stack>
    </Card>
  )
}

export default DividerPreviewComponent
