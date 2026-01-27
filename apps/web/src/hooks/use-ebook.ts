import { getEbookBySlug, getEbooks, getEbooksByType } from '@ez/web/server/get-ebook'
import type { Ebook } from '@ez/web/types/ebook'
import { useQuery } from '@tanstack/react-query'

export function useEbooks() {
  const { data, isLoading, isPending } = useQuery<Ebook[]>({
    queryKey: ['ebooks'],
    queryFn: () => getEbooks(),
  })

  return { data, isLoading, isPending }
}

export function useEbook(slug: string, locale: string) {
  const { data, isLoading, isPending } = useQuery<Ebook>({
    queryKey: ['ebooks', locale, slug],
    queryFn: () => getEbookBySlug(slug, locale),
  })

  return { data, isLoading, isPending }
}

export function useEbooksByType(type: 'ebook' | 'webinar') {
  const { data, isLoading, isPending } = useQuery<Ebook[]>({
    queryKey: ['ebooks', type],
    queryFn: () => getEbooksByType(type),
  })

  return { data, isLoading, isPending }
}

// export function useEbooksCollection() {
//   const { data, isLoading, isPending } = useQuery<EbookCollection[]>({
//     queryKey: ['ebooks-collection'],
//     queryFn: () => getEbooksCollection(),
//   })

//   return { data, isLoading, isPending }
// }

// export function useEbookByCategory(id: string) {
//   const { data, isLoading, isPending } = useQuery<EbookCollection>({
//     queryKey: ['ebooks', id],
//     queryFn: () => getEbooksByCollection(id),
//   })

//   return { data, isLoading, isPending }
// }
