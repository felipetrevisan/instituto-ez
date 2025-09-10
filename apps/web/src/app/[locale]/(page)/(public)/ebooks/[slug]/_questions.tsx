'use client'

import { Accordion } from '@ez/shared/ui/accordion'
import { Title } from '@ez/shared/ui/title'
import type { Ebook } from '@ez/web/types/ebook'
import { useTranslations } from 'next-intl'
import { QuestionItem } from './_question'

export function Questions({ data }: { data: Ebook }) {
  const { questions, id } = data

  const t = useTranslations('Ebooks')

  return (
    <>
      {questions && questions?.length > 0 && (
        <section className="relative mt-10 flex min-h-[500px] w-screen flex-row justify-center gap-4 bg-white px-6 md:container">
          <div className="flex flex-col items-center justify-center gap-10 md:container">
            <Title
              className="after:-bottom-1 after:-translate-x-1/2 relative text-center font-questrial font-semibold text-[var(--primary-c)] after:absolute after:left-1/2 after:h-[2px] after:w-[40%] after:rounded-xl after:bg-[var(--primary-c)]/60 after:transition-all"
              size="2xl"
            >
              {t('frequentlyQuestions')}
            </Title>
            <div className="w-full max-w-3xl">
              <Accordion rounded="2xl" theme="custom" type="multiple">
                {questions?.map((question) => (
                  <QuestionItem key={question._key} question={question} />
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
