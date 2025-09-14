import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  type accordionVariants,
} from '@ez/studio/components/ui/accordion'
import { Card, Stack } from '@sanity/ui'
import type { VariantProps } from 'class-variance-authority'
import type { BlockProps, PortableTextObject } from 'sanity'

type AccordionVariants = VariantProps<typeof accordionVariants>

type AccordionContentType = {
  _key: string
  title: string
  content: string
}

const AccordionPreviewComponent = (props: BlockProps) => {
  const { renderDefault, value } = props

  const valueRaw = value as PortableTextObject
  const theme = (valueRaw.theme as AccordionVariants['theme']) || 'default'
  const rounded = (valueRaw.rounded as AccordionVariants['rounded']) || 'none'
  const content = valueRaw.content as AccordionContentType[]

  return (
    <Card padding={[2, 2, 3]} scheme="dark" tone="primary">
      <Stack space={4}>
        {renderDefault({ ...props })}
        <Card padding={[4, 5, 6]}>
          <Stack space={4}>
            <Accordion
              className="flex flex-col"
              collapsible
              rounded={rounded}
              size="default"
              theme={theme}
              type="single"
            >
              {content.map(({ _key, title, content }) => (
                <AccordionItem key={_key} value={_key}>
                  <AccordionTrigger>
                    <span>{title}</span>
                  </AccordionTrigger>
                  <AccordionContent className="relative px-4 pt-0 pb-8">{content}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Stack>
        </Card>
      </Stack>
    </Card>
  )
}

export default AccordionPreviewComponent
