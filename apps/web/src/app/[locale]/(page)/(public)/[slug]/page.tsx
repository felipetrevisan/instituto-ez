import { ScrollToHash } from '@ez/web/components/scroll-to-hash'
import { getPageBySlug, getPages } from '@ez/web/server/get-page'
import { Suspense } from 'react'
import { Content } from './_content'
import Loading from './_loading'

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const data = await getPageBySlug(slug)

  return (
    <div className='flex w-full flex-col items-center justify-center space-y-14'>
      <div className='relative flex w-screen flex-col items-center justify-center gap-20'>
        <Suspense fallback={<Loading />}>
          <ScrollToHash />
          <Content data={data} slug={slug} />
        </Suspense>
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  const pages = await getPages()

  return pages.map((page) => ({
    slug: page.slug,
  }))
}
