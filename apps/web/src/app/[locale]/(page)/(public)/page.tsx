import { Subtitle, Title } from '@ez/shared/ui/title'
import * as App from '@ez/web/components/app'
import { getSections } from '@ez/web/config/sections'
import { getSiteConfig } from '@ez/web/server/get-site-config'
import type { Section, SectionKeys } from '@ez/web/types/sections'
import type { Locale } from 'next-intl'

export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {
  const { sections } = await getSiteConfig()
  const locale = (await params).locale

  const avaliableSections = getSections().reduce(
    (acc, section) => {
      acc[section.key] = section
      return acc
    },
    {} as Record<string, SectionKeys>,
  )

  return (
    <div className="flex w-full flex-col items-center justify-center gap-20">
      {sections?.map(({ key, show, title, subtitle }: Section) =>
        show ? (
          <section className={avaliableSections[key]?.classes || ''} key={key}>
            {title?.[locale] && (
              <App.PageHeader>
                <Title size="2xl" className="text-center">
                  {title?.[locale]}
                </Title>
                {subtitle && <Subtitle size="xl">{subtitle?.[locale]}</Subtitle>}
              </App.PageHeader>
            )}
            {avaliableSections[key]?.component}
          </section>
        ) : null,
      )}
    </div>
  )
}
