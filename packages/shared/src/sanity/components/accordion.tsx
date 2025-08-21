import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  type accordionVariants,
} from '@ez/shared/ui/accordion'
import type { VariantProps } from 'class-variance-authority'

type AccordionVariants = VariantProps<typeof accordionVariants>

type AccordionType = {
  _key: string
  content: AccordionContentType[]
  theme: AccordionVariants['theme']
  rounded: AccordionVariants['rounded']
  size: AccordionVariants['size']
}

type AccordionContentType = {
  _key: string
  title: string
  content: string
}

const AccordionComponent = ({ value }: { value: AccordionType }) => {
  return (
    <Accordion
      type="single"
      collapsible
      className="flex flex-col"
      theme={value.theme}
      rounded={value.rounded}
      size={value.size}
    >
      {value.content.map(({ _key, title, content }) => (
        <AccordionItem key={_key} value={_key}>
          <AccordionTrigger>
            <span>{title}</span>
          </AccordionTrigger>
          <AccordionContent className="relative px-4 pt-0 pb-8">{content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export { AccordionComponent }
