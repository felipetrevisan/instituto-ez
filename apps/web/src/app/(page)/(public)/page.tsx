import { Subtitle, Title } from '@ez/shared/ui/title'
import * as App from '@ez/web/components/app'
import { getSections } from '@ez/web/config/sections'
import { getSiteConfig } from '@ez/web/server/get-site-config'
import type { Section, SectionKeys } from '@ez/web/types/sections'

export default async function Page() {
  const { sections } = await getSiteConfig()

  const avaliableSections = getSections().reduce(
    (acc, section) => {
      acc[section.key] = section
      return acc
    },
    {} as Record<string, SectionKeys>,
  )

  return (
    <div className="w-full flex items-center flex-col justify-center gap-20">
      {sections?.map(({ key, show, title, subtitle }: Section) =>
        show ? (
          <section className={avaliableSections[key]?.classes || ''} key={key}>
            {title && (
              <App.PageHeader>
                <Title>{title}</Title>
                {subtitle && <Subtitle size="xl">{subtitle}</Subtitle>}
              </App.PageHeader>
            )}
            {avaliableSections[key]?.component}
          </section>
        ) : null,
      )}
    </div>
  )
}
