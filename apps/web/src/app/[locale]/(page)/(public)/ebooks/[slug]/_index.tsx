import { Title } from '@ez/shared/ui/title'
import type { Ebook } from '@ez/web/types/ebook'
import ReactPlayer from 'react-player'

export function Index({ data }: { data: Ebook }) {
  const { index } = data

  return (
    <section className="relative flex w-screen flex-row gap-4 px-6 py-12">
      <div className="flex flex-col items-center justify-center gap-8 md:container">
        <Title
          size="2xl"
          className="after:-bottom-1 after:-translate-x-1/2 relative text-center font-questrial font-semibold text-[var(--primary-c)] after:absolute after:left-1/2 after:h-[2px] after:w-[40%] after:rounded-xl after:bg-[var(--primary-c)]/60 after:transition-all"
        >
          {index.title || 'O que você vai encontrar nesse Ebook'}
        </Title>
        {index.video && (
          <div className="h-[200px] w-[90vw] max-w-full overflow-hidden rounded-2xl shadow md:h-[450px] md:w-[60vw]">
            <ReactPlayer url={index.video} width="100%" height="100%" controls={false} />
          </div>
        )}
      </div>
    </section>
  )
}
