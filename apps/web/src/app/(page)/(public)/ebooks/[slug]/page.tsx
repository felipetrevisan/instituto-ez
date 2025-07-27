import { getEbookBySlug, getEbooks } from '@ez/web/server/get-ebook'
import { Content } from './_content'

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const data = await getEbookBySlug(slug)

  return (
    <div className="w-full flex items-center flex-col justify-center space-y-14">
      <div className="relative flex flex-col w-screen items-center justify-center">
        <Content data={data} />
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  const ebooks = await getEbooks()

  return ebooks.map((ebook) => ({
    slug: ebook.slug,
  }))
}
