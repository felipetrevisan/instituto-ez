import {
  Alert,
  AlertDescription,
  AlertTitle,
  type alertVariants,
} from '@ez/studio/components/ui/alert'
import { Card, Stack } from '@sanity/ui'
import type { VariantProps } from 'class-variance-authority'
import type { BlockProps, PortableTextObject } from 'sanity'

type AlertVariants = VariantProps<typeof alertVariants>

const AlertPreviewComponent = (props: BlockProps) => {
  const { renderDefault, value } = props

  const valueRaw = value as PortableTextObject

  const variant = (valueRaw.variant as AlertVariants['variant']) || 'default'
  const theme = (valueRaw.theme as AlertVariants['theme']) || 'default'
  const title = valueRaw.title as string
  const message = valueRaw.message as string

  return (
    <Card tone="primary" scheme="dark" padding={[2, 2, 3]}>
      <Stack space={4}>
        {renderDefault({ ...props })}
        <Card padding={[4, 5, 6]}>
          <Stack space={4}>
            <Alert variant={variant} theme={theme}>
              <AlertTitle>{title}</AlertTitle>
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          </Stack>
        </Card>
      </Stack>
    </Card>
  )
}

export default AlertPreviewComponent
