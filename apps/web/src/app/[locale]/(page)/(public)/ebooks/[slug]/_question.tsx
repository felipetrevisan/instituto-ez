'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@ez/shared/ui/accordion'
import { Title } from '@ez/shared/ui/title'
import type { Ebook } from '@ez/web/types/ebook'

export function Question({ data }: { data: Ebook }) {
  const { questions, id } = data

  return (
    <>
      {questions && questions?.length > 0 && (
        <section className="relative mt-10 flex min-h-[500px] w-screen flex-row justify-center gap-4 bg-white px-6 md:container">
          <div className="flex flex-col items-center justify-center gap-10 md:container">
            <Title
              size="2xl"
              className="after:-bottom-1 after:-translate-x-1/2 relative text-center font-questrial font-semibold text-[var(--primary-c)] after:absolute after:left-1/2 after:h-[2px] after:w-[40%] after:rounded-xl after:bg-[var(--primary-c)]/60 after:transition-all"
            >
              Perguntas Frequentes
            </Title>
            <div className="w-full max-w-3xl">
              <Accordion type="multiple" rounded="2xl" theme="custom">
                {questions?.map((question, index) => (
                  <AccordionItem
                    value={`item-${id}-${index}`}
                    key={`question_${id}-${
                      // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                      index
                    }`}
                  >
                    <AccordionTrigger>{question.title}</AccordionTrigger>
                    <AccordionContent className="m-3">{question.text}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
