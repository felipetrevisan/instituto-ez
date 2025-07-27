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
    <Card tone="primary" scheme="dark" padding={[2, 2, 3]}>
      <Stack space={4}>
        {renderDefault({ ...props })}
        <Card padding={[4, 5, 6]}>
          <Stack space={4}>
            <Accordion
              type="single"
              collapsible
              className="flex flex-col"
              theme={theme}
              rounded={rounded}
              size="default"
            >
              {content.map(({ _key, title, content }) => (
                <AccordionItem key={_key} value={_key}>
                  <AccordionTrigger>
                    <span>{title}</span>
                  </AccordionTrigger>
                  <AccordionContent className="relative px-4 pb-8 pt-0">{content}</AccordionContent>
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
