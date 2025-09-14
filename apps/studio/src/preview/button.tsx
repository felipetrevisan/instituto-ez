import { Button, type buttonVariants } from '@ez/studio/components/ui/button'
import { Card, Stack } from '@sanity/ui'
import type { VariantProps } from 'class-variance-authority'
import type { BlockProps, PortableTextObject } from 'sanity'

type ButtonVariants = VariantProps<typeof buttonVariants>

const ButtonPreviewComponent = (props: BlockProps) => {
  const { renderDefault, value } = props

  const valueRaw = value as PortableTextObject
  const variant = (valueRaw.variant as ButtonVariants['variant']) || 'default'
  const theme = (valueRaw.theme as ButtonVariants['theme']) || 'default'
  const rounded = (valueRaw.rounded as ButtonVariants['rounded']) || 'none'
  const fullWidth = (valueRaw.fullWidth as ButtonVariants['fullWidth']) || false
  const label = valueRaw.label as string

  return (
    <Card padding={[2, 2, 3]} scheme="dark" tone="primary">
      <Stack space={4}>
        {renderDefault({ ...props })}
        <Card padding={[4, 5, 6]}>
          <Stack space={4}>
            <Button
              className="p-5 font-bold"
              fullWidth={fullWidth}
              rounded={rounded}
              size="lg"
              theme={theme}
              variant={variant}
            >
              {label}
            </Button>
          </Stack>
        </Card>
      </Stack>
    </Card>
  )
}

export default ButtonPreviewComponent
