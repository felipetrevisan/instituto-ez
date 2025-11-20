'use client'

import { AccordionContent, AccordionItem, AccordionTrigger } from '@ez/shared/ui/accordion'
import type { Question } from '@ez/web/types/ebook'
import { useLocale } from 'next-intl'

export function QuestionItem({ question }: { question: Question }) {
  const { title, content, _key } = question
  const locale = useLocale()

  return (
    <AccordionItem value={`item-${_key}`}>
      <AccordionTrigger>{title?.[locale]}</AccordionTrigger>
      <AccordionContent className="m-3">{content?.[locale]}</AccordionContent>
    </AccordionItem>
  )
}
